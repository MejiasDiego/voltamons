<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCheckoutRequest;
use App\Mail\OrderConfirmationMail;
use App\Models\Book;
use App\Models\Order;
use App\Models\OrderItem;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;
use Inertia\Response;

class CheckoutController extends Controller
{
    public function create(Request $request): Response
    {
        return Inertia::render('Checkout/Create', [
            'authUser' => $request->user(),
        ]);
    }

    public function store(StoreCheckoutRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        $order = DB::transaction(function () use ($request, $validated): Order {
            $bookIds = collect($validated['items'])->pluck('id')->unique()->values();
            $books = Book::query()->whereIn('id', $bookIds)->lockForUpdate()->get()->keyBy('id');

            $subtotal = 0;
            $lineItems = [];

            foreach ($validated['items'] as $item) {
                $book = $books->get($item['id']);

                if (! $book || ! $book->is_active) {
                    abort(422, 'Hi ha productes no disponibles.');
                }

                if ($book->stock < $item['quantity']) {
                    abort(422, 'No hi ha prou estoc per completar la compra.');
                }

                $lineTotal = (float) $book->price * (int) $item['quantity'];
                $subtotal += $lineTotal;

                $lineItems[] = [
                    'book' => $book,
                    'quantity' => (int) $item['quantity'],
                    'line_total' => $lineTotal,
                ];
            }

            $taxAmount = round($subtotal * 0.21, 2);
            $shippingAmount = $subtotal >= 60 ? 0 : 3.95;
            $totalAmount = round($subtotal + $taxAmount + $shippingAmount, 2);

            $billingSame = (bool) $validated['billing_same_as_shipping'];
            $cardNumber = (string) $validated['card_number'];

            $order = Order::query()->create([
                'user_id' => $request->user()->id,
                'order_number' => 'VTM-'.now()->format('Ymd').'-'.str_pad((string) random_int(1, 9999), 4, '0', STR_PAD_LEFT),
                'status' => 'paid',
                'full_name' => $validated['full_name'],
                'email' => $validated['email'],
                'phone' => $validated['phone'],
                'shipping_address' => $validated['shipping_address'],
                'shipping_city' => $validated['shipping_city'],
                'shipping_region' => $validated['shipping_region'],
                'shipping_postal_code' => $validated['shipping_postal_code'],
                'billing_same_as_shipping' => $billingSame,
                'billing_full_name' => $billingSame ? $validated['full_name'] : ($validated['billing_full_name'] ?? null),
                'billing_address' => $billingSame ? $validated['shipping_address'] : ($validated['billing_address'] ?? null),
                'billing_city' => $billingSame ? $validated['shipping_city'] : ($validated['billing_city'] ?? null),
                'billing_region' => $billingSame ? $validated['shipping_region'] : ($validated['billing_region'] ?? null),
                'billing_postal_code' => $billingSame ? $validated['shipping_postal_code'] : ($validated['billing_postal_code'] ?? null),
                'payment_card_last4' => substr($cardNumber, -4),
                'subtotal' => $subtotal,
                'tax_amount' => $taxAmount,
                'shipping_amount' => $shippingAmount,
                'total_amount' => $totalAmount,
            ]);

            foreach ($lineItems as $lineItem) {
                /** @var Book $book */
                $book = $lineItem['book'];
                $quantity = $lineItem['quantity'];
                $lineTotal = $lineItem['line_total'];

                OrderItem::query()->create([
                    'order_id' => $order->id,
                    'book_id' => $book->id,
                    'title_snapshot' => $book->title,
                    'isbn_snapshot' => $book->isbn,
                    'unit_price' => $book->price,
                    'quantity' => $quantity,
                    'line_total' => $lineTotal,
                    'has_to_comment' => true,
                ]);

                $book->decrement('stock', $quantity);
            }

            return $order;
        });

        $order->load('items');

        Mail::to($order->email)->send(new OrderConfirmationMail($order));

        return redirect()->route('orders.show', $order->id);
    }

    public function invoice(Order $order)
    {
        $this->authorizeOrderAccess($order);

        $order->load('items');

        $pdf = Pdf::loadView('pdf.invoice', [
            'order' => $order,
        ]);

        return $pdf->download('factura-'.$order->order_number.'.pdf');
    }

    private function authorizeOrderAccess(Order $order): void
    {
        $user = request()->user();

        if (! $user) {
            abort(403);
        }

        if ($user->id !== $order->user_id && ! $user->isAdmin()) {
            abort(403);
        }
    }
}

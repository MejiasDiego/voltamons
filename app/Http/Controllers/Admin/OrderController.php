<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class OrderController extends Controller
{
    private const STATUSES = ['pendent', 'enviat', 'cancel·lat', 'completat'];

    public function index(): Response
    {
        $orders = Order::query()
            ->with(['user:id,name,email'])
            ->orderByDesc('id')
            ->paginate(12)
            ->withQueryString();

        return Inertia::render('Admin/Orders/Index', [
            'orders' => $orders,
            'statuses' => self::STATUSES,
        ]);
    }

    public function update(Request $request, Order $order): RedirectResponse
    {
        $validated = $request->validate([
            'status' => ['required', 'in:'.implode(',', self::STATUSES)],
        ]);

        $order->update([
            'status' => $validated['status'],
        ]);

        return redirect()
            ->route('admin.orders.index')
            ->with('success', 'Estat de la comanda actualitzat.');
    }

    public function destroy(Order $order): RedirectResponse
    {
        $order->delete();

        return redirect()
            ->route('admin.orders.index')
            ->with('success', 'Comanda eliminada correctament.');
    }
}

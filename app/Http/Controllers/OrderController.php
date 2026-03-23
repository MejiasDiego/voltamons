<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class OrderController extends Controller
{
    public function index(Request $request): Response
    {
        $user = $request->user();

        $orders = Order::query()
            ->with('items')
            ->where('user_id', $user->id)
            ->orderByDesc('id')
            ->paginate(10);

        return Inertia::render('Orders/Index', [
            'orders' => $orders,
        ]);
    }

    public function show(Request $request, Order $order): Response
    {
        $user = $request->user();

        if ($order->user_id !== $user->id && ! $user->isAdmin()) {
            abort(403);
        }

        $order->load(['items.book']);

        return Inertia::render('Orders/Show', [
            'order' => $order,
        ]);
    }
}

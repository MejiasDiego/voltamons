<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Book;
use App\Models\Opinion;
use App\Models\OrderItem;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class OpinionController extends Controller
{
    public function getOpinions(Request $request, Book $book): JsonResponse
    {
        $query = Opinion::query()->where('book_id', $book->id)->latest();

        if ($request->filled('from_date')) {
            $query->whereDate('created_at', '>=', $request->string('from_date')->toString());
        }

        if ($request->filled('to_date')) {
            $query->whereDate('created_at', '<=', $request->string('to_date')->toString());
        }

        return response()->json([
            'opinions' => $query->get(['id', 'user_name', 'rating', 'comment', 'created_at']),
        ]);
    }

    public function getRating(Book $book): JsonResponse
    {
        $average = Opinion::query()->where('book_id', $book->id)->avg('rating');
        $count = Opinion::query()->where('book_id', $book->id)->count();

        return response()->json([
            'rating' => $average ? round((float) $average, 2) : 0,
            'count' => $count,
        ]);
    }

    public function sendOpinion(Request $request, Book $book): JsonResponse
    {
        $validated = $request->validate([
            'rating' => ['required', 'integer', 'min:1', 'max:5'],
            'comment' => ['required', 'string', 'min:5', 'max:1000'],
            'order_item_id' => ['nullable', 'integer', 'exists:order_items,id'],
        ]);

        $user = $request->user();

        if (! $user) {
            abort(403);
        }

        $userName = $user->name;
        $requestedOrderItemId = $validated['order_item_id'] ?? null;

        $pendingItemQuery = OrderItem::query()
            ->whereHas('order', fn ($query) => $query->where('user_id', $user->id))
            ->where('book_id', $book->id)
            ->where('has_to_comment', true);

        if ($requestedOrderItemId) {
            $pendingItemQuery->where('id', $requestedOrderItemId);
        }

        $pendingItem = $pendingItemQuery->latest('id')->first();

        if (! $pendingItem) {
            return response()->json([
                'message' => 'No tens cap compra pendent de comentar per aquest llibre.',
            ], 422);
        }

        $opinion = Opinion::query()->create([
            'book_id' => $book->id,
            'order_item_id' => $pendingItem->id,
            'user_name' => $userName,
            'rating' => $validated['rating'],
            'comment' => $validated['comment'],
        ]);

        $pendingItem->update(['has_to_comment' => false]);

        return response()->json([
            'message' => 'Valoracio registrada correctament.',
            'opinion' => $opinion,
        ], 201);
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Models\OrderItem;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class BookController extends Controller
{
    public function pendingReviews(Request $request): JsonResponse
    {
        $user = $request->user();

        if (! $user) {
            return response()->json([]);
        }

        $pendingItems = OrderItem::query()
            ->with(['book:id,title,slug'])
            ->whereHas('order', fn ($query) => $query->where('user_id', $user->id))
            ->where('has_to_comment', true)
            ->latest('id')
            ->get();

        return response()->json($pendingItems);
    }

    public function reviewDecision(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'order_item_id' => ['required', 'exists:order_items,id'],
            'decision' => ['required', 'in:comment,skip'],
        ]);

        if ($validated['decision'] === 'skip') {
            OrderItem::query()
                ->where('id', $validated['order_item_id'])
                ->update(['has_to_comment' => false]);
        }

        return response()->json(['message' => 'Decisio registrada.']);
    }

    public function preview(string $slug): JsonResponse
    {
        $book = Book::query()
            ->with(['category:id,name,slug', 'subcategory:id,name,slug'])
            ->where('slug', $slug)
            ->where('is_active', true)
            ->firstOrFail();

        return response()->json([
            'book' => $book,
        ]);
    }

    public function show(Request $request, string $slug): Response
    {
        $book = Book::query()
            ->with(['category:id,name,slug', 'subcategory:id,name,slug'])
            ->where('slug', $slug)
            ->where('is_active', true)
            ->firstOrFail();

        $pendingCommentOrderItemId = null;
        $user = $request->user();

        if ($user) {
            $pendingItem = OrderItem::query()
                ->whereHas('order', fn ($query) => $query->where('user_id', $user->id))
                ->where('book_id', $book->id)
                ->where('has_to_comment', true)
                ->latest('id')
                ->first();

            $pendingCommentOrderItemId = $pendingItem?->id;
        }

        $relatedBooks = Book::query()
            ->where('is_active', true)
            ->where('id', '!=', $book->id)
            ->where('subcategory_id', $book->subcategory_id)
            ->orderByDesc('id')
            ->limit(4)
            ->get(['id', 'title', 'slug', 'author', 'price', 'stock', 'cover_image', 'isbn', 'category_id', 'subcategory_id']);

        if ($request->boolean('modal')) {
            return Inertia::render('Catalog/Show', [
                'book' => $book,
                'relatedBooks' => $relatedBooks,
                'isModal' => true,
                'pendingCommentOrderItemId' => $pendingCommentOrderItemId,
            ]);
        }

        return Inertia::render('Catalog/Show', [
            'book' => $book,
            'relatedBooks' => $relatedBooks,
            'isModal' => false,
            'pendingCommentOrderItemId' => $pendingCommentOrderItemId,
        ]);
    }
}

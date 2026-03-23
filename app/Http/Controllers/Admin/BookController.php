<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Book;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class BookController extends Controller
{
    public function updateStock(Request $request, Book $book): JsonResponse
    {
        $validated = $request->validate([
            'stock' => ['required', 'integer', 'min:0'],
        ]);

        $book->update([
            'stock' => $validated['stock'],
        ]);

        return response()->json([
            'message' => 'Estoc actualitzat correctament.',
            'book' => $book,
        ]);
    }

    public function applyGlobalDiscount(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'discount_percent' => ['required', 'numeric', 'min:0', 'max:90'],
        ]);

        $discountPercent = (float) $validated['discount_percent'];

        $books = Book::query()->get();

        foreach ($books as $book) {
            $newPrice = round((float) $book->price * (1 - ($discountPercent / 100)), 2);

            $book->update([
                'price' => max($newPrice, 0.5),
            ]);
        }

        return response()->json([
            'message' => 'Descompte aplicat correctament.',
            'discount_percent' => $discountPercent,
        ]);
    }
}

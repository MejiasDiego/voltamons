<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Book;
use App\Models\Category;
use App\Models\Subcategory;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class BookController extends Controller
{
    public function index(): Response
    {
        $books = Book::query()
            ->with(['category:id,name', 'subcategory:id,name'])
            ->orderByDesc('id')
            ->paginate(15)
            ->withQueryString();

        return Inertia::render('Admin/Books/Index', [
            'books' => $books,
        ]);
    }

    public function create(): Response
    {
        $categories = Category::query()->orderBy('name')->get(['id', 'name']);
        $subcategories = Subcategory::query()->orderBy('name')->get(['id', 'name', 'category_id']);

        return Inertia::render('Admin/Books/Create', [
            'categories' => $categories,
            'subcategories' => $subcategories,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'author' => ['required', 'string', 'max:255'],
            'isbn' => ['nullable', 'string', 'max:20'],
            'description' => ['nullable', 'string'],
            'price' => ['required', 'numeric', 'min:0'],
            'stock' => ['required', 'integer', 'min:0'],
            'cover_image' => ['nullable', 'string', 'max:500'],
            'category_id' => ['nullable', 'exists:categories,id'],
            'subcategory_id' => ['nullable', 'exists:subcategories,id'],
            'is_active' => ['required', 'boolean'],
        ]);

        Book::create([
            'title' => $validated['title'],
            'slug' => Str::slug($validated['title']),
            'author' => $validated['author'],
            'isbn' => $validated['isbn'],
            'description' => $validated['description'],
            'price' => $validated['price'],
            'stock' => $validated['stock'],
            'cover_image' => $validated['cover_image'],
            'category_id' => $validated['category_id'],
            'subcategory_id' => $validated['subcategory_id'],
            'is_active' => $validated['is_active'],
        ]);

        return redirect()
            ->route('admin.books.index')
            ->with('success', 'Producte creat correctament.');
    }

    public function edit(Book $book): Response
    {
        $categories = Category::query()->orderBy('name')->get(['id', 'name']);
        $subcategories = Subcategory::query()->orderBy('name')->get(['id', 'name', 'category_id']);

        return Inertia::render('Admin/Books/Edit', [
            'book' => $book->load(['category:id,name', 'subcategory:id,name']),
            'categories' => $categories,
            'subcategories' => $subcategories,
        ]);
    }

    public function update(Request $request, Book $book): RedirectResponse
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'author' => ['required', 'string', 'max:255'],
            'isbn' => ['nullable', 'string', 'max:20'],
            'description' => ['nullable', 'string'],
            'price' => ['required', 'numeric', 'min:0'],
            'stock' => ['required', 'integer', 'min:0'],
            'cover_image' => ['nullable', 'string', 'max:500'],
            'category_id' => ['nullable', 'exists:categories,id'],
            'subcategory_id' => ['nullable', 'exists:subcategories,id'],
            'is_active' => ['required', 'boolean'],
        ]);

        $book->update([
            'title' => $validated['title'],
            'slug' => Str::slug($validated['title']),
            'author' => $validated['author'],
            'isbn' => $validated['isbn'],
            'description' => $validated['description'],
            'price' => $validated['price'],
            'stock' => $validated['stock'],
            'cover_image' => $validated['cover_image'],
            'category_id' => $validated['category_id'],
            'subcategory_id' => $validated['subcategory_id'],
            'is_active' => $validated['is_active'],
        ]);

        return redirect()
            ->route('admin.books.index')
            ->with('success', 'Producte actualitzat correctament.');
    }

    public function destroy(Book $book): RedirectResponse
    {
        $book->delete();

        return redirect()
            ->route('admin.books.index')
            ->with('success', 'Producte eliminat correctament.');
    }

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
            if (is_null($book->original_price)) {
                $book->original_price = $book->price;
            }

            $newPrice = round((float) $book->price * (1 - ($discountPercent / 100)), 2);

            $book->price = max($newPrice, 0.5);
            $book->save();
        }

        return response()->json([
            'message' => 'Descompte aplicat correctament.',
            'discount_percent' => $discountPercent,
        ]);
    }

    public function restoreOriginalPrices(): JsonResponse
    {
        $books = Book::query()->whereNotNull('original_price')->get();

        foreach ($books as $book) {
            $book->price = $book->original_price;
            $book->original_price = null;
            $book->save();
        }

        return response()->json([
            'message' => 'Preus originals restaurats correctament.',
        ]);
    }
}

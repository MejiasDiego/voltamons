<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Models\Category;
use App\Models\Subcategory;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CatalogController extends Controller
{
    public function index(Request $request): Response
    {
        $filters = [
            'category' => $request->string('category')->toString(),
            'subcategory' => $request->string('subcategory')->toString(),
            'search' => $request->string('search')->toString(),
        ];

        $books = Book::query()
            ->with(['category:id,name,slug', 'subcategory:id,name,slug'])
            ->where('is_active', true)
            ->when($filters['category'], fn ($query, $categorySlug) => $query->whereHas('category', fn ($categoryQuery) => $categoryQuery->where('slug', $categorySlug)))
            ->when($filters['subcategory'], fn ($query, $subcategorySlug) => $query->whereHas('subcategory', fn ($subcategoryQuery) => $subcategoryQuery->where('slug', $subcategorySlug)))
            ->when($filters['search'], function ($query, $search) {
                $query->where(function ($bookQuery) use ($search): void {
                    $bookQuery
                        ->where('title', 'like', "%{$search}%")
                        ->orWhere('author', 'like', "%{$search}%")
                        ->orWhere('isbn', 'like', "%{$search}%");
                });
            })
            ->orderBy('title')
            ->paginate(12)
            ->withQueryString();

        $categories = Category::query()
            ->where('is_active', true)
            ->orderBy('name')
            ->get(['id', 'name', 'slug']);

        $subcategories = Subcategory::query()
            ->where('is_active', true)
            ->orderBy('name')
            ->get(['id', 'category_id', 'name', 'slug']);

        return Inertia::render('Catalog/Index', [
            'books' => $books,
            'categories' => $categories,
            'subcategories' => $subcategories,
            'filters' => $filters,
        ]);
    }
}

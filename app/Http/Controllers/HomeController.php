<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Models\Category;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function index(): Response
    {
        $featuredBooks = Book::query()
            ->with(['category:id,name,slug', 'subcategory:id,name,slug'])
            ->where('is_active', true)
            ->where('stock', '>', 0)
            ->orderByDesc('id')
            ->limit(8)
            ->get();

        $categories = Category::query()
            ->withCount('books')
            ->where('is_active', true)
            ->orderBy('name')
            ->get(['id', 'name', 'slug']);

        return Inertia::render('Home', [
            'featuredBooks' => $featuredBooks,
            'categories' => $categories,
        ]);
    }
}

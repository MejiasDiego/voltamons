<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Book;
use App\Models\Category;
use App\Models\Subcategory;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(): Response
    {
        $stats = [
            'books' => Book::query()->count(),
            'categories' => Category::query()->count(),
            'subcategories' => Subcategory::query()->count(),
            'lowStockBooks' => Book::query()->where('stock', '<', 5)->count(),
        ];

        $latestBooks = Book::query()
            ->with(['category:id,name', 'subcategory:id,name'])
            ->orderByDesc('id')
            ->limit(10)
            ->get(['id', 'title', 'author', 'price', 'stock', 'category_id', 'subcategory_id']);

        return Inertia::render('Admin/Dashboard', [
            'stats' => $stats,
            'latestBooks' => $latestBooks,
        ]);
    }
}

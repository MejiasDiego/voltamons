<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Book;
use App\Models\Category;
use App\Models\OrderItem;
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
            'outOfStockBooks' => Book::query()->where('stock', '=', 0)->count(),
        ];

        $books = Book::query()
            ->with(['category:id,name', 'subcategory:id,name'])
            ->orderBy('stock')
            ->get(['id', 'title', 'author', 'price', 'stock', 'category_id', 'subcategory_id']);

        $salesChart = OrderItem::query()
            ->selectRaw('book_id, title_snapshot, SUM(quantity) as total_sold')
            ->groupBy('book_id', 'title_snapshot')
            ->orderByDesc('total_sold')
            ->limit(8)
            ->get();

        return Inertia::render('Admin/Dashboard', [
            'stats' => $stats,
            'books' => $books,
            'salesChart' => $salesChart,
        ]);
    }
}

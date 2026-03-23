<?php

use App\Http\Controllers\Admin\BookController as AdminBookController;
use App\Http\Controllers\Admin\DashboardController as AdminDashboardController;
use App\Http\Controllers\Api\OpinionController;
use App\Http\Controllers\BookController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\CatalogController;
use App\Http\Controllers\CheckoutController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return redirect()->route('home');
});

Route::get('/inici', [HomeController::class, 'index'])->name('home');
Route::get('/cataleg', [CatalogController::class, 'index'])->name('catalog.index');
Route::get('/api/cataleg/{slug}/preview', [BookController::class, 'preview'])->name('catalog.preview');
Route::get('/api/books/{book}/opinions', [OpinionController::class, 'getOpinions'])->name('api.opinions.index');
Route::get('/api/books/{book}/rating', [OpinionController::class, 'getRating'])->name('api.opinions.rating');
Route::post('/api/books/{book}/opinions', [OpinionController::class, 'sendOpinion'])
    ->middleware('auth')
    ->name('api.opinions.store');
Route::get('/cataleg/{slug}', [BookController::class, 'show'])->name('catalog.show');
Route::get('/cistella', [CartController::class, 'index'])->name('cart.index');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware(['auth', 'role:admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/dashboard', [AdminDashboardController::class, 'index'])->name('dashboard');
    Route::patch('/books/{book}/stock', [AdminBookController::class, 'updateStock'])->name('books.stock.update');
    Route::post('/books/discount', [AdminBookController::class, 'applyGlobalDiscount'])->name('books.discount.apply');
});

Route::middleware('auth')->group(function () {
    Route::get('/checkout', [CheckoutController::class, 'create'])->name('checkout.create');
    Route::post('/checkout', [CheckoutController::class, 'store'])->name('checkout.store');

    Route::get('/comandes', [OrderController::class, 'index'])->name('orders.index');
    Route::get('/comandes/{order}', [OrderController::class, 'show'])->name('orders.show');
    Route::get('/comandes/{order}/factura', [CheckoutController::class, 'invoice'])->name('orders.invoice');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';

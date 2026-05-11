<?php

use App\Http\Controllers\Admin\BookController as AdminBookController;
use App\Http\Controllers\Admin\CategoryController as AdminCategoryController;
use App\Http\Controllers\Admin\DashboardController as AdminDashboardController;
use App\Http\Controllers\Admin\OrderController as AdminOrderController;
use App\Http\Controllers\Admin\SubcategoryController as AdminSubcategoryController;
use App\Http\Controllers\Admin\UserController as AdminUserController;
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
Route::get('/memoria-ui', function () {
    return Inertia::render('MemoriaUi/Index');
})->name('memoria.index');
Route::get('/avis-legal', function () {
    return Inertia::render('Legal/LegalNotice');
})->name('legal.notice');
Route::get('/politica-cookies', function () {
    return Inertia::render('Legal/CookiesPolicy');
})->name('legal.cookies');
Route::get('/privacitat', function () {
    return Inertia::render('Legal/PrivacyPolicy');
})->name('legal.privacy');
Route::get('/condicions-enviament', function () {
    return Inertia::render('Legal/ShippingPolicy');
})->name('legal.shipping');
Route::get('/contacte', function () {
    return Inertia::render('Legal/Contact');
})->name('legal.contact');
Route::get('/api/pending-reviews', [BookController::class, 'pendingReviews'])->middleware('auth')->name('api.pending-reviews');
Route::post('/api/review-decision', [BookController::class, 'reviewDecision'])->middleware('auth')->name('api.review-decision');
Route::get('/api/cataleg/{slug}/preview', [BookController::class, 'preview'])->name('catalog.preview');
Route::get('/api/getOpinions/{idProducte}', [OpinionController::class, 'getOpinions'])->name('api.opinions.getOpinions');
Route::get('/api/getRating', [OpinionController::class, 'getRating'])->name('api.opinions.getRating');
Route::get('/api/getAllOpinions', [OpinionController::class, 'getAllOpinions'])->name('api.opinions.getAllOpinions');
Route::post('/api/sendOpinion', [OpinionController::class, 'sendOpinion'])
    ->middleware('auth')
    ->name('api.opinions.sendOpinion');
Route::get('/cataleg/{slug}', [BookController::class, 'show'])->name('catalog.show');
Route::get('/cistella', [CartController::class, 'index'])->name('cart.index');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware(['auth', 'role:admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/dashboard', [AdminDashboardController::class, 'index'])->name('dashboard');

    Route::get('/books', [AdminBookController::class, 'index'])->name('books.index');
    Route::get('/books/create', [AdminBookController::class, 'create'])->name('books.create');
    Route::post('/books', [AdminBookController::class, 'store'])->name('books.store');
    Route::get('/books/{book}/edit', [AdminBookController::class, 'edit'])->name('books.edit');
    Route::patch('/books/{book}', [AdminBookController::class, 'update'])->name('books.update');
    Route::delete('/books/{book}', [AdminBookController::class, 'destroy'])->name('books.destroy');
    Route::patch('/books/{book}/stock', [AdminBookController::class, 'updateStock'])->name('books.stock.update');
    Route::post('/books/discount', [AdminBookController::class, 'applyGlobalDiscount'])->name('books.discount.apply');
    Route::post('/books/restore-prices', [AdminBookController::class, 'restoreOriginalPrices'])->name('books.restore');

    Route::resource('/categories', AdminCategoryController::class)->names('categories');
    Route::resource('/subcategories', AdminSubcategoryController::class)->names('subcategories');
    Route::resource('/orders', AdminOrderController::class)->names('orders')->only(['index', 'update', 'destroy']);
    Route::resource('/users', AdminUserController::class)->names('users')->only(['index', 'edit', 'update', 'destroy']);
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

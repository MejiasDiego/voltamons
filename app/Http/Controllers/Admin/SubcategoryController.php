<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Subcategory;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class SubcategoryController extends Controller
{
    public function index(): Response
    {
        $subcategories = Subcategory::query()
            ->with('category:id,name')
            ->orderBy('name')
            ->paginate(12)
            ->withQueryString();

        return Inertia::render('Admin/Subcategories/Index', [
            'subcategories' => $subcategories,
        ]);
    }

    public function create(): Response
    {
        $categories = Category::query()->orderBy('name')->get(['id', 'name']);

        return Inertia::render('Admin/Subcategories/Create', [
            'categories' => $categories,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'category_id' => ['required', 'exists:categories,id'],
            'name' => ['required', 'string', 'max:120'],
            'description' => ['nullable', 'string'],
            'is_active' => ['required', 'boolean'],
        ]);

        Subcategory::create([
            'category_id' => $validated['category_id'],
            'name' => $validated['name'],
            'slug' => Str::slug($validated['name']),
            'description' => $validated['description'],
            'is_active' => $validated['is_active'],
        ]);

        return redirect()
            ->route('admin.subcategories.index')
            ->with('success', 'Subcategoria creada correctament.');
    }

    public function edit(Subcategory $subcategory): Response
    {
        $categories = Category::query()->orderBy('name')->get(['id', 'name']);

        return Inertia::render('Admin/Subcategories/Edit', [
            'subcategory' => $subcategory,
            'categories' => $categories,
        ]);
    }

    public function update(Request $request, Subcategory $subcategory): RedirectResponse
    {
        $validated = $request->validate([
            'category_id' => ['required', 'exists:categories,id'],
            'name' => ['required', 'string', 'max:120'],
            'description' => ['nullable', 'string'],
            'is_active' => ['required', 'boolean'],
        ]);

        $subcategory->update([
            'category_id' => $validated['category_id'],
            'name' => $validated['name'],
            'slug' => Str::slug($validated['name']),
            'description' => $validated['description'],
            'is_active' => $validated['is_active'],
        ]);

        return redirect()
            ->route('admin.subcategories.index')
            ->with('success', 'Subcategoria actualitzada correctament.');
    }

    public function destroy(Subcategory $subcategory): RedirectResponse
    {
        $subcategory->delete();

        return redirect()
            ->route('admin.subcategories.index')
            ->with('success', 'Subcategoria eliminada correctament.');
    }
}

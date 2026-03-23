<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Subcategory;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $catalog = [
            'Narrativa' => [
                'Novella contemporania',
                'Classics',
                'Fantasia i ciencia-ficcio',
            ],
            'No ficcio' => [
                'Historia',
                'Desenvolupament personal',
                'Ciencia i divulgacio',
            ],
            'Infantil i juvenil' => [
                'Primers lectors',
                'Juvenil',
                'Album illustrat',
            ],
        ];

        foreach ($catalog as $categoryName => $subcategories) {
            $category = Category::query()->updateOrCreate(
                ['slug' => Str::slug($categoryName)],
                [
                    'name' => $categoryName,
                    'description' => 'Categoria principal de '.mb_strtolower($categoryName),
                    'is_active' => true,
                ],
            );

            foreach ($subcategories as $subcategoryName) {
                $uniqueSlug = Str::slug($categoryName.' '.$subcategoryName);

                Subcategory::query()->updateOrCreate(
                    ['slug' => $uniqueSlug],
                    [
                        'category_id' => $category->id,
                        'name' => $subcategoryName,
                        'description' => 'Subcategoria vinculada a '.mb_strtolower($categoryName),
                        'is_active' => true,
                    ],
                );
            }
        }
    }
}

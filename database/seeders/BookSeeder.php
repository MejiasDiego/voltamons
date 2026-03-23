<?php

namespace Database\Seeders;

use App\Models\Book;
use App\Models\Category;
use App\Models\Subcategory;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class BookSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $books = [
            [
                'category' => 'Narrativa',
                'subcategory' => 'Classics',
                'title' => 'Mirall Trencat',
                'author' => 'Merce Rodoreda',
                'isbn' => '9788429752101',
                'price' => 18.50,
                'stock' => 16,
                'description' => 'Classic de la literatura catalana sobre memoria i transformacio familiar.',
            ],
            [
                'category' => 'Narrativa',
                'subcategory' => 'Novella contemporania',
                'title' => 'La Pell Freda',
                'author' => 'Albert Sanchez Pinol',
                'isbn' => '9788423341295',
                'price' => 17.90,
                'stock' => 20,
                'description' => 'Thriller atmosferic en una illa remota amb tensio constant.',
            ],
            [
                'category' => 'Narrativa',
                'subcategory' => 'Fantasia i ciencia-ficcio',
                'title' => 'Duna',
                'author' => 'Frank Herbert',
                'isbn' => '9780441172714',
                'price' => 22.00,
                'stock' => 12,
                'description' => 'Epic de ciencia-ficcio sobre poder, ecologia i desti.',
            ],
            [
                'category' => 'No ficcio',
                'subcategory' => 'Ciencia i divulgacio',
                'title' => 'Sapiens',
                'author' => 'Yuval Noah Harari',
                'isbn' => '9780062316097',
                'price' => 21.40,
                'stock' => 14,
                'description' => 'Recorregut divulgatiu per la historia de la humanitat.',
            ],
            [
                'category' => 'No ficcio',
                'subcategory' => 'Desenvolupament personal',
                'title' => 'Atomic Habits',
                'author' => 'James Clear',
                'isbn' => '9780735211292',
                'price' => 19.95,
                'stock' => 22,
                'description' => 'Metode practic per construir habits sostenibles.',
            ],
            [
                'category' => 'Infantil i juvenil',
                'subcategory' => 'Juvenil',
                'title' => 'Wonder',
                'author' => 'R. J. Palacio',
                'isbn' => '9780375869020',
                'price' => 15.80,
                'stock' => 18,
                'description' => 'Historia emotiva sobre empatia i convivencia a l\'escola.',
            ],
            [
                'category' => 'Infantil i juvenil',
                'subcategory' => 'Album illustrat',
                'title' => 'El Petit Princep',
                'author' => 'Antoine de Saint-Exupery',
                'isbn' => '9780156012195',
                'price' => 13.50,
                'stock' => 25,
                'description' => 'Relat poetic illustrat sobre amistat i mirada critica.',
            ],
            [
                'category' => 'No ficcio',
                'subcategory' => 'Historia',
                'title' => 'Una Breu Historia de Gairebe Tot',
                'author' => 'Bill Bryson',
                'isbn' => '9780767908177',
                'price' => 20.60,
                'stock' => 10,
                'description' => 'Divulgacio historica i cientifica explicada de forma amena.',
            ],
        ];

        foreach ($books as $bookData) {
            $category = Category::query()->where('name', $bookData['category'])->first();
            $subcategory = Subcategory::query()
                ->where('name', $bookData['subcategory'])
                ->where('category_id', $category?->id)
                ->first();

            if (! $category || ! $subcategory) {
                continue;
            }

            Book::query()->updateOrCreate(
                ['isbn' => $bookData['isbn']],
                [
                    'category_id' => $category->id,
                    'subcategory_id' => $subcategory->id,
                    'title' => $bookData['title'],
                    'slug' => Str::slug($bookData['title']),
                    'author' => $bookData['author'],
                    'description' => $bookData['description'],
                    'price' => $bookData['price'],
                    'stock' => $bookData['stock'],
                    'is_active' => true,
                ],
            );
        }
    }
}

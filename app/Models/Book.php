<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Book extends Model
{
    use HasFactory;

    protected $appends = [
        'cover_url',
    ];

    protected $fillable = [
        'category_id',
        'subcategory_id',
        'title',
        'slug',
        'author',
        'isbn',
        'description',
        'price',
        'stock',
        'cover_image',
        'is_active',
    ];

    protected function casts(): array
    {
        return [
            'price' => 'decimal:2',
            'stock' => 'integer',
            'is_active' => 'boolean',
        ];
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function subcategory(): BelongsTo
    {
        return $this->belongsTo(Subcategory::class);
    }

    public function getCoverUrlAttribute(): string
    {
        if (! empty($this->cover_image)) {
            return $this->cover_image;
        }

        if (! empty($this->isbn)) {
            return 'https://covers.openlibrary.org/b/isbn/'.rawurlencode($this->isbn).'-L.jpg?default=false';
        }

        return asset('images/placeholders/book-cover.svg');
    }
}

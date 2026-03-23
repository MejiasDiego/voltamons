<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'order_number',
        'status',
        'full_name',
        'email',
        'phone',
        'shipping_address',
        'shipping_city',
        'shipping_region',
        'shipping_postal_code',
        'billing_same_as_shipping',
        'billing_full_name',
        'billing_address',
        'billing_city',
        'billing_region',
        'billing_postal_code',
        'payment_card_last4',
        'subtotal',
        'tax_amount',
        'shipping_amount',
        'total_amount',
    ];

    protected function casts(): array
    {
        return [
            'billing_same_as_shipping' => 'boolean',
            'subtotal' => 'decimal:2',
            'tax_amount' => 'decimal:2',
            'shipping_amount' => 'decimal:2',
            'total_amount' => 'decimal:2',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function items(): HasMany
    {
        return $this->hasMany(OrderItem::class);
    }
}

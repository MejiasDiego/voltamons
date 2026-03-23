<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('order_number', 30)->unique();
            $table->string('status', 30)->default('paid');

            $table->string('full_name', 150);
            $table->string('email', 150);
            $table->string('phone', 30);

            $table->string('shipping_address', 190);
            $table->string('shipping_city', 120);
            $table->string('shipping_region', 120);
            $table->string('shipping_postal_code', 20);

            $table->boolean('billing_same_as_shipping')->default(true);
            $table->string('billing_full_name', 150)->nullable();
            $table->string('billing_address', 190)->nullable();
            $table->string('billing_city', 120)->nullable();
            $table->string('billing_region', 120)->nullable();
            $table->string('billing_postal_code', 20)->nullable();

            $table->string('payment_card_last4', 4)->nullable();

            $table->decimal('subtotal', 10, 2);
            $table->decimal('tax_amount', 10, 2)->default(0);
            $table->decimal('shipping_amount', 10, 2)->default(0);
            $table->decimal('total_amount', 10, 2);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};

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
        Schema::table('users', function (Blueprint $table) {
            $table->date('birth_date')->nullable()->after('email_verified_at');
            $table->string('phone', 30)->nullable()->after('birth_date');

            $table->string('shipping_address', 190)->nullable()->after('phone');
            $table->string('shipping_city', 120)->nullable()->after('shipping_address');
            $table->string('shipping_region', 120)->nullable()->after('shipping_city');
            $table->string('shipping_postal_code', 20)->nullable()->after('shipping_region');

            $table->string('billing_address', 190)->nullable()->after('shipping_postal_code');
            $table->string('billing_city', 120)->nullable()->after('billing_address');
            $table->string('billing_region', 120)->nullable()->after('billing_city');
            $table->string('billing_postal_code', 20)->nullable()->after('billing_region');
            $table->string('favorite_genre', 100)->nullable()->after('billing_postal_code');
            $table->string('reading_language', 50)->nullable()->after('favorite_genre');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn([
                'birth_date',
                'phone',
                'shipping_address',
                'shipping_city',
                'shipping_region',
                'shipping_postal_code',
                'billing_address',
                'billing_city',
                'billing_region',
                'billing_postal_code',
                'favorite_genre',
                'reading_language',
            ]);
        });
    }
};

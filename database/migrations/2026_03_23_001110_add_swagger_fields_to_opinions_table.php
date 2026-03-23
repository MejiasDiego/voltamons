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
        Schema::table('opinions', function (Blueprint $table) {
            $table->unsignedBigInteger('id_user')->nullable()->after('order_item_id');
            $table->string('title', 180)->default('Sense titol')->after('rating');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('opinions', function (Blueprint $table) {
            $table->dropColumn(['id_user', 'title']);
        });
    }
};

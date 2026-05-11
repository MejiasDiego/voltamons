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
        Schema::table('books', function (Blueprint $table) {
            $table->dropForeign(['subcategory_id']);
            $table->unsignedBigInteger('subcategory_id')->nullable()->change();
            $table->foreign('subcategory_id')->references('id')->on('subcategories')->nullOnDelete();
        });
    }

    public function down(): void
    {
        Schema::table('books', function (Blueprint $table) {
            $table->dropForeign(['subcategory_id']);
            $table->unsignedBigInteger('subcategory_id')->nullable(false)->change();
            $table->foreign('subcategory_id')->references('id')->on('subcategories')->cascadeOnDelete();
        });
    }
};

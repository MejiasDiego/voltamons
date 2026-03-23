<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->foreignId('role_id')->nullable()->after('id')->constrained('roles')->nullOnDelete();
        });

        DB::table('roles')->insert([
            [
                'name' => 'Administrador',
                'slug' => 'admin',
                'description' => 'Usuari amb permisos de gestio global',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Client',
                'slug' => 'client',
                'description' => 'Usuari comprador de la tenda',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);

        $clientRoleId = DB::table('roles')->where('slug', 'client')->value('id');

        DB::table('users')->update(['role_id' => $clientRoleId]);

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropConstrainedForeignId('role_id');
        });

        DB::table('roles')->whereIn('slug', ['admin', 'client'])->delete();
    }
};

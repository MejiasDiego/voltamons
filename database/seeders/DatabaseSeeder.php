<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            RoleSeeder::class,
            CategorySeeder::class,
            BookSeeder::class,
        ]);

        $adminRoleId = Role::query()->where('slug', 'admin')->value('id');
        $clientRoleId = Role::query()->where('slug', 'client')->value('id');

        User::factory()->create([
            'role_id' => $adminRoleId,
            'name' => 'Admin Voltamons',
            'email' => 'admin@voltamons.cat',
            'password' => bcrypt('admin12345'),
        ]);

        User::factory()->create([
            'role_id' => $clientRoleId,
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => bcrypt('password'),
        ]);
    }
}

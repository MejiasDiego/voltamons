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

        User::query()->updateOrCreate(
            ['email' => 'admin@voltamons.cat'],
            [
                'role_id' => $adminRoleId,
                'name' => 'Admin Voltamons',
                'password' => bcrypt('admin12345'),
                'email_verified_at' => now(),
            ],
        );

        User::query()->updateOrCreate(
            ['email' => 'test@example.com'],
            [
                'role_id' => $clientRoleId,
                'name' => 'Test User',
                'password' => bcrypt('password'),
                'email_verified_at' => now(),
            ],
        );
    }
}

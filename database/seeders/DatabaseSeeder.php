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
                'birth_date' => '1990-01-01',
                'phone' => '+34600111222',
                'shipping_address' => 'Carrer Major 1',
                'shipping_city' => 'Barcelona',
                'shipping_region' => 'Barcelona',
                'shipping_postal_code' => '08001',
                'billing_address' => 'Carrer Major 1',
                'billing_city' => 'Barcelona',
                'billing_region' => 'Barcelona',
                'billing_postal_code' => '08001',
            ],
        );

        User::query()->updateOrCreate(
            ['email' => 'test@example.com'],
            [
                'role_id' => $clientRoleId,
                'name' => 'Test User',
                'password' => bcrypt('password'),
                'email_verified_at' => now(),
                'birth_date' => '1998-05-10',
                'phone' => '+34600555666',
                'shipping_address' => 'Avinguda del Port 25',
                'shipping_city' => 'Valencia',
                'shipping_region' => 'Valencia',
                'shipping_postal_code' => '46021',
                'billing_address' => 'Avinguda del Port 25',
                'billing_city' => 'Valencia',
                'billing_region' => 'Valencia',
                'billing_postal_code' => '46021',
            ],
        );
    }
}

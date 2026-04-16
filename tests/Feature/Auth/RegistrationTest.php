<?php

namespace Tests\Feature\Auth;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class RegistrationTest extends TestCase
{
    use RefreshDatabase;

    public function test_registration_screen_can_be_rendered(): void
    {
        $response = $this->get('/register');

        $response->assertStatus(200);
    }

    public function test_new_users_can_register(): void
    {
        $response = $this->post('/register', [
            'name' => 'Test User',
            'birth_date' => '10/05/1998',
            'phone' => '+34600111222',
            'shipping_address' => 'Carrer de prova 12',
            'shipping_city' => 'Barcelona',
            'shipping_region' => 'Barcelona',
            'shipping_postal_code' => '08001',
            'billing_address' => 'Carrer de prova 12',
            'billing_city' => 'Barcelona',
            'billing_region' => 'Barcelona',
            'billing_postal_code' => '08001',
            'email' => 'test@example.com',
            'password' => 'password',
            'password_confirmation' => 'password',
        ]);

        $this->assertAuthenticated();
        $response->assertRedirect(route('dashboard', absolute: false));
    }
}

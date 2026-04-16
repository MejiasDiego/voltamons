<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Role;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Validation\Rules;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'birth_date' => ['required', 'regex:/^\d{2}\/\d{2}\/\d{4}$/'],
            'phone' => 'required|string|max:30',
            'shipping_address' => 'required|string|max:190',
            'shipping_city' => 'required|string|max:120',
            'shipping_region' => 'required|string|max:120',
            'shipping_postal_code' => 'required|string|max:20',
            'billing_address' => 'nullable|string|max:190',
            'billing_city' => 'nullable|string|max:120',
            'billing_region' => 'nullable|string|max:120',
            'billing_postal_code' => 'nullable|string|max:20',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $birthDate = Carbon::createFromFormat('d/m/Y', $validated['birth_date']);

        if (! $birthDate) {
            throw ValidationException::withMessages([
                'birth_date' => 'Format de data invalid.',
            ]);
        }

        $age = $birthDate->age;

        if ($age < 18 || $age > 100) {
            throw ValidationException::withMessages([
                'birth_date' => 'Has de tenir entre 18 i 100 anys.',
            ]);
        }

        $clientRoleId = Role::query()->where('slug', 'client')->value('id');

        $user = User::create([
            'role_id' => $clientRoleId,
            'name' => Str::title($validated['name']),
            'email' => $validated['email'],
            'birth_date' => $birthDate->toDateString(),
            'phone' => $validated['phone'],
            'shipping_address' => $validated['shipping_address'],
            'shipping_city' => Str::title($validated['shipping_city']),
            'shipping_region' => Str::title($validated['shipping_region']),
            'shipping_postal_code' => $validated['shipping_postal_code'],
            'billing_address' => $validated['billing_address'] ?? $validated['shipping_address'],
            'billing_city' => isset($validated['billing_city']) ? Str::title($validated['billing_city']) : Str::title($validated['shipping_city']),
            'billing_region' => isset($validated['billing_region']) ? Str::title($validated['billing_region']) : Str::title($validated['shipping_region']),
            'billing_postal_code' => $validated['billing_postal_code'] ?? $validated['shipping_postal_code'],
            'password' => Hash::make($validated['password']),
        ]);

        event(new Registered($user));

        Auth::login($user);

        return redirect(route('dashboard', absolute: false));
    }
}

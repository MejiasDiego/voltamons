<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Role;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class UserController extends Controller
{
    public function index(Request $request): Response
    {
        $users = User::query()
            ->with('role:id,name,slug')
            ->orderBy('name')
            ->paginate(12)
            ->withQueryString();

        return Inertia::render('Admin/Users/Index', [
            'users' => $users,
        ]);
    }

    public function edit(User $user): Response
    {
        $roles = Role::query()
            ->orderBy('name')
            ->get(['id', 'name', 'slug']);

        return Inertia::render('Admin/Users/Edit', [
            'user' => $user->only(['id', 'name', 'email', 'role_id']),
            'roles' => $roles,
        ]);
    }

    public function update(Request $request, User $user): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'lowercase', 'email', 'max:255', 'unique:users,email,'.$user->id],
            'role_id' => ['required', 'exists:roles,id'],
        ]);

        $user->update($validated);

        return redirect()
            ->route('admin.users.index')
            ->with('success', 'Usuari actualitzat correctament.');
    }

    public function destroy(Request $request, User $user): RedirectResponse
    {
        if ($request->user()?->id === $user->id) {
            return redirect()
                ->route('admin.users.index')
                ->with('error', 'No pots eliminar el teu propi usuari.');
        }

        $user->delete();

        return redirect()
            ->route('admin.users.index')
            ->with('success', 'Usuari eliminat correctament.');
    }
}

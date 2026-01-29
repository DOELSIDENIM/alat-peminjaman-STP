<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index()
    {
        $users = User::with('role')
            ->select('id', 'name', 'email', 'role_id', 'barcode', 'kuota_tersedia', 'alat_dipinjam')
            ->latest()
            ->paginate(10);

        return Inertia::render('Admin/User/Index', [
            'users' => $users
        ]);
    }

    public function create()
    {
        $roles = Role::all();

        return Inertia::render('Admin/User/Create', [
            'roles' => $roles
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:8',
            'role_id' => 'required|exists:roles,id',
            'barcode' => 'required|unique:users',
        ]);

        $validated['password'] = Hash::make($validated['password']);
        
        // Set default values
        $validated['kuota_tersedia'] = 10;
        $validated['alat_dipinjam'] = 0;

        User::create($validated);

        return redirect()->route('admin.user.index')
            ->with('success', 'User berhasil ditambahkan');
    }

    public function edit(User $user)
    {
        $roles = Role::all();

        return Inertia::render('Admin/User/Edit', [
            'user' => $user,
            'roles' => $roles
        ]);
    }

    public function update(Request $request, User $user)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,'.$user->id,
            'password' => 'nullable|min:8',
            'role_id' => 'required|exists:roles,id',
            'barcode' => 'required|unique:users,barcode,'.$user->id,
        ]);

        if (!empty($validated['password'])) {
            $validated['password'] = Hash::make($validated['password']);
        } else {
            unset($validated['password']);
        }

        $user->update($validated);

        return redirect()->route('admin.user.index')
            ->with('success', 'User berhasil diupdate');
    }

    public function destroy(User $user)
    {
        $user->delete();

        return redirect()->route('admin.user.index')
            ->with('success', 'User berhasil dihapus');
    }
}
<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        // Admin
        User::create([
            'name' => 'Admin System',
            'email' => 'admin@admin.com',
            'password' => Hash::make('password'),
            'role_id' => 1,
            'barcode' => 'ADM001',
            'kuota_tersedia' => 10,
            'alat_dipinjam' => 0,
        ]);

        // Petugas
        User::create([
            'name' => 'Petugas 1',
            'email' => 'petugas@admin.com',
            'password' => Hash::make('password'),
            'role_id' => 2,
            'barcode' => 'PTG001',
            'kuota_tersedia' => 10,
            'alat_dipinjam' => 0,
        ]);

        // Peminjam
        User::create([
            'name' => 'John Doe',
            'email' => 'peminjam@admin.com',
            'password' => Hash::make('password'),
            'role_id' => 3,
            'barcode' => 'PMJ001',
            'kuota_tersedia' => 10,
            'alat_dipinjam' => 0,
        ]);

        User::create([
            'name' => 'Jane Smith',
            'email' => 'jane@admin.com',
            'password' => Hash::make('password'),
            'role_id' => 3,
            'barcode' => 'PMJ002',
            'kuota_tersedia' => 10,
            'alat_dipinjam' => 0,

            
        ]);

         User::create([
            'name' => 'Rayhan',
            'email' => 'rayhan@gmail.com',
            'password' => Hash::make('12345678'),
            'role_id' => 3,
            'barcode' => 'PMJ003',
            'kuota_tersedia' => 10,
            'alat_dipinjam' => 0,

            
        ]);
    }
}
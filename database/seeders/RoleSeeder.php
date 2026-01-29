<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Role;

class RoleSeeder extends Seeder
{
    public function run(): void
    {
        $roles = [
            [
                'nama_role' => 'Admin',
                'deskripsi' => 'Administrator sistem dengan akses penuh'
            ],
            [
                'nama_role' => 'Petugas',
                'deskripsi' => 'Petugas yang mengelola peminjaman dan pengembalian'
            ],
            [
                'nama_role' => 'Peminjam',
                'deskripsi' => 'User yang dapat meminjam alat'
            ],
        ];

        foreach ($roles as $role) {
            Role::create($role);
        }
    }
}
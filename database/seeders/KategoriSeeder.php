<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Kategori;

class KategoriSeeder extends Seeder
{
    public function run(): void
    {
        $kategoris = [
            ['nama_kategori' => 'Elektronik', 'deskripsi' => 'Peralatan elektronik'],
            ['nama_kategori' => 'Komputer', 'deskripsi' => 'Peralatan komputer dan aksesoris'],
            ['nama_kategori' => 'Olahraga', 'deskripsi' => 'Peralatan olahraga'],
            ['nama_kategori' => 'Alat Tulis', 'deskripsi' => 'Perlengkapan alat tulis'],
            ['nama_kategori' => 'Multimedia', 'deskripsi' => 'Peralatan multimedia'],
        ];

        foreach ($kategoris as $kategori) {
            Kategori::create($kategori);
        }
    }
}
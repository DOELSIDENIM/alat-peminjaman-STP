<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Alat;

class AlatSeeder extends Seeder
{
    public function run(): void
    {
        $alats = [
            // Elektronik
            ['kode_alat' => 'ELK001', 'nama_alat' => 'Kamera DSLR Canon', 'kategori_id' => 1, 'spesifikasi' => 'Canon EOS 80D, 24.2MP', 'kondisi' => 'baik', 'status' => 'tersedia', 'lokasi_penyimpanan' => 'Rak A1', 'foto' => 'alats/s9YwjS28Z94QD38AKHIV9Rq2rCBM4QaG0NyDGbJ8.jpg'],
            ['kode_alat' => 'ELK002', 'nama_alat' => 'Proyektor Epson', 'kategori_id' => 1, 'spesifikasi' => 'Epson EB-X41, 3600 lumens', 'kondisi' => 'baik', 'status' => 'tersedia', 'lokasi_penyimpanan' => 'Rak A2', 'foto' => 'alats/proyektor.jpeg'],
            ['kode_alat' => 'ELK003', 'nama_alat' => 'Speaker Bluetooth JBL', 'kategori_id' => 1, 'spesifikasi' => 'JBL Flip 5, Waterproof', 'kondisi' => 'baik', 'status' => 'tersedia', 'lokasi_penyimpanan' => 'Rak A3', 'foto' => null],

            // Komputer
            ['kode_alat' => 'KOM001', 'nama_alat' => 'Laptop Asus ROG', 'kategori_id' => 2, 'spesifikasi' => 'Intel i7, 16GB RAM, RTX 3060', 'kondisi' => 'baik', 'status' => 'tersedia', 'lokasi_penyimpanan' => 'Rak B1', 'foto' => 'alats/u3tZIcYegLjvn28H9QdFTbmioWrQH9WQYhxik7lF.png'],
            ['kode_alat' => 'KOM002', 'nama_alat' => 'Mouse Logitech', 'kategori_id' => 2, 'spesifikasi' => 'Logitech MX Master 3', 'kondisi' => 'baik', 'status' => 'tersedia', 'lokasi_penyimpanan' => 'Rak B2', 'foto' => null],
            ['kode_alat' => 'KOM003', 'nama_alat' => 'Keyboard Mechanical', 'kategori_id' => 2, 'spesifikasi' => 'Keychron K2, RGB', 'kondisi' => 'baik', 'status' => 'tersedia', 'lokasi_penyimpanan' => 'Rak B3', 'foto' => null],
            ['kode_alat' => 'KOM004', 'nama_alat' => 'Tablet Wacom', 'kategori_id' => 2, 'spesifikasi' => 'Wacom Intuos Pro Medium', 'kondisi' => 'baik', 'status' => 'tersedia', 'lokasi_penyimpanan' => 'Rak B4', 'foto' => 'alats/vuTJ8F3asmxwFzDuf2Ar034QUkG8t7TaSzXTX1ZT.png'],

            // Olahraga
            ['kode_alat' => 'OLG001', 'nama_alat' => 'Bola Basket Mikasa', 'kategori_id' => 3, 'spesifikasi' => 'Size 7, Official', 'kondisi' => 'baik', 'status' => 'tersedia', 'lokasi_penyimpanan' => 'Gudang Olahraga', 'foto' => null],
            ['kode_alat' => 'OLG002', 'nama_alat' => 'Raket Badminton Yonex', 'kategori_id' => 3, 'spesifikasi' => 'Yonex Astrox 88D', 'kondisi' => 'baik', 'status' => 'tersedia', 'lokasi_penyimpanan' => 'Gudang Olahraga', 'foto' => null],
            ['kode_alat' => 'OLG003', 'nama_alat' => 'Matras Yoga', 'kategori_id' => 3, 'spesifikasi' => 'TPE Material, 6mm', 'kondisi' => 'baik', 'status' => 'tersedia', 'lokasi_penyimpanan' => 'Gudang Olahraga', 'foto' => null],

            // Multimedia
            ['kode_alat' => 'MUL001', 'nama_alat' => 'Microphone Shure', 'kategori_id' => 5, 'spesifikasi' => 'Shure SM58, Dynamic', 'kondisi' => 'baik', 'status' => 'tersedia', 'lokasi_penyimpanan' => 'Rak C1', 'foto' => null],
            ['kode_alat' => 'MUL002', 'nama_alat' => 'Tripod Manfrotto', 'kategori_id' => 5, 'spesifikasi' => 'Manfrotto MT055, Carbon', 'kondisi' => 'baik', 'status' => 'tersedia', 'lokasi_penyimpanan' => 'Rak C2', 'foto' => null],
            ['kode_alat' => 'MUL003', 'nama_alat' => 'Lampu Ring Light', 'kategori_id' => 5, 'spesifikasi' => '18 inch, Dimmable', 'kondisi' => 'baik', 'status' => 'tersedia', 'lokasi_penyimpanan' => 'Rak C3', 'foto' => 'alats/rglght.jpeg'],

            // Beberapa dengan status berbeda
            ['kode_alat' => 'ELK004', 'nama_alat' => 'Kamera GoPro', 'kategori_id' => 1, 'spesifikasi' => 'GoPro Hero 10', 'kondisi' => 'rusak_ringan', 'status' => 'maintenance', 'lokasi_penyimpanan' => 'Rak A4', 'foto' => null],
            ['kode_alat' => 'KOM005', 'nama_alat' => 'Headset Gaming', 'kategori_id' => 2, 'spesifikasi' => 'HyperX Cloud II', 'kondisi' => 'rusak_berat', 'status' => 'rusak', 'lokasi_penyimpanan' => 'Gudang Rusak', 'foto' => null],
        ];

        foreach ($alats as $alat) {
            Alat::create($alat);
        }
    }
}
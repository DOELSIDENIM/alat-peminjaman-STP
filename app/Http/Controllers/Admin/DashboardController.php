<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Alat;
use App\Models\Peminjaman;
use App\Models\User;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $totalAlat = Alat::count();
        $alatTersedia = Alat::where('status', 'tersedia')->count();
        $alatTerpinjam = Alat::where('status', 'terpinjam')->count();
        $alatRusak = Alat::whereIn('status', ['maintenance', 'rusak'])->count();
        
        $totalPeminjam = User::where('role_id', 3)->count();
        $peminjamanAktif = Peminjaman::where('status', 'disetujui')->count();
        $peminjamanMenunggu = Peminjaman::where('status', 'menunggu_petugas')->count();
        
        // Grafik peminjaman 7 hari terakhir
        $peminjaman7Hari = Peminjaman::where('created_at', '>=', now()->subDays(7))
            ->selectRaw('DATE(created_at) as tanggal, COUNT(*) as jumlah')
            ->groupBy('tanggal')
            ->orderBy('tanggal')
            ->get();

        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                'totalAlat' => $totalAlat,
                'alatTersedia' => $alatTersedia,
                'alatTerpinjam' => $alatTerpinjam,
                'alatRusak' => $alatRusak,
                'totalPeminjam' => $totalPeminjam,
                'peminjamanAktif' => $peminjamanAktif,
                'peminjamanMenunggu' => $peminjamanMenunggu,
            ],
            'grafik' => $peminjaman7Hari
        ]);
    }
}
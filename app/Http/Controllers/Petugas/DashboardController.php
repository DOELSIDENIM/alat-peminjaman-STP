<?php

namespace App\Http\Controllers\Petugas;

use App\Http\Controllers\Controller;
use App\Models\Peminjaman;
use App\Models\Pengembalian;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $peminjamanHariIni = Peminjaman::whereDate('created_at', today())->count();
        $pengembalianHariIni = Pengembalian::whereDate('created_at', today())->count();
        $peminjamanMenunggu = Peminjaman::where('status', 'menunggu_petugas')->count();
        $peminjamanAktif = Peminjaman::where('status', 'disetujui')->count();

        $recentPeminjaman = Peminjaman::with(['peminjam', 'details'])
            ->latest()
            ->take(5)
            ->get();

        return Inertia::render('Petugas/Dashboard', [
            'stats' => [
                'peminjamanHariIni' => $peminjamanHariIni,
                'pengembalianHariIni' => $pengembalianHariIni,
                'peminjamanMenunggu' => $peminjamanMenunggu,
                'peminjamanAktif' => $peminjamanAktif,
            ],
            'recentPeminjaman' => $recentPeminjaman
        ]);
    }
}
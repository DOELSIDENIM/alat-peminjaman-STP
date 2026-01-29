<?php

namespace App\Http\Controllers\Peminjam;

use App\Http\Controllers\Controller;
use App\Models\PeminjamanDetail;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        
        $alatDipinjam = PeminjamanDetail::with(['alat.kategori', 'peminjaman'])
            ->whereHas('peminjaman', function($q) use ($user) {
                $q->where('peminjam_id', $user->id)
                  ->where('status', 'disetujui');
            })
            ->where('status_detail', 'dipinjam')
            ->get();

        return Inertia::render('Peminjam/Dashboard', [
            'user' => $user,
            'alatDipinjam' => $alatDipinjam,
            'stats' => [
                'kuota_tersedia' => $user->kuota_tersedia,
                'alat_dipinjam' => $user->alat_dipinjam,
                'total_kuota' => 10,
            ]
        ]);
    }
}
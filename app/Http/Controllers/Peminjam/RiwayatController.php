<?php

namespace App\Http\Controllers\Peminjam;

use App\Http\Controllers\Controller;
use App\Models\Peminjaman;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class RiwayatController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        
        $riwayat = Peminjaman::with(['details.alat', 'petugas'])
            ->where('peminjam_id', $user->id)
            ->latest()
            ->paginate(10);

        return Inertia::render('Peminjam/Riwayat/Index', [
            'riwayat' => $riwayat
        ]);
    }
}
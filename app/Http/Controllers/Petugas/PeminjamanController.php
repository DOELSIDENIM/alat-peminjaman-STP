<?php

namespace App\Http\Controllers\Petugas;

use App\Http\Controllers\Controller;
use App\Models\Peminjaman;
use App\Models\Alat;
use App\Models\User;
use App\Models\HistoriTransaksi;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class PeminjamanController extends Controller
{
    public function index()
    {
        $peminjamans = Peminjaman::with(['peminjam', 'details.alat'])
            ->menunggu()
            ->latest()
            ->paginate(10);

        return Inertia::render('Petugas/Peminjaman/Index', [
            'peminjamans' => $peminjamans
        ]);
    }

    public function show(Peminjaman $peminjaman)
    {
        $peminjaman->load(['peminjam', 'details.alat.kategori']);

        return Inertia::render('Petugas/Peminjaman/Detail', [
            'peminjaman' => $peminjaman
        ]);
    }

    public function approve(Request $request, Peminjaman $peminjaman)
    {
        $request->validate([
            'barcode_petugas' => 'required'
        ]);

        // Validasi barcode petugas
        $petugas = User::where('barcode', $request->barcode_petugas)
            ->where('role_id', 2)
            ->first();

        if (!$petugas) {
            return back()->with('error', 'Barcode petugas tidak valid');
        }

        DB::beginTransaction();
        try {
            // Update peminjaman
            $peminjaman->update([
                'status' => 'disetujui',
                'petugas_id' => $petugas->id,
                'tanggal_disetujui' => now(),
            ]);

            // Update setiap detail dan alat
            foreach ($peminjaman->details as $detail) {
                // Update detail
                $detail->update([
                    'status_detail' => 'dipinjam',
                    'tanggal_pinjam' => now(),
                ]);

                // Update status alat
                $detail->alat->update([
                    'status' => 'terpinjam'
                ]);

                // Buat histori
                HistoriTransaksi::create([
                    'alat_id' => $detail->alat_id,
                    'peminjam_id' => $peminjaman->peminjam_id,
                    'petugas_pinjam_id' => $petugas->id,
                    'jenis_transaksi' => 'peminjaman',
                    'tanggal_pinjam' => now(),
                    'kondisi_pinjam' => $detail->alat->kondisi,
                ]);
            }

            // Update kuota peminjam
            $peminjaman->peminjam->update([
                'alat_dipinjam' => $peminjaman->peminjam->alat_dipinjam + $peminjaman->jumlah_alat,
                'kuota_tersedia' => $peminjaman->peminjam->kuota_tersedia - $peminjaman->jumlah_alat,
            ]);

            DB::commit();

            return redirect()->route('petugas.peminjaman.index')
                ->with('success', 'Peminjaman berhasil disetujui');

        } catch (\Exception $e) {
            DB::rollback();
            return back()->with('error', 'Terjadi kesalahan: ' . $e->getMessage());
        }
    }

    public function reject(Request $request, Peminjaman $peminjaman)
    {
        $request->validate([
            'catatan' => 'required'
        ]);

        $peminjaman->update([
            'status' => 'ditolak',
            'catatan' => $request->catatan,
        ]);

        return redirect()->route('petugas.peminjaman.index')
            ->with('success', 'Peminjaman ditolak');
    }
}
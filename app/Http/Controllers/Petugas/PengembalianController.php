<?php

namespace App\Http\Controllers\Petugas;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\PeminjamanDetail;
use App\Models\Pengembalian;
use App\Models\HistoriTransaksi;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class PengembalianController extends Controller
{
    public function index()
    {
        return Inertia::render('Petugas/Pengembalian/Index');
    }

    public function scanPeminjam(Request $request)
    {
        $request->validate([
            'barcode' => 'required|string|exists:users,barcode',
        ]);

        $peminjam = User::where('barcode', $request->barcode)
            ->where('role_id', 3)
            ->first();

        if (!$peminjam) {
            return back()->with('error', 'Barcode peminjam tidak ditemukan');
        }

        $alatDipinjam = PeminjamanDetail::with(['alat.kategori', 'peminjaman'])
            ->whereHas('peminjaman', function($q) use ($peminjam) {
                $q->where('peminjam_id', $peminjam->id)
                  ->where('status', 'disetujui');
            })
            ->where('status_detail', 'dipinjam')
            ->get();

        return Inertia::render('Petugas/Pengembalian/Form', [
            'peminjam' => $peminjam,
            'alatDipinjam' => $alatDipinjam
        ]);
    }

    public function process(Request $request)
    {
        $request->validate([
            'peminjam_id' => 'required|exists:users,id',
            'barcode_petugas' => 'required|string|exists:users,barcode',
            'alat_kembali' => 'required|array|min:1',
            'alat_kembali.*.detail_id' => 'required|exists:peminjaman_details,id',
            'alat_kembali.*.kondisi' => 'required|in:baik,rusak_ringan,rusak_berat',
        ]);

        $petugas = User::where('barcode', $request->barcode_petugas)
            ->where('role_id', 2)
            ->first();

        if (!$petugas) {
            return back()->with('error', 'Barcode petugas tidak valid');
        }

        $peminjam = User::findOrFail($request->peminjam_id);

        DB::beginTransaction();
        try {
            $jumlahDikembalikan = count($request->alat_kembali);
            
            $nomorPengembalian = 'RET-' . date('Ymd') . '-' . str_pad(Pengembalian::count() + 1, 4, '0', STR_PAD_LEFT);

            $firstDetail = PeminjamanDetail::find($request->alat_kembali[0]['detail_id']);
            
            $pengembalian = Pengembalian::create([
                'nomor_pengembalian' => $nomorPengembalian,
                'peminjaman_id' => $firstDetail->peminjaman_id,
                'peminjam_id' => $peminjam->id,
                'petugas_id' => $petugas->id,
                'jumlah_dikembalikan' => $jumlahDikembalikan,
                'catatan_petugas' => $request->catatan,
            ]);

            foreach ($request->alat_kembali as $item) {
                $detail = PeminjamanDetail::findOrFail($item['detail_id']);
                
                $tanggalPinjam = $detail->tanggal_pinjam;
                $tanggalKembali = now();
                $durasi = max(1, $tanggalPinjam->diffInDays($tanggalKembali) + 1);

                $detail->update([
                    'status_detail' => 'dikembalikan',
                    'tanggal_kembali' => $tanggalKembali,
                    'durasi_hari' => $durasi,
                ]);

                $statusBaru = match($item['kondisi']) {
                    'baik' => 'tersedia',
                    'rusak_ringan' => 'maintenance',
                    'rusak_berat' => 'rusak',
                };

                $detail->alat->update([
                    'status' => $statusBaru,
                    'kondisi' => $item['kondisi'],
                ]);

                $histori = HistoriTransaksi::where('alat_id', $detail->alat_id)
                    ->where('peminjam_id', $peminjam->id)
                    ->whereNull('tanggal_kembali')
                    ->latest()
                    ->first();

                if ($histori) {
                    $histori->update([
                        'petugas_kembali_id' => $petugas->id,
                        'tanggal_kembali' => $tanggalKembali,
                        'durasi_hari' => $durasi,
                        'kondisi_kembali' => $item['kondisi'],
                    ]);
                }
            }

            $peminjam->update([
                'alat_dipinjam' => $peminjam->alat_dipinjam - $jumlahDikembalikan,
                'kuota_tersedia' => $peminjam->kuota_tersedia + $jumlahDikembalikan,
            ]);

            DB::commit();

            return redirect()->route('petugas.pengembalian.index')
                ->with('success', 'Pengembalian berhasil: ' . $nomorPengembalian);

        } catch (\Exception $e) {
            DB::rollback();
            return back()->with('error', 'Terjadi kesalahan: ' . $e->getMessage());
        }
    }
}
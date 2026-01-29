<?php

namespace App\Http\Controllers\Peminjam;

use App\Http\Controllers\Controller;
use App\Models\Alat;
use App\Models\Peminjaman;
use App\Models\PeminjamanDetail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class KeranjangController extends Controller
{
    public function addToCart(Request $request)
    {
        $user = Auth::user();

        // Normalisasi nilai kuota jika masih null (misal user lama sebelum kolom ditambahkan)
        $user->kuota_tersedia = $user->kuota_tersedia ?? 10;
        $user->alat_dipinjam = $user->alat_dipinjam ?? 0;

        // Hitung alat yang sudah dibooking (menunggu petugas) agar tidak bisa melebihi batas
        $alatDibooking = PeminjamanDetail::query()
            ->whereHas('peminjaman', function ($q) use ($user) {
                $q->where('peminjam_id', $user->id)
                    ->where('status', 'menunggu_petugas');
            })
            ->where('status_detail', 'menunggu')
            ->count();
        
        if ($user->kuota_tersedia <= 0) {
            return back()->with('error', 'Kuota peminjaman Anda sudah penuh');
        }

        $alat = Alat::findOrFail($request->alat_id);

        if ($alat->status !== 'tersedia' || $alat->kondisi !== 'baik') {
            return back()->with('error', 'Alat tidak tersedia');
        }

        $cart = session()->get('cart', []);
        
        if (count($cart) + $user->alat_dipinjam + $alatDibooking >= 10) {
            return back()->with('error', 'Keranjang + alat dipinjam + booking aktif tidak boleh melebihi 10');
        }

        if (!isset($cart[$alat->id])) {
            // Pastikan kategori aman diakses (hindari error kalau data alat belum punya kategori)
            $kategoriNama = optional($alat->kategori)->nama_kategori ?? '-';

            $cart[$alat->id] = [
                'id' => $alat->id,
                'kode_alat' => $alat->kode_alat,
                'nama_alat' => $alat->nama_alat,
                'kategori' => $kategoriNama,
            ];
        }

        session()->put('cart', $cart);

        return back()->with('success', 'Alat ditambahkan ke keranjang');
    }

    public function viewCart()
    {
        $cart = session()->get('cart', []);

        // Nama komponen harus persis dengan path file React (resources/js/Pages/Peminjam/Keranjang/Index.jsx)
        return Inertia::render('Peminjam/Keranjang/Index', [
            'cart' => array_values($cart)
        ]);
    }

    public function removeFromCart($alatId)
    {
        $cart = session()->get('cart', []);
        
        if (isset($cart[$alatId])) {
            unset($cart[$alatId]);
            session()->put('cart', $cart);
        }

        return back()->with('success', 'Alat dihapus dari keranjang');
    }

    public function checkout(Request $request)
    {
        $cart = session()->get('cart', []);

        if (empty($cart)) {
            return back()->with('error', 'Keranjang kosong');
        }

        $user = Auth::user();

        // Validasi ketersediaan alat SEBELUM transaksi DB, supaya tidak meninggalkan transaksi menggantung
        foreach ($cart as $item) {
            $alat = Alat::find($item['id']);
            if (!$alat || $alat->status !== 'tersedia' || $alat->kondisi !== 'baik') {
                return back()->with('error', 'Alat ' . $item['nama_alat'] . ' tidak tersedia');
            }
        }

        DB::beginTransaction();
        try {
            $nomorTransaksi = 'TRX-' . date('Ymd') . '-' . str_pad(Peminjaman::count() + 1, 4, '0', STR_PAD_LEFT);

            // Buat peminjaman MENUNGGU petugas (agar muncul di dashboard petugas untuk approve)
            $peminjaman = Peminjaman::create([
                'nomor_transaksi' => $nomorTransaksi,
                'peminjam_id' => $user->id,
                'petugas_id' => null,
                'jumlah_alat' => count($cart),
                'status' => 'menunggu_petugas',
                'tanggal_booking' => now(),
                'booking_expired_at' => now()->addMinutes(30),
            ]);

            // Simpan detail sebagai "menunggu" (alat & kuota diupdate saat petugas approve)
            foreach ($cart as $item) {
                PeminjamanDetail::create([
                    'peminjaman_id' => $peminjaman->id,
                    'alat_id' => $item['id'],
                    'status_detail' => 'menunggu',
                ]);
            }

            session()->forget('cart');

            DB::commit();

            return redirect()->route('peminjam.riwayat.index')
                ->with('success', 'Booking peminjaman berhasil dibuat, menunggu petugas: ' . $nomorTransaksi);

        } catch (\Exception $e) {
            DB::rollback();
            return back()->with('error', 'Terjadi kesalahan: ' . $e->getMessage());
        }
    }
}

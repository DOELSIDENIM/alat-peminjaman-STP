<?php

namespace App\Http\Controllers\Peminjam;

use App\Http\Controllers\Controller;
use App\Models\Alat;
use App\Models\Kategori;
use Illuminate\Http\Request;
use Inertia\Inertia;

class KatalogController extends Controller
{
    public function index(Request $request)
    {
        $query = Alat::with('kategori')
            ->where('status', 'tersedia')
            ->where('kondisi', 'baik');

        if ($request->kategori_id) {
            $query->where('kategori_id', $request->kategori_id);
        }

        if ($request->search) {
            $query->where(function($q) use ($request) {
                $q->where('nama_alat', 'like', '%'.$request->search.'%')
                  ->orWhere('kode_alat', 'like', '%'.$request->search.'%')
                  ->orWhere('spesifikasi', 'like', '%'.$request->search.'%');
            });
        }

        $alats = $query->latest()->paginate(12);
        
        // Append foto_url accessor
        $alats->getCollection()->transform(function ($alat) {
            $alat->foto_url = $alat->foto_url;
            return $alat;
        });
        
        $kategoris = Kategori::all();

        // Catatan: nama komponen harus sesuai dengan path file React (resources/js/Pages/Peminjam/katalog/Index.jsx)
        return Inertia::render('Peminjam/katalog/Index', [
            'alats' => $alats,
            'kategoris' => $kategoris,
            'filters' => $request->only(['kategori_id', 'search'])
        ]);
    }
}
<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Alat;
use App\Models\Kategori;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class AlatController extends Controller
{
    public function index()
    {
        $alats = Alat::with('kategori')
            ->latest()
            ->paginate(10);

        // Append foto_url accessor
        $alats->getCollection()->transform(function ($alat) {
            $alat->foto_url = $alat->foto_url;
            return $alat;
        });

        return Inertia::render('Admin/Alat/Index', [
            'alats' => $alats
        ]);
    }

    public function create()
    {
        $kategoris = Kategori::all();

        return Inertia::render('Admin/Alat/Create', [
            'kategoris' => $kategoris
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'kode_alat' => 'required|unique:alats',
            'nama_alat' => 'required',
            'kategori_id' => 'required|exists:kategoris,id',
            'spesifikasi' => 'nullable',
            'kondisi' => 'required|in:baik,rusak_ringan,rusak_berat',
            'status' => 'required|in:tersedia,terpinjam,maintenance,rusak',
            'lokasi_penyimpanan' => 'nullable',
            'foto' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        // Handle file upload
        if ($request->hasFile('foto')) {
            $validated['foto'] = $request->file('foto')->store('alats', 'public');
        }

        Alat::create($validated);

        return redirect()->route('admin.alat.index')
            ->with('success', 'Alat berhasil ditambahkan');
    }

    public function edit(Alat $alat)
    {
        $kategoris = Kategori::all();

        // Append foto_url accessor
        $alat->foto_url = $alat->foto_url;

        return Inertia::render('Admin/Alat/Edit', [
            'alat' => $alat,
            'kategoris' => $kategoris
        ]);
    }

    public function update(Request $request, Alat $alat)
    {
        $validated = $request->validate([
            'kode_alat' => 'required|unique:alats,kode_alat,'.$alat->id,
            'nama_alat' => 'required',
            'kategori_id' => 'required|exists:kategoris,id',
            'spesifikasi' => 'nullable',
            'kondisi' => 'required|in:baik,rusak_ringan,rusak_berat',
            'status' => 'required|in:tersedia,terpinjam,maintenance,rusak',
            'lokasi_penyimpanan' => 'nullable',
            'foto' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        // Handle file upload
        if ($request->hasFile('foto')) {
            // Delete old photo if exists
            if ($alat->foto) {
                Storage::disk('public')->delete($alat->foto);
            }
            $validated['foto'] = $request->file('foto')->store('alats', 'public');
        }

        $alat->update($validated);

        return redirect()->route('admin.alat.index')
            ->with('success', 'Alat berhasil diupdate');
    }

    public function destroy(Alat $alat)
    {
        // Delete photo if exists
        if ($alat->foto) {
            Storage::disk('public')->delete($alat->foto);
        }

        $alat->delete();

        return redirect()->route('admin.alat.index')
            ->with('success', 'Alat berhasil dihapus');
    }
}
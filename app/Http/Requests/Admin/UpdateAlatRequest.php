<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class UpdateAlatRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        $user = auth()->user();
        if (!$user || !$user->role) {
            return false;
        }
        return $user->role->nama_role === 'Admin';
    }

    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        $alatId = $this->route('alat'); // Mengambil ID dari route parameter

        return [
            'kode_alat' => 'required|string|max:255|unique:alats,kode_alat,' . $alatId,
            'nama_alat' => 'required|string|max:255',
            'kategori_id' => 'required|exists:kategoris,id',
            'spesifikasi' => 'nullable|string',
            'kondisi' => 'required|in:baik,rusak_ringan,rusak_berat',
            'status' => 'required|in:tersedia,terpinjam,maintenance,rusak',
            'lokasi_penyimpanan' => 'nullable|string|max:255',
            'foto' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ];
    }

    /**
     * Get custom messages for validator errors.
     */
    public function messages(): array
    {
        return [
            'kode_alat.required' => 'Kode alat harus diisi',
            'kode_alat.unique' => 'Kode alat sudah digunakan',
            'nama_alat.required' => 'Nama alat harus diisi',
            'kategori_id.required' => 'Kategori harus dipilih',
            'kategori_id.exists' => 'Kategori tidak valid',
            'kondisi.required' => 'Kondisi alat harus dipilih',
            'kondisi.in' => 'Kondisi alat tidak valid',
            'status.required' => 'Status alat harus dipilih',
            'status.in' => 'Status alat tidak valid',
        ];
    }
}
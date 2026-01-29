<?php

namespace App\Http\Requests\Petugas;

use Illuminate\Foundation\Http\FormRequest;

class ProcessPengembalianRequest extends FormRequest
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
        return $user->role->nama_role === 'Petugas';
    }

    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            'peminjam_id' => 'required|exists:users,id',
            'barcode_petugas' => 'required|string|exists:users,barcode',
            'alat_kembali' => 'required|array|min:1',
            'alat_kembali.*.detail_id' => 'required|exists:peminjaman_details,id',
            'alat_kembali.*.kondisi' => 'required|in:baik,rusak_ringan,rusak_berat',
            'catatan' => 'nullable|string|max:500',
        ];
    }

    /**
     * Get custom messages for validator errors.
     */
    public function messages(): array
    {
        return [
            'peminjam_id.required' => 'ID peminjam harus diisi',
            'peminjam_id.exists' => 'Peminjam tidak ditemukan',
            'barcode_petugas.required' => 'Barcode petugas harus diisi',
            'barcode_petugas.exists' => 'Barcode petugas tidak valid',
            'alat_kembali.required' => 'Pilih minimal 1 alat untuk dikembalikan',
            'alat_kembali.min' => 'Pilih minimal 1 alat untuk dikembalikan',
            'alat_kembali.*.detail_id.required' => 'ID detail peminjaman harus diisi',
            'alat_kembali.*.detail_id.exists' => 'Detail peminjaman tidak ditemukan',
            'alat_kembali.*.kondisi.required' => 'Kondisi alat harus diisi',
            'alat_kembali.*.kondisi.in' => 'Kondisi alat tidak valid',
            'catatan.max' => 'Catatan maksimal 500 karakter',
        ];
    }
}
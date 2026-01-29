<?php

namespace App\Http\Requests\Petugas;

use Illuminate\Foundation\Http\FormRequest;

class ScanPeminjamRequest extends FormRequest
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
            'barcode' => 'required|string|exists:users,barcode',
        ];
    }

    /**
     * Get custom messages for validator errors.
     */
    public function messages(): array
    {
        return [
            'barcode.required' => 'Barcode peminjam harus diisi',
            'barcode.exists' => 'Barcode peminjam tidak valid',
        ];
    }
}
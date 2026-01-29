<?php

namespace App\Http\Requests\Peminjam;

use Illuminate\Foundation\Http\FormRequest;

class AddToCartRequest extends FormRequest
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
        return $user->role->nama_role === 'Peminjam';
    }

    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            'alat_id' => 'required|exists:alats,id',
        ];
    }

    /**
     * Get custom messages for validator errors.
     */
    public function messages(): array
    {
        return [
            'alat_id.required' => 'ID alat harus diisi',
            'alat_id.exists' => 'Alat tidak ditemukan',
        ];
    }
}
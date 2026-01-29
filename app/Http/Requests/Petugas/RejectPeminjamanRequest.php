<?php

namespace App\Http\Requests\Petugas;

use Illuminate\Foundation\Http\FormRequest;

class RejectPeminjamanRequest extends FormRequest
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
            'catatan' => 'required|string|max:500',
        ];
    }

    /**
     * Get custom messages for validator errors.
     */
    public function messages(): array
    {
        return [
            'catatan.required' => 'Alasan penolakan harus diisi',
            'catatan.max' => 'Alasan penolakan maksimal 500 karakter',
        ];
    }
}
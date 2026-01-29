<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Alat extends Model
{
    use HasFactory;

    protected $fillable = [
        'kode_alat',
        'nama_alat',
        'kategori_id',
        'spesifikasi',
        'kondisi',
        'status',
        'lokasi_penyimpanan',
        'foto',
    ];

    public function kategori()
    {
        return $this->belongsTo(Kategori::class);
    }

    public function peminjamanDetails()
    {
        return $this->hasMany(PeminjamanDetail::class);
    }

    public function historiTransaksis()
    {
        return $this->hasMany(HistoriTransaksi::class);
    }

    // Scope untuk alat yang tersedia
    public function scopeTersedia($query)
    {
        return $query->where('status', 'tersedia')
                    ->where('kondisi', 'baik');
    }

    // Accessor untuk mendapatkan URL foto
    public function getFotoUrlAttribute()
    {
        if ($this->foto) {
            return Storage::disk('public')->url($this->foto);
        }
        return null;
    }
}
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PeminjamanDetail extends Model
{
    use HasFactory;

    protected $fillable = [
        'peminjaman_id',
        'alat_id',
        'status_detail',
        'tanggal_pinjam',
        'tanggal_kembali',
        'durasi_hari',
    ];

    protected $casts = [
        'tanggal_pinjam' => 'datetime',
        'tanggal_kembali' => 'datetime',
    ];

    public function peminjaman()
    {
        return $this->belongsTo(Peminjaman::class);
    }

    public function alat()
    {
        return $this->belongsTo(Alat::class);
    }

    // Scope untuk alat yang sedang dipinjam
    public function scopeDipinjam($query)
    {
        return $query->where('status_detail', 'dipinjam');
    }
}
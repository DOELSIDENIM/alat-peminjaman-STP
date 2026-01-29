<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pengembalian extends Model
{
    use HasFactory;

    protected $fillable = [
        'nomor_pengembalian',
        'peminjaman_id',
        'peminjam_id',
        'petugas_id',
        'jumlah_dikembalikan',
        'catatan_petugas',
    ];

    public function peminjaman()
    {
        return $this->belongsTo(Peminjaman::class);
    }

    public function peminjam()
    {
        return $this->belongsTo(User::class, 'peminjam_id');
    }

    public function petugas()
    {
        return $this->belongsTo(User::class, 'petugas_id');
    }
}
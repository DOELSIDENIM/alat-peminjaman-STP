<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HistoriTransaksi extends Model
{
    use HasFactory;

    protected $fillable = [
        'alat_id',
        'peminjam_id',
        'petugas_pinjam_id',
        'petugas_kembali_id',
        'jenis_transaksi',
        'tanggal_pinjam',
        'tanggal_kembali',
        'durasi_hari',
        'kondisi_pinjam',
        'kondisi_kembali',
        'keterangan',
    ];

    protected $casts = [
        'tanggal_pinjam' => 'datetime',
        'tanggal_kembali' => 'datetime',
    ];

    public function alat()
    {
        return $this->belongsTo(Alat::class);
    }

    public function peminjam()
    {
        return $this->belongsTo(User::class, 'peminjam_id');
    }

    public function petugasPinjam()
    {
        return $this->belongsTo(User::class, 'petugas_pinjam_id');
    }

    public function petugasKembali()
    {
        return $this->belongsTo(User::class, 'petugas_kembali_id');
    }
}
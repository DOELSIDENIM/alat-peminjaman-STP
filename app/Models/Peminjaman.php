<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Peminjaman extends Model
{
    use HasFactory;

    protected $table = 'peminjamen';

    protected $fillable = [
        'nomor_transaksi',
        'peminjam_id',
        'petugas_id',
        'jumlah_alat',
        'status',
        'catatan',
        'tanggal_booking',
        'tanggal_disetujui',
        'booking_expired_at',
    ];

    protected $casts = [
        'tanggal_booking' => 'datetime',
        'tanggal_disetujui' => 'datetime',
        'booking_expired_at' => 'datetime',
    ];

    public function peminjam()
    {
        return $this->belongsTo(User::class, 'peminjam_id');
    }

    public function petugas()
    {
        return $this->belongsTo(User::class, 'petugas_id');
    }

    public function details()
    {
        return $this->hasMany(PeminjamanDetail::class);
    }

    public function pengembalians()
    {
        return $this->hasMany(Pengembalian::class);
    }

    // Scope untuk peminjaman yang menunggu
    public function scopeMenunggu($query)
    {
        return $query->where('status', 'menunggu_petugas');
    }

    // Scope untuk peminjaman aktif
    public function scopeAktif($query)
    {
        return $query->where('status', 'disetujui');
    }
}
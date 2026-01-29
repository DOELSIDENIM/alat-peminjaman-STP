<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
        'role_id',
        'barcode',
        'kuota_tersedia',
        'alat_dipinjam',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function role()
    {
        return $this->belongsTo(Role::class);
    }

    public function peminjamans()
    {
        return $this->hasMany(Peminjaman::class, 'peminjam_id');
    }

    public function peminjamansAsOfficer()
    {
        return $this->hasMany(Peminjaman::class, 'petugas_id');
    }

    public function historiTransaksis()
    {
        return $this->hasMany(HistoriTransaksi::class, 'peminjam_id');
    }

    // Helper methods untuk check role
    public function isAdmin()
    {
        return $this->role && $this->role->nama_role === 'Admin';
    }

    public function isPetugas()
    {
        return $this->role && $this->role->nama_role === 'Petugas';
    }

    public function isPeminjam()
    {
        return $this->role && $this->role->nama_role === 'Peminjam';
    }
}
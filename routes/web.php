<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Public routes
Route::get('/', function () {
    return redirect()->route('login');
});

Route::middleware(['auth', 'verified'])->group(function () {
    // Redirect berdasarkan role
    Route::get('/dashboard', function () {
        $user = auth()->user()->load('role');

        if ($user->isAdmin()) {
            return redirect()->route('admin.dashboard');
        } elseif ($user->isPetugas()) {
            return redirect()->route('petugas.dashboard');
        } else {
            return redirect()->route('peminjam.dashboard');
        }
    })->name('dashboard');
});

// Admin Routes
Route::middleware(['auth', 'role:Admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/dashboard', [App\Http\Controllers\Admin\DashboardController::class, 'index'])->name('dashboard');
    
    // Alat Management
    Route::resource('alat', App\Http\Controllers\Admin\AlatController::class);
    
    // Kategori Management
    Route::resource('kategori', App\Http\Controllers\Admin\KategoriController::class);
    
    // User Management
    Route::resource('user', App\Http\Controllers\Admin\UserController::class);
});

// Petugas Routes
Route::middleware(['auth', 'role:Petugas'])->prefix('petugas')->name('petugas.')->group(function () {
    Route::get('/dashboard', [App\Http\Controllers\Petugas\DashboardController::class, 'index'])->name('dashboard');
    
    // Peminjaman
    Route::get('/peminjaman', [App\Http\Controllers\Petugas\PeminjamanController::class, 'index'])->name('peminjaman.index');
    Route::get('/peminjaman/{peminjaman}', [App\Http\Controllers\Petugas\PeminjamanController::class, 'show'])->name('peminjaman.show');
    Route::post('/peminjaman/{peminjaman}/approve', [App\Http\Controllers\Petugas\PeminjamanController::class, 'approve'])->name('peminjaman.approve');
    Route::post('/peminjaman/{peminjaman}/reject', [App\Http\Controllers\Petugas\PeminjamanController::class, 'reject'])->name('peminjaman.reject');
    
    // Pengembalian
    Route::get('/pengembalian', [App\Http\Controllers\Petugas\PengembalianController::class, 'index'])->name('pengembalian.index');
    Route::post('/pengembalian/scan', [App\Http\Controllers\Petugas\PengembalianController::class, 'scanPeminjam'])->name('pengembalian.scan');
    Route::post('/pengembalian/process', [App\Http\Controllers\Petugas\PengembalianController::class, 'process'])->name('pengembalian.process');
});

// Peminjam Routes
Route::middleware(['auth', 'role:Peminjam'])->prefix('peminjam')->name('peminjam.')->group(function () {
    Route::get('/dashboard', [App\Http\Controllers\Peminjam\DashboardController::class, 'index'])->name('dashboard');
    
    // Katalog
    Route::get('/katalog', [App\Http\Controllers\Peminjam\KatalogController::class, 'index'])->name('katalog.index');
    
    // Keranjang
    Route::post('/keranjang/add', [App\Http\Controllers\Peminjam\KeranjangController::class, 'addToCart'])->name('keranjang.add');
    Route::get('/keranjang', [App\Http\Controllers\Peminjam\KeranjangController::class, 'viewCart'])->name('keranjang.index');
    Route::delete('/keranjang/{alat}', [App\Http\Controllers\Peminjam\KeranjangController::class, 'removeFromCart'])->name('keranjang.remove');
    Route::post('/keranjang/checkout', [App\Http\Controllers\Peminjam\KeranjangController::class, 'checkout'])->name('keranjang.checkout');
    
    // Riwayat
    Route::get('/riwayat', [App\Http\Controllers\Peminjam\RiwayatController::class, 'index'])->name('riwayat.index');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
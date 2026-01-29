<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('histori_transaksis', function (Blueprint $table) {
            $table->id();
            $table->foreignId('alat_id')->constrained('alats')->onDelete('cascade');
            $table->foreignId('peminjam_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('petugas_pinjam_id')->nullable()->constrained('users')->onDelete('set null');
            $table->foreignId('petugas_kembali_id')->nullable()->constrained('users')->onDelete('set null');
            $table->enum('jenis_transaksi', ['peminjaman', 'pengembalian']);
            $table->timestamp('tanggal_pinjam')->nullable();
            $table->timestamp('tanggal_kembali')->nullable();
            $table->integer('durasi_hari')->nullable();
            $table->enum('kondisi_pinjam', ['baik', 'rusak_ringan', 'rusak_berat'])->nullable();
            $table->enum('kondisi_kembali', ['baik', 'rusak_ringan', 'rusak_berat'])->nullable();
            $table->text('keterangan')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('histori_transaksis');
    }
};
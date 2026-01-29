<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('peminjaman_details', function (Blueprint $table) {
            $table->id();
            $table->foreignId('peminjaman_id')->constrained('peminjamen')->onDelete('cascade');
            $table->foreignId('alat_id')->constrained('alats')->onDelete('cascade');
            $table->enum('status_detail', ['menunggu', 'dipinjam', 'dikembalikan'])->default('menunggu');
            $table->timestamp('tanggal_pinjam')->nullable();
            $table->timestamp('tanggal_kembali')->nullable();
            $table->integer('durasi_hari')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('peminjaman_details');
    }
};
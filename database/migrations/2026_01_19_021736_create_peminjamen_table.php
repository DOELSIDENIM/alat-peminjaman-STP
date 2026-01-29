<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('peminjamen', function (Blueprint $table) {
            $table->id();
            $table->string('nomor_transaksi')->unique();
            $table->foreignId('peminjam_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('petugas_id')->nullable()->constrained('users')->onDelete('set null');
            $table->integer('jumlah_alat')->default(0);
            $table->enum('status', ['menunggu_petugas', 'disetujui', 'ditolak', 'selesai'])->default('menunggu_petugas');
            $table->text('catatan')->nullable();
            $table->timestamp('tanggal_booking')->nullable();
            $table->timestamp('tanggal_disetujui')->nullable();
            $table->timestamp('booking_expired_at')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('peminjamen');
    }
};
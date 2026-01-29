<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->foreignId('role_id')->after('id')->default(3)->constrained('roles')->onDelete('cascade');
            $table->string('barcode')->after('email')->unique()->nullable();
            $table->integer('kuota_tersedia')->after('barcode')->default(10);
            $table->integer('alat_dipinjam')->after('kuota_tersedia')->default(0);
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropForeign(['role_id']);
            $table->dropColumn(['role_id', 'barcode', 'kuota_tersedia', 'alat_dipinjam']);
        });
    }
};
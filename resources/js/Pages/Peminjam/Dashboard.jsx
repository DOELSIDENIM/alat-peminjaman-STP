import PeminjamLayout from '@/Layouts/PeminjamLayout';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard({ user, alatDipinjam, stats }) {
    return (
        <PeminjamLayout>
            <Head title="Dashboard Peminjam" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Welcome Banner */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg shadow-lg p-8 mb-8 text-white">
                    <h1 className="text-3xl font-bold mb-2">Selamat Datang, {user.name}!</h1>
                    <p className="text-blue-100">Kelola peminjaman alat Anda dengan mudah</p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm">Kuota Tersedia</p>
                                <p className="text-3xl font-bold text-green-600">{stats.kuota_tersedia}</p>
                                <p className="text-xs text-gray-400">dari {stats.total_kuota} alat</p>
                            </div>
                            <div className="text-5xl">✅</div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm">Sedang Dipinjam</p>
                                <p className="text-3xl font-bold text-blue-600">{stats.alat_dipinjam}</p>
                                <p className="text-xs text-gray-400">alat aktif</p>
                            </div>
                            <div className="text-5xl">📦</div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm">Status Akun</p>
                                <p className="text-xl font-bold text-gray-800">Aktif</p>
                                <p className="text-xs text-green-600">✓ Terverifikasi</p>
                            </div>
                            <div className="text-5xl">👤</div>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <Link
                        href={route('peminjam.katalog.index')}
                        className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition group"
                    >
                        <div className="flex items-center">
                            <div className="text-5xl mr-4">🔍</div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600">
                                    Lihat Katalog Alat
                                </h3>
                                <p className="text-sm text-gray-500">Pilih alat yang ingin dipinjam</p>
                            </div>
                        </div>
                    </Link>

                    <Link
                        href={route('peminjam.riwayat.index')}
                        className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition group"
                    >
                        <div className="flex items-center">
                            <div className="text-5xl mr-4">📋</div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600">
                                    Riwayat Peminjaman
                                </h3>
                                <p className="text-sm text-gray-500">Lihat histori peminjaman Anda</p>
                            </div>
                        </div>
                    </Link>
                </div>

                {/* Alat yang Sedang Dipinjam */}
                <div className="bg-white rounded-lg shadow">
                    <div className="p-6 border-b">
                        <h3 className="text-lg font-semibold text-gray-800">Alat yang Sedang Dipinjam</h3>
                    </div>
                    <div className="p-6">
                        {alatDipinjam.length > 0 ? (
                            <div className="space-y-4">
                                {alatDipinjam.map((detail) => (
                                    <div key={detail.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                        <div className="flex items-center">
                                            <div className="text-3xl mr-4">📦</div>
                                            <div>
                                                <h4 className="font-semibold text-gray-800">{detail.alat.nama_alat}</h4>
                                                <p className="text-sm text-gray-500">{detail.alat.kode_alat} • {detail.alat.kategori.nama_kategori}</p>
                                                <p className="text-xs text-gray-400 mt-1">
                                                    Dipinjam sejak: {new Date(detail.tanggal_pinjam).toLocaleDateString('id-ID')}
                                                </p>
                                            </div>
                                        </div>
                                        <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                                            Sedang Dipinjam
                                        </span>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <div className="text-6xl mb-4">📭</div>
                                <p className="text-gray-500 mb-4">Anda belum meminjam alat apapun</p>
                                <Link
                                    href={route('peminjam.katalog.index')}
                                    className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                >
                                    Mulai Meminjam
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </PeminjamLayout>
    );
}
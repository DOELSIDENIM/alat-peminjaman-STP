import PetugasLayout from '@/Layouts/PetugasLayout';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard({ stats, recentPeminjaman }) {
    return (
        <PetugasLayout header="Dashboard Petugas">
            <Head title="Dashboard Petugas" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg shadow">
                    <div className="flex items-center">
                        <div className="p-2 bg-blue-500 rounded-lg">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600">Peminjaman Hari Ini</p>
                            <p className="text-2xl font-semibold text-gray-900">{stats.peminjamanHariIni}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow">
                    <div className="flex items-center">
                        <div className="p-2 bg-green-500 rounded-lg">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600">Pengembalian Hari Ini</p>
                            <p className="text-2xl font-semibold text-gray-900">{stats.pengembalianHariIni}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow">
                    <div className="flex items-center">
                        <div className="p-2 bg-yellow-500 rounded-lg">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600">Menunggu Konfirmasi</p>
                            <p className="text-2xl font-semibold text-gray-900">{stats.peminjamanMenunggu}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow">
                    <div className="flex items-center">
                        <div className="p-2 bg-purple-500 rounded-lg">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600">Peminjaman Aktif</p>
                            <p className="text-2xl font-semibold text-gray-900">{stats.peminjamanAktif}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg shadow">
                    <div className="p-6 border-b">
                        <h3 className="text-lg font-semibold text-gray-800">Peminjaman Terbaru</h3>
                    </div>
                    <div className="p-6">
                        {recentPeminjaman.length > 0 ? (
                            <div className="space-y-4">
                                {recentPeminjaman.map((peminjaman) => (
                                    <div key={peminjaman.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                        <div>
                                            <p className="font-semibold text-gray-800">{peminjaman.nomor_transaksi}</p>
                                            <p className="text-sm text-gray-600">{peminjaman.peminjam.name}</p>
                                            <p className="text-xs text-gray-500">{peminjaman.jumlah_alat} alat</p>
                                        </div>
                                        <span className={`px-2 py-1 text-xs rounded-full ${
                                            peminjaman.status === 'menunggu_petugas'
                                                ? 'bg-yellow-100 text-yellow-800'
                                                : peminjaman.status === 'disetujui'
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-red-100 text-red-800'
                                        }`}>
                                            {peminjaman.status.replace('_', ' ')}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500 text-center py-4">Belum ada peminjaman</p>
                        )}
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow">
                    <div className="p-6 border-b">
                        <h3 className="text-lg font-semibold text-gray-800">Quick Actions</h3>
                    </div>
                    <div className="p-6 space-y-4">
                        <Link
                            href={route('petugas.peminjaman.index')}
                            className="block w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-center"
                        >
                            📋 Kelola Peminjaman
                        </Link>
                        <Link
                            href={route('petugas.pengembalian.index')}
                            className="block w-full px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 text-center"
                        >
                            🔄 Proses Pengembalian
                        </Link>
                    </div>
                </div>
            </div>
        </PetugasLayout>
    );
}

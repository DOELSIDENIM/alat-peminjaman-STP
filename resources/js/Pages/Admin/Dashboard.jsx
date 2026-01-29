import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard({ stats, grafik }) {
    return (
        <AdminLayout header="Dashboard Admin">
            <Head title="Dashboard Admin" />

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-500 text-sm">Total Alat</p>
                            <p className="text-3xl font-bold text-blue-600">{stats.totalAlat}</p>
                        </div>
                        <div className="text-4xl">📦</div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-500 text-sm">Alat Tersedia</p>
                            <p className="text-3xl font-bold text-green-600">{stats.alatTersedia}</p>
                        </div>
                        <div className="text-4xl">✅</div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-500 text-sm">Alat Terpinjam</p>
                            <p className="text-3xl font-bold text-yellow-600">{stats.alatTerpinjam}</p>
                        </div>
                        <div className="text-4xl">🔄</div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-500 text-sm">Alat Rusak</p>
                            <p className="text-3xl font-bold text-red-600">{stats.alatRusak}</p>
                        </div>
                        <div className="text-4xl">⚠️</div>
                    </div>
                </div>
            </div>

            {/* Additional Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-white rounded-lg shadow p-6">
                    <p className="text-gray-500 text-sm">Total Peminjam</p>
                    <p className="text-2xl font-bold text-gray-800">{stats.totalPeminjam}</p>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                    <p className="text-gray-500 text-sm">Peminjaman Aktif</p>
                    <p className="text-2xl font-bold text-blue-600">{stats.peminjamanAktif}</p>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                    <p className="text-gray-500 text-sm">Menunggu Persetujuan</p>
                    <p className="text-2xl font-bold text-orange-600">{stats.peminjamanMenunggu}</p>
                </div>
            </div>

            {/* Grafik Peminjaman */}
            <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Grafik Peminjaman 7 Hari Terakhir</h3>
                <div className="overflow-x-auto">
                    <table className="min-w-full">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="px-4 py-2 text-left">Tanggal</th>
                                <th className="px-4 py-2 text-left">Jumlah Peminjaman</th>
                            </tr>
                        </thead>
                        <tbody>
                            {grafik.map((item, index) => (
                                <tr key={index} className="border-b">
                                    <td className="px-4 py-2">{item.tanggal}</td>
                                    <td className="px-4 py-2">
                                        <div className="flex items-center">
                                            <div className="w-64 bg-gray-200 rounded-full h-4 mr-2">
                                                <div 
                                                    className="bg-blue-600 h-4 rounded-full" 
                                                    style={{ width: `${(item.jumlah / Math.max(...grafik.map(g => g.jumlah))) * 100}%` }}
                                                ></div>
                                            </div>
                                            <span>{item.jumlah}</span>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminLayout>
    );
}
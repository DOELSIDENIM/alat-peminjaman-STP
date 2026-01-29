import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router, usePage } from '@inertiajs/react';

export default function Index({ alats }) {
    const { flash } = usePage().props;

    const handleDelete = (id) => {
        if (confirm('Yakin ingin menghapus alat ini?')) {
            router.delete(route('admin.alat.destroy', id));
        }
    };

    const getStatusBadge = (status) => {
        const badges = {
            tersedia: 'bg-green-100 text-green-800',
            terpinjam: 'bg-yellow-100 text-yellow-800',
            maintenance: 'bg-orange-100 text-orange-800',
            rusak: 'bg-red-100 text-red-800'
        };
        return badges[status] || 'bg-gray-100 text-gray-800';
    };

    return (
        <AdminLayout header="Data Alat">
            <Head title="Data Alat" />

            {flash?.success && (
                <div className="mb-4 p-4 bg-green-100 text-green-800 rounded-lg">
                    {flash.success}
                </div>
            )}

            <div className="bg-white rounded-lg shadow">
                <div className="p-6 border-b flex justify-between items-center">
                    <h3 className="text-lg font-semibold">Daftar Alat</h3>
                    <Link
                        href={route('admin.alat.create')}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        + Tambah Alat
                    </Link>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Foto</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Kode</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nama Alat</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Kategori</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Kondisi</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Lokasi</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {alats?.data && alats.data.length > 0 ? (
                                alats.data.map((alat) => (
                                    <tr key={alat.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {alat.foto ? (
                                                <img
                                                    src={alat.foto_url}
                                                    alt={alat.nama_alat}
                                                    className="w-16 h-16 object-cover rounded-lg border border-gray-300"
                                                />
                                            ) : (
                                                <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                                                    <span className="text-gray-400 text-xs">No Image</span>
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            {alat.kode_alat}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {alat.nama_alat}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {alat.kategori?.nama_kategori || '-'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                                                {alat.kondisi?.replace('_', ' ') || '-'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 py-1 text-xs rounded-full ${getStatusBadge(alat.status)}`}>
                                                {alat.status || '-'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {alat.lokasi_penyimpanan || '-'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            <div className="flex gap-2">
                                                <Link
                                                    href={route('admin.alat.edit', alat.id)}
                                                    className="text-blue-600 hover:text-blue-900"
                                                >
                                                    Edit
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(alat.id)}
                                                    className="text-red-600 hover:text-red-900"
                                                >
                                                    Hapus
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="8" className="px-6 py-12 text-center">
                                        <div className="text-gray-400">
                                            <div className="text-5xl mb-3">📦</div>
                                            <p className="text-gray-500">Belum ada data alat</p>
                                            <Link
                                                href={route('admin.alat.create')}
                                                className="mt-3 inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                            >
                                                + Tambah Alat Pertama
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {alats?.links && alats.links.length > 3 && (
                    <div className="p-4 border-t flex justify-center gap-2">
                        {alats.links.map((link, index) => (
                            <Link
                                key={index}
                                href={link.url || '#'}
                                className={`px-3 py-1 rounded ${
                                    link.active
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                }`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
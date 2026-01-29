import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router, usePage } from '@inertiajs/react';

export default function Index({ kategoris }) {
    const { flash } = usePage().props;

    const handleDelete = (id) => {
        if (confirm('Yakin ingin menghapus kategori ini?')) {
            router.delete(route('admin.kategori.destroy', id));
        }
    };

    return (
        <AdminLayout header="Data Kategori">
            <Head title="Data Kategori" />

            {flash?.success && (
                <div className="mb-4 p-4 bg-green-100 text-green-800 rounded-lg">
                    {flash.success}
                </div>
            )}

            <div className="bg-white rounded-lg shadow">
                <div className="p-6 border-b flex justify-between items-center">
                    <h3 className="text-lg font-semibold">Daftar Kategori</h3>
                    <Link
                        href={route('admin.kategori.create')}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        + Tambah Kategori
                    </Link>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nama Kategori</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Deskripsi</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Jumlah Alat</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {kategoris?.data && kategoris.data.length > 0 ? (
                                kategoris.data.map((kategori) => (
                                    <tr key={kategori.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            {kategori.nama_kategori}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500">
                                            {kategori.deskripsi || '-'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {kategori.alats_count || 0} alat
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            <div className="flex gap-2">
                                                <Link
                                                    href={route('admin.kategori.edit', kategori.id)}
                                                    className="text-blue-600 hover:text-blue-900"
                                                >
                                                    Edit
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(kategori.id)}
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
                                    <td colSpan="4" className="px-6 py-12 text-center">
                                        <div className="text-gray-400">
                                            <div className="text-5xl mb-3">📁</div>
                                            <p className="text-gray-500">Belum ada kategori</p>
                                            <Link
                                                href={route('admin.kategori.create')}
                                                className="mt-3 inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                            >
                                                + Tambah Kategori Pertama
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {kategoris?.links && kategoris.links.length > 3 && (
                    <div className="p-4 border-t flex justify-center gap-2">
                        {kategoris.links.map((link, index) => (
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
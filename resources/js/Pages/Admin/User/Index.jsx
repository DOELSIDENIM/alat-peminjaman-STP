import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, usePage, router } from '@inertiajs/react';

export default function Index({ users }) {
    const { flash } = usePage().props;

    return (
        <AdminLayout header="Manajemen User">
            <Head title="User" />

            {flash?.success && (
                <div className="mb-4 p-4 bg-green-100 text-green-800 rounded-lg">
                    {flash.success}
                </div>
            )}

            {flash?.error && (
                <div className="mb-4 p-4 bg-red-100 text-red-800 rounded-lg">
                    {flash.error}
                </div>
            )}

            <div className="bg-white rounded-lg shadow">
                <div className="p-6 border-b flex justify-between items-center">
                    <div>
                        <h3 className="text-lg font-semibold">Daftar User</h3>
                        <p className="text-sm text-gray-500">{users.total} user</p>
                    </div>
                    <Link
                        href={route('admin.user.create')}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        + Tambah User
                    </Link>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nama</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Barcode</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Kuota</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {users.data.map((user) => (
                                <tr key={user.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {user.name}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {user.email}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 py-1 text-xs rounded-full ${user.role?.nama_role === 'Admin'
                                            ? 'bg-red-100 text-red-800'
                                            : user.role?.nama_role === 'Petugas'
                                                ? 'bg-blue-100 text-blue-800'
                                                : 'bg-green-100 text-green-800'
                                            }`}>
                                            {user.role?.nama_role || 'N/A'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {user.barcode}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        <div className="text-xs">
                                            <div>Dipinjam: {user.alat_dipinjam}</div>
                                            <div>Tersedia: {user.kuota_tersedia}</div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <div className="flex gap-2">
                                            <Link
                                                href={route('admin.user.edit', user.id)}
                                                className="text-blue-600 hover:text-blue-900"
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                onClick={() => {
                                                    if (confirm('Hapus user ini?')) {
                                                        router.delete(route('admin.user.destroy', user.id));
                                                    }
                                                }}
                                                className="text-red-600 hover:text-red-900"
                                            >
                                                Hapus
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {users.links.length > 3 && (
                    <div className="p-4 border-t flex justify-center gap-2">
                        {users.links.map((link, index) => (
                            <Link
                                key={index}
                                href={link.url}
                                className={`px-3 py-1 rounded ${link.active
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                    }`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </div>
                )}
            </div>

            {users.data.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-gray-500">Belum ada user yang dibuat.</p>
                    <Link
                        href={route('admin.user.create')}
                        className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        Buat User Pertama
                    </Link>
                </div>
            )}
        </AdminLayout>
    );
}

import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Edit({ user, roles }) {
    const { data, setData, put, processing, errors } = useForm({
        name: user.name,
        email: user.email,
        password: '',
        role_id: user.role_id,
        barcode: user.barcode,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('admin.user.update', user.id));
    };

    return (
        <AdminLayout header={`Edit User - ${user.name}`}>
            <Head title={`Edit User - ${user.name}`} />

            <div className="max-w-2xl mx-auto">
                <div className="bg-white rounded-lg shadow p-8">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-6">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                Nama Lengkap *
                            </label>
                            <input
                                type="text"
                                id="name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Masukkan nama lengkap"
                                required
                            />
                            {errors.name && (
                                <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                            )}
                        </div>

                        <div className="mb-6">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                Email *
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Masukkan email"
                                required
                            />
                            {errors.email && (
                                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                            )}
                        </div>

                        <div className="mb-6">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                Password Baru (Kosongkan jika tidak ingin mengubah)
                            </label>
                            <input
                                type="password"
                                id="password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Masukkan password baru (minimal 8 karakter)"
                            />
                            {errors.password && (
                                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                            )}
                        </div>

                        <div className="mb-6">
                            <label htmlFor="role_id" className="block text-sm font-medium text-gray-700 mb-2">
                                Role *
                            </label>
                            <select
                                id="role_id"
                                value={data.role_id}
                                onChange={(e) => setData('role_id', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                            >
                                <option value="">Pilih Role</option>
                                {roles.map((role) => (
                                    <option key={role.id} value={role.id}>
                                        {role.nama_role}
                                    </option>
                                ))}
                            </select>
                            {errors.role_id && (
                                <p className="mt-1 text-sm text-red-600">{errors.role_id}</p>
                            )}
                        </div>

                        <div className="mb-6">
                            <label htmlFor="barcode" className="block text-sm font-medium text-gray-700 mb-2">
                                Barcode *
                            </label>
                            <input
                                type="text"
                                id="barcode"
                                value={data.barcode}
                                onChange={(e) => setData('barcode', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Masukkan barcode unik"
                                required
                            />
                            {errors.barcode && (
                                <p className="mt-1 text-sm text-red-600">{errors.barcode}</p>
                            )}
                        </div>

                        <div className="flex justify-end gap-4">
                            <Link
                                href={route('admin.user.index')}
                                className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                            >
                                Batal
                            </Link>
                            <button
                                type="submit"
                                disabled={processing}
                                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                            >
                                {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}

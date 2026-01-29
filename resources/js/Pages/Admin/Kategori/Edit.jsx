import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Edit({ kategori }) {
    const { data, setData, put, processing, errors } = useForm({
        nama_kategori: kategori.nama_kategori,
        deskripsi: kategori.deskripsi || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('admin.kategori.update', kategori.id));
    };

    return (
        <AdminLayout header={`Edit Kategori - ${kategori.nama_kategori}`}>
            <Head title={`Edit Kategori - ${kategori.nama_kategori}`} />

            <div className="max-w-2xl mx-auto">
                <div className="bg-white rounded-lg shadow p-8">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-6">
                            <label htmlFor="nama_kategori" className="block text-sm font-medium text-gray-700 mb-2">
                                Nama Kategori *
                            </label>
                            <input
                                type="text"
                                id="nama_kategori"
                                value={data.nama_kategori}
                                onChange={(e) => setData('nama_kategori', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Masukkan nama kategori"
                                required
                            />
                            {errors.nama_kategori && (
                                <p className="mt-1 text-sm text-red-600">{errors.nama_kategori}</p>
                            )}
                        </div>

                        <div className="mb-6">
                            <label htmlFor="deskripsi" className="block text-sm font-medium text-gray-700 mb-2">
                                Deskripsi
                            </label>
                            <textarea
                                id="deskripsi"
                                value={data.deskripsi}
                                onChange={(e) => setData('deskripsi', e.target.value)}
                                rows={4}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Masukkan deskripsi kategori (opsional)"
                            />
                            {errors.deskripsi && (
                                <p className="mt-1 text-sm text-red-600">{errors.deskripsi}</p>
                            )}
                        </div>

                        <div className="flex justify-end gap-4">
                            <Link
                                href={route('admin.kategori.index')}
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

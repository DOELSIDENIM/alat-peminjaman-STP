import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Create() {
    const { data, setData, post, errors, processing } = useForm({
        nama_kategori: '',
        deskripsi: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.kategori.store'));
    };

    return (
        <AdminLayout header="Tambah Kategori">
            <Head title="Tambah Kategori" />

            <div className="max-w-3xl">
                <div className="bg-white rounded-lg shadow p-6">
                    <form onSubmit={handleSubmit}>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Nama Kategori *
                                </label>
                                <input
                                    type="text"
                                    value={data.nama_kategori}
                                    onChange={(e) => setData('nama_kategori', e.target.value)}
                                    className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                    placeholder="Contoh: Elektronik"
                                />
                                {errors.nama_kategori && (
                                    <p className="mt-1 text-sm text-red-600">{errors.nama_kategori}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Deskripsi
                                </label>
                                <textarea
                                    value={data.deskripsi}
                                    onChange={(e) => setData('deskripsi', e.target.value)}
                                    rows="4"
                                    className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                    placeholder="Deskripsi kategori (opsional)"
                                ></textarea>
                                {errors.deskripsi && (
                                    <p className="mt-1 text-sm text-red-600">{errors.deskripsi}</p>
                                )}
                            </div>
                        </div>

                        <div className="mt-6 flex gap-4">
                            <button
                                type="submit"
                                disabled={processing}
                                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                            >
                                {processing ? 'Menyimpan...' : 'Simpan'}
                            </button>
                            <Link
                                href={route('admin.kategori.index')}
                                className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                            >
                                Batal
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}
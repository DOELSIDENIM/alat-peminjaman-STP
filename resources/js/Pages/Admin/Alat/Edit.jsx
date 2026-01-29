import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function Edit({ alat, kategoris }) {
    const [preview, setPreview] = useState(alat.foto ? alat.foto_url : null);
    
    const { data, setData, post, errors, processing } = useForm({
        kode_alat: alat.kode_alat || '',
        nama_alat: alat.nama_alat || '',
        kategori_id: alat.kategori_id || '',
        spesifikasi: alat.spesifikasi || '',
        kondisi: alat.kondisi || 'baik',
        status: alat.status || 'tersedia',
        lokasi_penyimpanan: alat.lokasi_penyimpanan || '',
        foto: null,
        _method: 'put',
    });

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('foto', file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.alat.update', alat.id), {
            forceFormData: true,
            preserveScroll: true,
        });
    };

    return (
        <AdminLayout header="Edit Alat">
            <Head title="Edit Alat" />

            <div className="max-w-3xl">
                <div className="bg-white rounded-lg shadow p-6">
                    <form onSubmit={handleSubmit}>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Kode Alat *</label>
                                <input
                                    type="text"
                                    value={data.kode_alat}
                                    onChange={(e) => setData('kode_alat', e.target.value)}
                                    className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                />
                                {errors.kode_alat && <p className="mt-1 text-sm text-red-600">{errors.kode_alat}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Nama Alat *</label>
                                <input
                                    type="text"
                                    value={data.nama_alat}
                                    onChange={(e) => setData('nama_alat', e.target.value)}
                                    className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                />
                                {errors.nama_alat && <p className="mt-1 text-sm text-red-600">{errors.nama_alat}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Kategori *</label>
                                <select
                                    value={data.kategori_id}
                                    onChange={(e) => setData('kategori_id', e.target.value)}
                                    className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                >
                                    <option value="">Pilih Kategori</option>
                                    {kategoris.map((kategori) => (
                                        <option key={kategori.id} value={kategori.id}>{kategori.nama_kategori}</option>
                                    ))}
                                </select>
                                {errors.kategori_id && <p className="mt-1 text-sm text-red-600">{errors.kategori_id}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Spesifikasi</label>
                                <textarea
                                    value={data.spesifikasi}
                                    onChange={(e) => setData('spesifikasi', e.target.value)}
                                    rows="3"
                                    className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                ></textarea>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Kondisi *</label>
                                <select
                                    value={data.kondisi}
                                    onChange={(e) => setData('kondisi', e.target.value)}
                                    className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                >
                                    <option value="baik">Baik</option>
                                    <option value="rusak_ringan">Rusak Ringan</option>
                                    <option value="rusak_berat">Rusak Berat</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Status *</label>
                                <select
                                    value={data.status}
                                    onChange={(e) => setData('status', e.target.value)}
                                    className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                >
                                    <option value="tersedia">Tersedia</option>
                                    <option value="terpinjam">Terpinjam</option>
                                    <option value="maintenance">Maintenance</option>
                                    <option value="rusak">Rusak</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Lokasi Penyimpanan</label>
                                <input
                                    type="text"
                                    value={data.lokasi_penyimpanan}
                                    onChange={(e) => setData('lokasi_penyimpanan', e.target.value)}
                                    className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                />
                            </div>

                            {/* Foto Alat */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Foto Alat
                                </label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                />
                                {errors.foto && (
                                    <p className="mt-1 text-sm text-red-600">{errors.foto}</p>
                                )}
                                {preview && (
                                    <div className="mt-2">
                                        <img
                                            src={preview}
                                            alt="Preview"
                                            className="w-32 h-32 object-cover rounded-lg border border-gray-300"
                                        />
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="mt-6 flex gap-4">
                            <button
                                type="submit"
                                disabled={processing}
                                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                            >
                                {processing ? 'Menyimpan...' : 'Update'}
                            </button>
                            <Link href={route('admin.alat.index')} className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400">
                                Batal
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}
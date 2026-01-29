import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function Create({ kategoris }) {
    const [preview, setPreview] = useState(null);
    
    const { data, setData, post, errors, processing } = useForm({
        kode_alat: '',
        nama_alat: '',
        kategori_id: '',
        spesifikasi: '',
        kondisi: 'baik',
        status: 'tersedia',
        lokasi_penyimpanan: '',
        foto: null,
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
        post(route('admin.alat.store'), {
            forceFormData: true,
            preserveScroll: true,
        });
    };

    return (
        <AdminLayout header="Tambah Alat">
            <Head title="Tambah Alat" />

            <div className="max-w-3xl">
                <div className="bg-white rounded-lg shadow p-6">
                    <form onSubmit={handleSubmit}>
                        <div className="space-y-4">
                            {/* Kode Alat */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Kode Alat *
                                </label>
                                <input
                                    type="text"
                                    value={data.kode_alat}
                                    onChange={(e) => setData('kode_alat', e.target.value)}
                                    className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                    placeholder="Contoh: ELK001"
                                />
                                {errors.kode_alat && (
                                    <p className="mt-1 text-sm text-red-600">{errors.kode_alat}</p>
                                )}
                            </div>

                            {/* Nama Alat */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Nama Alat *
                                </label>
                                <input
                                    type="text"
                                    value={data.nama_alat}
                                    onChange={(e) => setData('nama_alat', e.target.value)}
                                    className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                    placeholder="Contoh: Kamera DSLR Canon"
                                />
                                {errors.nama_alat && (
                                    <p className="mt-1 text-sm text-red-600">{errors.nama_alat}</p>
                                )}
                            </div>

                            {/* Kategori */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Kategori *
                                </label>
                                <select
                                    value={data.kategori_id}
                                    onChange={(e) => setData('kategori_id', e.target.value)}
                                    className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                >
                                    <option value="">Pilih Kategori</option>
                                    {kategoris.map((kategori) => (
                                        <option key={kategori.id} value={kategori.id}>
                                            {kategori.nama_kategori}
                                        </option>
                                    ))}
                                </select>
                                {errors.kategori_id && (
                                    <p className="mt-1 text-sm text-red-600">{errors.kategori_id}</p>
                                )}
                            </div>

                            {/* Spesifikasi */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Spesifikasi
                                </label>
                                <textarea
                                    value={data.spesifikasi}
                                    onChange={(e) => setData('spesifikasi', e.target.value)}
                                    rows="3"
                                    className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                    placeholder="Deskripsi spesifikasi alat"
                                ></textarea>
                            </div>

                            {/* Kondisi */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Kondisi *
                                </label>
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

                            {/* Status */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Status *
                                </label>
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

                            {/* Lokasi Penyimpanan */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Lokasi Penyimpanan
                                </label>
                                <input
                                    type="text"
                                    value={data.lokasi_penyimpanan}
                                    onChange={(e) => setData('lokasi_penyimpanan', e.target.value)}
                                    className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                    placeholder="Contoh: Rak A1"
                                />
                            </div>

                            {/* Foto Alat */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Foto Alat
                                </label>
                                <div className="mt-1 flex items-center gap-4">
                                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <svg className="w-8 h-8 mb-2 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021c-.135.187-.207.401-.207.617v4.5a3 3 0 0 0 3 3h3a1 1 0 0 0 1-1v-1.5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v1.5a1 1 0 0 0 1 1h3a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3h-1V5a5 5 0 0 0-5-5H6a5 5 0 0 0-5 5v1H1a3 3 0 0 0 0 6h3m6-3a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                                            </svg>
                                            <p className="mb-2 text-sm text-gray-500">
                                                <span className="font-semibold">Klik untuk upload</span> atau drag and drop
                                            </p>
                                            <p className="text-xs text-gray-500">PNG, JPG, GIF (MAX. 2MB)</p>
                                        </div>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleFileChange}
                                            className="hidden"
                                        />
                                    </label>
                                </div>
                                {errors.foto && (
                                    <p className="mt-1 text-sm text-red-600">{errors.foto}</p>
                                )}
                                {preview && (
                                    <div className="mt-4">
                                        <p className="text-sm font-medium text-gray-700 mb-2">Preview:</p>
                                        <img
                                            src={preview}
                                            alt="Preview"
                                            className="w-48 h-48 object-cover rounded-lg border-2 border-gray-300 shadow-md"
                                        />
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="mt-6 flex gap-4">
                            <button
                                type="submit"
                                disabled={processing}
                                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                            >
                                {processing ? 'Menyimpan...' : 'Simpan'}
                            </button>
                            <Link
                                href={route('admin.alat.index')}
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
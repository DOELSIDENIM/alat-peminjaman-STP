import PeminjamLayout from '@/Layouts/PeminjamLayout';
import Modal from '@/Components/Modal';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function KatalogIndex({ alats, kategoris, filters }) {
    const { auth, flash } = usePage().props;
    const [search, setSearch] = useState(filters?.search || '');
    const [kategoriFilter, setKategoriFilter] = useState(filters?.kategori_id || '');
    const [showModal, setShowModal] = useState(!!flash?.success);

    const handleFilter = () => {
        router.get(route('peminjam.katalog.index'), {
            search: search,
            kategori_id: kategoriFilter
        }, {
            preserveState: true
        });
    };

    const handleAddToCart = (alatId) => {
        router.post(route('peminjam.keranjang.add'), {
            alat_id: alatId
        }, {
            preserveState: true,
            preserveScroll: true
        });
    };

    return (
        <PeminjamLayout>
            <Head title="Katalog Alat" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Flash Messages */}
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

                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-800">Katalog Alat</h1>
                    <p className="text-gray-600 mt-1">Pilih alat yang ingin Anda pinjam</p>
                </div>

                {/* Filter */}
                <div className="bg-white rounded-lg shadow p-6 mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Pencarian</label>
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleFilter()}
                                placeholder="Cari alat..."
                                className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Kategori</label>
                            <select
                                value={kategoriFilter}
                                onChange={(e) => setKategoriFilter(e.target.value)}
                                className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                            >
                                <option value="">Semua Kategori</option>
                                {kategoris?.map(kategori => (
                                    <option key={kategori.id} value={kategori.id}>
                                        {kategori.nama_kategori}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="flex items-end">
                            <button
                                onClick={handleFilter}
                                className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                            >
                                🔍 Filter
                            </button>
                        </div>
                    </div>
                </div>

                {/* Info Kuota */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-blue-800">
                                <strong>Kuota Tersedia:</strong> {auth.user.kuota_tersedia} dari 10 alat
                            </p>
                            <p className="text-xs text-blue-600 mt-1">
                                Anda dapat meminjam maksimal {auth.user.kuota_tersedia} alat lagi
                            </p>
                        </div>
                        <Link
                            href={route('peminjam.keranjang.index')}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                            🛒 Lihat Keranjang
                        </Link>
                    </div>
                </div>

                {/* Katalog Grid */}
                {alats?.data && alats.data.length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {alats.data.map(alat => (
                                <div key={alat.id} className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition">
                                    {alat.foto ? (
                                        <div className="h-48 overflow-hidden">
                                            <img
                                                src={`/storage/${alat.foto}`}
                                                alt={alat.nama_alat}
                                                className="w-full h-full object-cover"
                                                onError={(e) => {
                                                    console.error('Image failed to load:', e.target.src);
                                                    e.target.style.display = 'none';
                                                }}
                                            />
                                        </div>
                                    ) : (
                                        <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                                            <span className="text-7xl">📦</span>
                                        </div>
                                    )}
                                    <div className="p-4">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-xs font-semibold text-blue-600 bg-blue-100 px-2 py-1 rounded">
                                                {alat.kategori?.nama_kategori}
                                            </span>
                                            <span className="text-xs text-gray-500">{alat.kode_alat}</span>
                                        </div>
                                        <h3 className="text-lg font-bold text-gray-900 mb-2">{alat.nama_alat}</h3>
                                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{alat.spesifikasi || 'Tidak ada deskripsi'}</p>

                                        <div className="flex items-center justify-between mb-4">
                                            <div className="text-xs text-gray-500">
                                                <span className="block">📍 {alat.lokasi_penyimpanan}</span>
                                                <span className="block mt-1">
                                                    <span className="inline-block px-2 py-0.5 bg-green-100 text-green-800 rounded">
                                                        {alat.kondisi?.replace('_', ' ')}
                                                    </span>
                                                </span>
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => handleAddToCart(alat.id)}
                                            disabled={auth.user.kuota_tersedia <= 0}
                                            className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed font-medium"
                                        >
                                            {auth.user.kuota_tersedia <= 0 ? '❌ Kuota Penuh' : '➕ Tambah ke Keranjang'}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Pagination */}
                        {alats.links && alats.links.length > 3 && (
                            <div className="mt-6 flex justify-center gap-2">
                                {alats.links.map((link, index) => (
                                    <Link
                                        key={index}
                                        href={link.url || '#'}
                                        className={`px-4 py-2 rounded-lg ${link.active
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-white text-gray-700 hover:bg-gray-100 border'
                                            }`}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                ))}
                            </div>
                        )}
                    </>
                ) : (
                    <div className="bg-white rounded-lg shadow p-12 text-center">
                        <div className="text-6xl mb-4">📭</div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">Tidak Ada Alat Tersedia</h3>
                        <p className="text-gray-600 mb-4">Belum ada alat yang bisa dipinjam saat ini</p>
                        <button
                            onClick={() => {
                                setSearch('');
                                setKategoriFilter('');
                                handleFilter();
                            }}
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                            Reset Filter
                        </button>
                    </div>
                )}

                {/* Modal for Success */}
                <Modal show={showModal} onClose={() => setShowModal(false)} maxWidth="sm">
                    <div className="p-6">
                        <div className="flex items-center">
                            <div className="text-4xl mr-4">✅</div>
                            <div>
                                <h3 className="text-lg font-bold text-gray-900">Berhasil!</h3>
                                <p className="text-sm text-gray-600 mt-1">{flash?.success}</p>
                            </div>
                        </div>
                        <div className="mt-6 flex justify-end">
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                            >
                                OK
                            </button>
                        </div>
                    </div>
                </Modal>
            </div>
        </PeminjamLayout>
    );
}

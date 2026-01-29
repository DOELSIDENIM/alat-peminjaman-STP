import PetugasLayout from '@/Layouts/PetugasLayout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function Form({ peminjam, alatDipinjam }) {
    const { flash } = usePage().props;
    const [selectedAlat, setSelectedAlat] = useState([]);
    const [showConfirm, setShowConfirm] = useState(false);

    const { data, setData, post, processing, errors } = useForm({
        peminjam_id: peminjam.id,
        barcode_petugas: '',
        alat_kembali: [],
        catatan: '',
    });

    const handleSelectAlat = (detailId, kondisi) => {
        const existing = selectedAlat.find(item => item.detail_id === detailId);
        
        if (existing) {
            setSelectedAlat(selectedAlat.map(item => 
                item.detail_id === detailId ? { ...item, kondisi } : item
            ));
        } else {
            setSelectedAlat([...selectedAlat, { detail_id: detailId, kondisi }]);
        }
    };

    const handleRemoveAlat = (detailId) => {
        setSelectedAlat(selectedAlat.filter(item => item.detail_id !== detailId));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (selectedAlat.length === 0) {
            alert('Pilih minimal 1 alat untuk dikembalikan');
            return;
        }

        setData('alat_kembali', selectedAlat);
        setShowConfirm(true);
    };

    const handleConfirm = (e) => {
        e.preventDefault();
        post(route('petugas.pengembalian.process'));
    };

    return (
        <PetugasLayout header="Form Pengembalian">
            <Head title="Form Pengembalian" />

            {flash?.error && (
                <div className="mb-4 p-4 bg-red-100 text-red-800 rounded-lg">
                    {flash.error}
                </div>
            )}

            <div className="max-w-4xl mx-auto">
                {/* Info Peminjam */}
                <div className="bg-white rounded-lg shadow p-6 mb-6">
                    <h3 className="text-lg font-bold text-gray-800 mb-4">Informasi Peminjam</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-sm text-gray-500">Nama Peminjam</p>
                            <p className="font-semibold text-gray-900">{peminjam.name}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">ID</p>
                            <p className="font-semibold text-gray-900">{peminjam.ID}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Kuota Tersedia</p>
                            <p className="font-semibold text-gray-900">{peminjam.kuota_tersedia} / 10</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Alat Dipinjam</p>
                            <p className="font-semibold text-gray-900">{peminjam.alat_dipinjam} alat</p>
                        </div>
                    </div>
                </div>

                {/* Form Pengembalian */}
                {!showConfirm ? (
                    <form onSubmit={handleSubmit}>
                        <div className="bg-white rounded-lg shadow p-6 mb-6">
                            <h3 className="text-lg font-bold text-gray-800 mb-4">
                                Pilih Alat yang Dikembalikan
                            </h3>

                            {alatDipinjam && alatDipinjam.length > 0 ? (
                                <div className="space-y-4">
                                    {alatDipinjam.map((detail) => {
                                        const isSelected = selectedAlat.find(item => item.detail_id === detail.id);
                                        
                                        return (
                                            <div key={detail.id} className={`p-4 border-2 rounded-lg ${isSelected ? 'border-green-500 bg-green-50' : 'border-gray-200'}`}>
                                                <div className="flex items-start justify-between mb-3">
                                                    <div className="flex-1">
                                                        <h4 className="font-semibold text-gray-900">
                                                            {detail.alat?.nama_alat}
                                                        </h4>
                                                        <p className="text-sm text-gray-500">
                                                            {detail.alat?.kode_alat} • {detail.alat?.kategori?.nama_kategori}
                                                        </p>
                                                        <p className="text-xs text-gray-400 mt-1">
                                                            Dipinjam: {new Date(detail.tanggal_pinjam).toLocaleDateString('id-ID')}
                                                        </p>
                                                    </div>
                                                    
                                                    {isSelected && (
                                                        <button
                                                            type="button"
                                                            onClick={() => handleRemoveAlat(detail.id)}
                                                            className="text-red-600 hover:text-red-800 text-sm"
                                                        >
                                                            ✗ Batal
                                                        </button>
                                                    )}
                                                </div>

                                                <div className="grid grid-cols-3 gap-2">
                                                    <button
                                                        type="button"
                                                        onClick={() => handleSelectAlat(detail.id, 'baik')}
                                                        className={`px-3 py-2 rounded text-sm font-medium ${
                                                            isSelected?.kondisi === 'baik'
                                                                ? 'bg-green-600 text-white'
                                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                        }`}
                                                    >
                                                        ✓ Baik
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => handleSelectAlat(detail.id, 'rusak_ringan')}
                                                        className={`px-3 py-2 rounded text-sm font-medium ${
                                                            isSelected?.kondisi === 'rusak_ringan'
                                                                ? 'bg-orange-600 text-white'
                                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                        }`}
                                                    >
                                                        ⚠ Rusak Ringan
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => handleSelectAlat(detail.id, 'rusak_berat')}
                                                        className={`px-3 py-2 rounded text-sm font-medium ${
                                                            isSelected?.kondisi === 'rusak_berat'
                                                                ? 'bg-red-600 text-white'
                                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                        }`}
                                                    >
                                                        ✗ Rusak Berat
                                                    </button>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <p className="text-center text-gray-500 py-8">
                                    Peminjam tidak memiliki alat yang dipinjam
                                </p>
                            )}

                            {alatDipinjam && alatDipinjam.length > 0 && (
                                <>
                                    <div className="mt-6">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Catatan (Opsional)
                                        </label>
                                        <textarea
                                            value={data.catatan}
                                            onChange={(e) => setData('catatan', e.target.value)}
                                            rows="3"
                                            className="w-full rounded-lg border-gray-300"
                                            placeholder="Catatan tambahan..."
                                        ></textarea>
                                    </div>

                                    <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                                        <p className="text-sm text-blue-800">
                                            <strong>Dipilih:</strong> {selectedAlat.length} alat dari {alatDipinjam.length} alat
                                        </p>
                                    </div>

                                    <div className="mt-6 flex gap-4">
                                        <button
                                            type="submit"
                                            disabled={selectedAlat.length === 0}
                                            className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed font-semibold"
                                        >
                                            Lanjut ke Konfirmasi ({selectedAlat.length} alat)
                                        </button>
                                        <Link
                                            href={route('petugas.pengembalian.index')}
                                            className="px-6 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 font-semibold"
                                        >
                                            Batal
                                        </Link>
                                    </div>
                                </>
                            )}
                        </div>
                    </form>
                ) : (
                    <form onSubmit={handleConfirm}>
                        <div className="bg-white rounded-lg shadow p-6">
                            <h3 className="text-lg font-bold text-gray-800 mb-4">
                                Konfirmasi Pengembalian
                            </h3>

                            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                                <p className="text-sm font-medium text-gray-700 mb-2">Ringkasan Pengembalian:</p>
                                <ul className="space-y-1">
                                    {selectedAlat.map((item, index) => {
                                        const detail = alatDipinjam.find(d => d.id === item.detail_id);
                                        return (
                                            <li key={index} className="text-sm text-gray-600">
                                                • {detail?.alat?.nama_alat} - <span className={`font-semibold ${
                                                    item.kondisi === 'baik' ? 'text-green-600' :
                                                    item.kondisi === 'rusak_ringan' ? 'text-orange-600' :
                                                    'text-red-600'
                                                }`}>{item.kondisi.replace('_', ' ').toUpperCase()}</span>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>

                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Scan Barcode Petugas untuk Konfirmasi
                                </label>
                                <input
                                    type="text"
                                    value={data.barcode_petugas}
                                    onChange={(e) => setData('barcode_petugas', e.target.value)}
                                    className="w-full rounded-lg border-gray-300"
                                    placeholder="Scan atau ketik barcode petugas..."
                                    autoFocus
                                />
                                {errors.barcode_petugas && (
                                    <p className="mt-1 text-sm text-red-600">{errors.barcode_petugas}</p>
                                )}
                            </div>

                            <div className="flex gap-4">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 font-semibold"
                                >
                                    {processing ? 'Memproses...' : '✓ Konfirmasi Pengembalian'}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setShowConfirm(false)}
                                    className="px-6 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 font-semibold"
                                >
                                    Kembali
                                </button>
                            </div>
                        </div>
                    </form>
                )}
            </div>
        </PetugasLayout>
    );
}
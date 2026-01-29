import PetugasLayout from '@/Layouts/PetugasLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function Detail({ peminjaman }) {
    const [showApprove, setShowApprove] = useState(false);

    const { data, setData, post, processing, errors } = useForm({
        barcode_petugas: '',
    });

    const handleApprove = (e) => {
        e.preventDefault();
        post(route('petugas.peminjaman.approve', peminjaman.id));
    };

    return (
        <PetugasLayout header="Detail Peminjaman">
            <Head title="Detail Peminjaman" />

            <div className="max-w-4xl">
                <div className="bg-white rounded-lg shadow p-6 mb-6">
                    <h3 className="text-lg font-bold mb-4">Informasi Peminjaman</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-sm text-gray-500">Nomor Transaksi</p>
                            <p className="font-semibold">{peminjaman.nomor_transaksi}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Peminjam</p>
                            <p className="font-semibold">{peminjaman.peminjam?.name}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Jumlah Alat</p>
                            <p className="font-semibold">{peminjaman.jumlah_alat} alat</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6 mb-6">
                    <h3 className="text-lg font-bold mb-4">Daftar Alat</h3>
                    <div className="space-y-2">
                        {peminjaman.details?.map((detail) => (
                            <div key={detail.id} className="p-3 border rounded">
                                <p className="font-medium">{detail.alat?.nama_alat}</p>
                                <p className="text-sm text-gray-500">{detail.alat?.kode_alat}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                    {!showApprove ? (
                        <button
                            onClick={() => setShowApprove(true)}
                            className="w-full px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
                        >
                            Setujui Peminjaman
                        </button>
                    ) : (
                        <form onSubmit={handleApprove}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-2">
                                    Scan Barcode Petugas
                                </label>
                                <input
                                    type="text"
                                    value={data.barcode_petugas}
                                    onChange={(e) => setData('barcode_petugas', e.target.value)}
                                    className="w-full rounded-lg border-gray-300"
                                    placeholder="Scan barcode..."
                                    autoFocus
                                />
                                {errors.barcode_petugas && (
                                    <p className="text-red-600 text-sm mt-1">{errors.barcode_petugas}</p>
                                )}
                            </div>
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
                            >
                                {processing ? 'Memproses...' : 'Konfirmasi'}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </PetugasLayout>
    );
}
import PetugasLayout from '@/Layouts/PetugasLayout';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function Index() {
    const [showForm, setShowForm] = useState(false);

    const { data, setData, post, processing, errors } = useForm({
        barcode: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('petugas.pengembalian.scan'));
    };

    return (
        <PetugasLayout header="Proses Pengembalian">
            <Head title="Proses Pengembalian" />

            <div className="max-w-3xl mx-auto">
                <div className="bg-white rounded-lg shadow p-8">
                    <div className="text-center mb-8">
                        <div className="text-6xl mb-4">📥</div>
                        <h3 className="text-2xl font-bold mb-2">Proses Pengembalian</h3>
                        <p className="text-gray-600">Masukkan ID</p>
                    </div>

                    {!showForm ? (
                        <button
                            onClick={() => setShowForm(true)}
                            className="w-full px-6 py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 text-lg font-semibold"
                        >
                           Masukkan ID
                        </button>
                    ) : (
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-2">
                                    ID Peminjam
                                </label>
                                <input
                                    type="text"
                                    value={data.barcode}
                                    onChange={(e) => setData('barcode', e.target.value)}
                                    className="w-full rounded-lg border-gray-300 text-lg"
                                    placeholder="Scan atau ketik barcode..."
                                    autoFocus
                                />
                                {errors.barcode && (
                                    <p className="text-red-600 text-sm mt-1">{errors.barcode}</p>
                                )}
                            </div>
                            <div className="flex gap-3">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
                                >
                                    {processing ? 'Memproses...' : 'Proses'}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setShowForm(false)}
                                    className="px-6 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                                >
                                    Batal
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </PetugasLayout>
    );
}
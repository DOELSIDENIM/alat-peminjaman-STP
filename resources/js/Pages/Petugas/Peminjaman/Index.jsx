import PetugasLayout from '@/Layouts/PetugasLayout';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Index({ peminjamans }) {
    const { flash } = usePage().props;

    return (
        <PetugasLayout header="Daftar Peminjaman">
            <Head title="Daftar Peminjaman" />

            {flash?.success && (
                <div className="mb-4 p-4 bg-green-100 text-green-800 rounded-lg">
                    {flash.success}
                </div>
            )}

            <div className="bg-white rounded-lg shadow">
                <div className="p-6 border-b">
                    <h3 className="text-lg font-semibold">Peminjaman Menunggu Persetujuan</h3>
                </div>

                <div className="p-6">
                    {peminjamans?.data && peminjamans.data.length > 0 ? (
                        <div className="space-y-4">
                            {peminjamans.data.map((peminjaman) => (
                                <div key={peminjaman.id} className="p-4 border rounded-lg">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h4 className="font-bold">{peminjaman.nomor_transaksi}</h4>
                                            <p className="text-sm text-gray-600">
                                                Peminjam: {peminjaman.peminjam?.name}
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                Jumlah: {peminjaman.jumlah_alat} alat
                                            </p>
                                        </div>
                                        <Link
                                            href={route('petugas.peminjaman.show', peminjaman.id)}
                                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                        >
                                            Detail
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-gray-500 py-8">Tidak ada peminjaman</p>
                    )}
                </div>
            </div>
        </PetugasLayout>
    );
}
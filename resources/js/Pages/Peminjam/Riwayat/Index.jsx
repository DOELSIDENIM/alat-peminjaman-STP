import PeminjamLayout from '@/Layouts/PeminjamLayout';
import { Head } from '@inertiajs/react';

export default function Index({ riwayat }) {
    const getStatusBadge = (status) => {
        const badges = {
            menunggu_petugas: 'bg-yellow-100 text-yellow-800',
            disetujui: 'bg-green-100 text-green-800',
            ditolak: 'bg-red-100 text-red-800',
        };
        return badges[status] || 'bg-gray-100 text-gray-800';
    };

    const getStatusText = (status) => {
        const texts = {
            menunggu_petugas: 'Menunggu Petugas',
            disetujui: 'Disetujui',
            ditolak: 'Ditolak',
        };
        return texts[status] || status;
    };

    return (
        <PeminjamLayout header="Riwayat Peminjaman">
            <Head title="Riwayat Peminjaman" />

            <div className="bg-white rounded-lg shadow">
                <div className="p-6 border-b">
                    <h3 className="text-lg font-semibold">Riwayat Peminjaman Anda</h3>
                    <p className="text-sm text-gray-500">{riwayat.total} peminjaman</p>
                </div>

                <div className="p-6">
                    {riwayat.data.length > 0 ? (
                        <div className="space-y-6">
                            {riwayat.data.map((peminjaman) => (
                                <div key={peminjaman.id} className="border rounded-lg p-6">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h4 className="text-lg font-semibold text-gray-800">
                                                {peminjaman.nomor_transaksi}
                                            </h4>
                                            <p className="text-sm text-gray-500">
                                                {new Date(peminjaman.created_at).toLocaleDateString('id-ID', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric',
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                })}
                                            </p>
                                        </div>
                                        <span className={`px-3 py-1 text-xs rounded-full ${getStatusBadge(peminjaman.status)}`}>
                                            {getStatusText(peminjaman.status)}
                                        </span>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                        <div>
                                            <p className="text-sm text-gray-600">
                                                <span className="font-medium">Jumlah Alat:</span> {peminjaman.jumlah_alat}
                                            </p>
                                            {peminjaman.petugas && (
                                                <p className="text-sm text-gray-600">
                                                    <span className="font-medium">Petugas:</span> {peminjaman.petugas.name}
                                                </p>
                                            )}
                                        </div>
                                        <div>
                                            {peminjaman.tanggal_disetujui && (
                                                <p className="text-sm text-gray-600">
                                                    <span className="font-medium">Disetujui:</span>{' '}
                                                    {new Date(peminjaman.tanggal_disetujui).toLocaleDateString('id-ID')}
                                                </p>
                                            )}
                                            {peminjaman.catatan && (
                                                <p className="text-sm text-gray-600">
                                                    <span className="font-medium">Catatan:</span> {peminjaman.catatan}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="border-t pt-4">
                                        <h5 className="font-medium text-gray-800 mb-3">Detail Alat:</h5>
                                        <div className="space-y-2">
                                            {peminjaman.details.map((detail) => (
                                                <div key={detail.id} className="flex justify-between items-center bg-gray-50 p-3 rounded">
                                                    <div className="flex items-center">
                                                        <div className="text-2xl mr-3">📦</div>
                                                        <div>
                                                            <p className="font-medium text-gray-800">{detail.alat.nama_alat}</p>
                                                            <p className="text-sm text-gray-500">{detail.alat.kode_alat}</p>
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <span className={`px-2 py-1 text-xs rounded ${
                                                            detail.status_detail === 'dipinjam'
                                                                ? 'bg-blue-100 text-blue-800'
                                                                : detail.status_detail === 'dikembalikan'
                                                                ? 'bg-green-100 text-green-800'
                                                                : 'bg-yellow-100 text-yellow-800'
                                                        }`}>
                                                            {detail.status_detail === 'dipinjam' ? 'Dipinjam' :
                                                             detail.status_detail === 'dikembalikan' ? 'Dikembalikan' :
                                                             'Menunggu'}
                                                        </span>
                                                        {detail.tanggal_pinjam && (
                                                            <p className="text-xs text-gray-500 mt-1">
                                                                Pinjam: {new Date(detail.tanggal_pinjam).toLocaleDateString('id-ID')}
                                                            </p>
                                                        )}
                                                        {detail.tanggal_kembali && (
                                                            <p className="text-xs text-gray-500">
                                                                Kembali: {new Date(detail.tanggal_kembali).toLocaleDateString('id-ID')}
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <div className="text-6xl mb-4">📋</div>
                            <p className="text-gray-500 mb-4">Belum ada riwayat peminjaman</p>
                            <p className="text-sm text-gray-400">Riwayat peminjaman Anda akan muncul di sini</p>
                        </div>
                    )}
                </div>

                {/* Pagination */}
                {riwayat.links.length > 3 && (
                    <div className="p-4 border-t flex justify-center gap-2">
                        {riwayat.links.map((link, index) => (
                            <div
                                key={index}
                                className={`px-3 py-1 rounded ${
                                    link.active
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                }`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </div>
                )}
            </div>
        </PeminjamLayout>
    );
}

import PeminjamLayout from '@/Layouts/PeminjamLayout';
import { Head, Link, router, usePage } from '@inertiajs/react';

export default function KeranjangIndex({ cart }) {
    const { flash } = usePage().props;
    cart = cart ?? [];

    const handleRemove = (alatId) => {
        if (confirm('Hapus alat dari keranjang?')) {
            router.delete(route('peminjam.keranjang.remove', alatId));
        }
    };

    const handleCheckout = () => {
        if (cart.length === 0) {
            alert('Keranjang kosong!');
            return;
        }
        
        if (confirm(`Konfirmasi peminjaman ${cart.length} alat?`)) {
            router.post(route('peminjam.keranjang.checkout'));
        }
    };

    return (
        <PeminjamLayout>
            <Head title="Keranjang" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Daftar Keranjang */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-lg shadow">
                            <div className="p-6 border-b">
                                <h2 className="text-xl font-bold text-gray-800">Keranjang Peminjaman</h2>
                                <p className="text-sm text-gray-500">{cart.length} alat dalam keranjang</p>
                            </div>

                            <div className="p-6">
                                {cart.length > 0 ? (
                                    <div className="space-y-4">
                                        {cart.map((item) => (
                                            <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                                                <div className="flex items-center flex-1">
                                                    <div className="text-4xl mr-4">📦</div>
                                                    <div>
                                                        <h3 className="font-semibold text-gray-800">{item.nama_alat}</h3>
                                                        <p className="text-sm text-gray-500">{item.kode_alat}</p>
                                                        <span className="inline-block mt-1 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                                                            {item.kategori}
                                                        </span>
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={() => handleRemove(item.id)}
                                                    className="ml-4 text-red-600 hover:text-red-800"
                                                >
                                                    🗑️ Hapus
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-12">
                                        <div className="text-6xl mb-4">🛒</div>
                                        <p className="text-gray-500 mb-4">Keranjang Anda kosong</p>
                                        <Link
                                            href={route('peminjam.katalog.index')}
                                            className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                        >
                                            Lihat Katalog
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow p-6 sticky top-6">
                            <h3 className="text-lg font-bold text-gray-800 mb-4">Ringkasan</h3>
                            
                            <div className="space-y-3 mb-6">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Total Alat:</span>
                                    <span className="font-semibold">{cart.length} alat</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Status:</span>
                                    <span className="text-green-600 font-semibold">Siap Dipinjam</span>
                                </div>
                            </div>

                            <div className="border-t pt-4 mb-6">
                                <div className="bg-blue-50 p-4 rounded-lg mb-4">
                                    <p className="text-xs text-blue-800 font-medium mb-1">📋 Catatan:</p>
                                    <ul className="text-xs text-blue-700 space-y-1">
                                        <li>• Maksimal peminjaman 10 alat</li>
                                        <li>• Datang ke petugas untuk konfirmasi</li>
                                        <li>• Bawa ID Card Anda</li>
                                    </ul>
                                </div>
                            </div>

                            <button
                                onClick={handleCheckout}
                                disabled={cart.length === 0}
                                className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed font-semibold"
                            >
                                Konfirmasi Peminjaman
                            </button>

                            <Link
                                href={route('peminjam.katalog.index')}
                                className="block w-full mt-3 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-center"
                            >
                                Lanjut Pilih Alat
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </PeminjamLayout>
    );
}
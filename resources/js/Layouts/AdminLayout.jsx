import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function AdminLayout({ children, header }) {
    const { auth } = usePage().props;
    const [sidebarOpen, setSidebarOpen] = useState(true);

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Sidebar */}
            <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-blue-900 transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="flex flex-col h-full">
                    {/* Logo */}
                    <div className="flex items-center justify-center h-16 bg-blue-950">
                        <h1 className="text-white text-xl font-bold">Admin Panel</h1>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 px-4 py-6 space-y-2">
                        <Link href={route('admin.dashboard')} className="flex items-center px-4 py-3 text-white hover:bg-blue-800 rounded-lg">
                            <span>📊 Dashboard</span>
                        </Link>
                        <Link href={route('admin.alat.index')} className="flex items-center px-4 py-3 text-white hover:bg-blue-800 rounded-lg">
                            <span>🔧 Data Alat</span>
                        </Link>
                        <Link href={route('admin.kategori.index')} className="flex items-center px-4 py-3 text-white hover:bg-blue-800 rounded-lg">
                            <span>📁 Kategori</span>
                        </Link>
                        <Link href={route('admin.user.index')} className="flex items-center px-4 py-3 text-white hover:bg-blue-800 rounded-lg">
                            <span>👥 Data User</span>
                        </Link>
                    </nav>

                    {/* User Info */}
                    <div className="px-4 py-4 bg-blue-950">
                        <p className="text-white text-sm">{auth.user.name}</p>
                        <Link href={route('logout')} method="post" as="button" className="mt-2 text-red-300 text-xs hover:text-red-100">
                            Logout
                        </Link>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className={`transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-0'}`}>
                {/* Header */}
                <header className="bg-white shadow">
                    <div className="flex items-center justify-between px-6 py-4">
                        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-gray-600">
                            ☰
                        </button>
                        {header && <h2 className="text-2xl font-bold text-gray-800">{header}</h2>}
                    </div>
                </header>

                {/* Page Content */}
                <main className="p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}
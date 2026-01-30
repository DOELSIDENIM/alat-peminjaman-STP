import { Link, usePage } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';
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
                    <div className="flex items-center justify-center h-20 bg-blue-950 px-4">
                        <Link href={route('admin.dashboard')} className="flex items-center space-x-3">
                            <ApplicationLogo className="h-12 w-12 text-white" />
                            <div className="flex flex-col">
                                <h1 className="text-white text-lg font-bold leading-tight">Sistem Peminjaman</h1>
                                <span className="text-blue-200 text-xs">Admin Panel</span>
                            </div>
                        </Link>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 px-4 py-6 space-y-2">
                        <Link href={route('admin.dashboard')} className={`flex items-center px-4 py-3 text-white rounded-lg ${route().current('admin.dashboard') ? 'bg-blue-800' : 'hover:bg-blue-800'}`}>
                            <span>📊 Dashboard</span>
                        </Link>
                        <Link href={route('admin.alat.index')} className={`flex items-center px-4 py-3 text-white rounded-lg ${route().current('admin.alat.*') ? 'bg-blue-800' : 'hover:bg-blue-800'}`}>
                            <span>🔧 Data Alat</span>
                        </Link>
                        <Link href={route('admin.kategori.index')} className={`flex items-center px-4 py-3 text-white rounded-lg ${route().current('admin.kategori.*') ? 'bg-blue-800' : 'hover:bg-blue-800'}`}>
                            <span>📁 Kategori</span>
                        </Link>
                        <Link href={route('admin.user.index')} className={`flex items-center px-4 py-3 text-white rounded-lg ${route().current('admin.user.*') ? 'bg-blue-800' : 'hover:bg-blue-800'}`}>
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
                        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-gray-600 hover:text-gray-900">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
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
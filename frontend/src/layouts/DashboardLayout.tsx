import { useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAppSelector } from 'src/hooks/useRedux';
import Navbar from 'src/components/ui/Navbar';
import Sidebar from 'src/components/ui/Sidebar';

export const DashboardLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { user, token } = useAppSelector(state => state.auth);

    if (!token || !user) {
        return <Navigate to="/login" replace />;
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="flex">
                {/* Mobile Sidebar Toggle */}
                <button
                    className="lg:hidden fixed bottom-4 right-4 z-50 p-2 bg-blue-500 text-white rounded-full shadow-lg"
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                >
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 6h16M4 12h16M4 18h16"
                        />
                    </svg>
                </button>

                {/* Sidebar */}
                <div
                    className={`
            fixed inset-y-0 left-0 transform lg:relative lg:translate-x-0
            transition duration-200 ease-in-out z-30
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          `}
                >
                    <Sidebar />
                </div>

                {/* Overlay */}
                {sidebarOpen && (
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-20"
                        onClick={() => setSidebarOpen(false)}
                    />
                )}

                {/* Main Content */}
                <main className="flex-1 p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};
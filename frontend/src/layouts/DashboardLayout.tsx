import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Menu from 'src/assets/svg/menu';
import Navbar from 'src/components/ui/Navbar';
import Sidebar from 'src/components/ui/Sidebar';

export const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className='min-h-screen bg-gray-50'>
      <Navbar />
      <div className='flex'>
        {/* Mobile Sidebar Toggle */}
        <button
          className='lg:hidden fixed bottom-4 right-4 z-50 p-2 bg-blue-500 text-white rounded-full shadow-lg'
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <Menu />
        </button>

        {/* Sidebar */}
        <div
          className={`
            fixed inset-y-0 left-0 transform lg:relative lg:translate-x-0
            transition duration-200 ease-in-out z-30
            ${
              sidebarOpen
                ? 'translate-x-0'
                : '-translate-x-full lg:translate-x-0'
            }
          `}
        >
          <Sidebar />
        </div>

        {/* Overlay */}
        {sidebarOpen && (
          <div
            className='fixed inset-0 bg-black bg-opacity-50 lg:hidden z-20'
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className='flex-1 p-6'>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

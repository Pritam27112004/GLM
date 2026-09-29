import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';
import ToastContainer from '../Common/ToastContainer';

export const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F7FAFC] flex flex-col">
      <Navbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

      <div className="flex-1 flex">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <main className="flex-1 lg:ml-64 p-4 sm:p-6 lg:p-8 flex flex-col max-w-[1600px] w-full mx-auto">
          <Outlet />
        </main>
      </div>

      <div className="lg:ml-64">
        <Footer />
      </div>

      <ToastContainer />
    </div>
  );
};

export default MainLayout;

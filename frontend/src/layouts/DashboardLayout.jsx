import React from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

const DashboardLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex bg-background flex-col md:flex-row">
      {/* Sidebar - left position on desktop, hidden on mobile */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* Top Navbar */}
        <div className="sticky top-0 z-30">
          <Navbar isPublic={false} />
        </div>

        {/* Content Wrapper */}
        <main className="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto pb-24 md:pb-8 mt-14 md:mt-0">
          <div className="fade-in">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;

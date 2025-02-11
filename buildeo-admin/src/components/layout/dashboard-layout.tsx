import { useState } from 'react';
import Sidebar from '../shared/sidebar';
import MobileSidebar from '../shared/mobile-sidebar';
import HeaderNav from '../shared/header-nav';
// import { MenuIcon } from 'lucide-react';

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  return (
    <div className="flex h-screen overflow-hidden bg-secondary">
      <MobileSidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <HeaderNav />  
        <div className="flex flex-1 overflow-y-auto">
          <main className="relative w-full p-4">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}

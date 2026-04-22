"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  LayoutDashboard, Users, FileText, Settings,
  Menu, Bell,
} from 'lucide-react';
import AdminOverview from '@/components/admin/AdminOverview';
import AdminPressReleases from '@/components/admin/AdminPressReleases';
import AdminUsers from '@/components/admin/AdminUsers';
import AdminSettings from '@/components/admin/AdminSettings';
import Sidebar from '@/components/globals/Sidebar';
import { useAuth } from '@/context/AuthContext';
import { redirect, useSearchParams } from 'next/navigation';
import AdminCoupons from './Coupons';
import AdminGuestPosts from './AdminGuestPosts';

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const { user, authError } = useAuth();
  const searchParams = useSearchParams()
  const tab = searchParams.get('tab') || 'overview'  

  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'press-releases', label: 'Press Releases', icon: FileText },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await fetch('/api/admin/users').then(res => res.json()).then(data => data.data);
        setUsers(usersData?.users || []);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const renderContent = () => {
    switch (tab) {
      case 'overview': return <AdminOverview users={users} />;
      case 'press-releases': return <AdminPressReleases />;
      case 'guest-post': return <AdminGuestPosts />
      case 'coupons': return <AdminCoupons />
      case 'users': return <AdminUsers users={users} />;
      case 'settings': return <AdminSettings />;
      default: return <AdminOverview users={users} />;
    }
  };

if (user == null && !authError) {
  return <div className='w-full h-screen flex items-center justify-center'><div className="w-16 h-16 rounded-full border-4 border-[#D34586]/20 border-t-[#D34586] mb-4 animate-spin flex items-center justify-center" /> </div>
}

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <Sidebar
        activeTab={tab}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        user={user}
      />

      {/* Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-gray-500 hover:text-gray-700">
              <Menu className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-lg font-bold text-[#0B163F]">
                {navItems.find(n => n.id === tab)?.label}
              </h1>
              <p className="text-xs text-gray-400">Zeest Media - Admin</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#D34586] rounded-full" />
            </button>
            <div className="w-9 h-9 rounded-full bg-[#D34586] flex items-center justify-center text-white text-sm font-bold">
              {user?.user_metadata?.full_name?.[0] || 'A'}
            </div>
          </div>
        </header>

        <main className="flex-1 p-6 overflow-auto">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            {renderContent()}
          </motion.div>
        </main>
      </div>
    </div>
  );
}
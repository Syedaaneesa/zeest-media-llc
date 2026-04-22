"use client";

import { useAuth } from "@/context/AuthContext";
import { getSupabaseBrowserClient } from "@/lib/supabase";
import { BookOpenText, ChevronRight, Coins, FileText, LayoutDashboard, LogOut, Settings, Text, Ticket, TicketPercent, Users, X } from "lucide-react";
import { useRouter } from "next/navigation";

const Sidebar = ({ sidebarOpen, setSidebarOpen, user, activeTab }: {
  activeTab: string,
  sidebarOpen: boolean,
  setSidebarOpen: (open: boolean) => void,
  user: any
}) => {

  const { setUser } = useAuth();
  const router = useRouter();
  const supabase = getSupabaseBrowserClient();

  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'press-releases', label: 'Press Releases', icon: FileText },
    { id: 'guest-post', label: 'Guest Posts', icon: BookOpenText },
    { id: 'coupons', label: 'Coupons', icon: Ticket },
    { id: 'users', label: 'Users', icon: Users },
  ];

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    router.push('/');
  }

  return (

    <aside className={`
        fixed h-screen top-0 inset-y-0 left-0 z-50 w-64 bg-[#0B163F] flex flex-col transform transition-transform duration-300
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:sticky top-0 lg:translate-x-0
      `}>
      {/* Logo */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center justify-between">
         <a href="/admin?tab=overview">
          <img
            src="https://zeestmedia.com/wp-content/uploads/2024/01/logo-1-scaled.png"
            alt="Zeest Media"
            className="h-8 w-auto object-contain"
            />
            </a>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-white/60 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="mt-3">
          <span className="text-xs font-bold text-[#D34586] uppercase tracking-widest">Admin Panel</span>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <a
              key={item.id}
              href={`/admin?tab=${item.id}`}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${isActive
                ? 'bg-[#D34586] text-white'
                : 'text-white/60 hover:bg-white/10 hover:text-white'
                }`}
            >
              <Icon className="w-5 h-5" />
              {item.label}
              {isActive && <ChevronRight className="w-4 h-4 ml-auto" />}
            </a>
          );
        })}
      </nav>

      {/* User */}
      <div className="p-4 border-t border-white/10">
        <div className="flex items-center gap-3 px-2 py-2">
          <div className="w-9 h-9 rounded-full bg-[#D34586] flex items-center justify-center text-white text-sm font-bold">
            {user?.full_name?.[0] || 'A'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-sm font-medium truncate">{user?.full_name || 'Admin'}</p>
            <p className="text-white/40 text-xs truncate">{user?.email}</p>
          </div>
        </div>
        <button
          onClick={() => handleSignOut()}
          className="w-full flex items-center gap-3 px-4 py-2.5 mt-2 rounded-xl text-sm text-white/60 hover:bg-white/10 hover:text-white transition-all"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </aside>
  )
}

export default Sidebar
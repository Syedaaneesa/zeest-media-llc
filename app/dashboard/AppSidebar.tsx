"use client";

import { useAuth } from "@/context/AuthContext";
import { menuItems } from "@/lib/arrayAndObjectsData";
import { getSupabaseBrowserClient } from "@/lib/supabase";
import { ChevronRight, LogOut, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

const AppSidebar = ({ sidebarOpen, setSidebarOpen }: any) => {
  const queryParams = useSearchParams()
  const tab = queryParams.get('tab') || 'dashboard';
  const supabase = getSupabaseBrowserClient();
  const router = useRouter();
  const { setUser } = useAuth()

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
          <a href="/dashboard">
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

        <a href="/dashboard/sent-press-release" className="mt-8 py-2 px-6 w-fit flex items-center justify-center rounded text-sm font-medium text-white bg-primary hover:bg-white/10 hover:text-white transition-all">
          Send Press Release
        </a>
      </div>
      {/* Nav */}
      <nav className="flex-1 p-4 space-y-1 sticky top-0 left-0">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = tab === item.id;
          return (
            <a
              key={item.id}
              href={`${item.url}`}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${isActive
                ? 'bg-white/20 text-white'
                : 'text-white/60 hover:bg-white/10 hover:text-white'
                }`}
            >
              <Icon className="w-5 h-5" />
              {item.title}
              {isActive && <ChevronRight className="w-4 h-4 ml-auto" />}
            </a>
          );
        })}
      </nav>

      {/* User */}
      <div className="p-4 border-t border-white/10">
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

export default AppSidebar
"use client";

import { motion } from "framer-motion";
import {
  Globe,
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  Loader2,
  ShoppingBag,
  Bell,
  Menu,
  Plus,
  Calendar,
  Rocket,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Orders, useGuestPost } from "@/context/GuestPosts";
import AppSidebar from "../AppSidebar";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

const statusConfig: any = {
  pending: { label: "Pending", color: "#F59E0B", bg: "#FEF3C7", icon: Clock },
  in_progress: { label: "In Progress", color: "#1676BF", bg: "#DBEAFE", icon: Loader2 },
  published: { label: "Published", color: "#10B981", bg: "#D1FAE5", icon: CheckCircle },
  rejected: { label: "Rejected", color: "#EF4444", bg: "#FEE2E2", icon: XCircle },
};

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { orders, loading } = useGuestPost();
  const { user } = useAuth();
  const hasOrders = orders && orders.length > 0;

  const stats = {
    pending: orders.filter(order => order.status === 'pending').length,
    scheduled: orders.filter(order => order.status === 'scheduled').length,
    published: orders.filter(order => order.status === 'published').length,
    rejected: orders.filter(order => order.status === 'rejected').length,
  };

  return (
    <div className="w-full min-h-screen flex">
      <AppSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b px-6 py-2 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-gray-500"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-lg font-bold text-[#0B163F]">Dashboard</h1>
              <p className="text-xs text-gray-400">Zeest Media</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="relative w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#D34586] rounded-full" />
            </button>

            <div className="w-9 h-9 rounded-full bg-[#D34586] flex items-center justify-center text-white font-bold">
              {user?.user_metadata?.full_name?.[0] || "A"}
            </div>
          </div>
        </header>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col lg:flex-row lg:items-center mt-10 px-8 justify-between gap-6 my-4"
        >
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-[#0B163F] mb-2">
              Welcome, {user?.email?.slice(0, user?.email?.indexOf("@")) || 'User'}!
            </h1>
            <p className="text-gray-600">
              Manage your press releases and track their performance
            </p>
          </div>
          <a href="/guestposting">
            <Button
              className="bg-[#D34586] hover:bg-[#D34586]/90 text-white cursor-pointer px-6 py-6 text-lg"
            >

              <Plus className="w-5 h-5 mr-2" />
              Submit Your Article
            </Button>
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 px-8 lg:grid-cols-4 gap-4 mb-8"
        >
          {[
            { label: 'Pending', value: stats.pending, icon: Clock, color: '#F59E0B' },
            { label: 'Scheduled', value: stats.scheduled, icon: Calendar, color: '#3B82F6' },
            { label: 'Published', value: stats.published, icon: Rocket, color: '#10B981' },
            { label: 'Rejected', value: stats.rejected, icon: X, color: '#EF4444' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 + index * 0.05 }}
              className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm"
            >
              <div className="flex items-center gap-4">
                <div
                  className="w-11 h-11 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${stat.color}15` }}
                >
                  <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#0B163F]">{stat.value}</p>
                  <p className="text-gray-500 text-sm">{stat.label}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Content */}
        <div className="w-full px-8 py-1 min-h-[90vh]">

          {/* Loading */}
          {loading && (
            <div className="w-full min-h-[80vh] flex items-center justify-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-16 h-16 rounded-full border-4 border-[#D34586]/20 border-t-[#D34586]"
              />
            </div>
          )}

          {/* Orders */}
          {!loading && hasOrders &&
            orders.map((order: Orders, i: number) => {
              const st = statusConfig[order.status] || statusConfig.pending;
              const StatusIcon = st.icon;

              return (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-white rounded-2xl border my-4 shadow-sm p-5 flex flex-col gap-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#0B163F]/5 flex items-center justify-center">
                      <Globe className="w-4 h-4 text-[#0B163F]" />
                    </div>

                    <span className="text-lg font-bold text-[#D34586]">Total: ${order.total}</span>

                    <div
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
                      style={{ backgroundColor: st.bg, color: st.color }}
                    >
                      <StatusIcon className="w-3.5 h-3.5" />
                      {st.label}
                    </div>
                  </div>

                  <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-10 ">

                    {order.websites?.map((website: any, idx: number) => (

                        <div key={idx} className="flex items-center justify-between gap-2">
                          <div className="flex flex-col items-start gap-2 flex-wrap">
                            <a
                              href={website.url?.startsWith("http") ? website.url : "https://" + website.url}
                              target="_blank"
                              rel="noreferrer"
                              className="text-[#1676BF] hover:underline text-sm"
                            >
                              <h3 className="font-bold text-[#0B163F]">
                                {website.websiteName || website.url}
                              </h3>
                            </a>
                            {website.categories?.name && (
                              <span className="text-xs bg-[#1676BF]/10 text-[#1676BF] px-2 py-0.5 rounded-full">
                                {website.categories.name}
                              </span>
                            )}

                          </div>

                          <div className="flex flex-col justify-end items-end gap-2">

                            <span className="text-lg font-bold text-[#D34586]">
                              ${website.price}
                            </span>

                            {website.da && (
                              <span className="text-xs bg-[#0B163F]/10 text-[#0B163F] px-2 py-0.5 rounded-full">
                                DA {website.da}
                              </span>
                            )}

                          </div>
                          <div className="flex flex-col justify-end items-end gap-2">

                            {website.documentUrl && (
                              <a
                                href={"/api/images?url=" + website.documentUrl}
                                target="_blank"
                                className="flex items-center py-2 px-4 rounded bg-primary gap-1.5 text-xs text-background"
                              >
                                <FileText className="w-4 h-4" />
                                Document
                              </a>
                            )}
                            {website.tat && (
                              <span className="text-xs bg-[#0B163F]/10 text-[#0B163F] px-2 py-0.5 rounded-full">
                                TAT {website.tat}
                              </span>
                            )}
                          </div>
                        </div>
                    ))}

                  </div>

                </motion.div>
              );
            })}

          {/* No Orders */}
          {!loading && !hasOrders && (
            <div className="w-full text-center py-16 bg-white rounded-2xl border">
              <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-6">
                <ShoppingBag className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-[#0B163F]">
                No guest orders purchased yet
              </h3>
              <p className="text-gray-500 mb-6">
                Browse our available sites and place your first order.
              </p>

              <a href="/guest-orders">
                <Button className="bg-[#D34586] text-white">
                  Browse Guest Orders
                </Button>
              </a>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
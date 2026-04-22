"use client";

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, FileText, BarChart3, Clock, X, Calendar, Menu, Bell, Rocket, Loader } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { toast, Toaster } from "sonner"
import { PressReleaseType, usePressRelease } from '@/context/PressReleaseContext';
import PRTable from '@/components/dashboard/PRTable';
import axios from 'axios';
import { useAuth } from '@/context/AuthContext';

import { useSearchParams } from 'next/navigation';
import AppSidebar from './AppSidebar';
import PressContent from '@/components/pressrelease/PressReleaseView';

export default function Dashboard() {
  const [selectedPR, setSelectedPR] = useState<PressReleaseType | null>(null);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const { pressReleases, setPressReleases, loading } = usePressRelease()
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sendingReport, setSendingReport] = useState(false)

  const { user } = useAuth();
  const searchParams = useSearchParams();
  const message = searchParams.get("message");

  const stats = {
    drafts: pressReleases.filter(pr => pr.status === 'draft').length,
    pending: pressReleases.filter(pr => pr.status === 'pending').length,
    scheduled: pressReleases.filter(pr => pr.status === 'scheduled').length,
    published: pressReleases.filter(pr => pr.status === 'published').length,
    rejected: pressReleases.filter(pr => pr.status === 'rejected').length,
  };

  const handleViewAnalytics = (pr: PressReleaseType) => {
    setSelectedPR(pr);
    setShowAnalytics(true);
  };

  const handleEdit = (pr: PressReleaseType) => {
    return window.location.href = `/dashboard/sent-press-release?id=${pr.id}&type=edit&method=${pr.method}`;
  };

  const handleDelete = (id: string) => {
    axios.delete('/api/press-release', {
      params: { id },
    }).then(data => {
      if (data.status == 200) {
        toast.success('Deleted Successfully');
        setPressReleases((prev) =>
          prev.filter((press) => press.id !== id)
        );
      } else {
        toast.error(data.statusText);
      }
    })
  }

  useEffect(() => {

    if (message) {
      toast.success(message || "Press release submitted successfully!", {
        style: {
          background: "#4CAF50",
          color: "#fff",
        }, position: "top-center"
      });
    }

  }, [message]);


  const handleSendRequestEmail = async (id: string) => {
    if (!user) return;
    setSendingReport(true);
    try {
      const res = await fetch("/api/request-report", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          clientEmail: user.email,
          pressReleaseId: id,
          pressReleaseUrl: window.location.href + "/" + id,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setSendingReport(false)
        toast.error("Failed to send request");
        throw new Error(data.error || "Failed to send request");
      }
      setSendingReport(false)
      toast.success("Report request sent successfully!")
    } catch (error: any) {
      setSendingReport(false)
      console.error(error);
      toast.error("Failed to send request");
    }
  }



  return (
    <div className="w-full min-h-screen flex">

      <AppSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-200 px-6 py-2 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-gray-500 hover:text-gray-700">
              <Menu className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-lg font-bold text-[#0B163F]">
                Dashboard
              </h1>
              <p className="text-xs text-gray-400">Zeest Media</p>
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


        <div className="w-full mx-auto px-6 py-3 overflow-scroll">
          <Toaster />
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 my-4"
          >
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-[#0B163F] mb-2">
                Welcome, {user?.email?.slice(0, user?.email?.indexOf("@")) || 'User'}!
              </h1>
              <p className="text-gray-600">
                Manage your press releases and track their performance
              </p>
            </div>
            <a href="/dashboard/sent-press-release?type=new">
              <Button
                className="bg-[#D34586] hover:bg-[#D34586]/90 text-white cursor-pointer px-6 py-6 text-lg"
              >

                <Plus className="w-5 h-5 mr-2" />
                New Press Release
              </Button>
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8"
          >
            {[
              { label: 'Drafts', value: stats.drafts, icon: FileText, color: '#6B7280' },
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

          {/* Main Content */}
          <AnimatePresence mode="wait">
            {

              showAnalytics && selectedPR ? (

                <motion.div
                  key="analytics"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <div className="flex items-center justify-between my-4">


                    <Button
                      className="bg-[#D34586] hover:bg-[#D34586]/90 text-white cursor-pointer px-3 py-3 text-md"
                      onClick={async () => await handleSendRequestEmail(selectedPR.id)}
                    >
                      {
                        sendingReport ? <Loader className='animate-spin' />
                          : <FileText />
                      }
                      Request Report
                    </Button>

                    <Button
                      variant="outline"
                      onClick={() => { setShowAnalytics(false); setSelectedPR(null); }}
                      className="text-gray-600"
                    >
                      <X className="w-4 h-4 mr-2" />
                      Close
                    </Button>
                  </div>

                  <PressContent pressRelease={selectedPR} error={null} />

                  {/* <AnalyticsSection pressRelease={selectedPR} /> */}
                </motion.div>
              ) : (
                <motion.div
                  key="table"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <div className="mb-6">
                    <h2 className="text-xl font-bold text-[#0B163F]">Press Releases</h2>
                  </div>

                  {loading && (
                    <div className="w-full flex justify-center items-center py-16">
                      <div className="w-16 h-16 rounded-full border-4 border-[#D34586]/20 border-t-[#D34586] mb-4 animate-spin flex items-center justify-center" />
                    </div>
                  )}
                  {pressReleases.length > 0 && (
                    <PRTable
                      pressReleases={pressReleases}
                      onViewAnalytics={handleViewAnalytics}
                      onEdit={handleEdit}
                      onDelete={handleDelete}
                    />
                  )}

                  {!loading && pressReleases.length === 0 && (
                    <div className="text-center w-full py-16 bg-white rounded-2xl border border-gray-100">
                      <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-6">
                        <FileText className="w-10 h-10 text-gray-400" />
                      </div>
                      <h3 className="text-xl font-semibold text-[#0B163F] mb-2">No press releases yet</h3>
                      <p className="text-gray-500 mb-6">Get started by creating your first press release</p>
                      <Button className="bg-[#D34586] hover:bg-[#D34586]/90 text-white" onClick={() => window.location.href = '/dashboard/sent-press-release?type=new'}>
                        <Plus className="w-4 h-4 mr-2" />
                        Create Press Release
                      </Button>
                    </div>)}

                </motion.div>
              )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
"use client";

import { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Eye, Trash2, ChevronDown, RefreshCw, Loader, ChevronRight, ChevronLeft, Pencil } from 'lucide-react';
import AdminPressReleaseDetail from './AdminPressReleaseDetails';
import { PressReleaseType } from '@/context/PressReleaseContext';
import { toast } from 'sonner';
import { sendPressStatusUpdateEmail } from '@/lib/resend';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { useAdminPressRelease } from '@/context/AdminPressReleases';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from '../ui/input';

const ALL_STATUSES = ['all', 'draft', 'pending', 'scheduled', 'published', 'rejected'];

const statusColors: Record<string, string> = {
  draft: 'bg-gray-100 text-gray-600',
  pending: 'bg-yellow-100 text-yellow-700',
  scheduled: 'bg-blue-100 text-blue-700',
  published: 'bg-green-100 text-green-700',
  rejected: 'bg-red-100 text-red-700',
};

export default function AdminPressReleases() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedPR, setSelectedPR] = useState<PressReleaseType | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [parentloadingProcess, setParentLoadingProcess] = useState(false)

  const { pressReleases, setPressReleases, loading } = useAdminPressRelease();

  const filteredReleases = pressReleases.filter((pr) => {
    const matchSearch =
      !search ||
      pr.title?.toLowerCase().includes(search.toLowerCase()) ||
      pr.company_name?.toLowerCase().includes(search.toLowerCase());

    const matchStatus =
      statusFilter === 'all' || pr.status === statusFilter;

    return matchSearch && matchStatus;
  });

  const totalPages = Math.ceil(filteredReleases.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;

  const paginatedReleases = filteredReleases.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const editPR = (pr: PressReleaseType) => {
    window.location.href = `/dashboard/sent-press-release?id=${pr.id}&type=edit&method=${pr.method}`;
  };


  const deletePR = async (id: string) => {
    try {
      const confirm = window.confirm("Are you sure you want to delete this press release?");
      if (!confirm) return;
      await axios.delete(`/api/admin/press-release/${id}`);
      toast.success("Press Release Successfully Deleted")
      window.location.reload();
      // setPressReleases(prev => prev.filter(pr => pr.id !== id));
    } catch (err) {
      console.error('Delete error', err);
    }
  };



  const updateStatus = async (id: string, status: string, note?: string) => {
    try {

      setParentLoadingProcess(true);
      const response = await axios.patch(`/api/admin/press-release/${id}`, { status });

      if (response.status == 201 || response.status == 200) {
        let updatedItem: any = null;

        setPressReleases((prev: any) => {
          const updated = prev.map((pr: any) => {
            if (pr.id === id) {
              updatedItem = { ...pr, status };
              return updatedItem;
            }
            return pr;
          });
          return updated;
        });

        if (updatedItem) {
          await sendPressStatusUpdateEmail({
            name: updatedItem.contact_name || 'Customer',
            email: updatedItem.contact_email,
            pressId: updatedItem.id,
            pressTitle: updatedItem.title,
            pressLink: `${window.location.origin}/press-release/${updatedItem.id}`,
            status: status,
            note: note,
          });
        }
        toast.success("Status Successfully Updated")
        setParentLoadingProcess(false)
        return updatedItem;
      }

      setParentLoadingProcess(false)
      toast.error("Something Went Wrong!")
    } catch (err: any) {
      console.error('Update error', err);
      setParentLoadingProcess(false)
      toast.error(err.message)
    }
  };

  if (selectedPR) {
    return (
      <AdminPressReleaseDetail
        pr={selectedPR}
        onBack={() => setSelectedPR(null)}
        loadingProcess={parentloadingProcess}
        onStatusChange={async (id, status, note) => {
          setParentLoadingProcess(true);
          const updatedPR = await updateStatus(id, status, note);
          if (updatedPR) {
            setSelectedPR(updatedPR);
          }
          setParentLoadingProcess(false);
        }}
      />
    );
  }

  return (
    <div className="relative space-y-6">
      {/* Filters */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by title or company..."
            className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D34586]/20 focus:border-[#D34586]"
          />
        </div>

        <div className="flex gap-2 flex-wrap">
          {ALL_STATUSES.map(s => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-2 text-xs font-semibold rounded-lg capitalize transition-all ${statusFilter === s
                ? 'bg-[#0B163F] text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
            >
              {s === 'all' ? 'All' : s.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>



      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="font-bold text-[#0B163F]">
            Press Releases{' '}
            <span className="text-gray-400 font-normal">({paginatedReleases.length})</span>
          </h2>
          <button
            className="text-gray-400 hover:text-gray-600"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>

        {loading ? (
          <div className="w-full h-full flex items-center justify-center py-16">
            <div className="w-16 h-16 rounded-full border-4 border-[#D34586]/20 border-t-[#D34586] mb-4 animate-spin flex items-center justify-center" />
          </div>
        ) : paginatedReleases.length === 0 ? (
          <div className="py-16 text-center text-gray-400">
            No press releases found
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-left">
                  <th className="px-6 py-3 font-semibold text-gray-500 text-xs uppercase tracking-wider">Title</th>
                  <th className="px-4 py-3 font-semibold text-gray-500 text-xs uppercase tracking-wider">Company</th>
                  <th className="px-4 py-3 font-semibold text-gray-500 text-xs uppercase tracking-wider">Package</th>
                  <th className="px-4 py-3 font-semibold text-gray-500 text-xs uppercase tracking-wider">Status</th>
                  <th className="px-4 py-3 font-semibold text-gray-500 text-xs uppercase tracking-wider">Date</th>
                  <th className="px-4 py-3 font-semibold text-gray-500 text-xs uppercase tracking-wider">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-50">
                {paginatedReleases.map(pr => (
                  <tr key={pr.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <a href={`/press-release/${pr.id}`} className="font-medium w-fit text-[#0B163F] max-w-30 truncate">
                        {pr.title.slice(0, 30)}...
                      </a>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {pr.contact_email}
                      </p>
                    </td>

                    <td className="px-4 py-4 text-gray-600">
                      {pr.company_name || '—'}
                    </td>

                    <td className="px-4 py-4">
                      <span className="text-xs font-semibold text-[#1676BF]">
                        {pr.package || '—'}
                      </span>
                    </td>

                    <td className="px-4 py-4">
                      <StatusDropdown
                        current={pr}
                        updateStatus={updateStatus}
                      />
                    </td>

                    <td className="px-4 py-4 text-gray-500 text-xs">
                      {pr?.created_at ? new Date(pr.created_at).toLocaleDateString() : ''}
                    </td>

                    <td className="px-4 py-4">
                      <div className="flex items-center justify-end gap-2">
                        {
                          pr.status !== 'published' && <button
                            onClick={() => editPR(pr)}
                            className="w-8 h-8 rounded-lg cursor-pointer bg-yellow-500/10 text-yellow-700 flex items-center justify-center hover:bg-yellow-700/20 transition-colors"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                        }
                        <button
                          onClick={() => setSelectedPR(pr)}
                          className="w-8 h-8 rounded-lg cursor-pointer bg-[#1676BF]/10 text-[#1676BF] flex items-center justify-center hover:bg-[#1676BF]/20 transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => deletePR(pr.id)}
                          className="w-8 h-8 rounded-lg cursor-pointer bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-100 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            {pressReleases.length > 0 && (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4 border-t border-gray-200 bg-gray-50">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Items per page:</span>
                  <Select value={String(itemsPerPage)} onValueChange={(v) => { setItemsPerPage(Number(v)); setCurrentPage(1); }}>
                    <SelectTrigger className="w-17.5 h-8 bg-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10">10</SelectItem>
                      <SelectItem value="25">25</SelectItem>
                      <SelectItem value="50">50</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center gap-1">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>

                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }

                    return (
                      <Button
                        key={pageNum}
                        variant={currentPage === pageNum ? "default" : "outline"}
                        size="icon"
                        className={`h-8 w-8 ${currentPage === pageNum ? 'bg-[#0B163F] text-white' : ''}`}
                        onClick={() => setCurrentPage(pageNum)}
                      >
                        {pageNum}
                      </Button>
                    );
                  })}

                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages || totalPages === 0}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>

                <span className="text-sm text-gray-600">
                  Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, pressReleases.length)} of {pressReleases.length}
                </span>
              </div>
            )}

          </div>
        )}
      </div>
    </div>
  );
}

function StatusDropdown({
  current,
  updateStatus,
}: {
  current: PressReleaseType;
  updateStatus: (id: string, status: string, note?: string,) => Promise<void>;
}) {
  const [open, setOpen] = useState(false);
  const statuses = ['draft', 'pending', 'scheduled', 'published', 'rejected'];
  const [loadingProcess, setLoadingProcess] = useState(false)
  const [note, setNote] = useState<string>('')

  return (
    <div className="relative ">

      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center cursor-pointer gap-1.5 text-xs font-semibold px-2.5 py-1.5 rounded-full capitalize ${statusColors[current.status] || 'bg-gray-100 text-gray-600'
          }`}
      >
        {loadingProcess ? <Loader size={14} className='animate-spin' /> : current?.status.replace('_', ' ') || '—'}
        <ChevronDown className="w-3 h-3" />
      </button>

      <AnimatePresence>
        {open && (
          <>
            <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -4 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -4 }}
              className="absolute left-0 top-full mt-1 z-20 bg-white border border-gray-200 rounded-xl shadow-xl py-1 min-w-37.5"
            >
              {statuses.map(s => (

                <Dialog key={s}>
                  <DialogTrigger className={`w-full flex items-center cursor-pointer gap-2 px-3 py-2 text-xs capitalize hover:bg-gray-50 ${current.status === s ? 'font-bold' : ''}`}>
                    <span
                      className={`w-2 h-2 rounded-full ${statusColors[s]?.split(' ')[0]
                        }`}
                    />
                    {s}
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Are you absolutely sure?</DialogTitle>
                      <DialogDescription>
                        The status will change to {s}
                      </DialogDescription>

                      {
                        s === "rejected" && <Input onChange={(e)=> setNote(e.target.value)} placeholder='Enter Your Note' className='my-2' />
                      }

                      <div className="flex items-center justify-between">
                        <DialogClose asChild>

                        <Button variant={'secondary'} className='text-white'>Cancel</Button>
                        </DialogClose>

                        <DialogClose asChild>
                        <Button variant={'default'}
                          onClick={async () => {
                            setOpen(false);
                            setLoadingProcess(true);
                            await updateStatus(current.id, s, note);
                            setLoadingProcess(false);
                          }}
                          className='text-white'>Change</Button>
                        </DialogClose>

                      </div>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>

                // <button
                //   key={s}
                //   onClick={async () => {
                //     setOpen(false);
                //     setLoadingProcess(true);
                //     await updateStatus(current.id, s);
                //     setLoadingProcess(false);
                //   }}
                //   className={`w-full flex items-center gap-2 px-3 py-2 text-xs capitalize hover:bg-gray-50 ${current.status === s ? 'font-bold' : ''
                //     }`}
                // >
                //   <span
                //     className={`w-2 h-2 rounded-full ${statusColors[s]?.split(' ')[0]
                //       }`}
                //   />
                //   {s}
                // </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
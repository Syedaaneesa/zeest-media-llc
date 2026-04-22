"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Edit, Trash2, ChevronLeft, ChevronRight, ArrowUpDown, Eye, BarChart } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import moment from 'moment';


import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";


const statusStyles: Record<string, { label: string; bg: string; text: string }> = {
  published: { label: 'Published', bg: 'bg-green-100', text: 'text-green-700' },
  pending: { label: 'Pending', bg: 'bg-yellow-100', text: 'text-yellow-700' },
  scheduled: { label: 'Scheduled', bg: 'bg-purple-100', text: 'text-purple-700' },
  draft: { label: 'Draft', bg: 'bg-gray-100', text: 'text-gray-700' },
  rejected: { label: 'Rejected', bg: 'bg-red-100', text: 'text-red-700' },
};

export default function PRTable({ pressReleases, onViewAnalytics, onEdit, onDelete }: { pressReleases: any[]; onViewAnalytics: (pr: any) => void; onEdit: (pr: any) => void; onDelete: (id: string) => void; }) {
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState('desc');

  // Pagination
  const totalPages = Math.ceil(pressReleases.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedReleases = pressReleases.slice(startIndex, startIndex + itemsPerPage);

  const toggleSort = () => {
    setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
  };

  const generateOrderId = (id: string) => {
    return `ZM-${String(id).padStart(6, '0')}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm"
    >


      {/* Table */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-[#0B163F] hover:bg-[#0B163F]">
              <TableHead
                className="text-white font-semibold cursor-pointer"
                onClick={toggleSort}
              >
                <div className="flex items-center gap-2">
                  Date
                  <ArrowUpDown className="w-4 h-4" />
                </div>
              </TableHead>
              <TableHead className="text-white font-semibold">PR Headline</TableHead>
              <TableHead className="text-white font-semibold">Order ID</TableHead>
              <TableHead className="text-white font-semibold">Status</TableHead>
              <TableHead className="text-white font-semibold">Report</TableHead>
              <TableHead className="text-white font-semibold text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedReleases.length > 0 ? (
              paginatedReleases.map((pr, index) => {
                const status = statusStyles[pr.status] || statusStyles.draft;
                return (
                  <TableRow
                    key={pr.id}
                    className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                  >
                    <TableCell className="font-medium text-gray-700">
                      {moment(pr.created_at).format('MMM D, YYYY')}
                    </TableCell>
                    <TableCell>
                      <a
                        href={`/press-release/${pr.id}`}
                        className="text-[#1676BF] hover:text-[#D34586] font-medium text-left hover:underline transition-colors max-w-75 truncate block"
                      >
                        {pr.title}
                      </a>
                    </TableCell>
                    <TableCell className="text-gray-600 font-mono text-sm">
                      {generateOrderId(pr.id)}
                    </TableCell>
                    <TableCell>
                      <Badge className={`${status.bg} ${status.text} border-0 font-medium`}>
                        {status.label}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {
                        pr.status !== "published" ? <div className="flex items-center justify-center gap-2">-- </div> : <div className="flex items-center justify-center gap-2">
                          <Tooltip>

                            <TooltipTrigger onClick={() => onViewAnalytics(pr)} className='cursor-pointer p-1 rounded bg-black/90'>

                              {/* <Button size={"xs"} className='self-center' > */}
                              <BarChart size={14} color='white' />
                              {/* </Button> */}
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Check Report</p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                      }
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        {
                          pr.status !== 'draft' ? (
                            <Tooltip>
                              <TooltipTrigger>
                                <a href={`/press-release/${pr.id}`} target='_blank' className="flex content-center h-8 w-8 text-gray-500 hover:text-[#1676BF]"
                                >
                                  <Eye className="w-4 h-4" />
                                </a>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Preview</p>
                              </TooltipContent>
                            </Tooltip>
                          ) : (
                            <>
                              <Tooltip>
                                <TooltipTrigger
                                  onClick={() => onEdit(pr)}
                                  className="h-8 w-8 text-gray-500 cursor-pointer hover:text-[#1676BF]"
                                >
                                  <Edit className="w-4 h-4" />
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Edit Press Release</p>
                                </TooltipContent>
                              </Tooltip>

                              <Dialog>
                                <DialogTrigger
                                className="h-8 w-8 text-gray-500 cursor-pointer hover:text-red-500">
                                  <Trash2 className="w-4 h-4" />
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                                    <DialogDescription>
                                      The action will not be undo!
                                    </DialogDescription>

                                    <div className="flex items-center justify-between mt-10">
                                      <DialogClose asChild>

                                        <Button variant={'secondary'} className='text-white'>Cancel</Button>
                                      </DialogClose>

                                      <DialogClose asChild>
                                        <Button variant={'default'}
                                          onClick={() =>  onDelete(pr.id)}
                                          className='text-white'>Delete</Button>
                                      </DialogClose>

                                    </div>
                                  </DialogHeader>
                                </DialogContent>
                              </Dialog>
   
                      </>
                      )
                        }
                    </div>
                  </TableCell>
                  </TableRow>
          );
              })
          ) : (
          <TableRow>
            <TableCell colSpan={6} className="text-center py-12 text-gray-500">
              No press releases found
            </TableCell>
          </TableRow>
            )}
        </TableBody>
      </Table>
    </div>

      {/* Pagination */ }
  {
    pressReleases.length > 0 && (
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
    )
  }
    </motion.div >
  );
}
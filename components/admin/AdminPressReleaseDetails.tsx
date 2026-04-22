"use client";
import { motion } from 'framer-motion';
import { ArrowLeft, Mail, Phone, Building2, User, Loader } from 'lucide-react';
import { format } from 'date-fns';
import { PressReleaseType } from '@/context/PressReleaseContext';

const statusColors: Record<string, string> = {
  draft: 'bg-gray-100 text-gray-600',
  pending: 'bg-orange-100 text-orange-700',
  scheduled: 'bg-green-50 text-green-700',
  published: 'bg-green-100 text-green-700',
  rejected: 'bg-red-100 text-red-700',
};

const statuses = ['draft', 'pending', 'scheduled', 'published', 'rejected'];

export default function AdminPressReleaseDetail({ pr, onBack, loadingProcess, onStatusChange }: {
  pr: PressReleaseType;
  onBack: () => void;
  loadingProcess: boolean;
  onStatusChange: (id: string, newStatus: string, note?: string) => void;
}) {


  if (!pr) {
    return <div className="p-6 text-sm text-gray-500">Loading press release...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <button onClick={onBack} className="flex items-center gap-2 text-gray-500 hover:text-[#0B163F] text-sm font-medium">
          <ArrowLeft className="w-4 h-4" /> Back to list
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main */}
        <div className="lg:col-span-2 space-y-6">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h1 className="text-2xl font-bold text-[#0B163F] mb-2">{pr.title}</h1>
            <div className="flex flex-wrap gap-3 mb-6">
              <span className={`text-xs font-bold px-3 py-1.5 rounded-full capitalize ${statusColors[pr.status]}`}>
                {pr.status}
              </span>
              <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-[#1676BF]/10 text-[#1676BF] capitalize">
                {pr.package} package
              </span>
              {pr.tone && (
                <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-gray-100 text-gray-600 capitalize">
                  {pr.tone} tone
                </span>
              )}
            </div>

           { pr.featured_image &&  <img src={"/api/images?url="+pr?.featured_image} alt={pr?.title} className='mb-4' />}

           {pr.content && <div className="prose wrap-break-word overflow-hidden max-w-none text-gray-700 text-sm leading-relaxed
              [&_h1]:text-xl [&_h1]:font-bold [&_h1]:text-[#0B163F] [&_h1]:mb-3
              [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:text-[#0B163F] [&_h2]:mb-2
              [&_p]:mb-3 [&_img]:rounded-lg [&_img]:max-w-full [&_img]:my-4
              [&_strong]:font-bold [&_a]:text-[#1676BF]"
              dangerouslySetInnerHTML={{ __html: pr.content }}
            />}

     {
          pr?.upload_file_press_release && (() => {
            const file = pr.upload_file_press_release;

            const isPDF = (typeof file === "string" && file.includes(".pdf"));

            const fileURL = "/api/images?url="+file;

            return (
              <div className="mt-6">
                {isPDF ? (
                  <iframe
                    src={fileURL}
                    title="Press Release Attachment"
                    className="w-full h-screen border border-gray-200 rounded-lg"
                  />
                ) : (
                  <div className="">
                    <p className="text-md text-foreground font-semibold mb-2">
                      Attached File:
                    </p>

                    <a
                      href={fileURL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className='text-sm bg-primary mt-4 py-2 px-4 rounded-md font-medium text-white'
                    >
                      {"Download " + (file?.split('.')[0] || "Attachment")}
                    </a>
                  </div>
                )}
              </div>
            );
          })()
        }

          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Change Status */}
          <motion.div initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Change Status</h3>
            <div className="space-y-2">
              {statuses.map(s => (
                <button
                  key={s}
                  onClick={() => onStatusChange(pr.id, s)}
                  className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm capitalize transition-all font-medium
                    ${pr.status === s ? statusColors[s] + ' ring-2 ring-offset-1 ring-current/30' : 'text-gray-600 hover:bg-gray-50'}`}
                >
                  <span className={`w-2 h-2 rounded-full ${statusColors[s]?.split(' ')[0]}`} />
                  {s.replace('_', ' ')}

                  {pr.status === s && (
                    <>
                      {loadingProcess && <Loader className={`ml-auto w-4 h-4 animate-spin ${statusColors[s]?.split(' ')[0]}`} />}
                      <span className="ml-auto text-xs">✓ Current</span>
                    </>
                  )}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Contact */}
          <motion.div initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 }} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Media Contact</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2 text-gray-700">
                <Building2 className="w-4 h-4 text-gray-400" />
                <span className="font-medium">{pr.company_name || '—'}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <User className="w-4 h-4 text-gray-400" />
                <span>{pr.contact_name || '—'}</span>
              </div>
              <a href={`mailto:${pr.contact_email}`} className="flex items-center gap-2 text-[#1676BF] hover:text-[#D34586]">
                <Mail className="w-4 h-4" />
                <span className="truncate">{pr.contact_email || '—'}</span>
              </a>
              <a href={`tel:${pr.contact_phone}`} className="flex items-center gap-2 text-[#1676BF] hover:text-[#D34586]">
                <Phone className="w-4 h-4" />
                <span>{pr.contact_phone || '—'}</span>
              </a>
            </div>
          </motion.div>

          {/* Details */}
          <motion.div initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Release Details</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Submitted</span>
                <span className="font-medium text-[#0B163F]">
                  {pr.created_at ? format(new Date(pr.created_at), 'MMM d, yyyy') : '—'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Scheduled</span>
                <span className="font-medium text-[#0B163F]">
                  {pr.scheduled_date ? format(new Date(pr.scheduled_date), 'MMM d, yyyy') : '—'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Package</span>
                <span className="font-medium capitalize text-[#1676BF]">{pr.package}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Release ID</span>
                <span className="font-mono text-gray-400 text-xs">#{pr.id}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { motion } from 'framer-motion';
import { Calendar, Mail, Phone, Share2, Printer } from 'lucide-react';
import { format } from 'date-fns';
const PressContent = ({ pressRelease, error }: { pressRelease: any; error: any }) => {

  const formattedDate = (() => {
    if (error || !pressRelease?.scheduled_date) return "Unknown Date";
    try {
      return format(new Date(pressRelease.scheduled_date), 'MMMM d, yyyy');
    } catch {
      return pressRelease.scheduled_date;
    }
  })();

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: pressRelease.title, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-4 gap-10">

      {/* Article */}
      <motion.article
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="lg:col-span-3"
      >

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-[#0B163F] leading-tight mb-3">
          {pressRelease.title}
        </h1>

        {/* Featured Image */}
        {!error && pressRelease?.featured_image && (
          <div className="mb-8 rounded-lg overflow-hidden border border-gray-100 shadow-sm">
            <img
              src={"/api/images?url=" + pressRelease.featured_image}
              alt={pressRelease.title}
              className="w-full object-cover max-h-105"
            />
          </div>
        )}
        {/* Meta row */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 pb-6 mb-6 border-b border-gray-200">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4" />
            <span>{pressRelease.publish_type == "instant" ? "Instant" : formattedDate}</span>
          </div>
          <span className="text-gray-300">|</span>
          <span className="font-semibold text-[#0B163F]">{pressRelease.company_name}</span>
          {pressRelease.publish_type !== "instant" && <>
            <span className="text-gray-300">|</span>
            <span>{pressRelease.timezone}</span>
          </>
          }

          <div className="flex items-center gap-3">
            <button
              onClick={() => window.print()}
              className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#0B163F] transition-colors border border-gray-200 rounded px-3 py-1.5"
            >
              <Printer className="w-4 h-4" />
              <span className="hidden sm:inline">Print</span>
            </button>
            <button
              onClick={handleShare}
              className="flex items-center gap-2 text-sm text-white bg-[#D34586] hover:bg-[#D34586]/90 transition-colors rounded px-3 py-1.5"
            >
              <Share2 className="w-4 h-4" />
              <span className="hidden sm:inline">Share</span>
            </button>
          </div>

        </div>

        {/* summary */}
        {pressRelease.summary && (
          <p className="text-sm font-normal mb-6 leading-relaxed">
            {pressRelease.summary}
          </p>
        )}
        {/* Body Content */}
        <div
          className="
              text-gray-700 text-base text-wrap leading-loose wrap-break-word
              [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:text-[#0B163F] [&_h1]:mt-8 [&_h1]:mb-4
              [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-[#0B163F] [&_h2]:mt-6 [&_h2]:mb-3
              [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-[#0B163F] [&_h3]:mt-5 [&_h3]:mb-2
              [&_p]:mb-5 [&_p]:text-gray-700
              [&_strong]:font-bold [&_strong]:text-[#0B163F]
              [&_img]:rounded-lg [&_img]:shadow-sm [&_img]:my-6 [&_img]:max-w-full [&_img]:border [&_img]:border-gray-100
              [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-5 [&_ul]:space-y-2
              [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-5 [&_ol]:space-y-2
              [&_li]:text-gray-700
              [&_a]:text-[#1676BF] [&_a]:underline [&_a]:hover:text-[#D34586]
              [&_blockquote]:border-l-4 [&_blockquote]:border-[#D34586] [&_blockquote]:pl-5 [&_blockquote]:italic [&_blockquote]:text-gray-600 [&_blockquote]:my-6
            "
          dangerouslySetInnerHTML={{ __html: pressRelease.content }}
        />

     {
          pressRelease?.upload_file_press_release && (() => {
            const file = pressRelease.upload_file_press_release;

            const isPDF =
              (typeof file === "string" && file.includes(".pdf")) ||
              (typeof file === "object" && file?.name?.includes(".pdf"));

            const fileURL =
              typeof file === "string" ? "/api/images?url="+file : URL.createObjectURL(file);

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
                      {"Download " + (file?.name || "Attachment")}
                    </a>
                  </div>
                )}
              </div>
            );
          })()
        }


        {/* Divider */}
        <div className="border-t border-gray-200 mt-10 pt-8">
          <p className="text-xs text-gray-400 uppercase tracking-widest font-semibold mb-4">Media Contact</p>
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div>
              <p className="font-bold text-[#0B163F] text-base">{pressRelease.contact_name}</p>
              <p className="text-sm text-gray-500">{pressRelease.company_name}</p>
            </div>
            <div className="sm:ml-auto flex flex-col sm:flex-row gap-3">
              <a
                href={`mailto:${pressRelease.contact_email}`}
                className="flex items-center gap-2 text-sm text-[#1676BF] hover:text-[#D34586] transition-colors"
              >
                <Mail className="w-4 h-4" />
                {pressRelease.contact_email}
              </a>
              <a
                href={`tel:${pressRelease.contact_phone}`}
                className="flex items-center gap-2 text-sm text-[#1676BF] hover:text-[#D34586] transition-colors"
              >
                <Phone className="w-4 h-4" />
                {pressRelease.contact_phone}
              </a>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-100">
          <p className="text-xs text-gray-400 leading-relaxed">
            This press release was distributed by Zeest AI Media Suite. The issuer is solely responsible for the content of this announcement.
            © {new Date().getFullYear()} {pressRelease.company_name}. All rights reserved.
          </p>
        </div>
      </motion.article>

      {/* Sidebar */}
      <motion.aside
        initial={{ opacity: 0, x: 16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
        className="lg:col-span-1 space-y-6"
      >
        {/* Company Card */}
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">About the Company</p>
          </div>
          <div className="p-4">
            {pressRelease.company_logo && (
              <img
                src={"/api/images?url=" + pressRelease.company_logo}
                alt={pressRelease.company_name}
                className="h-10 w-auto object-contain mb-3"
              />
            )}
            <p className="font-bold text-[#0B163F] text-sm">{pressRelease.company_name}</p>
            <div className="mt-3 pt-3 border-t border-gray-100 space-y-2">
              <a href={`mailto:${pressRelease.contact_email}`} className="flex items-center gap-2 text-xs text-gray-500 hover:text-[#D34586]">
                <Mail className="w-3.5 h-3.5" />
                {pressRelease.contact_email}
              </a>
              <a href={`tel:${pressRelease.contact_phone}`} className="flex items-center gap-2 text-xs text-gray-500 hover:text-[#D34586]">
                <Phone className="w-3.5 h-3.5" />
                {pressRelease.contact_phone}
              </a>
            </div>
          </div>
        </div>

        {/* Release Info */}
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Release Info</p>
          </div>
          <div className="p-4 space-y-3 text-xs text-gray-600">
            <div className="flex justify-between">
              <span className="text-gray-400">Date</span>
              <span className="font-medium text-[#0B163F]">{pressRelease.publish_type == "instant" ? "Instant" : formattedDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Timezone</span>
              <span className="font-medium text-[#0B163F] text-right">{pressRelease.timezone}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Language</span>
              <span className="font-medium text-[#0B163F]">English</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Release ID</span>
              <span className="font-mono text-gray-400">#{pressRelease.id}</span>
            </div>
          </div>
        </div>

        {/* Distributed by */}
        <div className="border border-gray-200 rounded-lg p-4 text-center">
          <p className="text-xs text-gray-400 mb-2">Distributed via</p>
          <img
            src="/logo/logo.png"
            alt="Zeest Media"
            className="h-7 w-auto object-contain mx-auto"
          />
          <p className="text-xs text-gray-400 mt-2">Zeest AI Media Suite</p>
        </div>
      </motion.aside>
    </div>
  )
}

export default PressContent
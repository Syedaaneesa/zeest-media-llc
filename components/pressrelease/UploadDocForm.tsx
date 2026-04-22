"use client";

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Upload, X, CheckCircle, Loader2 } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { toast } from 'sonner';

export default function UploadDocForm({ uploadFiles, setUploadFiles, setFormData, postId }: { uploadFiles: string | File | null; setUploadFiles: React.Dispatch<React.SetStateAction<string | File | null>>; setFormData: React.Dispatch<React.SetStateAction<any>>; postId: string | null }) {
  const [loading, setLoading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState('');
  const [isDragOver, setIsDragOver] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const acceptedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

  const handleFile = async (f: File | null) => {
    if (!f) return;
    if (!acceptedTypes.includes(f.type)) { toast.error('Please upload a PDF or Word (.docx) file.'); return; }
    if (f.size > 10 * 1024 * 1024) { toast.error('File size must be under 10MB.'); return; }
    setLoading(true);
    setUploadFiles(f);
    setLoading(false);
    toast.success('File uploaded successfully!');
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    const f = e.dataTransfer.files?.[0];
    if (f) handleFile(f);
  };


  const deleteFile = () => {
    setLoading(true);
    if (typeof uploadFiles === "string") {
    
      // Fetch request to delete the file from the server
      fetch('/api/images/delete-file', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ filePath: uploadFiles, postId: postId }),
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to delete file');
          }
          return response.json();
        })
        .then(data => {
          setLoading(false);
          setUploadFiles(null);
          setUploadedUrl('');
          setFormData((prev: any) => ({ ...prev, upload_file_press_release: null }));
          toast.success('File removed');
          return;
        }
        )
        .catch(error => {
          setLoading(false);
          console.error('Error deleting file:', error);
          toast.error('Failed to delete file');
        });
      return;
    }
    setLoading(false);
    setUploadFiles(null);
    setUploadedUrl('');
    toast('File removed');
  };


  const fileIcon = typeof uploadFiles === 'string' ? (uploadFiles.endsWith('.pdf') ? '📄' : '📝') : (uploadFiles?.name?.endsWith('.pdf') ? '📄' : '📝');

  return (
    <div className="space-y-6 mt-5">

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-[#10B981]/20 border border-[#10B981]/40 flex items-center justify-center">
            <Upload className="w-5 h-5 text-[#10B981]" />
          </div>
          <div>
            <h3 className="text-forground font-bold text-lg">Upload Your Document</h3>
            <p className="text-forground/50 text-sm">Supports PDF and Word (.docx) files up to 10MB</p>
          </div>
        </div>

<div className="relative w-full min-h-75">


        {/* Drop Zone */}
        {!uploadFiles ? (
          <div
            onDragOver={e => { e.preventDefault(); setIsDragOver(true); }}
            onDragLeave={() => setIsDragOver(false)}
            onDrop={handleDrop}
            onClick={() => fileRef.current?.click()}
            className={`cursor-pointer border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 ${isDragOver ? 'border-[#10B981] bg-[#10B981]/10' : 'border-forground/20 hover:border-forground/40 hover:bg-forground/5'
              }`}
          >
            <Upload className="w-12 h-12 text-forground/30 mx-auto mb-4" />
            <p className="text-forground font-semibold mb-1">Drag & drop your file here</p>
            <p className="text-forground/40 text-sm mb-4">or click to browse</p>
            <span className="px-4 py-2 rounded-full border border-forground/20 text-forground/60 text-xs">PDF, DOCX — Max 10MB</span>
            <Input ref={fileRef} type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFile(e.target.files?.[0] || null)} />
          </div>
        ) : (
          <div className="bg-forground/5 border border-forground/10 rounded-2xl p-5 flex items-center gap-4">
            <div className="text-4xl">{fileIcon}</div>
            <div className="flex-1 min-w-0">
              <a href={typeof uploadFiles === 'string' ? "/api/images?url=" + uploadFiles : URL.createObjectURL(uploadFiles as File)} target="_blank" rel="noopener noreferrer" className="text-forground font-semibold truncate">
                {typeof uploadFiles === 'string' ? uploadFiles.split('/').pop() : uploadFiles?.name}
              </a>
              <p className="text-forground/40 text-xs">
                {(typeof uploadFiles === 'string' ? 0 : uploadFiles?.size / 1024).toFixed(1)} KB
              </p>

              {!loading && uploadedUrl && (
                <div className="flex items-center gap-2 mt-2">
                  <CheckCircle className="w-3.5 h-3.5 text-[#10B981]" />
                  <span className="text-[#10B981] text-xs">Upload complete</span>
                </div>
              )}
            </div>
            <button onClick={() => deleteFile()} className="w-8 cursor-pointer h-8 rounded-full bg-forground/10 hover:bg-forground/20 flex items-center justify-center transition-colors">
              <X className="w-4 h-4 text-forground/60" />
            </button>
          </div>
        )}

        {loading && (
            <div className="absolute top-0 left-0 w-full min-h-75 flex items-center justify-center rounded-2xl bg-background/20 backdrop-blur-2xl">
              <div className="w-16 h-16 rounded-full border-4 border-[#D34586]/20 border-t-[#D34586] mb-4 animate-spin flex items-center justify-center" /></div>
        )}

        </div>
      </motion.div>
    </div>
  );
}
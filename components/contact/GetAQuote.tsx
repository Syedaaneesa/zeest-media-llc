"use client"

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, Loader2, DollarSign, Globe, User, Mail, Phone, Building2, FileText } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from 'sonner';
import { Slider } from '../ui/slider';
import { sendQuoteEmails } from '@/lib/resend';

type Regions = {
    id: string;
    label: string;
}
const regions:Regions[] = [
  { id: 'european', label: 'European'},
  { id: 'asian', label: 'Asian'},
  { id: 'uk', label: 'UK'},
  { id: 'gulf', label: 'Gulf'},
  { id: 'china', label: 'China'},
  { id: 'japan', label: 'Japan'},
];


const initialForm = {
  name: '', email: '', phone: '', company: '',
  regions: [] as string[], budget: '500', details: '',
};

export default function GetAQuoteModal({ open, onClose }: any) {
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const toggleRegion = (id: string) => {
    setForm((prev:any) => ({
      ...prev,
      regions: prev.regions.includes(id)
        ? prev.regions.filter((r:any) => r !== id)
        : [...prev.regions, id],
    }));
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!form.name || !form.email || !form.budget || form.regions.length === 0) {
    toast.error("Please fill in all required fields and select at least one region.");
    return;
  }

  try {
    setSubmitting(true);

    await sendQuoteEmails(form);

    setSubmitted(true);
    toast.success("Quote request submitted! We'll get back to you within 24 hours.");
    
    // ✅ Optional: reset form
    // setForm(initialState);

  } catch (error: any) {
    toast.error(error.message || "Failed to submit. Try again.");
  } finally {
    setSubmitting(false);
  }
};
  const handleClose = () => {
    onClose();
    setTimeout(() => { setSubmitted(false); setForm(initialForm); }, 300);
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed top-20 inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            className="relative bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto z-10"
          >
            {/* Header */}
            <div className="sticky top-0 z-10 bg-white rounded-t-3xl px-8 pt-8 pb-4 border-b border-gray-100">
              <div className="flex items-start justify-between">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D34586]/10 text-[#D34586] text-xs font-semibold mb-2">
                    <DollarSign className="w-3.5 h-3.5" /> Get A Quote
                  </div>
                  <h2 className="text-2xl font-bold text-[#0B163F]">Request Your Custom Quote</h2>
                  <p className="text-gray-500 text-sm mt-1">Tell us about your project and we'll tailor the perfect plan.</p>
                </div>
                <button onClick={handleClose}
                  className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors ml-4 shrink-0">
                  <X className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="px-8 py-6">
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring' }}>
                    <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mb-6 mx-auto">
                      <CheckCircle className="w-12 h-12 text-green-600" />
                    </div>
                  </motion.div>
                  <h3 className="text-xl font-bold text-[#0B163F] mb-2">Quote Request Sent!</h3>
                  <p className="text-gray-500 mb-6">Our team will review your request and contact you within 24 hours.</p>
                  <Button onClick={handleClose} className="bg-[#D34586] hover:bg-[#D34586]/90 text-white px-8">
                    Close
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Info */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                      <User className="w-4 h-4" /> Contact Information
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-[#0B163F] font-medium mb-1.5 block">Full Name *</Label>
                        <Input placeholder="John Smith" value={form.name}
                          onChange={e => setForm({ ...form, name: e.target.value })}
                          className="border-gray-200 focus:border-[#D34586]" />
                      </div>
                      <div>
                        <Label className="text-[#0B163F] font-medium mb-1.5 block">Email Address *</Label>
                        <Input type="email" placeholder="john@company.com" value={form.email}
                          onChange={e => setForm({ ...form, email: e.target.value })}
                          className="border-gray-200 focus:border-[#D34586]" />
                      </div>
                      <div>
                        <Label className="text-[#0B163F] font-medium mb-1.5 block">Phone Number</Label>
                        <Input placeholder="+1 (555) 000-0000" value={form.phone}
                          onChange={e => setForm({ ...form, phone: e.target.value })}
                          className="border-gray-200 focus:border-[#D34586]" />
                      </div>
                      <div>
                        <Label className="text-[#0B163F] font-medium mb-1.5 block">Company / Organization</Label>
                        <Input placeholder="Your company name" value={form.company}
                          onChange={e => setForm({ ...form, company: e.target.value })}
                          className="border-gray-200 focus:border-[#D34586]" />
                      </div>
                    </div>
                  </div>

                  {/* Region Selection */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                      <Globe className="w-4 h-4" /> Target Region(s) <i className='text-red-500'>*</i>
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {regions.map(region => {
                        const selected = form.regions.includes(region.id);
                        return (
                          <button
                            key={region.id}
                            type="button"
                            onClick={() => toggleRegion(region.id)}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 transition-all duration-200 text-left ${
                              selected
                                ? 'border-[#D34586] bg-[#D34586]/5 text-[#D34586]'
                                : 'border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50'
                            }`}
                          >
                            <span className="text-sm font-semibold">{region.label}</span>
                            {selected && (
                              <CheckCircle className="w-4 h-4 ml-auto text-[#D34586]" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Budget */}
                  <div>
                    <div className="flex items-center justify-between space-y-7">
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                      <DollarSign className="w-4 h-4" /> Budget Range <i className='text-red-500'>*</i>
                    </h3>

                    <Input
                      type="number"
                      placeholder=""
                      value={form.budget || 500}
                      min={500}
                      onChange={e => setForm(prev => ({ ...prev, budget: e.target.value }))}
                      className="w-24 border-gray-200 focus:border-[#D34586] mb-2"
                    />
                    </div>
                    <Slider 
                    min={500}
                    max={100000}
                    value={form.budget ? [parseInt(form.budget)] : [500]}
                    onValueChange={(value)=> setForm((prev)=> ({...prev, budget: value[0].toString()}))}
                    />
                  </div>

                  {/* Project Details */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                      <FileText className="w-4 h-4" /> Project Details
                    </h3>
                    <Textarea
                      placeholder="Tell us about your press release goals, target audience, or any specific requirements..."
                      value={form.details}
                      onChange={e => setForm({ ...form, details: e.target.value })}
                      className="border-gray-200 focus:border-[#D34586] min-h-25"
                    />
                  </div>

                  {/* Submit */}
                  <Button type="submit" disabled={submitting}
                    className="w-full bg-[#D34586] hover:bg-[#D34586]/90 text-white py-6 text-base font-semibold rounded-xl">
                    {submitting ? (
                      <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Submitting Quote...</>
                    ) : (
                      'Submit Quote Request'
                    )}
                  </Button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
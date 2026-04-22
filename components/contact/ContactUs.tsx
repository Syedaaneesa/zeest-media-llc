"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageSquare, Clock, CheckCircle, Loader2, FileText, Calendar } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from 'sonner';
import GetAQuoteModal from '@/components/contact/GetAQuote';
import { useSearchParams } from 'next/navigation';
import { sendContactEmails } from '@/lib/resend';

const contactInfo = [
  {
    icon: Mail,
    label: 'Email Us',
    value: 'info@zeestmedia.com',
    href: 'mailto:info@zeestmedia.com',
    color: '#D34586',
  },
  {
    icon: Phone,
    label: 'Call Us',
    value: '+1 (727) 615-5591',
    href: 'tel:+17276155591',
    color: '#1676BF',
  },
  {
    icon: MapPin,
    label: 'Our Office',
    value: '7901 4th St N #18789 St. Petersburg, FL, 33702, USA',
    href: '#',
    color: '#0B163F',
  },
  {
    icon: Clock,
    label: 'Business Hours',
    value: 'Mon-Fri, 9AM-6PM EST',
    href: '#',
    color: '#10B981',
  },
];

export default function ContactUs() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [quoteOpen, setQuoteOpen] = useState(false);
  const searchParams = useSearchParams();
  const quoteForm = searchParams.get("quote-form");

  useEffect(() => {
    if (quoteForm === "true") {
      setQuoteOpen(true);
    } else { setQuoteOpen(false); }
  }, [quoteForm]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error('Please fill in all required fields.');
      return;
    }

    await sendContactEmails(form);

    setSubmitting(true);
    await new Promise(r => setTimeout(r, 1500));
    setSubmitting(false);
    setSubmitted(true);
    toast.success("Message sent! We'll get back to you shortly.");
  };

  return (
    <div className="min-h-screen bg-white">
      <GetAQuoteModal open={quoteOpen} onClose={setQuoteOpen} />
      {/* Hero */}
      <div className="relative bg-[#0B163F] pt-32 pb-14 overflow-hidden">
       
       <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D34586]/20 text-[#D34586] mb-6 border border-[#D34586]/30">
              <MessageSquare className="w-4 h-4" />
              <span className="text-sm font-semibold">Get In Touch</span>
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6">
              Let's <span className="text-[#D34586]">Talk</span>
            </h1>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Have a question, a project in mind, or just want to say hello? We'd love to hear from you.
            </p>

            <Button onClick={()=> setQuoteOpen(true)} size={'lg'} className='bg-primary text-white mt-8' >
             <FileText size={16} /> Get a Quote
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Contact Cards */}
      <div className="max-w-6xl mx-auto px-6 mt-8 mb-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {contactInfo.map((item, i) => (
            <motion.a
              key={item.label}
              href={item.href}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center hover:shadow-xl transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-xl mx-auto mb-4 flex items-center justify-center"
                style={{ backgroundColor: `${item.color}15` }}>
                <item.icon className="w-6 h-6" style={{ color: item.color }} />
              </div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">{item.label}</p>
              <p className="text-sm font-semibold text-[#0B163F] group-hover:text-[#D34586] transition-colors">{item.value}</p>
            </motion.a>
          ))}
        </div>
      </div>

      {/* Form + Map */}
      <div className="max-w-6xl mx-auto px-6 pb-24">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Form */}
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div className="bg-white rounded-3xl p-10 shadow-xl border border-gray-100">
              <h2 className="text-2xl font-bold text-[#0B163F] mb-2">Send Us a Message</h2>
              <p className="text-gray-500 mb-8">Fill out the form and our team will respond within 24 hours.</p>

              {submitted ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-6">
                    <CheckCircle className="w-10 h-10 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-[#0B163F] mb-2">Message Received!</h3>
                  <p className="text-gray-500">We'll be in touch shortly. Thank you!</p>
                  <Button className="mt-6 bg-[#D34586] hover:bg-[#D34586]/90 text-white"
                    onClick={() => { setSubmitted(false); setForm({ name: '', email: '', subject: '', message: '' }); }}>
                    Send Another
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-[#0B163F] font-medium mb-1.5 block">Name *</Label>
                      <Input placeholder="Your name" value={form.name}
                        onChange={e => setForm({ ...form, name: e.target.value })}
                        className="border-gray-200 focus:border-[#D34586]" />
                    </div>
                    <div>
                      <Label className="text-[#0B163F] font-medium mb-1.5 block">Email *</Label>
                      <Input type="email" placeholder="your@email.com" value={form.email}
                        onChange={e => setForm({ ...form, email: e.target.value })}
                        className="border-gray-200 focus:border-[#D34586]" />
                    </div>
                  </div>
                  <div>
                    <Label className="text-[#0B163F] font-medium mb-1.5 block">Subject</Label>
                    <Input placeholder="How can we help?" value={form.subject}
                      onChange={e => setForm({ ...form, subject: e.target.value })}
                      className="border-gray-200 focus:border-[#D34586]" />
                  </div>
                  <div>
                    <Label className="text-[#0B163F] font-medium mb-1.5 block">Message *</Label>
                    <Textarea placeholder="Tell us more about your inquiry..." value={form.message}
                      onChange={e => setForm({ ...form, message: e.target.value })}
                      className="border-gray-200 focus:border-[#D34586] min-h-35" />
                  </div>
                  <Button type="submit" disabled={submitting}
                    className="w-full bg-[#D34586] hover:bg-[#D34586]/90 text-white py-6 text-base">
                    {submitting ? (
                      <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Sending...</>
                    ) : (
                      <><Send className="w-5 h-5 mr-2" /> Send Message</>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </motion.div>

          {/* Visual Side */}
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="flex flex-col gap-6">
            {/* Map Embed */}
            <div className="rounded-3xl overflow-hidden shadow-xl h-72 bg-gray-100 border border-gray-100">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.15830869428!2d-74.11976397304605!3d40.69766374874431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY!5e0!3m2!1sen!2sus!4v1711200000000!5m2!1sen!2sus"
                width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy"
                referrerPolicy="no-referrer-when-downgrade" title="Zeest Media Location"
              />
            </div>

            {/* CTA Banner */}
            <div className="rounded-3xl p-8 text-white"
              style={{ background: 'linear-gradient(135deg, #0B163F 0%, #1676BF 100%)' }}>
              <h3 className="text-xl font-bold mb-3">Prefer a quick call?</h3>
              <p className="text-white/70 mb-6 text-sm leading-relaxed">
                Book a free 30-minute consultation with our PR experts. We'll walk you through the best strategy for your goals.
              </p>
              <a href="https://calendly.com/zeestmedia-info/30min" target='_blank'>
                <Button className="bg-[#D34586] hover:bg-[#D34586]/90 text-white w-full">
                  <Calendar className="w-4 h-4 mr-2" /> Book a Consultation
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
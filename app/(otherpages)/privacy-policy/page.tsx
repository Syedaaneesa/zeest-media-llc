"use client";

import { ForwardRefExoticComponent, RefAttributes, useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, Database, UserCheck, Bell, Mail, ChevronDown, ChevronUp, LucideProps } from 'lucide-react';

type SectionsType = {
    icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
    title: string;
    color: string;
    content: string;
}
const sections:SectionsType[] = [
  {
    icon: Database,
    title: 'Information We Collect',
    color: '#1676BF',
    content: `We collect information you provide directly to us, such as when you create an account, submit a press release, contact us for support, or otherwise communicate with us. This includes:

• **Personal Identification Information:** Name, email address, phone number, company name, and billing details.
• **Press Release Content:** The content, media, and metadata you submit through our platform.
• **Usage Data:** Pages visited, features used, time spent on the platform, and interaction logs.
• **Device Information:** Browser type, IP address, operating system, and device identifiers.
• **Cookies & Tracking:** We use cookies and similar technologies to enhance your experience and analyze platform usage.`,
  },
  {
    icon: Eye,
    title: 'How We Use Your Information',
    color: '#D34586',
    content: `We use the information we collect to:

• **Provide our Services:** Process submissions, distribute press releases, and manage your account.
• **Improve the Platform:** Analyze usage patterns to enhance features and user experience.
• **Communication:** Send transactional emails, service updates, and promotional content (with your consent).
• **Customer Support:** Respond to inquiries and resolve technical issues.
• **Legal Compliance:** Fulfill our legal obligations and enforce our Terms of Service.
• **Analytics:** Generate aggregated, anonymized insights to improve platform performance.`,
  },
  {
    icon: UserCheck,
    title: 'Sharing Your Information',
    color: '#10B981',
    content: `We do not sell your personal data. We may share your information in the following limited circumstances:

• **Distribution Partners:** When distributing your press releases, your contact information and company details are shared with relevant media outlets as part of the service.
• **Service Providers:** Trusted third-party vendors who assist in operating our platform (payment processors, hosting, analytics) under strict confidentiality agreements.
• **Legal Requirements:** When required by law, subpoena, or to protect rights, property, or safety.
• **Business Transfers:** In the event of a merger, acquisition, or sale of all or a portion of our assets.`,
  },
  {
    icon: Lock,
    title: 'Data Security',
    color: '#F59E0B',
    content: `We take data security seriously and implement industry-standard safeguards:

• **Encryption:** All data is encrypted in transit using TLS/SSL and at rest using AES-256.
• **Access Controls:** Strict role-based access controls limit who can view or process your data.
• **Security Audits:** Regular security audits, vulnerability assessments, and penetration testing.
• **Incident Response:** A dedicated team and protocol for promptly addressing any security incidents.

While we employ best practices, no system is 100% secure. We encourage you to use strong, unique passwords and contact us immediately if you suspect any unauthorized access.`,
  },
  {
    icon: Bell,
    title: 'Your Rights & Choices',
    color: '#8B5CF6',
    content: `You have meaningful control over your personal data:

• **Access & Portability:** Request a copy of the personal data we hold about you.
• **Correction:** Update or correct inaccurate information at any time via your account settings.
• **Deletion:** Request deletion of your personal data, subject to certain legal retention requirements.
• **Opt-Out:** Unsubscribe from marketing emails at any time using the link in any email we send.
• **Cookies:** Manage cookie preferences through your browser settings or our cookie consent tool.
• **Data Processing Objection:** Object to certain processing activities where we rely on legitimate interest as a legal basis.

To exercise any of these rights, contact us at privacy@zeestmedia.com.`,
  },
  {
    icon: Shield,
    title: 'Cookies & Tracking',
    color: '#0B163F',
    content: `We use cookies and similar tracking technologies to:

• **Essential Cookies:** Enable core platform functionality (authentication, session management).
• **Analytics Cookies:** Understand how users interact with our platform (e.g., Google Analytics).
• **Marketing Cookies:** Deliver relevant advertisements and measure campaign effectiveness.
• **Preference Cookies:** Remember your settings and personalization choices.

You may control cookie settings through your browser. Disabling certain cookies may impact platform functionality. We provide a cookie consent banner on first visit for non-essential cookies.`,
  },
];

function Section({ section, index }: { section: SectionsType, index: number}) {
  const [open, setOpen] = useState(index < 2);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
            style={{ backgroundColor: `${section.color}15` }}>
            <section.icon className="w-5 h-5" style={{ color: section.color }} />
          </div>
          <h2 className="text-lg font-bold text-[#0B163F]">{section.title}</h2>
        </div>
        {open ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
      </button>
      {open && (
        <div className="px-6 pb-6 border-t border-gray-50">
          <div className="pt-4 text-gray-600 leading-relaxed whitespace-pre-line text-sm">
            {section.content.split('\n').map((line, i) => {
              if (line.startsWith('• **') && line.includes(':**')) {
                const match = line.match(/^• \*\*(.+?):\*\*(.*)$/);
                if (match) {
                  return (
                    <p key={i} className="mb-2 ml-2">
                      <span className="font-semibold text-[#0B163F]">• {match[1]}:</span>
                      <span>{match[2]}</span>
                    </p>
                  );
                }
              }
              if (line.startsWith('• ')) {
                return <p key={i} className="mb-2 ml-2">{line}</p>;
              }
              return line ? <p key={i} className="mb-3">{line}</p> : <br key={i} />;
            })}
          </div>
        </div>
      )}
    </motion.div>
  );
}

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="relative bg-[#0B163F] pt-32 pb-24 overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="w-20 h-20 rounded-2xl bg-[#D34586]/20 border border-[#D34586]/30 flex items-center justify-center mx-auto mb-6">
              <Shield className="w-10 h-10 text-[#D34586]" />
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-4">Privacy Policy</h1>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              We respect your privacy and are committed to protecting your personal data. This policy explains how we collect, use, and safeguard your information.
            </p>
            <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white/70 text-sm">
              Last updated: March 24, 2026
            </div>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 py-16">
        {/* Intro Banner */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="rounded-2xl p-6 mb-10 border border-[#1676BF]/20"
          style={{ background: 'linear-gradient(135deg, #EFF6FF 0%, #F0F9FF 100%)' }}>
          <p className="text-[#0B163F]/80 text-sm leading-relaxed">
            This Privacy Policy applies to <strong>Zeest Media</strong> and governs data collection and usage. By using our platform, you consent to the data practices described herein. If you have questions, contact us at <a href="mailto:privacy@zeestmedia.com" className="text-[#1676BF] underline">privacy@zeestmedia.com</a>.
          </p>
        </motion.div>

        {/* Sections */}
        <div className="space-y-4">
          {sections.map((section, index) => (
            <Section key={section.title} section={section} index={index} />
          ))}
        </div>

        {/* Footer Note */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          className="mt-10 bg-[#0B163F] rounded-2xl p-8 text-white text-center">
          <Mail className="w-8 h-8 text-[#D34586] mx-auto mb-3" />
          <h3 className="font-bold text-lg mb-2">Questions About This Policy?</h3>
          <p className="text-white/60 text-sm mb-4">Our privacy team is here to help with any concerns or requests.</p>
          <a href="mailto:privacy@zeestmedia.com"
            className="inline-flex items-center gap-2 bg-[#D34586] hover:bg-[#D34586]/90 text-white px-6 py-3 rounded-xl font-semibold text-sm transition-colors">
            <Mail className="w-4 h-4" /> Contact Privacy Team
          </a>
        </motion.div>
      </div>
    </div>
  );
}
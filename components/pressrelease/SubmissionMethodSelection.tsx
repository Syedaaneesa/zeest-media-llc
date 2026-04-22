"use client";

import { motion } from 'framer-motion';
import { PenLine, Sparkles, Upload, ArrowRight } from 'lucide-react';

const methods = [
  {
    id: 'custom',
    icon: PenLine,
    label: 'Write Custom Press Release',
    description: 'Craft your press release manually with full editorial control. All fields required.',
    badge: 'Full Control',
    badgeColor: '#1676BF',
    gradient: 'from-[#0B163F] to-[#1676BF]',
    accentColor: '#1676BF',
  },
  {
    id: 'ai',
    icon: Sparkles,
    label: 'AI Writer',
    description: 'Let our AI generate a professional press release from your topic and key points.',
    badge: 'Recommended',
    badgeColor: '#D34586',
    gradient: 'from-[#8B1A4A] to-[#D34586]',
    accentColor: '#D34586',
  },
  {
    id: 'upload',
    icon: Upload,
    label: 'Upload Document',
    description: 'Upload an existing Word (.docx) or PDF file and we\'ll handle the rest.',
    badge: 'Quick & Easy',
    badgeColor: '#10B981',
    gradient: 'from-[#065F46] to-[#10B981]',
    accentColor: '#10B981',
  },
];

export default function SubmissionMethodSelector({ onSelect }: { onSelect: (methodId: string) => void }) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-forground mb-2">How would you like to submit?</h2>
        <p className="text-forground/60">Choose the method that works best for you</p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 gap-4">
        {methods.map((method, index) => (
          <motion.button
            key={method.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.015 }}
            whileTap={{ scale: 0.99 }}
            onClick={() => onSelect(method.id)}
            className="group relative w-full text-left cursor-pointer rounded-2xl overflow-hidden border-2 border-forground/10 hover:border-forground/30 transition-all duration-300 bg-forground/5 backdrop-blur-sm"
          >
            {/* Hover gradient overlay */}
            <div className={`absolute inset-0 bg-linear-to-r ${method.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />

            <div className="relative flex items-center gap-5 p-5">
              {/* Icon */}
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110"
                style={{ backgroundColor: `${method.accentColor}20`, border: `2px solid ${method.accentColor}40` }}
              >
                <method.icon className="w-7 h-7" style={{ color: method.accentColor }} />
              </div>

              {/* Text */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 flex-wrap mb-1">
                  <span className="text-forground font-bold text-lg">{method.label}</span>
                  <span
                    className="text-xs font-semibold px-2.5 py-0.5 rounded-full"
                    style={{ backgroundColor: `${method.badgeColor}20`, color: method.badgeColor, border: `1px solid ${method.badgeColor}40` }}
                  >
                    {method.badge}
                  </span>
                </div>
                <p className="text-forground/55 text-sm leading-relaxed">{method.description}</p>
              </div>

              {/* Arrow */}
              <ArrowRight
                className="w-5 h-5 shrink-0 text-forground/30 group-hover:text-forground/80 group-hover:translate-x-1 transition-all duration-300"
              />
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
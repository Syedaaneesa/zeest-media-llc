import React from 'react';
import { motion } from 'framer-motion';
import { Globe2, Zap, BarChart3, ShieldCheck, Users, Headphones } from 'lucide-react';

const reasons = [
  {
    icon: Globe2,
    title: 'Global Distribution Network',
    description: 'Your story reaches 500+ premium news outlets, wire services, and digital platforms across 50+ countries, guaranteed visibility.',
    color: '#1676BF',
  },
  {
    icon: Zap,
    title: 'GEO-Optimized for AI Search',
    description: 'We craft releases designed to appear in AI-powered search engines like Perplexity, ChatGPT, and Google\'s AI Overviews.',
    color: '#D34586',
  },
  {
    icon: BarChart3,
    title: 'Real-Time Analytics Dashboard',
    description: 'Track pickups, impressions, and geographic reach through your live dashboard, full transparency on every campaign.',
    color: '#10B981',
  },
  {
    icon: ShieldCheck,
    title: 'Editorial Quality Guarantee',
    description: 'Every press release is reviewed by our editorial team before going live, ensuring professional quality and compliance.',
    color: '#F59E0B',
  },
];

export default function WhyChooseZeest() {
  return (
    <section className="py-14 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D34586]/10 text-[#D34586] text-sm font-semibold mb-4 border border-[#D34586]/20">
            Why Us
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-[#0B163F] mb-4">
            Why Choose <span className="text-[#D34586]">Zeest Media</span>?
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            We don't just distribute press releases, we engineer your brand's presence across every corner of the modern media landscape.
          </p>
        </motion.div>

        {/* Main Grid: Image + Features */}
        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* Left: Image Block */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            {/* Main image */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1556761175-4b46a572b786?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Zeest Media Team"
                className="w-full h-120 object-cover"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-linear-to-br from-[#0B163F]/60 to-transparent" />

              {/* Floating stat card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="absolute bottom-6 left-6 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-[#D34586]/10 flex items-center justify-center">
                  <Globe2 className="w-6 h-6 text-[#D34586]" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#0B163F]">500+</p>
                  <p className="text-gray-500 text-xs">Global Media Outlets</p>
                </div>
              </motion.div>

              {/* Floating badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="absolute top-6 right-6 bg-[#0B163F] text-white rounded-2xl px-4 py-3 text-center shadow-lg"
              >
                <p className="text-2xl font-bold text-[#D34586]">98%</p>
                <p className="text-xs text-white/70">Client Satisfaction</p>
              </motion.div>
            </div>

            {/* Decorative blobs */}
            <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-[#1676BF]/10 rounded-full blur-3xl -z-10" />
            <div className="absolute -top-8 -right-8 w-40 h-40 bg-[#D34586]/10 rounded-full blur-3xl -z-10" />
          </motion.div>

          {/* Right: Feature Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {reasons.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group bg-gray-50 hover:bg-white border border-gray-100 hover:border-gray-200 hover:shadow-lg rounded-2xl p-5 transition-all duration-300"
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-3 transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundColor: `${item.color}15` }}
                >
                  <item.icon className="w-5 h-5" style={{ color: item.color }} />
                </div>
                <h3 className="text-[#0B163F] font-bold text-md mb-1.5 leading-snug">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
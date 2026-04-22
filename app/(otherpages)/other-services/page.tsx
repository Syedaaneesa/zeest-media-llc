"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, ChevronDown, ChevronUp, DollarSign } from 'lucide-react';
import Technologies from '@/components/otherserices/Technologies';

const services = [
  {
    id: 'web-dev',
    title: 'Custom Website Development',
    tagline: 'Fully tailored websites built from the ground up',
    image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&q=80',
    description: 'We design and develop high-performance, visually stunning custom websites that drive results. From landing pages to full-scale web applications, every pixel is crafted for your brand.',
    features: ['Custom UI/UX Design', 'Mobile-First & Responsive', 'SEO Optimized', 'Performance Tuned', 'CMS Integration', 'Ongoing Support'],
    color: '#0B163F',
    accent: '#1676BF',
  },
  {
    id: 'wordpress',
    title: 'WordPress Development',
    tagline: 'Powerful, flexible WordPress sites & plugins',
    image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&q=80',
    description: 'From simple blogs to complex WooCommerce stores, we build WordPress sites that are fast, secure, and easy to manage. Custom themes, plugins, and full migrations included.',
    features: ['Custom Theme Development', 'WooCommerce Stores', 'Plugin Development', 'Speed Optimization', 'Security Hardening', 'WordPress Migration'],
    color: '#21759B',
    accent: '#21759B',
  },
  {
    id: 'react',
    title: 'React.js Development',
    tagline: 'Fast, interactive SPAs & component libraries',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80',
    description: 'Build blazing-fast single-page applications and dynamic user interfaces with React. We architect scalable component systems that power modern web products.',
    features: ['SPA & PWA Development', 'Component Libraries', 'State Management', 'API Integration', 'Testing & QA', 'Performance Audits'],
    color: '#61DAFB',
    accent: '#0B163F',
  },
  {
    id: 'nextjs',
    title: 'Next.js Development',
    tagline: 'SSR, SSG & full-stack web apps at scale',
    image: 'https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=800&q=80',
    description: 'Leverage the full power of Next.js for server-side rendering, static site generation, and API routes. Perfect for SEO-critical apps, e-commerce, and high-traffic platforms.',
    features: ['Server-Side Rendering', 'Static Site Generation', 'Edge Functions', 'App Router Architecture', 'Vercel Deployment', 'Headless CMS'],
    color: '#000000',
    accent: '#D34586',
  },
  {
    id: 'ecommerce',
    title: 'E-Commerce Solutions',
    tagline: 'Online stores built to convert and scale',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80',
    description: 'End-to-end e-commerce development across Shopify, WooCommerce, and custom stacks. We build stores that look great, load fast, and are optimized for conversions.',
    features: ['Shopify Development', 'WooCommerce', 'Custom Checkout', 'Payment Integration', 'Inventory Management', 'Analytics & Tracking'],
    color: '#96BF48',
    accent: '#96BF48',
  },
  {
    id: 'landing',
    title: 'Landing Page Design',
    tagline: 'High-converting pages that capture leads',
    image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80',
    description: 'Conversion-focused landing pages with compelling copy, strong CTAs, and A/B testing baked in. Designed to capture attention and turn visitors into customers.',
    features: ['CRO-Focused Design', 'A/B Testing Ready', 'Lead Capture Forms', 'Fast Load Times', 'Analytics Integration', 'Unlimited Revisions'],
    color: '#D34586',
    accent: '#D34586',
  },
];

const faqs = [
  { q: 'How long does a typical website project take?', a: 'Most projects range from 1-4 weeks depending on complexity. A landing page can be ready in under 3-4 days, while a full custom web app may take 1-3 weeks.' },
  { q: 'Do you offer ongoing maintenance after launch?', a: 'Yes! We offer flexible monthly maintenance plans covering updates, security patches, performance monitoring, and content changes.' },
  { q: 'Can you redesign my existing website?', a: 'Absolutely. We specialize in redesigns and migrations, whether it\'s a full visual overhaul or a platform switch (e.g., from Wix to WordPress or Next.js).' },
  { q: 'What is your development process?', a: 'We follow a structured process: Discovery → Design → Development → QA → Launch → Support. You\'ll have full visibility throughout with regular updates.' },
];

export default function OtherServices() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-white">

      {/* Hero */}
      <section className="relative bg-[#0B163F] pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-150 h-150 rounded-full bg-[#D34586] blur-3xl" />
          <div className="absolute bottom-0 left-0 w-100 h-100 rounded-full bg-[#1676BF] blur-3xl" />
        </div>
        <div className="relative max-w-5xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-block text-xs font-bold text-[#D34586] uppercase tracking-widest border border-[#D34586]/30 rounded-full px-4 py-1.5 mb-6">
              Web Development Services
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
              We Build Digital<br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-[#D34586] to-[#1676BF]">
                Experiences That Scale
              </span>
            </h1>
            <p className="text-lg text-white/60 max-w-2xl mx-auto mb-10">
              From WordPress blogs to full-stack React apps — we design, build, and launch web products that perform. Trusted by startups and enterprises worldwide.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="https://zabix.ai/quote"
              target='_blank'
                className="inline-flex items-center gap-2 bg-[#D34586] hover:bg-[#D34586]/90 text-white font-semibold px-8 py-4 rounded-xl transition-all">
                Start a Project <ArrowRight className="w-4 h-4" />
              </a>
            
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-[#F8F9FC]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0B163F] mb-4">Our Development Services</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Everything you need to build a powerful online presence — under one roof.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, i) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 group hover:shadow-xl transition-all duration-300 flex flex-col"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <span className="text-xs font-bold text-white/80 uppercase tracking-widest">{service.tagline}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-lg font-bold text-[#0B163F] mb-2">{service.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed mb-5">{service.description}</p>

                  {/* Features */}
                  <div className="grid grid-cols-2 gap-1.5 mt-auto">
                    {service.features.map(f => (
                      <div key={f} className="flex items-center gap-1.5 text-xs text-gray-600">
                        <CheckCircle className="w-3.5 h-3.5 text-[#D34586] shrink-0" />
                        {f}
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div className="px-6 pb-6">
                  <a
                    href="https://zabix.ai/quote"
                    target='_blank'
                    className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border-2 border-[#0B163F]/10 text-[#0B163F] text-sm font-semibold hover:bg-[#0B163F] hover:text-white hover:border-[#0B163F] transition-all"
                  >
                    Get a Quote <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <span className="text-xs font-bold text-[#D34586] uppercase tracking-widest mb-4 block">Why Zeest Media</span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#0B163F] mb-6 leading-tight">
                We Don't Just Build Websites.<br />We Build Growth Engines.
              </h2>
              <p className="text-gray-500 mb-8 leading-relaxed">
                Our team combines design excellence with engineering depth. Every project is treated as a long-term partnership, not a one-off transaction.
              </p>
              <div className="space-y-4">
                {[
                  { title: 'Strategy-First Approach', desc: 'We start with your business goals before writing a single line of code.' },
                  { title: 'Transparent Process', desc: 'Weekly updates, live previews, and full visibility at every stage.' },
                  { title: 'Post-Launch Support', desc: 'We stay with you after go-live — optimizing, iterating, and growing.' },
                  { title: 'Performance Obsessed', desc: 'Every site is optimized for Core Web Vitals, SEO, and conversion rates.' },
                ].map((item, i) => (
                  <motion.div key={item.title} initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                    className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-lg bg-[#D34586]/10 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle className="w-4 h-4 text-[#D34586]" />
                    </div>
                    <div>
                      <p className="font-semibold text-[#0B163F] text-sm">{item.title}</p>
                      <p className="text-gray-500 text-sm mt-0.5">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="grid grid-cols-2 gap-4">
              <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&q=80" alt="Team" className="rounded-2xl w-full h-52 object-cover" />
              <img src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&q=80" alt="Work" className="rounded-2xl w-full h-52 object-cover mt-8" />
              <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&q=80" alt="Design" className="rounded-2xl w-full h-52 object-cover" />
              <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&q=80" alt="Code" className="rounded-2xl w-full h-52 object-cover mt-8" />
            </motion.div>
          </div>
        </div>
      </section>

      <Technologies />

      {/* FAQ */}
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-4xl font-bold text-center mb-4 text-foreground">Frequently Asked Questions</h2>
            <p className="text-gray-500">Everything you need to know before starting your project.</p>
          </motion.div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                className="border border-gray-200 rounded-2xl overflow-hidden">
                    {/*  */}
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-[#0B163F] text-sm pr-4">{faq.q}</span>
                  {openFaq === i ? <ChevronUp className="w-5 h-5 text-[#D34586] shrink-0" /> : <ChevronDown className="w-5 h-5 text-gray-400 shrink-0" />}
                </button>
                {openFaq === i && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="px-6 pb-5 text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
                    {faq.a}
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 bg-linear-to-r from-[#0B163F] to-[#1676BF]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Build Something Great?</h2>
            <p className="text-white/60 mb-8 max-w-xl mx-auto">Tell us about your project and we'll get back to you within 24 hours with a free consultation and quote.</p>
            <a href="https://zabix.ai/quote"
              target='_blank'
              className="inline-flex items-center gap-2 bg-[#D34586] hover:bg-[#D34586]/90 text-white font-semibold px-10 py-4 rounded-xl transition-all text-lg">
              <DollarSign className="w-5 h-5" />
              Get a Free Quote
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
  
}
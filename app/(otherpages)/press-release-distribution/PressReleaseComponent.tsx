"use client"


import { motion } from 'framer-motion';
import { Check, Sparkles, HelpCircle } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import PricingCard from '@/components/press-release-distribution/PricingCard';
import WhyChooseZeest from '@/components/press-release-distribution/WhyChooseUs';

const pricingPlans = [
  {
    name: 'Basic',
    price: '199',
    description: 'Perfect for startups and small businesses',
    features: [
      '22M+ Potential Audience',
      '400+ Total Publication',
      'Unlimitted Links, Words and Images'
    ],
    url: '/dashboard/sent-press-release?type=new&package=199',
    CTA: 'Get Started',
    images: [
      '/pricing/logo-1-1.png',
      '/pricing/logo-2.png',
      '/pricing/logo-3.png',
      '/pricing/Group-72-1.png',
      '/pricing/19731324_G.png',
      '/pricing/24127333_G.png',
      '/pricing/Group-71-1.png',
      '/pricing/logo-4.png',
      '/pricing/evertise-ai-pr-bing-news-logo.png',
      '/pricing/google-news.png',
    ]
  },
  {
    name: 'Premium',
    price: '299',
    description: 'Most popular for growing companies',
    features: [
      '74M+ Potential Audience',
      '500+ Total Publication',
      'Unlimitted Links, Words and Images'
    ],
    url: '/dashboard/sent-press-release?type=new&package=299',
    CTA: 'Get Started',
    images: [
      '/pricing/ap-news.webp',
      '/pricing/digitaljournal.png',
      '/pricing/streetinsider.webp',
      '/pricing/benzinga.png',
      '/pricing/barchart.webp',
      '/pricing/evertise-ai-pr-bing-news-logo.png',
      '/pricing/google-news.png',
    ]
  },
  {
    name: 'Enterprise',
    price: '599',
    description: 'For large organizations and agencies',
    features: [
      '120M+ Potential Audience',
      '550+ Total Publication',
      'Unlimitted Links, Words and Images'
    ],
    url: '/dashboard/sent-press-release?type=new&package=599',
    CTA: 'Get Started',
    images: [
      '/pricing/enterprise/yahoo.png',
      '/pricing/enterprise/business-insider.png',
      '/pricing/market-watch.png',
      '/pricing/streetinsider.webp',
      '/pricing/ap-news.webp',
      '/pricing/digital-journal.png',
      '/pricing/benzinga.png',
      '/pricing/FP.png',
      '/pricing/barchart.webp',
      '/pricing/glob-mail.png',
      '/pricing/C-Chart.svg',
      '/pricing/thomsun-reuters.png',
      '/pricing/lexisnexis.png',
      '/pricing/TWS.png',
      '/pricing/evertise-ai-pr-bing-news-logo.png',
      '/pricing/google-news.png',
    ]
  },
];

const customPackages = [
  {
    name: 'Other than US',
    price: '500+',
    description: 'Comprehensive global coverage excluding the United States',
    features: [
      '150M+ International Audience Reach',
      '800+ Total Publications',
      'Unlimitted Links, Words and Images',
      'Coverage in European Markets',
      'Strong Presence in Asian Regions',
      'Focused UK Media Coverage',
      'Gulf Region Exposure (UAE, Saudi Arabia, Qatar)',
      'China Market Publications',
      'Japan High Authority Media Sites',
    ],
    url: '/contact-us?quote-form=true'
    ,
    CTA: 'Get A Quote',
    images: []
  }
];
const faqs = [
  {
    question: 'How long does distribution take?',
    answer: 'Distribution time depends on your package. Basic packages are distributed within 48 hours, Premium within 24 hours, and Enterprise can be same-day. All times are business hours.',
  },
  {
    question: 'What is GEO Optimization?',
    answer: 'GEO (Generative Engine Optimization) ensures your content is optimized to be cited and referenced by AI assistants like ChatGPT, Gemini, and Perplexity. This is the future of search discovery.',
  },
  {
    question: 'Can I see a sample report?',
    answer: 'Yes! Click "View Sample Report" under any pricing plan to download a sample analytics report showing the metrics and insights you\'ll receive.',
  },
  {
    question: 'Do you offer refunds?',
    answer: 'We offer a satisfaction guarantee. If your press release isn\'t published to our guaranteed outlets, we\'ll either redistribute or provide a full refund.',
  },
  {
    question: 'Can I target specific regions?',
    answer: 'Yes, our Premium and Enterprise packages include geographic targeting options. You can focus on specific countries, states, or regions for your distribution.',
  },
];

export default function Pricing() {
  return (
    <div className="min-h-screen bg-gray-50 pb-16">

      {/* Hero */}
      <div className="relative bg-[#0B163F] pt-32 pb-14 overflow-hidden">

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10 py-5">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D34586]/20 text-[#D34586] mb-6 border border-[#D34586]/30">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-semibold">Transparent Pricing</span>
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-[1.1]">
              Choose Your  <span className="text-[#D34586]"><br />Distribution Package</span>
            </h1>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              No hidden fees. Cancel anytime. Get started with a package that fits your needs.
            </p>

          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-16">

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-10 mb-14">
          {pricingPlans.map((plan, index) => (
            <PricingCard
              key={plan.name}
              plan={plan}
              index={index}
              featured={index === 2}
            />
          ))}

          {customPackages.map((plan, index) => (

            <PricingCard
              key={plan.name}
              plan={plan}
              index={index}
              featured={false}
            />
          ))}
        </div>

        <WhyChooseZeest />


        {/* All Features Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl p-8 lg:p-12 shadow-xl border border-gray-100 mb-24"
        >
          <h2 className="text-3xl font-bold text-[#0B163F] text-center mb-12">
            What's Included in Every Package
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              'Professional Content Review',
              'Media Monitoring',
              'Social Media Sharing',
              'SEO Optimization',
              'Mobile-Responsive Format',
              'Permanent Archive Link',
              'Brand Logo Inclusion',
              'Multimedia Support',
              'Analytics Dashboard Access',
            ].map((feature, i) => (
              <motion.div
                key={feature}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-3"
              >
                <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                  <Check className="w-4 h-4 text-green-600" />
                </div>
                <span className="text-gray-700">{feature}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>



        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
          id='faq'
        >
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D34586]/10 text-[#D34586] mb-6">
              <HelpCircle className="w-4 h-4" />
              <span className="text-sm font-semibold">FAQ</span>
            </div>
            <h2 className="text-3xl font-bold text-[#0B163F]">
              Frequently Asked Questions
            </h2>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-white rounded-2xl border border-gray-100 px-6 shadow-sm"
              >
                <AccordionTrigger className="text-left text-[#0B163F] font-semibold hover:no-underline py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </div>
  );
}

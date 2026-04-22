// "use client";

// import { motion } from 'framer-motion';
// import { Search, Sparkles, Check, Bot } from 'lucide-react';

// export default function GEOvsSEO() {
//   return (
//     <section className="py-24 bg-gradient-to-b from-white to-gray-50">
//       <div className="max-w-7xl mx-auto px-6">
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           className="text-center mb-16"
//         >
//           <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D34586]/10 text-[#D34586] mb-6">
//             <Sparkles className="w-4 h-4" />
//             <span className="text-sm font-semibold">The Future of Search</span>
//           </div>
//           <h2 className="text-4xl lg:text-5xl font-bold text-[#0B163F] mb-4">
//             GEO vs SEO: What's the Difference?
//           </h2>
//           <p className="text-xl text-gray-600 max-w-3xl mx-auto">
//             Generative Engine Optimization (GEO) is the next evolution. Get found in AI-powered search results.
//           </p>
//         </motion.div>

//         <div className="grid lg:grid-cols-2 gap-8 mb-16">
//           {/* Traditional SEO */}
//           <motion.div
//             initial={{ opacity: 0, x: -40 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             viewport={{ once: true }}
//             className="bg-white rounded-3xl p-8 border border-gray-200 shadow-lg"
//           >
//             <div className="flex items-center gap-4 mb-6">
//               <div className="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center">
//                 <Search className="w-7 h-7 text-gray-600" />
//               </div>
//               <div>
//                 <h3 className="text-2xl font-bold text-[#0B163F]">Traditional SEO</h3>
//                 <p className="text-gray-500">Search Engine Optimization</p>
//               </div>
//             </div>

//             <p className="text-gray-600 mb-6 leading-relaxed">
//               Focuses on ranking in Google, Bing, and other traditional search engines through keywords, backlinks, and technical optimization.
//             </p>

//             <ul className="space-y-3 mb-6">
//               {[
//                 'Keyword-focused content',
//                 'Backlink building',
//                 'Meta tags optimization',
//                 'Page speed & Core Web Vitals',
//                 'Traditional SERP rankings'
//               ].map((item) => (
//                 <li key={item} className="flex items-center gap-3">
//                   <Check className="w-5 h-5 text-gray-400" />
//                   <span className="text-gray-700">{item}</span>
//                 </li>
//               ))}
//             </ul>

//             <div className="pt-6 border-t border-gray-100">
//               <p className="text-sm text-gray-500">Best for: Traditional search visibility</p>
//             </div>
//           </motion.div>

//           {/* GEO */}
//           <motion.div
//             initial={{ opacity: 0, x: 40 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             viewport={{ once: true }}
//             className="bg-gradient-to-br from-[#0B163F] to-[#1676BF] rounded-3xl p-8 shadow-xl relative overflow-hidden"
//           >
//             {/* Decorative elements */}
//             <div className="absolute top-0 right-0 w-64 h-64 bg-[#D34586]/10 rounded-full blur-3xl" />
            
//             <div className="relative z-10">
//               <div className="flex items-center gap-4 mb-6">
//                 <div className="w-14 h-14 rounded-2xl bg-[#D34586]/20 flex items-center justify-center">
//                   <Bot className="w-7 h-7 text-[#D34586]" />
//                 </div>
//                 <div>
//                   <div className="flex items-center gap-2">
//                     <h3 className="text-2xl font-bold text-white">GEO</h3>
//                     <span className="px-2 py-1 text-xs font-bold bg-[#D34586] text-white rounded-full">NEW</span>
//                   </div>
//                   <p className="text-white/60">Generative Engine Optimization</p>
//                 </div>
//               </div>

//               <p className="text-white/80 mb-6 leading-relaxed">
//                 Optimizes your content to be cited and referenced by AI assistants like ChatGPT, Gemini, Claude, and Perplexity. The future of discovery.
//               </p>

//               <ul className="space-y-3 mb-6">
//                 {[
//                   'AI citation optimization',
//                   'Structured data for LLMs',
//                   'Authority signal building',
//                   'Conversational query targeting',
//                   'Multi-AI platform visibility'
//                 ].map((item) => (
//                   <li key={item} className="flex items-center gap-3">
//                     <div className="w-5 h-5 rounded-full bg-[#D34586] flex items-center justify-center">
//                       <Check className="w-3 h-3 text-white" />
//                     </div>
//                     <span className="text-white">{item}</span>
//                   </li>
//                 ))}
//               </ul>

//               <div className="pt-6 border-t border-white/10">
//                 <p className="text-sm text-white/60">Best for: Future-proof discoverability</p>
//               </div>
//             </div>
//           </motion.div>
//         </div>

//         {/* Why GEO Matters */}
//         <motion.div
//           initial={{ opacity: 0, y: 40 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           className="bg-gray-50 rounded-3xl p-8 lg:p-12 text-center"
//         >
//           <h3 className="text-2xl lg:text-3xl font-bold text-[#0B163F] mb-4">
//             Why GEO Matters Now
//           </h3>
//           <p className="text-gray-600 max-w-3xl mx-auto mb-8 text-lg leading-relaxed">
//             Over 100 million people use ChatGPT weekly. When they ask about your industry, 
//             will your brand be mentioned? GEO ensures you're part of the AI conversation.
//           </p>
//           <div className="flex flex-wrap justify-center gap-8">
//             <div className="text-center">
//               <div className="text-4xl font-bold text-[#D34586]">40%</div>
//               <div className="text-gray-500 text-sm">of users now prefer AI search</div>
//             </div>
//             <div className="text-center">
//               <div className="text-4xl font-bold text-[#1676BF]">100M+</div>
//               <div className="text-gray-500 text-sm">weekly ChatGPT users</div>
//             </div>
//             <div className="text-center">
//               <div className="text-4xl font-bold text-[#D34586]">3x</div>
//               <div className="text-gray-500 text-sm">higher engagement from AI citations</div>
//             </div>
//           </div>
//         </motion.div>
//       </div>
//     </section>
//   );
// }


"use client"

import { motion } from 'framer-motion';
import { Search, Sparkles, Check, Bot } from 'lucide-react';

export default function GEOvsSEO() {
  return (
    <section className="py-24 bg-linear-to-b from-white to-gray-50" id="geo-vs-seo-guide">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D34586]/10 text-[#D34586] mb-6">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-semibold">The Future of Search</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-[#0B163F] mb-4">
            GEO vs SEO: What's the Difference?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Generative Engine Optimization (GEO) is the next evolution. Get found in AI-powered search results.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {/* Traditional SEO */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl overflow-hidden border border-gray-200 shadow-lg"
          >
            <div className="relative h-56 overflow-hidden">
              <img src="/services/seo.webp" alt="SEO" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />
            </div>
            <div className="p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center">
                  <Search className="w-7 h-7 text-gray-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[#0B163F]">Traditional SEO</h3>
                  <p className="text-gray-500">Search Engine Optimization</p>
                </div>
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Focuses on ranking in Google, Bing, and other traditional search engines through keywords, backlinks, and technical optimization.
              </p>
              <ul className="space-y-3 mb-6">
                {['Keyword-focused content', 'Backlink building', 'Meta tags optimization', 'Page speed & Core Web Vitals', 'Traditional SERP rankings'].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="pt-6 border-t border-gray-100">
                <p className="text-sm text-gray-500">Best for: Traditional search visibility</p>
              </div>
            </div>
          </motion.div>

          {/* GEO */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-linear-to-br from-[#0B163F] to-[#1676BF] rounded-3xl shadow-xl relative overflow-hidden"
          >
            <div className="relative h-56 overflow-hidden">
              <img src="https://miro.medium.com/v2/resize:fit:1100/format:webp/0*kgWEqYnNIhbUVz4O.png" alt="AI GEO" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-linear-to-t from-[#0B163F]/80 to-transparent" />
              <div className="absolute top-4 left-4">
                <span className="px-2 py-1 text-xs font-bold bg-[#D34586] text-white rounded-full">NEW</span>
              </div>
            </div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#D34586]/10 rounded-full blur-3xl" />
            <div className="relative z-10 p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-[#D34586]/20 flex items-center justify-center">
                  <Bot className="w-7 h-7 text-[#D34586]" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">GEO</h3>
                  <p className="text-white/60">Generative Engine Optimization</p>
                </div>
              </div>
              <p className="text-white/80 mb-6 leading-relaxed">
                Optimizes your content to be cited and referenced by AI assistants like ChatGPT, Gemini, Claude, and Perplexity. The future of discovery.
              </p>
              <ul className="space-y-3 mb-6">
                {['AI citation optimization', 'Structured data for LLMs', 'Authority signal building', 'Conversational query targeting', 'Multi-AI platform visibility'].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#D34586] flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-white">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="pt-6 border-t border-white/10">
                <p className="text-sm text-white/60">Best for: Future-proof discoverability</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Why GEO Matters */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gray-50 rounded-3xl p-8 lg:p-12 text-center"
        >
          <h3 className="text-2xl lg:text-3xl font-bold text-[#0B163F] mb-4">Why GEO Matters Now</h3>
          <p className="text-gray-600 max-w-3xl mx-auto mb-8 text-lg leading-relaxed">
            Over 100 million people use ChatGPT weekly. When they ask about your industry, will your brand be mentioned? GEO ensures you're part of the AI conversation.
          </p>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-[#D34586]">40%</div>
              <div className="text-gray-500 text-sm">of users now prefer AI search</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#1676BF]">100M+</div>
              <div className="text-gray-500 text-sm">weekly ChatGPT users</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#D34586]">3x</div>
              <div className="text-gray-500 text-sm">higher engagement from AI citations</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
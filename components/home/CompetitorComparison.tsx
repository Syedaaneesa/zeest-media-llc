// "use client";

// import { motion } from 'framer-motion';
// import { Check, X, Sparkles, Trophy } from 'lucide-react';

// const features = [
//   { name: 'Media Outlets', zeest: '500+', icrowdnewswire: '350+', prnewswire: '500+' },
//   { name: 'AI Content Optimization', zeest: true, icrowdnewswire: false, prnewswire: false },
//   { name: 'GEO Optimization', zeest: true, icrowdnewswire: false, prnewswire: false, highlight: true },
//   { name: 'Real-Time Analytics', zeest: true, icrowdnewswire: true, prnewswire: true },
//   { name: 'Starting Price', zeest: '$299', icrowdnewswire: '$499', prnewswire: '$899' },
//   { name: 'Guaranteed Pickups', zeest: '150+', icrowdnewswire: '50+', prnewswire: '100+' },
//   { name: '24/7 Support', zeest: true, icrowdnewswire: false, prnewswire: true },
//   { name: 'Custom Distribution', zeest: true, icrowdnewswire: true, prnewswire: true },
// ];

// export default function CompetitorComparison() {
//   return (
//     <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
//       <div className="max-w-6xl mx-auto px-6">
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           className="text-center mb-16"
//         >
//           <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D34586]/10 text-[#D34586] mb-6">
//             <Trophy className="w-4 h-4" />
//             <span className="text-sm font-semibold">Industry Comparison</span>
//           </div>
//           <h2 className="text-4xl lg:text-5xl font-bold text-[#0B163F] mb-4">
//             Why Choose Zeest Media?
//           </h2>
//           <p className="text-xl text-gray-600 max-w-2xl mx-auto">
//             See how we stack up against the competition
//           </p>
//         </motion.div>

//         <motion.div
//           initial={{ opacity: 0, y: 40 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ delay: 0.2 }}
//           className="bg-white rounded-3xl shadow-2xl shadow-gray-200/50 overflow-hidden border border-gray-100"
//         >
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead>
//                 <tr className="border-b border-gray-100">
//                   <th className="text-left p-6 text-gray-500 font-medium">Feature</th>
//                   <th className="p-6 text-center">
//                     <div className="inline-flex flex-col items-center">
//                       <div className="px-4 py-2 bg-gradient-to-r from-[#D34586] to-[#1676BF] rounded-xl mb-2">
//                         <span className="text-white font-bold">Zeest Media</span>
//                       </div>
//                       <span className="text-xs text-gray-400">Recommended</span>
//                     </div>
//                   </th>
//                   <th className="p-6 text-center text-gray-700 font-semibold">iCrowdNewswire</th>
//                   <th className="p-6 text-center text-gray-700 font-semibold">PR Newswire</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {features.map((feature, index) => (
//                   <motion.tr
//                     key={feature.name}
//                     initial={{ opacity: 0, x: -20 }}
//                     whileInView={{ opacity: 1, x: 0 }}
//                     viewport={{ once: true }}
//                     transition={{ delay: index * 0.05 }}
//                     className={`border-b border-gray-50 hover:bg-gray-50/50 transition-colors ${
//                       feature.highlight ? 'bg-[#D34586]/5' : ''
//                     }`}
//                   >
//                     <td className="p-6 font-medium text-gray-800">
//                       <div className="flex items-center gap-2">
//                         {feature.name}
//                         {feature.highlight && (
//                           <span className="px-2 py-1 text-xs font-bold bg-[#D34586] text-white rounded-full">
//                             Exclusive
//                           </span>
//                         )}
//                       </div>
//                     </td>
//                     <td className="p-6 text-center">
//                       {typeof feature.zeest === 'boolean' ? (
//                         feature.zeest ? (
//                           <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-green-100">
//                             <Check className="w-5 h-5 text-green-600" />
//                           </div>
//                         ) : (
//                           <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-red-100">
//                             <X className="w-5 h-5 text-red-500" />
//                           </div>
//                         )
//                       ) : (
//                         <span className="font-bold text-[#0B163F]">{feature.zeest}</span>
//                       )}
//                     </td>
//                     <td className="p-6 text-center">
//                       {typeof feature.icrowdnewswire === 'boolean' ? (
//                         feature.icrowdnewswire ? (
//                           <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-green-100">
//                             <Check className="w-5 h-5 text-green-600" />
//                           </div>
//                         ) : (
//                           <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-red-100">
//                             <X className="w-5 h-5 text-red-500" />
//                           </div>
//                         )
//                       ) : (
//                         <span className="text-gray-600">{feature.icrowdnewswire}</span>
//                       )}
//                     </td>
//                     <td className="p-6 text-center">
//                       {typeof feature.prnewswire === 'boolean' ? (
//                         feature.prnewswire ? (
//                           <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-green-100">
//                             <Check className="w-5 h-5 text-green-600" />
//                           </div>
//                         ) : (
//                           <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-red-100">
//                             <X className="w-5 h-5 text-red-500" />
//                           </div>
//                         )
//                       ) : (
//                         <span className="text-gray-600">{feature.prnewswire}</span>
//                       )}
//                     </td>
//                   </motion.tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </motion.div>

//         {/* GEO Highlight */}
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ delay: 0.4 }}
//           className="mt-12 bg-gradient-to-r from-[#0B163F] to-[#1676BF] rounded-2xl p-8 text-center"
//         >
//           <div className="flex items-center justify-center gap-3 mb-4">
//             <Sparkles className="w-6 h-6 text-[#D34586]" />
//             <h3 className="text-2xl font-bold text-white">Only Zeest Media offers GEO Optimization</h3>
//             <Sparkles className="w-6 h-6 text-[#D34586]" />
//           </div>
//           <p className="text-white/80 max-w-2xl mx-auto">
//             Generative Engine Optimization ensures your content ranks in ChatGPT, Gemini, and other AI search engines. 
//             Get discovered in the future of search, not just traditional SEO.
//           </p>
//         </motion.div>
//       </div>
//     </section>
//   );
// }

"use client"

import { motion } from 'framer-motion';
import { Check, X, Sparkles, Trophy } from 'lucide-react';

const features = [
  { name: 'Media Outlets', zeest: '500+', icrowdnewswire: '350+', prnewswire: '500+' },
  { name: 'AI Content Optimization', zeest: true, icrowdnewswire: false, prnewswire: false },
  { name: 'GEO Optimization', zeest: true, icrowdnewswire: false, prnewswire: false, highlight: true },
  { name: 'Real-Time Analytics', zeest: true, icrowdnewswire: true, prnewswire: true },
  { name: 'Starting Price', zeest: '$299', icrowdnewswire: '$499', prnewswire: '$899' },
  { name: 'Guaranteed Pickups', zeest: '150+', icrowdnewswire: '50+', prnewswire: '100+' },
  { name: '24/7 Support', zeest: true, icrowdnewswire: false, prnewswire: true },
  { name: 'Custom Distribution', zeest: true, icrowdnewswire: true, prnewswire: true },
];

export default function CompetitorComparison() {
  return (
    <section className="py-24 bg-linear-to-b from-gray-50 to-white">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D34586]/10 text-[#D34586] mb-6">
            <Trophy className="w-4 h-4" />
            <span className="text-sm font-semibold">Industry Comparison</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-[#0B163F] mb-4">
            Why Choose Zeest Media?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            See how we stack up against the competition
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-3xl shadow-2xl shadow-gray-200/50 overflow-hidden border border-gray-100"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left p-6 text-gray-500 font-medium">Feature</th>
                  <th className="p-6 text-center">
                    <div className="inline-flex flex-col items-center">
                      <div className="px-4 py-2 bg-linear-to-r from-[#D34586] to-[#1676BF] rounded-xl mb-2">
                        <span className="text-white font-bold">Zeest Media</span>
                      </div>
                      <span className="text-xs text-gray-400">Recommended</span>
                    </div>
                  </th>
                  <th className="p-6 text-center text-gray-700 font-semibold">Other Newswire</th>
                  <th className="blur-xs p-6 text-center text-gray-700 font-semibold">ABC Newswire</th>
                </tr>
              </thead>
              <tbody>
                {features.map((feature, index) => (
                  <motion.tr
                    key={feature.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className={`border-b border-gray-50 hover:bg-gray-50/50 transition-colors ${
                      feature.highlight ? 'bg-[#D34586]/5' : ''
                    }`}
                  >
                    <td className="p-6 font-medium text-gray-800">
                      <div className="flex items-center gap-2">
                        {feature.name}
                        {feature.highlight && (
                          <span className="px-2 py-1 text-xs font-bold bg-[#D34586] text-white rounded-full">
                            Exclusive
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="p-6 text-center">
                      {typeof feature.zeest === 'boolean' ? (
                        feature.zeest ? (
                          <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-green-100">
                            <Check className="w-5 h-5 text-green-600" />
                          </div>
                        ) : (
                          <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-red-100">
                            <X className="w-5 h-5 text-red-500" />
                          </div>
                        )
                      ) : (
                        <span className="font-bold text-[#0B163F]">{feature.zeest}</span>
                      )}
                    </td>
                    <td className="p-6 text-center">
                      {typeof feature.icrowdnewswire === 'boolean' ? (
                        feature.icrowdnewswire ? (
                          <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-green-100">
                            <Check className="w-5 h-5 text-green-600" />
                          </div>
                        ) : (
                          <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-red-100">
                            <X className="w-5 h-5 text-red-500" />
                          </div>
                        )
                      ) : (
                        <span className="text-gray-600">{feature.icrowdnewswire}</span>
                      )}
                    </td>
                    <td className="p-6 text-center">
                      {typeof feature.prnewswire === 'boolean' ? (
                        feature.prnewswire ? (
                          <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-green-100">
                            <Check className="w-5 h-5 text-green-600" />
                          </div>
                        ) : (
                          <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-red-100">
                            <X className="w-5 h-5 text-red-500" />
                          </div>
                        )
                      ) : (
                        <span className="text-gray-600">{feature.prnewswire}</span>
                      )}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* GEO Highlight */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 bg-linear-to-r from-[#0B163F] to-[#1676BF] rounded-2xl p-8 text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="w-6 h-6 text-[#D34586]" />
            <h3 className="text-2xl font-bold text-white">Only Zeest Media offers GEO Optimization</h3>
            <Sparkles className="w-6 h-6 text-[#D34586]" />
          </div>
          <p className="text-white/80 max-w-2xl mx-auto">
            Generative Engine Optimization ensures your content ranks in ChatGPT, Gemini, and other AI search engines. 
            Get discovered in the future of search, not just traditional SEO.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
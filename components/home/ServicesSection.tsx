// "use client"

// import { motion } from 'framer-motion';
// import { Newspaper, Sparkles, ArrowRight, Zap, Target, BarChart3 } from 'lucide-react';
// import { Button } from "@/components/ui/button";
// 

// const services = [
//   {
//     icon: Newspaper,
//     title: 'Press Release Distribution',
//     description: 'Reach 500+ premium media outlets including Yahoo Finance, Bloomberg, AP News, and more. Global and national coverage.',
//     features: ['Global/National Feeds', 'Guaranteed Pickups', 'Real-time Tracking'],
//     color: '#D34586',
//     link: 'Dashboard'
//   },
//   {
//     icon: Sparkles,
//     title: 'AI SEO Optimization',
//     description: 'Optimize your content for both traditional search engines and next-generation AI platforms like ChatGPT and Gemini.',
//     features: ['GEO Optimization', 'AI Content Writing', 'Keyword Research'],
//     color: '#1676BF',
//     link: 'aiprwriter'
//   },
//   {
//     icon: Target,
//     title: 'Content Marketing',
//     description: 'High-quality backlinks from high-DA websites. Guest posting on industry-relevant publications.',
//     features: ['Guest Posting', 'High DA Backlinks', 'Industry Targeting'],
//     color: '#D34586',
//     link: 'Pricing'
//   },
//   {
//     icon: BarChart3,
//     title: 'Analytics & Reporting',
//     description: 'Comprehensive real-time analytics with interactive dashboards showing reach, pickups, and geographic data.',
//     features: ['Live Reports', 'Geographic Heatmaps', 'PDF Downloads'],
//     color: '#1676BF',
//     link: 'Reports'
//   },
// ];

// export default function ServicesSection() {
//   return (
//     <section className="py-24 bg-white" id="services">
//       <div className="max-w-7xl mx-auto px-6">
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           className="text-center mb-16"
//         >
//           <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1676BF]/10 text-[#1676BF] mb-6">
//             <Zap className="w-4 h-4" />
//             <span className="text-sm font-semibold">Our Services</span>
//           </div>
//           <h2 className="text-4xl lg:text-5xl font-bold text-[#0B163F] mb-4">
//             Full-Stack PR & Marketing
//           </h2>
//           <p className="text-xl text-gray-600 max-w-2xl mx-auto">
//             Everything you need to amplify your brand's presence
//           </p>
//         </motion.div>

//         <div className="grid md:grid-cols-2 gap-8">
//           {services.map((service, index) => (
//             <motion.div
//               key={service.title}
//               initial={{ opacity: 0, y: 40 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ delay: index * 0.1 }}
//               className="group"
//             >
//               <div className="bg-gray-50 rounded-3xl p-8 h-full border border-gray-100 hover:border-gray-200 hover:shadow-xl hover:shadow-gray-100 transition-all duration-500">
//                 <div 
//                   className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110"
//                   style={{ backgroundColor: `${service.color}15` }}
//                 >
//                   <service.icon className="w-7 h-7" style={{ color: service.color }} />
//                 </div>
                
//                 <h3 className="text-2xl font-bold text-[#0B163F] mb-3">{service.title}</h3>
//                 <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                
//                 <div className="flex flex-wrap gap-2 mb-6">
//                   {service.features.map((feature) => (
//                     <span 
//                       key={feature}
//                       className="px-3 py-1 text-sm font-medium rounded-full bg-white border border-gray-200 text-gray-700"
//                     >
//                       {feature}
//                     </span>
//                   ))}
//                 </div>

//                 <a href={service.link}>
//                   <Button 
//                     variant="ghost" 
//                     className="group/btn text-[#0B163F] hover:text-[#D34586] p-0"
//                   >
//                     Learn More
//                     <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
//                   </Button>
//                 </a>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

// Nasir

"use client"

import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Zap, Edit3, Layout, Newspaper } from 'lucide-react';
import { Button } from "@/components/ui/button";


const services = [
  {
    icon: Newspaper,
    image: 'https://images.unsplash.com/photo-1586339949216-35c2747cc36d?w=600&q=80',
    title: 'Press Release Distribution',
    description: 'Reach 500+ premium media outlets including Yahoo Finance, Bloomberg, AP News, and more. Global and national coverage.',
    features: ['Global/National Feeds', 'Guaranteed Pickups', 'Real-time Tracking'],
    color: '#D34586',
    link: 'press-release-distribution'
  },
  {
    icon: Edit3,
    image: 'https://proechosolutions.com/wp-content/uploads/2018/10/GuestPostingHowWhyYouShouldBeDoingIt-1.png',
    title: 'Guest Posting',
     description: 'Share your content on high-authority blogs to increase online visibility, drive targeted traffic, and strengthen your brand presence.',
     features: ['High-Authority Blogs', 'Targeted Audience', 'SEO Benefits'],
    color: '#6C63FF',
    link: 'guestposting'
  },
  {
    icon: Sparkles,
    image: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&q=80',
    title: 'AI SEO Optimization',
    description: 'Optimize your content for both traditional search engines and next-generation AI platforms like ChatGPT and Gemini.',
    features: ['GEO Optimization', 'AI Content Writing', 'Keyword Research'],
    color: '#1676BF',
    link: 'aiprwriter'
  },
  {
    icon: Layout,
    image: 'https://www.simplilearn.com/ice9/free_resources_article_thumb/is_web_development_good_career.jpg',
     title: 'Website Development',
    description: 'Build modern, responsive, and high-performing websites tailored to your business needs, ensuring seamless user experience and scalability.',
    features: ['Responsive Design', 'SEO Friendly', 'Custom Development'],
    color: '#D34586',
    link: 'other-services'
  },
];

export default function ServicesSection() {
  return (
    <section className="py-24 bg-white" id="services">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1676BF]/10 text-[#1676BF] mb-6">
            <Zap className="w-4 h-4" />
            <span className="text-sm font-semibold">Our Services</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-[#0B163F] mb-4">
            Full-Stack PR & Marketing
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need to amplify your brand's presence
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-white rounded-3xl overflow-hidden border border-gray-100 hover:border-gray-200 hover:shadow-xl hover:shadow-gray-100 transition-all duration-500 flex flex-col h-full">
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${service.color}cc` }}>
                      <service.icon className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </div>

                <div className="p-8 flex flex-col flex-1">
                  <h3 className="text-2xl font-bold text-[#0B163F] mb-3">{service.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>

                  <div className="flex flex-wrap gap-2 mb-6 mt-auto">
                    {service.features.map((feature) => (
                      <span
                        key={feature}
                        className="px-3 py-1 text-sm font-medium rounded-full bg-gray-50 border border-gray-200 text-gray-700"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  <a href={service.link}>
                    <Button
                      variant="ghost"
                      className="group/btn text-[#0B163F] hover:text-[#D34586] p-0"
                    >
                      Learn More
                      <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}


// "use client"

// import { motion } from 'framer-motion';
// import { Sparkles, ArrowRight, Zap, Target, BarChart3, Newspaper } from 'lucide-react';
// import { Button } from "@/components/ui/button";
// 

// const services = [
//   {
//     icon: Newspaper,
//     image: 'https://images.unsplash.com/photo-1586339949216-35c2747cc36d?w=600&q=80',
//     title: 'Press Release Distribution',
//     description: 'Reach 500+ premium media outlets including Yahoo Finance, Bloomberg, AP News, and more. Global and national coverage.',
//     features: ['Global/National Feeds', 'Guaranteed Pickups', 'Real-time Tracking'],
//     color: '#D34586',
//     link: 'Dashboard'
//   },
//   {
//     icon: Sparkles,
//     image: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&q=80',
//     title: 'AI SEO Optimization',
//     description: 'Optimize your content for both traditional search engines and next-generation AI platforms like ChatGPT and Gemini.',
//     features: ['GEO Optimization', 'AI Content Writing', 'Keyword Research'],
//     color: '#1676BF',
//     link: 'aiprwriter'
//   },
//   {
//     icon: Target,
//     image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80',
//     title: 'Content Marketing',
//     description: 'High-quality backlinks from high-DA websites. Guest posting on industry-relevant publications.',
//     features: ['Guest Posting', 'High DA Backlinks', 'Industry Targeting'],
//     color: '#D34586',
//     link: 'Pricing'
//   },
//   {
//     icon: BarChart3,
//     image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80',
//     title: 'Analytics & Reporting',
//     description: 'Comprehensive real-time analytics with interactive dashboards showing reach, pickups, and geographic data.',
//     features: ['Live Reports', 'Geographic Heatmaps', 'PDF Downloads'],
//     color: '#1676BF',
//     link: 'Reports'
//   },
// ];

// export default function ServicesSection() {
//   return (
//     <section className="py-24 bg-white" id="services">
//       <div className="max-w-7xl mx-auto px-6">
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           className="text-center mb-16"
//         >
//           <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1676BF]/10 text-[#1676BF] mb-6">
//             <Zap className="w-4 h-4" />
//             <span className="text-sm font-semibold">Our Services</span>
//           </div>
//           <h2 className="text-4xl lg:text-5xl font-bold text-[#0B163F] mb-4">
//             Full-Stack PR & Marketing
//           </h2>
//           <p className="text-xl text-gray-600 max-w-2xl mx-auto">
//             Everything you need to amplify your brand's presence
//           </p>
//         </motion.div>

//         <div className="grid md:grid-cols-2 gap-8">
//           {services.map((service, index) => (
//             <motion.div
//               key={service.title}
//               initial={{ opacity: 0, y: 40 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ delay: index * 0.1 }}
//               className="group"
//             >
//               <div className="bg-white rounded-3xl overflow-hidden border border-gray-100 hover:border-gray-200 hover:shadow-xl hover:shadow-gray-100 transition-all duration-500 flex flex-col h-full">
//                 {/* Image */}
//                 <div className="relative h-64 overflow-hidden">
//                   <img
//                     src={service.image}
//                     alt={service.title}
//                     className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
//                   />
//                   <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />
//                   <div className="absolute bottom-4 left-4">
//                     <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${service.color}cc` }}>
//                       <service.icon className="w-5 h-5 text-white" />
//                     </div>
//                   </div>
//                 </div>

//                 <div className="p-8 flex flex-col flex-1">
//                   <h3 className="text-2xl font-bold text-[#0B163F] mb-3">{service.title}</h3>
//                   <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                  
//                   <div className="flex flex-wrap gap-2 mb-6 mt-auto">
//                     {service.features.map((feature) => (
//                       <span 
//                         key={feature}
//                         className="px-3 py-1 text-sm font-medium rounded-full bg-gray-50 border border-gray-200 text-gray-700"
//                       >
//                         {feature}
//                       </span>
//                     ))}
//                   </div>

//                   <a href={service.link}>
//                     <Button 
//                       variant="ghost" 
//                       className="group/btn text-[#0B163F] hover:text-[#D34586] p-0"
//                     >
//                       Learn More
//                       <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
//                     </Button>
//                   </a>
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }
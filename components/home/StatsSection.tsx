// "use client"

// import { useEffect, useState, useRef } from 'react';
// import { motion, useInView } from 'framer-motion';
// import { Users, Globe, Newspaper, TrendingUp } from 'lucide-react';

// const stats = [
//   { label: 'Media Reach', value: 150, suffix: 'M+', icon: Users, color: '#D34586' },
//   { label: 'Media Outlets', value: 645, suffix: '+', icon: Globe, color: '#1676BF' },
//   { label: 'Press Releases', value: 12500, suffix: '+', icon: Newspaper, color: '#D34586' },
//   { label: 'Client Satisfaction', value: 98, suffix: '%', icon: TrendingUp, color: '#1676BF' },
// ];

// function AnimatedCounter({ end, suffix, duration = 2 }) {
//   const [count, setCount] = useState(0);
//   const ref = useRef(null);
//   const isInView = useInView(ref, { once: true });

//   useEffect(() => {
//     if (!isInView) return;
    
//     let startTime;
//     const animate = (timestamp) => {
//       if (!startTime) startTime = timestamp;
//       const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
//       setCount(Math.floor(progress * end));
//       if (progress < 1) {
//         requestAnimationFrame(animate);
//       }
//     };
//     requestAnimationFrame(animate);
//   }, [end, duration, isInView]);

//   return (
//     <span ref={ref}>
//       {count.toLocaleString()}{suffix}
//     </span>
//   );
// }

// export default function StatsSection() {
//   return (
//     <section className="py-24 bg-[#0B163F] relative overflow-hidden">
//       {/* Background effects */}
//       <div className="absolute inset-0">
//         <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#D34586]/10 rounded-full blur-3xl" />
//         <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#1676BF]/10 rounded-full blur-3xl" />
//       </div>

//       <div className="relative z-10 max-w-7xl mx-auto px-6">
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           className="text-center mb-16"
//         >
//           <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
//             Trusted by Industry Leaders
//           </h2>
//           <p className="text-xl text-white/60 max-w-2xl mx-auto">
//             Our numbers speak for themselves
//           </p>
//         </motion.div>

//         <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
//           {stats.map((stat, index) => (
//             <motion.div
//               key={stat.label}
//               initial={{ opacity: 0, y: 40 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ delay: index * 0.1 }}
//               className="group"
//             >
//               <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 text-center hover:bg-white/10 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-[#D34586]/10">
//                 <div 
//                   className="w-16 h-16 rounded-2xl mx-auto mb-6 flex items-center justify-center transition-transform group-hover:scale-110"
//                   style={{ backgroundColor: `${stat.color}20` }}
//                 >
//                   <stat.icon className="w-8 h-8" style={{ color: stat.color }} />
//                 </div>
//                 <div className="text-5xl font-bold text-white mb-2">
//                   <AnimatedCounter end={stat.value} suffix={stat.suffix} />
//                 </div>
//                 <p className="text-white/60 font-medium">{stat.label}</p>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

"use client";

import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Users, Globe, Newspaper, TrendingUp } from 'lucide-react';

const stats = [
  { label: 'Media Reach', value: 125, suffix: 'M+', icon: Users, color: '#D34586' },
  { label: 'Media Outlets', value: 500, suffix: '+', icon: Globe, color: '#1676BF' },
  { label: 'Press Releases', value: 9000, suffix: '+', icon: Newspaper, color: '#D34586' },
  { label: 'Client Satisfaction', value: 98, suffix: '%', icon: TrendingUp, color: '#1676BF' },
];

function AnimatedCounter({ end, suffix, duration = 2 }:{end:number; suffix: string; duration?: number}) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    
    let startTime: number;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [end, duration, isInView]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}{suffix}
    </span>
  );
}

export default function StatsSection() {
  return (
    <section className="py-24 bg-[#0B163F] relative overflow-hidden" id="media-outlets">
      {/* Background effects */}
      <div className="absolute inset-0">
        <img src="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1600&q=80" alt="" className="w-full h-full object-cover opacity-5" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#D34586]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#1676BF]/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Trusted by Industry Leaders
          </h2>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            Our numbers speak for themselves
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 text-center hover:bg-white/10 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-[#D34586]/10">
                <div 
                  className="w-16 h-16 rounded-2xl mx-auto mb-6 flex items-center justify-center transition-transform group-hover:scale-110"
                  style={{ backgroundColor: `${stat.color}20` }}
                >
                  <stat.icon className="w-8 h-8" style={{ color: stat.color }} />
                </div>
                <div className="text-5xl font-bold text-white mb-2">
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-white/60 font-medium">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
"use client";

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useEffect, useState } from 'react';

type Particles = { x: number; y: number; left: string; top: string; duration: number; delay: number; }
export default function CTASection() {
  const [dots, setDots] = useState<Particles[]>([]);

  useEffect(() => {
    const generated = [...Array(10)].map(() => ({
      x: Math.random() * 400 - 200,
      y: Math.random() * 200 - 100,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      duration: 3 + Math.random() * 2,
      delay: Math.random() * 2,
    }));
    setDots(generated);
  }, []);
  return (
    <section className="py-24 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative bg-linear-to-br from-[#0B163F] via-[#0B163F] to-[#1676BF] rounded-3xl p-12 lg:p-16 text-center overflow-hidden"
        >
          {/* Background image */}
          <img
            src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200&q=80"
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-10 rounded-3xl"
          />
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#D34586]/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#1676BF]/20 rounded-full blur-3xl" />

          {/* Animated particles */}
          { dots.map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white/20 rounded-full"
              initial={{
                x: Math.random() * 400 - 200,
                y: Math.random() * 200 - 100,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.2, 0.8, 0.2]
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`
              }}
            />
          ))}
          <div className="relative z-10">

            <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              Ready to Amplify Your
              <span className="block bg-linear-to-r from-[#D34586] to-[#1676BF] bg-clip-text text-transparent">
                Brand's Presence?
              </span>
            </h2>

            <p className="text-xl text-white/70 max-w-2xl mx-auto mb-10">
              Join 500+ companies using Zeest Media to reach 150M+ readers across 550+ premium media outlets.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <a href={'/dashboard/sent-press-release'}>
                <Button
                  size="lg"
                  className="bg-[#D34586] hover:bg-[#D34586]/90 text-white px-8 py-6 text-lg group"
                >
                  Submit Your Press Release
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}



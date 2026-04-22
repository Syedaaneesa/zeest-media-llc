"use client"

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Play } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";



const PARTICLE_COUNT = 30;

type Particle = {
    left: string;
    top: string;
    x: number;
    y: number;
    duration: number;
    delay: number;
};


export default function HeroSection() {
    const [prTopic, setPrTopic] = useState('');
    const [size, setSize] = useState({ width: 0, height: 0 })
    const [particles, setParticles] = useState<Particle[]>([]);

    useEffect(() => {
        setParticles(
            Array.from({ length: PARTICLE_COUNT }, () => ({
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                x: Math.random() * 400 - 200,
                y: Math.random() * 200 - 100,
                duration: 3 + Math.random() * 2,
                delay: Math.random() * 2,
            }))
        );
    }, []);

    useEffect(() => {
        setSize({
            width: window.innerWidth,
            height: window.innerHeight,
        })
    }, [])


    return (
        <section className="relative min-h-150 flex items-center overflow-hidden bg-[#0B163F]">
            {/* Animated Background */}
            <div className="absolute inset-0">
                {/* Real background image */}
                <img
                    src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1600&q=80"
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover opacity-10"
                />
                <div className="absolute inset-0 bg-linear-to-br from-[#0B163F] via-[#0B163F]/95 to-[#1676BF]/30" />

                {/* Animated grid lines */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `linear-gradient(rgba(22, 118, 191, 0.3) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(22, 118, 191, 0.3) 1px, transparent 1px)`,
                        backgroundSize: '60px 60px'
                    }} />
                </div>

                {/* Floating orbs */}
                <motion.div
                    animate={{
                        x: [0, 100, 0],
                        y: [0, -50, 0],
                        scale: [1, 1.2, 1]
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute top-20 right-1/4 w-96 h-96 bg-[#D34586]/20 rounded-full blur-3xl"
                />
                <motion.div
                    animate={{
                        x: [0, -80, 0],
                        y: [0, 80, 0],
                        scale: [1, 1.3, 1]
                    }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className="absolute bottom-20 left-1/4 w-80 h-80 bg-[#1676BF]/20 rounded-full blur-3xl"
                />

                {/* Data stream particles */}
                {particles.map((_, i) => {
                    const x = Math.random() * size.width
                    const duration = 3 + Math.random() * 4
                    const delay = Math.random() * 5

                    return (
                        <motion.div
                            key={i}
                            className="absolute w-1 h-1 bg-[#1676BF] rounded-full"
                            initial={{
                                x,
                                y: -10,
                                opacity: 0,
                            }}
                            animate={{
                                y: size.height + 10,
                                opacity: [0, 1, 1, 0],
                            }}
                            transition={{
                                duration,
                                repeat: Infinity,
                                delay,
                                ease: "linear",
                            }}
                        />
                    )
                })}
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 w-full">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-8"
                        >
                            <span className="w-2 h-2 bg-[#D34586] rounded-full animate-pulse" />
                            <span className="text-white/80 text-sm font-medium">Trusted by 500+ Enterprise Clients</span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="text-5xl lg:text-7xl font-bold text-white leading-tight mb-6"
                        >
                            The Future of
                            <span className="block bg-linear-to-r from-[#D34586] to-[#1676BF] bg-clip-text text-transparent">
                                Press Release Distribution
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="text-xl text-white/60 mb-10 max-w-xl leading-relaxed"
                        >
                            Reach 150M+ readers across 500+ premium media outlets.
                            AI-powered optimization for both traditional SEO and next-gen
                            Generative Engine Optimization (GEO).
                        </motion.p>

                        {/* AI PR Writer Widget */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 mb-8"
                        >
                            <div className="flex items-center gap-2 mb-4">
                                <Sparkles className="w-5 h-5 text-[#D34586]" />
                                <span className="text-white font-semibold">Try AI PR Writer</span>
                                <span className="text-xs px-2 py-1 rounded-full bg-[#D34586]/20 text-[#D34586]">Free</span>
                            </div>
                            <div className="flex gap-3">
                                <Input
                                    placeholder="Enter your press release topic..."
                                    value={prTopic}
                                    onChange={(e) => setPrTopic(e.target.value)}
                                    className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-[#1676BF]"
                                />
                                <a href={('/aiprwriter') + (prTopic ? `?topic=${encodeURIComponent(prTopic)}` : '')}>
                                    <Button className="bg-[#D34586] hover:bg-[#D34586]/90 text-white px-6 whitespace-nowrap group">
                                        Generate
                                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                    </Button>
                                </a>
                            </div>
                        </motion.div>

                        {/* CTA Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="flex flex-wrap gap-4"
                        >
                            <a href={'/dashboard/sent-press-release'}>
                                <Button size="lg" className="bg-[#D34586] hover:bg-[#D34586]/90 text-white px-8 py-6 text-lg group">
                                    Submit Press Release
                                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </a>
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <a href={'/demo.mp4'} target='_blank'>
                                    <Button size="lg" className="bg-linear-to-r from-[#1676BF] to-[#00D4FF] hover:from-[#1676BF]/90 hover:to-[#00D4FF]/90 text-white px-8 py-6 text-lg shadow-lg shadow-[#1676BF]/30 group">
                                        <Play className="w-5 h-5 mr-2 group-hover:scale-125 transition-transform" />
                                        Watch Demo
                                    </Button>
                                </a>
                            </motion.div>
                        </motion.div>
                    </motion.div>

                    {/* Right Side - Stats Dashboard Preview */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="relative hidden lg:block"
                    >
                        <div className="relative">
                            {/* Main image */}
                            <div className="rounded-3xl overflow-hidden shadow-2xl border border-white/10">
                                <img
                                    src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&q=80"
                                    alt="Press Release Distribution"
                                    className="w-full h-105 object-cover"
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-[#0B163F]/60 to-transparent rounded-3xl" />
                                {/* Overlay stats */}
                                <div className="absolute bottom-6 left-6 right-6">
                                    <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-4">
                                        <p className="text-white/60 text-xs mb-1">Total Media Reach</p>
                                        <p className="text-3xl font-bold text-white mb-2">150M+ Readers</p>
                                        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: '85%' }}
                                                transition={{ delay: 1.2, duration: 1 }}
                                                className="h-full bg-linear-to-r from-[#D34586] to-[#1676BF] rounded-full"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Floating Cards */}
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 3, repeat: Infinity }}
                                className="absolute -top-8 -right-8 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-4 shadow-xl"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                                    </div>
                                    <div>
                                        <p className="text-white font-semibold">500+ Outlets</p>
                                        <p className="text-white/60 text-xs">Active Distribution</p>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                animate={{ y: [0, 10, 0] }}
                                transition={{ duration: 4, repeat: Infinity }}
                                className="absolute -bottom-6 -left-8 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-4 shadow-xl"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-[#D34586]/20 flex items-center justify-center">
                                        <Sparkles className="w-5 h-5 text-[#D34586]" />
                                    </div>
                                    <div>
                                        <p className="text-white font-semibold">AI-Powered</p>
                                        <p className="text-white/60 text-xs">GEO Optimized</p>
                                    </div>
                                </div>
                            </motion.div>

                        </div>


                    </motion.div>
                </div>
            </div>
        </section>
    );
}
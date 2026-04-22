"use client"


import { motion } from 'framer-motion';
import Image from 'next/image';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css";
import "swiper/css/autoplay";
import "../swippercss/swip.css"

const mediaPartners = [
  { name: 'Yahoo Finance', logo: '/pr-com/Yahoo-Finance.webp' },
  { name: 'Bloomberg', logo: '/pr-com/Bloomberg.png' },
  { name: 'MarketWatch', logo: '/pr-com/MarketWatch.svg' },
  { name: 'Digital Journal', logo: '/pr-com/digital-journal.png' },
  { name: 'Business Insider', logo: '/pr-com/businessInsider.png' },
  { name: 'Benzinga', logo: '/pr-com/benzinga.png' },
  { name: 'AP News', logo: '/pr-com/ap-news.png' },
  { name: 'USA Today', logo: '/pr-com/usa-today.svg' },
  { name: 'Google News', logo: '/pr-com/google-news.png' },
  { name: 'Fox News', logo: '/pr-com/fox-news.png' },
  { name: 'Dow Jones', logo: '/pr-com/dow-jones.png' },
  { name: 'MSN', logo: '/pr-com/msn.svg' },
  { name: 'Nasdaq', logo: '/pr-com/nasdaq.png' },
  { name: 'Forbes', logo: '/pr-com/forbes.png' },
];

export default function TrustTicker() {
  return (
    <section className="py-8 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-8 flex flex-col items-center gap-1">
        <h2 className="text-center text-foreground text-3xl font-bold uppercase">
          Distributed Across 
        </h2>
        <span className="text-center text-3xl font-bold uppercase bg-linear-to-r from-[#D34586] to-[#1676BF] bg-clip-text text-transparent"> 500+ Premium Media Outlets </span>
      </div>

      <div className="relative">
        {/* Gradient masks */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-linear-to-r from-white to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-linear-to-l from-white to-transparent z-10" />

        <div className="overflow-hidden">
          <Swiper
            modules={[Autoplay]}
            spaceBetween={24}
            slidesPerView={4}
            loop={true}
            speed={3000}
            grabCursor={true}
            autoplay={{
              delay: 1,
              disableOnInteraction: false,
            }}
            allowTouchMove={true}
            className="w-full"
            breakpoints={{
              0: {
                slidesPerView: 2,
              },
              640: {
                slidesPerView: 3,
              },
              1024: {
                slidesPerView: 4,
              }
            }}
          >
            {mediaPartners.map((tech, i) => (
              <SwiperSlide
                key={`${tech.name}-${i}`}
                className="flex items-center justify-center p-4"
              >
                <motion.div
                  whileHover={{ scale: 1.12, y: -6 }}
                  transition={{ type: "spring", stiffness: 260, damping: 18 }}
                  className="transition-all duration-50 px-8"
                >
                  <Image
                    src={tech.logo}
                    alt={tech.name}
                    width={150}
                    height={112}
                    className="h-28 max-w-48 object-contain select-none"
                  />
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

      </div>
    </section>
  );
}

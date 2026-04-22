"use client"
import Image from 'next/image';
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay } from "swiper/modules"
import "swiper/css"
import "../swippercss/swip.css"
import { motion } from "framer-motion"
import 'swiper/css';
import { Suspense } from 'react';

const Technologies = () => {
    return (
        <div className="w-full py-16 px-6">
            <div className="max-w-7xl mx-auto">

                <h2 className="text-4xl font-bold text-center mb-4 text-foreground">
                    Technologies We Work With
                </h2>
                <p className="text-center mb-12 max-w-2xl mx-auto text-foreground/70">
                    Full-stack expertise from WordPress ecosystems to modern MERN, Next.js, and cross-platform mobile development.
                </p>

                {/* Carousel 1 - Left to Right */}
                <div className="overflow-hidden mb-6 py-3">
                   <Suspense fallback={"Loading..."}>

                    <Swiper
                        modules={[Autoplay]}
                        spaceBetween={24}
                        slidesPerView={7}
                        loop={true}
                        speed={3000}
                        autoplay={{
                            delay: 0,
                            disableOnInteraction: false,
                            reverseDirection: true,
                        }}
                        allowTouchMove={false}
                        grabCursor={false}

                        className="w-full"
                    >
                        {[...techRow1, ...techRow1].map((tech, i) => (
                            <SwiperSlide
                                key={`${tech.name}-${i}`}
                                className="flex flex-col items-center min-w-30 shadow-lg select-none shadow-foreground/20 my-4 rounded-xl p-4"
                            >
                                <motion.div
                                    whileHover={{
                                        scale: 1.12,
                                        y: -6,
                                    }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 260,
                                        damping: 18,
                                    }}
                                    className="flex flex-col items-center"
                                >
                                    <Image
                                        src={tech.icon}
                                        alt={tech.name}
                                        width={80}
                                        height={80}
                                        className="object-contain drop-shadow-lg transition-transform"
                                    />
                                    <span className="mt-3 text-foreground text-sm font-medium ">
                                        {tech.name}
                                    </span>
                                </motion.div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                   </Suspense>

                </div>

                {/* Carousel 2 - Right to Left (opposite) */}
                <div className="overflow-hidden mb-6 py-3">
                    <div className="flex gap-16 items-center">
                        <Swiper
                            modules={[Autoplay]}
                            spaceBetween={24}
                            slidesPerView={7}
                            loop={true}
                            speed={3000}
                            autoplay={{
                                delay: 0,
                                disableOnInteraction: false,
                            }}
                            allowTouchMove={false}
                            grabCursor={false}

                            className="w-full"
                        >
                            {[...techRow2, ...techRow2].map((tech, i) => (
                            <SwiperSlide
                                key={`${tech.name}-${i}`}
                                className="flex flex-col items-center min-w-30 select-none shadow-lg shadow-foreground/20 my-4 rounded-xl p-4"
                            >
                                <motion.div
                                    whileHover={{
                                        scale: 1.12,
                                        y: -6,
                                    }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 260,
                                        damping: 18,
                                    }}
                                    className="flex flex-col items-center"
                                >
                                    <Image
                                        src={tech.icon}
                                        alt={tech.name}
                                        width={80}
                                        height={80}
                                        className="object-contain drop-shadow-lg transition-transform hover:scale-110"
                                    />
                                    <span className="mt-3 text-sm text-foreground font-medium">
                                        {tech.name}
                                    </span>
                                </motion.div>
                                </SwiperSlide>
                            ))}
                        </Swiper>

                    </div>
                </div>

                {/* Carousel 3 - Left to Right again */}
                <div className="overflow-hidden py-3">
                    <Swiper
                        modules={[Autoplay]}
                        spaceBetween={24}
                        slidesPerView={7}
                        loop={true}
                        speed={3000}
                        autoplay={{
                            delay: 0,
                            disableOnInteraction: false,
                            reverseDirection: true,
                        }}
                        allowTouchMove={false}
                        grabCursor={false}

                        className="w-full"
                    >
                        {[...techRow3, ...techRow3].map((tech, i) => (
                            <SwiperSlide
                                key={`${tech.name}-${i}`}
                                className="flex flex-col items-center min-w-30 shadow-lg select-none shadow-foreground/20 my-4 rounded-xl p-4"
                            >
                                <motion.div
                                    whileHover={{
                                        scale: 1.12,
                                        y: -6,
                                    }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 260,
                                        damping: 18,
                                    }}
                                    className="flex flex-col items-center"
                                >
                                <Image
                                    src={tech.icon}
                                    alt={tech.name}
                                    width={80}
                                    height={80}
                                    className="object-contain drop-shadow-lg hover:scale-110 transition-transform"
                                />
                                <span className="mt-3 text-sm font-medium text-foreground">
                                    {tech.name}
                                </span>
                                </motion.div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </div>
    );
};

// Technology icons (using official devicon CDN)
const techRow1 = [
    { name: 'WordPress', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/wordpress/wordpress-plain.svg' },
    { name: 'PHP', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-plain.svg' },
    { name: 'MySQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg' },
    { name: 'WooCommerce', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/woocommerce/woocommerce-plain.svg' },
    { name: 'Elementor', icon: '/brand-elementor.svg' },
];

const techRow2 = [
    { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg' },
    { name: 'Express', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg' },
    { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg' },
    { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg' },
    { name: 'Next.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg' },
    { name: 'TypeScript', icon: '/tailwind-css-svgrepo-com.svg' },
];

const techRow3 = [
    { name: 'React Native', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg' },
    { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg' },
    { name: 'Tailwind CSS', icon: '/tailwind-css-svgrepo-com.svg' },
    { name: 'Redux', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redux/redux-original.svg' },
    { name: 'Firebase', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-plain.svg' },
    { name: 'GraphQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/graphql/graphql-plain.svg' },
];

export default Technologies;
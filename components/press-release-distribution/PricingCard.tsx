"use client"

import { motion } from 'framer-motion';
import { Check, Sparkles, ArrowRight, Download } from 'lucide-react';
import { Button } from "@/components/ui/button";


export default function PricingCard({ plan, index, featured = false }: {
  plan: {
    name: string;
    price?: string;
    description: string;
    features: string[];
    url: string;
    CTA: string;
    images: string[]
  }; index: number; featured: boolean
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className={`relative rounded-3xl p-8 h-full flex flex-col transition-all duration-500 hover:scale-105 ${featured
        ? 'bg-linear-to-br from-[#0B163F] to-[#1676BF] text-white shadow-2xl shadow-[#0B163F]/30 scale-105 z-10'
        : 'bg-white border border-gray-200 hover:border-[#D34586]/30 hover:shadow-xl'
        }`}
    >
      {featured && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#D34586] text-white text-sm font-semibold shadow-lg">
            <Sparkles className="w-4 h-4" />
            Most Popular
          </div>
        </div>
      )}

      <div className="mb-6">
        <h3 className={`text-4xl font-bold mb-2 ${featured ? 'text-white' : 'text-[#0B163F]'}`}>
          {plan.name}
        </h3>
        <p className={`text-sm ${featured ? 'text-white/70' : 'text-gray-500'}`}>
          {plan.description}
        </p>
      </div>

      {plan.price && (
        <div className="mb-8">
          <div className="flex items-baseline gap-2">
            <span className={`text-5xl font-bold ${featured ? 'text-white' : 'text-[#0B163F]'}`}>
              ${plan.price}
            </span>
            <span className={featured ? 'text-white/60' : 'text-gray-500'}>/release</span>
          </div>
        </div>
      )}

            <div className="flex flex-col gap-2.5 mt-2 mb-6">
        <a href={`${plan.url}`}>
          <Button
            className={`w-full py-6 text-lg group ${featured
              ? 'bg-[#D34586] hover:bg-[#D34586]/90 text-white'
              : 'bg-[#0B163F] hover:bg-[#0B163F]/90 text-white'
              }`}
          >
            {plan.CTA}
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </ a>

        <Button
          variant="ghost"
          className={`w-full border-2 border-gray-500/40 py-5 ${featured ? 'text-white/80 hover:text-white hover:bg-white/10' : 'text-gray-600 hover:text-[#D34586]'}`}
        >
          <Download className="w-4 h-4 mr-2" />
          View Sample Report
        </Button>
      </div>

      <div className="space-y-4 mb-8">
        {plan.features.map((feature, i) => (
          <div key={i} className="flex items-start gap-3">
            <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${featured ? 'bg-[#D34586]' : 'bg-[#D34586]/10'
              }`}>
              <Check className={`w-3 h-3 ${featured ? 'text-white' : 'text-[#D34586]'}`} />
            </div>
            <span className={featured ? 'text-white/90' : 'text-gray-700'}>{feature}</span>
          </div>
        ))}
      </div>

      {/* <div className={`${index === 2 && "bg-white px-2 py-4 rounded"}`}>

        <div className={`grid grid-cols-2 gap-4`}>
          {plan.images && plan.images.map((image: string) => (
            <div  key={image} className="group cursor-pointer flex items-center h-12 justify-center p-2">
              <img src={image} alt={image} className='w-full h-auto object-fill group-hover:scale-110 transition h-8' />
            </div>
          ))}

        </div>
        {plan.images.length > 0 &&
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="bg-gray-200/50 rounded group cursor-pointer flex items-center h-12 justify-center p-2">
              <img src={"/pricing/evertise-ai-pr-bing-news-logo.png"} alt={"Bing"} className='w-full h-auto object-fill group-hover:scale-110 transition max-h-8' />
            </div>
            <div className="bg-gray-200/50 rounded group cursor-pointer flex items-center h-12 justify-center p-2">
              <img src={"/pricing/evertise-ai-pr-google-news-logo.png"} alt={"Google"} className='w-full h-auto object-fill group-hover:scale-110 transition max-h-8' />
            </div>
          </div>
        }
      </div> */}
      
      <div className={`h-full ${plan.images.length && 'px-4 py-5 rounded-lg shadow-md'} ${index === 2 ? "bg-white px-4 py-5 rounded-lg shadow-sm" : ""}`}>

        <div className="grid grid-cols-2 gap-y-3 gap-x-6">
          {plan.images?.map((image, i) => (
            <div
              key={i}
              className="flex items-start justify-center h-12 group"
            >
              <img
                src={image}
                alt="brand logo"
                className="h-11 w-auto object-contain group-hover:scale-105 
                     transition duration-200"
              />
            </div>
          ))}
        </div>

      </div> 


      {/* <div className={`${index === 2 ? "bg-white px-4 py-5 rounded-lg shadow-sm" : ""}`}>

        <div className="space-y-2">
          {plan.images &&
            Array.from({ length: Math.ceil(plan.images.length / 2) }).map((_, rowIndex) => {
              const first = plan.images[rowIndex * 2];
              const second = plan.images[rowIndex * 2 + 1];

              return (
                <div key={rowIndex} className="flex gap-5">

                  <div className="grow flex items-center justify-start h-12">
                    <img
                      src={first}
                      alt="brand"
                      className="h-7 object-contain transition"
                    />
                  </div>

                  {second && (
                    <div className="grow flex items-center justify-start h-12">
                      <img
                        src={second}
                        alt="brand"
                        className="h-7 object-contain transition"
                      />
                    </div>
                  )}
                </div>
              );
            })}
        </div>

      </div> */}


    </motion.div>
  );
}
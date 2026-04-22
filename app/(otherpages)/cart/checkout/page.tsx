"use client";

import { Suspense, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Globe, ArrowLeft } from 'lucide-react';
import { useCart } from '@/context/Cart';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import convertToSubcurrency from '@/lib/convertToSubcurrency';
import CardPayment from './CardPayment';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

export default function Checkout() {

  const { cart } = useCart();
  const [total, setTotal] = useState(0);

  const actualAmount = cart.reduce((sum, item) => sum + (item.price || 0), 0);

  useEffect(() => {
    setTotal(actualAmount);
  }, [cart]);

  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-20">
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <a href="/cart" className="inline-flex items-center gap-2 text-gray-500 hover:text-[#D34586] text-sm mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Cart
          </a>
          <h1 className="text-3xl font-bold text-[#0B163F]">Checkout</h1>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Forms */}
          <div className="lg:col-span-2 space-y-6">
            {/* Step Indicator */}
            <Elements stripe={stripePromise}
              options={{
                mode: "payment",
                amount: convertToSubcurrency(Number(total) || 100),
                currency: "usd"
              }}
            >
              <Suspense fallback={
                <div className="w-full min-h-screen flex items-center justify-center">
                <div className="w-16 h-16 rounded-full border-4 border-[#D34586]/20 border-t-[#D34586] mb-4 animate-spin flex items-center justify-center" /></div>}>
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
                  <h2 className="text-lg font-bold text-[#0B163F] mb-6 flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-[#D34586]" /> Payment Details
                  </h2>

                  <CardPayment actualAmount={actualAmount} total={total} setTotal={setTotal} />


                </motion.div>
              </Suspense>
            </Elements>
          </div>

          {/* Order Summary Sidebar */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sticky top-28">
              <h2 className="text-base font-bold text-[#0B163F] mb-4">Order Summary</h2>
              <div className="space-y-3 max-h-64 overflow-y-auto mb-4">
                {cart.map(item => (
                  <div key={item.id} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#0B163F]/5 flex items-center justify-center shrink-0">
                      <Globe className="w-4 h-4 text-[#0B163F]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[#0B163F] truncate">{item.websiteName}</p>
                      {item.categories && <p className="text-xs text-gray-400">{item.categories.name}</p>}
                    </div>
                    <span className="text-sm font-bold text-[#D34586] shrink-0">${item.price}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-100 pt-4">
                <div className="flex justify-between font-bold text-[#0B163F]">
                  <span>Total</span>
                  <span className="text-[#D34586] text-xl">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
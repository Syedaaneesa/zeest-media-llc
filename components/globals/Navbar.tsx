"use client"

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, ShoppingBag } from 'lucide-react';
import { Button } from "@/components/ui/button";

import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/Cart';

export default function Navbar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const { user } = useAuth();
  const { cart } = useCart()

  const navItems = [
    { label: 'Home', page: '/' },
    {
      label: 'Services', page: '/', hasDropdown: true, items: [
        { label: 'Press Release Distribution', page: '/press-release-distribution' },
        { label: 'Guest Posting', page: '/guestposting' },

      ]
    },
    { label: 'Other Services', page: '/other-services' },
    { label: 'Blog', page: '/blog' },
    { label: 'Contact Us', page: '/contact-us' },
    { label: 'Newswire', page: '/newswire' }

  ];


  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-99 transition-all duration-300 bg-[#0B163F]/95 backdrop-blur-xl shadow-lg`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href={'/'} className="flex items-center gap-3">
            <img
              src="/logo/logo.png"
              alt="Zeest Media"
              className="h-20 w-auto object-contain"
            />
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.hasDropdown && setOpenDropdown(item.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <a
                  href={item.page}
                  className="flex items-center gap-1 text-white/80 hover:text-white transition-colors py-2 group"
                >
                  <span className="relative">
                    {item.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#D34586] group-hover:w-full transition-all duration-300" />
                  </span>
                  {item.hasDropdown && <ChevronDown className="w-4 h-4" />}
                </a>

                {item.hasDropdown && (
                  <AnimatePresence>
                    {openDropdown === item.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute top-full left-0 pt-2"
                      >
                        <div className="bg-white rounded-xl shadow-xl border border-gray-100 py-2 min-w-55">
                          {item.items.map((subItem) => (
                            <a
                              key={subItem.label}
                              href={subItem.page}
                              className="block px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-[#D34586] transition-colors"
                            >
                              {subItem.label}
                            </a>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            {/* <a href={'/aiprwriter'}>
              <Button variant="ghost" className="text-white cursor-pointer hover:bg-white/10 hover:text-white gap-2">
                <Sparkles className="w-4 h-4 text-[#D34586]" />
                AI Writer
              </Button>
            </a> */}
            {
              user ?
                <div className='flex items-center justify-center gap-4'>

                  <a href={'/dashboard'}>
                    <Button className="bg-[#D34586] cursor-pointer hover:bg-[#D34586]/90 text-white">
                      Dashboard
                    </Button>
                  </a>

                  <a href='/cart' className="relative">
                    <div className="w-5 h-5 absolute -top-3 -right-1 flex items-center justify-center border-primary border bg-secondary rounded-full text-white p-1">
                    <p className='text-xs'>
                      {cart.length || 0}
                    </p>
                    </div>
                    <ShoppingBag className='text-primary' />
                  </a>

                </div>
                : <a href={'/auth/login'}>
                  <Button className="bg-[#D34586] cursor-pointer hover:bg-[#D34586]/90 text-white">
                    Login
                  </Button>
                </a>
            }

          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="lg:hidden text-white p-2"
          >
            {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#0B163F] border-t border-white/10"
          >
            <div className="px-6 py-4 space-y-4">
              {navItems.map((item) => (
                <div key={item.label}>
                  <a
                    href={item.page}
                    onClick={() => setIsMobileOpen(false)}
                    className="block py-0.5 text-white/80 hover:text-white"
                  >
                    {item.label}
                  </a>
                  {item.hasDropdown && (
                    <div className="pl-4 space-y-0.5 mt-2">
                      {item.items.map((subItem) => (
                        <a
                          key={subItem.label}
                          href={subItem.page}
                          onClick={() => setIsMobileOpen(false)}
                          className="block py-0.5 text-white/60 hover:text-white text-sm"
                        >
                          {subItem.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              <div className="pt-4 border-t border-white/10 flex flex-col gap-y-3">
                {/* <a href={'/aiprwriter'} onClick={() => setIsMobileOpen(false)}>
                  <Button variant="outline" className="w-full border-white/20 text-foreground hover:bg-white/10 hover:text-white gap-2">
                    <Sparkles className="w-4 h-4 mr-2 text-[#D34586]" />
                    AI Writer
                  </Button>
                </a> */}
                {
                  user ?
                    <a href="/dashboard">
                      <Button className="w-full bg-[#D34586] hover:bg-[#D34586]/90 text-white">
                        Dashboard
                      </Button>
                    </a>
                    : <a href={'/auth/login'} onClick={() => setIsMobileOpen(false)}>
                      <Button className="w-full bg-[#D34586] hover:bg-[#D34586]/90 text-white">
                        Login
                      </Button>
                    </a>
                }

                  <a href='/cart' className="relative">
                    <div className="w-5 h-5 absolute -top-3 -right-1 flex items-center justify-center border-primary border bg-secondary rounded-full text-white p-1">
                    <p className='text-xs'>
                      {cart.length || 0}
                    </p>
                    </div>
                    <ShoppingBag className='text-primary' />
                  </a>

              </div>
              
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
"use client"
import { motion } from 'framer-motion';
import { Mail as MailIcon, Phone, MapPin, Linkedin, Twitter, Facebook } from 'lucide-react';



const footerLinks = {
  services: [
    { label: 'Press Release Distribution', page: '/press-release-distribution' },
    { label: 'Content Marketing', page: '/press-release-distribution' },
    { label: 'Other Services', page: '/other-services' },
  ],
  other: [
    { label: 'AI PR Writer', page: '/aiprwriter' },
    { label: 'Website Development', page: '/other-services' },
    { label: 'Analytics & Reports', page: '/reports' },
  ],
  company: [
    { label: 'About Us', page: '/' },
    { label: 'Blogs', page: '/blog' },
    { label: 'Contact Us', page: '/contact' },
    { label: 'Sitemap', page: '/sitemap.xml' }
  ],
  resources: [
    { label: 'GEO vs SEO Guide', page: '/#geo-vs-seo-guide' },
    { label: 'Sample Reports', page: '/reports' },
    { label: 'Media Outlets', page: '/#media-outlets' },
    { label: 'FAQ', page: '/press-release-distribution/#faq' },
  ],
};
const socialLinks = [
  { icon: Linkedin, url: 'https://www.linkedin.com/company/zeest-media-marketing/' },
  { icon: Twitter, url: 'https://x.com/ZeestMedia' },
  { icon: Facebook, url: 'https://www.facebook.com/ZeestMM/' },
];

export default function Footer() {
  return (
    <footer className="bg-[#0B163F] pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-6 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <a href={'/'} className="mb-6">
              <img
                src="/logo/logo.png"
                alt="Zeest Media"
                className="h-24 w-auto object-contain"
              />
            </a>
            <p className="text-white/60 mb-6 max-w-sm leading-relaxed">
              The premier press release distribution service. Reach 150M+ readers across 500+ premium media outlets with AI-powered optimization.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((link, i) => (
                <motion.a
                  key={i}
                  href={link.url}
                  whileHover={{ scale: 1.1 }}
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:bg-[#D34586] hover:text-white transition-all"
                >
                  <link.icon className="w-5 h-5" />
                </motion.a>
              ))}
              <motion.a
                href={'https://t.me/zeestmedia'}
                whileHover={{ scale: 1.1 }}
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:bg-[#D34586] hover:text-white transition-all"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill='lightgray' className="text-white/60 bi bi-telegram" viewBox="0 0 16 16">
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.287 5.906q-1.168.486-4.666 2.01-.567.225-.595.442c-.03.243.275.339.69.47l.175.055c.408.133.958.288 1.243.294q.39.01.868-.32 3.269-2.206 3.374-2.23c.05-.012.12-.026.166.016s.042.12.037.141c-.03.129-1.227 1.241-1.846 1.817-.193.18-.33.307-.358.336a8 8 0 0 1-.188.186c-.38.366-.664.64.015 1.088.327.216.589.393.85.571.284.194.568.387.936.629q.14.092.27.187c.331.236.63.448.997.414.214-.02.435-.22.547-.82.265-1.417.786-4.486.906-5.751a1.4 1.4 0 0 0-.013-.315.34.34 0 0 0-.114-.217.53.53 0 0 0-.31-.093c-.3.005-.763.166-2.984 1.09" />
                </svg>
              </motion.a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-6">Services</h4>
            <ul className="space-y-4">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.page}
                    className="text-white/60 hover:text-[#D34586] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

                    <div>
            <h4 className="text-white font-semibold mb-6">Others</h4>
            <ul className="space-y-4">
              {footerLinks.other.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.page}
                    className="text-white/60 hover:text-[#D34586] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold mb-6">Company</h4>
            <ul className="space-y-4">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.page}
                    className="text-white/60 hover:text-[#D34586] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-6">Contact</h4>
            <ul className="space-y-4">
              <li className="gap-3 text-white/60">
                <a href="mailto:info@zeestmedia.com" className='flex items-center gap-2'>
                  <MailIcon className="w-5 h-5 text-[#D34586]" />
                  info@zeestmedia.com
                </a>
              </li>
              <li className="gap-3 text-white/60">
                <a href="tel:+17276155591" className='flex items-center gap-2'>
                  <Phone className="w-5 h-5 text-[#D34586]" />
                  +1 (727) 615-5591
                </a>
              </li>
              <li className="flex items-start gap-3 text-white/60">
                <MapPin className="w-5 h-5 text-[#D34586] shrink-0 mt-1" />
                7901 4th St N #18789 St. Petersburg, FL, 33702, USA
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/40 text-sm">
              © {new Date().getFullYear()} Zeest Media. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="/privacy-policy" className="text-white/40 hover:text-white/60 text-sm">Privacy Policy</a>
              <a href="/publication-policy" className="text-white/40 hover:text-white/60 text-sm">Publication Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
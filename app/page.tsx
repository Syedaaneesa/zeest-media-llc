import Footer from "@/components/globals/Footer";
import Navbar from "@/components/globals/Navbar";
import Whatsapp from "@/components/globals/Whatsapp";
import CompetitorComparison from "@/components/home/CompetitorComparison";
import CTASection from "@/components/home/CTASection";
import GEOvsSEO from "@/components/home/GEOvseSEO";
import HeroSection from "@/components/home/HeroSection";
import ServicesSection from "@/components/home/ServicesSection";
import StatsSection from "@/components/home/StatsSection";
import TestimonialsSection from "@/components/home/Testimonials";
import TrustTicker from "@/components/home/TrustTicker";

export default function Home() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navbar />
      <Whatsapp />
      <HeroSection />
      <TrustTicker />
      <StatsSection />
      <ServicesSection />
      <CompetitorComparison />
      <GEOvsSEO />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </div>
  );
}

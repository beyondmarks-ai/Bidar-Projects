import { useRef, useEffect } from "react";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import PricingSection from "@/components/PricingSection";
import WhyUsSection from "@/components/WhyUsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

import VideoBackground from "@/components/VideoBackground";

const Index = () => {
  // Use Intersection Observer to trigger animations on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
            entry.target.classList.remove("opacity-0", "translate-y-10");
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(".reveal-on-scroll").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      {/* Global Fixed Video Background */}
      <VideoBackground />

      <Header />

      {/* Scrollable Content */}
      <main className="relative z-10">
        <HeroSection />
        <ServicesSection />
        <PricingSection />
        <WhyUsSection />
        <TestimonialsSection />
        <div className="pt-20">
          <ContactSection />
          <Footer />
        </div>
      </main>

    </div>
  );
};

export default Index;

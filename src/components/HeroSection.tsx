import { Button } from "@/components/ui/button";
import { ArrowRight, Star, ShieldCheck, Zap, Sparkles, User } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import CustomProjectModal from "./CustomProjectModal";

const HeroSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">

      {/* Background - Transparent to show global video */}
      <div className="absolute inset-0 w-full h-full z-0" />

      <div className="container mx-auto px-4 md:px-6 relative z-20 flex flex-col items-center text-center pt-36 md:pt-40">

        {/* Elegant Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/20 bg-white/5 backdrop-blur-xl mb-6 animate-fade-in group hover:bg-white/10 transition-colors cursor-default">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-xs font-medium text-white/90 tracking-[0.2em] uppercase">
            Beyond Marks AI Academy Presents
          </span>
        </div>

        {/* Main Typography */}
        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-light tracking-tight text-white mb-8 leading-tight md:leading-[0.9] animate-fade-in-up">
          Bidar College <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/50">Projects Hub</span>
        </h1>

        <p className="font-body text-xl md:text-2xl text-white/70 max-w-2xl mb-12 font-light leading-relaxed tracking-wide animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
          Where <span className="text-white font-medium">ambition</span> meets <span className="text-white font-medium">excellence</span>.
          Access premium academic resources designed for the top 1%.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-5 mb-24 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          <Link to="/projects">
            <Button variant="hero" size="xl" className="h-14 px-8 rounded-full bg-white text-black hover:bg-white/90 border-0 font-medium tracking-wide text-sm shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)]">
              Built-in Projects
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
          <Button
            variant="outline"
            size="xl"
            className="h-14 px-8 rounded-full border-white/20 bg-white/5 backdrop-blur-sm text-white hover:bg-white/10 font-medium tracking-wide text-sm group"
            onClick={() => setIsModalOpen(true)}
          >
            <Sparkles className="mr-2 w-4 h-4 group-hover:text-primary transition-colors" />
            Request Custom Project
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16 w-full max-w-4xl animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
          {[
            { label: "Active Users", value: "2K+", icon: User },
            { label: "Projects", value: "150+", icon: Star },
            { label: "Rating", value: "4.9/5", icon: ShieldCheck },
            { label: "Support", value: "24/7", icon: Zap },
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center gap-2 group p-4 rounded-2xl glass-card border border-white/5">
              <stat.icon className="w-6 h-6 text-white/40 group-hover:text-primary transition-colors mb-1" />
              <span className="font-display text-3xl font-bold text-white tracking-tight">{stat.value}</span>
              <span className="font-body text-xs font-medium text-white/50 uppercase tracking-wider">{stat.label}</span>
            </div>
          ))}
        </div>

      </div>

      <CustomProjectModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
};

export default HeroSection;

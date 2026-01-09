import { Code2, Smartphone, MonitorSmartphone, Brain, Database, Cloud, CheckCircle2, ArrowRight } from "lucide-react";

const ServicesSection = () => {
  const services = [
    {
      icon: Code2,
      title: "Mini Projects",
      description: "Perfect for quick submissions. Ready-to-run code with basic documentation.",
      features: ["₹2,000 Fixed", "Instant Code", "Basic Guide"],
      className: "md:col-span-1",
      gradient: "from-blue-500/10 to-indigo-500/10"
    },
    {
      icon: MonitorSmartphone,
      title: "Web Development",
      description: "Full-stack web applications using React, Node, or PHP.",
      features: ["Responsive", "Modern UI", "Database Integration"],
      className: "md:col-span-1",
      gradient: "from-emerald-500/10 to-teal-500/10"
    },
    {
      icon: Brain,
      title: "AI & ML",
      description: "Advanced machine learning models and AI integration projects.",
      features: ["Custom Models", "Dataset Training", "Analysis"],
      className: "md:col-span-1",
      gradient: "from-purple-500/10 to-pink-500/10"
    },
    {
      icon: Smartphone,
      title: "Android Apps",
      description: "Native android applications using Java/Kotlin or Flutter.",
      features: ["APK Deliverable", "Source Code", "Setup Help"],
      className: "md:col-span-1",
      gradient: "from-orange-500/10 to-red-500/10"
    },
    {
      icon: Database,
      title: "Python Scripts",
      description: "Automation, data analysis, and utility scripts.",
      features: ["Clean Code", "Optimized", "Comments Included"],
      className: "md:col-span-1",
      gradient: "from-cyan-500/10 to-sky-500/10"
    },
    {
      icon: Cloud,
      title: "SaaS Apps",
      description: "Complete B2B or B2C SaaS platforms with payment gateways.",
      features: ["Scalable", "Secure Auth", "Admin Dashboard"],
      className: "md:col-span-1",
      gradient: "from-rose-500/10 to-fuchsia-500/10"
    }
  ];

  const ServiceCard = ({ service, index }: { service: any, index: number }) => {
    return (
      <div
        className={`relative col-span-1 group rounded-3xl glass-content p-8 transition-all duration-300 ${service.className || ""}`}
      >
        {/* Subtle Gradient Background */}
        <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

        {/* Icon & Title */}
        <div className="flex items-start justify-between mb-6">
          <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
            <service.icon className="w-7 h-7 text-white" />
          </div>
          <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <ArrowRight className="w-4 h-4 text-white -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
          </div>
        </div>

        <h3 className="font-display text-2xl font-bold text-white mb-3">
          {service.title}
        </h3>
        <p className="font-body text-base text-white/80 leading-relaxed mb-6">
          {service.description}
        </p>

        {/* Features List */}
        <ul className="space-y-2">
          {service.features.map((feature: string, i: number) => (
            <li key={i} className="flex items-center gap-2 font-body text-base font-medium text-white/90 transition-colors">
              <span className="w-1.5 h-1.5 rounded-full bg-primary/50" />
              {feature}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <section id="services" className="relative py-32 overflow-hidden snap-start">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-6">
            <span className="text-xs font-medium text-white/90 tracking-wide uppercase">
              Our Expertise
            </span>
          </div>

          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">
            Comprehensive <br />
            <span className="text-white">
              Project Domain Coverage
            </span>
          </h2>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;

import { Award, Users, Headphones, RefreshCcw, BookOpen, Lock } from "lucide-react";

const WhyUsSection = () => {
  const reasons = [
    {
      icon: Award,
      title: "Experts Only",
      description: "Projects built by senior developers, not interns. Quality code guaranteed.",
    },
    {
      icon: Users,
      title: "Student Friendly",
      description: "We fit your budget without compromising on the project quality or features.",
    },
    {
      icon: Headphones,
      title: "Dedicated Support",
      description: "We guide you through installation and explanation until you are confident.",
    },
    {
      icon: RefreshCcw,
      title: "Free Revisions",
      description: "Minor changes and tweaks are free for the first 7 days after delivery.",
    },
    {
      icon: BookOpen,
      title: "Zero Plagiarism",
      description: "Every custom project is unique. We never resell the same code to classmates.",
    },
    {
      icon: Lock,
      title: "Secure & Private",
      description: "Your data and project details are kept 100% confidential.",
    },
  ];

  return (
    <section id="why-us" className="relative py-24 md:py-32 overflow-hidden snap-start">
      {/* Background */}
      <div className="absolute inset-0 bg-transparent" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[120px] animate-pulse-soft" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-6">
            <span className="text-xs font-medium text-white/90 tracking-wide uppercase">
              Why Choose Us
            </span>
          </div>

          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">
            Guaranteed <br />
            <span className="text-white">
              Your Academic Success
            </span>
          </h2>
          <p className="font-body text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
            We don't just deliver code; we deliver complete project success with support until your final viva.
          </p>
        </div>

        {/* Reasons Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason, index) => (
            <div
              key={reason.title}
              className="group p-8 rounded-3xl glass-content"
            >
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                  <reason.icon className="w-7 h-7 text-primary group-hover:text-white transition-colors" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
                    {reason.title}
                  </h3>
                  <p className="font-body text-base text-white/80 leading-relaxed group-hover:text-white transition-colors">
                    {reason.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUsSection;

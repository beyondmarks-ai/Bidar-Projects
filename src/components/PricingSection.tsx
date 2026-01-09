import { Button } from "@/components/ui/button";
import { Check, Star, Sparkles, Zap } from "lucide-react";

const PricingSection = () => {
  const plans = [
    {
      name: "Mini Projects",
      description: "Quick submission, basic documentation.",
      price: "₹2,500",
      period: "fixed price",
      features: [
        "Ready-to-run code",
        "Basic Documentation",
        "Installation Support",
        "Instant Download",
        "Perfect for 1st-3rd sem",
      ],
      popular: false,
      color: "border-blue-500/50"
    },
    {
      name: "AI & SaaS",
      description: "Advanced AI/ML or Custom SaaS.",
      price: "₹6,000",
      period: "starting from",
      features: [
        "Custom AI Models",
        "Payment Gateway Integration",
        "Advanced Dashboard",
        "Priority Support",
        "Detailed Explanation",
      ],
      popular: true,
      color: "border-purple-500/50"
    },
    {
      name: "Custom Requirements",
      description: "B2B Ecommerce or College Management.",
      price: "₹7,500",
      period: "starting from",
      features: [
        "Full Source Code",
        "Database Integrated",
        "Comprehensive Report",
        "3-4 Days Delivery",
        "Free Minor Revisions (7 Days)",
      ],
      popular: false,
      color: "border-primary/50"
    },
  ];

  return (
    <section id="pricing" className="relative py-24 md:py-32 overflow-hidden snap-start">
      {/* Background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] animate-pulse-soft" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <span
            className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-6 font-body text-sm font-semibold text-white/90 uppercase tracking-widest opacity-0 animate-fade-in"
            style={{ animationDelay: "0.1s" }}
          >
            Transparent Pricing
          </span>
          <h2
            className="font-display text-4xl md:text-5xl font-bold text-white mb-6 opacity-0 animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            Investment for
            <span className="block text-white mt-2">Academic Success</span>
          </h2>
          <p
            className="font-body text-xl text-white/90 leading-relaxed opacity-0 animate-fade-in-up"
            style={{ animationDelay: "0.3s" }}
          >
            Clear, fixed pricing with no hidden costs. 40% advance to start custom work.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto px-2">
          {plans.map((plan, index) => (
            <div
              key={plan.name}
              className={`relative rounded-3xl transition-all duration-500 group ${plan.popular
                ? "glass-content border-primary/50 shadow-[0_0_50px_-12px_rgba(124,58,237,0.3)] scale-105 z-10"
                : "glass-content hover:bg-white/5"
                } ${plan.color}`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-5 left-1/2 -translate-x-1/2">
                  <div className="flex items-center gap-1.5 px-6 py-2 bg-[#7c3aed] rounded-full text-xs font-bold text-white uppercase tracking-wider shadow-xl border border-white/20">
                    <Sparkles className="w-3.5 h-3.5 fill-white" />
                    Best Value
                  </div>
                </div>
              )}

              <div className="p-8 h-full flex flex-col">
                <div className="text-center mb-8 border-b border-white/10 pb-8">
                  <h3 className="font-display text-2xl font-bold text-white mb-3">
                    {plan.name}
                  </h3>
                  <div className="flex items-baseline justify-center gap-1 mb-3">
                    <span className="font-display text-5xl font-bold text-white">
                      {plan.price}
                    </span>
                  </div>
                  <p className="font-body text-base text-white/80">
                    {plan.description}
                  </p>
                </div>

                <ul className="space-y-4 mb-8 flex-grow">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${plan.popular ? 'bg-primary text-white' : 'bg-white/20 text-white'}`}>
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span className="font-body text-base text-white/90">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <Button
                  variant={plan.popular ? "hero" : "outline"}
                  size="lg"
                  className={`w-full rounded-xl text-base ${!plan.popular && 'border-white/20 text-white hover:bg-white/10'}`}
                >
                  Choose Plan
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Payment Note */}
        <div
          className="text-center mt-12 opacity-0 animate-fade-in p-6 rounded-2xl glass-content max-w-2xl mx-auto"
          style={{ animationDelay: "0.8s" }}
        >
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-base text-white/80">
            <span className="flex items-center gap-2"><Zap className="w-4 h-4 text-yellow-400" /> 40% Advance Required</span>
            <span className="hidden md:inline text-white/10">|</span>
            <span>No Refunds after work starts</span>
            <span className="hidden md:inline text-white/10">|</span>
            <span>UPI / Bank Transfer Accepted</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;

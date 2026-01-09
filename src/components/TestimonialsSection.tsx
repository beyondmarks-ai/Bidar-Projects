import { Star, Quote } from "lucide-react";

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Rahul Sharma",
      college: "VTU Engineering",
      text: "Got my final year project done perfectly. The documentation was thorough and the project worked flawlessly during my presentation. Highly recommended!",
      rating: 5,
    },
    {
      name: "Priya Patel",
      college: "Mumbai University",
      text: "Amazing service! They delivered my custom project ahead of schedule. The support team was very responsive and helpful throughout.",
      rating: 5,
    },
    {
      name: "Arun Kumar",
      college: "Anna University",
      text: "Best decision I made for my mini project. Quality work at an affordable price. Will definitely come back for my main project.",
      rating: 5,
    },
    {
      name: "Sneha Reddy",
      college: "JNTU Hyderabad",
      text: "The project modifications they did were exactly what I needed. Quick turnaround and professional communication. Very satisfied!",
      rating: 5,
    },
  ];

  return (
    <section id="testimonials" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-transparent" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Section Header */}
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-6">
            <span className="text-xs font-medium text-white/90 tracking-wide uppercase">
              Testimonials
            </span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6 opacity-0 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            Trusted by
            <span className="block text-white mt-2">Top Performers</span>
          </h2>
          <p className="font-body text-xl text-white/90 leading-relaxed opacity-0 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            Join hundreds of students who achieved A+ grades with our support.
          </p>
        </div>

        {/* Testimonials Grid - Responsive Layout */}
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="relative p-8 rounded-3xl glass-content group"
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-8">
                <Quote className="w-12 h-12 text-white/10 group-hover:text-primary/20 transition-colors duration-500" />
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                ))}
              </div>

              {/* Content */}
              <p className="font-body text-xl text-white leading-relaxed mb-8 relative z-10 italic">
                "{testimonial.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4 pt-6 border-t border-white/10">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center font-bold text-white text-lg shadow-lg">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-display text-lg font-semibold text-white">
                    {testimonial.name}
                  </h4>
                  <p className="font-body text-sm text-white/70 uppercase tracking-wide">
                    {testimonial.college}
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

export default TestimonialsSection;

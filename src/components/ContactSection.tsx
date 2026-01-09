import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, Send, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxZ_JjZtMdWjlF_BwZs21laxmXKIj17AVWyCHodmptzjPqvgsYae4hpbDZw8mZNZB0m/exec";

const ContactSection = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    requirements: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      name: formData.name,
      contact: formData.phone,
      domain: "General Inquiry",
      tech: "N/A",
      idea: formData.requirements,
      link: formData.email // Save email in link column or handle differently. Ideally mapping: Name->Name, Contact->Contact(Phone), Link->Email
    };
    // Adjust payload mapping to match Sheet Headers: Timestamp, Name, Contact, Domain, Tech Stack, Idea, Link, File URL
    // I'll put Email in 'Link' or append to Contact. 
    // Let's Put Email in "Link" column for now.

    const finalPayload = {
      ...payload,
      link: formData.email
    };

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finalPayload)
      });
      toast.success("Message Sent!", { description: "We will get back to you shortly." });
      setFormData({ name: "", phone: "", email: "", requirements: "" });
    } catch (error) {
      console.error("Error submitting form", error);
      toast.error("Failed to send", { description: "Please try again or contact us directly." });
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: Phone,
      label: "Phone",
      value: "+91 91132 60846",
      href: "tel:9113260846",
    },
    {
      icon: Mail,
      label: "Email",
      value: "admin@bidarprojects.com",
      href: "mailto:admin@bidarprojects.com",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Beyond Marks AI Academy, Meer's Tower First Floor, Near Water Tank, Mailoor Cross, Bidar - 585403, Karnataka.",
      href: "https://maps.app.goo.gl/9Z1Z1Z1Z1Z1Z1Z1Z1",
    },
  ];

  return (
    <section id="contact" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 gradient-subtle" />
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-primary/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-primary/5 rounded-full blur-[80px]" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-6">
            <span className="text-xs font-medium text-white/90 tracking-wide uppercase">
              Get In Touch
            </span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">
            Start Your <br />
            <span className="text-white">
              Project Journey
            </span>
          </h2>
          <p className="font-body text-xl text-white/90 leading-relaxed">
            Visit our center or reach out online. We are here to help you excel.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 max-w-6xl mx-auto items-start">
          {/* Contact Form */}
          <div className="p-8 md:p-10 rounded-3xl glass-content border border-white/10">
            <h3 className="font-display text-2xl font-bold text-white mb-8">
              Send Message
            </h3>
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-base font-medium text-white/90">Name</label>
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    type="text"
                    placeholder="Your Name"
                    required
                    className="h-12 bg-white/5 border-white/10 focus:border-primary/50 text-white placeholder:text-white/50 rounded-xl text-base"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-base font-medium text-white/90">Phone</label>
                  <Input
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    type="tel"
                    placeholder="+91 99999 99999"
                    required
                    className="h-12 bg-white/5 border-white/10 focus:border-primary/50 text-white placeholder:text-white/50 rounded-xl text-base"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-base font-medium text-white/90">Email</label>
                <Input
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  type="email"
                  placeholder="you@college.edu"
                  required
                  className="h-12 bg-white/5 border-white/10 focus:border-primary/50 text-white placeholder:text-white/50 rounded-xl text-base"
                />
              </div>
              <div className="space-y-2">
                <label className="text-base font-medium text-white/90">Requirements</label>
                <Textarea
                  name="requirements"
                  value={formData.requirements}
                  onChange={handleInputChange}
                  placeholder="Tell us about your project idea..."
                  rows={4}
                  required
                  className="bg-white/5 border-white/10 focus:border-primary/50 text-white placeholder:text-white/50 rounded-xl resize-none text-base"
                />
              </div>
              <Button type="submit" variant="hero" size="lg" className="w-full h-12 text-base rounded-xl" disabled={loading}>
                {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Send className="w-4 h-4 mr-2" />}
                {loading ? "Sending..." : "Send Inquiry"}
              </Button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col justify-center space-y-8">

            <div className="space-y-6">
              {contactInfo.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="flex items-center gap-5 p-5 rounded-2xl glass-content hover:bg-white/10 hover:border-primary/30 transition-all duration-300 group"
                >
                  <div className="w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <span className="text-xs font-medium text-white/70 uppercase tracking-wider block mb-1">
                      {item.label}
                    </span>
                    <span className="text-lg font-semibold text-white group-hover:text-primary transition-colors">
                      {item.value}
                    </span>
                  </div>
                </a>
              ))}
            </div>

            {/* Working Hours - Updated */}
            <div className="p-8 rounded-3xl glass-content relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <h4 className="font-display text-xl font-bold text-white mb-6 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Open Hours
              </h4>
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-4 border-b border-white/10">
                  <span className="text-base text-white/90">Mon - Sat</span>
                  <span className="font-mono text-base text-white font-medium">10:00 AM - 8:00 PM</span>
                </div>
                <div className="flex justify-between items-center text-white/70">
                  <span className="text-base">Sunday</span>
                  <span className="font-mono text-red-400/90 text-sm bg-red-400/20 px-2 py-0.5 rounded">Closed</span>
                </div>
              </div>
              <p className="mt-6 text-sm text-white/60 italic">
                * urgent support available via WhatsApp on Sundays
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

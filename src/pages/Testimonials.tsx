import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TestimonialsSection from "@/components/TestimonialsSection";
import VideoBackground from "@/components/VideoBackground";

const Testimonials = () => {
    return (
        <div className="min-h-screen relative overflow-x-hidden">
            <VideoBackground />
            <Header />
            <main className="pt-32 relative z-10">
                <TestimonialsSection />
            </main>
            <div className="relative z-10">
                <Footer />
            </div>
        </div>
    );
};

export default Testimonials;

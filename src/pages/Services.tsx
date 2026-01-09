import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ServicesSection from "@/components/ServicesSection";
import VideoBackground from "@/components/VideoBackground";

const Services = () => {
    return (
        <div className="min-h-screen relative overflow-x-hidden">
            <VideoBackground />
            <Header />
            <main className="pt-32 relative z-10">
                <ServicesSection />
            </main>
            <div className="relative z-10">
                <Footer />
            </div>
        </div>
    );
};

export default Services;

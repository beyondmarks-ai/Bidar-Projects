import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PricingSection from "@/components/PricingSection";
import VideoBackground from "@/components/VideoBackground";

const Pricing = () => {
    return (
        <div className="min-h-screen relative overflow-x-hidden">
            <VideoBackground />
            <Header />
            <main className="pt-32 relative z-10">
                <PricingSection />
            </main>
            <div className="relative z-10">
                <Footer />
            </div>
        </div>
    );
};

export default Pricing;

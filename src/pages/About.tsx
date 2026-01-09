import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhyUsSection from "@/components/WhyUsSection";
import VideoBackground from "@/components/VideoBackground";

const About = () => {
    return (
        <div className="min-h-screen relative overflow-x-hidden">
            <VideoBackground />
            <Header />
            <main className="pt-32 relative z-10">
                <WhyUsSection />
            </main>
            <div className="relative z-10">
                <Footer />
            </div>
        </div>
    );
};

export default About;

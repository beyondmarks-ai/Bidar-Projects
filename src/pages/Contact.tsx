import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactSection from "@/components/ContactSection";
import VideoBackground from "@/components/VideoBackground";

const Contact = () => {
    return (
        <div className="min-h-screen relative overflow-x-hidden">
            <VideoBackground />
            <Header />
            <main className="pt-32 relative z-10">
                <ContactSection />
            </main>
            <div className="relative z-10">
                <Footer />
            </div>
        </div>
    );
};

export default Contact;

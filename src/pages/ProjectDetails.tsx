import { useNavigate, useParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import VideoBackground from "@/components/VideoBackground";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { ExternalLink, Code2, Cpu, Fingerprint, User, ArrowLeft, CheckCircle, ShoppingCart, Lock, Tag, Copy } from "lucide-react";
import { projects } from "@/data/projects";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import paymentQr from "../assets/payment-qr.jpeg";

const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxZ_JjZtMdWjlF_BwZs21laxmXKIj17AVWyCHodmptzjPqvgsYae4hpbDZw8mZNZB0m/exec";

const ProjectDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [referralCode, setReferralCode] = useState("");
    const [isDiscountApplied, setIsDiscountApplied] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [generatedReferral, setGeneratedReferral] = useState("");
    const [isPurchasing, setIsPurchasing] = useState(false);
    const [transactionId, setTransactionId] = useState("");
    const [userEmail, setUserEmail] = useState("");

    // Find project by ID
    const project = projects.find(p => p.id === id);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (!project) {
        return (
            <div className="min-h-screen relative flex items-center justify-center">
                <VideoBackground />
                <div className="relative z-10 text-center glass-content p-10 rounded-3xl">
                    <h2 className="text-3xl font-bold text-white mb-4">Project Not Found</h2>
                    <Button onClick={() => navigate("/projects")} variant="outline">
                        Back to Library
                    </Button>
                </div>
            </div>
        );
    }

    if (project.isLocked) {
        return (
            <div className="min-h-screen relative flex items-center justify-center">
                <VideoBackground />
                <div className="relative z-10 text-center glass-content p-10 rounded-3xl border border-white/10 max-w-md mx-4">
                    <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 border border-white/10">
                        <Lock className="w-8 h-8 text-white/50" />
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-2">Project Coming Soon</h2>
                    <p className="text-white/60 mb-6 leading-relaxed">
                        This project is currently being developed and will be available soon. Check back later!
                    </p>
                    <Button onClick={() => navigate("/projects")} variant="outline" className="w-full border-white/10 hover:bg-white/10 text-white">
                        Back to Library
                    </Button>
                </div>
            </div>
        );
    }

    // parsing price
    const basePrice = parseInt(project.price.replace(/[₹,]/g, ""));
    const finalPrice = isDiscountApplied ? basePrice - 500 : basePrice;

    const handleApplyReferral = () => {
        if (referralCode.trim().length < 5) {
            toast.error("Invalid Code", { description: "Please enter a valid referral code." });
            return;
        }
        setIsDiscountApplied(true);
        toast.success("Code Applied!", { description: "₹500 Discount has been added." });
    };

    const handleBuy = () => {
        setShowPaymentModal(true);
    };

    const handlePaymentSubmit = async () => {
        if (!transactionId || !userEmail) {
            toast.error("Missing Details", { description: "Please enter your Email and Transaction ID." });
            return;
        }

        setIsPurchasing(true);

        const payload = {
            name: userEmail,
            contact: transactionId,
            domain: "Purchase",
            tech: project?.title || "Unknown Project",
            idea: `Price: ₹${finalPrice}, Referral: ${referralCode || "None"}`,
            link: "N/A"
        };

        try {
            await fetch(GOOGLE_SCRIPT_URL, {
                method: "POST",
                mode: "no-cors",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });
            toast.success("Payment Details Sent!", { description: "Your transaction is under verification." });
        } catch (error) {
            console.error("Sheet Error", error);
        }

        setIsPurchasing(false);
        setShowPaymentModal(false);

        const newCode = `BIDAR-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
        setGeneratedReferral(newCode);
        setShowSuccessModal(true);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(generatedReferral);
        toast.success("Copied!", { description: "Referral code copied to clipboard." });
    };

    return (
        <div className="min-h-screen relative overflow-x-hidden">
            <VideoBackground />
            <Header />

            <main className="pt-40 md:pt-48 pb-20 relative z-10 container mx-auto px-4 md:px-6">

                {/* Back Button */}
                <div className="flex items-center mb-12 animate-fade-in-up">
                    <Button
                        variant="ghost"
                        className="group pl-0 hover:bg-transparent hover:text-primary transition-colors text-white/60"
                        onClick={() => navigate("/projects")}
                    >
                        <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-primary/50 group-hover:bg-primary/10 transition-all mr-4 bg-white/5">
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        </div>
                        <span className="text-lg font-light tracking-wide">Back to Projects</span>
                    </Button>
                </div>

                <div className="grid lg:grid-cols-3 gap-10 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>

                    {/* Left Column: Details */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Title Block */}
                        <div className="glass-content p-8 rounded-3xl border border-white/10">
                            <Badge className="mb-4 bg-primary/20 text-primary border-primary/20">{project.category}</Badge>
                            <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
                                {project.title}
                            </h1>
                            <div className="flex items-center gap-3 text-white/60 mb-6">
                                <User className="w-5 h-5 text-primary" />
                                <span className="text-lg">Created by <span className="text-white font-medium">{project.author}</span></span>
                            </div>
                            <p className="font-body text-xl text-white/80 leading-relaxed">
                                {project.description}
                            </p>
                        </div>

                        {/* Tech Stack */}
                        <div className="glass-content p-8 rounded-3xl border border-white/10">
                            <h3 className="font-display text-2xl font-bold text-white mb-6 flex items-center gap-2">
                                <Code2 className="w-6 h-6 text-blue-400" /> Technologies Used
                            </h3>
                            <div className="flex flex-wrap gap-3">
                                {project.techStack.map(tech => (
                                    <span key={tech} className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white font-mono text-sm">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* How it Works & Features */}
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="glass-content p-8 rounded-3xl border border-white/10 h-full">
                                <h3 className="font-display text-xl font-bold text-white mb-4 flex items-center gap-2">
                                    <Cpu className="w-5 h-5 text-emerald-400" /> How It Works
                                </h3>
                                <p className="text-white/70 leading-relaxed">
                                    {project.howItWorks}
                                </p>
                            </div>
                            <div className="glass-content p-8 rounded-3xl border border-white/10 h-full">
                                <h3 className="font-display text-xl font-bold text-white mb-4 flex items-center gap-2">
                                    <Fingerprint className="w-5 h-5 text-purple-400" /> Unique Features
                                </h3>
                                <p className="text-white/70 leading-relaxed">
                                    {project.uniqueFeatures}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Pricing & Action */}
                    <div className="space-y-6">
                        <div className="glass-content p-8 rounded-3xl border border-white/10 sticky top-32">
                            <div className="text-center mb-8">
                                <span className="text-white/50 uppercase tracking-widest text-sm font-semibold">One-Time Price</span>
                                <div className="mt-2 mb-2 flex flex-col items-center">
                                    {isDiscountApplied && (
                                        <span className="text-lg text-white/40 line-through decoration-red-500 font-medium">₹{basePrice.toLocaleString()}</span>
                                    )}
                                    <span className="text-5xl font-bold text-white">
                                        ₹{finalPrice.toLocaleString()}
                                    </span>
                                </div>
                                {isDiscountApplied && (
                                    <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-400 border-emerald-500/50 mb-3">
                                        Referral Discount Applied (-₹500)
                                    </Badge>
                                )}
                                <span className="text-emerald-400 text-sm font-medium flex items-center justify-center gap-1">
                                    <CheckCircle className="w-3 h-3" /> Includes Source Code & Support
                                </span>
                            </div>

                            {/* Referral Input */}
                            <div className="mb-6 p-4 rounded-xl bg-white/5 border border-white/5">
                                <label className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-2 block flex items-center gap-1">
                                    <Tag className="w-3 h-3" /> Have a Referral Code?
                                </label>
                                <div className="flex gap-2">
                                    <Input
                                        placeholder="Enter Code"
                                        className="bg-black/20 border-white/10 text-white placeholder:text-white/20 h-9 text-sm"
                                        value={referralCode}
                                        onChange={(e) => setReferralCode(e.target.value)}
                                        disabled={isDiscountApplied}
                                    />
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        className="h-9 border-white/10 hover:bg-white/10 hover:text-white"
                                        onClick={handleApplyReferral}
                                        disabled={isDiscountApplied}
                                    >
                                        Apply
                                    </Button>
                                </div>
                            </div>

                            <div className="space-y-4 mb-8">
                                <Button
                                    className="w-full h-14 text-lg font-bold shadow-glow relative overflow-hidden"
                                    size="lg"
                                    onClick={handleBuy}
                                    disabled={isPurchasing}
                                >
                                    {isPurchasing && <div className="absolute inset-0 bg-white/20 animate-pulse" />}
                                    <ShoppingCart className="w-5 h-5 mr-2" />
                                    {isPurchasing ? "Processing..." : "Buy Now"}
                                </Button>
                                <Button variant="outline" className="w-full h-12 border-white/10 hover:bg-white/5 text-white">
                                    <ExternalLink className="w-4 h-4 mr-2" /> View Live Demo
                                </Button>
                            </div>

                            <div className="border-t border-white/10 pt-6 space-y-3">
                                <div className="flex items-center gap-3 text-sm text-white/70">
                                    <CheckCircle className="w-4 h-4 text-primary" />
                                    <span>Complete Documentation</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-white/70">
                                    <CheckCircle className="w-4 h-4 text-primary" />
                                    <span>Installation Support</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-white/70">
                                    <CheckCircle className="w-4 h-4 text-primary" />
                                    <span>Viva Questions & Answers</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-white/70">
                                    <Lock className="w-4 h-4 text-primary" />
                                    <span>Secure Payment</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </main>

            {/* Payment Modal */}
            <Dialog open={showPaymentModal} onOpenChange={setShowPaymentModal}>
                <DialogContent className="sm:max-w-md border-white/10 bg-black/90 backdrop-blur-xl text-white shadow-2xl rounded-3xl">
                    <DialogHeader className="flex flex-col items-center text-center">
                        <div className="h-12 w-12 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                            <Lock className="w-6 h-6 text-primary" />
                        </div>
                        <DialogTitle className="text-xl font-display font-bold text-white">Secure Payment</DialogTitle>
                        <DialogDescription className="text-white/60">
                            Scan the QR code to pay <span className="text-white font-bold">₹{finalPrice.toLocaleString()}</span>
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-6 mt-2">
                        {/* QR Code Display */}
                        <div className="flex justify-center">
                            <div className="w-64 h-64 bg-white p-2 rounded-xl flex items-center justify-center shadow-lg">
                                <img src={paymentQr} alt="Payment QR Code" className="w-full h-full object-contain rounded-lg" />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-xs font-semibold text-white/50 uppercase tracking-wider">Your Email</label>
                                <Input
                                    placeholder="e.g. yourname@gmail.com"
                                    className="bg-white/5 border-white/10 text-white placeholder:text-white/20"
                                    value={userEmail}
                                    onChange={(e) => setUserEmail(e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-semibold text-white/50 uppercase tracking-wider">Transaction ID / UTR</label>
                                <Input
                                    placeholder="e.g. 3344XXXXXXXX"
                                    className="bg-white/5 border-white/10 text-white placeholder:text-white/20"
                                    value={transactionId}
                                    onChange={(e) => setTransactionId(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    <DialogFooter className="mt-4">
                        <Button
                            className="w-full bg-primary text-black hover:bg-primary/90 font-bold h-12"
                            onClick={handlePaymentSubmit}
                            disabled={isPurchasing}
                        >
                            {isPurchasing ? "Verifying..." : "Verify Payment"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Success/Verification Modal */}
            <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
                <DialogContent className="sm:max-w-md border-white/10 bg-black/90 backdrop-blur-xl text-white shadow-2xl rounded-3xl">
                    <DialogHeader className="flex flex-col items-center text-center">
                        <div className="h-16 w-16 bg-emerald-500/20 rounded-full flex items-center justify-center mb-4">
                            <CheckCircle className="w-8 h-8 text-emerald-400" />
                        </div>
                        <DialogTitle className="text-2xl font-display font-bold text-white mb-2">Payment Submitted!</DialogTitle>
                        <DialogDescription className="text-white/60">
                            We have received your transaction details.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="bg-gradient-to-br from-primary/10 to-purple-500/10 p-6 rounded-2xl border border-white/10 mt-4 text-center">
                        <h4 className="text-lg font-bold text-white mb-2">Verification in Progress</h4>
                        <p className="text-white/70 mb-4 leading-relaxed">
                            Please don't take tension! We verify all payments manually to ensure security. This usually takes <strong>up to 24 hours</strong>.
                        </p>
                        <p className="text-white/70 text-sm">
                            Once verified, we will email the complete project files to <span className="text-primary font-medium">{userEmail}</span>.
                        </p>

                        <div className="mt-6 pt-6 border-t border-white/10">
                            <h4 className="text-sm font-semibold text-white/50 uppercase tracking-widest mb-3">Your Referral Code</h4>
                            <div className="flex items-center gap-2 justify-center">
                                <code className="text-xl font-mono font-bold text-primary bg-black/30 px-3 py-1 rounded-lg border border-primary/30 tracking-widest">
                                    {generatedReferral}
                                </code>
                                <Button size="icon" variant="ghost" className="h-10 w-10 hover:bg-white/10 rounded-lg" onClick={copyToClipboard}>
                                    <Copy className="w-4 h-4 text-white/70" />
                                </Button>
                            </div>
                            <p className="text-[10px] text-white/30 mt-2">
                                Share this while you wait. Friends get ₹500 OFF!
                            </p>
                        </div>
                    </div>

                    <DialogFooter>
                        <Button className="w-full bg-white text-black hover:bg-white/90 font-bold" onClick={() => setShowSuccessModal(false)}>
                            Close & Relax
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <div className="relative z-10">
                <Footer />
            </div>
        </div>
    );
};

export default ProjectDetails;

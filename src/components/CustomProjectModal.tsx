import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { Loader2, Send, Sparkles, Upload } from "lucide-react";
import { toast } from "sonner";

// RESOURCE: Follow 'GUIDE_CONNECT_GOOGLE_SHEETS.md' to get this URL.
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxZ_JjZtMdWjlF_BwZs21laxmXKIj17AVWyCHodmptzjPqvgsYae4hpbDZw8mZNZB0m/exec";

interface CustomProjectModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const CustomProjectModal = ({ isOpen, onClose }: CustomProjectModalProps) => {
    const [loading, setLoading] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        name: "",
        contact: "",
        domain: "",
        tech: "",
        idea: "",
        link: ""
    });
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            // Validating size (e.g., limit to 5MB for GAS stability)
            if (file.size > 5 * 1024 * 1024) {
                toast.error("File is too large", { description: "Please upload a file smaller than 5MB or use a Drive link." });
                return;
            }
            setSelectedFile(file);
            toast.success("File attached", { description: file.name });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (GOOGLE_SCRIPT_URL === "YOUR_WEB_APP_URL_HERE") {
            toast.error("Configuration Error", { description: "Please set the Google Script URL in the code first (See Guide)." });
            return;
        }

        setLoading(true);

        try {
            let fileData = "";
            let fileName = "";
            let mimeType = "";

            // 1. Convert File to Base64 if exists
            if (selectedFile) {
                const reader = new FileReader();
                fileData = await new Promise((resolve) => {
                    reader.onload = (e) => {
                        const result = e.target?.result as string;
                        // split to get only base64 part
                        resolve(result.split(',')[1]);
                    };
                    reader.readAsDataURL(selectedFile);
                });
                fileName = selectedFile.name;
                mimeType = selectedFile.type;
            }

            // 2. Prepare Payload
            const payload = {
                ...formData,
                fileData,
                fileName,
                mimeType
            };

            // 3. Send to Google Apps Script
            // mode: 'no-cors' is required to post to Google Scripts from client-side without complex CORS setup.
            // Limitation: We cannot read the response JSON, so we assume success if no network error throws.
            await fetch(GOOGLE_SCRIPT_URL, {
                method: "POST",
                mode: "no-cors",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload)
            });

            toast.success("Request Sent Successfully!", {
                description: "We have received your requirements and will contact you shortly."
            });

            // Reset form
            setFormData({ name: "", contact: "", domain: "", tech: "", idea: "", link: "" });
            setSelectedFile(null);
            onClose();

        } catch (error) {
            console.error(error);
            toast.error("Submission Failed", { description: "Please try again or contact us directly." });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[600px] border-white/10 bg-black/90 backdrop-blur-xl text-white shadow-2xl p-0 overflow-hidden rounded-3xl max-h-[90vh] overflow-y-auto scrollbar-hide">

                {/* Animated Header */}
                <div className="relative bg-gradient-to-r from-primary/20 via-primary/5 to-transparent p-6 border-b border-white/10">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 rounded-lg bg-primary/20 border border-primary/20 shadow-glow">
                            <Sparkles className="w-5 h-5 text-primary" />
                        </div>
                        <DialogTitle className="text-2xl font-display font-bold text-white tracking-tight">
                            Request Custom Project
                        </DialogTitle>
                    </div>
                    <DialogDescription className="text-white/60">
                        Turn your innovative idea into reality. Fill in the details below.
                    </DialogDescription>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">

                        {/* Name */}
                        <div className="space-y-2">
                            <Label htmlFor="name" className="text-xs font-semibold uppercase tracking-wider text-white/50">Full Name</Label>
                            <Input
                                id="name"
                                required
                                placeholder="John Doe"
                                className="bg-white/5 border-white/10 text-white placeholder:text-white/20 focus:border-primary/50"
                                value={formData.name}
                                onChange={(e) => handleInputChange("name", e.target.value)}
                            />
                        </div>

                        {/* Contact */}
                        <div className="space-y-2">
                            <Label htmlFor="contact" className="text-xs font-semibold uppercase tracking-wider text-white/50">WhatsApp / Phone</Label>
                            <Input
                                id="contact"
                                required
                                type="tel"
                                placeholder="+91 99999..."
                                className="bg-white/5 border-white/10 text-white placeholder:text-white/20 focus:border-primary/50"
                                value={formData.contact}
                                onChange={(e) => handleInputChange("contact", e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Project Domain */}
                    <div className="space-y-2">
                        <Label htmlFor="domain" className="text-xs font-semibold uppercase tracking-wider text-white/50">Project Domain</Label>
                        <Select required onValueChange={(val) => handleInputChange("domain", val)}>
                            <SelectTrigger className="bg-white/5 border-white/10 text-white focus:border-primary/50 h-11">
                                <SelectValue placeholder="Select Application Type" />
                            </SelectTrigger>
                            <SelectContent className="bg-black/95 border-white/10 text-white">
                                <SelectItem value="ai">AI / Machine Learning</SelectItem>
                                <SelectItem value="web">Web Application (Full Stack)</SelectItem>
                                <SelectItem value="mobile">Mobile App (Android/iOS)</SelectItem>
                                <SelectItem value="iot">IoT & Hardware</SelectItem>
                                <SelectItem value="blockchain">Blockchain / Web3</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Tech Stack Preference */}
                    <div className="space-y-2">
                        <Label htmlFor="tech" className="text-xs font-semibold uppercase tracking-wider text-white/50">Preferred Technologies (Optional)</Label>
                        <Input
                            id="tech"
                            placeholder="e.g. Python, React, Flutter..."
                            className="bg-white/5 border-white/10 text-white placeholder:text-white/20 focus:border-primary/50"
                            value={formData.tech}
                            onChange={(e) => handleInputChange("tech", e.target.value)}
                        />
                    </div>

                    {/* Project Idea */}
                    <div className="space-y-2">
                        <Label htmlFor="idea" className="text-xs font-semibold uppercase tracking-wider text-white/50">Project Concept / Idea</Label>
                        <Textarea
                            id="idea"
                            required
                            placeholder="Describe your project idea in detail. What problem does it solve? What features do you need?"
                            className="min-h-[100px] bg-white/5 border-white/10 text-white placeholder:text-white/20 focus:border-primary/50 resize-none leading-relaxed"
                            value={formData.idea}
                            onChange={(e) => handleInputChange("idea", e.target.value)}
                        />
                    </div>

                    {/* File Upload & Link */}
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="file" className="text-xs font-semibold uppercase tracking-wider text-white/50">Upload Requirements</Label>
                            <div className="relative group cursor-pointer">
                                <Input
                                    id="file"
                                    type="file"
                                    accept=".pdf,.txt,.doc,.docx"
                                    className="absolute inset-0 opacity-0 cursor-pointer z-10 h-11"
                                    onChange={handleFileChange}
                                />
                                <div className={`h-11 w-full bg-white/5 border border-dashed rounded-md flex items-center justify-center text-sm transition-all ${selectedFile ? 'border-primary text-primary bg-primary/10' : 'border-white/20 text-white/40 group-hover:border-primary/50 group-hover:bg-white/10'}`}>
                                    <span className="flex items-center gap-2 truncate px-2">
                                        <Upload className="w-4 h-4 flexible-shrink-0" />
                                        {selectedFile ? selectedFile.name : "Choose File (PDF/TXT)"}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="link" className="text-xs font-semibold uppercase tracking-wider text-white/50">Or Paste Link (Drive/Docs)</Label>
                            <Input
                                id="link"
                                placeholder="https://..."
                                className="bg-white/5 border-white/10 text-white placeholder:text-white/20 focus:border-primary/50"
                                value={formData.link}
                                onChange={(e) => handleInputChange("link", e.target.value)}
                            />
                        </div>
                    </div>

                    <DialogFooter className="pt-2">
                        <Button type="button" variant="ghost" onClick={onClose} className="hover:bg-white/10 text-white/70">
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={loading}
                            className="bg-primary text-black hover:bg-primary/90 font-bold px-8 shadow-glow"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Uploading...
                                </>
                            ) : (
                                <>
                                    Submit Request <Send className="w-4 h-4 ml-2" />
                                </>
                            )}
                        </Button>
                    </DialogFooter>
                </form>

            </DialogContent>
        </Dialog>
    );
};

export default CustomProjectModal;

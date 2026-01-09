import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import VideoBackground from "@/components/VideoBackground";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Code2, Fingerprint, Search, ArrowRight, Lock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { projects } from "@/data/projects";
import { Link } from "react-router-dom";

const Projects = () => {
    const [filter, setFilter] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");

    const categories = ["All", "AI Projects", "Custom Build", "Small"];

    const filteredProjects = projects.filter((project) => {
        const matchesCategory = filter === "All" || project.category === filter;
        const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            project.techStack.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="min-h-screen relative overflow-x-hidden">
            <VideoBackground />
            <Header />

            <main className="pt-32 pb-20 relative z-10 container mx-auto px-4 md:px-6">

                {/* Page Header */}
                <div className="text-center max-w-4xl mx-auto mb-12 animate-fade-in-up">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-6">
                        <span className="text-xs font-medium text-white/90 tracking-wide uppercase">
                            100+ Projects Library
                        </span>
                    </div>
                    <h1 className="font-display text-4xl md:text-6xl font-bold text-white mb-6">
                        Browse Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">Exclusive Collection</span>
                    </h1>
                    <p className="font-body text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
                        From easy mini-projects to complex enterprise AI systems. Select your category below.
                    </p>
                </div>

                {/* Filters & Search */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12 max-w-6xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.1s" }}>

                    {/* Category Tabs */}
                    <div className="flex flex-wrap gap-2 justify-center">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setFilter(cat)}
                                className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 border ${filter === cat
                                    ? "bg-primary text-white border-primary shadow-glow scale-105"
                                    : "bg-white/5 text-white/70 border-white/10 hover:bg-white/10 hover:text-white"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Search Bar */}
                    <div className="relative w-full md:w-80 group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50 group-focus-within:text-primary transition-colors" />
                        <Input
                            placeholder="Search projects..."
                            className="pl-10 h-11 bg-white/5 border-white/10 rounded-full text-white placeholder:text-white/40 focus:border-primary/50 focus:ring-0 transition-all"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                {/* Projects Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProjects.map((project, index) => (
                        <Link
                            to={project.isLocked ? "#" : `/project/${project.id}`}
                            key={project.id}
                            onClick={(e) => {
                                if (project.isLocked) {
                                    e.preventDefault();
                                }
                            }}
                            className="group block h-full animate-fade-in-up relative"
                            style={{ animationDelay: `${(index % 6) * 0.05}s` }}
                        >
                            <div className={`rounded-3xl glass-content p-8 transition-all duration-300 border border-white/10 flex flex-col h-full hover:scale-[1.02] hover:shadow-xl cursor-pointer relative overflow-hidden ${project.isLocked ? "grayscale opacity-80 cursor-not-allowed hover:scale-100" : "hover:bg-white/10"}`}>

                                {project.isLocked && (
                                    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-[2px]">
                                        <div className="bg-black/90 p-4 rounded-2xl border border-white/10 flex flex-col items-center text-center shadow-2xl transform transition-transform group-hover:scale-110">
                                            <Lock className="w-8 h-8 text-white mb-2" />
                                            <span className="text-xs font-bold text-white uppercase tracking-widest">Coming Soon</span>
                                        </div>
                                    </div>
                                )}

                                {/* Hover Glow Effect - Disable if locked */}
                                {!project.isLocked && (
                                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                                )}

                                {/* Category Badge & Code Icon */}
                                <div className="mb-6 flex justify-between items-start relative z-10">
                                    <Badge variant="outline" className={`backdrop-blur-md border-opacity-30 ${project.category === 'AI Projects' ? 'bg-purple-500/10 text-purple-400 border-purple-500' :
                                        project.category === 'Custom Build' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500' :
                                            'bg-blue-500/10 text-blue-400 border-blue-500'
                                        }`}>
                                        {project.category}
                                    </Badge>
                                    <div className="p-2 rounded-full bg-white/5 border border-white/10 group-hover:bg-primary group-hover:border-primary transition-colors">
                                        <ArrowRight className="w-5 h-5 text-white/60 group-hover:text-white -rotate-45 group-hover:rotate-0 transition-all duration-300" />
                                    </div>
                                </div>

                                {/* Title */}
                                <h3 className="font-display text-2xl font-bold text-white mb-3 group-hover:text-primary transition-colors line-clamp-1 relative z-10">
                                    {project.title}
                                </h3>

                                {/* How it Works / Desc - limited lines */}
                                <p className="font-body text-base text-white/80 leading-relaxed mb-6 line-clamp-2 min-h-[3rem] relative z-10">
                                    {project.howItWorks}
                                </p>

                                {/* Unique Features */}
                                <div className="mb-6 flex-grow relative z-10">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Fingerprint className="w-4 h-4 text-primary/70" />
                                        <span className="text-xs font-semibold text-white/50 uppercase tracking-wider">Features</span>
                                    </div>
                                    <p className="font-body text-sm text-white/60 leading-snug">
                                        {project.uniqueFeatures}
                                    </p>
                                </div>

                                {/* Divider */}
                                <div className="h-px w-full bg-white/10 mb-5 relative z-10" />

                                {/* Footer Info: Tech & Button */}
                                <div className="space-y-4 relative z-10">
                                    <div className="flex flex-wrap gap-2">
                                        {project.techStack.slice(0, 3).map((tech) => (
                                            <span key={tech} className="text-[10px] font-bold uppercase tracking-wider text-white/50 bg-white/5 px-2 py-1 rounded border border-white/5">
                                                {tech}
                                            </span>
                                        ))}
                                        {project.techStack.length > 3 && (
                                            <span className="text-[10px] text-white/40 px-1 py-1">+</span>
                                        )}
                                    </div>

                                    <div className="flex items-center justify-between pt-2">
                                        <span className="text-xs text-white/40 font-light">By {project.author}</span>
                                        <span className="text-xs font-bold text-primary flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                                            {project.isLocked ? "Locked" : "View Details"} <ArrowRight className="w-3 h-3" />
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}

                    {filteredProjects.length === 0 && (
                        <div className="col-span-full py-20 text-center text-white/50">
                            <Search className="w-12 h-12 mx-auto mb-4 opacity-20" />
                            <p>No projects found matching your criteria.</p>
                        </div>
                    )}
                </div>

                {/* Load More Hint */}
                {filteredProjects.length > 0 && (
                    <div className="mt-16 text-center animate-pulse">
                        <p className="text-sm text-white/40 uppercase tracking-widest">
                            Scroll for more / New projects added weekly
                        </p>
                    </div>
                )}

            </main>
            <div className="relative z-10">
                <Footer />
            </div>
        </div>
    );
};

export default Projects;

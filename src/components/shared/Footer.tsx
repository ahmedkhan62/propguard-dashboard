import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
    TrendingUp,
    Twitter,
    Linkedin,
    Github,
    ChevronRight,
    Mail,
} from "lucide-react";

export const Footer = () => {
    return (
        <footer id="footer" className="relative z-10 border-t border-border/50 pt-20 pb-12 bg-background/50 backdrop-blur-sm">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
                    <div className="lg:col-span-4 flex flex-col items-start gap-6">
                        <Link to="/" className="flex items-center gap-3 group">
                            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-all">
                                <TrendingUp className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
                            </div>
                            <div className="flex flex-col">
                                <span className="font-black text-2xl text-foreground tracking-tight leading-none">RiskLock</span>
                                <span className="text-[10px] text-primary font-bold tracking-[0.2em] uppercase mt-1">Professional</span>
                            </div>
                        </Link>
                        <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
                            The world's most advanced risk management and discipline enforcement platform for serious prop firm traders.
                        </p>
                        <div className="flex items-center gap-3">
                            <a href="#" className="w-10 h-10 rounded-xl bg-secondary/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all">
                                <Twitter className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-xl bg-secondary/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all">
                                <Linkedin className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-xl bg-secondary/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all">
                                <Github className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    <div className="lg:col-span-2 flex flex-col gap-4">
                        <span className="font-black text-sm text-foreground uppercase tracking-[0.15em]">Product</span>
                        <div className="flex flex-col gap-3">
                            <Link to="/features" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group">
                                <ChevronRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                                Risk Monitoring
                            </Link>
                            <Link to="/features" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group">
                                <ChevronRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                                AI Insights
                            </Link>
                            <Link to="/news" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group">
                                <ChevronRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                                News Protection
                            </Link>
                            <Link to="/pricing" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group">
                                <ChevronRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                                Pricing
                            </Link>
                        </div>
                    </div>

                    <div className="lg:col-span-2 flex flex-col gap-4">
                        <span className="font-black text-sm text-foreground uppercase tracking-[0.15em]">Resources</span>
                        <div className="flex flex-col gap-3">
                            <Link to="/how-it-works" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group">
                                <ChevronRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                                How It Works
                            </Link>
                            <Link to="/help" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group">
                                <ChevronRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                                Help Center
                            </Link>
                            <Link to="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group">
                                <ChevronRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                                Contact Support
                            </Link>
                            <Link to="/security" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group">
                                <ChevronRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                                Security & Trust
                            </Link>
                        </div>
                    </div>

                    <div className="lg:col-span-4 flex flex-col gap-4">
                        <span className="font-black text-sm text-foreground uppercase tracking-[0.15em]">Newsletter</span>
                        <p className="text-sm text-muted-foreground leading-relaxed">Get weekly risk management tips and platform updates.</p>
                        <div className="flex gap-2">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="bg-secondary/50 border border-border/50 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 w-full transition-all"
                            />
                            <Button variant="hero" className="px-4 h-auto"><Mail className="w-4 h-4" /></Button>
                        </div>
                    </div>
                </div>

                <div className="border-t border-border/50 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="text-muted-foreground text-xs font-medium">
                        © 2025 RiskLock. All rights reserved. Built for professional traders.
                    </div>
                    <div className="flex items-center gap-6">
                        <Link to="/terms" className="text-xs font-medium text-muted-foreground hover:text-primary transition-colors">Terms</Link>
                        <Link to="/privacy" className="text-xs font-medium text-muted-foreground hover:text-primary transition-colors">Privacy</Link>
                        <Link to="/disclaimer" className="text-xs font-medium text-muted-foreground hover:text-primary transition-colors">Disclaimer</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Gift, Sparkles, Copy, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ApiService } from "@/services/api";

export default function OfferPopup() {
    const [isOpen, setIsOpen] = useState(false);
    const [refCode, setRefCode] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            const sessionSeen = sessionStorage.getItem("sessionReferralSeen");

            if (!sessionSeen) {
                setIsOpen(true);
                sessionStorage.setItem("sessionReferralSeen", "true");
                fetchReferralCode();
            }
        }, 1500);

        return () => clearTimeout(timer);
    }, []);

    const fetchReferralCode = async () => {
        try {
            const stats = await ApiService.getReferralStats();
            if (stats?.code) setRefCode(stats.code);
        } catch (e) {
            /* ignore if not logged in */
        }
    };

    const copyLink = () => {
        if (!refCode) return;
        const url = `${window.location.origin}/signup?ref=${refCode}`;
        navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsOpen(false)}
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                    />

                    {/* Popup - LARGER */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative w-full max-w-2xl bg-background/95 backdrop-blur-xl border border-primary/20 rounded-3xl overflow-hidden shadow-2xl"
                    >
                        {/* Decorative Background - Matching Theme */}
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-purple-500/20 pointer-events-none" />
                        <div className="absolute top-0 right-0 p-12 opacity-10 transform translate-x-1/2 -translate-y-1/2 pointer-events-none">
                            <Sparkles className="w-64 h-64 text-primary" />
                        </div>

                        <div className="relative z-10 p-10 md:p-14 text-center">
                            <button
                                onClick={() => setIsOpen(false)}
                                className="absolute top-4 right-4 p-2 rounded-full hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>

                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", delay: 0.2 }}
                                className="w-28 h-28 mx-auto bg-gradient-to-br from-primary to-purple-600 rounded-full flex items-center justify-center mb-8 shadow-glow-md relative"
                            >
                                <Gift className="w-14 h-14 text-primary-foreground" />
                                <div className="absolute -top-2 -right-2 w-8 h-8 bg-status-warning rounded-full flex items-center justify-center text-xs font-black animate-bounce">
                                    50%
                                </div>
                            </motion.div>

                            <h2 className="text-4xl md:text-5xl font-black text-foreground mb-6 leading-tight">
                                Wait! Get <span className="gradient-text">50% OFF</span> <br />
                                For Life.
                            </h2>

                            <p className="text-xl text-muted-foreground mb-10 max-w-lg mx-auto font-medium leading-relaxed">
                                Invite just <strong className="text-primary">5 trader friends</strong> to RiskLock and we'll slash your subscription price in half. <span className="text-foreground font-bold">Forever.</span>
                            </p>

                            <div className="space-y-4">
                                {refCode ? (
                                    <div className="glass-card p-3 flex items-center border-primary/20 gap-2">
                                        <code className="flex-1 font-mono text-sm text-foreground truncate text-left bg-secondary/30 px-4 py-3 rounded-lg">
                                            {window.location.host}/signup?ref={refCode}
                                        </code>
                                        <Button
                                            size="lg"
                                            onClick={copyLink}
                                            className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold shrink-0"
                                        >
                                            <Copy className="w-4 h-4 mr-2" />
                                            {copied ? "Copied!" : "Copy"}
                                        </Button>
                                    </div>
                                ) : (
                                    <Button
                                        onClick={() => (window.location.href = "/login")}
                                        variant="hero"
                                        size="xl"
                                        className="w-full h-16 text-lg font-black"
                                    >
                                        Login to Get Your Link <ArrowRight className="w-5 h-5 ml-2" />
                                    </Button>
                                )}

                                {refCode && (
                                    <Button onClick={() => setIsOpen(false)} variant="ghost" className="text-muted-foreground hover:text-foreground">
                                        Maybe Later
                                    </Button>
                                )}
                            </div>

                            <p className="mt-8 text-xs text-muted-foreground">
                                0/5 friends referred • Unlimited potential
                            </p>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
    Mail,
    MessageSquare,
    ArrowRight,
    Clock,
    Shield,
    LifeBuoy,
} from "lucide-react";

export default function Contact() {
    return (
        <div className="pt-12">

            {/* Hero Section */}
            <section className="relative min-h-[60vh] flex items-center z-10 container mx-auto px-4">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 blur-[120px] rounded-full pointer-events-none -z-10" />

                <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="max-w-4xl mx-auto text-center relative"
                >
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] md:text-xs font-bold mb-10 shadow-glow-sm backdrop-blur-md uppercase tracking-widest"
                    >
                        <LifeBuoy className="w-3 h-3" />
                        Contact Support
                    </motion.div>

                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-foreground mb-8 leading-[1.1] tracking-tight">
                        We're Here to <span className="gradient-text">Help</span>
                    </h1>

                    <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed font-medium">
                        Have questions about RiskLock? Our professional support team is dedicated to ensuring you have everything you need to trade safely.
                    </p>
                </motion.div>
            </section>

            {/* Contact Options */}
            <section className="relative z-10 container mx-auto px-4 py-20 mb-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {/* Contact Form */}
                    <motion.div
                        initial={{ x: -30, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        className="glass-card p-8 md:p-10"
                    >
                        <h2 className="text-2xl font-black text-foreground mb-6">Send us a Message</h2>
                        <form className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Full Name</label>
                                <input
                                    type="text"
                                    placeholder="John Doe"
                                    className="w-full h-12 px-4 rounded-xl bg-secondary/50 border border-border/50 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none transition-all placeholder:text-muted-foreground/50"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Email Address</label>
                                <input
                                    type="email"
                                    placeholder="john@example.com"
                                    className="w-full h-12 px-4 rounded-xl bg-secondary/50 border border-border/50 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none transition-all placeholder:text-muted-foreground/50"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Message</label>
                                <textarea
                                    placeholder="How can we help you?"
                                    rows={4}
                                    className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border/50 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none transition-all placeholder:text-muted-foreground/50 resize-none"
                                />
                            </div>
                            <Button variant="hero" className="w-full h-14 text-lg">
                                Send Message
                            </Button>
                        </form>
                    </motion.div>

                    {/* Contact Info & Meta */}
                    <div className="space-y-8">
                        <motion.div
                            initial={{ x: 30, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            className="glass-card p-8"
                        >
                            <h2 className="text-2xl font-black text-foreground mb-6">Support Channels</h2>
                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                                        <Mail className="w-6 h-6 text-primary" />
                                    </div>
                                    <div>
                                        <div className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Email Us</div>
                                        <div className="text-lg font-bold text-foreground">support@risklock.ai</div>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                                        <MessageSquare className="w-6 h-6 text-primary" />
                                    </div>
                                    <div>
                                        <div className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Live Chat</div>
                                        <div className="text-lg font-bold text-foreground">Available Mon - Fri, 9am - 6pm EST</div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ y: 30, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            className="glass-card p-8 bg-primary/5 border-primary/20"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <Clock className="w-5 h-5 text-primary" />
                                <h3 className="text-lg font-black text-foreground">Response Time</h3>
                            </div>
                            <p className="text-muted-foreground leading-relaxed">
                                We typically respond to all inquiries within <strong className="text-primary">2-4 business hours</strong>. Complex technical issues may take up to 24 hours.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ y: 30, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            className="p-6 rounded-2xl bg-secondary/30 border border-border/50"
                        >
                            <div className="flex items-start gap-3">
                                <Shield className="w-5 h-5 text-status-safe shrink-0 mt-0.5" />
                                <div>
                                    <div className="font-bold text-foreground text-sm">Priority Support</div>
                                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                                        Elite and Ultra tier members receive priority queuing and dedicated account managers.
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    );
}

import { motion } from "framer-motion";
import {
    Users,
    ShieldCheck,
    Target,
    Activity,
    Globe,
    Users2,
    Code2,
    Server,
    Heart,
    TrendingUp,
    ArrowRight,
    ShieldAlert
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const teamValues = [
    {
        icon: ShieldCheck,
        title: "Uncompromising Integrity",
        description: "In an industry filled with hype, we lead with technical proof and absolute transparency."
    },
    {
        icon: Target,
        title: "Trader-First Vision",
        description: "Every feature is built to solve actual trading problems encountered in high-stakes environments."
    },
    {
        icon: Activity,
        title: "Engineering Excellence",
        description: "Our platform is maintained by specialists in low-latency risk engines and secure distributed systems."
    }
];

const teamSpecialists = [
    { icon: Users2, role: "Professional Traders", focus: "Strategy & Performance" },
    { icon: Code2, role: "Backend Engineers", focus: "Architecture & Security" },
    { icon: ShieldCheck, role: "Risk Specialists", focus: "Compliance & Safety" },
    { icon: Server, role: "Infrastructure Ops", focus: "Reliability & Uptime" },
];

export default function About() {
    return (
        <div className="pt-12">
            {/* Hero Section - The Origin */}
            <section className="container mx-auto px-4 mb-32 relative min-h-[80vh] flex flex-col justify-center items-center">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 blur-[120px] rounded-full pointer-events-none -z-10" />
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="max-w-4xl mx-auto text-center"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] md:text-xs font-bold mb-10 shadow-glow-sm backdrop-blur-md uppercase tracking-widest">
                        <Heart className="w-3 h-3" />
                        Our Mission
                    </div>
                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-foreground mb-8 leading-[1.1] tracking-tight">
                        Built by a Vision, <br />
                        <span className="gradient-text uppercase">Scaled by Experts.</span>
                    </h1>
                    <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed font-medium">
                        RiskLock began as one trader's survival tool. Today, it's a global institutional-standard platform maintained by a dedicated team of specialists.
                    </p>
                </motion.div>
            </section>

            {/* The Narrative Reveal - Hook Section */}
            <section className="container mx-auto px-4 py-32 border-y border-border/50 relative">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full -z-10" />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
                    <motion.div
                        initial={{ x: -30, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl md:text-5xl font-black text-foreground mb-8 leading-tight">
                            The Insight That <br />
                            <span className="text-primary uppercase tracking-wider">Changed Everything.</span>
                        </h2>
                        <div className="space-y-6 text-lg text-muted-foreground font-medium leading-relaxed">
                            <p>
                                In 2022, our founder—a full-time professional trader—lost his third funded account in a single day. Not because of a bad strategy, but because of a single hour of emotional instability.
                            </p>
                            <p>
                                He realized that thousands of traders were failing for the same reason: they had the skill, but lacked the technological boundary to enforce discipline.
                            </p>
                            <blockquote className="border-l-4 border-primary pl-6 py-2 text-foreground italic text-xl font-bold bg-primary/5 rounded-r-2xl">
                                "Technical skill is irrelevant if you cannot bridge the gap between human emotion and disciplined execution."
                            </blockquote>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <div className="glass-card p-12 relative overflow-hidden group">
                            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="w-20 h-20 rounded-3xl bg-primary/10 flex items-center justify-center mb-8 ring-2 ring-primary/20">
                                <ShieldAlert className="w-10 h-10 text-primary" />
                            </div>
                            <h3 className="text-2xl font-black text-foreground mb-4 italic">"RiskLock wasn't built for a IPO. It was built for survival."</h3>
                            <p className="text-muted-foreground font-medium leading-relaxed mb-6">
                                When the first version of RiskLock was deployed, it wasn't a product for sale. It was a private system designed to keep a professional trader in the game. It worked so well that it became a moral obligation to share it with the world.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* The Transition Section - Team Pivot */}
            <section className="container mx-auto px-4 py-32 text-center">
                <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto mb-20"
                >
                    <h2 className="text-4xl md:text-6xl font-black text-foreground mb-8">Professional <span className="gradient-text uppercase">Engineering</span></h2>
                    <p className="text-xl text-muted-foreground leading-relaxed font-medium">
                        While the vision was born from a trader's pain, the reliability of RiskLock is guaranteed by a multi-disciplinary team of experts working 24/7.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
                    {teamSpecialists.map((spec, i) => (
                        <motion.div
                            key={spec.role}
                            initial={{ y: 20, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="glass-card p-8 flex flex-col items-center group hover:border-primary/50 transition-all"
                        >
                            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <spec.icon className="w-8 h-8 text-primary" />
                            </div>
                            <h4 className="text-xl font-black text-foreground mb-2 uppercase tracking-wide">{spec.role}</h4>
                            <p className="text-sm font-bold text-primary">{spec.focus}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Core Values Section */}
            <section className="bg-secondary/20 py-32 border-y border-border/50">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
                        {teamValues.map((value, i) => (
                            <motion.div
                                key={value.title}
                                initial={{ y: 30, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                                    <value.icon className="w-7 h-7 text-primary" />
                                </div>
                                <h3 className="text-2xl font-black text-foreground mb-4">{value.title}</h3>
                                <p className="text-muted-foreground leading-relaxed font-medium">{value.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Reliability Commitment */}
            <section className="container mx-auto px-4 py-32">
                <div className="glass-card p-12 lg:p-24 max-w-6xl mx-auto overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 blur-[120px] rounded-full -z-10" />

                    <div className="flex flex-col lg:flex-row items-center gap-16">
                        <div className="flex-1">
                            <h2 className="text-4xl lg:text-5xl font-black text-foreground mb-8 leading-tight tracking-tight">
                                Institutional <br />
                                <span className="gradient-text uppercase">Grade Reliability</span>
                            </h2>
                            <div className="space-y-6 text-lg text-muted-foreground font-medium leading-relaxed mb-10">
                                <p>
                                    RiskLock isn't a hobby project. It's an enterprise-grade SaaS infrastructure designed for extreme reliability. We maintain 99.9% uptime and active monitoring of all rule-engine cycles.
                                </p>
                                <p>
                                    Our commitment is simple: We protect you, so you can trade. Every second, every tick, every day.
                                </p>
                            </div>
                            <div className="grid grid-cols-2 gap-8">
                                <div>
                                    <div className="text-3xl font-black text-primary mb-1 uppercase tracking-tighter">24/7</div>
                                    <div className="text-sm font-bold text-foreground">Active Monitoring</div>
                                </div>
                                <div>
                                    <div className="text-3xl font-black text-primary mb-1 uppercase tracking-tighter">99.9%</div>
                                    <div className="text-sm font-bold text-foreground">System Uptime</div>
                                </div>
                            </div>
                        </div>

                        <div className="flex-1 flex flex-col items-center justify-center gap-8 text-center p-8 bg-primary/5 rounded-[40px] border border-primary/20">
                            <Users className="w-32 h-32 text-primary opacity-50" />
                            <div>
                                <h4 className="text-2xl font-black text-foreground uppercase tracking-widest mb-2">Join the Elite</h4>
                                <p className="text-muted-foreground font-medium mb-8 max-w-xs">Thousands of traders trust our team with their capital protection.</p>
                                <Link to="/signup">
                                    <Button variant="hero" size="xl" className="h-16 px-10 shadow-glow-md">
                                        Start Your Journey
                                        <ArrowRight className="w-5 h-5 ml-3" />
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Final Hook */}
            <section className="container mx-auto px-4 py-32 text-center">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto"
                >
                    <h2 className="text-4xl md:text-6xl font-black text-foreground mb-8">The Future of <br /><span className="gradient-text uppercase text-7xl">Risk Intelligence</span></h2>
                    <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
                        We are just getting started. Our roadmap is driven by the community we serve and the professional standards we uphold.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                        <Link to="/signup">
                            <Button variant="hero" size="xl" className="h-20 px-12 text-xl shadow-glow-md">
                                Get Started
                                <ArrowRight className="w-6 h-6 ml-3" />
                            </Button>
                        </Link>
                        <Link to="/how-it-works">
                            <Button variant="outline" size="xl" className="h-20 px-12 text-xl border-primary/30">
                                Explore The Systems
                            </Button>
                        </Link>
                    </div>
                </motion.div>
            </section>
        </div>
    );
}

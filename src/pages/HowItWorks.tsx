import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
    Globe,
    Settings,
    Shield,
    BarChart3,
    Rocket,
    ArrowRight,
    Database,
    Lock,
    Zap,
    Cpu,
    RefreshCw,
    Activity,
    Network,
} from "lucide-react";

const steps = [
    {
        step: "01",
        title: "Secure Broker Connection",
        description: "Connect your MT4/MT5 accounts using our enterprise MetaApi integration. We use strict read-only mode to observe trades without ever gaining execution rights.",
        features: ["OAuth Secure Connection", "Read-Only Permissions", "Supports 1200+ Brokers"],
        icon: Globe,
        color: "primary",
        visual: (
            <div className="relative w-full h-full flex items-center justify-center">
                <div className="absolute inset-0 bg-primary/20 blur-[60px] rounded-full animate-pulse" />
                <Network className="w-32 h-32 text-primary relative z-10" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-primary/20 rounded-full animate-spin-slow" />
            </div>
        )
    },
    {
        step: "02",
        title: "Intelligence Configuration",
        description: "Configure your risk architecture by choosing from prop firm presets (FTMO, Topstep, MyFundedFutures) or defining custom mathematical boundaries.",
        features: ["Prop Firm Presets", "Custom Drawdown Math", "News Event Handling"],
        icon: Settings,
        color: "accent-primary",
        visual: (
            <div className="relative w-full h-full flex items-center justify-center">
                <div className="absolute inset-0 bg-primary/20 blur-[60px] rounded-full" />
                <Cpu className="w-32 h-32 text-primary relative z-10" />
                <div className="absolute inset-10 border-2 border-dashed border-primary/30 rounded-2xl animate-spin-slow" />
            </div>
        )
    },
    {
        step: "03",
        title: "Real-Time Risk Engine",
        description: "Our high-frequency monitoring engine watches every tick and every execution. It calculates your safety score in real-time with sub-millisecond latency.",
        features: ["Sub-ms Risk Math", "Behavioral Bias Mapping", "Equity Protection"],
        icon: Shield,
        color: "status-safe",
        visual: (
            <div className="relative w-full h-full flex items-center justify-center">
                <div className="absolute inset-0 bg-status-safe/20 blur-[60px] rounded-full" />
                <div className="relative z-10">
                    <Activity className="w-32 h-32 text-status-safe" />
                    <motion.div
                        animate={{ x: [0, 10, 0] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="h-1 bg-status-safe w-full mt-4 rounded-full"
                    />
                </div>
            </div>
        )
    },
    {
        step: "04",
        title: "Automated Enforcement",
        description: "When a boundary is threatened, RiskLock acts as your technical discipline. It provides real-time alerts or account locks according to your configuration.",
        features: ["Instant Warning System", "Breach Lock Mechanism", "Emotional Buffering"],
        icon: Rocket,
        color: "status-danger",
        visual: (
            <div className="relative w-full h-full flex items-center justify-center">
                <div className="absolute inset-0 bg-status-danger/20 blur-[60px] rounded-full" />
                <Zap className="w-32 h-32 text-status-danger relative z-10" />
                <div className="absolute top-0 left-0 w-full h-full border-2 border-status-danger/30 rounded-full animate-ping" />
            </div>
        )
    }
];

export default function HowItWorks() {
    return (
        <div className="pt-12">
            {/* Hero */}
            <section className="container mx-auto px-4 mb-32 text-center relative min-h-[80vh] flex flex-col justify-center items-center">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 blur-[120px] rounded-full pointer-events-none -z-10" />
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="max-w-4xl mx-auto"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] md:text-xs font-bold mb-10 shadow-glow-sm backdrop-blur-md uppercase tracking-widest">
                        <RefreshCw className="w-3 h-3" />
                        The Mechanism
                    </div>
                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-foreground mb-8 leading-[1.1] tracking-tight">
                        How RiskLock <br />
                        <span className="gradient-text uppercase">Protects Your Capital.</span>
                    </h1>
                    <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed font-medium">
                        A sophisticated integration of institutional-grade API infrastructure and real-time behavioral risk mathematics.
                    </p>
                </motion.div>
            </section>

            {/* Systematic Steps */}
            <section className="container mx-auto px-4 mb-32">
                <div className="space-y-40 max-w-6xl mx-auto">
                    {steps.map((step, i) => (
                        <div key={i} className={`flex flex-col lg:flex-row items-center gap-20 ${i % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                            <motion.div
                                initial={{ x: i % 2 === 0 ? -30 : 30, opacity: 0 }}
                                whileInView={{ x: 0, opacity: 1 }}
                                viewport={{ once: true }}
                                className="flex-1"
                            >
                                <div className="text-6xl font-black text-primary/10 mb-6 font-mono tracking-tighter">
                                    {step.step}
                                </div>
                                <h2 className="text-3xl md:text-5xl font-black text-foreground mb-6 leading-tight">
                                    {step.title}
                                </h2>
                                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8 font-medium">
                                    {step.description}
                                </p>
                                <div className="space-y-4">
                                    {step.features.map((feature) => (
                                        <div key={feature} className="flex items-center gap-3">
                                            <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                                                <ArrowRight className="w-3 h-3 text-primary" />
                                            </div>
                                            <span className="text-foreground font-bold">{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                whileInView={{ scale: 1, opacity: 1 }}
                                viewport={{ once: true }}
                                className="flex-1 w-full aspect-square max-w-md relative"
                            >
                                <div className="glass-card shadow-glow-sm w-full h-full p-8 flex items-center justify-center">
                                    {step.visual}
                                </div>
                            </motion.div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Integration Technical Depth - THE RISK ENGINE */}
            <section className="bg-secondary/20 py-32 border-y border-border/50">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center mb-20">
                        <h2 className="text-4xl md:text-6xl font-black text-foreground mb-8 uppercase tracking-tighter">The <span className="gradient-text">Risk Engine</span></h2>
                        <p className="text-lg text-muted-foreground leading-relaxed font-medium">
                            Beneath the interface lies a powerful computation layer designed for institutional precision.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
                        <div className="glass-card p-10 flex flex-col items-center text-center group hover:border-primary/50 transition-all">
                            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-8">
                                <Database className="w-8 h-8 text-primary" />
                            </div>
                            <h3 className="text-2xl font-black text-foreground mb-4">MetaApi Stack</h3>
                            <p className="text-muted-foreground leading-relaxed font-medium">
                                Our integration uses the industry-leading MetaApi cloud stack, ensuring stable connections to over 1,200 brokers worldwide with 99.9% reliability.
                            </p>
                        </div>
                        <div className="glass-card p-10 flex flex-col items-center text-center group hover:border-primary/50 transition-all">
                            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-8">
                                <Lock className="w-8 h-8 text-primary" />
                            </div>
                            <h3 className="text-2xl font-black text-foreground mb-4">Stateless Math</h3>
                            <p className="text-muted-foreground leading-relaxed font-medium">
                                Calculations are performed in a stateless environment, preventing session hijacking and ensuring your risk data is never exposed to unauthorized persistence.
                            </p>
                        </div>
                        <div className="glass-card p-10 flex flex-col items-center text-center group hover:border-primary/50 transition-all">
                            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-8">
                                <Zap className="w-8 h-8 text-primary" />
                            </div>
                            <h3 className="text-2xl font-black text-foreground mb-4">Sub-ms Latency</h3>
                            <p className="text-muted-foreground leading-relaxed font-medium">
                                Every tick is processed in under 1ms, allowing RiskLock to respond to dangerous volatility before it breeches your prop firm's hard-drawdown limits.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Trust Quote */}
            <section className="container mx-auto px-4 py-32 text-center">
                <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto"
                >
                    <div className="h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent w-full mb-16" />
                    <h2 className="text-3xl md:text-5xl font-black text-foreground mb-8 leading-tight italic">
                        "We don't just watch your account; we mathematically enforce the discipline you've been working to build."
                    </h2>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-16">
                        <Link to="/signup">
                            <Button variant="hero" size="xl" className="h-20 px-12 text-xl shadow-glow-md">
                                Get Started
                                <ArrowRight className="w-6 h-6 ml-3" />
                            </Button>
                        </Link>
                        <Link to="/pricing">
                            <Button variant="outline" size="xl" className="h-20 px-12 text-xl border-primary/30">
                                View Pricing Plans
                            </Button>
                        </Link>
                    </div>
                </motion.div>
            </section>
        </div>
    );
}

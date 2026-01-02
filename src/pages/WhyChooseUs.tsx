import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
    Shield,
    Brain,
    Target,
    Lock,
    Zap,
    CheckCircle,
    XCircle,
    ArrowRight,
    Activity,
    TrendingUp,
    AlertTriangle,
    TrendingDown,
    BarChart3,
    Award,
    Clock,
} from "lucide-react";

export default function WhyChooseUs() {
    return (
        <div className="relative">
            {/* Hero Section */}
            <section className="relative min-h-[85vh] flex items-center z-10 container mx-auto px-4 pt-32 pb-20">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 blur-[120px] rounded-full pointer-events-none -z-10" />

                <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="max-w-5xl mx-auto text-center relative"
                >
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold mb-10 shadow-glow-sm backdrop-blur-md uppercase tracking-widest"
                    >
                        <Shield className="w-4 h-4" />
                        The Trading Control System
                    </motion.div>

                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-foreground leading-[1.1] tracking-tight mb-8">
                        Stop Recording Mistakes. <br />
                        <span className="gradient-text">Start Preventing Them.</span>
                    </h1>

                    <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-medium mb-12">
                        Traditional journals are passive. RiskLock is active. We lock your risk, track your emotions, and force you to survive.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link to="/signup">
                            <Button variant="hero" size="lg" className="group px-8 h-14 text-base shadow-glow-md">
                                Start Protecting Capital
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                            </Button>
                        </Link>
                        <Link to="/pricing">
                            <Button variant="outline" size="lg" className="h-14 px-8">
                                View Plans
                            </Button>
                        </Link>
                    </div>
                </motion.div>
            </section>

            {/* Data-Driven Insights Section (Replaces Enforcement) */}
            <section className="relative z-10 container mx-auto px-4 py-32 bg-muted/20">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-6">
                            Core Technology
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black text-foreground mb-6 tracking-tight">
                            Awareness Through <span className="gradient-text">Real Data</span>
                        </h2>
                        <p className="text-lg text-muted-foreground font-medium max-w-3xl mx-auto">
                            We analyze your trading data and provide clear insights about your risk levels, patterns, and proximity to important thresholds. <strong className="text-foreground">You remain in full control</strong> of all trading decisions.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <motion.div
                            initial={{ y: 30, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            className="glass-card p-8 border-primary/30 hover:border-primary/50 transition-all"
                        >
                            <div className="flex items-start gap-4 mb-6">
                                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                                    <Target className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-foreground mb-2">Risk Proximity Insights</h3>
                                    <p className="text-sm text-primary font-bold">Real-Time Awareness</p>
                                </div>
                            </div>
                            <p className="text-muted-foreground leading-relaxed mb-4">
                                See how close you are to your daily loss limits, drawdown thresholds, and trading goals. Clear visual indicators help you understand your current risk state based on actual performance data.
                            </p>
                            <div className="p-4 bg-background rounded-xl border border-border/50">
                                <p className="text-xs text-muted-foreground mb-2 font-bold uppercase tracking-wider">Example Insight</p>
                                <p className="text-sm text-foreground">
                                    "You've used <span className="text-primary font-mono">68%</span> of your daily risk budget based on your defined goals."
                                </p>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ y: 30, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="glass-card p-8 border-purple-500/30 hover:border-purple-500/50 transition-all"
                        >
                            <div className="flex items-start gap-4 mb-6">
                                <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center shrink-0">
                                    <Brain className="w-6 h-6 text-purple-400" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-foreground mb-2">Behavioral Pattern Detection</h3>
                                    <p className="text-sm text-purple-400 font-bold">Understand Your Habits</p>
                                </div>
                            </div>
                            <p className="text-muted-foreground leading-relaxed mb-4">
                                Our analytics identify patterns like overtrading, loss streak tendencies, and emotional trading indicators. These insights help you recognize behaviors that might impact your performance.
                            </p>
                            <div className="p-4 bg-background rounded-xl border border-border/50">
                                <p className="text-xs text-muted-foreground mb-2 font-bold uppercase tracking-wider">Pattern Alert</p>
                                <p className="text-sm text-foreground">
                                    "Data shows increased trade frequency after losses. Consider reviewing your strategy."
                                </p>
                            </div>
                        </motion.div>
                    </div>

                    <div className="mt-12 text-center">
                        <div className="glass-card p-6 inline-block max-w-2xl">
                            <p className="text-sm text-muted-foreground">
                                <strong className="text-primary">Important:</strong> RiskLock provides <strong className="text-foreground">insights and awareness based on your data</strong>, not trade signals or execution control. All trading decisions remain entirely yours.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* The Passive Journal Trap */}
            <section className="relative z-10 container mx-auto px-4 py-32">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ x: -30, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-block px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold uppercase tracking-widest mb-6">
                            The Problem
                        </div>
                        <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
                            The "Passive Journal" Trap
                        </h2>
                        <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                            Most trading tools are just fancy spreadsheets. They tell you "You lost $500 today" but they don't do anything to stop you from losing $1,000 tomorrow.
                        </p>

                        <div className="space-y-4">
                            {[
                                "No real-time intervention during loss streaks",
                                "No emotional state tracking",
                                "No prop-firm specific drawdown awareness",
                            ].map((item, i) => (
                                <div key={i} className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-full bg-red-500/10 flex items-center justify-center mt-1 shrink-0">
                                        <AlertTriangle className="w-4 h-4 text-red-500" />
                                    </div>
                                    <span className="text-foreground font-medium">{item}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ x: 50, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="relative group lg:ml-auto w-full max-w-xl"
                    >
                        <div className="absolute inset-0 bg-red-500/20 blur-[120px] rounded-full opacity-50 group-hover:opacity-80 transition-opacity duration-1000 -z-10" />

                        <div className="glass-card p-6 md:p-8 border-red-500/20 shadow-glow-lg backdrop-blur-2xl relative overflow-hidden transform hover:scale-[1.02] transition-transform duration-300">
                            <div className="space-y-4">
                                <div className="h-8 w-1/3 bg-muted/30 rounded" />
                                <div className="space-y-3">
                                    <div className="h-12 w-full bg-red-500/10 rounded flex items-center px-4 text-red-400 font-mono text-sm">
                                        -$1,240.00 (Loss)
                                    </div>
                                    <div className="h-12 w-full bg-red-500/10 rounded flex items-center px-4 text-red-400 font-mono text-sm">
                                        -$2,100.00 (Loss)
                                    </div>
                                    <div className="h-12 w-full bg-red-500/10 rounded flex items-center px-4 text-red-400 font-mono text-sm">
                                        -$850.00 (Loss)
                                    </div>
                                </div>
                                <div className="absolute -bottom-4 -right-4 bg-red-600/90 backdrop-blur-sm text-white px-6 py-3 rounded-xl font-bold shadow-lg rotate-[-6deg] text-sm">
                                    Passive = Pain
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Why Traders Fail - Data-Driven */}
            <section className="relative z-10 container mx-auto px-4 py-32 bg-muted/20">
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <div className="inline-block px-4 py-1.5 rounded-full bg-status-warning/10 border border-status-warning/20 text-status-warning text-xs font-bold uppercase tracking-widest mb-6">
                        Market Reality
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black text-foreground mb-6 tracking-tight">
                        Why <span className="text-gradient">90% of Traders Fail</span>
                    </h2>
                    <p className="text-lg text-muted-foreground font-medium">
                        It's not about strategy. It's about control.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {[
                        {
                            stat: "73%",
                            title: "Emotional Trading",
                            desc: "Revenge trading after losses is the #1 account killer. Traders know it's wrong but can't stop.",
                            icon: Brain,
                        },
                        {
                            stat: "64%",
                            title: "Over-Leverage",
                            desc: "Increasing position size after wins or 'making back' losses destroys accounts in 48 hours.",
                            icon: TrendingDown,
                        },
                        {
                            stat: "81%",
                            title: "No Exit Discipline",
                            desc: "Prop firm traders fail due to breaking drawdown limits, not bad entries.",
                            icon: Lock,
                        },
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ y: 30, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="glass-card p-8 hover:border-primary/30 transition-all"
                        >
                            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 ring-1 ring-primary/20">
                                <item.icon className="w-7 h-7 text-primary" />
                            </div>
                            <div className="text-4xl font-black text-foreground mb-3">{item.stat}</div>
                            <h3 className="text-xl font-bold text-foreground mb-3">{item.title}</h3>
                            <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Trader Psychology & Discipline Framework */}
            <section className="relative z-10 container mx-auto px-4 py-32">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-16">
                        <div className="inline-block px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-bold uppercase tracking-widest mb-6">
                            Psychology Engine
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black text-foreground mb-6 tracking-tight">
                            The Discipline <span className="gradient-text">Framework</span>
                        </h2>
                        <p className="text-lg text-muted-foreground font-medium max-w-2xl mx-auto">
                            Trading success isn't about finding better setups. It's about building unbreakable discipline systems.
                        </p>
                    </div>

                    <div className="space-y-6">
                        {[
                            {
                                phase: "01",
                                title: "Self-Awareness",
                                desc: "Track your emotional state before, during, and after trades. RiskLock correlates your feelings with your P&L to show you when you trade best.",
                            },
                            {
                                phase: "02",
                                title: "Rule Definition",
                                desc: "Set hard limits: max daily loss, max position size, cool-down periods. The system enforces what you can't.",
                            },
                            {
                                phase: "03",
                                title: "Active Intervention",
                                desc: "When you approach risk limits, RiskLock doesn't just alert you—it shows probability of recovery vs blowout risk.",
                            },
                            {
                                phase: "04",
                                title: "Recovery Protocol",
                                desc: "After loss streaks, the system guides you through mandatory cool-downs. Forced distance = emotional reset.",
                            },
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ x: -30, opacity: 0 }}
                                whileInView={{ x: 0, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="glass-card p-8 border-l-4 border-l-primary/50 hover:border-l-primary transition-all"
                            >
                                <div className="flex items-start gap-6">
                                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0 font-black text-primary">
                                        {item.phase}
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-foreground mb-3">{item.title}</h3>
                                        <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Premium Comparison */}
            <section className="relative z-10 container mx-auto px-4 py-32">
                <div className="text-center mb-20">
                    <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-6">
                        Strategic Difference
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black text-foreground mb-6 tracking-tight">
                        Why We Are <span className="gradient-text">Different</span>
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-medium">
                        It's not about features. It's about philosophy.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    <motion.div
                        initial={{ y: 30, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        className="glass-card p-10 hover:border-muted-foreground/20 transition-all duration-500 opacity-60"
                    >
                        <h3 className="text-2xl font-black text-muted-foreground mb-8 flex items-center gap-3">
                            <XCircle className="w-7 h-7" />
                            Ordinary Journals
                        </h3>
                        <ul className="space-y-5">
                            {[
                                "Records history only",
                                "Ignores emotional state",
                                "Charts look pretty, discipline is on you",
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-3 text-muted-foreground">
                                    <XCircle className="w-5 h-5 mt-0.5 shrink-0" />
                                    <span className="font-medium">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    <motion.div
                        initial={{ y: 30, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="glass-card p-10 border-primary/40 relative shadow-glow-md bg-background/60 hover:scale-[1.02] transition-transform duration-300"
                    >
                        <div className="absolute -top-4 right-4 px-4 py-1.5 rounded-full bg-primary text-primary-foreground text-[10px] font-black uppercase tracking-widest shadow-lg">
                            The RiskLock Standard
                        </div>
                        <h3 className="text-2xl font-black text-foreground mb-8 flex items-center gap-3">
                            <Shield className="w-7 h-7 text-primary" />
                            RiskLock System
                        </h3>

                        <div className="space-y-5">
                            {[
                                { icon: Lock, title: "Active Intervention", desc: "Locks you out when you reach risk limits" },
                                { icon: Brain, title: "Neuro-Feedback", desc: "Links your P&L to your emotions" },
                                { icon: Target, title: "Prop Firm Mode", desc: "Live drawdown tracking & alert system" },
                                { icon: Zap, title: "Recovery Protocol", desc: "System-guided cooldowns after losses" },
                            ].map((feature, i) => (
                                <div key={i} className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                                        <feature.icon className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-foreground">{feature.title}</h4>
                                        <p className="text-sm text-muted-foreground">{feature.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Prop Firm Survival - Expanded */}
            <section className="relative z-10 container mx-auto px-4 py-32 bg-muted/20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ x: -30, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        className="order-2 lg:order-1 relative group lg:ml-auto w-full max-w-xl"
                    >
                        <div className="absolute inset-0 bg-primary/20 blur-[120px] rounded-full opacity-50 group-hover:opacity-80 transition-opacity duration-1000 -z-10" />

                        <div className="glass-card p-6 md:p-8 border-primary/20 shadow-glow-lg backdrop-blur-2xl relative overflow-hidden">
                            <div className="space-y-4">
                                <div className="flex justify-between items-center p-4 bg-background/50 rounded-xl border border-border/50">
                                    <div className="flex items-center gap-3">
                                        <div className="w-2 h-2 rounded-full bg-status-safe animate-pulse" />
                                        <span className="font-bold text-foreground">Daily Drawdown</span>
                                    </div>
                                    <span className="font-mono text-status-safe font-bold">Healthy</span>
                                </div>
                                <div className="flex justify-between items-center p-4 bg-background/50 rounded-xl border border-status-warning/30">
                                    <div className="flex items-center gap-3">
                                        <div className="w-2 h-2 rounded-full bg-status-warning" />
                                        <span className="font-bold text-foreground">Max Loss Limit</span>
                                    </div>
                                    <span className="font-mono text-status-warning font-bold">Approaching (85%)</span>
                                </div>
                                <div className="p-4 bg-primary/10 rounded-xl border border-primary/20 text-primary text-sm">
                                    <Zap className="w-4 h-4 inline mr-2 text-status-warning" />
                                    <strong>Insight:</strong> Your win rate drops 40% after 2 consecutive losses. Suggest cooling down.
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ x: 50, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        className="order-1 lg:order-2"
                    >
                        <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-6">
                            Built for Funded Traders
                        </div>
                        <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
                            Survive the Evaluation. <br />
                            <span className="text-primary italic">Keep the Account.</span>
                        </h2>
                        <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                            Prop firms are designed to profit from your lack of discipline. RiskLock reverses that equation.
                        </p>
                        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                            We monitor your max drawdown and daily limits in real-time, giving you "Survival Signals" before you breach a hard rule. It's like having a risk manager watching every position.
                        </p>
                        <ul className="space-y-4">
                            {["Live Daily Loss Tracking", "Equity Protector Logic", "Evaluation-Specific Rule Templates"].map((item, i) => (
                                <li key={i} className="flex items-center gap-3 text-foreground font-bold">
                                    <CheckCircle className="w-5 h-5 text-primary" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </div>

                {/* Prop Firm Mechanics Deep Dive */}
                <div className="mt-24 max-w-4xl mx-auto">
                    <h3 className="text-3xl font-bold text-foreground mb-12 text-center">Prop Firm Survival Mechanics</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                            {
                                title: "Phase 1: Evaluation",
                                points: ["Hit profit target without breaking rules", "Most fail on day 2-4 from over-trading", "RiskLock enforces pace control"],
                            },
                            {
                                title: "Phase 2: Verification",
                                points: ["Prove it wasn't luck", "Emotional pressure peaks here", "System prevents tilt trading"],
                            },
                            {
                                title: "Phase 3: Funded",
                                points: ["Keep the account = keep the income", "One bad day can end it", "Live monitoring is essential"],
                            },
                            {
                                title: "Phase 4: Scale",
                                points: ["Multi-account management", "Portfolio risk aggregation", "Systematic growth, not gambling"],
                            },
                        ].map((phase, i) => (
                            <motion.div
                                key={i}
                                initial={{ y: 20, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="glass-card p-6"
                            >
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center font-black text-primary text-sm">
                                        {i + 1}
                                    </div>
                                    <h4 className="font-bold text-foreground">{phase.title}</h4>
                                </div>
                                <ul className="space-y-2">
                                    {phase.points.map((point, j) => (
                                        <li key={j} className="text-sm text-muted-foreground flex items-start gap-2">
                                            <span className="text-primary mt-0.5">•</span>
                                            {point}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Emotional Intelligence */}
            <section className="relative z-10 container mx-auto px-4 py-32">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ x: -30, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        <div className="inline-block px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-bold uppercase tracking-widest mb-6">
                            Hidden Advantage
                        </div>
                        <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
                            The "Hidden Killer" is Emotion. <br />
                            <span className="text-primary italic">We Track It.</span>
                        </h2>
                        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                            No other platform correlates your P&L with your emotional state. We do. By understanding how you felt during your best and worst trades, we help you identify your "Zone" and your "Danger State".
                        </p>
                        <div className="glass-card p-6 border-purple-500/20">
                            <h4 className="font-bold text-foreground mb-2">Insight Example:</h4>
                            <p className="text-muted-foreground italic">
                                "You lose 70% of trades taken when you report feeling 'Frustrated'. Your current state is Frustrated. Recommendation: Walk away."
                            </p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ x: 50, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <div className="absolute inset-0 bg-purple-500/20 blur-[80px] rounded-full opacity-20" />
                        <div className="grid grid-cols-2 gap-4 relative">
                            <div className="glass-card p-6 flex flex-col items-center justify-center h-48 hover:scale-105 transition-transform">
                                <div className="text-4xl mb-2">😤</div>
                                <div className="font-bold text-red-400 text-xl">-12.5% ROI</div>
                                <div className="text-xs text-muted-foreground uppercase mt-1">Frustrated</div>
                            </div>
                            <div className="glass-card p-6 flex flex-col items-center justify-center h-48 mt-8 hover:scale-105 transition-transform">
                                <div className="text-4xl mb-2">🧘</div>
                                <div className="font-bold text-status-safe text-xl">+24.0% ROI</div>
                                <div className="text-xs text-muted-foreground uppercase mt-1">Focused</div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Long-Term Behavior Change */}
            <section className="relative z-10 container mx-auto px-4 py-32 bg-muted/20">
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-6">
                        System Evolution
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black text-foreground mb-6 tracking-tight">
                        From Short-Term Fix to <span className="gradient-text">Lifelong Edge</span>
                    </h2>
                    <p className="text-lg text-muted-foreground font-medium max-w-2xl mx-auto">
                        RiskLock isn't a band-aid. It's a behavior transformation engine designed for trader longevity.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        {
                            icon: Clock,
                            timeframe: "Month 1-3",
                            title: "Survival Mode",
                            desc: "Hard limits prevent blowouts. You learn to respect your rules through system enforcement, not willpower.",
                        },
                        {
                            icon: BarChart3,
                            timeframe: "Month 4-6",
                            title: "Pattern Recognition",
                            desc: "You start seeing your own emotional triggers. The data becomes your mirror.",
                        },
                        {
                            icon: Award,
                            timeframe: "Month 7+",
                            title: "Internalized Discipline",
                            desc: "The rules become automatic. You trade with the system, not against it. This is mastery.",
                        },
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ y: 30, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.15 }}
                            className="glass-card p-8 hover:border-primary/40 transition-all"
                        >
                            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                                <item.icon className="w-7 h-7 text-primary" />
                            </div>
                            <div className="text-xs font-bold text-primary uppercase tracking-widest mb-2">{item.timeframe}</div>
                            <h3 className="text-xl font-bold text-foreground mb-3">{item.title}</h3>
                            <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Final CTA */}
            <section className="relative z-10 container mx-auto px-4 py-24 mb-12">
                <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    className="glass-card p-12 lg:p-16 text-center bg-gradient-to-b from-primary/10 to-transparent"
                >
                    <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
                        Ready for <span className="text-primary">Control?</span>
                    </h2>
                    <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
                        Join thousands of traders who trust RiskLock to protect their accounts and enforce discipline.
                    </p>
                    <Link to="/signup">
                        <Button variant="hero" size="xl" className="h-16 px-12 text-lg shadow-glow-md">
                            Join RiskLock Now
                            <ArrowRight className="w-5 h-5 ml-2" />
                        </Button>
                    </Link>
                    <p className="mt-6 text-muted-foreground text-sm">No credit card required for trial • Cancel anytime</p>
                </motion.div>
            </section>
        </div>
    );
}

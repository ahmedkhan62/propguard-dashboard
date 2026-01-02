import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
    Shield,
    TrendingUp,
    Zap,
    Lock,
    AlertTriangle,
    Brain,
    Target,
    CheckCircle,
    ArrowRight,
    Activity,
    Award,
    FileText,
    BarChart3,
    Eye,
    Clock,
    Sparkles,
    Rocket,
    ChevronRight,
    Database,
    LineChart,
} from "lucide-react";


export default function Features() {
    return (
        <div className="py-20 lg:py-32">

            {/* Hero Section */}
            <section className="relative min-h-[70vh] flex items-center z-10 container mx-auto px-4 py-20">
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
                        <Award className="w-3 h-3" />
                        Complete Feature Arsenal
                    </motion.div>

                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-foreground leading-[1.1] tracking-tight mb-8">
                        Every Feature Built to Protect Your Capital — <span className="gradient-text">Automatically</span>
                    </h1>

                    <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed font-medium mb-10">
                        RiskLock is not another trading tool. It is a real-time risk referee, designed to stop the mistakes that destroy funded accounts.
                    </p>

                    <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground font-medium">
                        <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-primary" />
                            Built for prop firm traders
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-primary" />
                            100% read-only
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-primary" />
                            Compliance-safe
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* Core Risk Protection Features */}
            <section className="relative z-10 container mx-auto px-4 py-32">
                <div className="text-center mb-20">
                    <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-4">
                        Core Protection
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black text-foreground mb-6 tracking-tight">
                        Real-Time <span className="gradient-text">Risk Enforcement</span>
                    </h2>
                </div>

                {/* Dynamic Risk Engine */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center mb-24">
                    <motion.div
                        initial={{ x: -30, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-status-safe/10 border border-status-safe/20 text-status-safe text-xs font-bold mb-6 uppercase tracking-widest">
                            <Shield className="w-3 h-3" />
                            Automatically Enforced
                        </div>
                        <h3 className="text-3xl md:text-5xl font-black text-foreground mb-4 leading-tight">
                            Dynamic Risk Engine
                        </h3>
                        <p className="text-xl text-primary font-bold mb-6">Your rules. Enforced every second.</p>
                        <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                            You don't react to risk — RiskLock reacts before you fail. Our engine monitors your daily loss and drawdown limits in real-time, calculating dynamic buffers and predicting trades-to-breach with millisecond precision.
                        </p>
                        <div className="space-y-4">
                            {[
                                "Daily loss & drawdown limits",
                                "Dynamic buffer calculation",
                                "Trades-to-breach prediction",
                                "SAFE / WARNING / CRITICAL states",
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                                        <CheckCircle className="w-4 h-4 text-primary" />
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
                        className="relative group"
                    >
                        <div className="absolute inset-0 bg-primary/20 blur-[120px] rounded-full opacity-50 group-hover:opacity-80 transition-opacity duration-1000 -z-10" />
                        <div className="glass-card p-8 border-primary/20 shadow-glow-lg backdrop-blur-2xl">
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-xl bg-status-safe/20 flex items-center justify-center">
                                        <Shield className="w-6 h-6 text-status-safe" />
                                    </div>
                                    <div>
                                        <div className="text-sm font-bold text-foreground">Risk Status</div>
                                        <div className="text-[10px] text-status-safe font-bold uppercase tracking-wider">Safe</div>
                                    </div>
                                </div>
                                <div className="px-3 py-1 rounded-full bg-status-safe/10 border border-status-safe/20">
                                    <span className="text-xs font-bold text-status-safe">ACTIVE</span>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <div className="flex justify-between items-end mb-2">
                                        <span className="text-xs font-bold text-muted-foreground uppercase">Daily Drawdown</span>
                                        <span className="text-xl font-black text-primary">2.4%</span>
                                    </div>
                                    <div className="h-3 w-full bg-secondary rounded-full overflow-hidden border border-border/50">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            whileInView={{ width: "24%" }}
                                            transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                                            className="h-full bg-gradient-to-r from-status-safe to-status-safe/50"
                                        />
                                    </div>
                                    <div className="text-[10px] text-muted-foreground mt-1">Limit: $500 | Used: $120</div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-4 rounded-xl bg-background/50 border border-border/50">
                                        <div className="text-[10px] text-muted-foreground uppercase font-bold mb-1">Trades to Breach</div>
                                        <div className="text-2xl font-black text-foreground">12</div>
                                    </div>
                                    <div className="p-4 rounded-xl bg-background/50 border border-border/50">
                                        <div className="text-[10px] text-muted-foreground uppercase font-bold mb-1">Buffer</div>
                                        <div className="text-2xl font-black text-primary">$380</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Account Lock Protection */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                    <motion.div
                        initial={{ x: -50, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        className="relative group order-2 lg:order-1"
                    >
                        <div className="absolute inset-0 bg-status-danger/20 blur-[120px] rounded-full opacity-50 group-hover:opacity-80 transition-opacity duration-1000 -z-10" />
                        <div className="glass-card p-8 border-status-danger/20 shadow-glow-lg backdrop-blur-2xl">
                            <div className="flex items-center justify-center mb-6">
                                <div className="w-20 h-20 rounded-2xl bg-status-warning/20 flex items-center justify-center">
                                    <AlertTriangle className="w-10 h-10 text-status-warning" />
                                </div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-black text-status-warning mb-2">Risk Threshold Reached</div>
                                <div className="text-sm text-muted-foreground mb-6">Daily loss limit approached</div>
                                <div className="p-4 rounded-xl bg-status-warning/10 border border-status-warning/20 mb-6">
                                    <div className="text-[10px] text-muted-foreground uppercase font-bold mb-2">Alert Details</div>
                                    <div className="text-sm font-medium text-foreground">Daily Goal: -$500.00</div>
                                    <div className="text-sm font-medium text-status-warning">Current Loss: -$487.30</div>
                                </div>
                                <Button variant="outline" className="w-full border-status-warning/30">
                                    <Eye className="w-4 h-4 mr-2" />
                                    Review Strategy
                                </Button>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ x: 30, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        className="order-1 lg:order-2"
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold mb-6 uppercase tracking-widest">
                            <AlertTriangle className="w-3 h-3" />
                            Insightful, Not Restrictive
                        </div>
                        <h3 className="text-3xl md:text-5xl font-black text-foreground mb-4 leading-tight">
                            Risk Awareness Notifications
                        </h3>
                        <p className="text-xl text-primary font-bold mb-6">Clear insights when it matters most.</p>
                        <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                            When you approach important thresholds, RiskLock provides clear, actionable notifications about your risk state. These are <strong className="text-foreground">informational alerts</strong> designed to increase awareness, not restrict your trading.
                        </p>
                        <div className="space-y-4">
                            {[
                                "Real-time proximity notifications",
                                "Pattern-based alerts",
                                "Threshold awareness indicators",
                                "Performance insight summaries",
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                                        <CheckCircle className="w-4 h-4 text-primary" />
                                    </div>
                                    <span className="text-foreground font-medium">{item}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Discipline & Behavioral Intelligence */}
            <section className="relative z-10 container mx-auto px-4 py-32">
                <div className="text-center mb-20">
                    <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-4">
                        AI Insights
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black text-foreground mb-6 tracking-tight">
                        Trading Discipline, <span className="gradient-text">Measured</span> — Not Assumed
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-medium">
                        RiskLock doesn't judge you. It shows your behavior in numbers — so you can fix it.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                        { icon: Activity, title: "Overtrading Detection", desc: "Identifies excessive position frequency" },
                        { icon: AlertTriangle, title: "Revenge Trading Alerts", desc: "Flags emotion-driven behavior patterns" },
                        { icon: Clock, title: "Session Bias Analysis", desc: "London / NY / Asia performance tracking" },
                        { icon: Award, title: "Safety Score (1-100)", desc: "Discipline rating based on your habits" },
                    ].map((feature, i) => (
                        <motion.div
                            key={i}
                            initial={{ y: 30, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="glass-card-hover p-6 group relative overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 ring-1 ring-primary/20 group-hover:ring-primary/50 transition-all relative z-10">
                                <feature.icon className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
                            </div>
                            <h4 className="text-lg font-black text-foreground mb-2 relative z-10">{feature.title}</h4>
                            <p className="text-muted-foreground text-sm leading-relaxed relative z-10">{feature.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Trust, Audit & Compliance Proof */}
            <section className="relative z-10 container mx-auto px-4 py-32">
                <div className="text-center mb-20">
                    <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-4">
                        Compliance First
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black text-foreground mb-6 tracking-tight">
                        Built for Prop Firms. <span className="gradient-text">Proven by Design</span>
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-medium">
                        Nothing hidden. Nothing editable. Everything provable.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        {
                            icon: Lock,
                            title: "Read-Only Legal Guarantee",
                            items: ["No trade execution possible", "Code-level execution blocks", "Unit-tested enforcement"],
                        },
                        {
                            icon: Database,
                            title: "Immutable Audit Logs",
                            items: ["Every rule change logged", "Timestamped & versioned", "Dispute-proof history"],
                        },
                        {
                            icon: Eye,
                            title: "Transparency Dashboard",
                            items: ["Live connection status", "Sync health indicators", "Plain-English explanations"],
                        },
                    ].map((feature, i) => (
                        <motion.div
                            key={i}
                            initial={{ y: 30, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="glass-card p-8"
                        >
                            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 ring-1 ring-primary/20">
                                <feature.icon className="w-7 h-7 text-primary" />
                            </div>
                            <h3 className="text-2xl font-black text-foreground mb-4">{feature.title}</h3>
                            <ul className="space-y-3">
                                {feature.items.map((item, j) => (
                                    <li key={j} className="flex items-start gap-3">
                                        <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                                        <span className="text-muted-foreground">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Portfolio-Level Intelligence */}
            <section className="relative z-10 container mx-auto px-4 py-32">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                    <motion.div
                        initial={{ x: -30, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold mb-6 uppercase tracking-widest">
                            Portfolio Intelligence
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black text-foreground mb-6 tracking-tight">
                            One View. Every Account. <span className="gradient-text">Zero Blind Spots</span>
                        </h2>
                        <p className="text-xl text-muted-foreground mb-6 font-medium">
                            Most traders fail across accounts — not one.
                        </p>
                        <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                            RiskLock aggregates equity across all your connected accounts, detects symbol overlap, and warns you about correlated exposure. See your entire trading portfolio in one unified dashboard.
                        </p>
                        <div className="space-y-4">
                            {[
                                "Multi-account equity aggregation",
                                "Exposure & correlation warnings",
                                "Symbol overlap detection",
                                "Portfolio-level risk awareness",
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                                        <CheckCircle className="w-4 h-4 text-primary" />
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
                        className="relative group"
                    >
                        <div className="absolute inset-0 bg-primary/20 blur-[120px] rounded-full opacity-50 group-hover:opacity-80 transition-opacity duration-1000 -z-10" />
                        <div className="glass-card p-6 border-primary/20 shadow-glow-lg backdrop-blur-2xl">
                            <div className="text-sm font-bold text-foreground mb-4">Portfolio Overview</div>
                            <div className="space-y-3">
                                {[
                                    { account: "FTMO Challenge", equity: "$10,240", risk: "Safe", color: "status-safe" },
                                    { account: "MyFundedFX", equity: "$5,830", risk: "Warning", color: "status-warning" },
                                    { account: "The5ers", equity: "$8,120", risk: "Safe", color: "status-safe" },
                                ].map((acc, i) => (
                                    <div key={i} className="p-3 rounded-xl bg-background/50 border border-border/50 flex items-center justify-between">
                                        <div>
                                            <div className="text-sm font-bold text-foreground">{acc.account}</div>
                                            <div className="text-xs text-muted-foreground">{acc.equity}</div>
                                        </div>
                                        <div className={`px-2 py-1 rounded-full bg-${acc.color}/10 border border-${acc.color}/20`}>
                                            <span className={`text-[10px] font-bold text-${acc.color}`}>{acc.risk}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-4 p-3 rounded-xl bg-primary/5 border border-primary/20">
                                <div className="text-xs text-muted-foreground mb-1">Total Portfolio Value</div>
                                <div className="text-2xl font-black text-foreground">$24,190</div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Reporting & Evidence Engine */}
            <section className="relative z-10 container mx-auto px-4 py-32">
                <div className="text-center mb-20">
                    <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-4">
                        Compliance Reports
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black text-foreground mb-6 tracking-tight">
                        Proof You Can Send to <span className="gradient-text">Any Prop Firm</span>
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-medium">
                        Not screenshots. Not stories. Real compliance documents.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {[
                        {
                            icon: FileText,
                            title: "PDF Risk Reports",
                            features: ["Performance summary", "Breach history", "Behavioral insights", "Verification hash + watermark"],
                        },
                        {
                            icon: BarChart3,
                            title: "CSV / Excel Exports",
                            features: ["Full trade history", "Risk states per trade", "Journal-level evidence", "Timestamp precision"],
                        },
                    ].map((report, i) => (
                        <motion.div
                            key={i}
                            initial={{ y: 30, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="glass-card p-8 group hover:border-primary/30 transition-all"
                        >
                            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 ring-1 ring-primary/20 group-hover:ring-primary/50 transition-all">
                                <report.icon className="w-7 h-7 text-primary" />
                            </div>
                            <h3 className="text-2xl font-black text-foreground mb-6">{report.title}</h3>
                            <ul className="space-y-3">
                                {report.features.map((feature, j) => (
                                    <li key={j} className="flex items-center gap-3">
                                        <CheckCircle className="w-5 h-5 text-primary" />
                                        <span className="text-muted-foreground font-medium">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Advanced AI Intelligence (Coming Soon) */}
            <section className="relative z-10 container mx-auto px-4 py-32 overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 blur-[150px] rounded-full pointer-events-none -z-10" />

                <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    className="glass-card p-12 lg:p-16 border-primary/30 bg-gradient-to-b from-primary/10 to-transparent relative overflow-hidden"
                >
                    <div className="absolute top-4 right-4 px-4 py-1.5 rounded-full bg-primary/20 border border-primary/30 backdrop-blur-md">
                        <span className="text-[10px] font-black text-primary uppercase tracking-widest">Coming Soon</span>
                    </div>

                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold mb-6 uppercase tracking-widest">
                            <Sparkles className="w-4 h-4" />
                            Elite & Ultra Tier Exclusive
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black text-foreground mb-6 tracking-tight">
                            Next-Generation <span className="gradient-text">AI Trader Intelligence</span>
                        </h2>
                        <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-medium">
                            The future of disciplined trading — already in development.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { icon: Brain, title: "AI Emotional Pattern Mapping", desc: "Deep learning models identify your emotional trading triggers" },
                            { icon: Target, title: "Predictive Failure Probability", desc: "AI forecasts breach likelihood based on current behavior" },
                            { icon: Rocket, title: "Personalized Discipline Coaching", desc: "Custom recommendations to improve your safety score" },
                            { icon: LineChart, title: "Strategy Behavior Scoring", desc: "Rate your strategies by discipline and adherence quality" },
                            { icon: Award, title: "Institutional Risk Profiling", desc: "Compare your metrics against top-tier professional standards" },
                        ].map((feature, i) => (
                            <motion.div
                                key={i}
                                initial={{ y: 30, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="p-6 rounded-2xl bg-background/40 border border-primary/10 backdrop-blur-sm opacity-70 hover:opacity-100 transition-opacity"
                            >
                                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                                    <feature.icon className="w-6 h-6 text-primary/60" />
                                </div>
                                <h4 className="text-lg font-black text-foreground mb-2">{feature.title}</h4>
                                <p className="text-sm text-muted-foreground leading-relaxed italic">{feature.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </section>

            {/* Final CTA */}
            <section className="relative z-10 container mx-auto px-4 py-32 mb-12">
                <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    className="glass-card p-12 lg:p-20 text-center bg-gradient-to-b from-primary/10 to-transparent"
                >
                    <h2 className="text-4xl md:text-6xl font-black text-foreground mb-6 tracking-tight">
                        This Is Not Optional If You <span className="gradient-text">Trade Funded Accounts</span>
                    </h2>
                    <p className="text-muted-foreground text-xl mb-10 max-w-2xl mx-auto font-medium leading-relaxed">
                        Every blown account starts with a small ignored mistake. RiskLock exists to make sure that mistake never happens again.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link to="/signup">
                            <Button variant="hero" size="xl" className="h-16 px-12 text-lg shadow-glow-md">
                                Get Started Now
                                <ArrowRight className="w-5 h-5 ml-2" />
                            </Button>
                        </Link>
                        <Link to="/pricing">
                            <Button variant="outline" size="xl" className="h-16 px-12 text-lg border-primary/30 hover:bg-primary/5">
                                View Pricing
                                <ChevronRight className="w-5 h-5 ml-2" />
                            </Button>
                        </Link>
                    </div>
                </motion.div>
            </section>
        </div>
    );
}

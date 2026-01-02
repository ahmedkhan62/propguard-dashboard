import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
    FileText,
    Shield,
    Download,
    CheckCircle,
    History,
    FileSearch,
    Hash,
    ArrowRight,
    TrendingUp,
    FileDown,
    Clock,
    Verified,
    BarChart3,
    Globe,
} from "lucide-react";

const reportFeatures = [
    {
        icon: FileText,
        title: "PDF Risk Reports",
        description: "Generate professional, ready-to-send PDF summaries of your trading performance and risk metrics. Perfect for funding evaluations.",
    },
    {
        icon: Hash,
        title: "System Verification Hashes",
        description: "Every report is cryptographically signed with a unique verification hash to ensure authenticity and state-integrity.",
    },
    {
        icon: History,
        title: "Historical Rule Tracking",
        description: "Complete timeline of every rule violation, warning, and account state Change. Never guess why a lock was triggered.",
    },
    {
        icon: FileDown,
        title: "CSV & Excel Exports",
        description: "Export your raw trade data and risk metrics for advanced analysis in your favorite external specialized tools.",
    },
    {
        icon: FileSearch,
        title: "Audit Trail Records",
        description: "Detailed logs of all account connections, rule modifications, and system interactions for total accountability.",
    },
    {
        icon: Clock,
        title: "Timestamped Evidence",
        description: "All events are recorded with millisecond-precision timestamps, providing an indisputable record of platform performance.",
    },
];

export default function ReportsPage() {
    return (
        <div className="pt-12">
            {/* Hero Section */}
            <section className="container mx-auto px-4 mb-32 text-center relative min-h-[80vh] flex flex-col justify-center items-center">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 blur-[120px] rounded-full pointer-events-none -z-10" />
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="max-w-4xl mx-auto"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] md:text-xs font-bold mb-10 shadow-glow-sm backdrop-blur-md uppercase tracking-widest">
                        <Verified className="w-3 h-3" />
                        Institutional Evidence
                    </div>
                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-foreground mb-8 leading-[1.1] tracking-tight">
                        Evidence-Based <br />
                        <span className="gradient-text uppercase">Accountability.</span>
                    </h1>
                    <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed font-medium mb-10">
                        Beyond basic dashboards. RiskLock provides professional-grade documentation and verifiable audit trails for serious trading operations.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                        <Link to="/signup">
                            <Button variant="hero" size="xl" className="h-16 px-10 shadow-glow-md">
                                Start Generating Proof
                                <ArrowRight className="w-5 h-5 ml-3" />
                            </Button>
                        </Link>
                    </div>
                </motion.div>
            </section>

            {/* Visual Report Preview Section */}
            <section className="container mx-auto px-4 py-32 border-y border-border/50 bg-secondary/10 backdrop-blur-sm">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center max-w-6xl mx-auto">
                    <motion.div
                        initial={{ x: -30, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-5xl font-black text-foreground mb-8 leading-tight text-center lg:text-left">
                            Professional <br />
                            <span className="text-primary uppercase tracking-wider">Documentation.</span>
                        </h2>
                        <div className="space-y-8 text-lg text-muted-foreground font-medium leading-relaxed">
                            <div className="flex gap-4">
                                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                                    <FileText className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-foreground text-xl mb-2">Watermarked PDF Exports</h4>
                                    <p className="text-base">Generate clean, professional summaries of your risk management performance. Ideal for building your track record or presenting to private investors.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                                    <BarChart3 className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-foreground text-xl mb-2">Equity Curve Snapshots</h4>
                                    <p className="text-base">High-resolution captures of your growth vs. drawdown boundaries. Visually demonstrate your ability to maintain discipline under volatility.</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        className="glass-card p-1 p-0.5 relative group overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-primary/10 blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="bg-background p-10 rounded-[40px] border border-border/50 relative">
                            <div className="flex items-center justify-between mb-10 border-b border-border/50 pb-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                                        <TrendingUp className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <div className="text-xs font-black text-foreground uppercase">Risk Evaluation</div>
                                        <div className="text-[10px] text-muted-foreground font-bold">REPORT #RL-2025-A</div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-[10px] font-black text-status-safe uppercase px-3 py-1 bg-status-safe/10 rounded-full">Pass-Qualified</div>
                                </div>
                            </div>
                            <div className="space-y-6">
                                <div className="flex justify-between items-center px-4 py-3 bg-secondary/30 rounded-xl">
                                    <span className="text-xs font-bold text-muted-foreground uppercase">Max Drawdown</span>
                                    <span className="text-sm font-black text-foreground">3.2% / 5.0%</span>
                                </div>
                                <div className="flex justify-between items-center px-4 py-3 bg-secondary/30 rounded-xl">
                                    <span className="text-xs font-bold text-muted-foreground uppercase">Rule Adherence</span>
                                    <span className="text-sm font-black text-status-safe">100.0%</span>
                                </div>
                                <div className="flex justify-between items-center px-4 py-3 bg-secondary/30 rounded-xl">
                                    <span className="text-xs font-bold text-muted-foreground uppercase">Verification</span>
                                    <span className="text-[10px] font-mono text-muted-foreground">0x84f...e3a1</span>
                                </div>
                            </div>
                            <div className="mt-10 pt-10 border-t border-border/50 flex justify-center">
                                <Button variant="outline" size="sm" className="gap-2 border-primary/20">
                                    <Download className="w-4 h-4" /> Download Sample
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Feature Grid */}
            <section className="container mx-auto px-4 py-40">
                <div className="max-w-4xl mx-auto text-center mb-24">
                    <h2 className="text-4xl md:text-6xl font-black text-foreground mb-8">Data for <span className="gradient-text uppercase">Serious Traders.</span></h2>
                    <p className="text-xl text-muted-foreground leading-relaxed font-medium">
                        Our reporting system is designed to provide the transparency required by professional prop firms and private capital managers.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {reportFeatures.map((feature, i) => (
                        <motion.div
                            key={i}
                            initial={{ y: 30, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="glass-card p-10 hover:border-primary/30 transition-all group"
                        >
                            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-8 ring-1 ring-primary/20 group-hover:bg-primary/20 transition-all">
                                <feature.icon className="w-8 h-8 text-primary" />
                            </div>

                            <h3 className="text-2xl font-black text-foreground mb-4 leading-tight">{feature.title}</h3>

                            <p className="text-muted-foreground leading-relaxed font-medium">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* CASE STUDY SECTION [NEW] */}
            <section className="container mx-auto px-4 py-32 border-t border-border/50 bg-primary/5 rounded-[60px]">
                <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-20">
                    <div className="flex-1 text-center lg:text-left">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold mb-8 uppercase tracking-widest">
                            Performance Verification
                        </div>
                        <h2 className="text-4xl lg:text-6xl font-black text-foreground mb-8 leading-tight tracking-tight uppercase">Beyond <br /><span className="gradient-text">Dashboards.</span></h2>
                        <p className="text-xl text-muted-foreground leading-relaxed font-medium mb-10">
                            Stop relying on screenshots and manual logs. Use institutional-grade verification to prove your edge and discipline to partners, investors, or prop firms.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center gap-8 justify-center lg:justify-start">
                            <div>
                                <div className="text-4xl font-black text-foreground mb-1">Pass rate +24%</div>
                                <div className="text-sm font-bold text-muted-foreground uppercase tracking-widest">With Professional Proof</div>
                            </div>
                            <div className="w-[1px] h-12 bg-border hidden sm:block" />
                            <div>
                                <div className="text-4xl font-black text-foreground mb-1">Zero Breaches</div>
                                <div className="text-sm font-bold text-muted-foreground uppercase tracking-widest">In Verified Accounts</div>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 flex items-center justify-center relative">
                        <div className="absolute inset-0 bg-primary/20 blur-[120px] rounded-full -z-10" />
                        <div className="glass-card p-4 hover:scale-105 transition-transform duration-500 cursor-default">
                            <div className="p-8 bg-background border border-border/50 rounded-3xl shadow-glow-sm">
                                <div className="flex items-center gap-6 mb-12">
                                    <Globe className="w-16 h-16 text-primary" />
                                    <div className="h-1 flex-1 bg-primary/20 rounded-full" />
                                    <Shield className="w-16 h-16 text-primary" />
                                </div>
                                <p className="text-sm font-bold text-muted-foreground leading-relaxed italic mb-8">
                                    "Verifiable proof of discipline is the single most important asset a professional trader can hold in the modern age."
                                </p>
                                <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                                    <div className="h-full bg-primary w-full animate-pulse" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Layer */}
            <section className="container mx-auto px-4 py-40 text-center">
                <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto"
                >
                    <h2 className="text-4xl md:text-6xl font-black text-foreground mb-8">Professional Proof <br /><span className="gradient-text uppercase">On Demand.</span></h2>
                    <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
                        Join the elite circle of traders using institutional-grade reporting to scale their funding and build undeniable trading authority.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                        <Link to="/signup">
                            <Button variant="hero" size="xl" className="h-20 px-12 text-xl shadow-glow-md">
                                Start Pro-Level Reporting
                                <ArrowRight className="w-6 h-6 ml-3" />
                            </Button>
                        </Link>
                        <Link to="/contact">
                            <Button variant="outline" size="xl" className="h-20 px-12 text-xl border-primary/30">
                                Inquire About Audit Ties
                            </Button>
                        </Link>
                    </div>
                </motion.div>
            </section>
        </div>
    );
}

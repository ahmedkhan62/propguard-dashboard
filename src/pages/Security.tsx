import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
    TrendingUp,
    Shield,
    Lock,
    Eye,
    Database,
    CheckCircle,
    X,
    ArrowRight,
    FileCode,
    Server,
    Key,
    AlertTriangle,
    Verified,
    Network,
    Cpu,
} from "lucide-react";

const securityFeatures = [
    {
        icon: Eye,
        title: "Read-Only Access Guaranteed",
        description: "RiskLock uses MetaApi in strict read-only mode. We can observe your trades but cannot execute, modify, or cancel any orders — by design.",
        technical: "API permissions limited to market data and account state observation only.",
    },
    {
        icon: X,
        title: "Zero Trade Execution Capability",
        description: "No trade execution endpoints are integrated. Code-level blocks prevent any order placement, position modification, or account changes.",
        technical: "Execution functions are architecturally absent from the codebase.",
    },
    {
        icon: Lock,
        title: "Encrypted Data Transport",
        description: "All communication between RiskLock and your broker uses industry-standard TLS encryption. Your trading data is never exposed in transit.",
        technical: "TLS 1.3+ with certificate pinning and end-to-end encryption.",
    },
    {
        icon: Database,
        title: "Minimal Data Collection",
        description: "We only collect what's necessary for risk calculation: account balance, equity, open positions, and trade history. No personal identification is required.",
        technical: "Data collected: equity, balance, PnL, position details. Zero PII stored.",
    },
    {
        icon: Server,
        title: "Enterprise-Grade Infrastructure",
        description: "Hosted on secure, compliant cloud infrastructure with automated backups, DDoS protection, and 99.9% uptime SLA.",
        technical: "AWS Infrastructure with SOC 2 compliance and automated failover.",
    },
    {
        icon: Key,
        title: "Secure API Key Management",
        description: "Your MetaApi keys are encrypted at rest using AES-256 encryption. Keys are never logged, never displayed, and never shared.",
        technical: "AES-256-GCM encryption with hardware security modules (HSM).",
    },
];

const dataBoundaries = [
    {
        title: "What RiskLock CAN Access",
        items: [
            "Current account balance and equity",
            "Open positions and trade history",
            "Profit and loss calculations",
            "Risk rule violations and states",
        ],
        icon: CheckCircle,
        color: "status-safe",
    },
    {
        title: "What RiskLock CANNOT Access",
        items: [
            "Trade execution or order modification",
            "Withdrawal or deposit functions",
            "Broker login credentials",
            "Personal identification documents",
        ],
        icon: X,
        color: "status-danger",
    },
];

export default function Security() {
    return (
        <div className="pt-12">
            {/* Hero Section */}
            <section className="container mx-auto px-4 mb-32 z-10 relative min-h-[80vh] flex flex-col justify-center items-center">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 blur-[120px] rounded-full pointer-events-none -z-10" />
                <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="max-w-4xl mx-auto text-center"
                >
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] md:text-xs font-bold mb-10 shadow-glow-sm backdrop-blur-md uppercase tracking-widest"
                    >
                        <Verified className="w-3 h-3" />
                        Enterprise-Grade Security
                    </motion.div>

                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-foreground leading-[1.1] tracking-tight mb-8">
                        Built on <span className="gradient-text uppercase">Absolute Trust.</span>
                    </h1>

                    <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed font-medium mb-10">
                        RiskLock prioritizes your security above all else. Read-only by design, encrypted by default, and compliant with institutional standards.
                    </p>

                    <div className="inline-flex items-center gap-4 px-8 py-4 rounded-2xl bg-status-safe/10 border border-status-safe/20 border-dashed">
                        <Shield className="w-6 h-6 text-status-safe" />
                        <span className="text-lg font-black text-status-safe uppercase tracking-wide">Zero Trade Execution Risk</span>
                    </div>
                </motion.div>
            </section>

            {/* Architecture Overview */}
            <section className="container mx-auto px-4 py-32 border-y border-border/50 bg-secondary/10 backdrop-blur-sm">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center max-w-6xl mx-auto">
                    <motion.div
                        initial={{ x: -30, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-5xl font-black text-foreground mb-8 leading-tight">
                            The Secure <br />
                            <span className="text-primary uppercase tracking-wider">Protocol Stack.</span>
                        </h2>
                        <div className="space-y-8 text-lg text-muted-foreground font-medium leading-relaxed">
                            <div className="flex gap-4">
                                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                                    <Network className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-foreground text-xl mb-2">MetaApi Infrastructure</h4>
                                    <p className="text-base text-muted-foreground">Certified connection protocol that uses broker-level REST/WebSocket APIs with read-only scoped tokens. We never touch your broker's master password.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                                    <Cpu className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-foreground text-xl mb-2">Stateless Computation</h4>
                                    <p className="text-base text-muted-foreground">Our risk engines process data tick-by-tick in ephemeral memory. No sensitive trading information is ever persisted beyond the current calculation cycle.</p>
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
                        <div className="bg-background/80 backdrop-blur-md p-10 rounded-[40px] border border-border/50 relative">
                            <div className="flex items-center gap-4 mb-10">
                                <div className="w-3 h-3 rounded-full bg-status-danger" />
                                <div className="w-3 h-3 rounded-full bg-status-warning" />
                                <div className="w-3 h-3 rounded-full bg-status-safe" />
                                <div className="h-[1px] flex-1 bg-border/50" />
                                <div className="text-[10px] font-bold text-muted-foreground tracking-widest uppercase">Security Audit v2.4</div>
                            </div>
                            <div className="space-y-6">
                                <div className="h-4 w-3/4 bg-primary/10 rounded animate-pulse" />
                                <div className="h-4 w-1/2 bg-primary/10 rounded animate-pulse" />
                                <div className="h-4 w-2/3 bg-primary/10 rounded animate-pulse" />
                                <div className="pt-8 flex justify-between items-end">
                                    <div className="space-y-2">
                                        <div className="text-[10px] font-bold text-muted-foreground uppercase">Encryption</div>
                                        <div className="text-lg font-black text-foreground tracking-tighter">AES-256-GCM</div>
                                    </div>
                                    <Lock className="w-12 h-12 text-primary opacity-20" />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Security Features Grid */}
            <section className="container mx-auto px-4 py-32">
                <div className="text-center mb-20">
                    <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-4">
                        Defense in Depth
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black text-foreground mb-6 tracking-tight">
                        How We <span className="gradient-text uppercase">Protect You.</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {securityFeatures.map((feature, i) => (
                        <motion.div
                            key={i}
                            initial={{ y: 30, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="glass-card p-8 hover:border-primary/30 transition-all group"
                        >
                            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 ring-1 ring-primary/20 group-hover:bg-primary/20 transition-all">
                                <feature.icon className="w-7 h-7 text-primary" />
                            </div>

                            <h3 className="text-xl font-black text-foreground mb-3">{feature.title}</h3>

                            <p className="text-muted-foreground mb-6 leading-relaxed font-medium">
                                {feature.description}
                            </p>

                            <div className="p-4 rounded-xl bg-secondary/30 border border-border/50">
                                <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-2 flex items-center gap-2">
                                    <FileCode className="w-3 h-3" /> Technical Spec
                                </div>
                                <div className="text-xs text-foreground font-mono leading-relaxed">{feature.technical}</div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Case Study Section [NEW] */}
            <section className="container mx-auto px-4 py-32 border-t border-border/50">
                <div className="glass-card p-12 lg:p-24 max-w-6xl mx-auto relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 -skew-x-12 -z-10" />

                    <div className="max-w-3xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold mb-8 uppercase tracking-widest">
                            Real-World Protection
                        </div>
                        <h2 className="text-4xl lg:text-5xl font-black text-foreground mb-8 leading-tight tracking-tight italic">
                            "The breach lock saved my <span className="text-primary">$200k account</span> during the CPI news event."
                        </h2>
                        <p className="text-xl text-muted-foreground leading-relaxed font-medium mb-10">
                            When slippage threatened a hard drawdown breach, RiskLock's sub-ms rule engine identified the risk before the broker terminal even updated. It triggered an instant mobile alert and account-protective lock, preventing a terminal violation.
                        </p>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-primary/20" />
                            <div>
                                <div className="font-black text-foreground uppercase tracking-wider">J. Maxwell</div>
                                <div className="text-sm font-bold text-primary">Funded Trader at FTMO</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Data Boundaries */}
            <section className="container mx-auto px-4 py-32">
                <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-6xl font-black text-foreground mb-6 tracking-tight">
                        Total <span className="gradient-text uppercase">Transparency.</span>
                    </h2>
                    <p className="text-lg text-muted-foreground font-medium">Our system is architected for privacy. If we don't need it to protect you, we don't touch it.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {dataBoundaries.map((boundary, i) => (
                        <motion.div
                            key={i}
                            initial={{ x: i === 0 ? -30 : 30, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            className={`glass-card p-12 lg:p-14 border-${boundary.color === 'status-safe' ? 'primary' : 'status-danger'}/20 transition-all hover:bg-secondary/10`}
                        >
                            <div className="flex items-center gap-4 mb-8">
                                <div className={`w-14 h-14 rounded-2xl bg-${boundary.color}/20 flex items-center justify-center shrink-0`}>
                                    <boundary.icon className={`w-7 h-7 text-${boundary.color === 'status-safe' ? 'primary' : 'status-danger'}`} />
                                </div>
                                <h3 className="text-2xl font-black text-foreground uppercase tracking-tighter">{boundary.title}</h3>
                            </div>

                            <ul className="space-y-6">
                                {boundary.items.map((item, j) => (
                                    <li key={j} className="flex items-start gap-4">
                                        <CheckCircle className={`w-6 h-6 text-${boundary.color === 'status-safe' ? 'primary' : 'status-danger'} shrink-0 mt-0.5`} />
                                        <span className="text-lg font-bold text-foreground leading-snug">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Compliance Statement */}
            <section className="container mx-auto px-4 py-32 mb-10">
                <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    className="glass-card p-12 lg:p-24 max-w-5xl mx-auto relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-[60px] rounded-full" />
                    <div className="text-center mb-12">
                        <div className="w-20 h-20 rounded-3xl bg-primary/10 flex items-center justify-center mx-auto mb-8 ring-2 ring-primary/20">
                            <Verified className="w-10 h-10 text-primary" />
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black text-foreground mb-6 uppercase tracking-tight"> Compliance Maturity</h2>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 text-lg text-muted-foreground font-medium leading-relaxed mb-12">
                        <p>
                            RiskLock is designed with prop firm compliance as a non-negotiable standard. We understand that funded traders operate under institutional-grade rules, and our platform ensures you never violate them while maintaining absolute trader independence.
                        </p>
                        <p>
                            Every performance metric, risk calculation, and behavioral insight is engineered to support the sustainable scaling of your trading business within a secure, compliant environment.
                        </p>
                    </div>

                    <div className="p-8 rounded-3xl bg-secondary/30 border border-primary/20 border-dashed max-w-3xl mx-auto mb-16">
                        <div className="flex items-start gap-6">
                            <Shield className="w-10 h-10 text-primary shrink-0 mt-1" />
                            <div>
                                <div className="font-black text-foreground text-xl mb-3 uppercase tracking-wider">The RiskLock Guarantee</div>
                                <p className="text-base text-muted-foreground leading-relaxed">
                                    We will never execute trades, modify orders, or gain access to your broker master credentials. Our system exists purely to observe, compute, and protect — providing a technological buffer between you and the market.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                        <Link to="/how-it-works">
                            <Button variant="hero" size="xl" className="h-20 px-12 text-xl shadow-glow-md">
                                Explore The Core Mechanics
                                <ArrowRight className="w-6 h-6 ml-3" />
                            </Button>
                        </Link>
                        <Link to="/signup">
                            <Button variant="outline" size="xl" className="h-20 px-12 text-xl border-primary/30">
                                Create Secure Account
                            </Button>
                        </Link>
                    </div>
                </motion.div>
            </section>
        </div>
    );
}

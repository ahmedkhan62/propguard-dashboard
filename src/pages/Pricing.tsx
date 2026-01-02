import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
    CheckCircle,
    X,
    Zap,
    Shield,
    Star,
    ArrowRight,
    TrendingUp,
    Activity,
    BarChart3,
    Globe,
    Settings,
    Lock,
} from "lucide-react";

const plans = [
    {
        name: "Standard",
        price: "$19",
        description: "Essential protection for serious prop firm traders.",
        features: [
            "1 Connected Account",
            "Real-Time Risk Monitoring",
            "Basic Drawdown Alerts",
            "Daily Loss Limits",
            "MT4/MT5 Support",
            "Mobile App Access",
        ],
        notIncluded: [
            "AI Behavioral Insights",
            "Multi-Account Aggregation",
            "Professional PDF Reports",
            "Priority Support",
            "Custom Rule Presets",
        ],
        cta: "Get Standard",
        popular: false,
        priceLabel: "per month, cancel anytime",
    },
    {
        name: "Elite",
        price: "$29",
        description: "Advanced protection for professional funding challengers.",
        features: [
            "3 Connected Accounts",
            "Everything in Standard",
            "AI Behavioral Insights",
            "Professional PDF Reports",
            "Priority Email Support",
            "Prop Firm Rule Presets",
            "Advanced Risk Metrics",
        ],
        notIncluded: ["Multi-Account Aggregation", "Unlimited Accounts", "Dedicated Account Manager"],
        cta: "Get Elite",
        popular: true,
        priceLabel: "per month, billed annually",
    },
    {
        name: "Ultra",
        price: "$79",
        description: "Institutional-grade management for high-capital traders.",
        features: [
            "Unlimited Accounts",
            "Everything in Elite",
            "Multi-Account Aggregation",
            "Dedicated Account Manager",
            "Custom Risk Architecture",
            "24/7 Priority Hotline",
            "Team Dashboard Access",
        ],
        notIncluded: [],
        cta: "Go Ultra",
        popular: false,
        priceLabel: "per month, billed annually",
    },
];

const comparisonFeatures = [
    {
        category: "Core Monitoring", features: [
            { name: "Max Accounts", standard: "1", elite: "3", ultra: "Unlimited" },
            { name: "Real-time P&L", standard: true, elite: true, ultra: true },
            { name: "Drawdown Buffer", standard: true, elite: true, ultra: true },
            { name: "Trade Speed", standard: "Standard", elite: "Priority", ultra: "Ultra-Low Latency" },
        ]
    },
    {
        category: "Advanced Intelligence", features: [
            { name: "AI Insights", standard: false, elite: true, ultra: true },
            { name: "Revenge Trade Filter", standard: false, elite: true, ultra: true },
            { name: "Exposure Aggregation", standard: false, elite: false, ultra: true },
        ]
    },
    {
        category: "Reporting & Export", features: [
            { name: "CSV/Excel Exports", standard: true, elite: true, ultra: true },
            { name: "PDF Compliance Reports", standard: false, elite: true, ultra: true },
            { name: "Verification Hashes", standard: false, elite: true, ultra: true },
        ]
    },
];

export default function Pricing() {
    return (
        <div className="pt-12">
            {/* Hero */}
            <section className="container mx-auto px-4 mb-24 text-center relative min-h-[80vh] flex flex-col justify-center items-center">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 blur-[120px] rounded-full pointer-events-none -z-10" />
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="max-w-3xl mx-auto"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] md:text-xs font-bold mb-10 shadow-glow-sm backdrop-blur-md uppercase tracking-widest">
                        <Star className="w-3 h-3" />
                        Pricing Plans
                    </div>
                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-foreground mb-8 leading-[1.1] tracking-tight">
                        Plans for Every <span className="gradient-text">Stage of Success</span>
                    </h1>
                    <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed font-medium">
                        From your first funding challenge to managing institutional capital — we have the protection you need to survive and thrive.
                    </p>
                </motion.div>
            </section>

            {/* Pricing Cards */}
            <section className="container mx-auto px-4 mb-32">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {plans.map((plan, i) => (
                        <motion.div
                            key={plan.name}
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: i * 0.1 }}
                            className={`glass-card p-8 lg:p-10 flex flex-col relative ${plan.popular ? "ring-2 ring-primary border-primary/50" : ""
                                }`}
                        >
                            {plan.popular && (
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-glow-sm">
                                    Most Popular
                                </div>
                            )}

                            <div className="mb-8">
                                <h3 className="text-2xl font-black text-foreground mb-2">{plan.name}</h3>
                                <p className="text-sm text-muted-foreground font-medium leading-relaxed">{plan.description}</p>
                            </div>

                            <div className="mb-8">
                                <div className="flex items-baseline gap-1">
                                    <span className="text-5xl font-black text-foreground">{plan.price}</span>
                                    {plan.price !== "Free" && <span className="text-lg font-bold text-muted-foreground">/mo</span>}
                                </div>
                                <p className="text-xs text-muted-foreground font-semibold mt-2 uppercase tracking-wider">{plan.priceLabel}</p>
                            </div>

                            <div className="space-y-4 mb-10 flex-grow">
                                {plan.features.map((feature) => (
                                    <div key={feature} className="flex items-start gap-3">
                                        <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                                        <span className="text-sm font-bold text-foreground">{feature}</span>
                                    </div>
                                ))}
                                {plan.notIncluded.map((feature) => (
                                    <div key={feature} className="flex items-start gap-3 opacity-40">
                                        <X className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
                                        <span className="text-sm font-medium text-muted-foreground">{feature}</span>
                                    </div>
                                ))}
                            </div>

                            <Link to="/signup" className="w-full">
                                <Button variant={plan.popular ? "hero" : "outline"} className="w-full h-14 text-lg font-bold shadow-glow-sm">
                                    {plan.cta}
                                    <ArrowRight className="w-5 h-5 ml-2" />
                                </Button>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Comparison Table */}
            <section className="relative z-10 container mx-auto px-4 py-32 bg-secondary/20 backdrop-blur-sm mt-20">
                <div className="max-w-4xl mx-auto text-center mb-20">
                    <h2 className="text-3xl md:text-5xl font-black text-foreground mb-6">Detailed <span className="gradient-text">Comparison</span></h2>
                    <p className="text-muted-foreground font-medium">Compare features across all tiers to find the right level of protection.</p>
                </div>

                <div className="max-w-5xl mx-auto overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-border/50">
                                <th className="pb-6 pt-6 text-sm font-black text-foreground uppercase tracking-widest">Features</th>
                                <th className="pb-6 pt-6 text-sm font-black text-foreground uppercase tracking-widest text-center">Standard</th>
                                <th className="pb-6 pt-6 text-sm font-black text-foreground uppercase tracking-widest text-center">Elite</th>
                                <th className="pb-6 pt-6 text-sm font-black text-foreground uppercase tracking-widest text-center text-primary">Ultra</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border/30">
                            {comparisonFeatures.map((group) => (
                                <div key={group.category} className="contents" style={{ display: 'contents' }}>
                                    <tr className="bg-primary/5">
                                        <td colSpan={4} className="py-4 px-4 text-xs font-black text-primary uppercase tracking-widest">{group.category}</td>
                                    </tr>
                                    {group.features.map((feature) => (
                                        <tr key={feature.name} className="hover:bg-primary/5 transition-colors">
                                            <td className="py-5 px-4 text-sm font-bold text-foreground">{feature.name}</td>
                                            <td className="py-5 px-4 text-center">
                                                {typeof feature.standard === "boolean" ? (
                                                    feature.standard ? <CheckCircle className="w-5 h-5 text-primary mx-auto" /> : <X className="w-5 h-5 text-muted-foreground/30 mx-auto" />
                                                ) : <span className="text-sm font-bold text-muted-foreground">{feature.standard}</span>}
                                            </td>
                                            <td className="py-5 px-4 text-center">
                                                {typeof feature.elite === "boolean" ? (
                                                    feature.elite ? <CheckCircle className="w-5 h-5 text-primary mx-auto" /> : <X className="w-5 h-5 text-muted-foreground/30 mx-auto" />
                                                ) : <span className="text-sm font-bold text-muted-foreground">{feature.elite}</span>}
                                            </td>
                                            <td className="py-5 px-4 text-center">
                                                {typeof feature.ultra === "boolean" ? (
                                                    feature.ultra ? <CheckCircle className="w-5 h-5 text-primary mx-auto" /> : <X className="w-5 h-5 text-muted-foreground/30 mx-auto" />
                                                ) : <span className="text-sm font-bold text-primary">{feature.ultra}</span>}
                                            </td>
                                        </tr>
                                    ))}
                                </div>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Trust & Safe By Design */}
            <section className="container mx-auto px-4 py-32">
                <div className="glass-card p-12 lg:p-20 max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-16">
                    <div className="flex-1">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-status-safe/10 border border-status-safe/20 text-status-safe text-xs font-bold mb-8 uppercase tracking-widest">
                            <Shield className="w-3 h-3" />
                            Safe By Design
                        </div>
                        <h2 className="text-4xl lg:text-5xl font-black text-foreground mb-8 leading-tight tracking-tight">PROTECTION THAT <span className="gradient-text uppercase">NEVER EXPIRES</span></h2>
                        <p className="text-lg text-muted-foreground leading-relaxed mb-10 font-medium">
                            RiskLock is built on an enterprise-grade architecture that prioritizes safety above all else. Your funds are never at risk because we physically cannot execute trades.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                            {[
                                { icon: Lock, title: "AES-256 Encryption", desc: "Military-grade data protection" },
                                { icon: Globe, title: "Global Compliance", desc: "Aligned with prop firm rules" },
                                { icon: Activity, title: "0.1ms Latency", desc: "Real-time decision engine" },
                                { icon: Shield, title: "Read-Only Access", desc: "100% fund safety guaranteed" },
                            ].map((item) => (
                                <div key={item.title} className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                                        <item.icon className="w-6 h-6 text-primary" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-foreground text-lg mb-1">{item.title}</h4>
                                        <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex-1 relative w-full aspect-square max-w-md">
                        <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full" />
                        <div className="relative glass-card-hover p-8 md:p-12 w-full h-full flex items-center justify-center">
                            <Shield className="w-48 h-48 text-primary shadow-glow-md" />
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="container mx-auto px-4 py-32 text-center">
                <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto border-t border-border/50 pt-32"
                >
                    <h2 className="text-4xl md:text-6xl font-black text-foreground mb-8">Ready to Protect <span className="gradient-text">Your Capital?</span></h2>
                    <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
                        Join thousands of funded traders who rely on RiskLock to maintain discipline and scale their trading business.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                        <Link to="/signup">
                            <Button variant="hero" size="xl" className="h-20 px-12 text-xl shadow-glow-md">
                                Get Started Now
                                <ArrowRight className="w-6 h-6 ml-3" />
                            </Button>
                        </Link>
                        <Link to="/contact">
                            <Button variant="outline" size="xl" className="h-20 px-12 text-xl border-primary/30 hover:bg-primary/5">
                                Contact Enterprise Sales
                            </Button>
                        </Link>
                    </div>
                </motion.div>
            </section>
        </div>
    );
}

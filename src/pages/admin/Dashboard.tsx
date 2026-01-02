import { motion } from "framer-motion";
import {
    Users,
    TrendingUp,
    CreditCard,
    ArrowUpRight,
    ArrowDownRight,
    Activity,
    Shield,
    Zap,
    AlertTriangle,
    CheckCircle2,
    MessageSquare,
    Clock,
    AlertCircle
} from "lucide-react";

const stats = [
    {
        label: "Monthly Recurring Revenue (MRR)",
        description: "Total money earned every month from active subscriptions",
        insight: "Strong growth this month due to new subscriptions",
        value: "$42,400",
        change: "+12.5%",
        trend: "up",
        icon: TrendingUp,
        emoji: "💰",
        color: "text-primary",
        bg: "bg-primary/10"
    },
    {
        label: "Annual Recurring Revenue (ARR)",
        description: "Projected yearly revenue if current subscriptions continue",
        insight: "Revenue stability improving — long-term outlook positive",
        value: "$508,800",
        change: "+8.2%",
        trend: "up",
        icon: CreditCard,
        emoji: "🏦",
        color: "text-status-safe",
        bg: "bg-status-safe/10"
    },
    {
        label: "Average Revenue Per User (ARPU)",
        description: "On average, how much one user pays us",
        insight: "Users upgrading to higher plans like Ultra",
        value: "$34.12",
        change: "+1.5%",
        trend: "up",
        icon: Users,
        emoji: "💎",
        color: "text-blue-500",
        bg: "bg-blue-500/10"
    },
    {
        label: "Customer Lifetime Value (LTV)",
        description: "Total revenue a single user generates before leaving",
        insight: "Retention improving, churn decreasing",
        value: "$412.00",
        change: "+3.2%",
        trend: "up",
        icon: Activity,
        emoji: "⏳",
        color: "text-status-danger",
        bg: "bg-status-danger/10"
    },
];

const attentionItems = [
    {
        id: 1,
        label: "Subscription Cancellations",
        value: "Increased by 5% today",
        severity: "warning",
        action: "View Churn Report"
    },
    {
        id: 2,
        label: "Support Response Time",
        value: "Average > 6 hours (High)",
        severity: "danger",
        action: "Assign Staff"
    },
    {
        id: 3,
        label: "Payment Failure Rate",
        value: "Above normal (4.2%)",
        severity: "warning",
        action: "Check Stripe"
    },
];

export default function AdminDashboard() {
    return (
        <div className="space-y-10 pb-20">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-border/50">
                <div className="space-y-1">
                    <div className="inline-flex items-center gap-2 px-2 py-1 rounded bg-primary/10 text-[10px] font-black text-primary uppercase tracking-widest mb-2">
                        <Shield className="w-3 h-3" />
                        Executive Control Room
                    </div>
                    <h1 className="text-4xl font-black text-foreground tracking-tight">Welcome back, <span className="gradient-text">Founder</span></h1>
                    <p className="text-muted-foreground font-medium text-lg">Here is exactly what's happening with your business right now.</p>
                </div>
                <div className="flex items-center gap-4 bg-secondary/30 p-2 rounded-2xl border border-border/50">
                    <div className="px-4 py-2 text-center">
                        <div className="text-[10px] font-black text-muted-foreground uppercase tracking-widest whitespace-nowrap">Revenue Health</div>
                        <div className="text-status-safe font-bold flex items-center justify-center gap-1 group cursor-help">
                            Strong <CheckCircle2 className="w-4 h-4" />
                        </div>
                    </div>
                    <div className="w-px h-8 bg-border/50" />
                    <div className="px-4 py-2 text-center">
                        <div className="text-[10px] font-black text-muted-foreground uppercase tracking-widest whitespace-nowrap">System Status</div>
                        <div className="text-status-safe font-bold flex items-center justify-center gap-1">
                            Stable <Zap className="w-4 h-4 animate-pulse" />
                        </div>
                    </div>
                </div>
            </header>

            {/* Founder Attention Box */}
            <section className="space-y-4">
                <h2 className="text-sm font-black text-foreground uppercase tracking-[0.2em] flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-status-danger" />
                    Founder Attention Required
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {attentionItems.map((item) => (
                        <motion.div
                            key={item.id}
                            whileHover={{ y: -2 }}
                            className={`p-5 rounded-2xl border flex flex-col justify-between gap-4 transition-all ${item.severity === 'danger'
                                    ? "bg-status-danger/5 border-status-danger/20 hover:border-status-danger/40"
                                    : "bg-status-warning/5 border-status-warning/20 hover:border-status-warning/40"
                                }`}
                        >
                            <div>
                                <div className="text-xs font-black text-muted-foreground uppercase mb-1">{item.label}</div>
                                <div className={`text-lg font-bold ${item.severity === 'danger' ? 'text-status-danger' : 'text-status-warning'}`}>
                                    {item.value}
                                </div>
                            </div>
                            <button className="w-fit px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest flex items-center gap-2 bg-secondary hover:bg-secondary/80 transition-colors">
                                {item.action} <ArrowUpRight className="w-3 h-3" />
                            </button>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* 5-Second Questions Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <motion.div
                        key={stat.label}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className="glass-card p-6 border-border/50 hover:border-primary/30 transition-all flex flex-col h-full group"
                    >
                        <div className="flex items-center justify-between mb-6">
                            <span className="text-3xl">{stat.emoji}</span>
                            <div className={cn(
                                "flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full",
                                stat.trend === "up" ? "bg-status-safe/10 text-status-safe" : "bg-status-danger/10 text-status-danger"
                            )}>
                                {stat.trend === "up" ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                                {stat.change}
                                <span className="text-[10px] opacity-60 ml-0.5 whitespace-nowrap">THIS MONTH</span>
                            </div>
                        </div>

                        <div className="space-y-1 mb-6">
                            <h3 className="text-sm font-black text-foreground uppercase tracking-widest leading-tight">{stat.label}</h3>
                            <p className="text-[10px] text-muted-foreground font-medium leading-relaxed italic">{stat.description}</p>
                            <div className="text-3xl font-black text-foreground pt-2">{stat.value}</div>
                        </div>

                        <div className="mt-auto pt-4 border-t border-border/30">
                            <div className="flex items-start gap-2 text-[11px] font-bold text-primary italic leading-tight">
                                <Activity className="w-3 h-3 mt-0.5 shrink-0" />
                                "{stat.insight}"
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Support & Reputation Snapshot */}
                <div className="lg:col-span-1 space-y-6">
                    <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                        <MessageSquare className="w-5 h-5 text-primary" />
                        Support & Reputation
                    </h2>
                    <div className="space-y-4">
                        <div className="glass-card p-6 border-border/50 space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Global CSAT</span>
                                <span className="text-2xl font-black text-status-safe">4.8/5.0</span>
                            </div>
                            <div className="h-2 bg-secondary rounded-full overflow-hidden">
                                <div className="h-full bg-status-safe w-[92%]" />
                            </div>
                            <p className="text-[11px] text-muted-foreground font-medium">
                                "Users are extremely happy with the news protection feature."
                            </p>
                        </div>

                        <div className="glass-card p-5 border-border/50 flex items-center justify-between group cursor-pointer hover:border-primary/30 transition-all">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center">
                                    <Clock className="w-5 h-5 text-orange-500" />
                                </div>
                                <div>
                                    <div className="text-xs font-black text-muted-foreground uppercase">Response Time</div>
                                    <div className="font-bold text-foreground">6.2 Hours</div>
                                </div>
                            </div>
                            <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                        </div>
                    </div>
                </div>

                {/* User Quality Analysis */}
                <div className="lg:col-span-2 space-y-6">
                    <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                        <Users className="w-5 h-5 text-primary" />
                        User Quality Insights
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="glass-card p-6 border-border/50 space-y-4 hover:border-blue-500/30 transition-all">
                            <div className="flex items-center justify-between">
                                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                                    <Shield className="w-5 h-5 text-blue-500" />
                                </div>
                                <span className="text-xs font-black text-blue-500 uppercase tracking-widest border border-blue-500/20 px-2 py-0.5 rounded">High Quality</span>
                            </div>
                            <div>
                                <div className="text-2xl font-black text-foreground">242 Power Users</div>
                                <p className="text-xs text-muted-foreground font-medium">Traders using 3+ advanced risk modules daily.</p>
                            </div>
                        </div>

                        <div className="glass-card p-6 border-border/50 space-y-4 hover:border-red-500/30 transition-all">
                            <div className="flex items-center justify-between">
                                <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center">
                                    <AlertCircle className="w-5 h-5 text-red-500" />
                                </div>
                                <span className="text-xs font-black text-red-500 uppercase tracking-widest border border-red-500/20 px-2 py-0.5 rounded">Action Needed</span>
                            </div>
                            <div>
                                <div className="text-2xl font-black text-foreground">18 Users At-Risk</div>
                                <p className="text-xs text-muted-foreground font-medium">Low usage + nearing renewal. High churn probability.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function cn(...inputs: any[]) {
    return inputs.filter(Boolean).join(" ");
}

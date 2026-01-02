import { motion } from "framer-motion";
import {
    TrendingUp,
    CreditCard,
    ArrowUpRight,
    Download,
    PieChart,
    BarChart,
    CheckCircle2,
    Target
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { Navigate } from "react-router-dom";

const revenueStats = [
    {
        label: "Monthly Recurring Revenue (MRR)",
        description: "Total money we earn every month from active subscriptions",
        insight: "Strong growth this month due to new subscriptions",
        value: "$42,400",
        change: "+5.2%",
        trend: "up",
        emoji: "💰"
    },
    {
        label: "Annual Recurring Revenue (ARR)",
        description: "Projected yearly revenue if current subscriptions continue",
        insight: "Revenue stability improving — long-term outlook positive",
        value: "$508,800",
        change: "+12.1%",
        trend: "up",
        emoji: "📈"
    },
    {
        label: "Average Revenue Per User (ARPU)",
        description: "On average, how much one user pays us",
        insight: "Users upgrading to higher plans",
        value: "$34.12",
        change: "+1.5%",
        trend: "up",
        emoji: "👥"
    },
    {
        label: "Customer Lifetime Value (LTV)",
        description: "Total revenue a single user generates before leaving",
        insight: "Retention improving, churn decreasing",
        value: "$412.00",
        change: "+3.2%",
        trend: "up",
        emoji: "⏳"
    },
];

export default function AdminBilling() {
    const { user } = useAuth();

    if (user?.role !== 'FOUNDER') {
        return <Navigate to="/dashboard" replace />;
    }

    return (
        <div className="space-y-10 pb-20">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-border/50">
                <div className="space-y-1">
                    <div className="inline-flex items-center gap-2 px-2 py-1 rounded bg-status-safe/10 text-[10px] font-black text-status-safe uppercase tracking-widest mb-2">
                        <CheckCircle2 className="w-3 h-3" />
                        Financial Health: Excellent
                    </div>
                    <h1 className="text-4xl font-black text-foreground tracking-tight">Billing & <span className="gradient-text">Revenue</span></h1>
                    <p className="text-muted-foreground font-medium text-lg">Money, growth, and customer value—simplified.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" className="gap-2 text-primary border-primary/20 hover:bg-primary/5 rounded-xl h-12 px-6 font-bold">
                        <Download className="w-4 h-4" />
                        Download Full Statement
                    </Button>
                </div>
            </header>

            {/* Quick Insights Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {revenueStats.map((stat, i) => (
                    <motion.div
                        key={stat.label}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className="glass-card p-6 border-border/50 hover:border-primary/30 transition-all flex flex-col h-full group"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-2xl">{stat.emoji}</span>
                            <div className="flex items-center gap-1 text-[10px] font-bold text-status-safe bg-status-safe/10 px-2 py-1 rounded-full">
                                <ArrowUpRight className="w-3 h-3" />
                                {stat.change}
                            </div>
                        </div>

                        <div className="space-y-1 mb-4">
                            <h3 className="text-[11px] font-black text-muted-foreground uppercase tracking-wider leading-tight">{stat.label}</h3>
                            <div className="text-3xl font-black text-foreground">{stat.value}</div>
                        </div>

                        <div className="mt-auto space-y-3">
                            <p className="text-[10px] text-muted-foreground/80 font-medium leading-relaxed bg-secondary/30 p-2 rounded-lg border border-border/30">
                                {stat.description}
                            </p>
                            <div className="flex items-start gap-2 text-[10px] font-bold text-primary italic">
                                <TrendingUp className="w-3 h-3 mt-0.5 shrink-0" />
                                "{stat.insight}"
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Visual Momentum Section */}
                <div className="glass-card p-8 border-border/50 overflow-hidden relative">
                    <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none">
                        <Target className="w-48 h-48" />
                    </div>

                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="font-bold text-xl text-foreground">Revenue Momentum</h3>
                            <p className="text-xs text-muted-foreground font-medium">Monthly growth trend since launch</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm" className="bg-secondary text-[10px] font-black uppercase">Monthly</Button>
                            <Button variant="ghost" size="sm" className="text-[10px] font-black uppercase opacity-50">Annual</Button>
                        </div>
                    </div>

                    <div className="h-[250px] flex items-center justify-center border-b border-border/20 pb-8 relative group">
                        <BarChart className="w-16 h-16 text-primary/10 group-hover:text-primary/20 transition-colors" />
                        <div className="absolute inset-0 flex items-center justify-center p-12">
                            <p className="text-muted-foreground text-sm font-medium italic text-center max-w-[200px]">
                                Preparing your visual revenue report...
                            </p>
                        </div>
                    </div>
                </div>

                <div className="glass-card p-8 border-border/50 overflow-hidden relative">
                    <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none">
                        <PieChart className="w-48 h-48" />
                    </div>

                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="font-bold text-xl text-foreground">Churn Impact</h3>
                            <p className="text-xs text-muted-foreground font-medium">Where we are losing money</p>
                        </div>
                        <Button variant="ghost" size="sm" className="text-primary hover:bg-primary/5 text-[10px] font-black uppercase tracking-widest">Deep Dive</Button>
                    </div>

                    <div className="h-[250px] flex items-center justify-center border-b border-border/20 pb-8 relative group">
                        <PieChart className="w-16 h-16 text-primary/10 group-hover:text-primary/20 transition-colors" />
                        <div className="absolute inset-0 flex items-center justify-center p-12">
                            <p className="text-muted-foreground text-sm font-medium italic text-center max-w-[200px]">
                                Analyzing cohort behavior...
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

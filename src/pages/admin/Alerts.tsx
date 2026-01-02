import { motion } from "framer-motion";
import {
    Bell,
    AlertCircle,
    AlertTriangle,
    Info,
    CheckCircle,
    Clock,
    Filter,
    Search,
    ChevronRight,
    MessageSquare,
    Zap,
    ShieldAlert,
    Target
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const alerts = [
    {
        id: 1,
        type: "danger",
        title: "Large Drawdown Breach",
        msg: "User #1294 (Standard) breached 5% daily limit. Risk team notified automatically.",
        time: "5 mins ago",
        category: "Risk",
        severity: "Urgent"
    },
    {
        id: 2,
        type: "warning",
        title: "Payment Failure Spike",
        msg: "9 failed renewals detected. Likely an issue with a specific regional bank processor.",
        time: "12 mins ago",
        category: "Billing",
        severity: "Monitor"
    },
    {
        id: 3,
        type: "info",
        title: "New Ticket Received",
        msg: "High-priority support request regarding broker synchronization delay.",
        time: "45 mins ago",
        category: "Support",
        severity: "Low"
    },
    {
        id: 4,
        type: "success",
        title: "System Recovery",
        msg: "Prop firm data feeds have successfully recovered from a brief timeout.",
        time: "1 hour ago",
        category: "System",
        severity: "Resolved"
    },
];

export default function AdminAlerts() {
    return (
        <div className="space-y-10 pb-20">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-border/50">
                <div className="space-y-1">
                    <div className="inline-flex items-center gap-2 px-2 py-1 rounded bg-status-danger/10 text-[10px] font-black text-status-danger uppercase tracking-widest mb-2">
                        <Bell className="w-3 h-3" />
                        Live Intelligence Feed
                    </div>
                    <h1 className="text-4xl font-black text-foreground tracking-tight">Alerts <span className="gradient-text">Center</span></h1>
                    <p className="text-muted-foreground font-medium text-lg">Priority events requiring your executive oversight.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" className="gap-2 rounded-xl h-12 px-6 font-bold border-border/50 hover:bg-secondary">
                        Mark All as Read
                    </Button>
                </div>
            </header>

            <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                        placeholder="Search priority events..."
                        className="pl-12 h-14 bg-card border-border/50 focus:border-primary rounded-2xl text-lg font-medium"
                    />
                </div>
            </div>

            <div className="space-y-4">
                <h2 className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] mb-4">Current Active Alerts</h2>
                {alerts.map((alert, i) => (
                    <motion.div
                        key={alert.id}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className={`glass-card p-6 border transition-all flex items-start gap-6 group rounded-3xl ${alert.type === 'danger' ? 'border-status-danger/20 hover:border-status-danger/40 bg-status-danger/[0.02]' :
                                alert.type === 'warning' ? 'border-status-warning/20 hover:border-status-warning/40 bg-status-warning/[0.02]' :
                                    'border-border/50 hover:border-primary/30'
                            }`}
                    >
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 border ${alert.type === 'danger' ? 'bg-status-danger/10 text-status-danger border-status-danger/20' :
                                alert.type === 'warning' ? 'bg-status-warning/10 text-status-warning border-status-warning/20' :
                                    alert.type === 'success' ? 'bg-status-safe/10 text-status-safe border-status-safe/20' :
                                        'bg-primary/10 text-primary border-primary/20'
                            }`}>
                            {alert.type === 'danger' ? <ShieldAlert className="w-7 h-7" /> :
                                alert.type === 'warning' ? <AlertTriangle className="w-7 h-7" /> :
                                    alert.type === 'success' ? <CheckCircle className="w-7 h-7" /> :
                                        <Zap className="w-7 h-7" />}
                        </div>

                        <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-3">
                                    <h3 className="font-black text-xl text-foreground group-hover:text-primary transition-colors">{alert.title}</h3>
                                    <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md ${alert.severity === 'Urgent' ? 'bg-status-danger text-white' :
                                            alert.severity === 'Monitor' ? 'bg-status-warning text-white' :
                                                'bg-secondary text-muted-foreground'
                                        }`}>
                                        {alert.severity}
                                    </span>
                                </div>
                                <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-1.5 opacity-60">
                                    <Clock className="w-3 h-3" />
                                    {alert.time}
                                </span>
                            </div>
                            <p className="text-base text-muted-foreground/90 font-medium leading-relaxed mb-4 max-w-3xl">{alert.msg}</p>
                            <div className="flex items-center justify-between">
                                <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-lg border ${alert.category === 'Risk' ? 'bg-status-danger/5 text-status-danger border-status-danger/10' :
                                        alert.category === 'Billing' ? 'bg-status-warning/5 text-status-warning border-status-warning/10' :
                                            'bg-primary/5 text-primary border-primary/10'
                                    }`}>
                                    Domain: {alert.category}
                                </span>
                                <Button variant="ghost" size="sm" className="h-10 px-4 rounded-xl text-xs font-black uppercase tracking-widest gap-2 hover:bg-primary/10 hover:text-primary transition-all">
                                    Intervene <ChevronRight className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="pt-12 border-t border-border/50">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                            <MessageSquare className="w-6 h-6" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black text-foreground">Support Intelligence</h2>
                            <p className="text-sm text-muted-foreground font-medium">Customer satisfaction and ticket status</p>
                        </div>
                    </div>
                </div>
                <div className="glass-card p-20 border-border/50 text-center rounded-3xl relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/[0.02] opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative z-10 flex flex-col items-center gap-4">
                        <div className="w-16 h-16 rounded-3xl bg-secondary flex items-center justify-center mb-2">
                            <Target className="w-8 h-8 text-muted-foreground/40" />
                        </div>
                        <p className="text-xl text-muted-foreground font-bold italic">"All quiet on the support front."</p>
                        <p className="text-sm text-muted-foreground/60 max-w-sm mx-auto">No open tickets currently exceed the 2-hour response threshold. Your team is performing at peak efficiency.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

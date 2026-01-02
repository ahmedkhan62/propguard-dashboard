import { motion } from "framer-motion";
import {
    Shield,
    Activity,
    Terminal,
    AlertTriangle,
    CheckCircle2,
    Clock,
    RefreshCw,
    Database,
    Cloud,
    Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";

const logs = [
    { id: 1, type: "error", msg: "Broker connection lost for High-Volume users", time: "2 mins ago", service: "TradeSync", impact: "High" },
    { id: 2, type: "success", msg: "Daily database backup secured successfully", time: "15 mins ago", service: "Storage", impact: "None" },
    { id: 3, type: "warning", msg: "API response time slower than usual (Slight lag)", time: "1 hour ago", service: "Network", impact: "Low" },
    { id: 4, type: "info", msg: "New Professional subscription activated", time: "2 hours ago", service: "Billing", impact: "None" },
];

export default function AdminHealth() {
    return (
        <div className="space-y-10 pb-20">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-border/50">
                <div className="space-y-1">
                    <div className="inline-flex items-center gap-2 px-2 py-1 rounded bg-status-safe/10 text-[10px] font-black text-status-safe uppercase tracking-widest mb-2">
                        <Zap className="w-3 h-3" />
                        Platform Performance: Balanced
                    </div>
                    <h1 className="text-4xl font-black text-foreground tracking-tight">System <span className="gradient-text">Health & Vitals</span></h1>
                    <p className="text-muted-foreground font-medium text-lg">Real-time status of the engines powering your business.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" className="gap-2 rounded-xl h-12 px-6 font-bold border-border/50 hover:bg-secondary">
                        <RefreshCw className="w-4 h-4" />
                        Run System Diagnostic
                    </Button>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { label: "API Uptime", description: "System availability this month", value: "99.98%", icon: Cloud, color: "text-status-safe", emoji: "🌐" },
                    { label: "Sync Engine", description: "Broker data synchronization speed", value: "Optimal", icon: Database, color: "text-primary", emoji: "⚡" },
                    { label: "Error Rate", description: "Frequency of failed requests", value: "0.02%", icon: Activity, color: "text-status-safe", emoji: "📉" },
                ].map((stat, i) => (
                    <motion.div
                        key={stat.label}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className="glass-card p-6 border-border/50"
                    >
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center text-xl">
                                {stat.emoji}
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest leading-none mb-1">{stat.label}</span>
                                <span className="text-2xl font-black text-foreground">{stat.value}</span>
                            </div>
                        </div>
                        <p className="text-[11px] text-muted-foreground font-medium">{stat.description}</p>
                    </motion.div>
                ))}
            </div>

            <div className="glass-card border-border/50 overflow-hidden rounded-3xl">
                <div className="p-6 border-b border-border/50 flex items-center justify-between bg-secondary/20">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                            <Terminal className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                            <h2 className="font-bold text-lg text-foreground leading-none">Founder Event Log</h2>
                            <p className="text-xs text-muted-foreground font-medium mt-1">Plain-English summary of recent system events</p>
                        </div>
                    </div>
                </div>
                <div className="divide-y divide-border/20">
                    {logs.map((log) => (
                        <div key={log.id} className="p-5 flex items-center gap-6 hover:bg-primary/[0.02] transition-colors group">
                            <div className={`w-3 h-3 rounded-full shrink-0 ${log.type === 'error' ? 'bg-status-danger shadow-[0_0_10px_rgba(239,68,68,0.5)]' :
                                    log.type === 'warning' ? 'bg-status-warning shadow-[0_0_10px_rgba(245,158,11,0.5)]' :
                                        log.type === 'success' ? 'bg-status-safe shadow-[0_0_10px_rgba(34,197,94,0.5)]' : 'bg-primary'
                                }`} />
                            <div className="flex-1">
                                <p className="text-sm font-bold text-foreground leading-snug">{log.msg}</p>
                                <div className="flex items-center gap-4 mt-2">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-primary bg-primary/5 px-2 py-0.5 rounded-md border border-primary/10">{log.service}</span>
                                    <span className="text-[10px] font-medium text-muted-foreground flex items-center gap-1.5">
                                        <Clock className="w-3 h-3" />
                                        {log.time}
                                    </span>
                                    {log.impact !== 'None' && (
                                        <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md ${log.impact === 'High' ? 'bg-status-danger/10 text-status-danger' : 'bg-status-warning/10 text-status-warning'
                                            }`}>
                                            IMPACT: {log.impact}
                                        </span>
                                    )}
                                </div>
                            </div>
                            <Button variant="ghost" size="sm" className="rounded-xl font-bold text-xs hover:bg-secondary border border-transparent hover:border-border/30">
                                Investigate
                            </Button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

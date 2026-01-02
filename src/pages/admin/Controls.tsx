import { useState } from "react";
import { motion } from "framer-motion";
import {
    Settings,
    Power,
    Bell,
    Wrench,
    Lock,
    Zap,
    MessageSquare,
    AlertCircle,
    ShieldAlert,
    ChevronRight,
    Megaphone
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useAuth } from "@/context/AuthContext";
import { Navigate } from "react-router-dom";

export default function AdminControls() {
    const { user } = useAuth();

    if (user?.role !== 'FOUNDER') {
        return <Navigate to="/dashboard" replace />;
    }

    return (
        <div className="space-y-10 pb-20">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-border/50">
                <div className="space-y-1">
                    <div className="inline-flex items-center gap-2 px-2 py-1 rounded bg-status-danger/10 text-[10px] font-black text-status-danger uppercase tracking-widest mb-2">
                        <Lock className="w-3 h-3" />
                        Platform Authority Zone
                    </div>
                    <h1 className="text-4xl font-black text-foreground tracking-tight">Global <span className="gradient-text">Controls</span></h1>
                    <p className="text-muted-foreground font-medium text-lg">Platform-wide overrides and emergency tactical switches.</p>
                </div>
                <div className="flex items-center gap-4">
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <Button variant="destructive" className="gap-3 shadow-[0_0_20px_rgba(239,68,68,0.2)] h-14 px-8 rounded-2xl font-black uppercase tracking-widest border-2 border-status-danger/20 hover:border-status-danger transition-all">
                            <ShieldAlert className="w-6 h-6 animate-pulse" />
                            EMERGENCY KILL SWITCH
                        </Button>
                    </motion.div>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Feature Toggles */}
                <div className="glass-card p-8 border-border/50 space-y-8 rounded-3xl">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                            <Zap className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                            <h2 className="font-bold text-xl text-foreground leading-none">Market Access & Features</h2>
                            <p className="text-xs text-muted-foreground font-medium mt-1">Tactical control over core platform modules</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {[
                            { label: "New User Signups", desc: "Allow or block new professional registrations", active: true, emoji: "🚪" },
                            { label: "Broker Data Syncing", desc: "Global MT4/MT5 connectivity engine", active: true, emoji: "🔄" },
                            { label: "Payment Gateway", desc: "Enable or pause subscription processing", active: true, emoji: "💳" },
                            { label: "AI Intelligence", desc: "Real-time behavior analysis background jobs", active: true, emoji: "🧠" },
                        ].map((item) => (
                            <div key={item.label} className="flex items-center justify-between p-5 rounded-2xl bg-secondary/20 border border-border/30 hover:border-primary/20 transition-all group">
                                <div className="flex items-center gap-4">
                                    <span className="text-xl">{item.emoji}</span>
                                    <div>
                                        <div className="font-bold text-foreground group-hover:text-primary transition-colors">{item.label}</div>
                                        <div className="text-[11px] text-muted-foreground font-medium">{item.desc}</div>
                                    </div>
                                </div>
                                <Switch checked={item.active} className="data-[state=checked]:bg-primary" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* System Announcements */}
                <div className="space-y-8">
                    <div className="glass-card p-8 border-border/50 space-y-8 rounded-3xl h-fit">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                                <Megaphone className="w-5 h-5 text-blue-500" />
                            </div>
                            <div>
                                <h2 className="font-bold text-xl text-foreground leading-none">Executive Announcement</h2>
                                <p className="text-xs text-muted-foreground font-medium mt-1">Communicate directly with all active traders</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <textarea
                                    className="w-full h-32 bg-secondary/50 border border-border/50 rounded-2xl p-5 text-sm font-medium focus:outline-none focus:border-blue-500/50 transition-all resize-none shadow-inner"
                                    placeholder="Enter message to display on all user dashboards (e.g. Scheduled maintenance at 8PM GMT...)"
                                />
                            </div>
                            <div className="flex items-center gap-4">
                                <Button variant="hero" className="flex-1 h-12 rounded-xl shadow-glow-sm font-black uppercase tracking-widest text-xs">
                                    Push To All Users
                                </Button>
                                <Button variant="outline" className="h-12 px-6 rounded-xl font-bold border-border/50 hover:bg-secondary">
                                    Clear
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className="glass-card p-8 border-status-warning/20 bg-status-warning/5 rounded-3xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-[0.05] pointer-events-none rotate-12">
                            <Wrench className="w-24 h-24 text-status-warning" />
                        </div>

                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-xl bg-status-warning/10 flex items-center justify-center text-status-warning">
                                <Wrench className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg text-foreground leading-none">Maintenance Mode</h3>
                                <p className="text-[11px] text-status-warning/70 font-bold uppercase tracking-widest mt-1">Status: Offline Disabled</p>
                            </div>
                        </div>

                        <div className="flex items-center justify-between gap-6">
                            <p className="text-sm font-medium text-muted-foreground leading-relaxed">
                                Activating maintenance mode will safely lock all non-admin access and display a custom "Back Soon" screen.
                            </p>
                            <Button variant="ghost" className="shrink-0 h-12 px-6 rounded-xl font-black uppercase tracking-widest bg-status-warning/10 text-status-warning hover:bg-status-warning hover:text-white transition-all border border-status-warning/20">
                                Activate
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

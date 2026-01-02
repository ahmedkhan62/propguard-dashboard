import React from 'react';
import { motion } from "framer-motion";
import { Activity, Clock, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface ConfidenceIndicatorProps {
    status: 'LIVE' | 'DEGRADED' | 'STALE' | 'PAUSED';
    lastSync: string | null;
    latencyMs?: number;
}

export const ConfidenceIndicator = ({ status, lastSync, latencyMs }: ConfidenceIndicatorProps) => {
    const config = {
        LIVE: { color: "text-status-safe", bg: "bg-status-safe/10", label: "Sync: Live", desc: "Data is synchronized and up-to-date with broker." },
        DEGRADED: { color: "text-status-warning", bg: "bg-status-warning/10", label: "Sync: Slow", desc: "Latency detected. Data might be slightly delayed." },
        STALE: { color: "text-status-danger", bg: "bg-status-danger/10", label: "Sync: Stale", desc: "Connection lost. Please check your broker credentials." },
        PAUSED: { color: "text-white/40", bg: "bg-white/5", label: "Sync: Paused", desc: "Synchronization is currently inactive." },
    };

    const current = config[status] || config.PAUSED;

    return (
        <div className="flex items-center gap-3 group relative">
            <div className={cn(
                "flex items-center gap-2 px-3 py-1 rounded-full border border-white/5 transition-all cursor-help",
                current.bg
            )}>
                <motion.div
                    animate={status === 'LIVE' ? { scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] } : {}}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className={cn("w-2 h-2 rounded-full", status === 'LIVE' ? "bg-status-safe shadow-[0_0_8px_green]" : (status === 'STALE' ? 'bg-status-danger' : "bg-white/20"))}
                />
                <span className={cn("text-[10px] font-bold uppercase tracking-widest", current.color)}>
                    {current.label}
                </span>

                {/* Simple Tooltip */}
                <div className="absolute top-full mt-2 left-0 w-48 p-2 bg-card border border-border rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity z-50 pointer-events-none">
                    <p className="text-[10px] text-white/60 leading-relaxed italic">
                        {current.desc}
                    </p>
                </div>
            </div>

            <div className="hidden md:flex items-center gap-4 text-[10px] text-white/40 font-medium">
                {latencyMs && (
                    <div className="flex items-center gap-1">
                        <Activity className="w-3 h-3" />
                        {latencyMs}ms
                    </div>
                )}
                <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {lastSync ? `Last Sync: ${new Date(lastSync).toLocaleTimeString()}` : 'N/A'}
                </div>
            </div>
        </div>
    );
};

import React from 'react';
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useQuery } from "@tanstack/react-query";
import { ApiService } from "@/services/api";
import { motion } from "framer-motion";
import { Briefcase, TrendingUp, AlertTriangle, Layers, ArrowUpRight } from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";
import { DashboardSkeleton } from "@/components/dashboard/DashboardSkeleton";

export default function Portfolio() {
    const { data: portfolio, isLoading, error } = useQuery({
        queryKey: ['portfolio-overview'],
        queryFn: ApiService.getPortfolio,
        refetchInterval: 5000,
    });

    if (isLoading || (!portfolio && !error)) return <DashboardSkeleton />;

    if (error) {
        return (
            <DashboardLayout>
                <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4 text-white">
                    <div className="p-4 bg-status-danger/10 border border-status-danger/20 rounded-xl text-status-danger text-center">
                        <h3 className="font-bold text-lg">Portfolio Error</h3>
                        <p className="text-sm opacity-80">Failed to aggregate account data. Technical details: {error instanceof Error ? error.message : "Unknown error"}</p>
                    </div>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-8 py-3 bg-white text-black font-bold rounded-full hover:bg-opacity-90 transition-all font-mono uppercase tracking-widest"
                    >
                        Force Refresh
                    </button>
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout>
            <div className="space-y-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-white">Portfolio View</h1>
                        <p className="text-white/40">Aggregated risk across all connected accounts</p>
                    </div>
                    <div className="bg-accent-primary/10 border border-accent-primary/20 px-4 py-2 rounded-lg">
                        <span className="text-accent-primary font-bold">{portfolio.account_count} Accounts Connected</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <StatCard
                        title="Total Equity"
                        value={`$${portfolio.total_equity.toLocaleString()}`}
                        icon={TrendingUp}
                        className="bg-accent-primary/5 border-accent-primary/10"
                    />
                    <StatCard
                        title="Total Balance"
                        value={`$${portfolio.total_balance.toLocaleString()}`}
                        icon={Briefcase}
                    />
                    <StatCard
                        title="Global P/L"
                        value={`$${portfolio.total_profit.toLocaleString()}`}
                        icon={ArrowUpRight}
                        trend={{ value: 0, positive: portfolio.total_profit >= 0 }}
                    />
                </div>

                {portfolio.correlation_warnings.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-status-warning/10 border border-status-warning/20 p-6 rounded-2xl flex gap-4 items-start"
                    >
                        <AlertTriangle className="w-6 h-6 text-status-warning shrink-0" />
                        <div className="space-y-1">
                            <h3 className="font-bold text-status-warning uppercase tracking-tight">Correlation Alerts</h3>
                            <ul className="space-y-1">
                                {portfolio.correlation_warnings.map((warn: string, i: number) => (
                                    <li key={i} className="text-sm text-status-warning/80">• {warn}</li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="glass-card p-8 space-y-6">
                        <div className="flex items-center gap-3">
                            <Layers className="w-5 h-5 text-accent-primary" />
                            <h2 className="text-xl font-bold text-white">Account Breakdown</h2>
                        </div>
                        <div className="space-y-4">
                            {(portfolio?.accounts || []).map((acc: any) => (
                                <div key={acc.id} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5 hover:border-white/10 transition-all cursor-pointer">
                                    <div>
                                        <h4 className="font-bold text-white">{acc.name}</h4>
                                        <p className="text-[10px] text-white/40 uppercase tracking-widest">{acc.status}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-bold text-white">${acc.equity.toLocaleString()}</p>
                                        <p className="text-[10px] text-white/40 italic">Equity</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="glass-card p-8">
                        <h2 className="text-xl font-bold text-white mb-6">Asset Allocation</h2>
                        <div className="space-y-6">
                            {Object.entries(portfolio?.symbol_exposure || {}).map(([sym, vols]: [any, any]) => (
                                <div key={sym} className="space-y-2">
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="font-bold text-white uppercase">{sym}</span>
                                        <span className="text-white/40">{(vols.long + vols.short).toFixed(2)} Lots Total</span>
                                    </div>
                                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden flex">
                                        <div className="bg-status-safe h-full" style={{ width: `${(vols.long / (vols.long + vols.short || 1)) * 100}%` }} />
                                        <div className="bg-status-danger h-full" style={{ width: `${(vols.short / (vols.long + vols.short || 1)) * 100}%` }} />
                                    </div>
                                    <div className="flex justify-between text-[10px] uppercase font-bold tracking-widest">
                                        <span className="text-status-safe">Long: {vols.long.toFixed(2)}</span>
                                        <span className="text-status-danger">Short: {vols.short.toFixed(2)}</span>
                                    </div>
                                </div>
                            ))}
                            {Object.keys(portfolio?.symbol_exposure || {}).length === 0 && (
                                <div className="text-center py-12 text-white/20">
                                    No active exposure detected.
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}

import React from 'react';
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { motion } from "framer-motion";
import { ShieldCheck, Eye, Lock, FileText, CheckCircle, Info } from "lucide-react";

const TransparencyPage = () => {
    const sections = [
        {
            title: "What RiskLock Reads",
            icon: Eye,
            items: [
                "Account Equity & Balance",
                "Open Position Tickets & Symbols",
                "Trade Profit/Loss (Floating)",
                "Account Leverage & Currency"
            ],
            color: "text-accent-primary"
        },
        {
            title: "What RiskLock NEVER Touches",
            icon: Lock,
            items: [
                "Placing New Orders",
                "Modifying Take Profit / Stop Loss",
                "Closing Active Positions",
                "Adjusting Margin or Leverage"
            ],
            color: "text-status-danger"
        },
        {
            title: "Broker Permissions",
            icon: ShieldCheck,
            items: [
                "RPC Connection Mode: READ-ONLY",
                "API Scopes: ACCOUNT_INFO, POSITIONS",
                "Non-Trading Token Scopes enforced by MetaApi"
            ],
            color: "text-status-safe"
        }
    ];

    return (
        <DashboardLayout>
            <div className="space-y-8 max-w-5xl">
                <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                >
                    <div className="flex items-center gap-3 mb-2">
                        <ShieldCheck className="w-8 h-8 text-accent-primary" />
                        <h1 className="text-3xl font-bold text-white uppercase tracking-tight">Trust & Transparency</h1>
                    </div>
                    <p className="text-white/40 text-lg">
                        RiskLock is built on a "Read-Only" foundation. Here is exactly how we handle your data.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {sections.map((section, idx) => (
                        <motion.div
                            key={section.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="glass-card p-6 border-white/5 space-y-4"
                        >
                            <section.icon className={`w-8 h-8 ${section.color}`} />
                            <h3 className="text-xl font-bold text-white">{section.title}</h3>
                            <ul className="space-y-3">
                                {section.items.map(item => (
                                    <li key={item} className="flex items-start gap-2 text-sm text-white/60 leading-tight">
                                        <CheckCircle className={`w-4 h-4 mt-0.5 shrink-0 ${section.color}`} />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="p-8 bg-accent-primary/5 rounded-2xl border border-accent-primary/10 space-y-4"
                >
                    <div className="flex items-center gap-3">
                        <FileText className="w-6 h-6 text-accent-primary" />
                        <h3 className="text-xl font-bold text-white">Compliance Proof</h3>
                    </div>
                    <p className="text-white/60 leading-relaxed">
                        Our integration with MetaApi uses localized tokens that strictly lack "trade_execution" scopes.
                        Even if RiskLock's backend were compromised, no trade could ever be placed or modified from our infrastructure.
                        We function as a <strong>real-time mirror</strong>, providing a safety net without ever holding the keys to your execution.
                    </p>
                    <div className="flex flex-wrap gap-4 mt-4">
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-black/40 rounded-full border border-white/5">
                            <div className="w-2 h-2 rounded-full bg-status-safe shadow-[0_0_8px_green]" />
                            <span className="text-[10px] text-white/50 font-medium uppercase tracking-widest">Read-Only RPC Active</span>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-black/40 rounded-full border border-white/5">
                            <div className="w-2 h-2 rounded-full bg-status-safe shadow-[0_0_8px_green]" />
                            <span className="text-[10px] text-white/50 font-medium uppercase tracking-widest">No Trade Scopes</span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </DashboardLayout>
    );
};

export default TransparencyPage;

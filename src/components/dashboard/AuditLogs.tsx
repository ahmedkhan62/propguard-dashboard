import React from 'react';
import { motion } from "framer-motion";
import { History, Shield, Info } from "lucide-react";

interface AuditLogEntry {
    id: number;
    action: string;
    category: string;
    details: any;
    timestamp: string;
    broker_name?: string;
}

export const AuditLogs = ({ logs }: { logs: AuditLogEntry[] }) => {
    return (
        <div className="space-y-4">
            <div className="flex items-center gap-2 mb-2">
                <History className="w-5 h-5 text-accent-primary" />
                <h3 className="text-lg font-semibold text-white">Security & Risk Audit Trail</h3>
            </div>

            <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {logs.length > 0 ? (
                    logs.map((log) => (
                        <motion.div
                            key={log.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="p-3 bg-white/5 border border-white/10 rounded-lg flex items-start gap-4 hover:bg-white/[0.07] transition-colors"
                        >
                            <div className={`w-2 h-2 rounded-full mt-2 shrink-0 ${log.category === 'risk' ? 'bg-status-warning' :
                                    log.category === 'security' ? 'bg-accent-primary' : 'bg-white/20'
                                }`} />

                            <div className="flex-1 space-y-1">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium text-white/90 capitalize">
                                        {log.action.replace('_', ' ')}
                                    </span>
                                    <span className="text-[10px] text-white/40">
                                        {new Date(log.timestamp).toLocaleString()}
                                    </span>
                                </div>

                                <div className="text-xs text-white/60">
                                    {log.broker_name && <span className="text-accent-primary/60">[{log.broker_name}] </span>}
                                    {Object.entries(log.details).map(([field, vals]: [string, any]) => (
                                        <div key={field} className="mt-1">
                                            <span className="opacity-50">{field}:</span> {vals.old} → <span className="text-white/80 font-medium">{vals.new}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))
                ) : (
                    <div className="text-center py-10 text-white/20 italic text-sm">
                        No audit records found.
                    </div>
                )}
            </div>

            <div className="flex items-start gap-2 p-3 bg-accent-primary/5 rounded border border-accent-primary/10">
                <Info className="w-4 h-4 text-accent-primary shrink-0 mt-0.5" />
                <p className="text-[10px] text-white/60 leading-relaxed italic">
                    Audit logs are immutable and cryptographically timestamped for your protection and prop firm compliance.
                </p>
            </div>
        </div>
    );
};

import React from 'react';
import { motion } from "framer-motion";
import { CheckCircle2, Circle, ArrowRight, Link, Shield, Bell, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChecklistItem {
    id: string;
    title: string;
    description: string;
    isCompleted: boolean;
    icon: React.ReactNode;
}

interface OnboardingChecklistProps {
    items: ChecklistItem[];
    onItemClick: (id: string) => void;
}

export function OnboardingChecklist({ items, onItemClick }: OnboardingChecklistProps) {
    const completedCount = items.filter(i => i.isCompleted).length;
    const progress = (completedCount / items.length) * 100;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-6"
        >
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-lg font-bold text-foreground">Getting Started</h3>
                    <p className="text-xs text-muted-foreground mt-1">Complete these steps to fully secure your account.</p>
                </div>
                <div className="text-right">
                    <span className="text-sm font-bold text-primary">{completedCount}/{items.length}</span>
                    <div className="w-24 h-1.5 bg-white/5 rounded-full mt-2 overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            className="h-full bg-primary"
                        />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {items.map((item, i) => (
                    <button
                        key={item.id}
                        onClick={() => onItemClick(item.id)}
                        disabled={item.isCompleted}
                        className={cn(
                            "p-4 rounded-xl border transition-all text-left flex flex-col gap-3 group relative",
                            item.isCompleted
                                ? "bg-status-safe/5 border-status-safe/20 cursor-default opacity-80"
                                : "bg-white/5 border-white/5 hover:border-primary/50 hover:bg-white/10"
                        )}
                    >
                        <div className={cn(
                            "w-10 h-10 rounded-lg flex items-center justify-center transition-colors",
                            item.isCompleted ? "bg-status-safe/20 text-status-safe" : "bg-white/5 text-muted-foreground group-hover:text-primary"
                        )}>
                            {item.icon}
                        </div>

                        <div>
                            <h4 className={cn(
                                "text-sm font-bold transition-colors",
                                item.isCompleted ? "text-status-safe" : "text-foreground"
                            )}>
                                {item.title}
                            </h4>
                            <p className="text-[10px] text-muted-foreground mt-1 leading-relaxed">
                                {item.description}
                            </p>
                        </div>

                        <div className="absolute top-4 right-4">
                            {item.isCompleted ? (
                                <CheckCircle2 className="w-4 h-4 text-status-safe" />
                            ) : (
                                <ArrowRight className="w-4 h-4 text-white/10 group-hover:text-primary transition-colors" />
                            )}
                        </div>
                    </button>
                ))}
            </div>
        </motion.div>
    );
}

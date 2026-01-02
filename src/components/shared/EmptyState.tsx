import React from 'react';
import { motion } from "framer-motion";
import { LucideIcon, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
    title: string;
    description: string;
    icon: LucideIcon;
    actionLabel?: string;
    onAction?: () => void;
    className?: string;
}

export function EmptyState({ title, description, icon: Icon, actionLabel, onAction, className }: EmptyStateProps) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`flex flex-col items-center justify-center p-12 text-center glass-card border-dashed bg-white/[0.02] border-white/10 ${className}`}
        >
            <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-6">
                <Icon className="w-8 h-8 text-muted-foreground opacity-50" />
            </div>

            <h3 className="text-xl font-bold text-foreground mb-2">{title}</h3>
            <p className="text-sm text-muted-foreground max-w-sm mb-8 leading-relaxed">
                {description}
            </p>

            {actionLabel && onAction && (
                <Button
                    onClick={onAction}
                    className="gap-2 px-8"
                >
                    <Plus className="w-4 h-4" />
                    {actionLabel}
                </Button>
            )}
        </motion.div>
    );
}

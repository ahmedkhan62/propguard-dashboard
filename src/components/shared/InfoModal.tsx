import React from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { X, Info, ShieldCheck, Target, Zap } from "lucide-react";

interface InfoModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    content: React.ReactNode;
    type?: 'info' | 'safety' | 'limit';
}

export const InfoModal = ({ isOpen, onClose, title, content, type = 'info' }: InfoModalProps) => {
    const icons = {
        info: <Info className="w-6 h-6 text-primary" />,
        safety: <ShieldCheck className="w-6 h-6 text-status-safe" />,
        limit: <Target className="w-6 h-6 text-status-warning" />
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
                    />

                    <motion.div
                        initial={{ scale: 0.95, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 20 }}
                        className="relative w-full max-w-lg glass-card overflow-hidden"
                    >
                        {/* Header */}
                        <div className="p-6 border-b border-white/5 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                                    {icons[type]}
                                </div>
                                <h3 className="text-xl font-bold text-foreground">{title}</h3>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-white/5 rounded-lg transition-colors"
                            >
                                <X className="w-5 h-5 text-muted-foreground" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-6 max-h-[60vh] overflow-y-auto">
                            <div className="prose prose-invert prose-sm max-w-none text-muted-foreground leading-relaxed">
                                {content}
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="p-4 bg-white/5 flex justify-end">
                            <button
                                onClick={onClose}
                                className="px-6 py-2 bg-primary text-primary-foreground font-bold rounded-xl hover:opacity-90 transition-opacity"
                            >
                                Got it
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

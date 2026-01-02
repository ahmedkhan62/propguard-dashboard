import React from 'react';
import { motion } from 'framer-motion';

export const AnnouncementBar: React.FC = () => {
    const text = "Real-Time Risk Management for Prop Traders – Protect Your Capital, Enforce Discipline. | Pass Your Challenges with Confidence. | Secure Your Trading Future with RiskLock.";

    return (
        <div className="bg-primary/10 border-b border-primary/20 h-10 flex items-center overflow-hidden relative z-[60]">
            <div className="animate-scroll whitespace-nowrap flex items-center">
                {[...Array(4)].map((_, i) => (
                    <span key={i} className="text-sm font-bold text-primary px-8 flex items-center gap-2">
                        {text}
                        <span className="w-2 h-2 rounded-full bg-primary/40 block mx-4" />
                    </span>
                ))}
            </div>
        </div>
    );
};

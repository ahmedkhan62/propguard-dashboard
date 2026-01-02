import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, AlertOctagon, XCircle, Info, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { InfoModal } from "../shared/InfoModal";

interface RiskBannerProps {
    status: 'safe' | 'warning' | 'critical' | 'breach';
    violations: string[];
}

export function RiskBanner({ status, violations }: RiskBannerProps) {
    const [explanationOpen, setExplanationOpen] = useState(false);
    if (status === 'safe' || status === 'breach') return null;

    const config = {
        warning: {
            bg: "bg-status-warning/10",
            border: "border-status-warning/20",
            text: "text-status-warning",
            icon: AlertTriangle,
            label: "Risk Warning",
            explanation: (
                <div className="space-y-4">
                    <p>RiskLock has detected that your current trading behavior is approaching your predefined safety limits.</p>
                    <div className="p-4 bg-status-warning/5 border border-status-warning/10 rounded-xl">
                        <h4 className="font-bold text-status-warning mb-2 uppercase text-xs">What you should do:</h4>
                        <ul className="list-disc pl-4 space-y-2 text-sm">
                            <li>Avoid "revenge trading" to recover recent losses.</li>
                            <li>Reduce your lot sizes on upcoming trades.</li>
                            <li>Consider stepping away from the screen for 30 minutes.</li>
                        </ul>
                    </div>
                </div>
            )
        },
        critical: {
            bg: "bg-status-danger/10",
            border: "border-status-danger/20",
            text: "text-status-danger",
            icon: AlertOctagon,
            label: "Critical Risk Level",
            explanation: (
                <div className="space-y-4">
                    <p className="font-bold">Caution: Your account is at immediate risk of breaching prop firm rules.</p>
                    <div className="p-4 bg-status-danger/5 border border-status-danger/10 rounded-xl">
                        <h4 className="font-bold text-status-danger mb-2 uppercase text-xs">Immediate Action Required:</h4>
                        <ul className="list-disc pl-4 space-y-2 text-sm">
                            <li>Check for any unintended high-volume positions.</li>
                            <li>We recommend closing 50% of your open exposure to reduce margin stress.</li>
                            <li>If you hit the daily loss limit, RiskLock will automatically lock the dashboard to protect your account.</li>
                        </ul>
                    </div>
                </div>
            )
        }
    }[status as 'warning' | 'critical'];

    const Icon = config.icon;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden mb-6"
            >
                <div className={`${config.bg} border ${config.border} rounded-2xl p-4 flex items-start gap-4`}>
                    <div className={`p-2 rounded-xl bg-background/50 ${config.text}`}>
                        <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                        <h4 className={`font-bold ${config.text} mb-1 flex items-center gap-2`}>
                            {config.label}
                            <span className="text-xs px-2 py-0.5 rounded-full bg-background/50 font-medium">Action Recommended</span>
                        </h4>
                        <div className="space-y-1">
                            {violations.map((v, i) => (
                                <p key={i} className="text-sm text-foreground/80 flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-current opacity-50" />
                                    {v}
                                </p>
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setExplanationOpen(true)}
                            className="text-xs hover:bg-white/5 gap-2"
                        >
                            <HelpCircle className="w-4 h-4" />
                            Why am I seeing this?
                        </Button>
                        <div className="hidden md:block">
                            <Button variant="outline" size="sm" className="bg-background/20 border-current/20 hover:bg-background/40 w-full">
                                Review Rules
                            </Button>
                        </div>
                    </div>
                </div>
            </motion.div>

            <InfoModal
                isOpen={explanationOpen}
                onClose={() => setExplanationOpen(false)}
                title={config.label}
                content={config.explanation}
                type={status === 'critical' ? 'limit' : 'info'}
            />
        </AnimatePresence>
    );
}

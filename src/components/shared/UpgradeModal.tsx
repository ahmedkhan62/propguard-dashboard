import React from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Shield, Check, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface UpgradeModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    description?: string;
    feature?: string;
}

export function UpgradeModal({
    isOpen,
    onClose,
    title = "Upgrade to Pro",
    description = "Unlock the full power of RiskLock with advanced monitoring and unlimited accounts.",
    feature
}: UpgradeModalProps) {
    const navigate = useNavigate();

    const handleUpgrade = () => {
        onClose();
        navigate("/billing");
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px] overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent-primary" />
                <DialogHeader className="pt-4">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                        <Zap className="w-6 h-6 text-primary" />
                    </div>
                    <DialogTitle className="text-2xl font-bold">{title}</DialogTitle>
                    <DialogDescription className="text-muted-foreground text-base">
                        {feature ? (
                            <>
                                The <span className="text-foreground font-semibold">{feature}</span> feature is available exclusively for <span className="text-primary font-bold">Pro</span> users.
                            </>
                        ) : description}
                    </DialogDescription>
                </DialogHeader>

                <div className="py-6 space-y-4">
                    <div className="space-y-3">
                        {[
                            "Unlimited Broker Connections",
                            "Advanced Behavioral Safety Score",
                            "Detailed Session Bias Analysis",
                            "Telegram & SMS Real-time Alerts",
                            "Custom Watermarked PDF Reports"
                        ].map((item) => (
                            <div key={item} className="flex items-center gap-3">
                                <div className="w-5 h-5 rounded-full bg-status-safe/10 flex items-center justify-center">
                                    <Check className="w-3 h-3 text-status-safe" />
                                </div>
                                <span className="text-sm font-medium text-muted-foreground">{item}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col gap-3">
                    <Button
                        className="w-full h-12 text-sm font-bold gap-2 shadow-[0_0_20px_rgba(var(--primary-rgb),0.2)]"
                        onClick={handleUpgrade}
                    >
                        <Shield className="w-4 h-4" />
                        Upgrade Now
                    </Button>
                    <Button
                        variant="ghost"
                        className="w-full text-xs font-semibold text-muted-foreground"
                        onClick={onClose}
                    >
                        Maybe Later
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}

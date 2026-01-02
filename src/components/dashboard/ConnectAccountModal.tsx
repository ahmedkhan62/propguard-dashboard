import React, { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { ApiService } from "@/services/api";
import { Check, ChevronRight, Loader2, Server, ShieldCheck, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ConnectAccountModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSuccess?: () => void;
}

type Step = "platform" | "method" | "credentials";

export function ConnectAccountModal({ open, onOpenChange, onSuccess }: ConnectAccountModalProps) {
    const { toast } = useToast();
    const [step, setStep] = useState<Step>("platform");
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        platform: "mt5",
        provider: "metaapi",
        account_id: "",
        token: "",
        name: "",
    });

    const handleConnect = async () => {
        if (!formData.account_id || !formData.token) {
            toast({
                title: "Missing Fields",
                description: "Please fill in both Account ID and MetaApi Token.",
                variant: "destructive",
            });
            return;
        }

        setLoading(true);
        try {
            await ApiService.connectBroker(formData);
            toast({
                title: "Account Connected",
                description: "Your trading account has been linked successfully.",
            });
            onSuccess?.();
            onOpenChange(false);
            // Reset
            setStep("platform");
            setFormData({ platform: "mt5", provider: "metaapi", account_id: "", token: "", name: "" });
        } catch (error: any) {
            toast({
                title: "Connection Failed",
                description: error.response?.data?.detail || "Could not connect to broker. Please verify your credentials.",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    const renderPlatformStep = () => (
        <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
                {["mt4", "mt5"].map((p) => (
                    <button
                        key={p}
                        onClick={() => {
                            setFormData({ ...formData, platform: p });
                            setStep("method");
                        }}
                        className={`p-6 rounded-2xl border-2 transition-all flex flex-col items-center gap-3 ${formData.platform === p
                                ? "border-primary bg-primary/10 shadow-[0_0_20px_rgba(var(--primary),0.2)]"
                                : "border-border bg-secondary/50 hover:border-border-hover hover:bg-secondary"
                            }`}
                    >
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-xl ${formData.platform === p ? "bg-primary text-primary-foreground" : "bg-background text-foreground"
                            }`}>
                            {p.toUpperCase()}
                        </div>
                        <span className="font-semibold">{p === "mt4" ? "MetaTrader 4" : "MetaTrader 5"}</span>
                    </button>
                ))}
            </div>
            <div className="p-4 rounded-xl bg-secondary/30 border border-border/50 text-sm text-muted-foreground flex gap-3">
                <Server className="w-5 h-5 shrink-0" />
                <p>cTrader and MatchTrader support coming soon. Stay tuned!</p>
            </div>
        </div>
    );

    const renderMethodStep = () => (
        <div className="space-y-4 py-4">
            <div className="space-y-3">
                <button
                    onClick={() => setStep("credentials")}
                    className="w-full p-4 rounded-2xl border-2 border-primary bg-primary/10 shadow-[0_0_20px_rgba(var(--primary),0.2)] transition-all flex items-center justify-between group"
                >
                    <div className="flex items-center gap-4 text-left">
                        <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
                            <Zap className="w-6 h-6 text-primary-foreground" />
                        </div>
                        <div>
                            <div className="font-bold">MetaApi (Cloud Bridge)</div>
                            <div className="text-sm text-muted-foreground">High performance, real-time sync</div>
                        </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-primary group-hover:translate-x-1 transition-transform" />
                </button>

                <div className="w-full p-4 rounded-2xl border-2 border-border bg-secondary/20 opacity-50 cursor-not-allowed flex items-center justify-between">
                    <div className="flex items-center gap-4 text-left">
                        <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
                            <ShieldCheck className="w-6 h-6 text-muted-foreground" />
                        </div>
                        <div>
                            <div className="font-bold">Local EA Bridge</div>
                            <div className="text-sm text-muted-foreground italic">Coming soon</div>
                        </div>
                    </div>
                </div>
            </div>
            <Button variant="ghost" className="w-full" onClick={() => setStep("platform")}>
                Back to Platform Selection
            </Button>
        </div>
    );

    const renderCredentialsStep = () => (
        <div className="space-y-5 py-4">
            <div className="space-y-2">
                <Label htmlFor="account_name">Account Label (Optional)</Label>
                <Input
                    id="account_name"
                    placeholder="e.g. My FTMO Phase 1"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="account_id">MetaApi Account ID</Label>
                <Input
                    id="account_id"
                    placeholder="Paste your Account ID"
                    value={formData.account_id}
                    onChange={(e) => setFormData({ ...formData, account_id: e.target.value })}
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="token">MetaApi Token</Label>
                <Input
                    id="token"
                    type="password"
                    placeholder="Paste your API Token"
                    value={formData.token}
                    onChange={(e) => setFormData({ ...formData, token: e.target.value })}
                />
                <p className="text-[10px] text-muted-foreground">
                    Secret tokens are encrypted at rest and never shared with the frontend after connection.
                </p>
            </div>

            <div className="flex flex-col gap-3 pt-2">
                <Button
                    variant="hero"
                    className="w-full h-12 text-lg"
                    onClick={handleConnect}
                    disabled={loading}
                >
                    {loading ? (
                        <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            Verifying Connection...
                        </>
                    ) : (
                        <>
                            Link Account
                            <Check className="ml-2 h-5 w-5" />
                        </>
                    )}
                </Button>
                <Button variant="ghost" onClick={() => setStep("method")} disabled={loading}>
                    Back
                </Button>
            </div>
        </div>
    );

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[480px] bg-background/95 backdrop-blur-xl border-border shadow-2xl p-6">
                <DialogHeader>
                    <div className="mb-2 text-primary font-bold tracking-wider uppercase text-xs">
                        Step {step === "platform" ? "1" : step === "method" ? "2" : "3"} of 3
                    </div>
                    <DialogTitle className="text-2xl font-bold bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
                        {step === "platform" && "Select Trading Platform"}
                        {step === "method" && "Choose Connection Method"}
                        {step === "credentials" && "Enter Credentials"}
                    </DialogTitle>
                    <DialogDescription>
                        {step === "platform" && "Which platform does your broker use?"}
                        {step === "method" && "Select how RiskLock should monitor your trades."}
                        {step === "credentials" && "Link your account via MetaApi Cloud Bridge."}
                    </DialogDescription>
                </DialogHeader>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={step}
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -20, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        {step === "platform" && renderPlatformStep()}
                        {step === "method" && renderMethodStep()}
                        {step === "credentials" && renderCredentialsStep()}
                    </motion.div>
                </AnimatePresence>
            </DialogContent>
        </Dialog>
    );
}

import { motion } from "framer-motion";
import {
    FileText,
    AlertTriangle,
    Gavel,
    ShieldCheck,
    ArrowRight,
} from "lucide-react";

export default function Terms() {
    return (
        <div className="pt-12">

            {/* Content Section */}
            <section className="relative z-10 container mx-auto px-4 min-h-[50vh] flex flex-col justify-center items-center">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 blur-[120px] rounded-full pointer-events-none -z-10" />
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="text-center mb-16"
                    >
                        <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-foreground mb-8 leading-[1.1] tracking-tight">
                            Terms of <span className="gradient-text">Service</span>
                        </h1>
                        <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed font-medium">
                            Clear rules for a serious professional system. By using RiskLock, you agree to these terms.
                        </p>
                    </motion.div>

                    <div className="glass-card p-8 md:p-12 space-y-12">
                        <section>
                            <h2 className="text-2xl font-black text-foreground mb-4">1. Acceptance of Terms</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                By accessing or using RiskLock ("the Service"), you agree to be bound by these Terms of Service. If you disagree with any part of these terms, you may not access the Service.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-black text-foreground mb-4">2. Description of Service</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                RiskLock provides read-only risk management and monitoring tools for traders using MetaTrader 4 and 5 platforms. The Service is designed to assist with discipline and rule compliance but <strong className="text-foreground">does not guarantee trading success or financial gain</strong>.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-black text-foreground mb-4">3. Use of the Service</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                You are responsible for:
                            </p>
                            <ul className="list-disc list-inside mt-4 space-y-2 text-muted-foreground">
                                <li>Maintaining the confidentiality of your account credentials</li>
                                <li>Ensuring the accuracy of your risk rule configurations</li>
                                <li>All activities that occur under your account</li>
                                <li>Compliance with your broker's and prop firm's terms</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-black text-foreground mb-4">4. Limitations of Liability</h2>
                            <div className="p-6 rounded-2xl bg-secondary/30 border border-border/50">
                                <div className="flex items-start gap-3">
                                    <AlertTriangle className="w-5 h-5 text-status-warning shrink-0 mt-0.5" />
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        RiskLock is not liable for any financial losses, missed opportunities, or damages resulting from rule violations, technical issues, or use of the Service. Trading involves substantial risk of loss.
                                    </p>
                                </div>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-black text-foreground mb-4">5. Subscription & Billing</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                Paid subscriptions are billed on a recurring basis. You may cancel at any time. Refunds are governed by our 14-day money-back guarantee policy.
                            </p>
                        </section>

                        <section className="pt-8 border-t border-border/50">
                            <p className="text-sm text-muted-foreground">
                                Last updated: December 30, 2025. Contact <span className="text-primary font-bold">legal@risklock.ai</span> for formal inquiries.
                            </p>
                        </section>
                    </div>
                </div>
            </section>
        </div>
    );
}

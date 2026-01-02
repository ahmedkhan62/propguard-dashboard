import { motion } from "framer-motion";
import {
    Shield,
    Eye,
    Lock,
    Database,
    Globe,
    ArrowRight,
} from "lucide-react";

export default function PrivacyPolicy() {
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
                            Privacy <span className="gradient-text">Policy</span>
                        </h1>
                        <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed font-medium">
                            At RiskLock, your privacy is a cornerstone of our trust. Learn how we handle your data with institutional-grade sensitivity.
                        </p>
                    </motion.div>

                    <div className="glass-card p-8 md:p-12 space-y-12">
                        <section>
                            <h2 className="text-2xl font-black text-foreground mb-4">1. Data We Collect</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                We only collect data that is essential for providing our risk management services. This includes:
                            </p>
                            <ul className="list-disc list-inside mt-4 space-y-2 text-muted-foreground">
                                <li>Account state (balance, equity, floating P/L)</li>
                                <li>Trading history (positions, order types, timestamps)</li>
                                <li>MetaApi authentication keys (encrypted at rest)</li>
                                <li>Basic profile information (email address)</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-black text-foreground mb-4">2. How We Use Your Data</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                Your data is exclusively used to:
                            </p>
                            <ul className="list-disc list-inside mt-4 space-y-2 text-muted-foreground">
                                <li>Calculate real-time risk exposure and breach alerts</li>
                                <li>Provide performance analytics and reporting</li>
                                <li>Ensure compliance with your configured risk rules</li>
                                <li>Improve our algorithms for better protection</li>
                            </ul>
                            <div className="mt-6 p-4 rounded-xl bg-primary/5 border border-primary/20">
                                <p className="text-sm font-bold text-primary italic">
                                    "We never sell your data, use it for front-running, or share it with unauthorized third parties. Period."
                                </p>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-black text-foreground mb-4">3. Data Security</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                We employ industry-leading security measures:
                            </p>
                            <ul className="list-disc list-inside mt-4 space-y-2 text-muted-foreground">
                                <li>AES-256 encryption for all sensitive data at rest</li>
                                <li>TLS 1.3+ encryption for all data in transit</li>
                                <li>Regular security audits and vulnerability assessments</li>
                                <li>SOC 2 compliant cloud infrastructure</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-black text-foreground mb-4">4. Your Rights</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                You have full control over your data. You may request to:
                            </p>
                            <ul className="list-disc list-inside mt-4 space-y-2 text-muted-foreground">
                                <li>Export your complete trading data</li>
                                <li>Request permanent deletion of your account and related data</li>
                                <li>Update your contact information</li>
                            </ul>
                        </section>

                        <section className="pt-8 border-t border-border/50">
                            <p className="text-sm text-muted-foreground">
                                Last updated: December 30, 2025. For any privacy-related inquiries, contact us at <span className="text-primary font-bold">privacy@risklock.ai</span>.
                            </p>
                        </section>
                    </div>
                </div>
            </section>
        </div>
    );
}

import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
    AlertTriangle,
    ShieldAlert,
    BarChart3,
    ArrowRight,
} from "lucide-react";

export default function Disclaimer() {
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
                            Risk <span className="gradient-text">Disclaimer</span>
                        </h1>
                        <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed font-medium">
                            Trading is high risk. Success is not guaranteed. Read this carefully to understand the boundaries of our Service.
                        </p>
                    </motion.div>

                    <div className="glass-card p-8 md:p-12 space-y-10">
                        <div className="p-6 rounded-2xl bg-status-danger/10 border border-status-danger/20">
                            <div className="flex items-start gap-4">
                                <AlertTriangle className="w-8 h-8 text-status-danger shrink-0 mt-1" />
                                <div>
                                    <h2 className="text-xl font-black text-foreground mb-2 uppercase tracking-tight">High Risk Warning</h2>
                                    <p className="text-muted-foreground leading-relaxed">
                                        Trading leveraged financial instruments such as Forex, Commodities, and Stocks involves a high level of risk and may not be suitable for all investors. The high degree of leverage can work against you as well as for you. Before deciding to trade, you should carefully consider your investment objectives, level of experience, and risk appetite.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <section>
                            <h3 className="text-2xl font-black text-foreground mb-4">No Financial Advice</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                RiskLock provides tools and information for risk management education and monitoring purposes only. <strong className="text-foreground">Nothing provided by RiskLock constitutes investment advice</strong>, financial advice, or a recommendation to buy or sell any financial instrument.
                            </p>
                        </section>

                        <section>
                            <h3 className="text-2xl font-black text-foreground mb-4">No Guarantees</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                While RiskLock is designed to help you maintain discipline and follow risk rules, we do not guarantee that using the Service will prevent losses or ensure profits. Traders are solely responsible for their trading decisions and the outcomes of those decisions.
                            </p>
                        </section>

                        <section>
                            <h3 className="text-2xl font-black text-foreground mb-4">Technical Disclaimer</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                RiskLock relies on third-party APIs (such as MetaApi) and cloud infrastructure. We are not responsible for delays, data inaccuracies, or service interruptions caused by third parties, broker connectivity issues, or internet latency that may affect real-time monitoring.
                            </p>
                        </section>

                        <section>
                            <h3 className="text-2xl font-black text-foreground mb-4">Prop Firm Compliance</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                Rules provided as "presets" for prop firms are based on publicly available information and are subject to change. It is your responsibility to verify that your RiskLock settings match the current rules of your specific prop firm account.
                            </p>
                        </section>

                        <section className="pt-8 border-t border-border/50 text-center">
                            <p className="text-lg font-bold text-foreground mb-4">
                                "Trade responsibly. Protect your capital first."
                            </p>
                            <Link to="/signup">
                                <Button variant="hero" size="lg">
                                    Acknowledge & Continue
                                </Button>
                            </Link>
                        </section>
                    </div>
                </div>
            </section>
        </div>
    );
}

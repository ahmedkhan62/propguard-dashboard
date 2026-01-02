import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useState } from "react";
import {
    HelpCircle,
    ArrowRight,
    ChevronDown,
    MessageCircle,
} from "lucide-react";

const faqCategories = [
    {
        title: "Getting Started",
        faqs: [
            {
                q: "How do I connect my trading account?",
                a: "Use MetaApi to connect your MT4/MT5 accounts. We provide step-by-step instructions during signup. Connection is read-only and takes less than 2 minutes.",
            },
            {
                q: "Which prop firms are supported?",
                a: "RiskLock works with all major prop firms including FTMO, MyFundedFX, The5ers, and any firm that uses MT4/MT5 platforms. We provide preset rules for popular firms.",
            },
            {
                q: "Do I need to install anything?",
                a: "No installation required. RiskLock is a web-based platform that works directly in your browser. Just sign up, connect your account, and you're protected.",
            },
        ],
    },
    {
        title: "Risk Rules & Protection",
        faqs: [
            {
                q: "How does RiskLock enforce rules?",
                a: "RiskLock monitors your trades in real-time and displays full-screen, non-dismissible warnings when limits are breached. While we cannot physically block trades (read-only access), the psychological stop is extremely effective.",
            },
            {
                q: "Can I customize risk limits?",
                a: "Yes. You can use our prop firm presets or create completely custom rules with your own daily loss limits, drawdown thresholds, and position size controls.",
            },
            {
                q: "What happens when I breach a rule?",
                a: "A fullscreen breach lock appears with detailed information about the violation. The warning is non-dismissible, creating a psychological barrier to prevent revenge trading.",
            },
        ],
    },
    {
        title: "Data & Privacy",
        faqs: [
            {
                q: "Is my trading data safe?",
                a: "Absolutely. All data is encrypted in transit (TLS 1.3) and at rest (AES-256). Your MetaApi keys are never logged or displayed. We collect only what's necessary for risk calculation.",
            },
            {
                q: "Can RiskLock execute trades on my account?",
                a: "No. RiskLock operates in strict read-only mode. We have zero capability to execute trades, modify orders, or access withdrawal functions. This is enforced at the code level.",
            },
            {
                q: "Who can see my trading history?",
                a: "Only you. Your trading data is private and never shared, sold, or used for any purpose other than providing risk monitoring services to you.",
            },
        ],
    },
    {
        title: "Billing & Plans",
        faqs: [
            {
                q: "What's included in the free plan?",
                a: "The free plan includes 1 connected account, basic risk monitoring, daily loss limits, and breach detection. Perfect for testing RiskLock with a single account.",
            },
            {
                q: "Can I cancel anytime?",
                a: "Yes. Cancel your subscription at any time from your account settings. No questions asked, no cancellation fees.",
            },
            {
                q: "Do you offer refunds?",
                a: "We offer a 14-day money-back guarantee. If RiskLock doesn't meet your expectations, contact support for a full refund.",
            },
        ],
    },
    {
        title: "Technical Questions",
        faqs: [
            {
                q: "Does RiskLock work on mobile?",
                a: "Yes. RiskLock is fully responsive and works on desktop, tablet, and mobile devices. Access your risk dashboard anywhere.",
            },
            {
                q: "What is MetaApi?",
                a: "MetaApi is a secure third-party service that provides read-only access to MT4/MT5 accounts via API. It's trusted by thousands of traders and fully compliant with broker requirements.",
            },
            {
                q: "How fast is risk calculation?",
                a: "Extremely fast. Risk calculations happen in under 0.1 milliseconds. You'll see your SAFE/WARNING/CRITICAL status update in real-time as you trade.",
            },
        ],
    },
];

export default function HelpCenter() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const [openCategory, setOpenCategory] = useState<string | null>(faqCategories[0].title);

    return (
        <div className="pt-12">

            {/* Hero Section */}
            <section className="relative min-h-[80vh] flex items-center z-10 container mx-auto px-4">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 blur-[120px] rounded-full pointer-events-none -z-10" />

                <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="max-w-4xl mx-auto text-center relative"
                >
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] md:text-xs font-bold mb-10 shadow-glow-sm backdrop-blur-md uppercase tracking-widest"
                    >
                        <HelpCircle className="w-3 h-3" />
                        Support
                    </motion.div>

                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-foreground leading-[1.1] tracking-tight mb-8">
                        Help <span className="gradient-text">Center</span>
                    </h1>

                    <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed font-medium">
                        Every question a trader could possibly have — answered clearly.
                    </p>
                </motion.div>
            </section>

            {/* FAQ Section */}
            <section className="relative z-10 container mx-auto px-4 py-20 mb-12">
                <div className="max-w-5xl mx-auto">
                    {faqCategories.map((category, catIndex) => (
                        <motion.div
                            key={catIndex}
                            initial={{ y: 30, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: catIndex * 0.1 }}
                            className="mb-12"
                        >
                            <h2 className="text-3xl font-black text-foreground mb-6">{category.title}</h2>

                            <div className="space-y-4">
                                {category.faqs.map((faq, faqIndex) => {
                                    const globalIndex = catIndex * 1000 + faqIndex;
                                    const isOpen = openIndex === globalIndex;

                                    return (
                                        <div key={faqIndex} className="glass-card overflow-hidden">
                                            <button
                                                onClick={() => setOpenIndex(isOpen ? null : globalIndex)}
                                                className="w-full p-6 flex items-center justify-between text-left hover:bg-primary/5 transition-colors"
                                            >
                                                <span className="text-lg font-bold text-foreground pr-4">{faq.q}</span>
                                                <ChevronDown
                                                    className={`w-5 h-5 text-primary shrink-0 transition-transform ${isOpen ? "rotate-180" : ""
                                                        }`}
                                                />
                                            </button>

                                            {isOpen && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: "auto", opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    className="px-6 pb-6"
                                                >
                                                    <p className="text-muted-foreground leading-relaxed">{faq.a}</p>
                                                </motion.div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Contact Support CTA */}
                <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    className="glass-card p-12 max-w-3xl mx-auto text-center mt-20"
                >
                    <MessageCircle className="w-12 h-12 text-primary mx-auto mb-6" />
                    <h3 className="text-2xl font-black text-foreground mb-4">Still Have Questions?</h3>
                    <p className="text-muted-foreground mb-6">
                        Can't find what you're looking for? Our support team is here to help.
                    </p>
                    <Link to="/contact">
                        <Button variant="hero" size="lg">
                            Contact Support
                            <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                    </Link>
                </motion.div>
            </section>
        </div>
    );
}

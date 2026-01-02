import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight, Check, MapPin, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { ApiService } from "@/services/api";
import { toast } from "sonner";

// Steps Data
// Added Demographics Step
const STEPS = [
    {
        id: "demographics",
        title: "About You",
        question: "Let's get to know you better.",
        isForm: true
    },
    {
        id: "experience",
        title: "Trading Experience",
        question: "How long have you been trading?",
        options: ["Less than 1 year", "1-3 years", "3-5 years", "5+ years"]
    },
    {
        id: "style",
        title: "Trading Style",
        question: "What's your primary trading style?",
        options: ["Scalping (Minutes)", "Day Trading (Hours)", "Swing Trading (Days)", "Position Trading (Weeks)"]
    },
    {
        id: "markets",
        title: "Preferred Markets",
        question: "Which markets do you trade? (Select all that apply)",
        options: ["Forex", "Crypto", "Indices", "Commodities", "Stocks"],
        multi: true
    },
    {
        id: "goals",
        title: "Primary Goal",
        question: "What is your main objective with RiskLock?",
        options: ["Get funded by a Firm", "Improve Consistency", "Scale Capital", "Automate Risk Management"]
    }
];

export default function Onboarding() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState({
        experience_level: "Beginner",
        years_trading: "",
        preferred_markets: [] as string[],
        trading_style: "",
        strategy_type: "Manual",
        risk_appetite: "Medium",
        primary_goal: "",
        date_of_birth: "",
        country: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Simple country list for MVP
    const COUNTRIES = ["United States", "United Kingdom", "Canada", "Australia", "India", "Germany", "France", "UAE", "Singapore", "Other"];

    const handleSelect = (value: string) => {
        const step = STEPS[currentStep];

        if (step.id === "demographics") {
            // Handled by form inputs directly
            return;
        }

        if (step.multi) {
            setFormData(prev => ({
                ...prev,
                preferred_markets: prev.preferred_markets.includes(value)
                    ? prev.preferred_markets.filter(m => m !== value)
                    : [...prev.preferred_markets, value]
            }));
        } else {
            if (step.id === "experience") {
                setFormData(prev => ({
                    ...prev,
                    years_trading: value,
                    experience_level: value === "5+ years" ? "Advanced" : value === "Less than 1 year" ? "Beginner" : "Intermediate"
                }));
            } else if (step.id === "style") {
                setFormData(prev => ({ ...prev, trading_style: value }));
            } else if (step.id === "goals") {
                setFormData(prev => ({ ...prev, primary_goal: value }));
            }
            if (currentStep < STEPS.length - 1) {
                setTimeout(() => setCurrentStep(prev => prev + 1), 300);
            }
        }
    };

    const handleDemographicsSubmit = () => {
        if (!formData.date_of_birth || !formData.country) {
            toast.error("Please fill in all fields.");
            return;
        }
        setCurrentStep(prev => prev + 1);
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        try {
            // Convert string date to ISO for backend if needed, or keep as YYYY-MM-DD
            const payload = {
                ...formData,
                date_of_birth: new Date(formData.date_of_birth).toISOString()
            };

            const response = await ApiService.submitOnboarding(payload);

            if (response.access_token) {
                login(response.access_token);
                toast.success("Profile setup complete!");
                setTimeout(() => {
                    navigate("/dashboard");
                }, 500);
            } else {
                window.location.href = "/dashboard";
            }
        } catch (e) {
            toast.error("Failed to save profile. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const step = STEPS[currentStep];
    const progress = ((currentStep + 1) / STEPS.length) * 100;

    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-white/[0.02]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 blur-[120px] rounded-full opacity-30" />

            <div className="w-full max-w-xl relative z-10">
                <div className="mb-8">
                    <div className="flex justify-betweentext-sm font-bold text-muted-foreground mb-2 px-1">
                        <span className="text-primary font-black tracking-widest uppercase text-xs">Step {currentStep + 1}/{STEPS.length}</span>
                        <span className="text-xs tracking-widest uppercase">{step.title}</span>
                    </div>
                    <div className="h-1 w-full bg-secondary/30 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-primary"
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.5 }}
                        />
                    </div>
                </div>

                <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="glass-panel border-border/50 p-8 md:p-12 backdrop-blur-xl"
                >
                    <h2 className="text-3xl md:text-4xl font-black text-white mb-3 tracking-tight">{step.question}</h2>
                    <p className="text-muted-foreground mb-8 text-lg">We'll customize your RiskLock experience based on this.</p>

                    {/* Step Content */}
                    {step.id === "demographics" ? (
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-zinc-400">Date of Birth</label>
                                <div className="relative">
                                    <Calendar className="absolute left-3 top-3 w-5 h-5 text-zinc-500" />
                                    <Input
                                        type="date"
                                        className="pl-10 h-12 bg-white/5 border-white/10 text-white"
                                        value={formData.date_of_birth}
                                        onChange={(e) => setFormData({ ...formData, date_of_birth: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-zinc-400">Country / Region</label>
                                <div className="grid grid-cols-2 gap-3">
                                    {COUNTRIES.map(c => (
                                        <button
                                            key={c}
                                            onClick={() => setFormData({ ...formData, country: c })}
                                            className={`p-3 rounded-xl border text-sm font-bold transition-all text-left flex items-center gap-2 ${formData.country === c
                                                    ? "border-primary bg-primary/20 text-white"
                                                    : "border-white/10 bg-white/5 text-zinc-400 hover:bg-white/10"
                                                }`}
                                        >
                                            {formData.country === c && <Check className="w-3 h-3 text-primary" />}
                                            {c}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="flex justify-end mt-8">
                                <Button
                                    onClick={handleDemographicsSubmit}
                                    className="h-12 px-8 font-bold bg-primary hover:bg-primary/90"
                                    disabled={!formData.date_of_birth || !formData.country}
                                >
                                    Continue <ChevronRight className="w-4 h-4 ml-2" />
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {step.options?.map((opt) => {
                                const isSelected = step.multi
                                    ? formData.preferred_markets.includes(opt)
                                    : (
                                        (step.id === "experience" && formData.years_trading === opt) ||
                                        (step.id === "style" && formData.trading_style === opt) ||
                                        (step.id === "goals" && formData.primary_goal === opt)
                                    );

                                return (
                                    <motion.button
                                        key={opt}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => handleSelect(opt)}
                                        className={`w-full text-left p-5 rounded-2xl border-2 transition-all flex items-center justify-between group ${isSelected
                                            ? "border-primary bg-primary/10 shadow-[0_0_20px_rgba(var(--primary-rgb),0.2)]"
                                            : "border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/10"
                                            }`}
                                    >
                                        <span className={`text-lg font-bold ${isSelected ? "text-primary" : "text-zinc-300"}`}>{opt}</span>
                                        {isSelected && <Check className="w-5 h-5 text-primary" />}
                                    </motion.button>
                                );
                            })}
                        </div>
                    )}

                    {/* Navigation for Multi-select or Final Step (Skipped for demographics as it has its own button) */}
                    {step.id !== "demographics" && (step.multi || currentStep === STEPS.length - 1) && (
                        <div className="mt-8 flex justify-end">
                            <Button
                                onClick={currentStep === STEPS.length - 1 ? handleSubmit : () => setCurrentStep(prev => prev + 1)}
                                className="h-14 px-8 text-lg font-black uppercase tracking-widest rounded-xl bg-primary hover:bg-primary/90 shadow-glow-sm"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? "Finalizing..." : currentStep === STEPS.length - 1 ? "Complete Setup" : "Continue"}
                                {!isSubmitting && <ChevronRight className="w-5 h-5 ml-2" />}
                            </Button>
                        </div>
                    )}
                </motion.div>
            </div>
        </div>
    );
}

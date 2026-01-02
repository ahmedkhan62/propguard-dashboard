import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, HelpCircle, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ApiService } from "@/services/api";

export default function VisitorSurveyPopup() {
    const [isOpen, setIsOpen] = useState(false);
    const [step, setStep] = useState<"initial" | "survey">("initial");
    const [surveyData, setSurveyData] = useState({
        interest_level: "",
        experience_category: "",
        country: "Unknown" // Could try to detect via API later
    });

    useEffect(() => {
        // Show after 2 minutes (mocked as 10s for testing/demo) 
        // Real logic: 120000ms
        const timer = setTimeout(() => {
            const hasSeen = sessionStorage.getItem("visitorSurveySeen");
            const isLogged = localStorage.getItem("token"); // Don't show if logged in

            if (!hasSeen && !isLogged) {
                setIsOpen(true);
                sessionStorage.setItem("visitorSurveySeen", "true");
            }
        }, 15000); // 15 seconds for demo purposes

        return () => clearTimeout(timer);
    }, []);

    const handleSubmit = async () => {
        try {
            await ApiService.submitVisitorSurvey(surveyData);
            setIsOpen(false);
        } catch (e) {
            setIsOpen(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed bottom-4 right-4 z-50">
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        className="bg-[#111] border border-zinc-800 rounded-2xl shadow-2xl p-6 w-80 md:w-96 overflow-hidden relative"
                    >
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-3 right-3 text-zinc-500 hover:text-white"
                        >
                            <X className="w-4 h-4" />
                        </button>

                        {step === "initial" ? (
                            <div className="space-y-4">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                                        <HelpCircle className="w-5 h-5 text-primary" />
                                    </div>
                                    <h3 className="font-bold text-white text-lg">Quick Question?</h3>
                                </div>

                                <p className="text-zinc-400 text-sm">
                                    Not ready to join yet? Let us know what you're looking for to help us improve.
                                </p>

                                <div className="flex gap-2">
                                    <Button
                                        onClick={() => window.location.href = "/signup"}
                                        className="flex-1 bg-primary hover:bg-primary/90 font-bold"
                                    >
                                        Sign Up Now
                                    </Button>
                                    <Button
                                        onClick={() => setStep("survey")}
                                        variant="outline"
                                        className="flex-1 border-zinc-700 hover:bg-zinc-800 text-zinc-300"
                                    >
                                        Tell Us More
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                                <h3 className="font-bold text-white">What describes you best?</h3>

                                <div className="space-y-2">
                                    {["Just Browsing", "Learning to Trade", "Looking for Prop Firm"].map(opt => (
                                        <button
                                            key={opt}
                                            onClick={() => setSurveyData({ ...surveyData, interest_level: opt })}
                                            className={`w-full p-2 text-sm text-left rounded-lg border transition-colors ${surveyData.interest_level === opt
                                                    ? "border-primary bg-primary/10 text-white"
                                                    : "border-zinc-800 hover:bg-zinc-800 text-zinc-400"
                                                }`}
                                        >
                                            {opt}
                                        </button>
                                    ))}
                                </div>

                                <Button
                                    onClick={handleSubmit}
                                    disabled={!surveyData.interest_level}
                                    className="w-full bg-white text-black hover:bg-zinc-200 font-bold"
                                >
                                    Send Feedback <ChevronRight className="w-4 h-4 ml-1" />
                                </Button>
                            </div>
                        )}
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}

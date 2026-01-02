import { motion } from "framer-motion";
import { Lightbulb, Send, CheckCircle2, ArrowRight, Sparkles } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { ApiService } from "@/services/api";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect } from "react";

const categories = ["UI/UX", "Risk Engine", "Reports", "AI Alerts", "Performance", "Other"];

export default function Ideas() {
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        category: "UI/UX"
    });
    const [userIdeas, setUserIdeas] = useState<any[]>([]);
    const [isLoadingHistory, setIsLoadingHistory] = useState(false);

    useEffect(() => {
        fetchHistory();
    }, []);

    const fetchHistory = async () => {
        setIsLoadingHistory(true);
        try {
            const data = await ApiService.getUserFeedback();
            setUserIdeas(data.filter((f: any) => f.type === "IDEA"));
        } catch (error) {
            console.error("Failed to fetch history", error);
        } finally {
            setIsLoadingHistory(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await ApiService.createFeedback({
                type: "IDEA",
                ...formData
            });
            setSubmitted(true);
            fetchHistory();
            toast({
                title: "Idea Received!",
                description: "The Founder has been notified of your suggestion.",
            });
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to submit idea. Please try again.",
                variant: "destructive"
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    if (submitted) {
        return (
            <DashboardLayout>
                <div className="flex flex-col items-center justify-center min-h-[70vh] text-center space-y-6">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="w-24 h-24 rounded-3xl bg-status-safe/10 flex items-center justify-center text-status-safe shadow-[0_0_40px_rgba(var(--status-safe-rgb),0.2)]"
                    >
                        <CheckCircle2 className="w-12 h-12" />
                    </motion.div>
                    <div className="space-y-2">
                        <h2 className="text-3xl font-black text-foreground">Idea Successfully Logged</h2>
                        <p className="text-muted-foreground max-w-md mx-auto">
                            Thank you for helping us evolve RiskLock. The Founder directly reviews every high-impact suggestion.
                        </p>
                    </div>
                    <Button
                        variant="outline"
                        onClick={() => setSubmitted(false)}
                        className="rounded-xl h-12 px-8 font-bold gap-2"
                    >
                        Submit Another Idea <ArrowRight className="w-4 h-4" />
                    </Button>
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout>
            <div className="max-w-4xl mx-auto space-y-10">
                <header className="space-y-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-[10px] font-black text-primary uppercase tracking-widest mb-2 border border-primary/20">
                        <Sparkles className="w-3 h-3" />
                        Shape the Future
                    </div>
                    <h1 className="text-4xl font-black text-foreground tracking-tight">Ideas & <span className="gradient-text">Improvements</span></h1>
                    <p className="text-muted-foreground text-lg font-medium">Have an idea to make RiskLock even better? We're listening.</p>
                </header>

                <Tabs defaultValue="submit" className="space-y-8">
                    <TabsList className="bg-secondary/30 p-1 rounded-xl border border-border/50">
                        <TabsTrigger value="submit" className="rounded-lg font-bold px-6 py-2 uppercase tracking-wider text-[10px]">Submit Idea</TabsTrigger>
                        <TabsTrigger value="history" className="rounded-lg font-bold px-6 py-2 uppercase tracking-wider text-[10px]">My Feedback Loop</TabsTrigger>
                    </TabsList>

                    <TabsContent value="submit">
                        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
                            <div className="lg:col-span-3">
                                <motion.form
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    onSubmit={handleSubmit}
                                    className="glass-card p-8 border-border/50 space-y-6"
                                >
                                    <div className="space-y-2">
                                        <label className="text-sm font-black text-muted-foreground uppercase tracking-wider">Idea Title</label>
                                        <Input
                                            required
                                            placeholder="e.g., Multi-account aggregate view"
                                            className="h-12 bg-secondary/30 border-border/50 focus:border-primary rounded-xl text-lg font-medium"
                                            value={formData.title}
                                            onChange={e => setFormData({ ...formData, title: e.target.value })}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-black text-muted-foreground uppercase tracking-wider">Category</label>
                                        <div className="grid grid-cols-3 gap-2">
                                            {categories.map(cat => (
                                                <button
                                                    key={cat}
                                                    type="button"
                                                    onClick={() => setFormData({ ...formData, category: cat })}
                                                    className={`px-4 py-2 rounded-lg text-xs font-bold border transition-all ${formData.category === cat
                                                        ? "bg-primary text-white border-primary shadow-glow-sm"
                                                        : "bg-secondary/30 border-border/50 text-muted-foreground hover:border-primary/30"
                                                        }`}
                                                >
                                                    {cat}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-black text-muted-foreground uppercase tracking-wider">Detailed Description</label>
                                        <Textarea
                                            required
                                            placeholder="Tell us more about how this feature should work and why it would be valuable..."
                                            className="min-h-[150px] bg-secondary/30 border-border/50 focus:border-primary rounded-xl text-base"
                                            value={formData.description}
                                            onChange={e => setFormData({ ...formData, description: e.target.value })}
                                        />
                                    </div>

                                    <Button
                                        type="submit"
                                        variant="hero"
                                        className="w-full h-14 text-lg font-black uppercase tracking-widest gap-2"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? "Processing..." : "Submit Idea"}
                                        <Send className="w-5 h-5" />
                                    </Button>
                                </motion.form>
                            </div>

                            <div className="lg:col-span-2 space-y-6">
                                <div className="glass-card p-6 border-primary/20 bg-primary/5">
                                    <h3 className="font-black text-primary uppercase text-xs tracking-[0.2em] mb-3">Founder's Note</h3>
                                    <p className="text-sm text-foreground/80 leading-relaxed italic">
                                        "Many of our best features were built from user ideas. If your suggestion is implemented, you'll be credited in our system as a Product Pioneer."
                                    </p>
                                </div>

                                <div className="glass-card p-6 border-border/50 space-y-4">
                                    <h3 className="font-black text-foreground uppercase text-xs tracking-[0.2em]">What we look for</h3>
                                    <ul className="space-y-3">
                                        {[
                                            "Features that save time",
                                            "Better ways to visualize risk",
                                            "Improved AI logic",
                                            "Mobile experience improvements"
                                        ].map((item, i) => (
                                            <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                                                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="history">
                        <div className="space-y-4">
                            {isLoadingHistory ? (
                                <div className="h-64 flex items-center justify-center text-muted-foreground font-bold">Synchronizing Pipeline...</div>
                            ) : userIdeas.length === 0 ? (
                                <div className="h-64 glass-card flex flex-col items-center justify-center text-center space-y-4 border-dashed">
                                    <Lightbulb className="w-12 h-12 text-muted-foreground/30" />
                                    <div className="space-y-1">
                                        <p className="text-lg font-bold text-foreground">No ideas logged yet</p>
                                        <p className="text-sm text-muted-foreground">Your contributions will appear here once submitted.</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 gap-4">
                                    {userIdeas.map((idea) => (
                                        <motion.div
                                            key={idea.id}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            className="glass-card p-6 border-border/50 hover:border-primary/30 transition-all"
                                        >
                                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                                <div className="space-y-2">
                                                    <div className="flex items-center gap-3">
                                                        <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20">
                                                            {idea.category}
                                                        </span>
                                                        <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded border ${idea.status === 'RESOLVED' ? 'bg-status-safe/10 text-status-safe border-status-safe/20' :
                                                                idea.status === 'REJECTED' ? 'bg-status-danger/10 text-status-danger border-status-danger/20' :
                                                                    'bg-secondary text-muted-foreground border-border/50'
                                                            }`}>
                                                            {idea.status.replace('_', ' ')}
                                                        </span>
                                                    </div>
                                                    <h3 className="text-xl font-bold text-foreground">{idea.title}</h3>
                                                    <p className="text-sm text-muted-foreground font-medium leading-relaxed">{idea.description}</p>
                                                </div>
                                                {idea.admin_notes && (
                                                    <div className="md:max-w-xs bg-primary/5 border border-primary/10 p-4 rounded-xl">
                                                        <div className="text-[10px] font-black text-primary uppercase tracking-widest mb-1 flex items-center gap-2">
                                                            <Sparkles className="w-3 h-3" /> Founder Response
                                                        </div>
                                                        <p className="text-xs text-foreground/80 italic font-medium">"{idea.admin_notes}"</p>
                                                    </div>
                                                )}
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </DashboardLayout>
    );
}

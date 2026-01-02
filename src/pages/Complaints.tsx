import { motion } from "framer-motion";
import { AlertCircle, Send, CheckCircle2, ArrowRight, ShieldAlert, LifeBuoy } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { ApiService } from "@/services/api";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect } from "react";

const severities = [
    { label: "Low", value: "LOW", desc: "Confusing UX or minor visual bug", color: "bg-blue-500" },
    { label: "Medium", value: "MEDIUM", desc: "Something isn't working as expected", color: "bg-status-warning" },
    { label: "High", value: "HIGH", desc: "Critical issue affecting my trading", color: "bg-status-danger" },
];

export default function Complaints() {
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        severity: "LOW"
    });
    const [userComplaints, setUserComplaints] = useState<any[]>([]);
    const [isLoadingHistory, setIsLoadingHistory] = useState(false);

    useEffect(() => {
        fetchHistory();
    }, []);

    const fetchHistory = async () => {
        setIsLoadingHistory(true);
        try {
            const data = await ApiService.getUserFeedback();
            setUserComplaints(data.filter((f: any) => f.type === "COMPLAINT"));
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
                type: "COMPLAINT",
                ...formData
            });
            setSubmitted(true);
            fetchHistory();
            toast({
                title: "Report Received",
                description: "Our technical team has been alerted.",
            });
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to submit report. Please try again.",
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
                        <h2 className="text-3xl font-black text-foreground">Issue Logged</h2>
                        <p className="text-muted-foreground max-w-md mx-auto">
                            We're sorry for the frustration. Your report has been prioritized and our team is already on it.
                        </p>
                    </div>
                    <Button
                        variant="outline"
                        onClick={() => setSubmitted(false)}
                        className="rounded-xl h-12 px-8 font-bold gap-2"
                    >
                        Return to Complaints <ArrowRight className="w-4 h-4" />
                    </Button>
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout>
            <div className="max-w-4xl mx-auto space-y-10">
                <header className="space-y-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-status-danger/10 text-[10px] font-black text-status-danger uppercase tracking-widest mb-2 border border-status-danger/20">
                        <ShieldAlert className="w-3 h-3" />
                        Priority Resolution
                    </div>
                    <h1 className="text-4xl font-black text-foreground tracking-tight">Report a <span className="text-status-danger underline decoration-status-danger/20">Complaint</span></h1>
                    <p className="text-muted-foreground text-lg font-medium">Encountered an issue? Tell us exactly what happened so we can fix it.</p>
                </header>

                <Tabs defaultValue="submit" className="space-y-8">
                    <TabsList className="bg-secondary/30 p-1 rounded-xl border border-border/50">
                        <TabsTrigger value="submit" className="rounded-lg font-bold px-6 py-2 uppercase tracking-wider text-[10px]">Report Issue</TabsTrigger>
                        <TabsTrigger value="history" className="rounded-lg font-bold px-6 py-2 uppercase tracking-wider text-[10px]">Ticket History</TabsTrigger>
                    </TabsList>

                    <TabsContent value="submit">
                        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
                            <div className="lg:col-span-3">
                                <motion.form
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    onSubmit={handleSubmit}
                                    className="glass-card p-8 border-border/50 space-y-8"
                                >
                                    <div className="space-y-2">
                                        <label className="text-sm font-black text-muted-foreground uppercase tracking-wider">Issue Title</label>
                                        <Input
                                            required
                                            placeholder="Briefly state the problem..."
                                            className="h-12 bg-secondary/30 border-border/50 focus:border-primary rounded-xl text-lg font-medium"
                                            value={formData.title}
                                            onChange={e => setFormData({ ...formData, title: e.target.value })}
                                        />
                                    </div>

                                    <div className="space-y-3">
                                        <label className="text-sm font-black text-muted-foreground uppercase tracking-wider">How serious is this?</label>
                                        <div className="grid grid-cols-1 gap-3">
                                            {severities.map(sev => (
                                                <button
                                                    key={sev.value}
                                                    type="button"
                                                    onClick={() => setFormData({ ...formData, severity: sev.value })}
                                                    className={`flex items-center gap-4 p-4 rounded-xl border text-left transition-all ${formData.severity === sev.value
                                                        ? "bg-secondary border-primary shadow-inner"
                                                        : "bg-secondary/30 border-border/50 hover:border-primary/30"
                                                        }`}
                                                >
                                                    <div className={`w-3 h-3 rounded-full ${sev.color} ${formData.severity === sev.value ? "animate-pulse" : ""}`} />
                                                    <div>
                                                        <div className="font-bold text-foreground">{sev.label}</div>
                                                        <div className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">{sev.desc}</div>
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-black text-muted-foreground uppercase tracking-wider">Detailed Explanation</label>
                                        <Textarea
                                            required
                                            placeholder="Explain the steps to reproduce the issue or describe the frustration..."
                                            className="min-h-[150px] bg-secondary/30 border-border/50 focus:border-primary rounded-xl text-base"
                                            value={formData.description}
                                            onChange={e => setFormData({ ...formData, description: e.target.value })}
                                        />
                                    </div>

                                    <Button
                                        type="submit"
                                        variant="hero"
                                        className="w-full h-14 text-lg font-black uppercase tracking-widest gap-2 bg-foreground text-background hover:bg-foreground/90"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? "Submitting..." : "Send Complaint"}
                                        <Send className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                                    </Button>
                                </motion.form>
                            </div>

                            <div className="lg:col-span-2 space-y-6">
                                <div className="glass-card p-6 border-status-warning/20 bg-status-warning/5">
                                    <h3 className="font-black text-status-warning uppercase text-xs tracking-[0.2em] mb-3 flex items-center gap-2">
                                        <LifeBuoy className="w-4 h-4" />
                                        Our Promise
                                    </h3>
                                    <p className="text-sm text-foreground/80 leading-relaxed font-medium">
                                        No user should ever feel stuck. We use every complaint as a signal to harden our systems and improve our UX.
                                    </p>
                                </div>

                                <div className="glass-card p-6 border-border/50 space-y-4">
                                    <h3 className="font-black text-foreground uppercase text-xs tracking-[0.2em]">Next Steps</h3>
                                    <div className="space-y-6">
                                        {[
                                            { step: 1, title: "Triage", desc: "Our team classifies the issue based on your severity." },
                                            { step: 2, title: "Investigation", desc: "Developers replicate and identify the root cause." },
                                            { step: 3, title: "Resolution", desc: "The fix is deployed or we reach out with a solution." },
                                        ].map((item, i) => (
                                            <div key={i} className="flex gap-4">
                                                <div className="w-6 h-6 rounded-lg bg-secondary flex items-center justify-center text-[10px] font-black shrink-0">
                                                    {item.step}
                                                </div>
                                                <div className="space-y-1">
                                                    <div className="text-sm font-bold text-foreground">{item.title}</div>
                                                    <div className="text-[11px] text-muted-foreground leading-tight">{item.desc}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="history">
                        <div className="space-y-4">
                            {isLoadingHistory ? (
                                <div className="h-64 flex items-center justify-center text-muted-foreground font-bold italic">Checking Resolution Status...</div>
                            ) : userComplaints.length === 0 ? (
                                <div className="h-64 glass-card flex flex-col items-center justify-center text-center space-y-4 border-dashed">
                                    <ShieldAlert className="w-12 h-12 text-muted-foreground/30" />
                                    <div className="space-y-1">
                                        <p className="text-lg font-bold text-foreground">No complaints filed</p>
                                        <p className="text-sm text-muted-foreground">Any issues you report will appear here for tracking.</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 gap-4">
                                    {userComplaints.map((complaint) => (
                                        <motion.div
                                            key={complaint.id}
                                            initial={{ opacity: 0, scale: 0.98 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className={`glass-card p-6 border transition-all ${complaint.status === 'RESOLVED' ? 'border-status-safe/30 bg-status-safe/5' : 'border-border/50'
                                                }`}
                                        >
                                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                                <div className="space-y-3 flex-1">
                                                    <div className="flex items-center gap-3">
                                                        <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded border ${complaint.severity === 'HIGH' ? 'bg-status-danger/10 text-status-danger border-status-danger/20' :
                                                                complaint.severity === 'MEDIUM' ? 'bg-status-warning/10 text-status-warning border-status-warning/20' :
                                                                    'bg-blue-500/10 text-blue-500 border-blue-500/20'
                                                            }`}>
                                                            {complaint.severity}
                                                        </span>
                                                        <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded border ${complaint.status === 'RESOLVED' ? 'bg-status-safe text-white border-status-safe' : 'bg-secondary text-muted-foreground border-border/50'
                                                            }`}>
                                                            {complaint.status.replace('_', ' ')}
                                                        </span>
                                                        <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">{new Date(complaint.created_at).toLocaleDateString()}</span>
                                                    </div>
                                                    <h3 className="text-xl font-bold text-foreground">{complaint.title}</h3>
                                                    <p className="text-sm text-muted-foreground font-medium leading-relaxed italic">"{complaint.description}"</p>
                                                </div>
                                                {complaint.admin_notes && (
                                                    <div className="md:max-w-xs bg-card border border-border/50 p-4 rounded-xl shadow-sm">
                                                        <div className="text-[10px] font-black text-foreground uppercase tracking-widest mb-2 flex items-center gap-2">
                                                            <div className="w-1.5 h-1.5 rounded-full bg-primary" /> Resolution Note
                                                        </div>
                                                        <p className="text-xs text-muted-foreground font-medium">{complaint.admin_notes}</p>
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

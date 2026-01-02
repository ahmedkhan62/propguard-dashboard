import { motion } from "framer-motion";
import { ShieldAlert, Search, Filter, AlertTriangle, CheckCircle2, Clock, Terminal, ChevronRight, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { ApiService } from "@/services/api";
import { useToast } from "@/hooks/use-toast";

export default function ComplaintsManagement() {
    const { toast } = useToast();
    const [complaints, setComplaints] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [adminNotes, setAdminNotes] = useState<{ [key: number]: string }>({});

    useEffect(() => {
        fetchComplaints();
    }, []);

    const fetchComplaints = async () => {
        try {
            const data = await ApiService.getAllFeedback();
            const filtered = data.filter((f: any) => f.type === "COMPLAINT");
            setComplaints(filtered);

            // Pre-fill notes state
            const notesMap: { [key: number]: string } = {};
            filtered.forEach((f: any) => {
                notesMap[f.id] = f.admin_notes || "";
            });
            setAdminNotes(notesMap);
        } catch (error) {
            toast({ title: "Error", description: "Failed to fetch complaints", variant: "destructive" });
        } finally {
            setIsLoading(false);
        }
    };

    const handleUpdateStatus = async (id: number, status: string) => {
        try {
            await ApiService.updateFeedbackStatus(id, {
                status,
                admin_notes: adminNotes[id]
            });
            toast({ title: "Resolution Cycle Updated", description: `Complaint marked as ${status.replace('_', ' ')}` });
            fetchComplaints();
        } catch (error) {
            toast({ title: "Error", description: "Failed to update status", variant: "destructive" });
        }
    };

    const filteredComplaints = complaints.filter(c =>
        c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const getSeverityStyle = (severity: string) => {
        switch (severity) {
            case 'HIGH': return 'text-status-danger bg-status-danger/10 border-status-danger/20';
            case 'MEDIUM': return 'text-status-warning bg-status-warning/10 border-status-warning/20';
            default: return 'text-blue-500 bg-blue-500/10 border-blue-500/20';
        }
    };

    return (
        <div className="space-y-10 pb-20">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-border/50">
                <div className="space-y-1">
                    <div className="inline-flex items-center gap-2 px-2 py-1 rounded bg-status-danger/10 text-[10px] font-black text-status-danger uppercase tracking-widest mb-2">
                        <ShieldAlert className="w-3 h-3" />
                        Trust & Stability Center
                    </div>
                    <h1 className="text-4xl font-black text-foreground tracking-tight">Complaint <span className="gradient-text">Tracker</span></h1>
                    <p className="text-muted-foreground font-medium text-lg">Zero-frustration monitoring. Resolve issues before they become churn.</p>
                </div>
            </header>

            <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                    placeholder="Search complaints by title or content..."
                    className="pl-12 h-14 bg-card border-border/50 focus:border-primary rounded-2xl text-lg font-medium"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                />
            </div>

            <div className="space-y-4">
                {isLoading ? (
                    <div className="h-64 flex items-center justify-center text-muted-foreground">Loading complaints...</div>
                ) : filteredComplaints.length === 0 ? (
                    <div className="h-64 glass-card p-20 flex flex-col items-center justify-center text-center space-y-4 rounded-3xl border-dashed">
                        <div className="w-16 h-16 rounded-full bg-status-safe/10 flex items-center justify-center text-status-safe">
                            <CheckCircle2 className="w-8 h-8" />
                        </div>
                        <p className="text-xl font-bold text-muted-foreground">The platform is running smoothly.</p>
                        <p className="text-sm text-muted-foreground/60">No active complaints require your attention right now.</p>
                    </div>
                ) : (
                    filteredComplaints.sort((a, b) => b.severity === 'HIGH' ? 1 : -1).map((complaint, i) => (
                        <motion.div
                            key={complaint.id}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: i * 0.05 }}
                            className={`glass-card p-8 border transition-all flex items-start gap-8 group rounded-3xl ${complaint.severity === 'HIGH' ? 'border-status-danger/30 bg-status-danger/[0.02]' : 'border-border/50'
                                }`}
                        >
                            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 border ${getSeverityStyle(complaint.severity)} shadow-sm`}>
                                <AlertTriangle className="w-8 h-8" />
                            </div>

                            <div className="flex-1 space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <h3 className="text-2xl font-black text-foreground group-hover:text-primary transition-colors">{complaint.title}</h3>
                                        <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md border ${getSeverityStyle(complaint.severity)}`}>
                                            {complaint.severity}
                                        </span>
                                    </div>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 flex items-center gap-1.5 font-mono bg-secondary/50 px-3 py-1 rounded-lg">
                                        <Clock className="w-3.5 h-3.5" />
                                        {new Date(complaint.created_at).toLocaleTimeString()}, {new Date(complaint.created_at).toLocaleDateString()}
                                    </span>
                                </div>
                                <p className="text-lg text-muted-foreground font-medium leading-relaxed max-w-4xl">{complaint.description}</p>

                                <div className="flex items-center justify-between pt-4 border-t border-border/30">
                                    <div className="flex items-center gap-6">
                                        <div className="flex items-center gap-2 text-xs font-bold text-foreground">
                                            <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-[10px]">#{complaint.user_id}</div>
                                            User Account
                                        </div>
                                        <div className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-lg border ${complaint.status === 'RESOLVED' ? 'bg-status-safe/10 text-status-safe border-status-safe/20' : 'bg-status-warning/10 text-status-warning border-status-warning/20'
                                            }`}>
                                            Status: {complaint.status}
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-4 space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Resolution Response</label>
                                        <textarea
                                            value={adminNotes[complaint.id] || ""}
                                            onChange={(e) => setAdminNotes({ ...adminNotes, [complaint.id]: e.target.value })}
                                            placeholder="Explain the resolution or ask for more details..."
                                            className="w-full h-24 bg-card/30 border border-border/50 rounded-xl p-4 text-sm font-medium focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none"
                                        />
                                    </div>

                                    <div className="flex flex-wrap gap-2">
                                        {[
                                            { status: 'UNDER_REVIEW', label: 'Triage', icon: Clock },
                                            { status: 'RESOLVED', label: 'Resolve', icon: CheckCircle2 },
                                            { status: 'REJECTED', label: 'Dismiss', icon: XCircle },
                                        ].map(action => (
                                            <Button
                                                key={action.status}
                                                variant="outline"
                                                size="sm"
                                                onClick={() => handleUpdateStatus(complaint.id, action.status)}
                                                className={`h-10 px-4 rounded-xl font-black uppercase tracking-widest text-[10px] gap-2 transition-all ${complaint.status === action.status ? "bg-primary text-white border-primary" : "hover:bg-primary/5 hover:text-primary hover:border-primary/30"
                                                    }`}
                                            >
                                                <action.icon className="w-3.5 h-3.5" />
                                                {action.label}
                                            </Button>
                                        ))}
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="h-10 px-4 rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-foreground hover:text-background"
                                        >
                                            View Profile <ChevronRight className="w-3.5 h-3.5 ml-1" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))
                )}
            </div>
        </div>
    );
}

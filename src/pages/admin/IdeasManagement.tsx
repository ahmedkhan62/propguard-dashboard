import { motion } from "framer-motion";
import { Lightbulb, Search, Filter, MessageSquare, CheckCircle2, XCircle, Clock, Save, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { ApiService } from "@/services/api";
import { useToast } from "@/hooks/use-toast";

export default function IdeasManagement() {
    const { toast } = useToast();
    const [ideas, setIdeas] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [adminNotes, setAdminNotes] = useState<{ [key: number]: string }>({});

    useEffect(() => {
        fetchIdeas();
    }, []);

    const fetchIdeas = async () => {
        try {
            const data = await ApiService.getAllFeedback();
            const filtered = data.filter((f: any) => f.type === "IDEA");
            setIdeas(filtered);

            // Pre-fill notes state
            const notesMap: { [key: number]: string } = {};
            filtered.forEach((f: any) => {
                notesMap[f.id] = f.admin_notes || "";
            });
            setAdminNotes(notesMap);
        } catch (error) {
            toast({ title: "Error", description: "Failed to fetch ideas", variant: "destructive" });
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
            toast({ title: "Innovation Synchronized", description: `Idea marked as ${status.replace('_', ' ')}` });
            fetchIdeas();
        } catch (error) {
            toast({ title: "Error", description: "Failed to update status", variant: "destructive" });
        }
    };

    const filteredIdeas = ideas.filter(idea => {
        const matchesSearch = idea.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            idea.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === "All" || idea.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const getStatusStyle = (status: string) => {
        switch (status) {
            case 'PLANNED': return 'bg-primary/20 text-primary border-primary/20';
            case 'UNDER_REVIEW': return 'bg-status-warning/20 text-status-warning border-status-warning/20';
            case 'RESOLVED': return 'bg-status-safe/20 text-status-safe border-status-safe/20';
            case 'REJECTED': return 'bg-status-danger/20 text-status-danger border-status-danger/20';
            default: return 'bg-secondary text-muted-foreground border-border/50';
        }
    };

    return (
        <div className="space-y-8 pb-20">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-border/50">
                <div className="space-y-1">
                    <div className="inline-flex items-center gap-2 px-2 py-1 rounded bg-primary/10 text-[10px] font-black text-primary uppercase tracking-widest mb-2">
                        <Lightbulb className="w-3 h-3" />
                        Innovation Pipeline
                    </div>
                    <h1 className="text-4xl font-black text-foreground tracking-tight">Idea <span className="gradient-text">Matrix</span></h1>
                    <p className="text-muted-foreground font-medium text-lg">Prioritize and manage user-submitted feature requests.</p>
                </div>
            </header>

            <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                        placeholder="Search ideas..."
                        className="pl-12 h-14 bg-card border-border/50 focus:border-primary rounded-2xl text-lg font-medium"
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="flex gap-2">
                    {["All", "UI/UX", "Risk Engine", "AI Alerts"].map(cat => (
                        <Button
                            key={cat}
                            variant={selectedCategory === cat ? "hero" : "outline"}
                            onClick={() => setSelectedCategory(cat)}
                            className="h-14 px-6 rounded-2xl font-bold"
                        >
                            {cat}
                        </Button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
                {isLoading ? (
                    <div className="h-64 flex items-center justify-center text-muted-foreground">Loading pipeline...</div>
                ) : filteredIdeas.length === 0 ? (
                    <div className="h-64 glass-card flex items-center justify-center text-muted-foreground rounded-3xl border-dashed">No ideas found matching your criteria.</div>
                ) : (
                    filteredIdeas.map((idea, i) => (
                        <motion.div
                            key={idea.id}
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: i * 0.05 }}
                            className="glass-card group border-border/50 hover:border-primary/30 transition-all overflow-hidden rounded-3xl"
                        >
                            <div className="p-8 flex flex-col md:flex-row gap-8">
                                <div className="flex-1 space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md border ${getStatusStyle(idea.status)}`}>
                                                {idea.status.replace('_', ' ')}
                                            </span>
                                            <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">{idea.category}</span>
                                        </div>
                                        <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/40 flex items-center gap-1">
                                            <Clock className="w-3 h-3" />
                                            {new Date(idea.created_at).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <h3 className="text-2xl font-black text-foreground group-hover:text-primary transition-colors">{idea.title}</h3>
                                    <p className="text-muted-foreground font-medium leading-relaxed">{idea.description}</p>

                                    <div className="pt-4 flex items-center gap-4">
                                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-secondary/50 border border-border/50 text-xs font-bold">
                                            <div className="w-2 h-2 rounded-full bg-primary" />
                                            User ID: #{idea.user_id}
                                        </div>
                                    </div>

                                    <div className="pt-4 space-y-2">
                                        <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Founder Response (Shown to User)</label>
                                        <textarea
                                            value={adminNotes[idea.id] || ""}
                                            onChange={(e) => setAdminNotes({ ...adminNotes, [idea.id]: e.target.value })}
                                            placeholder="Write a response or implementation note..."
                                            className="w-full h-24 bg-card/50 border border-border/50 rounded-xl p-4 text-sm font-medium focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none"
                                        />
                                    </div>
                                </div>

                                <div className="w-full md:w-64 space-y-3 shrink-0">
                                    <div className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-2">Update Pipeline</div>
                                    <div className="grid grid-cols-1 gap-2">
                                        {[
                                            { status: 'UNDER_REVIEW', label: 'Review', icon: Clock },
                                            { status: 'PLANNED', label: 'Plan', icon: Save },
                                            { status: 'RESOLVED', label: 'Complete', icon: CheckCircle2 },
                                            { status: 'REJECTED', label: 'Reject', icon: XCircle },
                                        ].map(action => (
                                            <Button
                                                key={action.status}
                                                variant="outline"
                                                size="sm"
                                                onClick={() => handleUpdateStatus(idea.id, action.status)}
                                                className={`h-11 justify-start gap-3 rounded-xl font-bold transition-all ${idea.status === action.status ? "bg-secondary border-primary/50 text-foreground" : "hover:bg-primary/5 hover:text-primary hover:border-primary/30"
                                                    }`}
                                            >
                                                <action.icon className="w-4 h-4" />
                                                {action.label}
                                            </Button>
                                        ))}
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

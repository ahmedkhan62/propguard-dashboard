import { motion } from "framer-motion";
import { Brain, AlertCircle, TrendingUp, Clock, Target, Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { InfoModal } from "../shared/InfoModal";

interface BehavioralInsightsProps {
    intelligence: {
        flags: Array<{
            type: string;
            severity: 'warning' | 'critical';
            message: string;
        }>;
        session_performance: Record<string, {
            count: number;
            profit: number;
        }>;
        score: number | string;
    };
}

export function BehavioralInsights({ intelligence }: BehavioralInsightsProps) {
    const { flags, session_performance, score } = intelligence;
    const [infoModalOpen, setInfoModalOpen] = useState(false);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Brain className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-foreground">Behavioral Intelligence</h3>
                        <p className="text-sm text-muted-foreground">AI-driven discipline analysis</p>
                    </div>
                </div>
                <div className="text-right">
                    <button
                        onClick={() => setInfoModalOpen(true)}
                        className="flex items-center gap-1 ml-auto text-xs text-muted-foreground hover:text-primary transition-colors uppercase tracking-wider font-bold mb-1"
                    >
                        Safety Score
                        <Info className="w-3 h-3" />
                    </button>
                    <div className={`text-2xl font-black ${Number(score) > 80 ? 'text-status-safe' : Number(score) > 50 ? 'text-status-warning' : 'text-status-danger'}`}>
                        {score}/100
                    </div>
                </div>
            </div>

            <InfoModal
                isOpen={infoModalOpen}
                onClose={() => setInfoModalOpen(false)}
                type="safety"
                title="How Safety Score works"
                content={
                    <div className="space-y-4">
                        <p>The **Safety Score** is a real-time measure of your trading discipline. It helps you stay within prop firm boundaries and avoid emotional trading.</p>

                        <div className="space-y-2">
                            <h4 className="text-foreground font-bold">What affects your score?</h4>
                            <ul className="list-disc pl-4 space-y-1">
                                <li><strong>Lot Size Consistency:</strong> Using excessive volume compared to your average reduces the score.</li>
                                <li><strong>Overtrading:</strong> Rapidly opening multiple positions in a short window triggers "revenge trading" flags.</li>
                                <li><strong>Drawdown Proximity:</strong> Getting closer to your daily loss limit significantly drops your safety rating.</li>
                            </ul>
                        </div>

                        <div className="p-3 bg-primary/5 rounded-lg border border-primary/20">
                            <p className="text-[10px] italic">Tip: A score above 80 is considered institutional-grade discipline. Below 50 indicates high emotional risk.</p>
                        </div>
                    </div>
                }
            />

            {/* Behavioral Flags */}
            <div className="space-y-3">
                {flags.length > 0 ? flags.map((flag, i) => (
                    <motion.div
                        key={i}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className={`p-4 rounded-xl border flex items-start gap-3 ${flag.severity === 'critical'
                            ? 'bg-status-danger/5 border-status-danger/20 text-status-danger'
                            : 'bg-status-warning/5 border-status-warning/20 text-status-warning'
                            }`}
                    >
                        <AlertCircle className="w-5 h-5 mt-0.5 shrink-0" />
                        <div className="text-sm font-medium">{flag.message}</div>
                    </motion.div>
                )) : (
                    <div className="p-4 rounded-xl bg-status-safe/5 border border-status-safe/20 text-status-safe flex items-center gap-3">
                        <Target className="w-5 h-5 shrink-0" />
                        <div className="text-sm font-medium">No negative behavioral patterns detected. Discipline is high.</div>
                    </div>
                )}
            </div>

            {/* Session Bias */}
            <div className="relative">
                {Object.keys(session_performance).length === 0 && (
                    <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/20 backdrop-blur-[2px] rounded-xl border border-dashed border-primary/30">
                        <div className="text-center p-4">
                            <Badge variant="outline" className="mb-2 bg-primary/10 text-primary border-primary/20">Pro Feature</Badge>
                            <p className="text-xs font-bold text-foreground">Detailed Session Bias Analysis</p>
                            <p className="text-[10px] text-muted-foreground">Upgrade to Pro to see your performance by session.</p>
                        </div>
                    </div>
                )}
                <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 ${Object.keys(session_performance).length === 0 ? 'opacity-40 grayscale-[0.5]' : ''}`}>
                    {Object.keys(session_performance).length > 0 ? (
                        Object.entries(session_performance).map(([session, data], i) => (
                            <div key={session} className="p-4 rounded-xl bg-secondary/30 border border-border/50">
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{session}</span>
                                    <Badge variant="outline" className="text-[10px]">{data.count} Trades</Badge>
                                </div>
                                <div className={`text-lg font-bold ${data.profit >= 0 ? 'text-status-safe' : 'text-status-danger'}`}>
                                    {data.profit >= 0 ? '+' : ''}{data.profit.toLocaleString()}
                                </div>
                                <p className="text-[10px] text-muted-foreground mt-1">Total P/L</p>
                            </div>
                        ))
                    ) : (
                        // Placeholder cards for blurred state
                        ['London', 'NY', 'Asia'].map((session) => (
                            <div key={session} className="p-4 rounded-xl bg-secondary/30 border border-border/50">
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{session}</span>
                                    <Badge variant="outline" className="text-[10px]">0 Trades</Badge>
                                </div>
                                <div className="text-lg font-bold text-muted-foreground">$0.00</div>
                                <p className="text-[10px] text-muted-foreground mt-1">Total P/L</p>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

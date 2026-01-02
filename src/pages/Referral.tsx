import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Share2, Copy, Gift, Users, Trophy, ChevronRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ApiService } from "@/services/api";
import { toast } from "sonner";
import { DashboardLayout } from "@/components/layout/DashboardLayout";

export default function Referral() {
    const [stats, setStats] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    const GOAL = 5;

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const data = await ApiService.getReferralStats();
                setStats(data);
            } catch (e) {
                console.error("Failed to load referral stats");
            } finally {
                setIsLoading(false);
            }
        };
        fetchStats();
    }, []);

    const copyLink = () => {
        if (!stats?.code) return;
        const url = `${window.location.origin}/signup?ref=${stats.code}`;
        navigator.clipboard.writeText(url);
        toast.success("Referral link copied!");
    };

    const progress = stats ? (stats.usage_count / GOAL) * 100 : 0;
    const invitesLeft = stats ? Math.max(0, GOAL - stats.usage_count) : GOAL;

    return (
        <DashboardLayout>
            <div className="space-y-8 max-w-5xl mx-auto pb-20">
                {/* Hero Section */}
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-900/50 via-background to-background border border-indigo-500/20 p-8 md:p-12">
                    <div className="absolute top-0 right-0 p-12 opacity-10">
                        <Gift className="w-64 h-64 text-indigo-500" />
                    </div>

                    <div className="relative z-10 max-w-2xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-widest mb-6">
                            <Users className="w-4 h-4" />
                            Community Growth Program
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
                            Invite 5 Traders.<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                                Get 50% Off Lifetime.
                            </span>
                        </h1>
                        <p className="text-lg text-muted-foreground mb-8">
                            Help us build the most elite network of funded traders.
                            When 5 friends purchase any plan using your link, you instantly unlock half-off pricing for life.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <div className="flex-1 bg-secondary/50 rounded-xl p-2 pl-4 flex items-center border border-border/50">
                                <code className="flex-1 font-mono text-sm text-muted-foreground truncate">
                                    {stats?.code ? `${window.location.origin}/signup?ref=${stats.code}` : "Loading..."}
                                </code>
                                <Button size="sm" onClick={copyLink} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold ml-2">
                                    <Copy className="w-4 h-4 mr-2" />
                                    Copy
                                </Button>
                            </div>
                            <Button variant="outline" className="border-indigo-500/30 hover:bg-indigo-500/10 text-indigo-400 font-bold">
                                <Share2 className="w-4 h-4 mr-2" />
                                Share
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Progress Tracking */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-2 glass-panel border-border/50 p-8">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-bold text-white">Your Progress</h3>
                            <span className="text-indigo-400 font-black tracking-widest text-sm uppercase">
                                {stats?.usage_count || 0} / {GOAL} COMPLETED
                            </span>
                        </div>

                        <div className="mb-8">
                            <div className="h-4 w-full bg-secondary/30 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${Math.min(100, progress)}%` }}
                                    transition={{ duration: 1, ease: "easeOut" }}
                                />
                            </div>
                            <p className="text-sm text-muted-foreground mt-3 font-medium">
                                {invitesLeft > 0
                                    ? `Just ${invitesLeft} more referral${invitesLeft !== 1 ? 's' : ''} needed to unlock your reward!`
                                    : "You've unlocked the 50% Lifetime Discount! Contact support to apply it."}
                            </p>
                        </div>

                        <div className="space-y-4">
                            <h4 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4">Recent Referrals</h4>
                            {!stats?.conversions?.length ? (
                                <div className="text-center py-8 border-2 border-dashed border-white/5 rounded-xl">
                                    <Users className="w-8 h-8 text-muted-foreground/30 mx-auto mb-3" />
                                    <p className="text-sm text-muted-foreground">No referrals yet. Share your link to get started!</p>
                                </div>
                            ) : (
                                stats.conversions.map((conv: any, i: number) => (
                                    <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-secondary/20 border border-white/5">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center">
                                                <Trophy className="w-5 h-5 text-indigo-400" />
                                            </div>
                                            <div>
                                                <p className="font-bold text-white">New Trader Joined</p>
                                                <p className="text-xs text-muted-foreground">{new Date(conv.date).toLocaleDateString()}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <span className="px-2 py-1 rounded text-[10px] font-black uppercase bg-green-500/20 text-green-400 border border-green-500/20">
                                                Purchased {conv.purchased_plan}
                                            </span>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    {/* Reward Card */}
                    <div className="glass-panel border-border/50 p-8 flex flex-col items-center text-center relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mb-6 shadow-glow-sm">
                            <Gift className="w-10 h-10 text-white" />
                        </div>

                        <h3 className="text-xl font-bold text-white mb-2">Elite Reward</h3>
                        <p className="text-sm text-muted-foreground mb-6">
                            50% OFF your subscription for as long as you stay with us.
                        </p>

                        <div className="w-full mt-auto">
                            <Button className="w-full bg-white/5 hover:bg-white/10 text-white border border-white/10" disabled>
                                {progress >= 100 ? "Unlocked!" : "Locked"}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}

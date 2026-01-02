import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { TrendingUp, Users, Globe, Target, Trophy, Percent, BarChart3, PieChart } from "lucide-react";
import { ApiService } from "@/services/api";
import { DashboardLayout } from "@/components/layout/DashboardLayout";

// Simple UI implementations for charts to avoid heavy dependencies
const ProgressBar = ({ label, value, color }: { label: string, value: number, color: string }) => (
    <div className="mb-4">
        <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-bold text-muted-foreground">{label}</span>
            <span className="text-sm font-black text-foreground">{value} Users</span>
        </div>
        <div className="h-3 w-full bg-secondary/30 rounded-full overflow-hidden">
            <motion.div
                className={`h-full ${color}`}
                initial={{ width: 0 }}
                animate={{ width: "100%" }} // Relative to max in real chart, simplified here
                style={{ width: `${Math.min(100, (value / 10) * 100)}%` }} // Scaling for demo
                transition={{ duration: 1 }}
            />
        </div>
    </div>
);

export default function GrowthAnalytics() {
    const [data, setData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                const res = await ApiService.getGrowthAnalytics();
                setData(res);
            } catch (e) {
                console.error("Failed to fetch growth analytics");
            } finally {
                setIsLoading(false);
            }
        };
        fetchAnalytics();
    }, []);

    return (
        <div className="space-y-8 pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                    <h1 className="text-3xl font-black text-foreground tracking-tight">Growth <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Intelligence</span></h1>
                    <p className="text-muted-foreground text-lg">Real-time analysis of your user base and acquisition channels.</p>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-widest">
                    <TrendingUp className="w-4 h-4" />
                    Live Data
                </div>
            </div>

            {/* Demographics & Reach */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Global Reach */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="glass-panel p-6 border-border/50"
                >
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 rounded-lg bg-indigo-500/10 border border-indigo-500/20">
                            <Globe className="w-5 h-5 text-indigo-400" />
                        </div>
                        <div>
                            <h3 className="font-bold text-white">Global Reach</h3>
                            <p className="text-xs text-muted-foreground">User distribution by country</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {data?.countries?.slice(0, 5).map((c: any) => (
                            <div key={c.name} className="space-y-1">
                                <div className="flex justify-between text-sm">
                                    <span className="text-zinc-300 font-medium">{c.name}</span>
                                    <span className="text-zinc-500">{c.count} users</span>
                                </div>
                                <div className="h-2 bg-secondary/30 rounded-full overflow-hidden">
                                    <motion.div
                                        className="h-full bg-indigo-500"
                                        initial={{ width: 0 }}
                                        animate={{ width: `${(c.count / data.total_onboarded) * 100}%` }}
                                        transition={{ duration: 1 }}
                                    />
                                </div>
                            </div>
                        ))}
                        {(!data?.countries || data.countries.length === 0) && (
                            <div className="text-center py-8 text-zinc-600">No geo data available yet.</div>
                        )}
                    </div>
                </motion.div>

                {/* Experience Distribution */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                    className="glass-panel p-6 border-border/50"
                >
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                            <Target className="w-5 h-5 text-emerald-400" />
                        </div>
                        <div>
                            <h3 className="font-bold text-white">Experience Level</h3>
                            <p className="text-xs text-muted-foreground">Trader maturity breakdown</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {data?.experience?.map((e: any) => (
                            <div key={e.level} className="flex items-center gap-4">
                                <div className="w-24 text-sm font-medium text-zinc-400">{e.level}</div>
                                <div className="flex-1 h-3 bg-secondary/30 rounded-full overflow-hidden">
                                    <motion.div
                                        className="h-full bg-emerald-500"
                                        initial={{ width: 0 }}
                                        animate={{ width: `${(e.count / data.total_onboarded) * 100}%` }}
                                        transition={{ duration: 1 }}
                                    />
                                </div>
                                <div className="w-12 text-right text-sm font-bold text-white">{e.count}</div>
                            </div>
                        ))}
                        {(!data?.experience || data.experience.length === 0) && (
                            <div className="text-center py-8 text-zinc-600">No experience data available yet.</div>
                        )}
                    </div>
                </motion.div>
            </div>

            {/* User Explorer Table */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="glass-panel border-border/50 overflow-hidden"
            >
                <div className="p-6 border-b border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-orange-500/10 border border-orange-500/20">
                            <Users className="w-5 h-5 text-orange-400" />
                        </div>
                        <div>
                            <h3 className="font-bold text-white">Recent Users</h3>
                            <p className="text-xs text-muted-foreground">Deep dive into individual profiles</p>
                        </div>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-white/5 border-b border-white/5">
                            <tr>
                                <th className="text-left py-3 px-6 text-xs font-bold text-zinc-500 uppercase tracking-wider">User</th>
                                <th className="text-left py-3 px-6 text-xs font-bold text-zinc-500 uppercase tracking-wider">Age</th>
                                <th className="text-left py-3 px-6 text-xs font-bold text-zinc-500 uppercase tracking-wider">Country</th>
                                <th className="text-left py-3 px-6 text-xs font-bold text-zinc-500 uppercase tracking-wider">Experience</th>
                                <th className="text-left py-3 px-6 text-xs font-bold text-zinc-500 uppercase tracking-wider">Goal</th>
                                <th className="text-left py-3 px-6 text-xs font-bold text-zinc-500 uppercase tracking-wider">Joined</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {data?.recent_users?.map((u: any, i: number) => (
                                <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                                    <td className="py-4 px-6">
                                        <div>
                                            <div className="font-bold text-white">{u.name}</div>
                                            <div className="text-xs text-zinc-500">{u.email}</div>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6 text-sm text-zinc-300">{u.age}</td>
                                    <td className="py-4 px-6 text-sm text-zinc-300">{u.country || "N/A"}</td>
                                    <td className="py-4 px-6">
                                        <span className={`px-2 py-1 rounded text-xs font-bold ${u.experience === 'Advanced' ? 'bg-emerald-500/20 text-emerald-400' :
                                                u.experience === 'Intermediate' ? 'bg-indigo-500/20 text-indigo-400' :
                                                    'bg-zinc-500/20 text-zinc-400'
                                            }`}>
                                            {u.experience}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6 text-sm text-zinc-400">{u.goal}</td>
                                    <td className="py-4 px-6 text-sm text-zinc-500">
                                        {new Date(u.date).toLocaleDateString()}
                                    </td>
                                </tr>
                            ))}
                            {(!data?.recent_users || data.recent_users.length === 0) && (
                                <tr>
                                    <td colSpan={6} className="text-center py-8 text-zinc-600">No users found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </motion.div>
        </div>
    );
}

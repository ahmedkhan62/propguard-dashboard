import { useState } from "react";
import { motion } from "framer-motion";
import {
    Search,
    Filter,
    MoreHorizontal,
    User,
    Shield,
    ExternalLink,
    CheckCircle2,
    XCircle,
    TrendingUp,
    AlertCircle,
    Gem,
    Zap,
    UserPlus,
    UserCheck,
    Lock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const mockUsers = [
    {
        id: "1",
        name: "Ahmed Khan",
        email: "ahmed@example.com",
        plan: "Ultra",
        status: "Active",
        signupDate: "2024-12-01",
        lastActivity: "2 mins ago",
        usage: "High",
        quality: "Power User",
        insight: "Highly engaged, using 5+ modules"
    },
    {
        id: "2",
        name: "John Doe",
        email: "john@doe.com",
        plan: "Standard",
        status: "Active",
        signupDate: "2025-01-10",
        lastActivity: "1 hour ago",
        usage: "Medium",
        quality: "New Growth",
        insight: "Trial to Paid conversion likely"
    },
    {
        id: "3",
        name: "Sarah Smith",
        email: "sarah@smith.io",
        plan: "Standard",
        status: "Active",
        signupDate: "2024-11-15",
        lastActivity: "5 days ago",
        usage: "Low",
        quality: "At Risk",
        insight: "Low usage in last 14 days"
    },
    {
        id: "4",
        name: "Mike Ross",
        email: "mike@ross.com",
        plan: "Ultra",
        status: "Active",
        signupDate: "2024-10-01",
        lastActivity: "10 mins ago",
        usage: "High",
        quality: "Whale",
        insight: "Top 1% revenue generator"
    },
];

export default function AdminUsers() {
    const [searchQuery, setSearchQuery] = useState("");

    return (
        <div className="space-y-10 pb-20">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-border/50">
                <div className="space-y-1">
                    <div className="inline-flex items-center gap-2 px-2 py-1 rounded bg-blue-500/10 text-[10px] font-black text-blue-500 uppercase tracking-widest mb-2">
                        <User className="w-3 h-3" />
                        User Quality Matrix
                    </div>
                    <h1 className="text-4xl font-black text-foreground tracking-tight">Executive <span className="gradient-text">User Control</span></h1>
                    <p className="text-muted-foreground font-medium text-lg">Identify your whales, support your power users, and save at-risk accounts.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" className="gap-2 rounded-xl h-12 px-6 font-bold border-border/50">
                        <Filter className="w-4 h-4" />
                        Advanced Sorting
                    </Button>
                    <Button variant="outline" className="gap-2 rounded-xl h-12 px-6 font-bold border-primary/30 text-primary hover:bg-primary/5">
                        <UserPlus className="w-4 h-4" />
                        Create Staff
                    </Button>
                    <Button variant="hero" className="shadow-glow-sm rounded-xl h-12 px-6 font-black uppercase tracking-widest">
                        Export User Data
                    </Button>
                </div>
            </header>

            {/* Quick Summary Bar */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                    { label: "Total Users", value: "3,842", emoji: "👥" },
                    { label: "Power Users", value: "242", emoji: "⚡" },
                    { label: "High Value (Whales)", value: "48", emoji: "💎" },
                    { label: "At Risk", value: "18", emoji: "⚠️" },
                ].map((stat) => (
                    <div key={stat.label} className="glass-card p-4 border-border/50 flex items-center justify-between">
                        <div>
                            <div className="text-[10px] font-black text-muted-foreground uppercase">{stat.label}</div>
                            <div className="text-2xl font-black text-foreground">{stat.value}</div>
                        </div>
                        <span className="text-2xl">{stat.emoji}</span>
                    </div>
                ))}
            </div>

            {/* Search & Stats Area */}
            <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                        placeholder="Search users by name, email, or behavior..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-12 h-14 bg-card border-border/50 focus:border-primary rounded-2xl text-lg font-medium"
                    />
                </div>
            </div>

            {/* Users Table */}
            <div className="glass-card overflow-hidden border-border/50 rounded-3xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-border/50 bg-secondary/20">
                                <th className="px-6 py-5 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">User & Identity</th>
                                <th className="px-6 py-5 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] text-center">Plan</th>
                                <th className="px-6 py-5 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] text-center">Quality Label</th>
                                <th className="px-6 py-5 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Founder Insight</th>
                                <th className="px-6 py-5 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border/20">
                            {mockUsers.map((user, i) => (
                                <tr key={user.id} className="hover:bg-primary/[0.02] transition-colors group">
                                    <td className="px-6 py-6 font-bold">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-primary font-black text-lg border border-primary/10 group-hover:scale-105 transition-transform">
                                                {user.name.charAt(0)}
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-foreground group-hover:text-primary transition-colors text-lg">{user.name}</span>
                                                <span className="text-xs text-muted-foreground/70 font-medium tracking-tight">{user.email}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-6 text-center">
                                        <span className={`inline-flex items-center px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${user.plan === 'Ultra' ? 'bg-primary/20 text-primary border border-primary/20' :
                                            'bg-secondary/50 text-muted-foreground border border-border/50'
                                            }`}>
                                            {user.plan}
                                        </span>
                                    </td>
                                    <td className="px-6 py-6 text-center">
                                        <div className="flex flex-col items-center gap-1">
                                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-[10px] font-black uppercase tracking-widest border ${user.quality === 'Power User' ? 'bg-status-safe/10 text-status-safe border-status-safe/20' :
                                                user.quality === 'Whale' ? 'bg-blue-500/10 text-blue-500 border-blue-500/20' :
                                                    user.quality === 'At Risk' ? 'bg-status-danger/10 text-status-danger border-status-danger/20' :
                                                        'bg-secondary text-muted-foreground border-border/50'
                                                }`}>
                                                {user.quality === 'Power User' && <Zap className="w-3 h-3" />}
                                                {user.quality === 'Whale' && <Gem className="w-3 h-3" />}
                                                {user.quality === 'At Risk' && <AlertCircle className="w-3 h-3" />}
                                                {user.quality}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-6 min-w-[200px]">
                                        <div className="text-xs font-bold text-foreground/80 italic leading-relaxed">
                                            "{user.insight}"
                                        </div>
                                    </td>
                                    <td className="px-6 py-6 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button className="p-2 rounded-xl bg-secondary/50 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all border border-transparent hover:border-primary/20">
                                                <ExternalLink className="w-5 h-5" />
                                            </button>
                                            <button className="p-2 rounded-xl bg-secondary/50 text-muted-foreground hover:text-foreground hover:bg-secondary transition-all border border-transparent hover:border-border/50">
                                                <MoreHorizontal className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-between p-6 glass-card border-border/50 rounded-3xl gap-4">
                <span className="text-sm text-muted-foreground font-medium">Monitoring 4 users from a ecosystem of 3,842</span>
                <div className="flex items-center gap-3">
                    <Button variant="outline" className="px-6 h-10 rounded-xl font-bold border-border/50 hover:bg-secondary">Previous</Button>
                    <Button variant="outline" className="px-6 h-10 rounded-xl font-bold border-border/50 hover:bg-secondary">Next</Button>
                </div>
            </div>
        </div>
    );
}

import { Link, useLocation } from "react-router-dom";
import {
    LayoutDashboard,
    Users,
    CreditCard,
    Shield,
    ShieldCheck,
    Settings,
    Bell,
    TrendingUp,
    LogOut,
    ChevronRight,
    Lightbulb,
    ShieldAlert,
    MessageSquare,
    Activity,
    FileWarning,
    HeartPulse,
    Terminal
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";

const menuItems = [
    { icon: LayoutDashboard, label: "Overview", path: "/admin/dashboard", desc: "Executive Control", group: "Management", role: "ANY" },
    { icon: Users, label: "User Control", path: "/admin/users", desc: "Quality Matrix", group: "Management", permission: "view_users" },
    { icon: ShieldCheck, label: "Team Management", path: "/admin/team", desc: "Staff Command", group: "Management", role: "FOUNDER" },
    { icon: CreditCard, label: "Billing & Revenue", path: "/admin/billing", desc: "Growth Insights", group: "Management", role: "FOUNDER" },
    { icon: HeartPulse, label: "System Health", path: "/admin/health", desc: "Performance Vitals", group: "System", role: "FOUNDER" },
    { icon: Settings, label: "Global Controls", path: "/admin/controls", desc: "Authority Zone", group: "System", role: "FOUNDER" },
    { icon: Bell, label: "Alert Center", path: "/admin/alerts", desc: "Intelligence Feed", group: "Communications", role: "FOUNDER" },
    { icon: MessageSquare, label: "Live Support", path: "/admin/support", desc: "Response Matrix", group: "Communications", permission: "support_reply" },
    { icon: Lightbulb, label: "Idea Matrix", path: "/admin/ideas", desc: "Innovation Pipe", group: "Communications", permission: "view_feedback" },
    { icon: FileWarning, label: "Complaint Tracker", path: "/admin/complaints", desc: "Resolution Flow", group: "Communications", permission: "view_complaints" },
];

export const AdminSidebar = () => {
    const location = useLocation();
    const { logout, user } = useAuth();

    const groups = ["Management", "System", "Communications"];

    return (
        <div className="w-72 h-screen bg-[#050505]/80 backdrop-blur-2xl border-r border-white/5 flex flex-col fixed left-0 top-0 z-50">
            {/* Logo Section */}
            <div className="p-8 pb-10">
                <Link to="/admin/dashboard" className="flex items-center gap-3.5 group">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary via-primary/80 to-primary/40 p-0.5 shadow-[0_0_20px_rgba(var(--primary-rgb),0.3)] group-hover:shadow-[0_0_30px_rgba(var(--primary-rgb),0.5)] transition-all duration-500">
                        <div className="w-full h-full rounded-[14px] bg-black flex items-center justify-center">
                            <TrendingUp className="w-6 h-6 text-primary group-hover:scale-110 transition-transform duration-500" />
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <span className="font-black text-2xl text-foreground leading-none tracking-tight group-hover:gradient-text transition-all">RiskLock</span>
                        <div className="flex items-center gap-1.5 mt-1.5">
                            <span className="text-[9px] text-primary font-black tracking-[0.25em] uppercase px-1.5 py-0.5 bg-primary/10 rounded">Founder</span>
                            <div className="w-1 h-1 rounded-full bg-status-safe animate-pulse" />
                        </div>
                    </div>
                </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 space-y-8 overflow-y-auto custom-scrollbar pb-10">
                {groups.map(group => (
                    <div key={group} className="space-y-2">
                        <div className="px-4 mb-2">
                            <span className="text-[10px] font-black text-muted-foreground/30 uppercase tracking-[0.2em]">{group} Portal</span>
                        </div>
                        <div className="space-y-1.5">
                            {menuItems
                                .filter(item => item.group === group)
                                .filter(item => {
                                    if (!user) return false;
                                    if (user.role === 'FOUNDER') return true;
                                    if (item.role === 'FOUNDER') return false;
                                    if (item.permission) return user.permissions?.[item.permission];
                                    return true;
                                })
                                .map((item) => {
                                    const isActive = location.pathname === item.path;
                                    return (
                                        <Link
                                            key={item.path}
                                            to={item.path}
                                            className={cn(
                                                "flex items-center justify-between px-4 py-3 rounded-2xl transition-all duration-300 group relative overflow-hidden",
                                                isActive
                                                    ? "bg-white/[0.03] border border-white/5 shadow-inner"
                                                    : "text-muted-foreground hover:text-foreground border border-transparent"
                                            )}
                                        >
                                            {isActive && (
                                                <motion.div
                                                    layoutId="active-nav-admin"
                                                    className="absolute left-0 top-1/4 bottom-1/4 w-1 bg-primary rounded-full"
                                                />
                                            )}
                                            <div className="flex items-center gap-4 relative z-10">
                                                <div className={cn(
                                                    "w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300",
                                                    isActive ? "bg-primary text-white shadow-glow-sm scale-105" : "bg-white/5 text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary"
                                                )}>
                                                    <item.icon className="w-5 h-5" />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className={cn("font-black text-sm tracking-tight", isActive ? "text-foreground" : "")}>{item.label}</span>
                                                    <span className="text-[10px] text-muted-foreground/50 font-medium">{item.desc}</span>
                                                </div>
                                            </div>
                                            <ChevronRight className={cn(
                                                "w-4 h-4 transition-all duration-300",
                                                isActive ? "text-primary opacity-100 translate-x-0" : "opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-muted-foreground"
                                            )} />
                                        </Link>
                                    );
                                })}
                        </div>
                    </div>
                ))}
            </nav>

            {/* User Footer Section */}
            <div className="p-6 mt-auto border-t border-white/5 bg-white/[0.01]">
                <div className="flex items-center gap-3 mb-6 px-2">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary/20 to-blue-500/20 border border-white/5 flex items-center justify-center font-black text-primary">
                        {user?.full_name?.charAt(0) || "F"}
                    </div>
                    <div className="flex flex-col overflow-hidden">
                        <span className="font-bold text-sm text-foreground truncate">{user?.full_name || "Founder"}</span>
                        <span className="text-[10px] text-muted-foreground truncate font-medium">{user?.email || "founder@risklock.com"}</span>
                    </div>
                </div>
                <button
                    onClick={logout}
                    className="flex items-center justify-center gap-3 w-full h-12 rounded-xl text-muted-foreground hover:bg-status-danger/10 hover:text-status-danger transition-all font-black text-xs uppercase tracking-widest border border-transparent hover:border-status-danger/20"
                >
                    <LogOut className="w-4 h-4" />
                    Secure Sign Out
                </button>
            </div>
        </div>
    );
};

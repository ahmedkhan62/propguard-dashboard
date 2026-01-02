import { useState, useEffect } from "react";
import { SurveillanceReport } from "@/components/admin/SurveillanceReport";
import { motion, AnimatePresence } from "framer-motion";
import {
    Users,
    UserPlus,
    Shield,
    ShieldCheck,
    ShieldAlert,
    Clock,
    Activity,
    Search,
    MoreHorizontal,
    UserX,
    Trash2,
    CheckCircle2,
    AlertCircle,
    Mail,
    Lock,
    Zap,
    Gem,
    TrendingUp,
    ChevronRight,
    CircleDashed,
    RefreshCcw,
    LayoutDashboard,
    MessageCircle,
    FileWarning,
    Lightbulb,
    Terminal,
    Megaphone,
    BarChart3,
    Key,
    LogOut
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogDescription,
    DialogFooter
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { ApiService } from "@/services/api";

const PERMISSION_OPTS = [
    { id: "view_users", label: "View User Directory", icon: Users, color: "text-blue-500" },
    { id: "support_reply", label: "Reply to Live Support", icon: MessageCircle, color: "text-green-500" },
    { id: "view_complaints", label: "View Complaints", icon: FileWarning, color: "text-red-500" },
    { id: "view_feedback", label: "View Feedback & Ideas", icon: Lightbulb, color: "text-orange-500" },
    { id: "system_logs", label: "Access System Logs", icon: Terminal, color: "text-zinc-500" },
    { id: "send_announcements", label: "Send Announcements", icon: Megaphone, color: "text-purple-500" },
    { id: "view_reports", label: "View Financial Reports", icon: BarChart3, color: "text-emerald-500" },
];

export default function TeamManagement() {
    const [employees, setEmployees] = useState<any[]>([]);
    const [activities, setActivities] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    // Detailed states
    const [selectedEmployee, setSelectedEmployee] = useState<any>(null);
    const [employeeInsights, setEmployeeInsights] = useState<any>(null);

    // Form state
    const [newEmployee, setNewEmployee] = useState({
        full_name: "",
        email: "",
        password: "",
        role: "STAFF",
        permissions: {
            view_users: false,
            support_reply: false,
            view_complaints: false,
            view_feedback: false,
            system_logs: false,
            send_announcements: false,
            view_reports: false
        }
    });
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isReportOpen, setIsReportOpen] = useState(false);

    const fetchData = async () => {
        try {
            const [empData, actData] = await Promise.all([
                ApiService.getTeamEmployees(),
                ApiService.getTeamActivity()
            ]);

            const emps = Array.isArray(empData) ? empData : [];

            // Fetch insights for each employee in parallel
            const empsWithInsights = await Promise.all(emps.map(async (emp) => {
                try {
                    const insights = await ApiService.getEmployeeInsights(emp.id);
                    return { ...emp, insights };
                } catch (e) {
                    return { ...emp, insights: null };
                }
            }));

            setEmployees(empsWithInsights);
            setActivities(Array.isArray(actData) ? actData : []);
        } catch (e: any) {
            console.error("Team sync error", e);
            toast.error("Failed to sync team data");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
        const interval = setInterval(fetchData, 30000);
        return () => clearInterval(interval);
    }, []);

    const handleCreateEmployee = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await ApiService.createTeamEmployee(newEmployee);
            toast.success("Staff account created successfully");
            setIsCreateOpen(false);
            setNewEmployee({
                full_name: "",
                email: "",
                password: "",
                role: "STAFF",
                permissions: {
                    view_users: false,
                    support_reply: false,
                    view_complaints: false,
                    view_feedback: false,
                    system_logs: false,
                    send_announcements: false,
                    view_reports: false
                }
            });
            fetchData();
        } catch (e: any) {
            toast.error(e.response?.data?.detail || "Failed to create account");
        }
    };

    const handleDeleteEmployee = async (id: number) => {
        if (!window.confirm("Are you sure you want to PERMANENTLY delete this staff account? This action cannot be undone.")) return;
        try {
            await ApiService.deleteTeamEmployee(id);
            toast.success("Staff account deleted");
            fetchData();
        } catch (e) {
            toast.error("Failed to delete account");
        }
    };

    const handleToggleSuspension = async (id: number, currentStatus: boolean) => {
        try {
            await ApiService.updateTeamEmployee(id, { is_suspended: !currentStatus });
            toast.success(currentStatus ? "Account reactivated" : "Account suspended");
            fetchData();
        } catch (e) {
            toast.error("Failed to update account status");
        }
    };

    const handleUpdatePermissions = async (employeeId: number, permission: string, value: boolean) => {
        const emp = employees.find(e => e.id === employeeId);
        if (!emp) return;

        const updatedPermissions = { ...emp.permissions, [permission]: value };
        try {
            await ApiService.updateTeamEmployee(employeeId, { permissions: updatedPermissions });
            setEmployees(prev => prev.map(e => e.id === employeeId ? { ...e, permissions: updatedPermissions } : e));
            toast.success("Permissions updated instantly");
        } catch (e) {
            toast.error("Failed to sync permissions");
        }
    };

    const handleSelectEmployee = async (emp: any) => {
        setSelectedEmployee(emp);
        setEmployeeInsights(null);
        try {
            const insights = await ApiService.getEmployeeInsights(emp.id);
            setEmployeeInsights(insights);
        } catch (e) {
            console.error("Failed to fetch insights");
        }
    };

    const filteredEmployees = employees.filter(emp =>
        emp.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        emp.email?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const getStatusInfo = (isSuspended: boolean, lastActive?: string) => {
        if (isSuspended) return { label: 'Suspended', color: 'text-status-danger', bg: 'bg-status-danger', border: 'border-status-danger' };

        if (!lastActive) return { label: 'Inactive', color: 'text-muted-foreground', bg: 'bg-muted-foreground', border: 'border-muted-foreground' };

        const lastActiveDate = new Date(lastActive);
        const diffMinutes = (new Date().getTime() - lastActiveDate.getTime()) / 60000;

        if (diffMinutes < 5) return { label: 'Online', color: 'text-status-safe', bg: 'bg-status-safe', border: 'border-status-safe' };
        if (diffMinutes < 30) return { label: 'Away', color: 'text-status-warning', bg: 'bg-status-warning', border: 'border-status-warning' };

        return { label: 'Offline', color: 'text-muted-foreground', bg: 'bg-muted-foreground', border: 'border-muted-foreground' };
    };

    const getRoleConfig = (role: string) => {
        switch (role) {
            case "FOUNDER": return { icon: Shield, color: "text-accent-primary", bg: "bg-accent-primary/10", border: "border-accent-primary/20" };
            case "STAFF": return { icon: Users, color: "text-blue-500", bg: "bg-blue-500/10", border: "border-blue-500/20" };
            case "SUPPORT": return { icon: MessageCircle, color: "text-green-500", bg: "bg-green-500/10", border: "border-green-500/20" };
            default: return { icon: Users, color: "text-primary", bg: "bg-primary/10", border: "border-primary/20" };
        }
    };

    return (
        <div className="space-y-10 pb-20">
            {/* Header */}
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-border/50">
                <div className="space-y-1">
                    <div className="inline-flex items-center gap-2 px-2 py-1 rounded bg-accent-primary/10 text-[10px] font-black text-accent-primary uppercase tracking-widest mb-2">
                        <Shield className="w-3 h-3" />
                        Executive Command Center
                    </div>
                    <h1 className="text-4xl font-black text-foreground tracking-tight">Team <span className="gradient-text">Management</span></h1>
                    <p className="text-muted-foreground font-medium text-lg">Maintain total control over your elite workforce and access permissions.</p>
                </div>

                <div className="flex items-center gap-3">
                    <Button
                        variant="outline"
                        onClick={fetchData}
                        className="h-12 w-12 p-0 rounded-xl"
                    >
                        <RefreshCcw className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
                    </Button>

                    <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
                        <DialogTrigger asChild>
                            <Button variant="hero" className="shadow-glow-sm rounded-xl h-12 px-6 font-black uppercase tracking-widest gap-2">
                                <UserPlus className="w-5 h-5" />
                                Deploy Staff
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px] glass-panel border-border/50">
                            <DialogHeader>
                                <DialogTitle className="text-2xl font-black uppercase tracking-tight">Initialize Staff Member</DialogTitle>
                                <DialogDescription className="font-medium text-muted-foreground">
                                    Define credentials and operational role. Access is restricted by default.
                                </DialogDescription>
                            </DialogHeader>
                            <form onSubmit={handleCreateEmployee} className="space-y-4 py-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Full Name</label>
                                    <Input
                                        required
                                        placeholder="e.g. James Wilson"
                                        className="h-12 bg-secondary/30 rounded-xl border-border/50"
                                        value={newEmployee.full_name}
                                        onChange={e => setNewEmployee({ ...newEmployee, full_name: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Work Email</label>
                                    <Input
                                        required
                                        type="email"
                                        placeholder="staff@risklock.com"
                                        className="h-12 bg-secondary/30 rounded-xl border-border/50"
                                        value={newEmployee.email}
                                        onChange={e => setNewEmployee({ ...newEmployee, email: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Temporary Password</label>
                                    <Input
                                        required
                                        type="password"
                                        placeholder="••••••••"
                                        className="h-12 bg-secondary/30 rounded-xl border-border/50"
                                        value={newEmployee.password}
                                        onChange={e => setNewEmployee({ ...newEmployee, password: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Operational Role</label>
                                    <Select
                                        value={newEmployee.role}
                                        onValueChange={val => setNewEmployee({ ...newEmployee, role: val })}
                                    >
                                        <SelectTrigger className="h-12 bg-secondary/30 rounded-xl border-border/50">
                                            <SelectValue placeholder="Select Role" />
                                        </SelectTrigger>
                                        <SelectContent className="glass-panel border-border/50">
                                            <SelectItem value="STAFF">Standard Staff</SelectItem>
                                            <SelectItem value="SUPPORT">Support Agent</SelectItem>
                                            <SelectItem value="ANALYST">Business Analyst</SelectItem>
                                            <SelectItem value="MODERATOR">Content Moderator</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-4 pt-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Initial Permissions Matrix</label>
                                    <div className="grid grid-cols-1 gap-2 border border-border/30 rounded-xl p-3 bg-secondary/10 overflow-y-auto max-h-[200px] scrollbar-hide">
                                        {PERMISSION_OPTS.map(opt => (
                                            <div key={opt.id} className="flex items-center justify-between py-1">
                                                <div className="flex items-center gap-2">
                                                    <opt.icon className={`w-3 h-3 ${opt.color}`} />
                                                    <span className="text-[11px] font-bold text-muted-foreground">{opt.label}</span>
                                                </div>
                                                <Switch
                                                    checked={(newEmployee.permissions as any)[opt.id]}
                                                    onCheckedChange={(val) => setNewEmployee({
                                                        ...newEmployee,
                                                        permissions: { ...newEmployee.permissions, [opt.id]: val }
                                                    })}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <DialogFooter className="pt-4">
                                    <Button type="submit" className="w-full h-12 bg-primary text-white font-black uppercase tracking-widest rounded-xl hover:shadow-glow-sm transition-all mt-4">
                                        Instantiate Account
                                    </Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Employee Dynamic Cards */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input
                            placeholder="Monitor staff performance..."
                            className="pl-12 h-14 bg-card border-border/50 rounded-2xl text-lg font-medium shadow-sm focus:ring-primary/20"
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                        <AnimatePresence mode="popLayout">
                            {filteredEmployees.map((emp) => {
                                const config = getRoleConfig(emp.role);
                                const status = getStatusInfo(emp.is_suspended, emp.last_active);
                                const isExpanded = selectedEmployee?.id === emp.id;

                                return (
                                    <motion.div
                                        layout
                                        key={emp.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        className={`glass-card border-border/50 relative overflow-hidden group hover:border-primary/30 transition-all ${emp.is_suspended ? 'grayscale opacity-70' : ''}`}
                                    >
                                        <div className="p-6">
                                            <div className="flex items-start justify-between relative z-10">
                                                <div className="flex items-center gap-6">
                                                    <div className={`w-16 h-16 rounded-2xl ${config.bg} ${config.color} flex items-center justify-center font-black text-2xl border ${config.border} shadow-glow-sm`}>
                                                        {emp.full_name?.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <h3 className="font-bold text-foreground text-xl tracking-tight flex items-center gap-3">
                                                            {emp.full_name}
                                                            <div className={`h-2 w-2 rounded-full ${status.label === 'Online' ? 'bg-status-safe animate-pulse' : 'bg-muted-foreground/30'}`} />
                                                        </h3>
                                                        <div className="flex items-center gap-3 mt-1">
                                                            <p className="text-sm text-muted-foreground font-medium">{emp.email}</p>
                                                            <Badge variant="outline" className={`text-[9px] font-black tracking-widest ${status.bg} ${status.color} border-none`}>
                                                                {status.label}
                                                            </Badge>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col items-end gap-2 text-right">
                                                    <Badge className={`uppercase tracking-tighter text-[10px] font-black h-6 px-3 ${config.bg} ${config.color} border-${config.color}/20`}>
                                                        {emp.role}
                                                    </Badge>
                                                </div>
                                            </div>

                                            {/* Insights & Permission Matrix */}
                                            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-border/20 pt-6">
                                                {/* Permission Matrix */}
                                                <div className="space-y-4">
                                                    <h4 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                                                        <Key className="w-3 h-3 text-primary" />
                                                        Dynamic Permissions Matrix
                                                    </h4>
                                                    <div className="grid grid-cols-1 gap-2">
                                                        {PERMISSION_OPTS.map(opt => (
                                                            <div key={opt.id} className="flex items-center justify-between p-2 rounded-lg bg-secondary/20 border border-border/10 hover:border-primary/20 transition-all group/opt">
                                                                <div className="flex items-center gap-3">
                                                                    <opt.icon className={`w-4 h-4 ${opt.color}`} />
                                                                    <span className="text-xs font-bold text-muted-foreground group-hover/opt:text-foreground transition-colors">{opt.label}</span>
                                                                </div>
                                                                <Switch
                                                                    checked={!!emp.permissions?.[opt.id]}
                                                                    onCheckedChange={(val) => handleUpdatePermissions(emp.id, opt.id, val)}
                                                                />
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* Performance Insights */}
                                                <div className="space-y-4">
                                                    <h4 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                                                        <BarChart3 className="w-3 h-3 text-primary" />
                                                        Operational Intelligence
                                                    </h4>
                                                    <div className="grid grid-cols-2 gap-3">
                                                        <div className="p-4 rounded-xl bg-secondary/10 border border-border/20">
                                                            <p className="text-[9px] font-black text-muted-foreground uppercase mb-1">Total Actions</p>
                                                            <p className="text-2xl font-black text-primary">{emp.insights?.total_actions || "--"}</p>
                                                        </div>
                                                        <div className="p-4 rounded-xl bg-secondary/10 border border-border/20">
                                                            <p className="text-[9px] font-black text-muted-foreground uppercase mb-1">Time Online</p>
                                                            <p className="text-2xl font-black text-foreground">{emp.insights?.time_spent || "0m"}</p>
                                                        </div>
                                                        <div className="p-4 rounded-xl bg-secondary/10 border border-border/20 col-span-2">
                                                            <p className="text-[9px] font-black text-muted-foreground uppercase mb-1">Most Active Module</p>
                                                            <p className="text-sm font-bold text-foreground truncate">{emp.insights?.most_active_module || "None"}</p>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center gap-2 pt-2">
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            className="flex-1 h-9 text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-primary/5 border-border/50"
                                                            onClick={async () => {
                                                                const pw = window.prompt("Enter new password for " + emp.full_name);
                                                                if (pw) {
                                                                    try {
                                                                        await ApiService.resetEmployeePassword(emp.id, pw);
                                                                        toast.success("Password reset and session terminated");
                                                                    } catch (e) {
                                                                        toast.error("Failed to reset password");
                                                                    }
                                                                }
                                                            }}
                                                        >
                                                            Reset Pass
                                                        </Button>
                                                        {/* Status Badge */}
                                                        <div className={`
                                            px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest border
                                            ${getStatusInfo(emp.is_suspended, emp.last_active).bg} 
                                            ${getStatusInfo(emp.is_suspended, emp.last_active).color}
                                            ${getStatusInfo(emp.is_suspended, emp.last_active).border}
                                        `}>
                                                            {getStatusInfo(emp.is_suspended, emp.last_active).label}
                                                        </div>
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            className="flex-1 h-9 text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-status-danger/10 border-border/50 text-status-danger"
                                                            onClick={async () => {
                                                                if (!window.confirm("Force logout " + emp.full_name + "?")) return;
                                                                try {
                                                                    await ApiService.forceLogoutEmployee(emp.id);
                                                                    toast.success("Staff member session terminated");
                                                                } catch (e) {
                                                                    toast.error("Failed to force logout");
                                                                }
                                                            }}
                                                        >
                                                            Force Logout
                                                        </Button>
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            className="h-9 w-9 p-0 text-muted-foreground hover:text-status-danger hover:bg-status-danger/10 rounded-xl"
                                                            onClick={() => handleDeleteEmployee(emp.id)}
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Action Glow */}
                                        {!emp.is_suspended && <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-primary/5 blur-[100px] rounded-full group-hover:bg-primary/10 transition-all opacity-50" />}
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Activity Feed */}
                <div className="space-y-6">
                    <div className="glass-card border-border/50 p-6 space-y-6 h-full min-h-[500px] flex flex-col">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-foreground flex items-center gap-2">
                                <Activity className="w-4 h-4 text-primary" />
                                Operational Log
                            </h3>
                            <Badge variant="outline" className="text-[9px] font-black">REAL-TIME</Badge>
                        </div>

                        <div className="flex-1 space-y-4 overflow-y-auto scrollbar-hide">
                            {activities.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center opacity-30 space-y-3">
                                    <CircleDashed className="w-8 h-8 animate-spin" />
                                    <p className="text-[10px] font-black uppercase tracking-widest">Awaiting team activity...</p>
                                </div>
                            ) : (
                                activities.map((act, i) => (
                                    <div key={i} className="flex gap-4 p-3 rounded-xl bg-secondary/20 border border-border/30">
                                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                                            <CheckCircle2 className="w-4 h-4 text-primary" />
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-[11px] font-bold text-foreground">
                                                <span className="text-primary">{act.employee?.full_name}</span> {act.description}
                                            </p>
                                            <div className="flex items-center gap-2 mt-1">
                                                <Badge variant="outline" className="text-[9px] font-black uppercase bg-secondary/30 border-border/50 h-5 px-1.5 rounded-md">
                                                    {act.module}
                                                </Badge>
                                                <span className="text-[9px] font-medium text-muted-foreground">• {new Date(act.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        <div className="pt-4 border-t border-border/50">
                            <Button
                                variant="outline"
                                className="w-full text-[10px] font-black uppercase tracking-widest h-10 rounded-xl hover:bg-primary/10 hover:text-primary transition-all"
                                onClick={() => setIsReportOpen(true)}
                            >
                                Full Surveillance Report
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <SurveillanceReport
                isOpen={isReportOpen}
                onClose={() => setIsReportOpen(false)}
                activities={activities}
            />
        </div>
    );
}

// Helper icons
function MessageSquare(props: any) {
    return <Users {...props} />; // Placeholder as MessageSquare isn't imported from main lucide list above
}

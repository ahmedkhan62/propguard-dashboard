import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, Download, Calendar, CheckCircle2, XCircle, AlertTriangle, Activity } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ActivityLog {
    id: number;
    employee_id: number;
    action: string;
    module: string;
    description: string;
    timestamp: string;
    metadata_json?: any;
    employee?: {
        full_name: string;
        email: string;
    };
}

interface SurveillanceReportProps {
    isOpen: boolean;
    onClose: () => void;
    activities: ActivityLog[];
}

export const SurveillanceReport = ({ isOpen, onClose, activities }: SurveillanceReportProps) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [moduleFilter, setModuleFilter] = useState("ALL");
    const [employeeFilter, setEmployeeFilter] = useState("ALL");

    // Extract unique modules and employees for filters
    const modules = Array.from(new Set(activities.map(a => a.module)));
    const employees = Array.from(new Set(activities.map(a => a.employee?.full_name || "Unknown")));

    const filteredActivities = activities.filter(act => {
        const matchesSearch =
            act.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            act.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
            act.employee?.full_name.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesModule = moduleFilter === "ALL" || act.module === moduleFilter;
        const matchesEmployee = employeeFilter === "ALL" || act.employee?.full_name === employeeFilter;

        return matchesSearch && matchesModule && matchesEmployee;
    });

    const exportLog = () => {
        const headers = ["Timestamp", "Employee", "Action", "Module", "Description"];
        const csvContent = [
            headers.join(","),
            ...filteredActivities.map(a => [
                new Date(a.timestamp).toISOString(),
                a.employee?.full_name || "Unknown",
                a.action,
                a.module,
                `"${a.description.replace(/"/g, '""')}"`
            ].join(","))
        ].join("\n");

        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `surveillance_report_${new Date().toISOString().split('T')[0]}.csv`;
        link.click();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-5xl h-[80vh] flex flex-col glass-panel border-border/50 p-0 overflow-hidden">
                {/* Header */}
                <div className="p-6 border-b border-border/50 flex items-center justify-between bg-black/20">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2 text-primary">
                            <Activity className="w-5 h-5" />
                            <h2 className="text-lg font-black uppercase tracking-widest text-foreground">Surveillance Report</h2>
                        </div>
                        <p className="text-sm text-muted-foreground font-medium">
                            Audit trail containing {filteredActivities.length} operational events
                        </p>
                    </div>
                    <Button
                        variant="outline"
                        onClick={exportLog}
                        className="gap-2 h-10 px-4 font-bold uppercase tracking-wide rounded-xl border-primary/20 hover:bg-primary/10 text-primary"
                    >
                        <Download className="w-4 h-4" />
                        Export CSV
                    </Button>
                </div>

                {/* Controls */}
                <div className="p-4 grid grid-cols-1 md:grid-cols-4 gap-4 bg-secondary/5 border-b border-border/50">
                    <div className="relative md:col-span-2">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                            placeholder="Search logs..."
                            className="pl-10 h-10 bg-background/50 border-border/50 rounded-lg"
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <Select value={moduleFilter} onValueChange={setModuleFilter}>
                        <SelectTrigger className="h-10 bg-background/50 border-border/50 rounded-lg">
                            <SelectValue placeholder="Filter Module" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="ALL">All Modules</SelectItem>
                            {modules.map(m => <SelectItem key={m} value={m}>{m}</SelectItem>)}
                        </SelectContent>
                    </Select>

                    <Select value={employeeFilter} onValueChange={setEmployeeFilter}>
                        <SelectTrigger className="h-10 bg-background/50 border-border/50 rounded-lg">
                            <SelectValue placeholder="Filter Staff" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="ALL">All Staff</SelectItem>
                            {employees.map(e => <SelectItem key={e} value={e}>{e}</SelectItem>)}
                        </SelectContent>
                    </Select>
                </div>

                {/* Data Table */}
                <div className="flex-1 overflow-y-auto p-0 scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-secondary/10 sticky top-0 z-10 backdrop-blur-md">
                            <tr>
                                <th className="p-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground font-mono">Timestamp</th>
                                <th className="p-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground font-mono">Staff Member</th>
                                <th className="p-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground font-mono">Module</th>
                                <th className="p-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground font-mono">Action</th>
                                <th className="p-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground font-mono">Details</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border/20">
                            {filteredActivities.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="p-10 text-center text-muted-foreground">
                                        No activity found matching your filters.
                                    </td>
                                </tr>
                            ) : (
                                filteredActivities.map((act) => (
                                    <tr key={act.id} className="hover:bg-primary/5 transition-colors group">
                                        <td className="p-4 text-xs font-mono text-muted-foreground whitespace-nowrap">
                                            {new Date(act.timestamp).toLocaleString()}
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-2">
                                                <div className="w-6 h-6 rounded bg-primary/20 flex items-center justify-center text-[10px] font-bold text-primary">
                                                    {act.employee?.full_name.charAt(0)}
                                                </div>
                                                <span className="text-sm font-bold text-foreground">{act.employee?.full_name}</span>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <Badge variant="outline" className="text-[10px] font-mono border-border/50 bg-secondary/20">
                                                {act.module}
                                            </Badge>
                                        </td>
                                        <td className="p-4">
                                            <span className="text-xs font-bold text-foreground">{act.action}</span>
                                        </td>
                                        <td className="p-4">
                                            <p className="text-sm text-muted-foreground truncate max-w-[300px]" title={act.description}>
                                                {act.description}
                                            </p>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </DialogContent>
        </Dialog>
    );
};

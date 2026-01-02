import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { motion } from "framer-motion";
import { FileText, Download, Calendar, Shield, Table, Brain, FileDown } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { ApiService } from "@/services/api";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

export default function Reports() {
    const { toast } = useToast();
    const [selectedAccount, setSelectedAccount] = useState<number | null>(null);
    const [format, setFormat] = useState<"pdf" | "csv">("pdf");
    const [isGenerating, setIsGenerating] = useState(false);

    const { data: accounts = [] } = useQuery({
        queryKey: ['brokers'],
        queryFn: ApiService.getBrokers
    });

    const handleDownload = async () => {
        if (!selectedAccount) {
            toast({
                title: "Selection Required",
                description: "Please select an account to generate a report.",
                variant: "destructive"
            });
            return;
        }

        setIsGenerating(true);
        try {
            const response = await ApiService.downloadReport(selectedAccount, format);

            // Create a blob and download it
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            const extension = format === "pdf" ? "pdf" : "csv";
            link.setAttribute('download', `RiskLock_Report_${selectedAccount}_${Date.now()}.${extension}`);
            document.body.appendChild(link);
            link.click();
            link.remove();

            toast({
                title: "Report Generated",
                description: `Your ${format.toUpperCase()} report has been downloaded.`,
            });
        } catch (error) {
            console.error("Report Download Error:", error);
            toast({
                title: "Generation Failed",
                description: "There was an error generating your report. Please try again.",
                variant: "destructive"
            });
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <DashboardLayout>
            <div className="space-y-8">
                <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="flex flex-col gap-2"
                >
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                            <FileDown className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight text-foreground">
                                Reporting <span className="text-primary">& Evidence</span>
                            </h1>
                            <p className="text-muted-foreground">
                                Generate verifiable proof of your trading discipline and risk compliance
                            </p>
                        </div>
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Config Panel */}
                    <div className="lg:col-span-1 space-y-6">
                        <motion.div
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.1 }}
                            className="glass-card p-6 space-y-6"
                        >
                            <div className="space-y-4">
                                <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                                    <Shield className="w-4 h-4 text-primary" />
                                    Select Trading Account
                                </label>
                                <div className="space-y-2">
                                    {accounts.map((acc: any) => (
                                        <button
                                            key={acc.id}
                                            onClick={() => setSelectedAccount(acc.id)}
                                            className={`w-full p-4 rounded-xl border text-left transition-all ${selectedAccount === acc.id
                                                    ? "bg-primary/10 border-primary shadow-[0_0_15px_rgba(var(--primary-rgb),0.1)]"
                                                    : "bg-secondary/5 border-border hover:border-primary/50"
                                                }`}
                                        >
                                            <div className="flex items-center justify-between mb-1">
                                                <span className="font-bold text-foreground">
                                                    {acc.name || acc.platform}
                                                </span>
                                                <Badge variant="outline" className="text-[10px]">
                                                    {acc.account_id}
                                                </Badge>
                                            </div>
                                            <p className="text-xs text-muted-foreground truncate">
                                                {acc.platform} Connector
                                            </p>
                                        </button>
                                    ))}
                                    {accounts.length === 0 && (
                                        <p className="text-sm text-muted-foreground text-center py-4 bg-secondary/5 rounded-xl border border-dashed border-border">
                                            No accounts connected.
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-4">
                                <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-primary" />
                                    Report Format
                                </label>
                                <div className="grid grid-cols-2 gap-3">
                                    <button
                                        onClick={() => setFormat("pdf")}
                                        className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${format === "pdf"
                                                ? "bg-primary/10 border-primary ring-1 ring-primary"
                                                : "bg-secondary/5 border-border hover:border-primary/50"
                                            }`}
                                    >
                                        <FileText className={`w-6 h-6 ${format === "pdf" ? "text-primary" : "text-muted-foreground"}`} />
                                        <span className="text-xs font-bold">PDF Compliance</span>
                                    </button>
                                    <button
                                        onClick={() => setFormat("csv")}
                                        className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${format === "csv"
                                                ? "bg-primary/10 border-primary ring-1 ring-primary"
                                                : "bg-secondary/5 border-border hover:border-primary/50"
                                            }`}
                                    >
                                        <Table className={`w-6 h-6 ${format === "csv" ? "text-primary" : "text-muted-foreground"}`} />
                                        <span className="text-xs font-bold">CSV Raw Data</span>
                                    </button>
                                </div>
                            </div>

                            <Button
                                className="w-full h-12 text-sm font-bold gap-2"
                                onClick={handleDownload}
                                disabled={isGenerating || accounts.length === 0}
                            >
                                {isGenerating ? (
                                    <div className="w-4 h-4 border-2 border-background/30 border-t-background rounded-full animate-spin" />
                                ) : (
                                    <Download className="w-4 h-4" />
                                )}
                                {isGenerating ? "Generating..." : "Download Report"}
                            </Button>
                        </motion.div>

                        {/* Compliance Note */}
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="p-4 rounded-xl bg-accent-primary/5 border border-accent-primary/20 space-y-2"
                        >
                            <h4 className="text-xs font-bold text-accent-primary uppercase tracking-wider">Verifier Note</h4>
                            <p className="text-[11px] text-muted-foreground leading-relaxed">
                                RiskLock reports are watermarked and include a unique hash for verification.
                                They serve as official evidence that no unauthorized execution occurred on your account.
                            </p>
                        </motion.div>
                    </div>

                    {/* Features Preview */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <motion.div
                                initial={{ scale: 0.95, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                className="glass-card p-6 space-y-4"
                            >
                                <div className="w-10 h-10 rounded-xl bg-status-safe/10 flex items-center justify-center">
                                    <Shield className="w-5 h-5 text-status-safe" />
                                </div>
                                <h3 className="font-bold text-lg">Full Compliance Audit</h3>
                                <p className="text-sm text-muted-foreground">
                                    The PDF report includes a chronological log of every risk violation, showing you exactly when and why any alerts were triggered.
                                </p>
                            </motion.div>

                            <motion.div
                                initial={{ scale: 0.95, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.3 }}
                                className="glass-card p-6 space-y-4"
                            >
                                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                                    <Brain className="w-5 h-5 text-primary" />
                                </div>
                                <h3 className="font-bold text-lg">Discipline Insights</h3>
                                <p className="text-sm text-muted-foreground">
                                    Your Safety Score and session performance bias are included as evidence of a calm, calculated trading strategy.
                                </p>
                            </motion.div>
                        </div>

                        {/* Preview Banner */}
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="glass-card p-0 overflow-hidden relative group"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
                            <div className="p-8 space-y-4">
                                <div className="flex items-center gap-2">
                                    <Badge variant="outline" className="bg-background/50">Coming Soon</Badge>
                                    <h3 className="text-xl font-bold">Scheduled Email Reports</h3>
                                </div>
                                <p className="text-muted-foreground max-w-md">
                                    Get automated weekly summaries sent directly to your inbox or your prop firm manager's email.
                                </p>
                                <div className="flex gap-4">
                                    <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
                                        <div className="w-1 h-1 rounded-full bg-primary" /> Weekly Summaries
                                    </div>
                                    <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
                                        <div className="w-1 h-1 rounded-full bg-primary" /> Monthly Stats
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}

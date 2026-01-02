import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { motion } from "framer-motion";
import { BookOpen, Search, Filter, TrendingUp, TrendingDown, Target, BarChart3, Clock, Shield } from "lucide-react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ApiService } from "@/services/api";
import { cn } from "@/lib/utils";
import { StatCard } from "@/components/dashboard/StatCard";

const mockTrades = [
  { id: 1, date: "2025-01-15", symbol: "XAUUSD", type: "BUY", entry: 2045.50, exit: 2058.30, profit: 384, rr: 2.1, status: "win" },
  { id: 2, date: "2025-01-15", symbol: "EURUSD", type: "SELL", entry: 1.0925, exit: 1.0890, profit: 175, rr: 1.8, status: "win" },
  { id: 3, date: "2025-01-14", symbol: "GBPUSD", type: "BUY", entry: 1.2650, exit: 1.2620, profit: -150, rr: -1, status: "loss" },
  { id: 4, date: "2025-01-14", symbol: "XAUUSD", type: "SELL", entry: 2055.00, exit: 2048.50, profit: 195, rr: 1.3, status: "win" },
  { id: 5, date: "2025-01-13", symbol: "USDJPY", type: "BUY", entry: 148.50, exit: 149.20, profit: 233, rr: 2.3, status: "win" },
  { id: 6, date: "2025-01-13", symbol: "EURUSD", type: "BUY", entry: 1.0880, exit: 1.0855, profit: -125, rr: -0.8, status: "loss" },
];

export default function TradeJournal() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "win" | "loss">("all");

  const { data: trades = [], isLoading } = useQuery({
    queryKey: ['journal-trades'],
    queryFn: ApiService.getTrades,
    refetchInterval: 5000,
  });

  const filteredTrades = trades.filter((trade: any) => {
    const symbol = trade.symbol || "";
    const matchesSearch = symbol.toLowerCase().includes(searchQuery.toLowerCase());
    const status = (trade.profit || 0) >= 0 ? "win" : "loss";
    const matchesFilter = filter === "all" || status === filter;
    return matchesSearch && matchesFilter;
  });

  const stats = {
    winRate: trades.length > 0 ? (trades.filter((t: any) => (t.profit || 0) >= 0).length / trades.length * 100).toFixed(1) : "0",
    totalProfit: trades.reduce((acc: number, t: any) => acc + (t.profit || 0), 0).toFixed(2),
    activeTrades: trades.length,
    avgScore: trades.length > 0 ? (trades.reduce((acc: number, t: any) => acc + (t.risk_score || 0), 0) / trades.length).toFixed(0) : "0",
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex flex-col md:flex-row md:items-center justify-between gap-4"
        >
          <div>
            <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">LIVE TRADE JOURNAL</h1>
            <p className="text-white/40">
              Automated risk-scored history and performance analytics
            </p>
          </div>
          <Button variant="outline" className="border-white/10 bg-white/5 text-white/60">
            <Filter className="w-4 h-4 mr-2" />
            Export Audit CSV
          </Button>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard
            title="Win Rate"
            value={`${stats.winRate}%`}
            icon={Target}
          />
          <StatCard
            title="Safety Score"
            value={`${stats.avgScore}/100`}
            subtitle="Avg Portfolio Risk"
            icon={Shield}
          />
          <StatCard
            title="Total P/L"
            value={`$${stats.totalProfit}`}
            icon={TrendingUp}
            className={parseFloat(stats.totalProfit) >= 0 ? "border-status-safe/20" : "border-status-danger/20"}
          />
          <StatCard
            title="Active Exposure"
            value={stats.activeTrades.toString()}
            subtitle="Open positions"
            icon={BarChart3}
          />
        </div>

        {/* Filters */}
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="glass-card p-4 border-white/5"
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <Input
                placeholder="Search by symbol..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-black/40 border-white/10 text-white placeholder:text-white/20"
              />
            </div>
            <div className="flex gap-2">
              {(["all", "win", "loss"] as const).map((status) => (
                <Button
                  key={status}
                  variant={filter === status ? "default" : "outline"}
                  onClick={() => setFilter(status)}
                  size="sm"
                  className={cn(
                    "capitalize border-white/10",
                    filter === status ? "bg-accent-primary text-white" : "bg-white/5 text-white/40"
                  )}
                >
                  {status === "all" ? "All History" : status}
                </Button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Trades Table */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="glass-card overflow-hidden border-white/5 shadow-2xl"
        >
          {isLoading ? (
            <div className="p-20 text-center text-white/20 animate-pulse">Synchronizing journal with broker...</div>
          ) : (
            <Table>
              <TableHeader className="bg-white/[0.02]">
                <TableRow className="border-white/5 hover:bg-transparent">
                  <TableHead className="text-white/40 uppercase text-[10px] font-bold tracking-widest">Symbol</TableHead>
                  <TableHead className="text-white/40 uppercase text-[10px] font-bold tracking-widest">Type</TableHead>
                  <TableHead className="text-white/40 uppercase text-[10px] font-bold tracking-widest">Session</TableHead>
                  <TableHead className="text-white/40 uppercase text-[10px] font-bold tracking-widest">Pricing</TableHead>
                  <TableHead className="text-white/40 uppercase text-[10px] font-bold tracking-widest text-right">Net P/L</TableHead>
                  <TableHead className="text-white/40 uppercase text-[10px] font-bold tracking-widest text-center">Safety</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTrades.map((trade: any) => (
                  <TableRow key={trade.ticket} className="border-white/5 hover:bg-white/[0.03] transition-colors">
                    <TableCell className="font-bold text-white">{trade.symbol}</TableCell>
                    <TableCell>
                      <span
                        className={cn(
                          "text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider",
                          trade.type.includes("BUY")
                            ? "bg-status-safe/10 text-status-safe border border-status-safe/20"
                            : "bg-status-danger/10 text-status-danger border border-status-danger/20"
                        )}
                      >
                        {trade.type}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="text-xs text-white/60 flex items-center gap-1.5">
                        <Clock className="w-3 h-3 text-accent-primary/60" />
                        {trade.session || "N/A"}
                      </span>
                    </TableCell>
                    <TableCell className="text-xs text-white/40">
                      In: {trade.open_price?.toFixed(5)}
                    </TableCell>
                    <TableCell
                      className={cn(
                        "text-right font-black",
                        (trade.profit || 0) >= 0 ? "text-status-safe" : "text-status-danger"
                      )}
                    >
                      {(trade.profit || 0) >= 0 ? "+" : ""}${trade.profit?.toFixed(2)}
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex flex-col items-center gap-1">
                        <span className={cn(
                          "text-[10px] font-bold",
                          (trade.risk_score || 0) > 80 ? "text-status-safe" :
                            (trade.risk_score || 0) > 50 ? "text-status-warning" : "text-status-danger"
                        )}>
                          {trade.risk_score || 0}%
                        </span>
                        <div className="w-12 h-1 bg-white/5 rounded-full overflow-hidden">
                          <div
                            className={cn(
                              "h-full transition-all duration-1000",
                              (trade.risk_score || 0) > 80 ? "bg-status-safe shadow-[0_0_5px_green]" :
                                (trade.risk_score || 0) > 50 ? "bg-status-warning shadow-[0_0_5px_orange]" : "bg-status-danger shadow-[0_0_5px_red]"
                            )}
                            style={{ width: `${trade.risk_score || 0}%` }}
                          />
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredTrades.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-20 text-white/10 italic">
                      No matching trades found in the current audit period.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </motion.div>
      </div>
    </DashboardLayout>
  );
}

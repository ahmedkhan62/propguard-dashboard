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
import { BookOpen, Search, Filter, TrendingUp, TrendingDown, Target, BarChart3 } from "lucide-react";
import { useState } from "react";
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

  const filteredTrades = mockTrades.filter((trade) => {
    const matchesSearch = trade.symbol.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === "all" || trade.status === filter;
    return matchesSearch && matchesFilter;
  });

  const stats = {
    winRate: 66.7,
    avgRR: 1.62,
    totalProfit: 712,
    maxDrawdown: -275,
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
            <h1 className="text-3xl font-bold text-foreground mb-2">Trade Journal</h1>
            <p className="text-muted-foreground">
              Review and analyze your trading history
            </p>
          </div>
          <Button variant="outline">
            <Filter className="w-4 h-4" />
            Export CSV
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
            title="Avg Risk:Reward"
            value={stats.avgRR.toFixed(2)}
            icon={BarChart3}
          />
          <StatCard
            title="Total P/L"
            value={`$${stats.totalProfit}`}
            icon={TrendingUp}
            trend={{ value: 12.5, positive: true }}
          />
          <StatCard
            title="Max Drawdown"
            value={`$${stats.maxDrawdown}`}
            icon={TrendingDown}
          />
        </div>

        {/* Filters */}
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="glass-card p-4"
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by symbol..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-secondary border-border"
              />
            </div>
            <div className="flex gap-2">
              {(["all", "win", "loss"] as const).map((status) => (
                <Button
                  key={status}
                  variant={filter === status ? "default" : "outline"}
                  onClick={() => setFilter(status)}
                  size="sm"
                  className="capitalize"
                >
                  {status === "all" ? "All Trades" : status}
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
          className="glass-card overflow-hidden"
        >
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="text-muted-foreground">Date</TableHead>
                <TableHead className="text-muted-foreground">Symbol</TableHead>
                <TableHead className="text-muted-foreground">Type</TableHead>
                <TableHead className="text-muted-foreground">Entry</TableHead>
                <TableHead className="text-muted-foreground">Exit</TableHead>
                <TableHead className="text-muted-foreground text-right">P/L</TableHead>
                <TableHead className="text-muted-foreground text-right">R:R</TableHead>
                <TableHead className="text-muted-foreground text-center">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTrades.map((trade) => (
                <TableRow key={trade.id} className="border-border hover:bg-secondary/50">
                  <TableCell className="text-muted-foreground">{trade.date}</TableCell>
                  <TableCell className="font-medium text-foreground">{trade.symbol}</TableCell>
                  <TableCell>
                    <span
                      className={cn(
                        "text-xs font-medium px-2 py-0.5 rounded",
                        trade.type === "BUY"
                          ? "bg-status-safe/10 text-status-safe"
                          : "bg-status-danger/10 text-status-danger"
                      )}
                    >
                      {trade.type}
                    </span>
                  </TableCell>
                  <TableCell className="text-foreground">{trade.entry}</TableCell>
                  <TableCell className="text-foreground">{trade.exit}</TableCell>
                  <TableCell
                    className={cn(
                      "text-right font-medium",
                      trade.profit >= 0 ? "text-status-safe" : "text-status-danger"
                    )}
                  >
                    {trade.profit >= 0 ? "+" : ""}${trade.profit}
                  </TableCell>
                  <TableCell
                    className={cn(
                      "text-right",
                      trade.rr >= 0 ? "text-status-safe" : "text-status-danger"
                    )}
                  >
                    {trade.rr >= 0 ? "+" : ""}{trade.rr.toFixed(1)}R
                  </TableCell>
                  <TableCell className="text-center">
                    {trade.status === "win" ? (
                      <TrendingUp className="w-4 h-4 text-status-safe mx-auto" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-status-danger mx-auto" />
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}

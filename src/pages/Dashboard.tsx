import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatusIndicator } from "@/components/dashboard/StatusIndicator";
import { StatCard } from "@/components/dashboard/StatCard";
import { AccountCard } from "@/components/dashboard/AccountCard";
import { EquityChart } from "@/components/dashboard/EquityChart";
import { ProgressBar } from "@/components/dashboard/ProgressBar";
import { motion } from "framer-motion";
import { Target, TrendingUp, BarChart3, Clock, Zap } from "lucide-react";

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex flex-col lg:flex-row lg:items-center justify-between gap-4"
        >
          <div>
            <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground">
              Monitor your trading performance and risk status
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>Last updated: Just now</span>
          </div>
        </motion.div>

        {/* Status Indicator */}
        <StatusIndicator
          status="safe" // safe / warning / danger
          message="All risk parameters within limits"
        />

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Win Rate"
            value="68.5%"
            icon={Target}
            trend={{ value: 2.3, positive: true }}
          />
          <StatCard
            title="Average RR"
            value="1.85"
            icon={TrendingUp}
            trend={{ value: 0.15, positive: true }}
          />
          <StatCard
            title="Total Trades"
            value="124"
            subtitle="This month"
            icon={BarChart3}
          />
          <StatCard
            title="Profit Factor"
            value="2.14"
            icon={Zap}
            trend={{ value: 0.3, positive: true }}
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Account Card */}
          <div className="lg:col-span-1">
            <AccountCard
              balance={101250}
              equity={101380}
              dailyLoss={{ used: 1250, max: 5000 }}
              drawdown={{ remaining: 8750, max: 10000 }}
            />
          </div>

          {/* Equity Chart */}
          <div className="lg:col-span-2">
            <EquityChart />
          </div>
        </div>

        {/* Evaluation Progress */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-6 space-y-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-foreground">
                Evaluation Progress
              </h3>
              <p className="text-muted-foreground text-sm">
                FTMO Challenge - Phase 1
              </p>
            </div>
            <span className="px-3 py-1 rounded-full bg-safe/10 text-safe text-sm font-medium">
              Day 12 of 30
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ProgressBar
              label="Profit Target"
              current={8125}
              max={10000}
              unit="$"
              variant="safe"
            />
            <ProgressBar
              label="Min Trading Days"
              current={8}
              max={10}
              variant="safe"
            />
            <ProgressBar
              label="Time Remaining"
              current={18}
              max={30}
              unit=" days"
              showPercentage={false}
              variant="safe"
            />
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}

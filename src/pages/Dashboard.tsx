import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatusIndicator } from "@/components/dashboard/StatusIndicator";
import { StatCard } from "@/components/dashboard/StatCard";
import { AccountCard } from "@/components/dashboard/AccountCard";
import { EquityChartV2 as EquityChart } from "@/components/dashboard/EquityChartV2";
import { ProgressBar } from "@/components/dashboard/ProgressBar";
import { motion } from "framer-motion";
import { Target, TrendingUp, BarChart3, Clock, Zap, AlertTriangle, Shield, AlertOctagon, LayoutDashboard, Bell, FileText } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { ApiService } from "@/services/api";
import { Button } from "@/components/ui/button";
import { TradesTable } from "@/components/dashboard/TradesTable";
import { ConnectAccountModal } from "@/components/dashboard/ConnectAccountModal";
import { Badge } from "@/components/ui/badge";
import { ConfidenceIndicator } from "@/components/dashboard/ConfidenceIndicator";
import { RiskBanner } from "@/components/dashboard/RiskBanner";
import { BehavioralInsights } from "@/components/dashboard/BehavioralInsights";
import { OnboardingChecklist } from "@/components/dashboard/OnboardingChecklist";
import { EmptyState } from "@/components/shared/EmptyState";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import { DashboardSkeleton } from "@/components/dashboard/DashboardSkeleton";

export default function Dashboard() {
  const navigate = useNavigate();
  const [hasGeneratedReport, setHasGeneratedReport] = useState(false);

  useEffect(() => {
    const reportDownloaded = localStorage.getItem('has_downloaded_report') === 'true';
    if (reportDownloaded) setHasGeneratedReport(true);
  }, []);

  const { data, isLoading, error } = useQuery({
    queryKey: ['dashboard-overview'],
    queryFn: ApiService.getOverview,
    refetchInterval: 5000,
  });

  const { data: trades = [] } = useQuery({
    queryKey: ['dashboard-trades'],
    queryFn: ApiService.getTrades,
    refetchInterval: 5000,
  });

  if (isLoading || (!data && !error)) {
    return <DashboardSkeleton />;
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
          <div className="p-4 bg-status-danger/10 border border-status-danger/20 rounded-xl text-status-danger text-center">
            <h3 className="font-bold">Dashboard Error</h3>
            <p className="text-sm">Failed to fetch data. Please check your connection or broker settings.</p>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-accent-primary text-black font-bold rounded-lg hover:bg-opacity-80"
          >
            Retry
          </button>
        </div>
      </DashboardLayout>
    );
  }

  const { account, risk, daily_stats, connection_status, sync_status, onboarding } = data;

  const isMock = account?.platform === 'error' || account?.login === 12345678;

  const checklistItems = [
    {
      id: "connect",
      title: "Connect Account",
      description: "Link your MT4/MT5 broker account via MetaApi.",
      isCompleted: !isMock,
      icon: <LayoutDashboard className="w-5 h-5" />
    },
    {
      id: "preset",
      title: "Choose Preset",
      description: "Select a risk profile for your prop firm challenge.",
      isCompleted: onboarding.has_preset,
      icon: <Shield className="w-5 h-5" />
    },
    {
      id: "alerts",
      title: "Enable Alerts",
      description: "Get real-time risk warnings on Telegram.",
      isCompleted: onboarding.has_alerts,
      icon: <Bell className="w-5 h-5" />
    },
    {
      id: "report",
      title: "Generate Report",
      description: "Download your first official compliance report.",
      isCompleted: onboarding.has_report || hasGeneratedReport,
      icon: <FileText className="w-5 h-5" />
    }
  ];

  const handleChecklistClick = (id: string) => {
    switch (id) {
      case 'connect': navigate('/settings'); break;
      case 'preset': navigate('/settings'); break;
      case 'alerts': navigate('/settings'); break;
      case 'report': navigate('/portfolio'); break;
    }
  };

  const isFullyOnboarded = checklistItems.every(i => i.isCompleted);

  return (
    <DashboardLayout>
      <div className="space-y-6 relative">
        {/* Onboarding Checklist for new users */}
        {!isFullyOnboarded && (
          <OnboardingChecklist
            items={checklistItems}
            onItemClick={handleChecklistClick}
          />
        )}

        {/* Empty State when no account is connected */}
        {isMock && (
          <EmptyState
            title="No Broker Account Connected"
            description="You are currently viewing simulated data. Connect your real MT4/MT5 account to start real-time risk monitoring."
            icon={LayoutDashboard}
            actionLabel="Connect Account Now"
            onAction={() => navigate('/settings')}
            className="mb-6"
          />
        )}

        {/* Risk Status Banner */}
        <RiskBanner
          status={risk.status as any}
          violations={risk.violations || []}
        />

        {/* Breach / Locked Overlay */}
        {risk.status === 'breach' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-xl flex items-center justify-center p-4 cursor-not-allowed"
          >
            <div className="max-w-md w-full glass-card p-10 text-center border-status-danger/30 shadow-2xl shadow-status-danger/10">
              <div className="w-20 h-20 rounded-2xl bg-status-danger/20 flex items-center justify-center mx-auto mb-6">
                <AlertOctagon className="w-10 h-10 text-status-danger" />
              </div>
              <h2 className="text-3xl font-bold text-foreground mb-4">Account Locked</h2>
              <p className="text-muted-foreground mb-8 text-lg">
                One or more risk rules have been breached. Trading operations are currently restricted to protect remaining capital.
              </p>

              <div className="bg-status-danger/5 rounded-2xl p-6 mb-8 text-left space-y-4 border border-status-danger/10">
                <h4 className="text-sm font-bold text-status-danger uppercase tracking-wider">Violations Detected</h4>
                <div className="space-y-2">
                  {risk.violations.map((v, i) => (
                    <div key={i} className="flex items-start gap-2 text-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-status-danger mt-1.5" />
                      <span>{v}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-sm text-muted-foreground italic">
                  Acknowledgment required to dismiss this notification (Read-only access only).
                </p>
                <Button
                  variant="hero"
                  className="w-full h-12 text-lg shadow-xl shadow-primary/20"
                  onClick={() => {
                    window.location.reload();
                  }}
                >
                  I Acknowledge the Breach
                </Button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Connection Status Overlay */}
        {connection_status === 'error' && (
          <div className="absolute inset-0 z-50 bg-background/60 backdrop-blur-md flex items-center justify-center rounded-2xl">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="glass-card p-10 border-status-danger text-center space-y-4 max-w-md shadow-[0_0_50px_rgba(var(--status-danger),0.3)]"
            >
              <AlertTriangle className="w-16 h-16 text-status-danger mx-auto animate-pulse" />
              <h2 className="text-2xl font-bold text-foreground">DATA PAUSED</h2>
              <p className="text-muted-foreground">
                We lost connection to your broker. Risk monitoring is frozen to prevent unauthorized trading while offline.
              </p>
              <Button variant="hero" onClick={() => window.location.reload()}>
                Retry Connection
              </Button>
            </motion.div>
          </div>
        )}

        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex flex-col lg:flex-row lg:items-center justify-between gap-4"
        >
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
              {isMock && (
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-status-warning/10 text-status-warning text-[10px] font-bold tracking-widest uppercase rounded-full border border-status-warning/20">
                    Simulation Mode
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={async () => {
                      const newMode = (sync_status as any).demo_mode !== true;
                      await ApiService.toggleDemoMode(newMode);
                      window.location.reload();
                    }}
                    className="h-7 px-2 text-[10px] bg-white/5 hover:bg-primary/20 hover:text-primary transition-all"
                  >
                    {(sync_status as any).demo_mode ? "Disable Risk Demo" : "Simulate Risk Warning"}
                  </Button>
                </div>
              )}
            </div>
            <p className="text-muted-foreground">
              Monitor your trading performance and risk status
            </p>
          </div>
          <div className="flex items-center gap-4">
            <ConfidenceIndicator
              status={sync_status?.status || 'PAUSED'}
              lastSync={sync_status?.last_sync}
              latencyMs={sync_status?.latency_ms || 0}
            />
          </div>
        </motion.div>

        {/* Status Indicator */}
        <StatusIndicator
          status={risk.status as "safe" | "warning" | "critical" | "breach"}
          message={risk.violations.length > 0 ? risk.violations[0] : "All risk parameters within limits"}
        />

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Daily P/L"
            value={`$${(daily_stats?.daily_profit || 0).toFixed(2)}`}
            icon={TrendingUp}
            trend={{
              value: Math.abs((daily_stats?.daily_profit || 0) / 1000),
              positive: (daily_stats?.daily_profit || 0) >= 0
            }}
          />
          <StatCard
            title="Daily Buffer"
            value={`$${risk.metrics.buffer.toLocaleString()}`}
            subtitle={`${Math.round(risk.metrics.buffer_pct)}% remaining`}
            icon={Shield}
            className="border-accent-primary/20"
          />
          <StatCard
            title="Equity Drawdown"
            value={`$${risk.metrics.overall_drawdown.toLocaleString()}`}
            subtitle={`${Math.round((risk.metrics.overall_drawdown / risk.metrics.overall_limit) * 100)}% of max`}
            icon={BarChart3}
            className={risk.metrics.overall_drawdown > 0 ? "border-status-warning/20" : ""}
          />
          <StatCard
            title="Breach Estimate"
            value={risk.metrics.trades_to_breach > 10 ? ">10 trades" : `${risk.metrics.trades_to_breach} trades`}
            subtitle="Based on current pnl velocity"
            icon={Zap}
            className={risk.metrics.trades_to_breach < 3 ? "border-status-danger/40 shadow-[0_0_15px_rgba(239,68,68,0.1)]" : "border-status-safe/20"}
          />
        </div>

        {/* Behavioral Intelligence Section */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-6"
        >
          <BehavioralInsights intelligence={data.intelligence} />
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Account Card */}
          <div className="lg:col-span-1">
            <AccountCard
              balance={account.balance}
              equity={account.equity}
              dailyLoss={{
                used: Math.abs(Math.min(0, daily_stats.daily_profit)),
                max: risk.metrics.daily_limit
              }}
              drawdown={{
                remaining: risk.metrics.overall_limit - risk.metrics.overall_drawdown,
                max: risk.metrics.overall_limit
              }}
            />
          </div>

          {/* Equity Chart */}
          <div className="lg:col-span-2">
            <EquityChart />
          </div>
        </div>

        {/* Trades Table */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <TradesTable trades={trades} />
        </motion.div>

        {/* Evaluation Progress */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-6 space-y-6"
        >
          {/* ... existing progress bars ... */}
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-foreground">
                Evaluation Progress
              </h3>
              <p className="text-muted-foreground text-sm">
                FTMO Challenge - Phase 1 (Simulated)
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ProgressBar
              label="Profit Target"
              current={account?.profit || 0}
              max={10000}
              unit="$"
              variant="safe"
            />
            <ProgressBar
              label="Daily Loss Limit"
              current={Math.abs(Math.min(0, daily_stats?.daily_profit || 0))}
              max={risk?.metrics?.daily_limit || 1}
              variant={risk?.status === 'breach' ? 'danger' : 'safe'}
              unit="$"
            />
            <ProgressBar
              label="Max Drawdown"
              current={risk?.metrics?.overall_drawdown || 0}
              max={risk?.metrics?.overall_limit || 1}
              unit="$"
              variant="safe"
            />
          </div>
        </motion.div>
      </div>
    </DashboardLayout >
  );
}

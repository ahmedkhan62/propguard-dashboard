import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Bell, AlertTriangle, Clock, TrendingDown, Zap, CheckCircle, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

const alerts = [
  {
    id: 1,
    type: "warning",
    title: "Approaching Daily Loss Limit",
    message: "You've used 75% of your daily loss limit. Consider reducing position size.",
    time: "2 mins ago",
    active: true,
    dismissed: false,
  },
  {
    id: 2,
    type: "info",
    title: "Loss Streak Detected",
    message: "You've had 3 consecutive losing trades. Take a break and review your strategy.",
    time: "15 mins ago",
    active: true,
    dismissed: false,
  },
  {
    id: 3,
    type: "success",
    title: "Daily Target Reached",
    message: "Congratulations! You've hit your daily profit target.",
    time: "1 hour ago",
    active: false,
    dismissed: false,
  },
  {
    id: 4,
    type: "danger",
    title: "Overtrading Alert",
    message: "You've exceeded your recommended daily trade count. Trading locked.",
    time: "2 hours ago",
    active: false,
    dismissed: false,
  },
];

const disciplineStatus = {
  cooldownActive: false,
  cooldownRemaining: 0,
  tradesToday: 8,
  maxTrades: 10,
  lossStreak: 2,
  maxLossStreak: 5,
};

const filters = ["all", "active", "inactive"];

export default function Alerts() {
  const [filter, setFilter] = useState("all");

  const filteredAlerts = alerts.filter(a => {
    if (filter === "all") return !a.dismissed;
    if (filter === "active") return a.active && !a.dismissed;
    if (filter === "inactive") return !a.active && !a.dismissed;
    return true;
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
          <h1 className="text-3xl font-bold text-foreground mb-2">Alerts & Discipline</h1>
          <p className="text-muted-foreground">Stay disciplined with real-time trading alerts</p>
        </motion.div>

        {/* Filter Buttons */}
        <div className="flex gap-2">
          {filters.map(f => (
            <Button
              key={f}
              variant={filter === f ? "default" : "outline"} // ✅ Fixed variant
              size="sm"
              onClick={() => setFilter(f)}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Alerts List */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Recent Alerts</h3>
            {filteredAlerts.map((alert, index) => (
              <motion.div
                key={alert.id}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className={cn(
                  "glass-card p-4 flex gap-4",
                  !alert.active && "opacity-60"
                )}
              >
                <div
                  className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center shrink-0",
                    alert.type === "warning" && "bg-status-warning/10",
                    alert.type === "info" && "bg-primary/10",
                    alert.type === "success" && "bg-status-safe/10",
                    alert.type === "danger" && "bg-status-danger/10"
                  )}
                >
                  {alert.type === "warning" && <AlertTriangle className="w-5 h-5 text-status-warning" />}
                  {alert.type === "info" && <Bell className="w-5 h-5 text-primary" />}
                  {alert.type === "success" && <CheckCircle className="w-5 h-5 text-status-safe" />}
                  {alert.type === "danger" && <X className="w-5 h-5 text-status-danger" />}
                </div>

                <div className="flex-1">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h4 className="font-medium text-foreground">{alert.title}</h4>
                      <p className="text-sm text-muted-foreground">{alert.message}</p>
                    </div>
                    <span className="text-xs text-muted-foreground shrink-0">{alert.time}</span>
                  </div>
                </div>

                {alert.active && <div className="flex items-center"><div className="w-2 h-2 rounded-full bg-primary animate-pulse" /></div>}
              </motion.div>
            ))}
          </div>

          {/* Discipline Status */}
          <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Discipline Status</h3>

            {/* Cooldown Status */}
            <div className="glass-card p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground">Cooldown Mode</h4>
                  <p className="text-sm text-muted-foreground">
                    {disciplineStatus.cooldownActive
                      ? `Active - ${disciplineStatus.cooldownRemaining} mins remaining`
                      : "Not active"}
                  </p>
                </div>
              </div>
              {!disciplineStatus.cooldownActive && (
                <Button variant="outline" className="w-full">
                  <Clock className="w-4 h-4" />
                  Activate 30min Cooldown
                </Button>
              )}
            </div>

            {/* Trading Stats */}
            <div className="glass-card p-6 space-y-4">
              <h4 className="font-medium text-foreground">Today's Activity</h4>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Trades Today</span>
                    <span className="text-foreground font-medium">
                      {disciplineStatus.tradesToday} / {disciplineStatus.maxTrades}
                    </span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(disciplineStatus.tradesToday / disciplineStatus.maxTrades) * 100}%` }}
                      className={cn(
                        "h-full rounded-full",
                        disciplineStatus.tradesToday >= disciplineStatus.maxTrades
                          ? "bg-status-danger"
                          : disciplineStatus.tradesToday >= disciplineStatus.maxTrades * 0.8
                          ? "bg-status-warning"
                          : "bg-status-safe"
                      )}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Loss Streak</span>
                    <span className="text-foreground font-medium">
                      {disciplineStatus.lossStreak} / {disciplineStatus.maxLossStreak}
                    </span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(disciplineStatus.lossStreak / disciplineStatus.maxLossStreak) * 100}%` }}
                      className={cn(
                        "h-full rounded-full",
                        disciplineStatus.lossStreak >= disciplineStatus.maxLossStreak
                          ? "bg-status-danger"
                          : disciplineStatus.lossStreak >= 3
                          ? "bg-status-warning"
                          : "bg-status-safe"
                      )}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="glass-card p-6 space-y-3">
              <h4 className="font-medium text-foreground">Quick Actions</h4>
              <Button variant="safe" className="w-full justify-start">
                <Zap className="w-4 h-4" />
                Close All Trades
              </Button>
              <Button variant="warning" className="w-full justify-start">
                <TrendingDown className="w-4 h-4" />
                Reduce Position Size
              </Button>
              <Button variant="danger" className="w-full justify-start">
                <X className="w-4 h-4" />
                Stop Trading Today
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
}

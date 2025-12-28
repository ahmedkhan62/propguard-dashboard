// File: src/pages/NewsProtection.tsx

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Switch } from "@/components/ui/switch";
import { motion } from "framer-motion";
import { Newspaper, Clock, Globe, AlertTriangle, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const upcomingNews = [
  { time: "08:30", event: "US Non-Farm Payrolls", impact: "high", currency: "USD" },
  { time: "10:00", event: "ISM Manufacturing PMI", impact: "high", currency: "USD" },
  { time: "14:00", event: "FOMC Minutes", impact: "high", currency: "USD" },
  { time: "15:30", event: "ECB Press Conference", impact: "medium", currency: "EUR" },
];

const sessions = [
  { name: "Asian Session", time: "00:00 - 09:00 GMT", status: "closed", profit: -125 },
  { name: "London Session", time: "08:00 - 17:00 GMT", status: "active", profit: 450 },
  { name: "New York Session", time: "13:00 - 22:00 GMT", status: "upcoming", profit: 0 },
];

export default function NewsProtection() {
  const [newsBlockEnabled, setNewsBlockEnabled] = useState(true);
  const [blockDuration, setBlockDuration] = useState(30);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
          <h1 className="text-3xl font-bold text-foreground mb-2">News & Session Protection</h1>
          <p className="text-muted-foreground">
            Protect your trades from high-impact news and monitor session performance
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* News Block Settings */}
          <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="glass-card p-6 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-status-warning/10 flex items-center justify-center">
                <Newspaper className="w-5 h-5 text-status-warning" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">High-Impact News Block</h3>
                <p className="text-sm text-muted-foreground">Block trading around major events</p>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 rounded-xl bg-secondary/50 border border-border/50">
              <div className="space-y-1">
                <div className="font-medium text-foreground">Enable News Protection</div>
                <p className="text-sm text-muted-foreground">
                  Automatically block trading before and after high-impact news
                </p>
              </div>
              <Switch checked={newsBlockEnabled} onCheckedChange={setNewsBlockEnabled} />
            </div>

            <div className="space-y-3">
              <label className="text-sm font-medium text-foreground">
                Block Duration: {blockDuration} minutes before & after
              </label>
              <div className="flex gap-2">
                {[15, 30, 45, 60].map((mins) => (
                  <button
                    key={mins}
                    onClick={() => setBlockDuration(mins)}
                    className={cn(
                      "flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all",
                      blockDuration === mins
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {mins}m
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Upcoming News */}
          <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="glass-card p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-foreground">Upcoming High-Impact News</h3>
              <span className="text-sm text-muted-foreground">Today</span>
            </div>

            <div className="space-y-3">
              {upcomingNews.map((news, index) => (
                <motion.div
                  key={index}
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className={cn(
                    "flex items-center justify-between p-3 rounded-lg border",
                    news.impact === "high"
                      ? "bg-status-danger/5 border-status-danger/20"
                      : "bg-status-warning/5 border-status-warning/20"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm font-medium text-foreground">{news.time}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{news.event}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-muted-foreground">{news.currency}</span>
                    <span
                      className={cn(
                        "text-xs font-medium px-2 py-0.5 rounded-full",
                        news.impact === "high"
                          ? "bg-status-danger/10 text-status-danger"
                          : "bg-status-warning/10 text-status-warning"
                      )}
                    >
                      {news.impact.toUpperCase()}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

            {newsBlockEnabled && (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-status-safe/10 border border-status-safe/20 text-status-safe text-sm">
                <AlertTriangle className="w-4 h-4" />
                Trading will be blocked {blockDuration} mins before each event
              </div>
            )}
          </motion.div>

          {/* Trading Sessions */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="glass-card p-6 space-y-4 lg:col-span-2"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Globe className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Trading Sessions</h3>
                <p className="text-sm text-muted-foreground">Monitor performance by session</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {sessions.map((session, index) => (
                <motion.div
                  key={session.name}
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className={cn(
                    "p-4 rounded-xl border",
                    session.status === "active"
                      ? "bg-primary/5 border-primary/30"
                      : "bg-secondary/50 border-border/50"
                  )}
                >
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-foreground">{session.name}</h4>
                    <span
                      className={cn(
                        "text-xs font-medium px-2 py-0.5 rounded-full",
                        session.status === "active"
                          ? "bg-status-safe/10 text-status-safe"
                          : session.status === "closed"
                          ? "bg-muted text-muted-foreground"
                          : "bg-primary/10 text-primary"
                      )}
                    >
                      {session.status.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{session.time}</p>
                  <div className="flex items-center gap-2">
                    {session.profit > 0 ? (
                      <TrendingUp className="w-4 h-4 text-status-safe" />
                    ) : session.profit < 0 ? (
                      <TrendingDown className="w-4 h-4 text-status-danger" />
                    ) : (
                      <Minus className="w-4 h-4 text-muted-foreground" />
                    )}
                    <span
                      className={cn(
                        "font-medium",
                        session.profit > 0
                          ? "text-status-safe"
                          : session.profit < 0
                          ? "text-status-danger"
                          : "text-muted-foreground"
                      )}
                    >
                      {session.profit > 0 ? "+" : ""}${session.profit}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
}

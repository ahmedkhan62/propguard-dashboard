import { motion } from "framer-motion";
import { Wallet, TrendingUp, TrendingDown, Activity } from "lucide-react";
import { ProgressBar } from "./ProgressBar";

interface AccountCardProps {
  balance: number;
  equity: number;
  dailyLoss: { used: number; max: number };
  drawdown: { remaining: number; max: number };
}

export function AccountCard({ balance, equity, dailyLoss, drawdown }: AccountCardProps) {
  const dailyLossPercent = (dailyLoss.used / dailyLoss.max) * 100;
  const drawdownPercent = ((drawdown.max - drawdown.remaining) / drawdown.max) * 100;

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="glass-card p-6 space-y-6"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Account Overview</h3>
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
          <Wallet className="w-5 h-5 text-primary" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <Activity className="w-4 h-4" />
            Balance
          </div>
          <p className="text-2xl font-bold text-foreground">
            ${balance.toLocaleString()}
          </p>
        </div>
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <TrendingUp className="w-4 h-4" />
            Equity
          </div>
          <p className="text-2xl font-bold text-foreground">
            ${equity.toLocaleString()}
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <ProgressBar
          label="Daily Loss Used"
          current={dailyLoss.used}
          max={dailyLoss.max}
          unit="$"
          variant={dailyLossPercent > 70 ? "danger" : dailyLossPercent > 50 ? "warning" : "safe"}
        />
        <ProgressBar
          label="Remaining Drawdown"
          current={drawdown.remaining}
          max={drawdown.max}
          unit="$"
          variant={drawdownPercent > 70 ? "danger" : drawdownPercent > 50 ? "warning" : "safe"}
        />
      </div>
    </motion.div>
  );
}

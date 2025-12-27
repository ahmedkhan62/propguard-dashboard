import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { motion } from "framer-motion";
import { Shield, DollarSign, Percent, BarChart2, AlertTriangle, Lock, Save } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function RiskManagement() {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    dailyLossAmount: "5000",
    dailyLossPercent: "5",
    maxLossAmount: "10000",
    maxLossPercent: "10",
    maxLotSize: "1.0",
    maxTradesPerDay: "10",
    autoCloseTrades: true,
    tradingLock: true,
  });

  const handleSave = () => {
    toast({
      title: "Settings Saved",
      description: "Your risk management rules have been applied successfully.",
    });
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
            <h1 className="text-3xl font-bold text-foreground mb-2">Risk Management</h1>
            <p className="text-muted-foreground">
              Configure your trading limits and protection rules
            </p>
          </div>
          <Button variant="hero" onClick={handleSave}>
            <Save className="w-4 h-4" />
            Save Settings
          </Button>
        </motion.div>

        {/* Warning Banner */}
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="glass-card p-4 border-status-warning/30 bg-status-warning/5"
        >
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-status-warning shrink-0" />
            <p className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">Important:</span> Changes to risk rules take effect immediately. Make sure your settings match your prop firm requirements.
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Loss Limits */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="glass-card p-6 space-y-6"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-destructive/10 flex items-center justify-center">
                <Shield className="w-5 h-5 text-destructive" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Loss Limits</h3>
                <p className="text-sm text-muted-foreground">Set your maximum loss thresholds</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-muted-foreground" />
                    Max Daily Loss ($)
                  </Label>
                  <Input
                    type="number"
                    value={settings.dailyLossAmount}
                    onChange={(e) => setSettings({ ...settings, dailyLossAmount: e.target.value })}
                    className="bg-secondary border-border"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Percent className="w-4 h-4 text-muted-foreground" />
                    Max Daily Loss (%)
                  </Label>
                  <Input
                    type="number"
                    value={settings.dailyLossPercent}
                    onChange={(e) => setSettings({ ...settings, dailyLossPercent: e.target.value })}
                    className="bg-secondary border-border"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-muted-foreground" />
                    Max Overall Loss ($)
                  </Label>
                  <Input
                    type="number"
                    value={settings.maxLossAmount}
                    onChange={(e) => setSettings({ ...settings, maxLossAmount: e.target.value })}
                    className="bg-secondary border-border"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Percent className="w-4 h-4 text-muted-foreground" />
                    Max Overall Loss (%)
                  </Label>
                  <Input
                    type="number"
                    value={settings.maxLossPercent}
                    onChange={(e) => setSettings({ ...settings, maxLossPercent: e.target.value })}
                    className="bg-secondary border-border"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Trade Limits */}
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="glass-card p-6 space-y-6"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <BarChart2 className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Trade Limits</h3>
                <p className="text-sm text-muted-foreground">Control your trading volume</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Max Lot Size</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={settings.maxLotSize}
                  onChange={(e) => setSettings({ ...settings, maxLotSize: e.target.value })}
                  className="bg-secondary border-border"
                />
                <p className="text-xs text-muted-foreground">
                  Maximum position size per trade
                </p>
              </div>

              <div className="space-y-2">
                <Label>Max Trades Per Day</Label>
                <Input
                  type="number"
                  value={settings.maxTradesPerDay}
                  onChange={(e) => setSettings({ ...settings, maxTradesPerDay: e.target.value })}
                  className="bg-secondary border-border"
                />
                <p className="text-xs text-muted-foreground">
                  Prevents overtrading and revenge trading
                </p>
              </div>
            </div>
          </motion.div>

          {/* Auto Protection */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="glass-card p-6 space-y-6 lg:col-span-2"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-status-safe/10 flex items-center justify-center">
                <Lock className="w-5 h-5 text-status-safe" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Automatic Protection</h3>
                <p className="text-sm text-muted-foreground">Enable automatic safety features</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center justify-between p-4 rounded-xl bg-secondary/50 border border-border/50">
                <div className="space-y-1">
                  <div className="font-medium text-foreground">Auto Close Trades</div>
                  <p className="text-sm text-muted-foreground">
                    Automatically close all trades when limits are hit
                  </p>
                </div>
                <Switch
                  checked={settings.autoCloseTrades}
                  onCheckedChange={(checked) =>
                    setSettings({ ...settings, autoCloseTrades: checked })
                  }
                />
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl bg-secondary/50 border border-border/50">
                <div className="space-y-1">
                  <div className="font-medium text-foreground">Trading Lock</div>
                  <p className="text-sm text-muted-foreground">
                    Block new trades after hitting limits
                  </p>
                </div>
                <Switch
                  checked={settings.tradingLock}
                  onCheckedChange={(checked) =>
                    setSettings({ ...settings, tradingLock: checked })
                  }
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
}

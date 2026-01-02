import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { motion } from "framer-motion";
import { User, Link2, Shield, Bell, LogOut, CheckCircle, AlertCircle } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ApiService } from "@/services/api";
import { ConnectAccountModal } from "@/components/dashboard/ConnectAccountModal";
import { RiskSettings } from "@/components/dashboard/RiskSettings";
import { AuditLogs } from "@/components/dashboard/AuditLogs";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/context/AuthContext";
import { UpgradeModal } from "@/components/shared/UpgradeModal";

export default function Settings() {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [modalOpen, setModalOpen] = useState(false);
  const [upgradeModalOpen, setUpgradeModalOpen] = useState(false);
  const [profile, setProfile] = useState({
    name: "John Trader",
    email: "john@example.com",
  });
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
  });

  const { data: accounts = [], isLoading: accountsLoading } = useQuery({
    queryKey: ['brokers'],
    queryFn: ApiService.getBrokers,
  });

  const { data: auditLogs = [] } = useQuery({
    queryKey: ['audit-logs'],
    queryFn: ApiService.getAuditLogs,
    refetchInterval: 5000,
  });

  const handleSave = () => {
    toast({
      title: "Settings Saved",
      description: "Your preferences have been updated.",
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <h1 className="text-3xl font-bold text-foreground mb-2">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account and preferences
          </p>
        </motion.div>

        {/* Profile Settings */}
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="glass-card p-6 space-y-6"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <User className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Profile Settings</h3>
              <p className="text-sm text-muted-foreground">Update your personal information</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Full Name</Label>
              <Input
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className="bg-secondary border-border"
              />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                className="bg-secondary border-border"
              />
            </div>
          </div>

          <Button variant="hero" onClick={handleSave}>
            Save Changes
          </Button>
        </motion.div>

        {/* Trading Account */}
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-6 space-y-6"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-status-safe/10 flex items-center justify-center">
              <Link2 className="w-5 h-5 text-status-safe" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Trading Account</h3>
              <p className="text-sm text-muted-foreground">Manage your broker connection</p>
            </div>
          </div>

          <div className="space-y-4">
            {accountsLoading ? (
              <div className="h-20 animate-pulse bg-secondary/50 rounded-xl" />
            ) : accounts.length > 0 ? (
              accounts.map((acc: any) => (
                <div key={acc.id} className="space-y-4">
                  <div className="p-4 rounded-xl bg-secondary/50 border border-border/50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-background flex items-center justify-center">
                          <span className="font-bold text-foreground">{acc.platform.toUpperCase()}</span>
                        </div>
                        <div>
                          <div className="font-medium text-foreground">{acc.name || (acc.platform === 'mt5' ? 'MetaTrader 5' : 'MetaTrader 4')}</div>
                          <div className="text-sm text-muted-foreground">
                            Account: {acc.account_id} • {acc.provider}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {acc.connection_status === 'connected' ? (
                          <>
                            <CheckCircle className="w-4 h-4 text-status-safe" />
                            <span className="text-sm text-status-safe">Connected</span>
                          </>
                        ) : (
                          <>
                            <AlertCircle className="w-4 h-4 text-status-danger" />
                            <span className="text-sm text-status-danger">Disconnected</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {acc.is_active && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="mt-4"
                    >
                      <RiskSettings account={acc} />
                    </motion.div>
                  )}
                </div>
              ))
            ) : (
              <div className="p-8 border-2 border-dashed border-border rounded-2xl text-center space-y-2">
                <p className="text-muted-foreground">No trading accounts connected yet.</p>
                <p className="text-xs text-muted-foreground/60">Connect an account to start real-time monitoring.</p>
              </div>
            )}
          </div>

          <Button
            variant="outline"
            onClick={() => {
              if (user?.subscription_tier === 'free' && accounts.length >= (user?.max_accounts_limit || 1)) {
                setUpgradeModalOpen(true);
              } else {
                setModalOpen(true);
              }
            }}
          >
            Connect Another Account
          </Button>

          <ConnectAccountModal
            open={modalOpen}
            onOpenChange={setModalOpen}
            onSuccess={() => queryClient.invalidateQueries({ queryKey: ['brokers'] })}
          />

          <UpgradeModal
            isOpen={upgradeModalOpen}
            onClose={() => setUpgradeModalOpen(false)}
            feature="Unlimited Accounts"
          />
        </motion.div>

        {/* Notifications */}
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-6 space-y-6"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Bell className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Notifications</h3>
              <p className="text-sm text-muted-foreground">Manage alerts for your connected accounts</p>
            </div>
          </div>

          <div className="space-y-6">
            {accounts.length > 0 ? accounts.map((acc: any) => (
              <div key={acc.id} className="space-y-4 p-4 rounded-xl bg-secondary/5 border border-border">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline">{acc.name || acc.platform}</Badge>
                  <span className="text-xs text-muted-foreground">#{acc.account_id}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-foreground">Email Alerts</div>
                    <p className="text-sm text-muted-foreground">Receive breach notifications via {profile.email}</p>
                  </div>
                  <Switch
                    checked={acc.email_alerts_enabled}
                    onCheckedChange={async (checked) => {
                      await ApiService.updateBrokerRiskSettings(acc.id, { email_alerts_enabled: checked });
                      queryClient.invalidateQueries({ queryKey: ['brokers'] });
                    }}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="relative">
                    <div className="font-medium text-foreground flex items-center gap-2">
                      Telegram Alerts
                      {user?.subscription_tier === 'free' && (
                        <Badge variant="outline" className="text-[9px] bg-primary/10 text-primary border-primary/20">Pro</Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">Get real-time alerts via Telegram Bot</p>
                  </div>
                  <Switch
                    checked={acc.telegram_alerts_enabled}
                    disabled={user?.subscription_tier === 'free'}
                    onCheckedChange={async (checked) => {
                      await ApiService.updateBrokerRiskSettings(acc.id, { telegram_alerts_enabled: checked });
                      queryClient.invalidateQueries({ queryKey: ['brokers'] });
                    }}
                  />
                </div>

                {acc.telegram_alerts_enabled && (
                  <div className="mt-2 space-y-2">
                    <Label className="text-xs">Telegram Chat ID</Label>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Enter Chat ID"
                        defaultValue={acc.telegram_chat_id}
                        className="h-8 bg-background border-border text-xs"
                        onBlur={async (e) => {
                          if (e.target.value !== acc.telegram_chat_id) {
                            await ApiService.updateBrokerRiskSettings(acc.id, { telegram_chat_id: e.target.value });
                            queryClient.invalidateQueries({ queryKey: ['brokers'] });
                          }
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
            )) : (
              <p className="text-center text-muted-foreground text-sm py-4">No trading accounts found.</p>
            )}
          </div>
        </motion.div>

        {/* Security */}
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="glass-card p-6 space-y-6"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-status-warning/10 flex items-center justify-center">
              <Shield className="w-5 h-5 text-status-warning" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Security</h3>
              <p className="text-sm text-muted-foreground">Protect your account</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-secondary/50 border border-border/50">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-foreground">Two-Factor Authentication</div>
                <p className="text-sm text-muted-foreground">
                  Add an extra layer of security
                </p>
              </div>
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-status-warning" />
                <span className="text-sm text-status-warning">Not Enabled</span>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button variant="outline">Change Password</Button>
            <Button variant="outline">Enable 2FA</Button>
          </div>
        </motion.div>

        {/* Audit Logs */}
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="glass-card p-6"
        >
          <AuditLogs logs={auditLogs} />
        </motion.div>

        {/* Logout */}
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Button variant="danger" className="w-full md:w-auto">
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}

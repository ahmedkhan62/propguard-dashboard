import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ApiService } from "@/services/api";
import { Shield, AlertTriangle, Save, GraduationCap } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

interface RiskSettingsProps {
    account: any;
}

export const RiskSettings = ({ account }: RiskSettingsProps) => {
    const { toast } = useToast();
    const queryClient = useQueryClient();

    const [settings, setSettings] = useState({
        preset_name: account.preset_name || "",
        daily_loss_limit_pct: account.daily_loss_limit_pct || 5.0,
        max_drawdown_limit_pct: account.max_drawdown_limit_pct || 10.0,
        max_daily_trades: account.max_daily_trades || 50,
        max_lot_size: account.max_lot_size || 10.0,
        news_trading_allowed: account.news_trading_allowed ?? true,
    });

    const { data: presets = {} } = useQuery({
        queryKey: ['rule-presets'],
        queryFn: ApiService.getPresets
    });

    const handlePresetChange = (name: string) => {
        if (!name) {
            setSettings({ ...settings, preset_name: "" });
            return;
        }
        const preset = presets[name];
        if (preset) {
            setSettings({
                ...settings,
                preset_name: name,
                daily_loss_limit_pct: preset.daily_loss_limit_pct ?? settings.daily_loss_limit_pct,
                max_drawdown_limit_pct: preset.max_drawdown_limit_pct ?? settings.max_drawdown_limit_pct,
                max_daily_trades: preset.max_daily_trades ?? settings.max_daily_trades,
                max_lot_size: preset.max_lot_size ?? settings.max_lot_size,
                news_trading_allowed: preset.news_trading_allowed ?? settings.news_trading_allowed,
            });
        }
    };

    const mutation = useMutation({
        mutationFn: (data: any) => ApiService.updateBrokerRiskSettings(account.id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['brokers'] });
            toast({
                title: "Settings Saved",
                description: `Risk profile updated under ${settings.preset_name || 'Custom'} rules.`,
            });
        },
        onError: (error: any) => {
            toast({
                title: "Action Failed",
                description: error.response?.data?.detail || "Could not save risk settings.",
                variant: "destructive",
            });
        }
    });

    const handleSave = () => {
        mutation.mutate(settings);
    };

    return (
        <div className="space-y-6 bg-card/30 p-6 rounded-xl border border-white/5 backdrop-blur-sm">
            <div className="flex items-center justify-between gap-3 mb-6">
                <div className="flex items-center gap-3">
                    <Shield className="w-6 h-6 text-accent-primary" />
                    <div>
                        <h3 className="text-lg font-bold text-white uppercase tracking-tight">Risk Firewall</h3>
                        <p className="text-[10px] text-white/40 uppercase tracking-widest font-medium">Real-time Rule Enforcement</p>
                    </div>
                </div>
                {settings.preset_name && (
                    <Badge variant="outline" className="bg-accent-primary/10 text-accent-primary border-accent-primary/20 gap-1.5 px-3 py-1">
                        <GraduationCap className="w-3 h-3" />
                        {settings.preset_name} ACTIVE
                    </Badge>
                )}
            </div>

            <div className="space-y-4 mb-8">
                <Label className="text-white/60 text-xs uppercase tracking-widest">Rule Preset (Prop-Firm Ready)</Label>
                <Select value={settings.preset_name} onValueChange={handlePresetChange}>
                    <SelectTrigger className="w-full bg-black/40 border-white/10 text-white h-12">
                        <SelectValue placeholder="Select a preset (Optional)" />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-900 border-white/10 text-white">
                        <SelectItem value="">Custom / Manual</SelectItem>
                        {Object.keys(presets).map(name => (
                            <SelectItem key={name} value={name}>
                                <div className="flex flex-col items-start gap-0.5">
                                    <span className="font-bold">{name}</span>
                                    <span className="text-[10px] opacity-50">{presets[name].description}</span>
                                </div>
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                {settings.preset_name && (
                    <p className="text-[10px] text-accent-primary/60 italic">
                        * {settings.preset_name} preset has pre-filled standard limits. You can still customize them below if needed.
                    </p>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label className="text-white/60">Daily Loss Limit (%)</Label>
                    <div className="relative">
                        <Input
                            type="number"
                            step="0.1"
                            value={settings.daily_loss_limit_pct}
                            onChange={(e) => setSettings({ ...settings, daily_loss_limit_pct: parseFloat(e.target.value) })}
                            className="bg-black/40 border-white/10 text-white pl-4"
                        />
                    </div>
                    <p className="text-[10px] text-white/40 italic">Account balance based calculation</p>
                </div>

                <div className="space-y-2">
                    <Label className="text-white/60">Max Overall Drawdown (%)</Label>
                    <Input
                        type="number"
                        step="0.1"
                        value={settings.max_drawdown_limit_pct}
                        onChange={(e) => setSettings({ ...settings, max_drawdown_limit_pct: parseFloat(e.target.value) })}
                        className="bg-black/40 border-white/10 text-white"
                    />
                </div>

                <div className="space-y-2">
                    <Label className="text-white/60">Max Day Trades</Label>
                    <Input
                        type="number"
                        value={settings.max_daily_trades}
                        onChange={(e) => setSettings({ ...settings, max_daily_trades: parseInt(e.target.value) })}
                        className="bg-black/40 border-white/10 text-white"
                    />
                </div>

                <div className="space-y-2">
                    <Label className="text-white/60">Max Per-Trade Lot Size</Label>
                    <Input
                        type="number"
                        step="0.01"
                        value={settings.max_lot_size}
                        onChange={(e) => setSettings({ ...settings, max_lot_size: parseFloat(e.target.value) })}
                        className="bg-black/40 border-white/10 text-white"
                    />
                </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-accent-primary/5 rounded-lg border border-accent-primary/10">
                <div className="space-y-1">
                    <Label className="text-white">Allow News Trading</Label>
                    <p className="text-xs text-white/50">Permit trading during high-impact red folders</p>
                </div>
                <Switch
                    checked={settings.news_trading_allowed}
                    onCheckedChange={(checked) => setSettings({ ...settings, news_trading_allowed: checked })}
                />
            </div>

            {mutation.isPending ? (
                <Button disabled className="w-full bg-accent-primary/50 text-white">Saving Changes...</Button>
            ) : (
                <Button onClick={handleSave} className="w-full bg-accent-primary hover:bg-accent-secondary text-white transition-all duration-300 gap-2">
                    <Save className="w-4 h-4" /> Save Risk Profile
                </Button>
            )}

            <div className="flex items-start gap-2 p-3 bg-status-warning/10 rounded border border-status-warning/20">
                <AlertTriangle className="w-4 h-4 text-status-warning shrink-0 mt-0.5" />
                <p className="text-[11px] text-status-warning leading-relaxed uppercase tracking-wider font-medium">
                    Note: Changes are effective immediately and logged for compliance auditing.
                </p>
            </div>
        </div>
    );
};

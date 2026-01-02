import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Target, Plus, Trash2, TrendingUp, DollarSign, Hash, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ApiService } from "@/services/api";
import { toast } from "sonner";

interface TradingGoal {
    id: number;
    goal_type: string;
    threshold_value: number;
    threshold_unit: string | null;
    is_active: boolean;
    created_at: string;
}

const goalTemplates = [
    {
        type: "daily_loss_target",
        label: "Daily Loss Target",
        icon: DollarSign,
        description: "Track your daily loss limit for awareness",
        unit: "USD",
        defaultValue: 500,
    },
    {
        type: "max_trades_per_day",
        label: "Max Trades Per Day",
        icon: Hash,
        description: "Monitor your trading frequency",
        unit: "count",
        defaultValue: 5,
    },
    {
        type: "weekly_profit_target",
        label: "Weekly Profit Target",
        icon: TrendingUp,
        description: "Set and track your weekly profit goals",
        unit: "USD",
        defaultValue: 1000,
    },
    {
        type: "max_position_size",
        label: "Max Position Size",
        icon: Target,
        description: "Monitor your position sizing discipline",
        unit: "lots",
        defaultValue: 0.5,
    },
];

export default function GoalsManager() {
    const [goals, setGoals] = useState<TradingGoal[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
    const [customValue, setCustomValue] = useState<number>(0);

    useEffect(() => {
        fetchGoals();
    }, []);

    const fetchGoals = async () => {
        try {
            const response = await ApiService.get("/insights/goals");
            setGoals(response);
        } catch (error) {
            toast.error("Failed to load goals");
        } finally {
            setLoading(false);
        }
    };

    const createGoal = async () => {
        if (!selectedTemplate || customValue <= 0) {
            toast.error("Please select a goal and enter a valid value");
            return;
        }

        const template = goalTemplates.find(t => t.type === selectedTemplate);
        if (!template) return;

        try {
            await ApiService.post("/insights/goals", {
                goal_type: selectedTemplate,
                threshold_value: customValue,
                threshold_unit: template.unit,
            });

            toast.success("Goal created successfully");
            setSelectedTemplate(null);
            setCustomValue(0);
            fetchGoals();
        } catch (error) {
            toast.error("Failed to create goal");
        }
    };

    const deleteGoal = async (goalId: number) => {
        try {
            await ApiService.delete(`/insights/goals/${goalId}`);
            toast.success("Goal removed");
            fetchGoals();
        } catch (error) {
            toast.error("Failed to delete goal");
        }
    };

    const getGoalTemplate = (type: string) => {
        return goalTemplates.find(t => t.type === type);
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-6xl">
            {/* Header */}
            <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Target className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-black text-foreground">Trading Goals Manager</h1>
                        <p className="text-muted-foreground">Set targets to track and monitor your progress</p>
                    </div>
                </div>

                <div className="glass-card p-4 border-primary/20 bg-primary/5">
                    <div className="flex items-start gap-3">
                        <Eye className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                        <div className="text-sm">
                            <p className="font-bold text-foreground mb-1">Goals are for Awareness</p>
                            <p className="text-muted-foreground">
                                These goals help you track your performance and stay aware of your targets. <strong>You remain in full control</strong> of all trading decisions. Goals provide insights, not restrictions.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Create New Goal */}
            <div className="glass-card p-6 mb-8">
                <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                    <Plus className="w-5 h-5 text-primary" />
                    Create New Goal
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    {goalTemplates.map((template) => {
                        const Icon = template.icon;
                        const isSelected = selectedTemplate === template.type;

                        return (
                            <motion.button
                                key={template.type}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => {
                                    setSelectedTemplate(template.type);
                                    setCustomValue(template.defaultValue);
                                }}
                                className={`
                                    p-4 rounded-xl border-2 text-left transition-all
                                    ${isSelected
                                        ? "border-primary bg-primary/10"
                                        : "border-border/50 hover:border-primary/50 bg-background/50"
                                    }
                                `}
                            >
                                <div className="flex items-start gap-3">
                                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${isSelected ? "bg-primary/20" : "bg-muted"}`}>
                                        <Icon className={`w-5 h-5 ${isSelected ? "text-primary" : "text-muted-foreground"}`} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-foreground mb-1">{template.label}</h3>
                                        <p className="text-xs text-muted-foreground">{template.description}</p>
                                    </div>
                                </div>
                            </motion.button>
                        );
                    })}
                </div>

                {selectedTemplate && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-4"
                    >
                        <div>
                            <label className="block text-sm font-bold text-foreground mb-2">
                                Target Value ({goalTemplates.find(t => t.type === selectedTemplate)?.unit})
                            </label>
                            <input
                                type="number"
                                value={customValue}
                                onChange={(e) => setCustomValue(Number(e.target.value))}
                                className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary focus:outline-none text-foreground"
                                placeholder="Enter value"
                            />
                        </div>
                        <Button onClick={createGoal} variant="hero" className="w-full h-12">
                            Create Goal
                        </Button>
                    </motion.div>
                )}
            </div>

            {/* Active Goals */}
            <div className="glass-card p-6">
                <h2 className="text-xl font-bold text-foreground mb-6">Active Goals</h2>

                {loading ? (
                    <div className="text-center py-12 text-muted-foreground">Loading goals...</div>
                ) : goals.length === 0 ? (
                    <div className="text-center py-12">
                        <Target className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground">No active goals. Create one to start tracking your progress.</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {goals.map((goal) => {
                            const template = getGoalTemplate(goal.goal_type);
                            if (!template) return null;

                            const Icon = template.icon;

                            return (
                                <motion.div
                                    key={goal.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="flex items-center justify-between p-4 rounded-xl bg-background border border-border/50 hover:border-primary/30 transition-all"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                            <Icon className="w-5 h-5 text-primary" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-foreground">{template.label}</h3>
                                            <p className="text-sm text-muted-foreground">
                                                Target: <span className="font-mono text-primary">{goal.threshold_value} {goal.threshold_unit}</span>
                                            </p>
                                        </div>
                                    </div>
                                    <Button
                                        onClick={() => deleteGoal(goal.id)}
                                        variant="ghost"
                                        size="sm"
                                        className="text-red-500 hover:text-red-600 hover:bg-red-500/10"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </motion.div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Building2, CheckCircle, ChevronRight, AlertCircle } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const propFirms = [
  {
    id: "ftmo",
    name: "FTMO",
    logo: "🏆",
    description: "Most popular prop firm worldwide",
    rules: {
      dailyLoss: 5,
      maxDrawdown: 10,
      profitTarget: 10,
      minDays: 10,
      period: 30,
    },
  },
  {
    id: "fundednext",
    name: "FundedNext",
    logo: "🚀",
    description: "Fast-growing evaluation firm",
    rules: {
      dailyLoss: 5,
      maxDrawdown: 10,
      profitTarget: 10,
      minDays: 5,
      period: "Unlimited",
    },
  },
  {
    id: "the5ers",
    name: "The5%ers",
    logo: "💎",
    description: "Instant funding available",
    rules: {
      dailyLoss: 3,
      maxDrawdown: 6,
      profitTarget: 8,
      minDays: 3,
      period: "Unlimited",
    },
  },
  {
    id: "custom",
    name: "Custom",
    logo: "⚙️",
    description: "Set your own rules",
    rules: null,
  },
];

export default function PropFirmSetup() {
  const [selectedFirm, setSelectedFirm] = useState<string | null>(null);
  const [applied, setApplied] = useState(false);

  const selectedFirmData = propFirms.find((f) => f.id === selectedFirm);

  const handleApply = () => {
    setApplied(true);
    setTimeout(() => setApplied(false), 3000);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <h1 className="text-3xl font-bold text-foreground mb-2">Prop Firm Setup</h1>
          <p className="text-muted-foreground">
            Select your prop firm to auto-configure risk rules
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Firm Selection */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Select Your Prop Firm</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {propFirms.map((firm, index) => (
                <motion.button
                  key={firm.id}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setSelectedFirm(firm.id)}
                  className={cn(
                    "glass-card p-6 text-left transition-all duration-200 hover:border-primary/30",
                    selectedFirm === firm.id && "border-primary/50 bg-primary/5"
                  )}
                >
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-3xl">{firm.logo}</span>
                    {selectedFirm === firm.id && (
                      <CheckCircle className="w-5 h-5 text-primary" />
                    )}
                  </div>
                  <h4 className="font-semibold text-foreground mb-1">{firm.name}</h4>
                  <p className="text-sm text-muted-foreground">{firm.description}</p>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Rules Preview */}
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold text-foreground">Rule Summary</h3>
            <div className="glass-card p-6">
              {selectedFirmData ? (
                selectedFirmData.rules ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-2xl">{selectedFirmData.logo}</span>
                      <span className="font-semibold text-foreground">
                        {selectedFirmData.name} Rules
                      </span>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between py-2 border-b border-border/50">
                        <span className="text-muted-foreground">Max Daily Loss</span>
                        <span className="font-medium text-foreground">
                          {selectedFirmData.rules.dailyLoss}%
                        </span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-border/50">
                        <span className="text-muted-foreground">Max Drawdown</span>
                        <span className="font-medium text-foreground">
                          {selectedFirmData.rules.maxDrawdown}%
                        </span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-border/50">
                        <span className="text-muted-foreground">Profit Target</span>
                        <span className="font-medium text-foreground">
                          {selectedFirmData.rules.profitTarget}%
                        </span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-border/50">
                        <span className="text-muted-foreground">Min Trading Days</span>
                        <span className="font-medium text-foreground">
                          {selectedFirmData.rules.minDays}
                        </span>
                      </div>
                      <div className="flex justify-between py-2">
                        <span className="text-muted-foreground">Trading Period</span>
                        <span className="font-medium text-foreground">
                          {typeof selectedFirmData.rules.period === 'number' 
                            ? `${selectedFirmData.rules.period} days` 
                            : selectedFirmData.rules.period}
                        </span>
                      </div>
                    </div>

                    <Button
                      variant="hero"
                      className="w-full mt-4"
                      onClick={handleApply}
                    >
                      Apply Rules
                      <ChevronRight className="w-4 h-4" />
                    </Button>

                    {applied && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-2 p-3 rounded-lg bg-status-safe/10 border border-status-safe/30 text-status-safe"
                      >
                        <CheckCircle className="w-4 h-4" />
                        Rules Applied Successfully
                      </motion.div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      Custom rules require manual configuration in Risk Management.
                    </p>
                    <Button variant="outline" className="mt-4">
                      Go to Risk Management
                    </Button>
                  </div>
                )
              ) : (
                <div className="text-center py-8">
                  <Building2 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Select a prop firm to view its rules
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
}

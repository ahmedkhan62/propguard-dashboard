import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { CheckCircle, CreditCard, Zap, Star } from "lucide-react";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "Basic",
    price: 19,
    description: "Essential protection for new traders",
    features: [
      "1 Trading Account",
      "Risk Lock Protection",
      "Basic Analytics",
      "Daily Loss Limits",
      "Email Support",
    ],
    popular: false,
  },
  {
    name: "Pro",
    price: 49,
    description: "Complete protection for serious traders",
    features: [
      "Unlimited Accounts",
      "All Risk Features",
      "News Protection",
      "Advanced Analytics",
      "Trade Journal",
      "Session Management",
      "Priority Support",
      "API Access",
    ],
    popular: true,
  },
];

export default function Pricing() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <h1 className="text-3xl font-bold text-foreground mb-2">Pricing & Billing</h1>
          <p className="text-muted-foreground">
            Manage your subscription and billing details
          </p>
        </motion.div>

        {/* Current Plan Status */}
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="glass-card p-6"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Current Plan: Pro</h3>
                <p className="text-muted-foreground text-sm">
                  Next billing date: February 15, 2025
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-status-safe/10 text-status-safe text-sm font-medium">
                Active
              </span>
              <Button variant="outline">Manage Billing</Button>
            </div>
          </div>
        </motion.div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className={cn(
                "glass-card p-8 relative",
                plan.popular && "border-primary/50"
              )}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-medium">
                  <Star className="w-3 h-3" />
                  Most Popular
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-xl font-bold text-foreground mb-2">{plan.name}</h3>
                <p className="text-muted-foreground text-sm">{plan.description}</p>
              </div>

              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-bold text-foreground">${plan.price}</span>
                <span className="text-muted-foreground">/month</span>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-muted-foreground">
                    <CheckCircle className="w-4 h-4 text-status-safe shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Button
                variant={plan.popular ? "hero" : "outline"}
                className="w-full"
              >
                {plan.popular ? (
                  <>
                    <Zap className="w-4 h-4" />
                    Current Plan
                  </>
                ) : (
                  "Downgrade"
                )}
              </Button>
            </motion.div>
          ))}
        </div>

        {/* Billing History */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-6"
        >
          <h3 className="text-lg font-semibold text-foreground mb-4">Billing History</h3>
          <div className="space-y-3">
            {[
              { date: "Jan 15, 2025", amount: "$49.00", status: "Paid" },
              { date: "Dec 15, 2024", amount: "$49.00", status: "Paid" },
              { date: "Nov 15, 2024", amount: "$49.00", status: "Paid" },
            ].map((invoice, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-3 border-b border-border/50 last:border-0"
              >
                <div className="flex items-center gap-4">
                  <span className="text-muted-foreground">{invoice.date}</span>
                  <span className="font-medium text-foreground">{invoice.amount}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-status-safe">{invoice.status}</span>
                  <Button variant="ghost" size="sm">
                    Download
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}

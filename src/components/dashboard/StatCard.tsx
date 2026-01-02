import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { LucideIcon, Info } from "lucide-react";
import { useState } from "react";
import { InfoModal } from "../shared/InfoModal";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    positive: boolean;
  };
  className?: string;
  infoContent?: React.ReactNode;
}

export function StatCard({ title, value, subtitle, icon: Icon, trend, className, infoContent }: StatCardProps) {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      whileHover={{ y: -2 }}
      className={cn("glass-card-hover p-6 relative group", className)}
    >
      {infoContent && (
        <button
          onClick={() => setShowInfo(true)}
          className="absolute top-4 right-4 p-1 rounded-full hover:bg-white/5 transition-colors text-white/20 hover:text-primary"
        >
          <Info className="w-4 h-4" />
        </button>
      )}

      <InfoModal
        isOpen={showInfo}
        onClose={() => setShowInfo(false)}
        title={title}
        content={infoContent}
      />
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
          <Icon className="w-6 h-6 text-primary" />
        </div>
        {trend && (
          <span
            className={cn(
              "text-sm font-medium px-2 py-1 rounded-md",
              trend.positive
                ? "text-status-safe bg-status-safe/10"
                : "text-status-danger bg-status-danger/10"
            )}
          >
            {trend.positive ? "+" : ""}{trend.value}%
          </span>
        )}
      </div>
      <div className="space-y-1">
        <p className="text-muted-foreground text-sm">{title}</p>
        <p className="text-2xl font-bold text-foreground">{value}</p>
        {subtitle && (
          <p className="text-muted-foreground text-xs">{subtitle}</p>
        )}
      </div>
    </motion.div>
  );
}

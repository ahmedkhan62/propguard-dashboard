import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Info } from "lucide-react";
import { useState } from "react";
import { InfoModal } from "../shared/InfoModal";

interface ProgressBarProps {
  label: string;
  current: number;
  max: number;
  unit?: string;
  variant?: "default" | "safe" | "warning" | "danger";
  showPercentage?: boolean;
  className?: string;
  infoContent?: React.ReactNode;
}

export function ProgressBar({
  label,
  current,
  max,
  unit = "",
  variant = "default",
  showPercentage = true,
  className,
  infoContent,
}: ProgressBarProps) {
  const [showInfo, setShowInfo] = useState(false);
  const percentage = Math.min((current / max) * 100, 100);

  const barColors = {
    default: "bg-primary",
    safe: "bg-status-safe",
    warning: "bg-status-warning",
    danger: "bg-status-danger",
  };

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex justify-between items-center group relative">
        <div className="flex items-center gap-1.5">
          <span className="text-sm text-muted-foreground">{label}</span>
          {infoContent && (
            <button
              onClick={() => setShowInfo(true)}
              className="p-1 rounded-full hover:bg-white/5 transition-colors text-white/20 hover:text-primary"
            >
              <Info className="w-3 h-3" />
            </button>
          )}
        </div>

        <InfoModal
          isOpen={showInfo}
          onClose={() => setShowInfo(false)}
          title={label}
          content={infoContent}
        />

        <span className="text-sm font-medium text-foreground">
          {current.toLocaleString()}{unit} / {max.toLocaleString()}{unit}
          {showPercentage && (
            <span className="text-muted-foreground ml-2">
              ({percentage.toFixed(1)}%)
            </span>
          )}
        </span>
      </div>
      <div className="h-2 bg-secondary rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={cn("h-full rounded-full", barColors[variant])}
        />
      </div>
    </div>
  );
}

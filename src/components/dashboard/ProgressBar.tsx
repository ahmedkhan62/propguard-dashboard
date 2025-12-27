import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface ProgressBarProps {
  label: string;
  current: number;
  max: number;
  unit?: string;
  variant?: "default" | "safe" | "warning" | "danger";
  showPercentage?: boolean;
  className?: string;
}

export function ProgressBar({
  label,
  current,
  max,
  unit = "",
  variant = "default",
  showPercentage = true,
  className,
}: ProgressBarProps) {
  const percentage = Math.min((current / max) * 100, 100);
  
  const barColors = {
    default: "bg-primary",
    safe: "bg-status-safe",
    warning: "bg-status-warning",
    danger: "bg-status-danger",
  };

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex justify-between items-center">
        <span className="text-sm text-muted-foreground">{label}</span>
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

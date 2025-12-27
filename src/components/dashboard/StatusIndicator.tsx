import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Shield, AlertTriangle, XCircle } from "lucide-react";

type Status = "safe" | "warning" | "danger";

interface StatusIndicatorProps {
  status: Status;
  message?: string;
  className?: string;
}

const statusConfig = {
  safe: {
    icon: Shield,
    label: "SAFE",
    bgClass: "bg-status-safe/10",
    borderClass: "border-status-safe/30",
    textClass: "text-status-safe",
    glowClass: "shadow-[0_0_30px_hsl(152_76%_46%/0.2)]",
  },
  warning: {
    icon: AlertTriangle,
    label: "WARNING",
    bgClass: "bg-status-warning/10",
    borderClass: "border-status-warning/30",
    textClass: "text-status-warning",
    glowClass: "shadow-[0_0_30px_hsl(38_92%_50%/0.2)]",
  },
  danger: {
    icon: XCircle,
    label: "DANGER",
    bgClass: "bg-status-danger/10",
    borderClass: "border-status-danger/30",
    textClass: "text-status-danger",
    glowClass: "shadow-[0_0_30px_hsl(0_84%_60%/0.2)]",
  },
};

export function StatusIndicator({ status, message, className }: StatusIndicatorProps) {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={cn(
        "glass-card p-6 flex items-center gap-4",
        config.glowClass,
        className
      )}
    >
      <div
        className={cn(
          "w-16 h-16 rounded-2xl flex items-center justify-center border",
          config.bgClass,
          config.borderClass
        )}
      >
        <Icon className={cn("w-8 h-8", config.textClass)} />
      </div>
      <div>
        <div className={cn("text-2xl font-bold", config.textClass)}>
          {config.label}
        </div>
        <p className="text-muted-foreground text-sm">
          {message || "Account status"}
        </p>
      </div>
      <motion.div
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
        className={cn(
          "ml-auto w-3 h-3 rounded-full",
          status === "safe" && "bg-status-safe",
          status === "warning" && "bg-status-warning",
          status === "danger" && "bg-status-danger"
        )}
      />
    </motion.div>
  );
}

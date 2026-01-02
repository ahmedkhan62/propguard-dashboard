import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Building2,
  Shield,
  Newspaper,
  BookOpen,
  Bell,
  CreditCard,
  Settings,
  LogOut,
  TrendingUp,
  ChevronLeft,
  Menu,
  ShieldCheck,
  Layers,
  FileDown,
  Lightbulb,
  ShieldAlert
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard", group: "Live Terminal" },
  { icon: Layers, label: "Portfolio", path: "/portfolio", group: "Live Terminal" },
  { icon: Building2, label: "Prop Firm Setup", path: "/prop-firm", group: "Live Terminal" },
  { icon: Shield, label: "Risk Management", path: "/risk", group: "Live Terminal" },
  { icon: Newspaper, label: "News Protection", path: "/news", group: "Live Terminal" },
  { icon: BookOpen, label: "Trade Journal", path: "/journal", group: "Live Terminal" },
  { icon: Bell, label: "Alerts", path: "/alerts", group: "Live Terminal" },
  { icon: ShieldCheck, label: "Transparency", path: "/transparency", group: "Live Terminal" },
  { icon: FileDown, label: "Reports", path: "/reports", group: "Live Terminal" },
  { icon: CreditCard, label: "Billing", path: "/billing", group: "Live Terminal" },
  { icon: Lightbulb, label: "Ideas", path: "/ideas", group: "Voice of User" },
  { icon: ShieldAlert, label: "Complaints", path: "/complaints", group: "Voice of User" },
  { icon: Building2, label: "Live Support", path: "/support", group: "Voice of User" },
  { icon: Settings, label: "Settings", path: "/settings", group: "Account" },
];

interface SidebarProps {
  className?: string;
  mobile?: boolean;
}

export function Sidebar({ className, mobile }: SidebarProps) {
  const location = useLocation();
  const { logout } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

  // If mobile, never collapse
  const isCollapsed = mobile ? false : collapsed;

  const groups = ["Live Terminal", "Voice of User", "Account"];

  return (
    <motion.aside
      className={cn(
        "bg-sidebar border-sidebar-border h-full flex flex-col transition-all duration-300",
        isCollapsed ? "w-20" : "w-64",
        className
      )}
    >
      {/* Logo */}
      <div className="h-20 flex items-center justify-between px-6 border-b border-sidebar-border/50">
        <Link to="/dashboard" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-primary" />
          </div>
          {!isCollapsed && (
            <div className="flex flex-col">
              <span className="font-black text-lg text-foreground tracking-tight">RiskLock</span>
              <span className="text-[10px] text-primary font-black tracking-[0.2em] uppercase leading-none">Armor</span>
            </div>
          )}
        </Link>
        {!mobile && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed(!collapsed)}
            className="text-muted-foreground hover:text-foreground h-8 w-8"
          >
            {collapsed ? <Menu className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </Button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-6 px-3 space-y-8 overflow-y-auto custom-scrollbar">
        {groups.map(group => (
          <div key={group} className="space-y-2">
            {!isCollapsed && (
              <div className="px-4 mb-2">
                <span className="text-[10px] font-black text-muted-foreground/30 uppercase tracking-[0.2em]">{group}</span>
              </div>
            )}
            <div className="space-y-1">
              {navItems.filter(item => item.group === group).map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={cn(
                      "flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all group relative",
                      isActive
                        ? "bg-primary text-primary-foreground shadow-glow-sm"
                        : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                      isCollapsed && "justify-center px-0"
                    )}
                  >
                    <item.icon className={cn(
                      "w-4 h-4 shrink-0 transition-colors",
                      isActive ? "text-primary-foreground" : "text-muted-foreground group-hover:text-primary"
                    )} />
                    {!isCollapsed && (
                      <span className="font-semibold text-sm truncate">{item.label}</span>
                    )}
                    {isActive && isCollapsed && (
                      <div className="absolute left-0 w-1 h-4 bg-primary rounded-r-full" />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* User Section */}
      <div className="p-4 border-t border-sidebar-border bg-card/50">
        <button
          onClick={logout}
          className={cn(
            "flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:bg-status-danger/5 hover:text-status-danger transition-all group w-full",
            isCollapsed && "justify-center px-0"
          )}
        >
          <LogOut className="w-4 h-4 shrink-0 group-hover:translate-x-1 transition-transform" />
          {!isCollapsed && <span className="font-bold text-sm uppercase tracking-widest">Logout</span>}
        </button>
      </div>
    </motion.aside>
  );
}

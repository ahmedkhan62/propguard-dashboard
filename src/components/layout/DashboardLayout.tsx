import { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { motion } from "framer-motion";

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      <Sidebar />
      <motion.main
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="ml-20 lg:ml-64 min-h-screen p-6 lg:p-8 overflow-y-auto scrollbar-thin scrollbar-thumb-primary/30 scrollbar-track-background"
      >
        {children}
      </motion.main>
    </div>
  );
}

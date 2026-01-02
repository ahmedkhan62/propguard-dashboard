import { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { motion } from "framer-motion";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block fixed left-0 top-0 h-screen z-50">
        <Sidebar className="border-r" />
      </div>

      {/* Mobile Header */}
      <div className="lg:hidden flex items-center justify-between p-4 border-b bg-background sticky top-0 z-40">
        <div className="font-bold text-lg">RiskLock</div>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="w-6 h-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-80">
            <Sidebar className="border-none w-full" mobile />
          </SheetContent>
        </Sheet>
      </div>

      <motion.main
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="lg:ml-64 min-h-screen p-4 lg:p-8 overflow-y-auto scrollbar-thin scrollbar-thumb-primary/30 scrollbar-track-background"
      >
        {children}
      </motion.main>
    </div>
  );
}

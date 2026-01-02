import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/context/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";

export function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="rounded-full w-10 h-10 bg-secondary/50 hover:bg-secondary border border-border/50 relative overflow-hidden"
        >
            <AnimatePresence mode="wait" initial={false}>
                <motion.div
                    key={theme}
                    initial={{ y: 20, rotate: 45, opacity: 0 }}
                    animate={{ y: 0, rotate: 0, opacity: 1 }}
                    exit={{ y: -20, rotate: -45, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center justify-center"
                >
                    {theme === 'light' ? (
                        <Moon className="w-5 h-5 text-foreground" />
                    ) : (
                        <Sun className="w-5 h-5 text-foreground" />
                    )}
                </motion.div>
            </AnimatePresence>
        </Button>
    );
}

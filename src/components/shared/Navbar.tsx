import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import {
    TrendingUp,
    LogIn,
    UserPlus,
    Menu,
    X,
    Shield,
    ChevronDown,
    Layers,
    Globe,
    Building,
    BookOpen,
} from "lucide-react";
import { ThemeToggle } from "@/components/shared/ThemeToggle";

const productLinks = [
    { name: "Features", path: "/features" },
    { name: "Why RiskLock", path: "/why-us" },
    { name: "How It Works", path: "/how-it-works" },
];

const marketLinks = [
    { name: "All Markets", path: "/markets" },
    { name: "Pricing", path: "/pricing" },
];

const companyLinks = [
    { name: "About Us", path: "/about" },
    { name: "Security", path: "/security" },
];

const resourceLinks = [
    { name: "Help Center", path: "/help" },
    { name: "Reports & Proof", path: "/reports-proof" },
];

const DropdownMenu = ({ title, links, icon: Icon }: { title: string; links: typeof productLinks; icon: any }) => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const isActive = links.some(link => location.pathname === link.path);

    return (
        <div
            className="relative"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
        >
            <button
                className={`
                    flex items-center gap-1 px-3 py-2 text-sm font-semibold transition-all rounded-lg hover:bg-primary/5
                    ${isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"}
                `}
            >
                <Icon className="w-4 h-4" />
                {title}
                <ChevronDown className={`w-3 h-3 transition-transform ${isOpen ? "rotate-180" : ""}`} />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-2 w-56 glass-card border-primary/10 shadow-xl rounded-xl overflow-hidden z-50"
                    >
                        <div className="py-2">
                            {links.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className={`
                                        block px-4 py-3 text-sm font-medium transition-colors
                                        ${location.pathname === link.path
                                            ? "bg-primary/10 text-primary"
                                            : "text-foreground hover:bg-primary/5 hover:text-primary"}
                                    `}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 100);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${isScrolled ? "px-4 py-3" : "px-0 py-0"}`}>
            <motion.nav
                animate={{
                    maxWidth: isScrolled ? "1200px" : "100%",
                    marginLeft: isScrolled ? "auto" : 0,
                    marginRight: isScrolled ? "auto" : 0,
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className={`
                    mx-auto
                    ${isScrolled
                        ? "bg-background/80 backdrop-blur-xl border border-border/50 rounded-full shadow-2xl px-6 py-3"
                        : "bg-background/80 backdrop-blur-xl border-b border-border/50 px-4 py-4"
                    }
                    transition-all duration-300
                `}
            >
                <div className="container mx-auto flex items-center justify-between gap-4">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-3 shrink-0 group">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-all duration-300">
                            <Shield className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                        </div>
                        <div className="flex flex-col">
                            <span className="font-black text-xl text-foreground tracking-tight leading-none">RiskLock</span>
                            <span className="text-[8px] text-primary font-bold tracking-[0.15em] uppercase mt-0.5">Professional</span>
                        </div>
                    </Link>

                    {/* Desktop Nav Links with Dropdowns */}
                    <div className="hidden lg:flex items-center gap-1">
                        <DropdownMenu title="Product" links={productLinks} icon={Layers} />
                        <DropdownMenu title="Markets" links={marketLinks} icon={Globe} />
                        <DropdownMenu title="Company" links={companyLinks} icon={Building} />
                        <DropdownMenu title="Resources" links={resourceLinks} icon={BookOpen} />
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3">
                        <ThemeToggle />
                        <div className="h-6 w-[1px] bg-border/50 mx-1 hidden sm:block" />
                        <div className="hidden sm:flex items-center gap-2">
                            <Link to="/login">
                                <Button variant="ghost" size="sm" className="flex items-center gap-2">
                                    <LogIn className="w-4 h-4" />
                                    Login
                                </Button>
                            </Link>
                            <Link to="/signup">
                                <Button variant="hero" size="sm" className="flex items-center gap-2">
                                    <UserPlus className="w-4 h-4" />
                                    Get Started
                                </Button>
                            </Link>
                        </div>

                        {/* Mobile Menu Toggle */}
                        <button
                            className="lg:hidden p-2 text-foreground hover:bg-primary/10 rounded-lg transition-colors"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="lg:hidden absolute top-20 left-4 right-4 bg-background/95 backdrop-blur-xl border border-border rounded-2xl p-6 shadow-2xl max-h-[80vh] overflow-y-auto"
                    >
                        <div className="flex flex-col gap-6">
                            {/* Product */}
                            <div>
                                <div className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3 flex items-center gap-2">
                                    <Layers className="w-3 h-3" />
                                    Product
                                </div>
                                <div className="flex flex-col gap-2 pl-5">
                                    {productLinks.map((link) => (
                                        <Link
                                            key={link.path}
                                            to={link.path}
                                            onClick={() => setIsMenuOpen(false)}
                                            className="text-base font-semibold text-foreground hover:text-primary transition-colors"
                                        >
                                            {link.name}
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            {/* Markets */}
                            <div>
                                <div className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3 flex items-center gap-2">
                                    <Globe className="w-3 h-3" />
                                    Markets
                                </div>
                                <div className="flex flex-col gap-2 pl-5">
                                    {marketLinks.map((link) => (
                                        <Link
                                            key={link.path}
                                            to={link.path}
                                            onClick={() => setIsMenuOpen(false)}
                                            className="text-base font-semibold text-foreground hover:text-primary transition-colors"
                                        >
                                            {link.name}
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            {/* Company */}
                            <div>
                                <div className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3 flex items-center gap-2">
                                    <Building className="w-3 h-3" />
                                    Company
                                </div>
                                <div className="flex flex-col gap-2 pl-5">
                                    {companyLinks.map((link) => (
                                        <Link
                                            key={link.path}
                                            to={link.path}
                                            onClick={() => setIsMenuOpen(false)}
                                            className="text-base font-semibold text-foreground hover:text-primary transition-colors"
                                        >
                                            {link.name}
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            {/* Resources */}
                            <div>
                                <div className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3 flex items-center gap-2">
                                    <BookOpen className="w-3 h-3" />
                                    Resources
                                </div>
                                <div className="flex flex-col gap-2 pl-5">
                                    {resourceLinks.map((link) => (
                                        <Link
                                            key={link.path}
                                            to={link.path}
                                            onClick={() => setIsMenuOpen(false)}
                                            className="text-base font-semibold text-foreground hover:text-primary transition-colors"
                                        >
                                            {link.name}
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            <div className="h-[1px] bg-border my-2" />
                            <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                                <Button variant="outline" className="w-full justify-start">
                                    <LogIn className="w-5 h-5 mr-3" /> Login
                                </Button>
                            </Link>
                            <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
                                <Button variant="hero" className="w-full justify-start">
                                    <UserPlus className="w-5 h-5 mr-3" /> Get Started
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

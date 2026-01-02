import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useState } from "react";
import {
    Globe,
    Clock,
    Activity,
    AlertTriangle,
    CheckCircle,
    X,
    ArrowRight,
    BarChart3,
    Zap,
    Eye,
    Shield,
    Sparkles,
    LineChart,
    Target,
} from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// Generate realistic market data for charts
const generateMarketData = (symbol: string, trend: "up" | "down" | "volatile") => {
    const points = 50;
    const data = [];
    let price = symbol === "XAUUSD" ? 2067 : symbol === "USDJPY" ? 143 : 1.08;

    for (let i = 0; i < points; i++) {
        const variance = (Math.random() - 0.5) * 0.02;
        if (trend === "up") {
            price += Math.abs(variance) * 0.5;
        } else if (trend === "down") {
            price -= Math.abs(variance) * 0.5;
        } else {
            price += variance;
        }

        data.push({
            time: `${i}h`,
            price: parseFloat(price.toFixed(symbol === "XAUUSD" ? 2 : symbol === "USDJPY" ? 2 : 4)),
            volume: Math.random() * 1000 + 500,
        });
    }
    return data;
};

const majorPairs = [
    { symbol: "EURUSD", price: "1.0842", change: "+0.23%", session: "London", volatility: "Medium", chartData: generateMarketData("EURUSD", "up") },
    { symbol: "GBPUSD", price: "1.2634", change: "-0.15%", session: "London", volatility: "High", chartData: generateMarketData("GBPUSD", "down") },
    { symbol: "USDJPY", price: "143.28", change: "+0.41%", session: "New York", volatility: "Low", chartData: generateMarketData("USDJPY", "up") },
    { symbol: "XAUUSD", price: "2067.45", change: "+1.12%", session: "New York", volatility: "High", chartData: generateMarketData("XAUUSD", "volatile") },
];

const sessions = [
    { name: "Asia", time: "00:00 - 09:00 GMT", characteristics: "Lower volatility, range-bound behavior", active: false },
    { name: "London", time: "08:00 - 17:00 GMT", characteristics: "Momentum & structure, high volume", active: true },
    { name: "New York", time: "13:00 - 22:00 GMT", characteristics: "Expansion & news sensitivity, major moves", active: false },
];

export default function Markets() {
    const [selectedPair, setSelectedPair] = useState(majorPairs[0]);

    return (
        <div className="py-20 lg:py-32">

            {/* Hero Section */}
            <section className="relative min-h-[70vh] flex items-center z-10 container mx-auto px-4 py-20">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 blur-[120px] rounded-full pointer-events-none -z-10" />

                <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="max-w-4xl mx-auto text-center relative"
                >
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] md:text-xs font-bold mb-10 shadow-glow-sm backdrop-blur-md uppercase tracking-widest"
                    >
                        <Globe className="w-3 h-3" />
                        Market Intelligence
                    </motion.div>

                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-foreground leading-[1.1] tracking-tight mb-8">
                        Live Market Context. <span className="gradient-text">Smarter Risk Decisions</span>
                    </h1>

                    <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed font-medium mb-10">
                        RiskLock continuously observes market conditions to help traders understand when risk matters most — without telling you what to trade.
                    </p>

                    <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground font-medium">
                        <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-primary" />
                            Read-only
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-primary" />
                            No trade execution
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-primary" />
                            Contextual insights only
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* Live Forex Market Overview */}
            <section className="relative z-10 container mx-auto px-4 py-32">
                <div className="text-center mb-20">
                    <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-4">
                        Real-Time Data
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black text-foreground mb-6 tracking-tight">
                        Major Market <span className="gradient-text">Snapshot</span>
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-medium">
                        Current market conditions across major forex pairs and commodities.
                    </p>
                </div>

                {/* Trading Pair Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {majorPairs.map((pair, i) => (
                        <motion.div
                            key={pair.symbol}
                            initial={{ y: 30, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            onClick={() => setSelectedPair(pair)}
                            className={`glass-card p-6 cursor-pointer transition-all duration-300 ${selectedPair.symbol === pair.symbol
                                ? "border-primary/50 bg-primary/5 shadow-glow-md"
                                : "hover:border-primary/30"
                                }`}
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className="text-xl font-black text-foreground">{pair.symbol}</div>
                                <div className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${pair.volatility === "High" ? "bg-status-warning/10 text-status-warning border border-status-warning/20" :
                                    pair.volatility === "Medium" ? "bg-primary/10 text-primary border border-primary/20" :
                                        "bg-status-safe/10 text-status-safe border border-status-safe/20"
                                    }`}>
                                    {pair.volatility}
                                </div>
                            </div>
                            <div className="text-3xl font-black text-foreground mb-2">{pair.price}</div>
                            <div className={`text-sm font-bold mb-4 ${pair.change.startsWith("+") ? "text-status-safe" : "text-status-danger"}`}>
                                {pair.change}
                            </div>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <Clock className="w-3 h-3" />
                                {pair.session} Session
                            </div>
                            {selectedPair.symbol === pair.symbol && (
                                <div className="mt-3 pt-3 border-t border-primary/20">
                                    <div className="text-[10px] font-bold text-primary uppercase tracking-widest">Selected</div>
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>

                {/* Professional Trading Chart */}
                <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    className="glass-card p-8 border-primary/20 bg-background/60 backdrop-blur-2xl"
                >
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <h3 className="text-2xl font-black text-foreground">{selectedPair.symbol}</h3>
                                <div className={`px-3 py-1 rounded-full text-xs font-bold ${selectedPair.change.startsWith("+") ? "bg-status-safe/10 text-status-safe" : "bg-status-danger/10 text-status-danger"
                                    }`}>
                                    {selectedPair.change}
                                </div>
                            </div>
                            <div className="text-sm text-muted-foreground font-medium">
                                {selectedPair.session} Session • {selectedPair.volatility} Volatility
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-3xl font-black text-foreground">{selectedPair.price}</div>
                            <div className="text-xs text-muted-foreground">Current Price</div>
                        </div>
                    </div>

                    <div className="h-[400px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={selectedPair.chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop
                                            offset="0%"
                                            stopColor={selectedPair.change.startsWith("+") ? "hsl(var(--status-safe))" : "hsl(var(--status-danger))"}
                                            stopOpacity={0.3}
                                        />
                                        <stop
                                            offset="100%"
                                            stopColor={selectedPair.change.startsWith("+") ? "hsl(var(--status-safe))" : "hsl(var(--status-danger))"}
                                            stopOpacity={0.05}
                                        />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.2} />
                                <XAxis
                                    dataKey="time"
                                    stroke="hsl(var(--muted-foreground))"
                                    fontSize={12}
                                    tickLine={false}
                                    axisLine={false}
                                />
                                <YAxis
                                    stroke="hsl(var(--muted-foreground))"
                                    fontSize={12}
                                    tickLine={false}
                                    axisLine={false}
                                    domain={['auto', 'auto']}
                                    tickFormatter={(value) => value.toFixed(selectedPair.symbol === "XAUUSD" ? 0 : 4)}
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: "hsl(var(--background))",
                                        border: "1px solid hsl(var(--border))",
                                        borderRadius: "12px",
                                        padding: "12px",
                                    }}
                                    labelStyle={{ color: "hsl(var(--foreground))", fontWeight: "bold" }}
                                    itemStyle={{ color: "hsl(var(--foreground))" }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="price"
                                    stroke={selectedPair.change.startsWith("+") ? "hsl(var(--status-safe))" : "hsl(var(--status-danger))"}
                                    strokeWidth={2}
                                    fill="url(#priceGradient)"
                                    dot={false}
                                    activeDot={{ r: 6 }}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="mt-6 p-4 rounded-2xl bg-secondary/30 border border-border/50 text-center">
                        <p className="text-sm text-muted-foreground">
                            <AlertTriangle className="w-4 h-4 inline mr-2 text-primary" />
                            Data for informational purposes only. Not financial advice.
                        </p>
                    </div>
                </motion.div>
            </section>

            {/* Market Sessions Awareness */}
            <section className="relative z-10 container mx-auto px-4 py-32">
                <div className="text-center mb-20">
                    <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-4">
                        Session Intelligence
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black text-foreground mb-6 tracking-tight">
                        Markets Behave Differently — <span className="gradient-text">RiskLock Knows When</span>
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-medium">
                        Risk is not constant throughout the day. Different sessions bring different volatility and behavior patterns.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {sessions.map((session, i) => (
                        <motion.div
                            key={session.name}
                            initial={{ y: 30, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className={`glass-card p-8 relative overflow-hidden ${session.active ? "border-primary/40 bg-primary/5" : ""
                                }`}
                        >
                            {session.active && (
                                <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-primary/20 border border-primary/30">
                                    <span className="text-[10px] font-black text-primary uppercase tracking-widest">Active</span>
                                </div>
                            )}
                            <div className="flex items-center gap-3 mb-4">
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${session.active ? "bg-primary/20" : "bg-secondary/50"
                                    }`}>
                                    <Clock className={`w-6 h-6 ${session.active ? "text-primary" : "text-muted-foreground"}`} />
                                </div>
                                <div>
                                    <div className="text-xl font-black text-foreground">{session.name}</div>
                                    <div className="text-xs text-muted-foreground">{session.time}</div>
                                </div>
                            </div>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                {session.characteristics}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Volatility & Risk Context */}
            <section className="relative z-10 container mx-auto px-4 py-32">
                <div className="text-center mb-20">
                    <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-4">
                        Risk Context
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black text-foreground mb-6 tracking-tight">
                        When Volatility Increases, <span className="gradient-text">Discipline Matters More</span>
                    </h2>
                </div>

                <div className="glass-card p-8 md:p-12 max-w-4xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                        <div className="text-center">
                            <div className="w-16 h-16 rounded-2xl bg-status-safe/10 flex items-center justify-center mx-auto mb-4">
                                <Activity className="w-8 h-8 text-status-safe" />
                            </div>
                            <div className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-2">Volatility State</div>
                            <div className="text-2xl font-black text-foreground">Normal</div>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                                <Zap className="w-8 h-8 text-primary" />
                            </div>
                            <div className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-2">News Sensitivity</div>
                            <div className="text-2xl font-black text-foreground">Moderate</div>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                                <BarChart3 className="w-8 h-8 text-primary" />
                            </div>
                            <div className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-2">Correlation Pressure</div>
                            <div className="text-2xl font-black text-foreground">Low</div>
                        </div>
                    </div>

                    <div className="p-6 rounded-2xl bg-secondary/30 border border-border/50">
                        <div className="flex items-start gap-3">
                            <Eye className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                            <div>
                                <div className="font-bold text-foreground mb-2">Important Disclaimer</div>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    RiskLock does not predict markets. It recognizes risk environments and adjusts risk awareness accordingly. This information is for context only, not trading advice.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* What We Do vs What We Don't */}
            <section className="relative z-10 container mx-auto px-4 py-32">
                <div className="text-center mb-20">
                    <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-4">
                        Transparency
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black text-foreground mb-6 tracking-tight">
                        Clear Boundaries. <span className="gradient-text">Total Honesty</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* What We Do */}
                    <motion.div
                        initial={{ x: -30, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        className="glass-card p-8 md:p-10 border-status-safe/20"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 rounded-xl bg-status-safe/20 flex items-center justify-center">
                                <CheckCircle className="w-6 h-6 text-status-safe" />
                            </div>
                            <h3 className="text-2xl font-black text-foreground">What RiskLock Does</h3>
                        </div>
                        <ul className="space-y-4">
                            {[
                                "Monitors volatility in real-time",
                                "Understands session behavior patterns",
                                "Adjusts risk sensitivity dynamically",
                                "Warns during unstable conditions",
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-status-safe shrink-0 mt-0.5" />
                                    <span className="text-foreground font-medium">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* What We Don't Do */}
                    <motion.div
                        initial={{ x: 30, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        className="glass-card p-8 md:p-10 border-status-danger/20"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 rounded-xl bg-status-danger/20 flex items-center justify-center">
                                <X className="w-6 h-6 text-status-danger" />
                            </div>
                            <h3 className="text-2xl font-black text-foreground">What RiskLock Does NOT Do</h3>
                        </div>
                        <ul className="space-y-4">
                            {[
                                "Provide buy/sell recommendations",
                                "Predict price direction",
                                "Execute trades",
                                "Replace your trading strategy",
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <X className="w-5 h-5 text-status-danger shrink-0 mt-0.5" />
                                    <span className="text-foreground font-medium">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </div>
            </section>

            {/* Practical Value for Funded Traders */}
            <section className="relative z-10 container mx-auto px-4 py-32">
                <div className="text-center mb-20">
                    <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-4">
                        Practical Application
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black text-foreground mb-6 tracking-tight">
                        Why This Matters for <span className="gradient-text">Funded Traders</span>
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-medium italic">
                        Most prop accounts fail due to timing and risk — not strategy.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                    {[
                        { icon: Shield, title: "Avoid Oversized Positions", desc: "Reduce position size during high volatility periods to preserve capital" },
                        { icon: Clock, title: "Understand Session Losses", desc: "Recognize which sessions align with your trading performance" },
                        { icon: AlertTriangle, title: "Reduce Emotional Trades", desc: "Stay aware of news-sensitive windows that trigger impulsive decisions" },
                        { icon: Target, title: "Align Risk with Conditions", desc: "Match your risk limits to current market volatility states" },
                    ].map((benefit, i) => (
                        <motion.div
                            key={i}
                            initial={{ y: 30, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="glass-card-hover p-6"
                        >
                            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                                <benefit.icon className="w-6 h-6 text-primary" />
                            </div>
                            <h4 className="text-lg font-black text-foreground mb-2">{benefit.title}</h4>
                            <p className="text-sm text-muted-foreground leading-relaxed">{benefit.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Advanced Market Intelligence (Coming Soon) */}
            <section className="relative z-10 container mx-auto px-4 py-32">
                <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    className="glass-card p-12 lg:p-16 border-primary/30 bg-gradient-to-b from-primary/10 to-transparent relative overflow-hidden max-w-5xl mx-auto"
                >
                    <div className="absolute top-4 right-4 px-4 py-1.5 rounded-full bg-primary/20 border border-primary/30 backdrop-blur-md">
                        <span className="text-[10px] font-black text-primary uppercase tracking-widest">Coming Soon</span>
                    </div>

                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold mb-6 uppercase tracking-widest">
                            <Sparkles className="w-4 h-4" />
                            Elite & Ultra Tier
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black text-foreground mb-6 tracking-tight">
                            Advanced Market <span className="gradient-text">Intelligence</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                            { icon: BarChart3, title: "Market Stress Scoring", desc: "Quantified market stability measurements" },
                            { icon: LineChart, title: "Session-Performance Correlation", desc: "Analyze your historical session success rates" },
                            { icon: Zap, title: "AI Volatility Anticipation", desc: "Pattern recognition for volatility changes" },
                            { icon: Target, title: "Strategy-Market Alignment", desc: "Detect when your strategy mismatches conditions" },
                        ].map((feature, i) => (
                            <div key={i} className="p-6 rounded-2xl bg-background/40 border border-primary/10 backdrop-blur-sm opacity-70">
                                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                                    <feature.icon className="w-5 h-5 text-primary/60" />
                                </div>
                                <h4 className="text-lg font-black text-foreground mb-2">{feature.title}</h4>
                                <p className="text-sm text-muted-foreground leading-relaxed italic">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </section>

            {/* Final CTA */}
            <section className="relative z-10 container mx-auto px-4 py-32 mb-12">
                <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    className="glass-card p-12 lg:p-20 text-center bg-gradient-to-b from-primary/10 to-transparent"
                >
                    <h2 className="text-4xl md:text-6xl font-black text-foreground mb-6 tracking-tight">
                        Markets Change Every Hour. <span className="gradient-text">Your Risk Should Know</span>
                    </h2>
                    <p className="text-muted-foreground text-xl mb-10 max-w-2xl mx-auto font-medium leading-relaxed italic">
                        Great traders understand the market. Smart traders control risk when the market changes.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link to="/features">
                            <Button variant="hero" size="xl" className="h-16 px-12 text-lg shadow-glow-md">
                                Explore Risk Protection
                                <ArrowRight className="w-5 h-5 ml-2" />
                            </Button>
                        </Link>
                        <Link to="/pricing">
                            <Button variant="outline" size="xl" className="h-16 px-12 text-lg border-primary/30 hover:bg-primary/5">
                                Upgrade to Pro
                            </Button>
                        </Link>
                    </div>
                </motion.div>
            </section>
        </div>
    );
}

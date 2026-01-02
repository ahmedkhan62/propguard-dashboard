import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import OfferPopup from "@/components/shared/OfferPopup";
import { motion } from "framer-motion";
import {
  Shield,
  TrendingUp,
  Zap,
  Lock,
  Target,
  CheckCircle,
  ArrowRight,
  Star,
  LogIn,
  UserPlus,
  Rocket,
  Activity,
  Award,
  Globe,
  Layers,
  Settings,
  BarChart3,
  ChevronRight,
  Twitter,
  Github,
  Linkedin,
  Instagram,
  Mail,
} from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Real-Time Risk Monitoring",
    description: "Active monitoring of every trade, ensuring you never exceed your daily or max drawdown limits.",
  },
  {
    icon: Activity,
    title: "AI Behavioral Insights",
    description: "Our engine analyzes your trading psychology to identify patterns of overtrading and revenge trading.",
  },
  {
    icon: Target,
    title: "Portfolio Exposure Analysis",
    description: "Track correlated exposure across multiple accounts to prevent systemic risk and account blowouts.",
  },
];

const journeySteps = [
  { step: "01", title: "Connect Account", description: "Link your MT4/MT5 accounts securely via MetaApi in seconds.", icon: Globe },
  { step: "02", title: "Set Rules", description: "Choose a prop firm preset or customize your own risk thresholds.", icon: Settings },
  { step: "03", title: "Monitor Risk", description: "Our silent guardian watches over your trades in the background.", icon: Shield },
  { step: "04", title: "Generate Reports", description: "Download professional compliance reports for your prop firm.", icon: BarChart3 },
  { step: "05", title: "Scale Success", description: "Upgrade to PRO for unlimited accounts and advanced intelligence.", icon: Rocket },
];

const testimonials = [
  {
    name: "Alex M.",
    role: "Funded Trader",
    quote: "RiskLock helped me pass my FTMO challenge on the first try. The automatic protection is a game-changer.",
  },
  {
    name: "Sarah K.",
    role: "Prop Firm Trader",
    quote: "I used to blow accounts from overtrading. Now I can't even if I wanted to. Best investment I've made.",
  },
  {
    name: "Marcus T.",
    role: "Professional Trader",
    quote: "The news protection alone has saved me thousands. Clean, simple, effective.",
  },
];

export default function Landing() {
  return (
    <div>

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center z-10 container mx-auto px-4 pt-12">
        {/* Background Decorative Bloom */}
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
            <Award className="w-3 h-3" />
            Mandatory Protection for Serious Prop Traders
          </motion.div>

          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col gap-8"
          >
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-foreground leading-[1.1] tracking-tight">
              Protect Every Trade, <br />
              <span className="gradient-text">Maximize Your Discipline.</span>
            </h1>

            <p className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed font-medium">
              RiskLock is the silent guardian for your funded accounts. We monitor every pip, prevent revenge trading, and ensure you keep what you earn.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link to="/signup">
                <Button variant="hero" size="lg" className="group px-8 h-14 text-base shadow-glow-md">
                  Start Professional Trial
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                </Button>
              </Link>
            </div>
          </motion.div>

          <div className="flex flex-wrap items-center justify-center gap-8 mt-16 text-muted-foreground text-sm font-medium">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-primary" />
              Real-time risk monitoring
            </div>
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-primary" />
              AI-powered behavioral insights
            </div>
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-primary" />
              Portfolio-wide exposure analysis
            </div>
          </div>
        </motion.div>
      </section>

      <OfferPopup />

      {/* Platform Benefits Section */}
      <section id="benefits" className="relative z-10 container mx-auto px-4 py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ x: -30, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-8 leading-tight">
              Why Every Serious Trader Needs <span className="text-primary italic">RiskLock</span>
            </h2>
            <div className="space-y-6">
              {[
                { title: "Risk Proximity Awareness", desc: "Clear visual indicators show how close you are to your limits in real-time." },
                { title: "Pattern Detection", desc: "Identify overtrading, loss streaks, and emotional trading tendencies from your data." },
                { title: "Live Performance Analytics", desc: "Real-time metrics and insights synced directly from MT4/MT5." },
                { title: "Behavioral Insights", desc: "Understand your trading habits with data-driven feedback and correlations." },
                { title: "Portfolio Aggregation", desc: "View risk across multiple firms and accounts in one unified dashboard." },
              ].map((benefit, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mt-1">
                    <CheckCircle className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground">{benefit.title}</h4>
                    <p className="text-muted-foreground text-sm">{benefit.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative group lg:ml-auto w-full max-w-xl"
          >
            {/* Decorative Glow */}
            <div className="absolute inset-0 bg-primary/20 blur-[120px] rounded-full opacity-50 group-hover:opacity-80 transition-opacity duration-1000 -z-10" />

            <div className="glass-card p-4 md:p-8 border-primary/20 shadow-glow-lg backdrop-blur-2xl relative overflow-hidden">
              {/* Mock Dashboard UI */}
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-border/50 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-status-safe/20 flex items-center justify-center text-status-safe">
                      <Shield className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm font-bold">Active Monitoring</div>
                      <div className="text-[10px] text-status-safe font-bold uppercase tracking-wider">Secure</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-muted-foreground">Daily Limit</div>
                    <div className="text-sm font-bold text-foreground">$5,000.00</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-end">
                    <div className="text-xs font-bold text-muted-foreground uppercase">Real-Time Drawdown</div>
                    <div className="text-lg font-black text-primary">0.42%</div>
                  </div>
                  <div className="h-3 w-full bg-secondary rounded-full overflow-hidden border border-border/50">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "42%" }}
                      transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                      className="h-full bg-gradient-to-r from-primary to-primary/50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-background/50 border border-border/50">
                    <div className="text-[10px] text-muted-foreground uppercase font-bold mb-1">Max Retracement</div>
                    <div className="text-sm font-bold text-status-warning">-$240.50</div>
                  </div>
                  <div className="p-4 rounded-xl bg-background/50 border border-border/50">
                    <div className="text-[10px] text-muted-foreground uppercase font-bold mb-1">Risk Profile</div>
                    <div className="text-sm font-bold text-primary">AGGRESSIVE</div>
                  </div>
                </div>

                {/* Floating Alert Indicator */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -right-4 -bottom-4 p-4 glass-card border-status-safe/30 bg-status-safe/5 backdrop-blur-xl shadow-xl max-w-[160px]"
                >
                  <div className="flex items-center gap-2 text-status-safe mb-1">
                    <Zap className="w-3 h-3 fill-status-safe" />
                    <span className="text-[10px] font-bold">LIVE FEED</span>
                  </div>
                  <div className="text-[10px] text-foreground leading-tight">EURUSD Position size verified for drawdown limits.</div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Journey Section */}
      <section id="journey" className="relative z-10 container mx-auto px-4 py-32">
        {/* Background Background Elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-6xl pointer-events-none -z-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 blur-[120px] rounded-full animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/10 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: "2s" }} />
        </div>

        <div className="text-center mb-24 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-widest mb-6"
          >
            <TrendingUp className="w-3 h-3" />
            Strategic Roadmap
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black text-foreground mb-6 tracking-tight"
          >
            Your Journey to <span className="gradient-text">Funding</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-lg max-w-2xl mx-auto font-medium"
          >
            A high-performance path designed to take you from account connection to professional consistency.
          </motion.p>
        </div>

        <div className="relative">
          {/* Connecting Path Line (Desktop) */}
          <div className="hidden lg:block absolute top-[120px] left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary/20 to-transparent -z-10">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2, ease: "easeInOut" }}
              className="w-full h-full bg-gradient-to-r from-primary/0 via-primary to-primary/0 origin-left"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-14 relative">
            {journeySteps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ y: 40, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                className="relative group"
              >
                {/* Connector for Mobile/Tablet (Vertical) */}
                {i < journeySteps.length - 1 && (
                  <div className="lg:hidden absolute left-[31px] top-16 bottom-0 w-[2px] bg-gradient-to-b from-primary/20 to-transparent -mb-8 -z-10" />
                )}

                <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                  {/* Icon Hexagon/Circle Container */}
                  <div className="relative mb-8">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="w-16 h-16 rounded-2xl bg-background border-2 border-primary/20 flex items-center justify-center shadow-glow-sm relative z-10 group-hover:border-primary group-hover:shadow-primary/20 transition-all duration-300"
                    >
                      <step.icon className="w-8 h-8 text-primary group-hover:text-primary transition-colors" />
                    </motion.div>

                    {/* Step Number Badge */}
                    <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-primary text-primary-foreground text-[10px] font-black flex items-center justify-center border-4 border-background z-20 shadow-lg">
                      {step.step}
                    </div>

                    {/* Ambient Glow */}
                    <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
                  </div>

                  {/* Content */}
                  <div className="space-y-3 px-4 lg:px-0 max-w-[220px] mx-auto lg:mx-0">
                    <h4 className="text-xl font-black text-foreground group-hover:text-primary transition-colors duration-300">
                      {step.title}
                    </h4>
                    <p className="text-muted-foreground text-sm leading-relaxed font-medium">
                      {step.description}
                    </p>
                  </div>

                  {/* desktop arrow */}
                  {i < journeySteps.length - 1 && (
                    <div className="hidden lg:block absolute top-[22px] -right-2 translate-x-1/2 opacity-20 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300">
                      <ChevronRight className="w-6 h-6 text-primary" />
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-10 container mx-auto px-4 py-32">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-4">
            Advanced Toolset
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-foreground mb-6 tracking-tight">
            Everything You Need to <span className="gradient-text">Trade Safely</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-medium">
            Professional-grade risk management tools designed specifically for prop firm traders.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-6 gap-6 md:grid-rows-2">
          {/* Main Large Feature */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="md:col-span-3 md:row-span-2 group relative rounded-3xl overflow-hidden border border-primary/10 bg-background/40 backdrop-blur-xl p-10 hover:border-primary/30 transition-all duration-500"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative z-10 h-full flex flex-col">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-8 ring-1 ring-primary/20 group-hover:ring-primary/50 transition-all group-hover:scale-110 group-hover:rotate-3 duration-500">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-3xl font-black text-foreground mb-4 group-hover:text-primary transition-colors">
                Real-Time Risk Monitoring
              </h3>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8 flex-grow">
                Active monitoring of every trade, ensuring you never exceed your daily or max drawdown limits. Our low-latency engine executes checks in milliseconds.
              </p>

              <div className="mt-auto pt-8 border-t border-border/50">
                <div className="flex items-center gap-6">
                  <div className="flex flex-col">
                    <span className="text-2xl font-black text-foreground">0.1ms</span>
                    <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Execution Speed</span>
                  </div>
                  <div className="w-[1px] h-8 bg-border/50" />
                  <div className="flex flex-col">
                    <span className="text-2xl font-black text-foreground">24/7</span>
                    <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Uptime Guard</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* AI Insights - Small Top */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="md:col-span-3 group relative rounded-3xl overflow-hidden border border-primary/10 bg-background/40 backdrop-blur-xl p-8 hover:border-primary/30 transition-all duration-500"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="flex gap-6 items-start">
              <div className="w-14 h-14 shrink-0 rounded-2xl bg-primary/5 flex items-center justify-center ring-1 ring-primary/10 group-hover:ring-primary/40 transition-all group-hover:scale-110 duration-500">
                <Activity className="w-7 h-7 text-primary" />
              </div>
              <div className="relative z-10">
                <h4 className="text-xl font-black text-foreground mb-2 group-hover:text-primary transition-colors">AI Behavioral Insights</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Identify patterns of overtrading and revenge trading before they blow your account.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Portfolio Analysis - Small Bottom */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="md:col-span-3 group relative rounded-3xl overflow-hidden border border-primary/10 bg-background/40 backdrop-blur-xl p-8 hover:border-primary/30 transition-all duration-500"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="flex gap-6 items-start">
              <div className="w-14 h-14 shrink-0 rounded-2xl bg-primary/5 flex items-center justify-center ring-1 ring-primary/10 group-hover:ring-primary/40 transition-all group-hover:scale-110 duration-500">
                <Target className="w-7 h-7 text-primary" />
              </div>
              <div className="relative z-10">
                <h4 className="text-xl font-black text-foreground mb-2 group-hover:text-primary transition-colors">Portfolio Exposure</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Track correlated exposure across multiple accounts to prevent systemic risk.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative z-10 container mx-auto px-4 py-32 overflow-hidden">
        {/* Background Decorative Element */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/5 blur-[120px] rounded-full pointer-events-none -z-10" />

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-4">
            User Trust
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-foreground mb-6 tracking-tight">
            Trusted by the <span className="gradient-text">Best in the Business</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
              <div className="glass-card p-6 h-full flex flex-col border-primary/10 hover:border-primary/30 transition-all duration-500 relative z-10">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>

                <p className="text-base font-medium text-foreground mb-6 italic leading-relaxed">
                  "{testimonial.quote}"
                </p>

                <div className="mt-auto flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center border border-primary/10 shrink-0">
                    <span className="text-sm font-black text-primary">{testimonial.name.charAt(0)}</span>
                  </div>
                  <div className="flex flex-col">
                    <div className="font-bold text-foreground flex items-center gap-2">
                      {testimonial.name}
                      <div className="w-3 h-3 rounded-full bg-status-safe flex items-center justify-center">
                        <CheckCircle className="w-2 h-2 text-white" />
                      </div>
                    </div>
                    <div className="text-muted-foreground text-xs font-medium">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Markets Section */}
      <section id="markets" className="relative z-10 container mx-auto px-4 py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ x: -30, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1"
          >
            <div className="grid grid-cols-2 gap-4">
              {[
                { name: "Forex", pairs: "50+ Major & Minor Pairs", icon: <Globe className="w-5 h-5 text-primary" /> },
                { name: "Indices", pairs: "US30, NAS100, DAX40", icon: <TrendingUp className="w-5 h-5 text-primary" /> },
                { name: "Metals", pairs: "Gold, Silver, Platinum", icon: <Zap className="w-5 h-5 text-primary" /> },
                { name: "Crypto", pairs: "BTC, ETH, SOL", icon: <Activity className="w-5 h-5 text-primary" /> },
              ].map((market, i) => (
                <div key={i} className="p-6 glass-card-hover border-primary/10 hover:border-primary/40 transition-all bg-background/40 backdrop-blur-sm">
                  <div className="mb-3">{market.icon}</div>
                  <div className="text-foreground font-bold mb-1">{market.name}</div>
                  <div className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">{market.pairs}</div>
                </div>
              ))}
            </div>
          </motion.div>
          <div className="order-1 lg:order-2">
            <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-6">
              Asset Coverage
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              Trade Your Edge, <br /> <span className="text-primary italic">On Any Market.</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              RiskLock is built to adapt. Whether you're scalping Gold on a 1-minute chart or swing trading Forex pairs, our engine handles the math for you.
            </p>
            <Link to="/markets">
              <Button variant="outline" className="gap-2 h-12 px-8">
                View All Instruments <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="relative z-10 container mx-auto px-4 py-32">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-4">
            Flexible Scaling
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-foreground mb-6 tracking-tight">
            Professional <span className="gradient-text">Pricing</span>
          </h2>
          <p className="text-muted-foreground text-lg font-medium">
            Start free, upgrade as your trading career scales.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-start">
          {/* Basic Plan */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="glass-card p-10 hover:border-primary/20 transition-all duration-500"
          >
            <div className="text-xl font-black text-foreground mb-2">Basic</div>
            <div className="flex items-baseline gap-1 mb-8">
              <span className="text-5xl font-black text-foreground">$19</span>
              <span className="text-muted-foreground font-bold">/mo</span>
            </div>
            <ul className="space-y-4 mb-10">
              {["1 Trading Account", "Risk Lock Protection", "Basic Analytics", "Email Support"].map((item) => (
                <li key={item} className="flex items-center gap-3 text-muted-foreground font-medium">
                  <CheckCircle className="w-5 h-5 text-status-safe" />
                  {item}
                </li>
              ))}
            </ul>
            <Link to="/signup">
              <Button variant="outline" className="w-full h-14 border-primary/20 hover:bg-primary/5">Get Started</Button>
            </Link>
          </motion.div>

          {/* Pro Plan */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="glass-card p-10 border-primary/40 relative transform lg:-translate-y-4 shadow-glow-md bg-background/60"
          >
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-primary text-primary-foreground text-[10px] font-black uppercase tracking-widest shadow-lg">
              Most Popular
            </div>
            <div className="text-xl font-black text-foreground mb-2">Pro</div>
            <div className="flex items-baseline gap-1 mb-8">
              <span className="text-5xl font-black text-foreground">$49</span>
              <span className="text-muted-foreground font-bold">/mo</span>
            </div>
            <ul className="space-y-4 mb-10">
              {[
                "Unlimited Accounts",
                "All Risk Features",
                "News Protection",
                "Advanced Analytics",
                "Trade Journal",
                "Priority Support",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-foreground font-bold">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  {item}
                </li>
              ))}
            </ul>
            <Link to="/signup">
              <Button variant="hero" className="w-full h-14 shadow-glow-sm">Start Trial</Button>
            </Link>
          </motion.div>

          {/* Elite Plan - COMING SOON */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="glass-card p-10 opacity-80 hover:opacity-100 transition-all duration-500 border-dashed border-primary/30 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            <div className="absolute top-4 right-4 text-[10px] font-black text-primary uppercase tracking-widest opacity-50">
              Coming Soon
            </div>
            <div className="text-xl font-black text-foreground mb-2">Elite</div>
            <div className="flex items-baseline gap-1 mb-8">
              <span className="text-5xl font-black text-foreground">Elite</span>
            </div>
            <ul className="space-y-4 mb-10">
              {[
                "Predictive AI Risk Engine",
                "Neural Behavioral Modeling",
                "Institutional Flow Analytics",
                "Multi-Dimensional Risk Scoring",
                "White-Glove Concierge Support",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-muted-foreground font-medium italic">
                  <Lock className="w-5 h-5 text-primary/40" />
                  {item}
                </li>
              ))}
            </ul>
            <Button variant="ghost" disabled className="w-full h-14 border border-primary/10">Coming Early 2026</Button>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="relative z-10 container mx-auto px-4 py-32">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {[
              { q: "How does RiskLock connect to my account?", a: "We use MetaApi to establish a secure, read-only or trade-authorized connection to your MT4/MT5 broker in seconds." },
              { q: "Will this work with my prop firm?", a: "Yes! RiskLock is designed specifically to mirror the rules of major firms like FTMO, MyFundedFX, and more." },
              { q: "Can I manage multiple accounts?", a: "Absolutely. Our Pro plan allows for unlimited account connections with a centralized risk dashboard." },
            ].map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-2xl bg-secondary/30 border border-border/50"
              >
                <div className="font-bold text-foreground mb-2 text-lg">Q: {faq.q}</div>
                <div className="text-muted-foreground">{faq.a}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 container mx-auto px-4 py-24 mb-12">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="glass-card p-12 lg:p-16 text-center bg-gradient-to-b from-primary/10 to-transparent"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Ready to Trade With Confidence?
          </h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of traders who trust RiskLock to protect their accounts
            and enforce discipline. Start your free trial today.
          </p>
          <Link to="/signup">
            <Button variant="hero" size="xl" className="h-16 px-12 text-lg">
              Start Your Trial
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
          <Link to="/login" className="text-primary hover:underline">
            Sign in
          </Link>
        </motion.div>
      </section>

    </div>
  );
}

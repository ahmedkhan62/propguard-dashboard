import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  Shield,
  TrendingUp,
  Zap,
  Lock,
  Newspaper,
  Target,
  CheckCircle,
  ArrowRight,
  Star,
} from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Risk Lock Protection",
    description: "Automatically lock trading when daily or total loss limits are hit. Never blow an account again.",
  },
  {
    icon: Target,
    title: "Prop Firm Presets",
    description: "Pre-configured rules for FTMO, FundedNext, The5ers and more. One-click setup.",
  },
  {
    icon: Newspaper,
    title: "News Protection",
    description: "Auto-block trading during high-impact news events. Protect your gains from volatility.",
  },
  {
    icon: Zap,
    title: "Real-Time Monitoring",
    description: "Live tracking of all risk metrics. Instant alerts when approaching limits.",
  },
  {
    icon: Lock,
    title: "Discipline Enforcement",
    description: "Overtrading protection, cooldown periods, and loss streak alerts built-in.",
  },
  {
    icon: TrendingUp,
    title: "Performance Analytics",
    description: "Track win rate, R:R, and progress towards targets with beautiful charts.",
  },
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
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Hero Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 border-b border-border/50 backdrop-blur-lg">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-primary" />
            </div>
            <span className="font-bold text-xl text-foreground">RiskLock</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link to="/signup">
              <Button variant="hero">Start Free Trial</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 container mx-auto px-4 py-24 lg:py-32">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-8">
            <Zap className="w-4 h-4" />
            Trusted by 10,000+ prop firm traders
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
            Pass Your Prop Firm Challenge{" "}
            <span className="gradient-text">Without Breaking Rules</span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Automated risk protection that enforces discipline, prevents account blowups, 
            and helps you trade with confidence. Never fail a challenge from rule violations again.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/signup">
              <Button variant="hero" size="xl">
                Start Free Trial
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button variant="hero-outline" size="xl">
                View Dashboard
              </Button>
            </Link>
          </div>

          <div className="flex items-center justify-center gap-8 mt-12 text-muted-foreground text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-status-safe" />
              7-day free trial
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-status-safe" />
              No credit card required
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-status-safe" />
              Cancel anytime
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 container mx-auto px-4 py-24">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Everything You Need to Trade Safely
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Professional-grade risk management tools designed specifically for prop firm traders
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass-card-hover p-8"
            >
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                <feature.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Who It's For Section */}
      <section className="relative z-10 container mx-auto px-4 py-24">
        <div className="glass-card p-12 lg:p-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Built for Serious Traders
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                Whether you're taking your first evaluation or managing multiple funded accounts, 
                RiskLock gives you the discipline and protection you need.
              </p>
              <div className="space-y-4">
                {[
                  "Evaluation traders preparing for challenges",
                  "Funded traders protecting their accounts",
                  "Forex, Gold, Indices, and Crypto traders",
                  "Traders who struggle with discipline",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-status-safe/10 flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-status-safe" />
                    </div>
                    <span className="text-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Traders Protected", value: "10K+" },
                { label: "Accounts Saved", value: "25K+" },
                { label: "Success Rate", value: "94%" },
                { label: "Avg. Time Saved", value: "12h/wk" },
              ].map((stat) => (
                <div key={stat.label} className="glass-card p-6 text-center">
                  <div className="text-3xl font-bold gradient-text mb-2">
                    {stat.value}
                  </div>
                  <div className="text-muted-foreground text-sm">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative z-10 container mx-auto px-4 py-24">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Trusted by Prop Traders Worldwide
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass-card p-8"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-foreground mb-6">"{testimonial.quote}"</p>
              <div>
                <div className="font-semibold text-foreground">{testimonial.name}</div>
                <div className="text-muted-foreground text-sm">{testimonial.role}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="relative z-10 container mx-auto px-4 py-24">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-muted-foreground text-lg">
            Start free, upgrade when you're ready
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Basic Plan */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="glass-card p-8"
          >
            <div className="text-lg font-semibold text-foreground mb-2">Basic</div>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-4xl font-bold text-foreground">$19</span>
              <span className="text-muted-foreground">/month</span>
            </div>
            <ul className="space-y-3 mb-8">
              {["1 Trading Account", "Risk Lock Protection", "Basic Analytics", "Email Support"].map((item) => (
                <li key={item} className="flex items-center gap-3 text-muted-foreground">
                  <CheckCircle className="w-4 h-4 text-status-safe" />
                  {item}
                </li>
              ))}
            </ul>
            <Button variant="outline" className="w-full">Get Started</Button>
          </motion.div>

          {/* Pro Plan */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="glass-card p-8 border-primary/30 relative"
          >
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-medium">
              Most Popular
            </div>
            <div className="text-lg font-semibold text-foreground mb-2">Pro</div>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-4xl font-bold text-foreground">$49</span>
              <span className="text-muted-foreground">/month</span>
            </div>
            <ul className="space-y-3 mb-8">
              {[
                "Unlimited Accounts",
                "All Risk Features",
                "News Protection",
                "Advanced Analytics",
                "Trade Journal",
                "Priority Support",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-muted-foreground">
                  <CheckCircle className="w-4 h-4 text-status-safe" />
                  {item}
                </li>
              ))}
            </ul>
            <Button variant="hero" className="w-full">Start Free Trial</Button>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 container mx-auto px-4 py-24">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="glass-card p-12 lg:p-16 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Ready to Trade With Confidence?
          </h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of traders who trust RiskLock to protect their accounts 
            and enforce discipline. Start your free trial today.
          </p>
          <Link to="/signup">
            <Button variant="hero" size="xl">
              Start Your Free Trial
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border/50 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-primary" />
              </div>
              <span className="font-semibold text-foreground">RiskLock</span>
            </div>
            <div className="flex items-center gap-6 text-muted-foreground text-sm">
              <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
              <a href="#" className="hover:text-foreground transition-colors">Terms</a>
              <a href="#" className="hover:text-foreground transition-colors">Support</a>
            </div>
            <div className="text-muted-foreground text-sm">
              © 2025 RiskLock. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

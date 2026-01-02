import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Landing from "./pages/Landing";
import Features from "./pages/Features";
import Markets from "./pages/Markets";
import WhyChooseUs from "./pages/WhyChooseUs";
import HowItWorks from "./pages/HowItWorks";
import Security from "./pages/Security";
import About from "./pages/About";
import ReportsPage from "./pages/ReportsPage";
import IdeasManagement from "./pages/admin/IdeasManagement";
import ComplaintsManagement from "./pages/admin/ComplaintsManagement";
import HelpCenter from "./pages/HelpCenter";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Disclaimer from "./pages/Disclaimer";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import PropFirmSetup from "./pages/PropFirmSetup";
import RiskManagement from "./pages/RiskManagement";
import NewsProtection from "./pages/NewsProtection";
import TradeJournal from "./pages/TradeJournal";
import Alerts from "./pages/Alerts";
import Reports from "./pages/Reports";
import Billing from "./pages/Billing";
import Pricing from "./pages/Pricing";
import Settings from "./pages/Settings";
import Transparency from "./pages/Transparency";
import Portfolio from "./pages/Portfolio";
import Ideas from "./pages/Ideas";
import Complaints from "./pages/Complaints";
import LiveSupport from "./pages/LiveSupport";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminUsers from "./pages/admin/Users";
import AdminBilling from "./pages/admin/Billing";
import AdminHealth from "./pages/admin/Health";
import AdminControls from "./pages/admin/Controls";
import AdminAlerts from "./pages/admin/Alerts";
import AdminIdeas from "./pages/admin/IdeasManagement";
import AdminComplaints from "./pages/admin/ComplaintsManagement";
import AdminSupport from "./pages/admin/SupportControlCenter";
import AdminTeam from "./pages/admin/TeamManagement";
import GrowthAnalytics from "./pages/admin/GrowthAnalytics";
import NotFound from "./pages/NotFound";
import { ChatWidget } from "./components/shared/ChatWidget";
import Onboarding from "./pages/Onboarding";
import Referral from "./pages/Referral";

import { PublicLayout } from "./components/shared/PublicLayout";
import { AdminLayout } from "./components/admin/AdminLayout";
import { DashboardLayout } from "./components/layout/DashboardLayout";

import { AuthProvider, useAuth } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";

const queryClient = new QueryClient();

const AdminGuard = ({ children }: { children: React.ReactNode }) => {
  const { user, isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" />;
  const adminRoles = ["FOUNDER", "STAFF", "SUPPORT", "ANALYST", "MODERATOR"];
  if (!user || !adminRoles.includes(user.role)) return <Navigate to="/dashboard" />;
  return <>{children}</>;
};

// Basic Auth Guard for Onboarding page (so it doesn't redirect to itself)
const OnboardingGuard = ({ children }: { children: React.ReactNode }) => {
  const { user, isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" />;
  if (!user || user.role !== "USER") return <Navigate to="/admin/dashboard" />;
  if (user.is_onboarded) return <Navigate to="/dashboard" />; // Already done
  return <>{children}</>;
};

const TraderGuard = ({ children }: { children: React.ReactNode }) => {
  const { user, isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" />;
  if (!user || user.role !== "USER") return <Navigate to="/admin/dashboard" />;
  if (!user.is_onboarded) return <Navigate to="/onboarding" />; // Enforce Onboarding
  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <ChatWidget />
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/onboarding" element={<OnboardingGuard><Onboarding /></OnboardingGuard>} />

              <Route path="/disclaimer" element={<PublicLayout><Disclaimer /></PublicLayout>} />
              <Route path="/" element={<PublicLayout><Landing /></PublicLayout>} />
              <Route path="/pricing" element={<PublicLayout><Pricing /></PublicLayout>} />
              <Route path="/features" element={<PublicLayout><Features /></PublicLayout>} />
              <Route path="/markets" element={<PublicLayout><Markets /></PublicLayout>} />
              <Route path="/how-it-works" element={<PublicLayout><HowItWorks /></PublicLayout>} />
              <Route path="/why-us" element={<PublicLayout><WhyChooseUs /></PublicLayout>} />
              <Route path="/security" element={<PublicLayout><Security /></PublicLayout>} />
              <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
              <Route path="/reports-proof" element={<PublicLayout><ReportsPage /></PublicLayout>} />
              <Route path="/help" element={<PublicLayout><HelpCenter /></PublicLayout>} />
              <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />
              <Route path="/privacy" element={<PublicLayout><Privacy /></PublicLayout>} />
              <Route path="/terms" element={<PublicLayout><Terms /></PublicLayout>} />
              <Route path="/pricing" element={<PublicLayout><Pricing /></PublicLayout>} />

              {/* Founder Portal Routes */}
              <Route path="/admin/dashboard" element={<AdminGuard><AdminLayout><AdminDashboard /></AdminLayout></AdminGuard>} />
              <Route path="/admin/users" element={<AdminGuard><AdminLayout><AdminUsers /></AdminLayout></AdminGuard>} />
              <Route path="/admin/billing" element={<AdminGuard><AdminLayout><AdminBilling /></AdminLayout></AdminGuard>} />
              <Route path="/admin/health" element={<AdminGuard><AdminLayout><AdminHealth /></AdminLayout></AdminGuard>} />
              <Route path="/admin/controls" element={<AdminGuard><AdminLayout><AdminControls /></AdminLayout></AdminGuard>} />
              <Route path="/admin/alerts" element={<AdminGuard><AdminLayout><AdminAlerts /></AdminLayout></AdminGuard>} />
              <Route path="/admin/ideas" element={<AdminGuard><AdminLayout><AdminIdeas /></AdminLayout></AdminGuard>} />
              <Route path="/admin/complaints" element={<AdminGuard><AdminLayout><AdminComplaints /></AdminLayout></AdminGuard>} />
              <Route path="/admin/support" element={<AdminGuard><AdminLayout><AdminSupport /></AdminLayout></AdminGuard>} />
              <Route path="/admin/support" element={<AdminGuard><AdminLayout><AdminSupport /></AdminLayout></AdminGuard>} />
              <Route path="/admin/team" element={<AdminGuard><AdminLayout><AdminTeam /></AdminLayout></AdminGuard>} />
              <Route path="/admin/growth" element={<AdminGuard><AdminLayout><GrowthAnalytics /></AdminLayout></AdminGuard>} />

              <Route path="/dashboard" element={<TraderGuard><Dashboard /></TraderGuard>} />
              <Route path="/referrals" element={<TraderGuard><Referral /></TraderGuard>} />
              <Route path="/portfolio" element={<TraderGuard><Portfolio /></TraderGuard>} />
              <Route path="/prop-firm" element={<TraderGuard><PropFirmSetup /></TraderGuard>} />
              <Route path="/risk" element={<TraderGuard><RiskManagement /></TraderGuard>} />
              <Route path="/news" element={<TraderGuard><NewsProtection /></TraderGuard>} />
              <Route path="/journal" element={<TraderGuard><TradeJournal /></TraderGuard>} />
              <Route path="/alerts" element={<TraderGuard><Alerts /></TraderGuard>} />
              <Route path="/reports" element={<TraderGuard><Reports /></TraderGuard>} />
              <Route path="/billing" element={<TraderGuard><Billing /></TraderGuard>} />
              <Route path="/settings" element={<TraderGuard><Settings /></TraderGuard>} />
              <Route path="/transparency" element={<TraderGuard><Transparency /></TraderGuard>} />
              <Route path="/ideas" element={<TraderGuard><Ideas /></TraderGuard>} />
              <Route path="/complaints" element={<TraderGuard><Complaints /></TraderGuard>} />
              <Route path="/support" element={<TraderGuard><LiveSupport /></TraderGuard>} />
              <Route path="/" element={<PublicLayout><Landing /></PublicLayout>} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;

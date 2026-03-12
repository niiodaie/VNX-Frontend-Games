import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Offers from "./pages/Offers";
import Wallet from "./pages/Wallet";
import Leaderboard from "./pages/Leaderboard";
import Referrals from "./pages/Referrals";
import Profile from "./pages/Profile";
import Redeem from "./pages/Redeem";
import Tournaments from "./pages/Tournaments";
import Challenges from "./pages/Challenges";
import Squads from "./pages/Squads";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminUsers from "./pages/admin/Users";
import AdminRedemptions from "./pages/admin/Redemptions";
import Navigation from "./components/Navigation";
import { useAuth } from "./_core/hooks/useAuth";

function Router() {
  const { isAuthenticated, user } = useAuth();
  const isAdmin = user?.role === "admin";

  return (
    <Switch>
      <Route path="/" component={Home} />
      {isAuthenticated && (
        <>
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/offers" component={Offers} />
          <Route path="/wallet" component={Wallet} />
          <Route path="/leaderboard" component={Leaderboard} />
          <Route path="/referrals" component={Referrals} />
          <Route path="/profile" component={Profile} />
          <Route path="/redeem" component={Redeem} />
          <Route path="/tournaments" component={Tournaments} />
          <Route path="/challenges" component={Challenges} />
          <Route path="/squads" component={Squads} />
        </>
      )}
      {isAdmin && (
        <>
          <Route path="/admin" component={AdminDashboard} />
          <Route path="/admin/users" component={AdminUsers} />
          <Route path="/admin/redemptions" component={AdminRedemptions} />
        </>
      )}
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <div className="min-h-screen bg-background text-foreground">
            {isAuthenticated && <Navigation />}
            <Toaster />
            <Router />
          </div>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;

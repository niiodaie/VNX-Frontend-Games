import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { Gamepad2, Trophy, Gift, Users, TrendingUp, Zap } from "lucide-react";

export default function Home() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-background to-background">
      {/* Navigation */}
      <nav className="glass-dark border-b border-white/10 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl neon-glow">
            <Gamepad2 className="w-6 h-6 text-indigo-500" />
            vPlay
          </div>
          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <Link href="/dashboard">
                <Button>Go to Dashboard</Button>
              </Link>
            ) : (
              <a href={getLoginUrl()}>
                <Button>Start Playing</Button>
              </a>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance">
            Play Games.
            <span className="bg-gradient-accent bg-clip-text text-transparent"> Win Competitions.</span>
            <br />
            Earn Real Rewards.
          </h1>
          <p className="text-xl text-muted-foreground mb-8 text-balance">
            Join millions of gamers on vPlay. Discover games, complete challenges, compete in tournaments, and earn coins that you can redeem for real rewards.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {isAuthenticated ? (
              <Link href="/dashboard">
                <Button size="lg" className="gradient-primary">
                  Enter Dashboard
                </Button>
              </Link>
            ) : (
              <a href={getLoginUrl()}>
                <Button size="lg" className="gradient-primary">
                  Start Playing Now
                </Button>
              </a>
            )}
            <Link href="#how-it-works">
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 border-t border-white/10">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">Why Choose vPlay?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Gamepad2,
                title: "Discover Games",
                description: "Access a curated selection of mobile games and complete sponsored offers to earn coins.",
              },
              {
                icon: Trophy,
                title: "Compete & Win",
                description: "Join tournaments, participate in challenges, and climb the leaderboards to earn bigger rewards.",
              },
              {
                icon: Gift,
                title: "Real Rewards",
                description: "Redeem your coins for gift cards, cash equivalents, and exclusive merchandise.",
              },
              {
                icon: Users,
                title: "Build Squads",
                description: "Create teams with friends and compete together in squad-based challenges.",
              },
              {
                icon: TrendingUp,
                title: "Level Up",
                description: "Gain XP, unlock achievements, and progress through levels as you play.",
              },
              {
                icon: Zap,
                title: "Daily Rewards",
                description: "Spin the wheel daily, maintain streaks, and earn bonus coins every day.",
              },
            ].map((feature, i) => {
              const Icon = feature.icon;
              return (
                <div key={i} className="glass-hover p-6">
                  <Icon className="w-12 h-12 text-indigo-500 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 border-t border-white/10">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">How It Works</h2>
          <div className="max-w-3xl mx-auto space-y-8">
            {[
              { step: 1, title: "Sign Up", description: "Create your vPlay account in seconds with social login." },
              { step: 2, title: "Play & Earn", description: "Discover games, complete offers, and participate in challenges to earn coins." },
              { step: 3, title: "Compete", description: "Join tournaments, climb leaderboards, and earn bonus rewards." },
              { step: 4, title: "Redeem", description: "Convert your coins into real rewards like gift cards and cash." },
            ].map((item) => (
              <div key={item.step} className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-indigo-600 neon-glow">
                    <span className="text-lg font-bold">{item.step}</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 border-t border-white/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Start Earning?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of gamers already earning real rewards on vPlay. Sign up today and get your first bonus coins!
          </p>
          {isAuthenticated ? (
            <Link href="/dashboard">
              <Button size="lg" className="gradient-primary">
                Go to Dashboard
              </Button>
            </Link>
          ) : (
            <a href={getLoginUrl()}>
              <Button size="lg" className="gradient-primary">
                Start Playing Now
              </Button>
            </a>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-semibold mb-4">Platform</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition">Dashboard</a></li>
                <li><a href="#" className="hover:text-foreground transition">Games</a></li>
                <li><a href="#" className="hover:text-foreground transition">Tournaments</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Community</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition">Leaderboard</a></li>
                <li><a href="#" className="hover:text-foreground transition">Squads</a></li>
                <li><a href="#" className="hover:text-foreground transition">Referrals</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Rewards</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition">Marketplace</a></li>
                <li><a href="#" className="hover:text-foreground transition">Redemption</a></li>
                <li><a href="#" className="hover:text-foreground transition">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition">Terms</a></li>
                <li><a href="#" className="hover:text-foreground transition">Privacy</a></li>
                <li><a href="#" className="hover:text-foreground transition">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2026 vPlay. All rights reserved. Play Games. Win Competitions. Earn Real Rewards.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

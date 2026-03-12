import { useState } from "react";
import { Link } from "wouter";
import { Menu, X, LogOut, User, Coins } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/_core/hooks/useAuth";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();

  const navLinks = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Offers", href: "/offers" },
    { label: "Games", href: "/games" },
    { label: "Tournaments", href: "/tournaments" },
    { label: "Challenges", href: "/challenges" },
    { label: "Squads", href: "/squads" },
    { label: "Leaderboard", href: "/leaderboard" },
    { label: "Wallet", href: "/wallet" },
    { label: "Redeem", href: "/redeem" },
    { label: "Referrals", href: "/referrals" },
  ];

  return (
    <nav className="sticky top-0 z-50 glass-dark border-b border-white/10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/dashboard">
            <a className="flex items-center gap-2 font-bold text-xl neon-glow">
              <Coins className="w-6 h-6 text-indigo-500" />
              vPlay
            </a>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <a className="px-3 py-2 rounded-lg text-sm font-medium hover:bg-white/10 transition-colors">
                  {link.label}
                </a>
              </Link>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {/* Coin Balance Placeholder */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10">
              <Coins className="w-4 h-4 text-green-500" />
              <span className="font-semibold">0</span>
            </div>

            {/* User Menu */}
            <div className="flex items-center gap-2">
              <Link href="/profile">
                <Button variant="ghost" size="icon">
                  <User className="w-4 h-4" />
                </Button>
              </Link>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => logout()}
              >
                <LogOut className="w-4 h-4" />
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden mt-4 space-y-2 border-t border-white/10 pt-4">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <a
                  className="block px-3 py-2 rounded-lg text-sm font-medium hover:bg-white/10 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </a>
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}

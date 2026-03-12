'use client'

import { useAuth } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useEffect } from 'react'
import { Wallet, Gamepad2, Gift, Trophy, Users, User, LogOut, Menu } from 'lucide-react'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { isLoaded, userId } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (isLoaded && !userId) {
      router.push('/sign-in')
    }
  }, [isLoaded, userId, router])

  if (!isLoaded) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  const navItems = [
    { href: '/dashboard', label: 'Dashboard', icon: Gamepad2 },
    { href: '/games', label: 'Games', icon: Gamepad2 },
    { href: '/offers', label: 'Offers', icon: Gift },
    { href: '/rewards', label: 'Rewards', icon: Trophy },
    { href: '/leaderboard', label: 'Leaderboard', icon: Trophy },
    { href: '/referrals', label: 'Referrals', icon: Users },
    { href: '/profile', label: 'Profile', icon: User },
  ]

  return (
    <div className="flex min-h-screen bg-dark">
      {/* Sidebar */}
      <aside className="w-64 glass-effect border-r border-white/10 p-6">
        <div className="text-2xl font-bold gradient-primary bg-clip-text text-transparent mb-8">vPlay</div>
        <nav className="space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition text-gray-300 hover:text-white"
            >
              <item.icon size={20} />
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="mt-8 pt-8 border-t border-white/10">
          <button
            onClick={() => router.push('/sign-out')}
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition text-gray-300 hover:text-white w-full"
          >
            <LogOut size={20} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  )
}

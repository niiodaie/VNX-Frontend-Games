'use client'

export const dynamic = 'force-dynamic'

import { useAuth } from '@clerk/nextjs'
import { api } from '@/convex/_generated/api'
import { Wallet, Zap, Trophy, Flame } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function Dashboard() {
  const { userId, isLoaded } = useAuth()
  const [user, setUser] = React.useState<any>(null)

  React.useEffect(() => {
    if (isLoaded && userId) {
      api.users.getUserByClerkId({ clerkId: userId }).then(setUser)
    }
  }, [isLoaded, userId])

  if (!isLoaded || !user) {
    return <div className="p-8">Loading...</div>
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Welcome back, {user.username}!</h1>
        <p className="text-gray-400">Keep playing to earn more vBits</p>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        {[
          { icon: Wallet, label: 'vBits Balance', value: user.vBits, color: 'text-primary' },
          { icon: Zap, label: 'Total Earned', value: user.totalEarned, color: 'text-yellow-400' },
          { icon: Trophy, label: 'Rank', value: '#1,234', color: 'text-purple-400' },
          { icon: Flame, label: 'Daily Streak', value: '7 days', color: 'text-orange-400' },
        ].map((stat, i) => (
          <div key={i} className="glass-effect p-6 rounded-xl">
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-400">{stat.label}</span>
              <stat.icon size={24} className={stat.color} />
            </div>
            <div className="text-3xl font-bold">{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-3 gap-6">
        {[
          { href: '/games', title: 'Play Games', desc: 'Discover and play games', icon: '🎮' },
          { href: '/offers', title: 'Complete Offers', desc: 'Earn vBits from tasks', icon: '✅' },
          { href: '/rewards', title: 'Redeem Rewards', desc: 'Convert vBits to rewards', icon: '🎁' },
        ].map((action, i) => (
          <Link
            key={i}
            href={action.href}
            className="glass-hover p-6 rounded-xl group"
          >
            <div className="text-4xl mb-4">{action.icon}</div>
            <h3 className="text-xl font-bold mb-2">{action.title}</h3>
            <p className="text-gray-400 group-hover:text-gray-300 transition">{action.desc}</p>
          </Link>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="mt-8 glass-effect p-6 rounded-xl">
        <h2 className="text-2xl font-bold mb-4">Recent Activity</h2>
        <div className="space-y-4">
          <div className="flex justify-between items-center py-3 border-b border-white/10">
            <span className="text-gray-300">Completed: Math Quiz</span>
            <span className="text-green-400">+100 vBits</span>
          </div>
          <div className="flex justify-between items-center py-3 border-b border-white/10">
            <span className="text-gray-300">Daily Login Bonus</span>
            <span className="text-green-400">+50 vBits</span>
          </div>
          <div className="flex justify-between items-center py-3">
            <span className="text-gray-300">Referral Bonus</span>
            <span className="text-green-400">+200 vBits</span>
          </div>
        </div>
      </div>
    </div>
  )
}

'use client'

export const dynamic = 'force-dynamic'

import { useAuth } from '@clerk/nextjs'
import { api } from '@/convex/_generated/api'
import React, { useState } from 'react'
import { User, Globe, Clock, Copy } from 'lucide-react'

export default function ProfilePage() {
  const { userId, isLoaded } = useAuth()
  const [user, setUser] = React.useState<any>(null)
  const [copied, setCopied] = React.useState(false)

  React.useEffect(() => {
    if (isLoaded && userId) {
      api.users.getUserByClerkId({ clerkId: userId }).then(setUser)
    }
  }, [isLoaded, userId])

  const copyReferralCode = () => {
    if (user?.referralCode) {
      navigator.clipboard.writeText(user.referralCode)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  if (!user) {
    return <div className="p-8">Loading...</div>
  }

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-8">Profile</h1>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="md:col-span-2 glass-effect p-8 rounded-xl">
          <div className="flex items-center gap-6 mb-8">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center">
              <User size={48} />
            </div>
            <div>
              <h2 className="text-3xl font-bold">{user.username}</h2>
              <p className="text-gray-400">{user.email}</p>
            </div>
          </div>

          <div className="space-y-6">
            {/* Basic Info */}
            <div>
              <h3 className="text-xl font-bold mb-4">Basic Information</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-white/10">
                  <span className="text-gray-400">Username</span>
                  <span className="font-semibold">{user.username}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-white/10">
                  <span className="text-gray-400">Email</span>
                  <span className="font-semibold">{user.email}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-white/10">
                  <span className="text-gray-400">Country</span>
                  <span className="font-semibold">{user.country}</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-gray-400">Language</span>
                  <span className="font-semibold capitalize">{user.language}</span>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div>
              <h3 className="text-xl font-bold mb-4">Statistics</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="glass-effect p-4 rounded-lg">
                  <div className="text-gray-400 text-sm mb-1">Total Earned</div>
                  <div className="text-2xl font-bold text-green-400">{user.totalEarned}</div>
                </div>
                <div className="glass-effect p-4 rounded-lg">
                  <div className="text-gray-400 text-sm mb-1">Current Balance</div>
                  <div className="text-2xl font-bold text-primary">{user.vBits}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Referral Card */}
        <div className="glass-effect p-8 rounded-xl h-fit">
          <h3 className="text-xl font-bold mb-6">Referral Code</h3>
          <div className="bg-white/5 border border-white/10 rounded-lg p-4 mb-4">
            <div className="text-sm text-gray-400 mb-2">Your Code</div>
            <div className="text-lg font-mono font-bold break-all">{user.referralCode}</div>
          </div>
          <button
            onClick={copyReferralCode}
            className="w-full px-4 py-3 bg-primary hover:bg-indigo-600 rounded-lg font-semibold transition flex items-center justify-center gap-2"
          >
            <Copy size={18} />
            {copied ? 'Copied!' : 'Copy Code'}
          </button>
          <p className="text-sm text-gray-400 mt-4">
            Share your code to earn 100 vBits for each friend who joins!
          </p>
        </div>
      </div>
    </div>
  )
}

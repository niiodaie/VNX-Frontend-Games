'use client'

export const dynamic = 'force-dynamic'
import { Copy, Users, Gift } from 'lucide-react'
import { useState } from 'react'
export default function ReferralsPage() {
  const [copied, setCopied] = useState(false)
  const referralCode = 'VPLAY2024'
  const copyLink = () => {
    const link = `https://vplay.com?ref=${referralCode}`
    navigator.clipboard.writeText(link)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-8">Referral Program</h1>
      {/* Referral Stats */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {[
          { icon: Users, label: 'Friends Invited', value: '12' },
          { icon: Gift, label: 'Bonus Earned', value: '1,200 vBits' },
          { icon: Users, label: 'Active Referrals', value: '8' },
        ].map((stat, i) => (
          <div key={i} className="glass-effect p-6 rounded-xl">
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-400">{stat.label}</span>
              <stat.icon size={24} className="text-primary" />
            </div>
            <div className="text-3xl font-bold">{stat.value}</div>
          </div>
        ))}
      </div>
      {/* How It Works */}
      <div className="glass-effect p-8 rounded-xl mb-8">
        <h2 className="text-2xl font-bold mb-6">How It Works</h2>
        <div className="space-y-4">
          {[
            { step: 1, title: 'Share Your Code', desc: 'Copy your referral code and share it with friends' },
            { step: 2, title: 'Friends Sign Up', desc: 'Your friends create an account using your code' },
            { step: 3, title: 'Earn Bonuses', desc: 'Get 100 vBits for each friend who joins' },
            { step: 4, title: 'Earn More', desc: 'Get 10% of their earnings for life' },
          ].map((item, i) => (
            <div key={i} className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center font-bold">
                {item.step}
              </div>
              <div>
                <h3 className="font-semibold mb-1">{item.title}</h3>
                <p className="text-gray-400">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Referral Link */}
      <div className="glass-effect p-8 rounded-xl">
        <h2 className="text-2xl font-bold mb-6">Your Referral Link</h2>
        <div className="bg-white/5 border border-white/10 rounded-lg p-4 mb-4">
          <div className="text-sm text-gray-400 mb-2">Share this link</div>
          <div className="text-sm font-mono break-all">https://vplay.com?ref={referralCode}</div>
        </div>
        <button
          onClick={copyLink}
          className="w-full px-6 py-3 bg-primary hover:bg-indigo-600 rounded-lg font-semibold transition flex items-center justify-center gap-2"
        >
          <Copy size={20} />
          {copied ? 'Link Copied!' : 'Copy Referral Link'}
        </button>
      </div>
    </div>
  )
}

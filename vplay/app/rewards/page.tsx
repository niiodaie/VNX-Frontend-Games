'use client'

export const dynamic = 'force-dynamic'
import { Gift, Check } from 'lucide-react'
import { useState } from 'react'
export default function RewardsPage() {
  const [selectedCategory, setSelectedCategory] = useState('giftcard')
  const rewards = [
    { id: 1, title: 'Amazon Gift Card $10', cost: 10000, category: 'giftcard', icon: '🎁' },
    { id: 2, title: 'Amazon Gift Card $25', cost: 25000, category: 'giftcard', icon: '🎁' },
    { id: 3, title: 'Starbucks Gift Card $5', cost: 5000, category: 'giftcard', icon: '☕' },
    { id: 4, title: 'PayPal Cash $10', cost: 10000, category: 'cash', icon: '💰' },
    { id: 5, title: 'PayPal Cash $25', cost: 25000, category: 'cash', icon: '💰' },
    { id: 6, title: 'Bitcoin 0.0001 BTC', cost: 50000, category: 'crypto', icon: '₿' },
  ]
  const categories = [
    { id: 'giftcard', label: 'Gift Cards' },
    { id: 'cash', label: 'Cash' },
    { id: 'crypto', label: 'Crypto' },
  ]
  const filteredRewards = rewards.filter((r) => r.category === selectedCategory)
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Rewards Marketplace</h1>
        <p className="text-gray-400">Redeem your vBits for real rewards</p>
      </div>
      {/* Category Filter */}
      <div className="flex gap-4 mb-8 overflow-x-auto">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-6 py-2 rounded-lg whitespace-nowrap transition ${
              selectedCategory === cat.id
                ? 'bg-primary text-white'
                : 'glass-hover'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>
      {/* Rewards Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRewards.map((reward: any) => (
          <div key={reward.id} className="glass-effect p-6 rounded-xl flex flex-col">
            <div className="text-5xl mb-4">{reward.icon}</div>
            <h3 className="text-xl font-bold mb-2">{reward.title}</h3>
            <div className="mt-auto">
              <div className="text-3xl font-bold text-primary mb-4">{reward.cost.toLocaleString()}</div>
              <div className="text-sm text-gray-400 mb-4">vBits</div>
              <button className="w-full px-4 py-3 bg-primary hover:bg-indigo-600 rounded-lg font-semibold transition flex items-center justify-center gap-2">
                <Gift size={18} />
                Redeem Now
              </button>
            </div>
          </div>
        ))}
      </div>
      {/* Info Section */}
      <div className="mt-12 glass-effect p-8 rounded-xl">
        <h2 className="text-2xl font-bold mb-4">Important Information</h2>
        <ul className="space-y-3 text-gray-300">
          <li className="flex gap-3">
            <Check size={20} className="text-green-400 flex-shrink-0 mt-1" />
            <span>Rewards are processed within 24-48 hours</span>
          </li>
          <li className="flex gap-3">
            <Check size={20} className="text-green-400 flex-shrink-0 mt-1" />
            <span>You must have a verified account to redeem</span>
          </li>
          <li className="flex gap-3">
            <Check size={20} className="text-green-400 flex-shrink-0 mt-1" />
            <span>Minimum redemption is 1,000 vBits</span>
          </li>
          <li className="flex gap-3">
            <Check size={20} className="text-green-400 flex-shrink-0 mt-1" />
            <span>All rewards are delivered electronically</span>
          </li>
        </ul>
      </div>
    </div>
  )
}

'use client'

export const dynamic = 'force-dynamic'
import { api } from '@/convex/_generated/api'
import { CheckCircle, Clock, Award } from 'lucide-react'
import { useState } from 'react'
import React from 'react'
export default function OffersPage() {
  const [selectedType, setSelectedType] = useState<string | undefined>()
  const [offers, setOffers] = React.useState<any[]>([])
  React.useEffect(() => {
    api.games.listOffers().then(setOffers)
  }, [])
  const types = ['survey', 'app', 'video', 'task']
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-8">Offer Wall</h1>
      <p className="text-gray-400 mb-8">Complete tasks and earn vBits instantly</p>
      {/* Type Filter */}
      <div className="flex gap-4 mb-8 overflow-x-auto">
        <button
          onClick={() => setSelectedType(undefined)}
          className={`px-6 py-2 rounded-lg whitespace-nowrap transition ${
            selectedType === undefined
              ? 'bg-primary text-white'
              : 'glass-hover'
          }`}
        >
          All Offers
        </button>
        {types.map((type) => (
          <button
            key={type}
            onClick={() => setSelectedType(type)}
            className={`px-6 py-2 rounded-lg whitespace-nowrap transition capitalize ${
              selectedType === type
                ? 'bg-primary text-white'
                : 'glass-hover'
            }`}
          >
            {type}
          </button>
        ))}
      </div>
      {/* Offers List */}
      {offers.length === 0 ? (
        <div className="text-center py-12">Loading offers...</div>
      ) : (
        <div className="space-y-4">
          {offers.map((offer: any) => (
            <div key={offer._id} className="glass-effect p-6 rounded-xl flex items-center justify-between group hover:bg-white/10 transition">
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-2">{offer.title}</h3>
                <p className="text-gray-400 mb-4">{offer.description}</p>
                <div className="flex gap-6 text-sm">
                  <span className="text-gray-400 capitalize">Type: {offer.type}</span>
                  <span className="text-gray-400">Provider: {offer.provider}</span>
                </div>
              </div>
              <div className="flex items-center gap-6 ml-6">
                <div className="text-right">
                  <div className="text-2xl font-bold text-green-400">+{offer.reward}</div>
                  <div className="text-xs text-gray-400">vBits</div>
                </div>
                <button className="px-6 py-3 bg-primary hover:bg-indigo-600 rounded-lg font-semibold transition whitespace-nowrap">
                  Complete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

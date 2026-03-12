'use client'

export const dynamic = 'force-dynamic'
import { api } from '@/convex/_generated/api'
import React, { useState } from 'react'
import { Gamepad2, Clock, Award } from 'lucide-react'
export default function GamesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>()
  const [games, setGames] = React.useState<any[]>([])
  React.useEffect(() => {
    api.games.listGames().then(setGames)
  }, [])
  const categories = ['Action', 'Puzzle', 'Strategy', 'Casual', 'Educational']
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-8">Discover Games</h1>
      {/* Category Filter */}
      <div className="flex gap-4 mb-8 overflow-x-auto">
        <button
          onClick={() => setSelectedCategory(undefined)}
          className={`px-6 py-2 rounded-lg whitespace-nowrap transition ${
            selectedCategory === undefined
              ? 'bg-primary text-white'
              : 'glass-hover'
          }`}
        >
          All Games
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-6 py-2 rounded-lg whitespace-nowrap transition ${
              selectedCategory === cat
                ? 'bg-primary text-white'
                : 'glass-hover'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
      {/* Games Grid */}
      {games.length === 0 ? (
        <div className="text-center py-12">Loading games...</div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {games && games.map((game: any) => (
            <div key={game._id} className="glass-hover rounded-xl overflow-hidden group">
              <div className="aspect-video bg-gradient-to-br from-primary/20 to-purple-600/20 flex items-center justify-center">
                <Gamepad2 size={48} className="text-primary/50" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{game.title}</h3>
                <p className="text-gray-400 text-sm mb-4">{game.description}</p>
                <div className="flex gap-4 mb-4 text-sm">
                  <div className="flex items-center gap-1 text-gray-400">
                    <Clock size={16} />
                    {game.estimatedTime}m
                  </div>
                  <div className="flex items-center gap-1 text-green-400">
                    <Award size={16} />
                    +{game.maxReward} vBits
                  </div>
                </div>
                <button className="w-full px-4 py-2 bg-primary hover:bg-indigo-600 rounded-lg font-semibold transition">
                  Play Now
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

'use client'

export const dynamic = 'force-dynamic'
import { api } from '@/convex/_generated/api'
import { Trophy, Medal } from 'lucide-react'
import React from 'react'
export default function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = React.useState<any[]>([])
  React.useEffect(() => {
    api.leaderboard.getLeaderboard().then(setLeaderboard)
  }, [])
  const getMedalIcon = (rank: number) => {
    if (rank === 1) return '🥇'
    if (rank === 2) return '🥈'
    if (rank === 3) return '🥉'
    return rank
  }
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Global Leaderboard</h1>
        <p className="text-gray-400">Top earners this month</p>
      </div>
      {/* Leaderboard Table */}
      {leaderboard.length === 0 ? (
        <div className="text-center py-12">Loading leaderboard...</div>
      ) : (
        <div className="glass-effect rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="px-6 py-4 text-left text-gray-400">Rank</th>
                  <th className="px-6 py-4 text-left text-gray-400">Player</th>
                  <th className="px-6 py-4 text-left text-gray-400">Country</th>
                  <th className="px-6 py-4 text-right text-gray-400">Total Earned</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map((entry: any) => (
                  <tr key={entry._id} className="border-b border-white/10 hover:bg-white/5 transition">
                    <td className="px-6 py-4">
                      <span className="text-lg font-bold">
                        {getMedalIcon(entry.rank)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-semibold">{entry.user?.username}</div>
                        <div className="text-sm text-gray-400">{entry.user?.country}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-400">{entry.user?.country}</td>
                    <td className="px-6 py-4 text-right">
                      <span className="text-lg font-bold text-green-400">
                        {entry.totalEarned.toLocaleString()}
                      </span>
                      <div className="text-xs text-gray-400">vBits</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

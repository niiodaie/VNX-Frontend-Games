'use client'

import { useAuth } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowRight, Zap, Trophy, Gift } from 'lucide-react'

export default function Home() {
  const { isSignedIn } = useAuth()
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark via-dark-secondary to-dark">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-effect backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold gradient-primary bg-clip-text text-transparent">vPlay</div>
          <div className="flex gap-4">
            {isSignedIn ? (
              <>
                <Link href="/dashboard" className="px-4 py-2 rounded-lg hover:bg-white/10 transition">Dashboard</Link>
                <Link href="/profile" className="px-4 py-2 rounded-lg hover:bg-white/10 transition">Profile</Link>
              </>
            ) : (
              <>
                <Link href="/sign-in" className="px-4 py-2 rounded-lg hover:bg-white/10 transition">Sign In</Link>
                <Link href="/sign-up" className="px-4 py-2 rounded-lg bg-primary hover:bg-indigo-600 transition">Sign Up</Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl sm:text-7xl font-bold mb-6 gradient-accent bg-clip-text text-transparent">
            Play Games. Earn Real Rewards.
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join millions of gamers on vPlay. Discover games, complete challenges, compete in tournaments, and earn vBits that you can redeem for real rewards.
          </p>
          <div className="flex gap-4 justify-center">
            {!isSignedIn && (
              <>
                <button
                  onClick={() => router.push('/sign-up')}
                  className="px-8 py-4 bg-primary hover:bg-indigo-600 rounded-lg font-semibold flex items-center gap-2 transition neon-glow"
                >
                  Start Playing <ArrowRight size={20} />
                </button>
                <button
                  onClick={() => router.push('/sign-in')}
                  className="px-8 py-4 glass-hover rounded-lg font-semibold transition"
                >
                  Sign In
                </button>
              </>
            )}
            {isSignedIn && (
              <button
                onClick={() => router.push('/dashboard')}
                className="px-8 py-4 bg-primary hover:bg-indigo-600 rounded-lg font-semibold flex items-center gap-2 transition neon-glow"
              >
                Go to Dashboard <ArrowRight size={20} />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/5">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">Why vPlay?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Zap, title: 'Instant Rewards', desc: 'Earn vBits instantly for completing games and challenges' },
              { icon: Trophy, title: 'Compete & Win', desc: 'Join tournaments and compete against players worldwide' },
              { icon: Gift, title: 'Redeem Anytime', desc: 'Convert your vBits to gift cards, cash, and more' },
            ].map((feature, i) => (
              <div key={i} className="glass-hover p-6">
                <feature.icon size={40} className="text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-300">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center glass-effect p-12 rounded-2xl">
          <h2 className="text-3xl font-bold mb-4">Ready to start earning?</h2>
          <p className="text-gray-300 mb-8">Join vPlay today and start your gaming rewards journey</p>
          {!isSignedIn && (
            <button
              onClick={() => router.push('/sign-up')}
              className="px-8 py-4 bg-primary hover:bg-indigo-600 rounded-lg font-semibold transition neon-glow"
            >
              Create Free Account
            </button>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center text-gray-400">
          <p>&copy; 2024 vPlay. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

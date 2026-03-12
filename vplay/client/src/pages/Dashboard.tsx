import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Coins, Zap, Flame, TrendingUp, Gamepad2, Trophy, Users } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Welcome Back!</h1>
        <p className="text-muted-foreground">Check your progress and discover new opportunities to earn.</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card className="glass-hover p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Coin Balance</p>
              <p className="text-3xl font-bold">0</p>
            </div>
            <Coins className="w-8 h-8 text-green-500" />
          </div>
        </Card>

        <Card className="glass-hover p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">XP Level</p>
              <p className="text-3xl font-bold">1</p>
            </div>
            <TrendingUp className="w-8 h-8 text-indigo-500" />
          </div>
        </Card>

        <Card className="glass-hover p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Daily Streak</p>
              <p className="text-3xl font-bold">0</p>
            </div>
            <Flame className="w-8 h-8 text-amber-500" />
          </div>
        </Card>

        <Card className="glass-hover p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Lifetime Earnings</p>
              <p className="text-3xl font-bold">0</p>
            </div>
            <Zap className="w-8 h-8 text-yellow-500" />
          </div>
        </Card>
      </div>

      {/* Daily Rewards & Spin */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Daily Login */}
        <Card className="glass-hover p-6 lg:col-span-1">
          <h3 className="text-lg font-semibold mb-4">Daily Login Reward</h3>
          <p className="text-muted-foreground mb-4">Claim your daily bonus coins!</p>
          <Button className="w-full gradient-primary">Claim Reward</Button>
        </Card>

        {/* Spin Wheel */}
        <Card className="glass-hover p-6 lg:col-span-1">
          <h3 className="text-lg font-semibold mb-4">Daily Spin</h3>
          <p className="text-muted-foreground mb-4">Spin for a chance to win big!</p>
          <Button className="w-full gradient-success">Spin Now</Button>
        </Card>

        {/* Streak Bonus */}
        <Card className="glass-hover p-6 lg:col-span-1">
          <h3 className="text-lg font-semibold mb-4">Streak Bonus</h3>
          <p className="text-muted-foreground mb-4">Keep your streak alive for extra rewards!</p>
          <Button className="w-full" variant="outline">View Rewards</Button>
        </Card>
      </div>

      {/* Quick Access */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card className="glass-hover p-6 cursor-pointer hover:border-indigo-500 transition">
          <Gamepad2 className="w-8 h-8 text-indigo-500 mb-3" />
          <h3 className="font-semibold mb-1">Offers</h3>
          <p className="text-sm text-muted-foreground">Complete sponsored tasks</p>
        </Card>

        <Card className="glass-hover p-6 cursor-pointer hover:border-indigo-500 transition">
          <Trophy className="w-8 h-8 text-amber-500 mb-3" />
          <h3 className="font-semibold mb-1">Tournaments</h3>
          <p className="text-sm text-muted-foreground">Compete for big prizes</p>
        </Card>

        <Card className="glass-hover p-6 cursor-pointer hover:border-indigo-500 transition">
          <Users className="w-8 h-8 text-green-500 mb-3" />
          <h3 className="font-semibold mb-1">Squads</h3>
          <p className="text-sm text-muted-foreground">Team up with friends</p>
        </Card>

        <Card className="glass-hover p-6 cursor-pointer hover:border-indigo-500 transition">
          <TrendingUp className="w-8 h-8 text-pink-500 mb-3" />
          <h3 className="font-semibold mb-1">Leaderboard</h3>
          <p className="text-sm text-muted-foreground">See top earners</p>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="glass-hover p-6">
        <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
        <div className="space-y-4">
          <p className="text-muted-foreground text-center py-8">No recent activity yet. Start playing to see your activity here!</p>
        </div>
      </Card>
    </div>
  );
}

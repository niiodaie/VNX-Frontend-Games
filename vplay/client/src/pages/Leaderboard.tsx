import { Card } from "@/components/ui/card";
import { Trophy, Medal } from "lucide-react";

export default function Leaderboard() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Leaderboard</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="glass-hover p-6 lg:col-span-2">
          <h3 className="text-lg font-semibold mb-4">Top Earners</h3>
          <div className="space-y-4">
            <p className="text-muted-foreground text-center py-8">No users yet. Be the first to earn!</p>
          </div>
        </Card>
        
        <Card className="glass-hover p-6">
          <h3 className="text-lg font-semibold mb-4">Your Rank</h3>
          <div className="text-center">
            <Trophy className="w-12 h-12 text-amber-500 mx-auto mb-4" />
            <p className="text-3xl font-bold mb-2">#0</p>
            <p className="text-muted-foreground">Start earning to climb the leaderboard!</p>
          </div>
        </Card>
      </div>
    </div>
  );
}

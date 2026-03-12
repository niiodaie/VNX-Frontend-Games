import { Card } from "@/components/ui/card";
import { Coins, TrendingUp, Clock } from "lucide-react";

export default function Wallet() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Wallet</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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
              <p className="text-sm text-muted-foreground mb-1">Lifetime Earnings</p>
              <p className="text-3xl font-bold">0</p>
            </div>
            <TrendingUp className="w-8 h-8 text-indigo-500" />
          </div>
        </Card>
        <Card className="glass-hover p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Pending Rewards</p>
              <p className="text-3xl font-bold">0</p>
            </div>
            <Clock className="w-8 h-8 text-amber-500" />
          </div>
        </Card>
      </div>

      <Card className="glass-hover p-6">
        <h3 className="text-lg font-semibold mb-4">Transaction History</h3>
        <div className="text-center py-8 text-muted-foreground">
          No transactions yet. Start earning to see your transaction history!
        </div>
      </Card>
    </div>
  );
}

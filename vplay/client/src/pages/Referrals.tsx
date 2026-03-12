import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Users, Coins } from "lucide-react";

export default function Referrals() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Referrals</h1>
      
      <Card className="glass-hover p-6 mb-8">
        <h3 className="text-lg font-semibold mb-4">Your Referral Link</h3>
        <div className="flex gap-2">
          <input 
            type="text" 
            value="https://vplay.com/ref/USER123" 
            readOnly 
            className="flex-1 px-4 py-2 rounded-lg bg-white/5 border border-white/10"
          />
          <Button variant="outline" size="icon">
            <Copy className="w-4 h-4" />
          </Button>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="glass-hover p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Friends Invited</p>
              <p className="text-3xl font-bold">0</p>
            </div>
            <Users className="w-8 h-8 text-indigo-500" />
          </div>
        </Card>
        <Card className="glass-hover p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Referral Earnings</p>
              <p className="text-3xl font-bold">0</p>
            </div>
            <Coins className="w-8 h-8 text-green-500" />
          </div>
        </Card>
        <Card className="glass-hover p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Bonus Unlocked</p>
              <p className="text-3xl font-bold">0</p>
            </div>
            <Coins className="w-8 h-8 text-yellow-500" />
          </div>
        </Card>
      </div>
    </div>
  );
}

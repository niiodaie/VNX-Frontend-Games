import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Gift } from "lucide-react";

export default function Redeem() {
  const rewards = [
    { id: 1, name: "Amazon Gift Card $10", coins: 1000, value: "$10" },
    { id: 2, name: "Amazon Gift Card $25", coins: 2500, value: "$25" },
    { id: 3, name: "PayPal $50", coins: 5000, value: "$50" },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Rewards Marketplace</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rewards.map((reward) => (
          <Card key={reward.id} className="glass-hover p-6">
            <Gift className="w-8 h-8 text-indigo-500 mb-4" />
            <h3 className="text-lg font-semibold mb-2">{reward.name}</h3>
            <p className="text-sm text-muted-foreground mb-4">Value: {reward.value}</p>
            <Button className="w-full gradient-primary">Redeem for {reward.coins} Coins</Button>
          </Card>
        ))}
      </div>
    </div>
  );
}

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Gamepad2, Clock, BarChart3 } from "lucide-react";

export default function Offers() {
  const offers = [
    { id: 1, title: "Install Mobile Game", coins: 500, difficulty: "Easy", time: "5 min" },
    { id: 2, title: "Reach Level 10", coins: 1000, difficulty: "Medium", time: "30 min" },
    { id: 3, title: "Complete 5 Levels", coins: 2000, difficulty: "Hard", time: "2 hours" },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-2">Offers</h1>
      <p className="text-muted-foreground mb-8">Complete sponsored tasks and earn coins.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {offers.map((offer) => (
          <Card key={offer.id} className="glass-hover p-6">
            <Gamepad2 className="w-8 h-8 text-indigo-500 mb-4" />
            <h3 className="text-lg font-semibold mb-2">{offer.title}</h3>
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm">
                <BarChart3 className="w-4 h-4" />
                <span>{offer.difficulty}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="w-4 h-4" />
                <span>{offer.time}</span>
              </div>
            </div>
            <Button className="w-full gradient-primary">Earn {offer.coins} Coins</Button>
          </Card>
        ))}
      </div>
    </div>
  );
}

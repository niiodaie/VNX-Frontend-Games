import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";

export default function Challenges() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Challenges</h1>
      <p className="text-muted-foreground mb-8">Complete sponsored challenges and earn exclusive rewards!</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="glass-hover p-6">
          <Zap className="w-8 h-8 text-yellow-500 mb-4" />
          <h3 className="text-lg font-semibold mb-2">Play 3 Games This Week</h3>
          <p className="text-sm text-muted-foreground mb-4">Reward: 2,000 coins</p>
          <Button className="w-full gradient-primary">Accept Challenge</Button>
        </Card>
      </div>
    </div>
  );
}

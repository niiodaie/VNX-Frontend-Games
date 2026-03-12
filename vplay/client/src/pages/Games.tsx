import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Gamepad2 } from "lucide-react";

export default function Games() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Games</h1>
      <p className="text-muted-foreground mb-8">Discover and play games to earn coins!</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="glass-hover p-6">
          <Gamepad2 className="w-8 h-8 text-indigo-500 mb-4" />
          <h3 className="text-lg font-semibold mb-2">Featured Game</h3>
          <p className="text-sm text-muted-foreground mb-4">Earn coins by playing</p>
          <Button className="w-full gradient-primary">Play Now</Button>
        </Card>
      </div>
    </div>
  );
}

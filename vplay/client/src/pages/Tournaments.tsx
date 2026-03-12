import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trophy } from "lucide-react";

export default function Tournaments() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Tournaments</h1>
      <p className="text-muted-foreground mb-8">Compete against other players and win big prizes!</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="glass-hover p-6">
          <Trophy className="w-8 h-8 text-amber-500 mb-4" />
          <h3 className="text-lg font-semibold mb-2">Weekly Championship</h3>
          <p className="text-sm text-muted-foreground mb-4">Prize Pool: 50,000 coins</p>
          <Button className="w-full gradient-primary">Join Tournament</Button>
        </Card>
      </div>
    </div>
  );
}

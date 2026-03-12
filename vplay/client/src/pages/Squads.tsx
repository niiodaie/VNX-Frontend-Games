import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";

export default function Squads() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Squads</h1>
      <p className="text-muted-foreground mb-8">Create or join a squad and compete with your friends!</p>
      
      <Button className="mb-8 gradient-primary">Create Squad</Button>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="glass-hover p-6">
          <Users className="w-8 h-8 text-indigo-500 mb-4" />
          <h3 className="text-lg font-semibold mb-2">Squad Name</h3>
          <p className="text-sm text-muted-foreground mb-4">Members: 1/5</p>
          <Button className="w-full" variant="outline">View Squad</Button>
        </Card>
      </div>
    </div>
  );
}

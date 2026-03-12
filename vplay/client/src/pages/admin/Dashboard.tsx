import { Card } from "@/components/ui/card";
import { Users, TrendingUp, Gift, AlertTriangle } from "lucide-react";

export default function AdminDashboard() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="glass-hover p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total Users</p>
              <p className="text-3xl font-bold">0</p>
            </div>
            <Users className="w-8 h-8 text-indigo-500" />
          </div>
        </Card>
        <Card className="glass-hover p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Offers Completed</p>
              <p className="text-3xl font-bold">0</p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-500" />
          </div>
        </Card>
        <Card className="glass-hover p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Rewards Paid</p>
              <p className="text-3xl font-bold">0</p>
            </div>
            <Gift className="w-8 h-8 text-amber-500" />
          </div>
        </Card>
        <Card className="glass-hover p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Fraud Flags</p>
              <p className="text-3xl font-bold">0</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-red-500" />
          </div>
        </Card>
      </div>
    </div>
  );
}

import { useAuth } from "@/_core/hooks/useAuth";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle } from "lucide-react";

export default function AdminRedemptions() {
  const { user } = useAuth();

  if (user?.role !== "admin") {
    return <div className="container mx-auto px-4 py-8">Access Denied</div>;
  }

  // TODO: Implement with real data from tRPC
  const pendingRedemptions = [
    {
      id: 1,
      userId: 1,
      username: "player123",
      rewardType: "Amazon $25",
      coinsSpent: 2500,
      createdAt: new Date(),
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Redemption Approvals</h1>

      <Card className="glass-hover p-6">
        <h3 className="text-lg font-semibold mb-4">Pending Redemptions</h3>
        <div className="space-y-4">
          {pendingRedemptions.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">No pending redemptions</p>
          ) : (
            pendingRedemptions.map((redemption) => (
              <div
                key={redemption.id}
                className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10"
              >
                <div className="flex-1">
                  <p className="font-medium">{redemption.username}</p>
                  <p className="text-sm text-muted-foreground">
                    {redemption.rewardType} • {redemption.coinsSpent} coins
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {redemption.createdAt.toLocaleString()}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-green-500 hover:text-green-400"
                  >
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Approve
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-red-500 hover:text-red-400"
                  >
                    <XCircle className="w-4 h-4 mr-1" />
                    Reject
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </Card>
    </div>
  );
}

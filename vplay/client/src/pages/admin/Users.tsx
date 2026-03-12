import { useAuth } from "@/_core/hooks/useAuth";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import { Shield, AlertTriangle, CheckCircle } from "lucide-react";
import { useState } from "react";

export default function AdminUsers() {
  const { user } = useAuth();
  const [selectedUser, setSelectedUser] = useState<number | null>(null);
  const [flagReason, setFlagReason] = useState("");
  const [flagSeverity, setFlagSeverity] = useState<"low" | "medium" | "high">("medium");

  const usersQuery = trpc.admin.getUsers.useQuery({ limit: 50, offset: 0 });
  const flagUserMutation = trpc.admin.flagUser.useMutation();
  const getFraudFlagsQuery = trpc.admin.getFraudFlags.useQuery(
    { userId: selectedUser || 0 },
    { enabled: !!selectedUser }
  );

  if (user?.role !== "admin") {
    return <div className="container mx-auto px-4 py-8">Access Denied</div>;
  }

  const handleFlagUser = async () => {
    if (!selectedUser || !flagReason) return;
    await flagUserMutation.mutateAsync({
      userId: selectedUser,
      reason: flagReason,
      severity: flagSeverity,
    });
    setFlagReason("");
    setSelectedUser(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">User Management</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Users List */}
        <Card className="glass-hover p-6 lg:col-span-2">
          <h3 className="text-lg font-semibold mb-4">All Users</h3>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {usersQuery.data?.users.map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 cursor-pointer transition"
                onClick={() => setSelectedUser(user.id)}
              >
                <div>
                  <p className="font-medium">{user.username || "Anonymous"}</p>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
                <div className="flex items-center gap-2">
                  {user.role === "admin" && <Shield className="w-4 h-4 text-indigo-500" />}
                  {user.riskScore > 50 && <AlertTriangle className="w-4 h-4 text-red-500" />}
                </div>
              </div>
            ))}
          </div>
          <p className="text-sm text-muted-foreground mt-4">Total: {usersQuery.data?.total} users</p>
        </Card>

        {/* User Details & Fraud Flags */}
        {selectedUser && (
          <Card className="glass-hover p-6">
            <h3 className="text-lg font-semibold mb-4">User Details</h3>

            {/* Fraud Flags */}
            <div className="mb-6">
              <h4 className="font-medium mb-2">Fraud Flags</h4>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {getFraudFlagsQuery.data?.flags.map((flag) => (
                  <div
                    key={flag.id}
                    className={`p-2 rounded text-sm ${
                      flag.severity === "high"
                        ? "bg-red-500/20 text-red-300"
                        : flag.severity === "medium"
                          ? "bg-amber-500/20 text-amber-300"
                          : "bg-blue-500/20 text-blue-300"
                    }`}
                  >
                    <p className="font-medium">{flag.reason}</p>
                    <p className="text-xs opacity-75">{flag.severity.toUpperCase()}</p>
                  </div>
                ))}
                {getFraudFlagsQuery.data?.flags.length === 0 && (
                  <p className="text-sm text-muted-foreground">No flags</p>
                )}
              </div>
            </div>

            {/* Flag User Form */}
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium mb-1">Reason</label>
                <textarea
                  value={flagReason}
                  onChange={(e) => setFlagReason(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm"
                  placeholder="Describe the issue..."
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Severity</label>
                <select
                  value={flagSeverity}
                  onChange={(e) => setFlagSeverity(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              <Button
                onClick={handleFlagUser}
                className="w-full"
                variant="destructive"
              >
                Flag User
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}

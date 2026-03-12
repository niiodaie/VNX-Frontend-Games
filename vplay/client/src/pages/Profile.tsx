import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Mail, Globe } from "lucide-react";

export default function Profile() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Profile</h1>
      
      <Card className="glass-hover p-6 max-w-2xl">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Username</label>
            <input type="text" placeholder="Your username" className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10" />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input type="email" placeholder="your@email.com" className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10" />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Country</label>
            <select className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10">
              <option>Select your country</option>
              <option>United States</option>
              <option>Canada</option>
              <option>UK</option>
            </select>
          </div>
          
          <Button className="w-full gradient-primary">Save Changes</Button>
        </div>
      </Card>
    </div>
  );
}

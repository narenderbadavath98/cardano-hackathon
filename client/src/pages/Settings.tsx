import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Save } from "lucide-react";

export default function Settings() {
  return (
    <Layout>
       <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-heading font-bold text-white mb-1">Settings</h1>
          <p className="text-muted-foreground">Configure your orchestrator parameters and integrations</p>
        </div>

        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full max-w-[400px] grid-cols-2 bg-black/20">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general">
            <Card className="glass-card mt-6">
              <CardHeader>
                <CardTitle>Preferences</CardTitle>
                <CardDescription>Manage your interface and notification settings.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base text-white">Dark Mode</Label>
                    <p className="text-sm text-muted-foreground">Always active for Cyber theme.</p>
                  </div>
                  <Switch checked disabled />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base text-white">Auto-Approve Low Cost Tasks</Label>
                    <p className="text-sm text-muted-foreground">Automatically sign txs under 10 ADA.</p>
                  </div>
                  <Switch />
                </div>
                <Button className="bg-primary text-primary-foreground"><Save className="w-4 h-4 mr-2" /> Save Changes</Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="integrations">
             <Card className="glass-card mt-6">
              <CardHeader>
                <CardTitle>API Keys</CardTitle>
                <CardDescription>Connect external services.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>OpenAI API Key</Label>
                  <Input type="password" placeholder="sk-..." className="bg-black/20 border-white/10" />
                </div>
                <div className="space-y-2">
                  <Label>Cardano Wallet (Blockfrost)</Label>
                  <Input type="password" placeholder="mainnet..." className="bg-black/20 border-white/10" />
                </div>
                 <Button className="bg-primary text-primary-foreground"><Save className="w-4 h-4 mr-2" /> Save Keys</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}

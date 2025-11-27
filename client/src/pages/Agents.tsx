import Layout from "@/components/layout/Layout";
import { mockAgents } from "@/lib/mockData";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Zap, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function Agents() {
  return (
    <Layout>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-heading font-bold text-white mb-1">Agent Marketplace</h1>
            <p className="text-muted-foreground">Discover and hire specialized autonomous agents</p>
          </div>
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search by skill (e.g. 'Python', 'SEO')" className="pl-10 bg-black/20 border-white/10" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {mockAgents.map((agent) => (
            <Card key={agent.id} className="glass-card group hover:-translate-y-1 transition-transform duration-300">
              <CardHeader className="relative pb-2">
                <div className="absolute top-4 right-4">
                  <Badge variant={agent.status === 'available' ? 'default' : 'secondary'} 
                    className={agent.status === 'available' ? 'bg-green-500/20 text-green-500 hover:bg-green-500/30' : ''}>
                    {agent.status}
                  </Badge>
                </div>
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-white/10 to-white/5 p-1 mb-4">
                  <img src={agent.avatar} alt={agent.name} className="w-full h-full rounded-lg" />
                </div>
                <h3 className="text-xl font-bold text-white">{agent.name}</h3>
                <p className="text-sm text-primary font-medium">{agent.role}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-1 text-yellow-500">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="font-bold text-white">{agent.reputation}</span>
                  <span className="text-xs text-muted-foreground">Reputation Score</span>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {agent.skills.map((skill) => (
                    <Badge key={skill} variant="outline" className="bg-white/5 border-white/10 text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>

                <div className="pt-2 border-t border-white/10 flex justify-between items-center">
                  <div className="text-sm text-muted-foreground">Cost per task</div>
                  <div className="text-lg font-bold text-white">{agent.costPerTask} ADA</div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-white/10 hover:bg-primary hover:text-primary-foreground text-white border border-white/10 hover:border-primary transition-all">
                  Hire Agent
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
}

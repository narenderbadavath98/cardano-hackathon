import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { mockWorkflows, mockAgents } from "@/lib/mockData";
import { Plus, ArrowUpRight, Activity, Users, CheckCircle, Clock } from "lucide-react";
import { Link } from "wouter";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area
} from "recharts";

const data = [
  { name: "Mon", tasks: 4, cost: 240 },
  { name: "Tue", tasks: 3, cost: 139 },
  { name: "Wed", tasks: 9, cost: 980 },
  { name: "Thu", tasks: 6, cost: 390 },
  { name: "Fri", tasks: 8, cost: 480 },
  { name: "Sat", tasks: 2, cost: 100 },
  { name: "Sun", tasks: 5, cost: 250 },
];

export default function Dashboard() {
  return (
    <Layout>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-heading font-bold text-white mb-1">Dashboard</h1>
            <p className="text-muted-foreground">Overview of your autonomous agent operations</p>
          </div>
          <Link href="/workflow/create">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_15px_rgba(6,182,212,0.4)]">
              <Plus className="w-5 h-5 mr-2" /> Create New Workflow
            </Button>
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="glass-card border-l-4 border-l-primary">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Active Workflows</CardTitle>
              <Activity className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{mockWorkflows.filter(w => w.status === 'running').length}</div>
              <p className="text-xs text-muted-foreground mt-1">+2 from yesterday</p>
            </CardContent>
          </Card>

          <Card className="glass-card border-l-4 border-l-purple-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Agents</CardTitle>
              <Users className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{mockAgents.length}</div>
              <p className="text-xs text-muted-foreground mt-1">3 agents currently busy</p>
            </CardContent>
          </Card>

          <Card className="glass-card border-l-4 border-l-green-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Completed Tasks</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">128</div>
              <p className="text-xs text-muted-foreground mt-1">Across 15 workflows</p>
            </CardContent>
          </Card>

          <Card className="glass-card border-l-4 border-l-yellow-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Pending Actions</CardTitle>
              <Clock className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">4</div>
              <p className="text-xs text-muted-foreground mt-1">Requires approval</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4 glass-card">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-white">Task Execution History</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="colorTasks" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(199, 89%, 48%)" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(199, 89%, 48%)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                  <XAxis dataKey="name" stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'hsl(222, 47%, 11%)', borderColor: '#333', borderRadius: '8px' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Area type="monotone" dataKey="tasks" stroke="hsl(199, 89%, 48%)" strokeWidth={3} fillOpacity={1} fill="url(#colorTasks)" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="col-span-3 glass-card">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-white">Cost Analysis (ADA)</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                  <XAxis dataKey="name" stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip 
                    cursor={{fill: 'rgba(255,255,255,0.05)'}}
                    contentStyle={{ backgroundColor: 'hsl(222, 47%, 11%)', borderColor: '#333', borderRadius: '8px' }}
                  />
                  <Bar dataKey="cost" fill="hsl(262, 83%, 58%)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Recent Workflows List */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-white">Recent Workflows</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockWorkflows.map((wf) => (
                <div key={wf.id} className="flex items-center justify-between p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border border-white/5">
                  <div className="flex items-center gap-4">
                    <div className={`w-2 h-2 rounded-full ${
                      wf.status === 'running' ? 'bg-primary animate-pulse' : 
                      wf.status === 'completed' ? 'bg-green-500' : 'bg-yellow-500'
                    }`} />
                    <div>
                      <p className="font-medium text-white">{wf.title}</p>
                      <p className="text-sm text-muted-foreground">{wf.createdAt} • {wf.agentCount} Agents</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right hidden sm:block">
                      <p className="text-sm font-medium text-white">{wf.progress}%</p>
                      <p className="text-xs text-muted-foreground">Progress</p>
                    </div>
                    <Link href={`/workflow/${wf.id}`}>
                      <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-white">
                        <ArrowUpRight className="w-5 h-5" />
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}

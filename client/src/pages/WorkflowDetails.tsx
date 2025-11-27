import Layout from "@/components/layout/Layout";
import { useParams } from "wouter";
import { getWorkflow, mockAgents } from "@/lib/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ReactFlow, { 
  Background, 
  Controls, 
  MiniMap,
  useNodesState,
  useEdgesState,
  MarkerType,
  NodeProps,
  Handle,
  Position
} from "reactflow";
import { useMemo, useEffect } from "react";
import { Bot, CheckCircle2, Clock, AlertCircle, Activity, FileText, CreditCard } from "lucide-react";
import { cn } from "@/lib/utils";

// Custom Node Component
const CustomNode = ({ data }: NodeProps) => {
  const statusColor = 
    data.status === 'completed' ? 'bg-green-500/20 border-green-500' :
    data.status === 'running' ? 'bg-primary/20 border-primary animate-pulse' :
    data.status === 'failed' ? 'bg-red-500/20 border-red-500' :
    'bg-muted border-white/10';

  const Icon = 
    data.status === 'completed' ? CheckCircle2 :
    data.status === 'running' ? Activity :
    data.status === 'failed' ? AlertCircle :
    Clock;

  const iconColor = 
    data.status === 'completed' ? 'text-green-500' :
    data.status === 'running' ? 'text-primary' :
    data.status === 'failed' ? 'text-red-500' :
    'text-muted-foreground';

  return (
    <div className={cn("px-4 py-3 rounded-lg border-2 min-w-[200px] backdrop-blur-md shadow-xl transition-all hover:scale-105", statusColor)}>
      <Handle type="target" position={Position.Top} className="!bg-white/50 !w-3 !h-3" />
      
      <div className="flex items-center gap-3 mb-2">
        <div className={cn("p-1.5 rounded-full bg-black/40", iconColor)}>
          <Icon className="w-4 h-4" />
        </div>
        <div className="text-xs font-bold uppercase tracking-wider opacity-70">{data.status}</div>
      </div>
      
      <div className="font-bold text-sm text-white mb-1">{data.label}</div>
      
      {data.agent && (
        <div className="flex items-center gap-2 mt-2 pt-2 border-t border-white/10">
          <Bot className="w-3 h-3 text-purple-400" />
          <span className="text-xs text-purple-200">{data.agent}</span>
        </div>
      )}

      {data.cost && (
         <div className="text-xs text-muted-foreground mt-1">{data.cost} ADA</div>
      )}

      <Handle type="source" position={Position.Bottom} className="!bg-white/50 !w-3 !h-3" />
    </div>
  );
};

export default function WorkflowDetails() {
  const { id } = useParams();
  const workflow = getWorkflow(id || "wf-101");

  const nodeTypes = useMemo(() => ({ custom: CustomNode }), []);

  // Initial Graph Data
  const initialNodes = [
    { 
      id: '1', 
      type: 'custom', 
      position: { x: 250, y: 0 }, 
      data: { label: 'Scrape Competitor Sites', status: 'completed', agent: 'DataScout Pro', cost: 15 } 
    },
    { 
      id: '2', 
      type: 'custom', 
      position: { x: 100, y: 150 }, 
      data: { label: 'Analyze Pricing', status: 'running', agent: 'DataScout Pro', cost: 15 } 
    },
    { 
      id: '3', 
      type: 'custom', 
      position: { x: 400, y: 150 }, 
      data: { label: 'Sentiment Analysis', status: 'pending', agent: 'CodeWeaver X', cost: 45 } 
    },
    { 
      id: '4', 
      type: 'custom', 
      position: { x: 250, y: 300 }, 
      data: { label: 'Generate Report', status: 'pending', agent: 'ContentSmith', cost: 10 } 
    },
  ];

  const initialEdges = [
    { id: 'e1-2', source: '1', target: '2', animated: true, style: { stroke: 'hsl(199, 89%, 48%)' } },
    { id: 'e1-3', source: '1', target: '3', animated: false, style: { stroke: '#555' } },
    { id: 'e2-4', source: '2', target: '4', animated: false, style: { stroke: '#555' } },
    { id: 'e3-4', source: '3', target: '4', animated: false, style: { stroke: '#555' } },
  ];

  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);

  if (!workflow) return <Layout><div>Workflow not found</div></Layout>;

  return (
    <Layout>
      <div className="h-[calc(100vh-100px)] flex flex-col gap-4">
        {/* Header */}
        <div className="flex items-center justify-between p-4 rounded-xl glass-card">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-2xl font-heading font-bold text-white">{workflow.title}</h1>
              <Badge className={cn(
                workflow.status === 'running' ? 'bg-primary/20 text-primary border-primary/50' : 'bg-green-500/20 text-green-500'
              )}>
                {workflow.status}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">ID: {workflow.id} • Created {workflow.createdAt}</p>
          </div>
          <div className="flex gap-3">
             <div className="text-right px-4 border-r border-white/10">
                <div className="text-2xl font-bold text-white">{workflow.progress}%</div>
                <div className="text-xs text-muted-foreground">Completion</div>
             </div>
             <div className="text-right pl-2">
                <div className="text-2xl font-bold text-purple-400">70 ADA</div>
                <div className="text-xs text-muted-foreground">Total Cost</div>
             </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-4 min-h-0">
          {/* Graph View */}
          <div className="lg:col-span-3 rounded-xl overflow-hidden border border-white/10 bg-black/20 relative">
            <div className="absolute top-4 left-4 z-10 bg-black/50 backdrop-blur px-3 py-1 rounded border border-white/10 text-xs text-muted-foreground">
              Interactive Workflow Graph
            </div>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              nodeTypes={nodeTypes}
              fitView
              className="bg-transparent"
            >
              <Background color="#444" gap={20} size={1} />
              <Controls className="bg-card border-border" />
              <MiniMap className="bg-card border-border" maskColor="rgba(0,0,0, 0.7)" nodeColor="#06b6d4" />
            </ReactFlow>
          </div>

          {/* Sidebar details */}
          <div className="flex flex-col gap-4 overflow-y-auto">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-sm font-medium text-muted-foreground">Current Task</CardTitle>
              </CardHeader>
              <CardContent>
                <h3 className="font-bold text-lg text-white mb-2">Analyze Pricing Models</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Extracting pricing tiers and feature comparison from gathered competitor data.
                </p>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5">
                  <img src={mockAgents[0].avatar} className="w-10 h-10 rounded-full bg-white/10" />
                  <div>
                    <p className="text-sm font-bold text-white">DataScout Pro</p>
                    <p className="text-xs text-primary">Processing...</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader>
                 <CardTitle className="text-sm font-medium text-muted-foreground">On-Chain Logs</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex gap-3 items-start">
                  <FileText className="w-4 h-4 text-green-500 mt-1" />
                  <div>
                    <p className="text-xs text-white">Task 'Scrape' verified</p>
                    <p className="text-[10px] font-mono text-muted-foreground">0x3a1b...8c9d</p>
                  </div>
                </div>
                 <div className="flex gap-3 items-start">
                  <CreditCard className="w-4 h-4 text-yellow-500 mt-1" />
                  <div>
                    <p className="text-xs text-white">Escrow initialized</p>
                    <p className="text-[10px] font-mono text-muted-foreground">0x7e2f...4a5b</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}

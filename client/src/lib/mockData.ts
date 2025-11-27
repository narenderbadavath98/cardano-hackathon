import { addDays, subDays, format } from "date-fns";

export type Agent = {
  id: string;
  name: string;
  role: string;
  skills: string[];
  costPerTask: number; // in ADA
  reputation: number; // 0-100
  status: "available" | "busy" | "offline";
  avatar: string;
};

export type WorkflowStatus = "running" | "completed" | "failed" | "pending";

export type Workflow = {
  id: string;
  title: string;
  status: WorkflowStatus;
  progress: number; // 0-100
  agentCount: number;
  createdAt: string;
  tasks: Task[];
};

export type TaskStatus = "pending" | "running" | "completed" | "failed";

export type Task = {
  id: string;
  label: string;
  status: TaskStatus;
  agentId?: string;
  cost?: number;
  eta?: string;
  description?: string;
};

export type Log = {
  id: string;
  workflowId: string;
  txHash: string;
  taskHash: string;
  timestamp: string;
  status: "success" | "failure" | "pending";
  message: string;
};

export type Payment = {
  id: string;
  workflowId: string;
  agentId: string;
  amount: number;
  status: "paid" | "pending";
  txHash: string;
  date: string;
};

// Mock Agents
export const mockAgents: Agent[] = [
  {
    id: "a1",
    name: "DataScout Pro",
    role: "Research Specialist",
    skills: ["Data Mining", "Market Analysis", "Trend Spotting"],
    costPerTask: 15,
    reputation: 98,
    status: "available",
    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=DataScout",
  },
  {
    id: "a2",
    name: "CodeWeaver X",
    role: "Development Agent",
    skills: ["Python", "Smart Contracts", "API Integration"],
    costPerTask: 45,
    reputation: 95,
    status: "busy",
    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=CodeWeaver",
  },
  {
    id: "a3",
    name: "ContentSmith",
    role: "Creative Writer",
    skills: ["Copywriting", "SEO", "Blog Generation"],
    costPerTask: 10,
    reputation: 88,
    status: "available",
    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=ContentSmith",
  },
  {
    id: "a4",
    name: "SecureGuard",
    role: "Security Auditor",
    skills: ["Vulnerability Scan", "Code Audit", "Compliance"],
    costPerTask: 60,
    reputation: 99,
    status: "available",
    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=SecureGuard",
  },
  {
    id: "a5",
    name: "MarketMover",
    role: "Marketing Strategist",
    skills: ["Ad Optimization", "Social Media", "Analytics"],
    costPerTask: 25,
    reputation: 92,
    status: "offline",
    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=MarketMover",
  },
];

// Mock Workflows
export const mockWorkflows: Workflow[] = [
  {
    id: "wf-101",
    title: "Competitor Analysis Report",
    status: "running",
    progress: 65,
    agentCount: 3,
    createdAt: format(subDays(new Date(), 1), "yyyy-MM-dd HH:mm"),
    tasks: [
      { id: "t1", label: "Scrape Competitor Sites", status: "completed", agentId: "a1", cost: 15, description: "Gather data from top 5 competitors" },
      { id: "t2", label: "Analyze Pricing Models", status: "running", agentId: "a1", cost: 15, description: "Extract pricing tiers and features" },
      { id: "t3", label: "Generate PDF Report", status: "pending", agentId: "a3", cost: 10, description: "Compile findings into a readable format" },
    ],
  },
  {
    id: "wf-102",
    title: "Smart Contract Audit",
    status: "completed",
    progress: 100,
    agentCount: 2,
    createdAt: format(subDays(new Date(), 3), "yyyy-MM-dd HH:mm"),
    tasks: [
      { id: "t1", label: "Static Code Analysis", status: "completed", agentId: "a4", cost: 60, description: "Run automated security checks" },
      { id: "t2", label: "Gas Optimization Check", status: "completed", agentId: "a2", cost: 45, description: "Identify gas-heavy functions" },
    ],
  },
  {
    id: "wf-103",
    title: "Social Media Campaign",
    status: "pending",
    progress: 0,
    agentCount: 4,
    createdAt: format(new Date(), "yyyy-MM-dd HH:mm"),
    tasks: [],
  },
];

// Mock Logs
export const mockLogs: Log[] = [
  {
    id: "l1",
    workflowId: "wf-101",
    txHash: "0x3a1b...8c9d",
    taskHash: "task-hash-123",
    timestamp: format(subDays(new Date(), 1), "yyyy-MM-dd HH:mm:ss"),
    status: "success",
    message: "Task 'Scrape Competitor Sites' output verified on-chain",
  },
  {
    id: "l2",
    workflowId: "wf-101",
    txHash: "0x7e2f...4a5b",
    taskHash: "task-hash-456",
    timestamp: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
    status: "success",
    message: "Agent payment of 15 ADA released via smart contract",
  },
  {
    id: "l3",
    workflowId: "wf-102",
    txHash: "0x9c8d...1b2a",
    taskHash: "task-hash-789",
    timestamp: format(subDays(new Date(), 3), "yyyy-MM-dd HH:mm:ss"),
    status: "success",
    message: "Workflow 'Smart Contract Audit' initialized",
  },
];

// Mock Payments
export const mockPayments: Payment[] = [
  { id: "p1", workflowId: "wf-101", agentId: "a1", amount: 15, status: "paid", txHash: "0xPay...123", date: format(subDays(new Date(), 1), "yyyy-MM-dd") },
  { id: "p2", workflowId: "wf-102", agentId: "a4", amount: 60, status: "paid", txHash: "0xPay...456", date: format(subDays(new Date(), 3), "yyyy-MM-dd") },
  { id: "p3", workflowId: "wf-102", agentId: "a2", amount: 45, status: "paid", txHash: "0xPay...789", date: format(subDays(new Date(), 3), "yyyy-MM-dd") },
];

export const getWorkflow = (id: string) => mockWorkflows.find((w) => w.id === id);
export const getWorkflowLogs = (id: string) => mockLogs.filter((l) => l.workflowId === id);
export const getWorkflowPayments = (id: string) => mockPayments.filter((p) => p.workflowId === id);

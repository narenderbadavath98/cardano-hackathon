import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";

// Pages
import Landing from "@/pages/Landing";
import Dashboard from "@/pages/Dashboard";
import WorkflowCreate from "@/pages/WorkflowCreate";
import WorkflowDetails from "@/pages/WorkflowDetails";
import Agents from "@/pages/Agents";
import Logs from "@/pages/Logs";
import Payments from "@/pages/Payments";
import Settings from "@/pages/Settings";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Landing} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/workflow/create" component={WorkflowCreate} />
      <Route path="/workflow/:id" component={WorkflowDetails} />
      <Route path="/agents" component={Agents} />
      <Route path="/logs/:workflowId" component={Logs} />
      <Route path="/payments/:workflowId" component={Payments} />
      <Route path="/settings" component={Settings} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;

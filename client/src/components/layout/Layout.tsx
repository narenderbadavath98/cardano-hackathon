import { Link, useLocation } from "wouter";
import { 
  LayoutDashboard, 
  GitGraph, 
  Users, 
  FileText, 
  CreditCard, 
  Settings, 
  PlusCircle,
  LogOut,
  Menu
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: PlusCircle, label: "New Workflow", href: "/workflow/create" },
  { icon: Users, label: "Agent Marketplace", href: "/agents" },
  { icon: GitGraph, label: "Active Workflows", href: "/workflow/wf-101" }, // Direct link to a demo workflow
  { icon: FileText, label: "On-Chain Logs", href: "/logs/wf-101" },
  { icon: CreditCard, label: "Payments", href: "/payments/wf-101" },
  { icon: Settings, label: "Settings", href: "/settings" },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-sidebar border-r border-sidebar-border">
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-primary flex items-center justify-center">
            <GitGraph className="text-primary-foreground w-5 h-5" />
          </div>
          <span className="font-heading font-bold text-xl tracking-tight text-sidebar-foreground">
            Orchestrator
          </span>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href}>
            <div
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-md transition-all duration-200 group cursor-pointer",
                location === item.href
                  ? "bg-sidebar-primary/10 text-sidebar-primary border border-sidebar-primary/20 shadow-[0_0_15px_rgba(var(--sidebar-primary),0.3)]"
                  : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent hover:border-sidebar-accent"
              )}
            >
              <item.icon
                className={cn(
                  "w-5 h-5 transition-colors",
                  location === item.href ? "text-sidebar-primary" : "group-hover:text-sidebar-foreground"
                )}
              />
              <span className="font-medium text-sm">{item.label}</span>
              {location === item.href && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-sidebar-primary animate-pulse" />
              )}
            </div>
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-sidebar-border">
        <div className="flex items-center gap-3 px-3 py-3 rounded-md bg-sidebar-accent/50 border border-sidebar-border">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white font-bold text-xs">
            JD
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-sidebar-foreground truncate">John Doe</p>
            <p className="text-xs text-muted-foreground truncate">Admin</p>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
            <LogOut className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen w-full bg-background">
      {/* Desktop Sidebar */}
      <div className="hidden md:block w-64 fixed inset-y-0 left-0 z-50">
        <SidebarContent />
      </div>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 border-b border-border bg-background/80 backdrop-blur-md z-50 flex items-center px-4 justify-between">
         <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-primary flex items-center justify-center">
            <GitGraph className="text-primary-foreground w-5 h-5" />
          </div>
          <span className="font-heading font-bold text-lg text-foreground">
            Orchestrator
          </span>
        </div>
        <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="w-5 h-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-64 bg-sidebar border-r border-sidebar-border">
            <SidebarContent />
          </SheetContent>
        </Sheet>
      </div>

      {/* Main Content */}
      <main className={cn(
        "flex-1 transition-all duration-300 min-h-screen",
        "md:pl-64 pt-16 md:pt-0"
      )}>
        <div className="container mx-auto p-4 md:p-8 max-w-7xl animate-in fade-in slide-in-from-bottom-4 duration-700">
          {children}
        </div>
      </main>
    </div>
  );
}

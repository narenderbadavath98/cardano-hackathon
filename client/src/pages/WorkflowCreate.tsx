import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useLocation } from "wouter";
import { BrainCircuit, Sparkles, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export default function WorkflowCreate() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [goal, setGoal] = useState("");
  const [, setLocation] = useLocation();

  const handleGenerate = () => {
    if (!goal) return;
    setIsGenerating(true);
    // Simulate AI generation delay
    setTimeout(() => {
      setIsGenerating(false);
      setLocation("/workflow/wf-101");
    }, 3000);
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto mt-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 text-primary mb-4 border border-primary/20 shadow-[0_0_30px_rgba(6,182,212,0.3)]">
              <BrainCircuit className="w-8 h-8" />
            </div>
            <h1 className="text-4xl font-heading font-bold text-white mb-2">Create Autonomous Workflow</h1>
            <p className="text-lg text-muted-foreground">
              Describe your business goal and let the AI Orchestrator build the perfect team of agents.
            </p>
          </div>

          <Card className="glass-card border-primary/20 shadow-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-yellow-500" />
                AI Workflow Generator
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="goal" className="text-base">What is your objective?</Label>
                <Textarea 
                  id="goal" 
                  placeholder="e.g., 'Analyze the crypto market sentiment for the last 24h and generate a blog post summarizing key trends.'" 
                  className="min-h-[150px] bg-black/20 border-white/10 focus:border-primary/50 text-lg resize-none"
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                />
              </div>

              <div className="bg-primary/5 rounded-lg p-4 border border-primary/10 text-sm text-muted-foreground">
                <p className="font-semibold text-primary mb-1">The Orchestrator will automatically:</p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>Decompose your goal into executable subtasks</li>
                  <li>Select the best-rated agents from the marketplace</li>
                  <li>Estimate costs and execution time</li>
                  <li>Prepare smart contracts for payment</li>
                </ul>
              </div>

              <Button 
                size="lg" 
                className="w-full h-14 text-lg bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_20px_rgba(6,182,212,0.3)] relative overflow-hidden group"
                onClick={handleGenerate}
                disabled={isGenerating || !goal}
              >
                {isGenerating ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Analyzing Goal & Hiring Agents...
                  </div>
                ) : (
                  <span className="flex items-center gap-2">
                    Generate Workflow <Sparkles className="w-5 h-5" />
                  </span>
                )}
                
                {/* Scanline effect on loading */}
                {isGenerating && (
                  <div className="absolute inset-0 bg-white/20 w-1/2 skew-x-12 animate-[shimmer_1s_infinite]" />
                )}
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </Layout>
  );
}

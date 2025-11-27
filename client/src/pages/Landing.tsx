import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, Cpu, ShieldCheck, GitGraph, Zap } from "lucide-react";
import { motion } from "framer-motion";
import heroBg from "@assets/generated_images/abstract_high-tech_network_background_for_ai_orchestrator.png";

export default function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image & Overlay */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-40"
          style={{ backgroundImage: `url(${heroBg})` }}
        />
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-background/80 via-background/90 to-background" />
        
        {/* Grid Overlay */}
        <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

        <div className="container relative z-10 px-4 md:px-6 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-8 backdrop-blur-sm"
          >
            <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
            Next-Gen Multi-Agent Operations
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-7xl font-heading font-bold tracking-tighter mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white via-primary to-purple-400 text-glow"
          >
            AI Workflow Orchestrator
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mx-auto max-w-[700px] text-muted-foreground text-lg md:text-xl mb-10 leading-relaxed"
          >
            An autonomous AI project manager that breaks high-level goals into subtasks, 
            assigns them to specialized agents on the Masumi Network, and settles payments on Cardano.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link href="/dashboard">
              <Button size="lg" className="h-12 px-8 text-lg font-medium bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_20px_rgba(6,182,212,0.5)] transition-all hover:scale-105">
                Launch Dashboard <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="h-12 px-8 text-lg border-white/10 hover:bg-white/5 backdrop-blur-sm">
              Read Whitepaper
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-black/50 relative">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Cpu,
                title: "Multi-Agent Automation",
                desc: "Orchestrate specialized agents to collaborate on complex tasks autonomously."
              },
              {
                icon: ShieldCheck,
                title: "On-Chain Transparency",
                desc: "Every task, log, and payment is verified and recorded on the Cardano blockchain."
              },
              {
                icon: Zap,
                title: "Workflow Intelligence",
                desc: "AI-driven decomposition of goals into optimized execution paths."
              }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.2 }}
                className="glass-card p-8 rounded-xl flex flex-col items-center text-center group"
              >
                <div className="mb-6 p-4 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors border border-primary/20">
                  <feature.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

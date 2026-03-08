"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Github, Mail, Chrome, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import Link from "next/link";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(`${isLogin ? 'Logged in' : 'Signed up'} successfully! (Mock)`);
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-30">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/20 blur-[120px] rounded-full" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[450px] relative z-10"
      >
        <Card className="glass-card p-10 rounded-[2.5rem] border-white/5 space-y-8">
          <div className="text-center space-y-2">
            <Link href="/" className="inline-flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-primary-foreground font-black">P</div>
              <span className="text-2xl font-bold tracking-tighter">PromptVault</span>
            </Link>
            <h2 className="text-3xl font-bold">{isLogin ? "Welcome back" : "Create account"}</h2>
            <p className="text-muted-foreground text-sm">
              {isLogin ? "Login to start trading high-quality AI prompts." : "Join our community of world-class prompt engineers."}
            </p>
          </div>

          <div className="space-y-4">
            <Button variant="outline" className="w-full h-12 rounded-xl border-white/10 bg-white/5 gap-3">
              <Github className="w-5 h-5" /> Continue with GitHub
            </Button>
            <Button variant="outline" className="w-full h-12 rounded-xl border-white/10 bg-white/5 gap-3">
              <Chrome className="w-5 h-5" /> Continue with Google
            </Button>
          </div>

          <div className="flex items-center gap-4 py-2">
            <div className="h-px bg-white/10 flex-grow" />
            <span className="text-[10px] uppercase font-bold text-muted-foreground">OR</span>
            <div className="h-px bg-white/10 flex-grow" />
          </div>

          <form onSubmit={handleAuth} className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-muted-foreground uppercase ml-1">Email Address</label>
              <Input 
                type="email" 
                placeholder="alex@example.com" 
                className="h-12 bg-white/5 border-white/10 rounded-xl px-4"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-muted-foreground uppercase ml-1">Password</label>
              <Input 
                type="password" 
                placeholder="••••••••" 
                className="h-12 bg-white/5 border-white/10 rounded-xl px-4"
              />
            </div>
            
            <Button className="w-full h-14 rounded-2xl font-bold text-lg glow-primary mt-4">
              {isLogin ? "Sign In" : "Create Account"} <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground">
            {isLogin ? "Don't have an account?" : "Already have an account?"} {" "}
            <button 
              onClick={() => setIsLogin(!isLogin)} 
              className="text-primary font-bold hover:underline"
            >
              {isLogin ? "Sign up free" : "Login here"}
            </button>
          </p>

          <div className="pt-4 text-center">
            <p className="text-[10px] text-muted-foreground uppercase flex items-center justify-center gap-1.5 font-medium">
              <Sparkles className="w-3 h-3 text-primary" /> Verified by PromptVault Security
            </p>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}

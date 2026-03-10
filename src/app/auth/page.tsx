"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Github, Mail, Chrome, ArrowRight, Sparkles, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    // Setting a fake token cookie
    document.cookie = "auth_token=mock_session_token; path=/; max-age=86400";
    toast.success(`${isLogin ? 'Welcome back!' : 'Account created!'}`);
    
    // Refresh and redirect
    setTimeout(() => {
      window.location.href = "/";
    }, 1000);
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center p-4 relative overflow-hidden bg-background">
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-30">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/10 blur-[120px] rounded-full" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[450px] relative z-10"
      >
        <Card className="glass-card p-10 rounded-[2.5rem] bg-card border-border/40 space-y-8 shadow-2xl">
          <div className="text-center space-y-2">
            <Link href="/" className="inline-flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-black shadow-lg shadow-primary/20">P</div>
              <span className="text-2xl font-black tracking-tighter text-foreground">Vault<span className="text-primary italic">.</span></span>
            </Link>
            <h2 className="text-3xl font-black tracking-tighter text-foreground">{isLogin ? "Authenticate" : "Create Account"}</h2>
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-widest">Access the Global Logic Network</p>
          </div>

          <div className="space-y-4">
            <Button variant="outline" className="w-full h-12 rounded-xl border-border/40 bg-secondary gap-3 font-black uppercase tracking-widest text-[9px] hover:bg-muted transition-all shadow-sm">
              <Github className="w-4 h-4 text-primary" /> Continue with GitHub
            </Button>
            <Button variant="outline" className="w-full h-12 rounded-xl border-border/40 bg-secondary gap-3 font-black uppercase tracking-widest text-[9px] hover:bg-muted transition-all shadow-sm">
              <Chrome className="w-4 h-4 text-primary" /> Continue with Google
            </Button>
          </div>

          <div className="flex items-center gap-4 py-2">
            <div className="h-px bg-border/40 flex-grow" />
            <span className="text-[10px] uppercase font-black text-muted-foreground tracking-[0.2em]">OR</span>
            <div className="h-px bg-border/40 flex-grow" />
          </div>

          <form onSubmit={handleAuth} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-muted-foreground/60 uppercase ml-1 tracking-widest">Email Address</label>
              <Input 
                type="email" 
                placeholder="engineer@logic.network" 
                className="h-12 bg-secondary border-border/40 rounded-xl px-4 font-bold"
              />
            </div>
            <div className="space-y-2 relative">
              <label className="text-[10px] font-black text-muted-foreground/60 uppercase ml-1 tracking-widest">Password</label>
              <div className="relative">
                <Input 
                  type={showPassword ? "text" : "password"} 
                  placeholder="••••••••" 
                  className="h-12 bg-secondary border-border/40 rounded-xl px-4 pr-12 font-bold"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            
            <Button className="w-full h-14 rounded-2xl font-black uppercase tracking-[0.2em] text-xs bg-primary text-white shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-95 duration-300 mt-4">
              {isLogin ? "Sign In" : "Get Started"} <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </form>

          <p className="text-center text-xs text-muted-foreground font-medium">
            {isLogin ? "Don't have an account?" : "Already have an account?"} {" "}
            <button 
              onClick={() => setIsLogin(!isLogin)} 
              className="text-primary font-black hover:underline uppercase tracking-widest decoration-2"
            >
              {isLogin ? "Sign up free" : "Login here"}
            </button>
          </p>

        </Card>
      </motion.div>
    </div>
  );
}

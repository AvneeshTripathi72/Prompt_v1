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
    <div className="min-h-[90vh] flex items-center justify-center p-4 relative overflow-hidden">
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
            <h2 className="text-3xl font-bold">{isLogin ? "Authenticate" : "Create Account"}</h2>
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
            <div className="space-y-2 relative">
              <label className="text-xs font-bold text-muted-foreground uppercase ml-1">Password</label>
              <div className="relative">
                <Input 
                  type={showPassword ? "text" : "password"} 
                  placeholder="••••••••" 
                  className="h-12 bg-white/5 border-white/10 rounded-xl px-4 pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            
            <Button className="w-full h-14 rounded-2xl font-bold text-lg glow-primary mt-4">
              {isLogin ? "Sign In" : "Get Started"} <ArrowRight className="ml-2 w-5 h-5" />
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

        </Card>
      </motion.div>
    </div>
  );
}

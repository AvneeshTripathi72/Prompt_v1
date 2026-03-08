"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PromptCard } from "@/components/prompt/PromptCard";
import { ArrowRight, Sparkles, Zap, Shield, Wallet, Star, Flame } from "lucide-react";
import { TrendingSlider } from "@/components/prompt/TrendingSlider";
import { Footer } from "@/components/Footer";
import { useEffect, useState } from "react";

export default function LandingPage() {
  const [prompts, setPrompts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrompts = async () => {
      try {
        const res = await fetch("/api/prompts");
        const data = await res.json();
        if (Array.isArray(data)) {
          setPrompts(data);
        } else {
          setPrompts([]);
        }
      } catch (error) {
        console.error("Failed to fetch prompts:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPrompts();
  }, []);
  return (
    <div className="flex flex-col gap-32 pb-32">
      <section className="container mx-auto px-6 overflow-hidden pt-20">
        {loading ? (
          <div className="h-[600px] rounded-[3rem] bg-white/5 animate-pulse" />
        ) : (
          <TrendingSlider prompts={prompts} />
        )}
      </section>

      <section className="container mx-auto px-6">
        <div className="text-center mb-20 space-y-4">
          <h2 className="text-5xl font-black tracking-tight">Engineered for Results</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-medium">The most intuitive workflow to monetize your expertise in generative AI.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            { icon: Sparkles, step: "Build", desc: "Craft prompt templates that deliver consistent, high-quality results." },
            { icon: Zap, step: "Preview", desc: "Showcase raw AI outputs so buyers know exactly what they're getting." },
            { icon: Shield, step: "Authorize", desc: "Verify your prompts against our quality benchmarks for trust." },
            { icon: Wallet, step: "Monetize", desc: "Receive automated payouts in coins for every successful transaction." },
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -12 }}
              className="glass-card p-10 rounded-[2.5rem] flex flex-col items-center text-center gap-6 group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-skyblue/5 rounded-full blur-2xl translate-x-1/2 -translate-y-1/2 group-hover:bg-skyblue/10 transition-colors" />
              <div className="w-20 h-20 bg-skyblue/10 rounded-[2rem] flex items-center justify-center border border-skyblue/10 group-hover:border-skyblue/30 group-hover:rotate-6 transition-all duration-500 shadow-xl">
                <item.icon className="w-10 h-10 text-skyblue" />
              </div>
              <div className="space-y-3">
                <h3 className="text-2xl font-black tracking-tight">{item.step}</h3>
                <p className="text-sm text-muted-foreground font-medium leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="space-y-3">
            <h2 className="text-5xl font-black tracking-tight">Hottest Releases</h2>
            <p className="text-xl text-muted-foreground font-medium">Top performing engineered prompts this week.</p>
          </div>
          <Link href="/explore">
            <Button variant="outline" className="h-14 px-8 rounded-2xl border-white/5 font-black uppercase tracking-widest text-xs hover:bg-white/5 gap-3">
              Browse Engine <ArrowRight className="w-4 h-4 text-skyblue" />
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {loading ? (
             Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-[450px] rounded-[2.5rem] bg-white/5 animate-pulse" />
            ))
          ) : (
            prompts.slice(0, 3).map((prompt: any) => (
              <PromptCard 
                key={prompt._id || prompt.id}
                id={prompt._id || prompt.id}
                title={prompt.title}
                tagline={prompt.tagline}
                price={prompt.price}
                rating={prompt.rating || 5}
                platform={prompt.platform}
                author={{
                  username: prompt.seller,
                  avatar: `https://avatar.iran.liara.run/public/boy?username=${prompt.seller}`
                }}
                previewImage={prompt.images[0]}
                promptPreview={prompt.promptText.substring(0, 80)}
              />
            ))
          )}
        </div>
      </section>

      <section className="container mx-auto px-6 max-w-7xl pb-24">
        <div className="glass-panel p-16 md:p-32 rounded-[4rem] text-center relative overflow-hidden border-white/5 shadow-3xl">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-skyblue/10 blur-[150px] -translate-y-1/2 pointer-events-none" />
          <div className="relative z-10 space-y-10">
            <div className="space-y-4">
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-tight">Ready to Engineer <br /><span className="text-gradient">the Future?</span></h2>
              <p className="text-xl text-muted-foreground font-medium max-w-2xl mx-auto leading-relaxed">
                Join 50,000+ creators building, sharing, and monetizing the world's most advanced AI instructions.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Button className="h-16 px-12 rounded-[2rem] text-base font-black uppercase tracking-widest bg-crimson text-white shadow-[0_20px_50px_-10px_rgba(255,100,100,0.5)] transition-all hover:scale-105">
                Join the Federation
              </Button>
              <Button variant="outline" className="h-16 px-12 rounded-[2rem] border-white/10 font-black uppercase tracking-widest text-xs hover:bg-white/5 transition-all">
                Learn our Genesis
              </Button>
            </div>
          </div>
        </div>
        
        <Footer />
      </section>
    </div>
  );
}

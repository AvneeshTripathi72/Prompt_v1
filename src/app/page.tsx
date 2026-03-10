"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PromptCard } from "@/components/prompt/PromptCard";
import { ArrowRight, Sparkles, Zap, Shield, Wallet, Star, Flame, ChevronRight } from "lucide-react";
import { TrendingSlider } from "@/components/prompt/TrendingSlider";
import { Footer } from "@/components/Footer";
import { useEffect, useState } from "react";

export default function LandingPage() {
  const [prompts, setPrompts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrompts = async () => {
      try {
        const res = await fetch("/api/prompts?limit=8&sortBy=Most Purchased");
        const data = await res.json();
        if (data && Array.isArray(data.prompts)) {
          setPrompts(data.prompts);
        } else if (Array.isArray(data)) {
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
    <div className="flex flex-col gap-24 pb-24">
      {/* Hero Section */}
      <section className="relative pt-24 pb-12 overflow-hidden hero-gradient">
        <div className="container mx-auto px-6">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <Badge className="bg-primary/10 text-primary border-primary/20 px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
                The Elite Prompt Marketplace
              </Badge>
              <h1 className="text-6xl md:text-7xl font-black tracking-tight leading-[0.9] text-foreground">
                Engineered <span className="text-primary italic">Intelligence</span> for Modern Creators.
              </h1>
              <p className="text-xl text-card-foreground font-medium max-w-2xl mx-auto leading-relaxed">
                Discover, buy, and sell high-performance prompts crafted by leading AI engineers. 
                Built for quality, performance, and scale.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <Link href="/explore">
                <Button size="lg" className="h-14 px-10 rounded-xl bg-primary text-primary-foreground font-bold text-base hover:shadow-xl transition-all">
                  Browse Market
                </Button>
              </Link>
              <Link href="/sell">
                <Button size="lg" variant="outline" className="h-14 px-10 rounded-xl border-border/50 bg-secondary/50 font-bold text-base hover:bg-secondary transition-all">
                  Start Selling
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trending Section */}
      <section className="container mx-auto px-6 max-w-[1400px]">
        <div className="bg-card p-8 md:p-12 rounded-[2.5rem] border border-border/40 shadow-sm">
          {loading ? (
            <div className="h-[480px] rounded-3xl bg-secondary animate-pulse" />
          ) : (
            <TrendingSlider prompts={prompts} />
          )}
        </div>
      </section>

      {/* Feature Grid */}
      <section className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: Sparkles, step: "Engineer", desc: "Craft prompt templates that deliver consistent, premium quality results." },
            { icon: Zap, step: "Accelerate", desc: "Showcase raw AI outputs so buyers can deploy instantly with confidence." },
            { icon: Shield, step: "Verify", desc: "Every prompt is vetted against community benchmarks for reliability." },
            { icon: Wallet, step: "Succeed", desc: "Automated payouts for creators in a transparent digital ecosystem." },
          ].map((item, i) => (
            <div key={i} className="flex flex-col gap-4 p-8 rounded-2xl border border-border/40 bg-card shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center border border-primary/20">
                <item.icon className="w-6 h-6 text-primary" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-bold tracking-tight text-foreground">{item.step}</h3>
                <p className="text-sm text-card-foreground font-medium leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Latest Prompts */}
      <section className="container mx-auto px-6 max-w-[1400px]">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6 pb-6 border-b border-border/40">
          <div className="space-y-1">
            <h2 className="text-3xl font-black tracking-tight text-foreground">Latest <span className="text-primary italic">Logic</span></h2>
            <p className="text-base text-muted-foreground font-medium">Freshly engineered assets from our top creators.</p>
          </div>
          <Link href="/explore">
            <Button variant="ghost" className="font-bold text-primary gap-2 hover:bg-primary/5">
              View All <ChevronRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {loading ? (
             Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="aspect-[3/4] rounded-2xl bg-muted/50 animate-pulse" />
            ))
          ) : (
            prompts.slice(0, 4).map((prompt: any) => (
              <PromptCard 
                key={prompt._id || prompt.id}
                id={prompt._id || prompt.id}
                title={prompt.title || "Untitled Prompt"}
                tagline={prompt.tagline || ""}
                price={prompt.price || 0}
                rating={prompt.rating || 5}
                platform={prompt.platform || "Unknown"}
                author={{
                  username: typeof prompt.seller === 'object' ? (prompt.seller.name || prompt.seller.username || "anonymous") : (prompt.seller || "anonymous"),
                  avatar: (prompt.seller && typeof prompt.seller === 'object' && prompt.seller.avatar) 
                    ? prompt.seller.avatar 
                    : ""
                }}
                previewImage={prompt.images?.[0] || ""}
                promptPreview={prompt.promptText?.substring(0, 80) || ""}
              />
            ))
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 max-w-7xl pb-16">
        <div className="bg-card p-12 md:p-20 rounded-[3rem] text-center relative overflow-hidden border border-border/40 shadow-xl">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 blur-[150px] -translate-y-1/2 pointer-events-none" />
          <div className="relative z-10 space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">Ready to Engineer <span className="text-primary">the Future?</span></h2>
              <p className="text-lg text-muted-foreground font-medium max-w-xl mx-auto leading-relaxed">
                Join thousands of creators sharing and monetizing the world's most sophisticated prompt architectures.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/explore">
                <Button size="lg" className="h-14 px-10 rounded-xl bg-primary text-primary-foreground font-bold">
                  Join Marketplace
                </Button>
              </Link>
              <Link href="/sell">
                <Button size="lg" variant="outline" className="h-14 px-10 rounded-xl">
                  Start Selling
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        <Footer />
      </section>
    </div>
  );
}

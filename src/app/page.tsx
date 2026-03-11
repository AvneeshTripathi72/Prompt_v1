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
    <div className="flex flex-col gap-12 pb-24">
      {/* Hero Section */}
      <section className="relative pt-24 pb-4 overflow-hidden hero-gradient">
        <div className="container mx-auto px-6">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-8 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <Badge className="bg-primary/10 text-primary border-primary/20 px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
                The Elite Prompt Marketplace
              </Badge>
              <h1 className="text-6xl md:text-7xl font-black tracking-tight leading-[0.9] text-foreground">
                Engineered <span className="text-primary italic">Intelligence</span>
              </h1>
              <p className="text-lg text-card-foreground font-medium max-w-2xl mx-auto leading-relaxed">
                High-performance prompts crafted by leading AI engineers. 
              </p>
            </motion.div>
          </div>

          {/* Single Window Framing for all 5 cards */}
          <div className="max-w-[1400px] mx-auto">
            {loading ? (
              <div className="h-[400px] rounded-[2.5rem] bg-secondary animate-pulse" />
            ) : (
              <TrendingSlider prompts={prompts} />
            )}
          </div>
        </div>
      </section>

      {/* Simplified CTA */}
      <section className="container mx-auto px-6 max-w-5xl mt-12">
        <div className="bg-card/50 backdrop-blur-md p-8 rounded-[2rem] border border-border/40 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="text-2xl font-black tracking-tight">Ready to Engineer <span className="text-primary">the Future?</span></h2>
            <p className="text-muted-foreground font-medium text-sm">Join the leading creators and monetize your prompt architectures.</p>
          </div>
          <div className="flex gap-4">
            <Link href="/explore">
              <Button size="lg" className="rounded-xl bg-primary text-primary-foreground font-bold px-8">
                Explore All
              </Button>
            </Link>
            <Link href="/sell">
              <Button size="lg" variant="outline" className="rounded-xl px-8">
                Sell Prompt
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </section>
    </div>

  );
}

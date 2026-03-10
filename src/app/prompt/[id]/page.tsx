"use client";

import * as React from "react";
import { useState } from "react";
import { Lock, Wallet, Star, ShieldCheck, Download, Copy, Share2, Heart, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";

export default function PromptDetailPage({ params: paramsPromise }: { params: Promise<{ id: string }> }) {
  const params = React.use(paramsPromise);
  const [prompt, setPrompt] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isPurchased, setIsPurchased] = useState(false);

  useEffect(() => {
    const fetchPrompt = async () => {
      try {
        const res = await fetch(`/api/prompts/${params.id}`);
        if (!res.ok) throw new Error("Prompt not found");
        const data = await res.json();
        setPrompt(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchPrompt();
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }
  
  if (!prompt) {
    return notFound();
  }

  const handlePurchase = async () => {
    try {
      const res = await fetch("/api/prompts/purchase", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ promptId: params.id }),
      });

      const data = await res.json();
      
      if (!res.ok) throw new Error(data.error || "Purchase failed");

      setIsPurchased(true);
      toast.success(data.message);
      
      // Trigger a custom event to update Navbar balance
      window.dispatchEvent(new Event("balanceUpdate"));
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="container mx-auto px-6 py-16 max-w-7xl">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
        <div className="lg:col-span-2 space-y-16">
          <div className="flex items-center gap-3 text-[10px] uppercase font-black tracking-[0.2em] text-muted-foreground/60">
            <Link href="/explore" className="hover:text-primary transition-colors">Explore</Link> 
            <span className="w-1 h-1 rounded-full bg-muted-foreground/20" /> 
            <span>{prompt.platform}</span> 
            <span className="w-1 h-1 rounded-full bg-muted-foreground/20" /> 
            <span className="text-foreground">{prompt.title}</span>
          </div>

          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <Badge className="bg-primary/10 text-primary border-primary/20 px-4 py-1.5 rounded-xl font-black">{prompt.platform}</Badge>
              <Badge variant="outline" className="border-border/40 px-4 py-1.5 rounded-xl text-muted-foreground font-bold">{prompt.category}</Badge>
            </div>
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl font-black tracking-tighter leading-none text-foreground">{prompt.title}</h1>
              <p className="text-xl text-card-foreground font-medium leading-relaxed max-w-3xl">
                {prompt.tagline}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div className="aspect-[16/9] w-full rounded-[3rem] overflow-hidden bg-secondary dark:bg-muted relative border border-border/40 dark:border-white/5 shadow-xl group">
              {prompt.images?.[0] ? (
                <img 
                  src={prompt.images[0]}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" 
                  alt="Main Preview"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-secondary dark:bg-muted">
                  <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/30">No Preview Available</span>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
              <div className="absolute bottom-10 left-10">
                <Badge className="bg-card/80 backdrop-blur-xl border-border/40 text-primary font-black tracking-[0.2em] text-[10px] px-6 py-2 rounded-2xl uppercase">High Definition Preview</Badge>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-6">
              {prompt.images?.map((img: string, i: number) => (
                <div key={i} className="aspect-square rounded-[2rem] overflow-hidden bg-secondary dark:bg-muted cursor-pointer hover:ring-4 ring-primary/30 transition-all border border-border/40 dark:border-white/5 shadow-md group">
                  {img ? (
                    <img 
                      src={img} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                      alt={`Preview ${i}`}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-secondary dark:bg-muted" />
                  )}
                </div>
              ))}
            </div>
          </div>

          <Card className="glass-card relative overflow-hidden rounded-[3rem] border-border/40 shadow-xl">
            <div className="p-12 space-y-10">
              <div className="flex justify-between items-center">
                <div className="space-y-1">
                  <h2 className="text-2xl font-black tracking-tight flex items-center gap-3 text-foreground">
                    <Sparkles className="w-7 h-7 text-primary" /> Logic Engine
                  </h2>
                  <p className="text-xs text-muted-foreground font-medium">Verified prompt construction for optimal results</p>
                </div>
                {isPurchased && (
                  <Button variant="outline" size="sm" className="h-10 rounded-xl gap-2 font-bold border-border/40 hover:bg-primary/10 hover:text-primary" onClick={() => {
                    navigator.clipboard.writeText(prompt.preview);
                    toast.success("Ready to paste!");
                  }}>
                    <Copy className="w-4 h-4" /> Copy Instructions
                  </Button>
                )}
              </div>

              <div className="relative font-mono text-sm leading-relaxed whitespace-pre-wrap rounded-[2rem] p-10 bg-secondary dark:bg-input border border-border/40 dark:border-white/5 min-h-[250px] shadow-inner">
                {!isPurchased ? (
                  <>
                    <div className="select-none text-muted-foreground/20 italic blur-[1px]">
                      {prompt.promptText?.substring(0, 150)}...
                      {prompt.promptText?.substring(0, 150)}...
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-secondary dark:from-input via-secondary/95 dark:via-input/95 to-transparent backdrop-blur-sm flex flex-col items-center justify-center p-12 text-center gap-8">
                      <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center border border-primary/20 shadow-xl relative">
                        <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full" />
                        <Lock className="w-10 h-10 text-primary relative z-10" />
                      </div>
                      <div className="space-y-3">
                        <h3 className="text-3xl font-black tracking-tighter text-foreground">Content Locked</h3>
                        <p className="text-sm text-card-foreground max-w-xs font-medium leading-relaxed">
                          Secure this logic engine to gain lifetime access to the full command set.
                        </p>
                      </div>
                      <Button className="rounded-[1.25rem] px-10 h-13 bg-primary text-white hover:bg-primary/90 font-black uppercase tracking-widest text-[10px] shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-95 duration-300" onClick={handlePurchase}>
                        Unlock Gear for {prompt.price} Coins
                      </Button>
                    </div>
                  </>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-foreground leading-relaxed text-base"
                  >
                    {prompt.promptText}
                  </motion.div>
                )}
              </div>
            </div>
          </Card>

          <div className="space-y-10">
            <h2 className="text-3xl font-black tracking-tight">Trust & Feedback</h2>
            <div className="flex flex-col items-center justify-center p-20 rounded-[3rem] border border-dashed border-border/40 bg-muted/20 text-center space-y-4">
              <div className="w-16 h-16 bg-muted/50 rounded-2xl flex items-center justify-center">
                <Star className="w-8 h-8 text-muted-foreground/30" />
              </div>
              <div className="space-y-1">
                <p className="font-bold text-foreground">No reviews yet</p>
                <p className="text-sm text-muted-foreground max-w-[200px] mx-auto">Be the first to share your experience with this engine.</p>
              </div>
            </div>
          </div>
        </div>

        <aside className="space-y-10">
          <Card className="glass-card p-10 rounded-[3rem] sticky top-28 border-border/40 space-y-10 shadow-xl bg-card">
            <div className="space-y-3">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">Investment Required</span>
              <div className="flex items-end gap-3 text-6xl font-black text-primary tracking-tighter">
                {prompt.price}<span className="text-sm font-black uppercase tracking-[0.2em] text-muted-foreground pb-2">CR</span>
              </div>
            </div>

            <div className="space-y-4">
              {!isPurchased ? (
                <Button className="w-full h-13 rounded-2xl text-[10px] font-black uppercase tracking-widest bg-primary text-white hover:opacity-90 shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98]" onClick={handlePurchase}>
                  Acquire Logic
                </Button>
              ) : (
                <div className="grid grid-cols-1 gap-4">
                  <Button className="w-full h-13 rounded-2xl bg-secondary border border-border/40 hover:bg-primary hover:text-white transition-all font-black uppercase tracking-widest text-[9px] hover:scale-[1.02] active:scale-[0.98]">
                    <Download className="w-4 h-4 mr-2" /> Download Source
                  </Button>
                  <Button className="w-full h-13 rounded-2xl bg-secondary border border-border/40 hover:bg-muted transition-all font-black uppercase tracking-widest text-[9px] hover:scale-[1.02] active:scale-[0.98]">
                    <Share2 className="w-4 h-4 mr-2" /> Distribute
                  </Button>
                </div>
              )}
              <Button variant="outline" className="w-full h-13 rounded-2xl border-border/40 bg-secondary hover:bg-muted transition-all font-black uppercase tracking-widest text-[9px] hover:scale-[1.02] active:scale-[0.98]">
                <Heart className="w-4 h-4 mr-2" /> Save to Vault
              </Button>
            </div>

            <div className="border-t border-border/40 pt-10 space-y-8">
              <div className="flex items-center gap-5">
                <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-primary/20 p-0.5 shadow-md relative group">
                  <div className="absolute inset-0 bg-primary/10 animate-pulse" />
                  <img 
                    src={(prompt.seller && typeof prompt.seller === 'object' && prompt.seller.avatar) 
                      ? prompt.seller.avatar 
                      : `https://avatar.iran.liara.run/public/boy?username=${typeof prompt.seller === 'object' ? (prompt.seller.name || prompt.seller.username || "anonymous") : (prompt.seller || "anonymous")}`} 
                    alt="Seller" 
                    className="w-full h-full object-cover rounded-[calc(1rem-2.5px)] relative z-10" 
                  />
                </div>
                <div className="space-y-1">
                  <h4 className="font-black text-xl tracking-tight text-foreground">@{typeof prompt.seller === 'object' ? (prompt.seller.name || prompt.seller.username || "anonymous") : (prompt.seller || "anonymous")}</h4>
                  <div className="flex items-center gap-3">
                    <Badge className="bg-primary/10 text-primary border-primary/20 text-[9px] font-black tracking-widest">MASTER</Badge>
                    <span className="text-xs font-black text-muted-foreground uppercase">{prompt.rating} SCORE</span>
                  </div>
                </div>
              </div>
              <Link href={`/u/${typeof prompt.seller === 'object' ? (prompt.seller.username || prompt.seller.name || "anonymous") : (prompt.seller || "anonymous")}`} className="w-full">
                <Button variant="outline" className="w-full h-12 border border-border/40 rounded-xl hover:border-primary/30 transition-all font-black uppercase tracking-widest text-[10px]">Engineer Profile</Button>
              </Link>
            </div>

            <div className="space-y-4 bg-primary/5 p-6 rounded-[2rem] border border-primary/10">
              <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.15em] text-primary">
                <ShieldCheck className="w-4 h-4" /> Secure Channel
              </div>
              <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.15em] text-primary/60">
                <ShieldCheck className="w-4 h-4" /> Infinite Versioning
              </div>
            </div>
          </Card>
        </aside>
      </div>
      
      {!isPurchased && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 p-6 bg-background/95 backdrop-blur-2xl border-t border-border/40 z-50 shadow-2xl">
          <Button className="w-full h-16 rounded-2xl text-base font-black uppercase tracking-widest bg-primary text-white shadow-lg shadow-primary/20" onClick={handlePurchase}>
            Unlock Engineering • {prompt.price} Coins
          </Button>
        </div>
      )}
    </div>
  );
}

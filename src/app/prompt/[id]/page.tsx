"use client";

import * as React from "react";
import { useState } from "react";
import { Lock, Wallet, Star, ShieldCheck, Download, Copy, Share2, Heart, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { prompts, users } from "@/lib/dummyData";
import { notFound } from "next/navigation";
import Link from "next/link"; // Added Link import

export default function PromptDetailPage({ params: paramsPromise }: { params: Promise<{ id: string }> }) {
  const params = React.use(paramsPromise);
  const prompt = prompts.find(p => p.id === params.id);
  
  if (!prompt) {
    return notFound();
  }

  const seller = users.find(u => u.username === prompt.seller);
  const [isPurchased, setIsPurchased] = useState(false);

  const handlePurchase = () => {
    // Mock purchase logic
    toast.success("Prompt purchased successfully!");
    setIsPurchased(true);
  };

  return (
    <div className="container mx-auto px-6 py-16 max-w-7xl">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
        {/* Left: Gallery & Content */}
        <div className="lg:col-span-2 space-y-16">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-3 text-[10px] uppercase font-black tracking-[0.2em] text-muted-foreground/60">
            <Link href="/explore" className="hover:text-skyblue transition-colors">Explore</Link> 
            <span className="w-1 h-1 rounded-full bg-white/20" /> 
            <span>{prompt.platform}</span> 
            <span className="w-1 h-1 rounded-full bg-white/20" /> 
            <span className="text-foreground">{prompt.title}</span>
          </div>

          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <Badge className="bg-skyblue/10 text-skyblue border-skyblue/20 px-4 py-1.5 rounded-xl font-black">{prompt.platform}</Badge>
              <Badge variant="outline" className="border-white/10 px-4 py-1.5 rounded-xl text-muted-foreground font-bold">{prompt.category}</Badge>
            </div>
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl font-black tracking-tighter leading-none">{prompt.title}</h1>
              <p className="text-xl text-muted-foreground/80 font-medium leading-relaxed max-w-3xl">
                {prompt.tagline}
              </p>
            </div>
          </div>

          {/* Image Gallery */}
          <div className="grid grid-cols-1 gap-6">
            <div className="aspect-[16/9] w-full rounded-[3rem] overflow-hidden bg-muted relative border border-white/5 shadow-2xl group">
              <img 
                src={prompt.images[0]} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" 
                alt="Main Preview"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
              <div className="absolute bottom-10 left-10">
                <Badge className="bg-black/60 backdrop-blur-2xl border-white/10 text-skyblue font-black tracking-[0.2em] text-[10px] px-6 py-2 rounded-2xl uppercase">High Definition Preview</Badge>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-6">
              {prompt.images.map((img, i) => (
                <div key={i} className="aspect-square rounded-[2rem] overflow-hidden bg-muted cursor-pointer hover:ring-4 ring-skyblue/30 transition-all border border-white/5 shadow-lg group">
                  <img 
                    src={img} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                    alt={`Preview ${i}`}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Prompt Section */}
          <Card className="glass-panel relative overflow-hidden rounded-[3rem] border-white/5 shadow-2xl">
            <div className="p-12 space-y-10">
              <div className="flex justify-between items-center">
                <div className="space-y-1">
                  <h2 className="text-2xl font-black tracking-tight flex items-center gap-3">
                    <Sparkles className="w-7 h-7 text-skyblue" /> Logic Engine
                  </h2>
                  <p className="text-xs text-muted-foreground font-medium">Verified prompt construction for optimal results</p>
                </div>
                {isPurchased && (
                  <Button variant="outline" size="sm" className="h-10 rounded-xl gap-2 font-bold border-white/10 hover:bg-skyblue/10 hover:text-skyblue" onClick={() => {
                    navigator.clipboard.writeText(prompt.preview);
                    toast.success("Ready to paste!");
                  }}>
                    <Copy className="w-4 h-4" /> Copy Instructions
                  </Button>
                )}
              </div>

              <div className="relative font-mono text-sm leading-relaxed whitespace-pre-wrap rounded-[2rem] p-10 bg-black/40 border border-white/10 min-h-[250px] shadow-inner">
                {!isPurchased ? (
                  <>
                    <div className="select-none text-muted-foreground/30 italic blur-[2px]">
                      {prompt.preview.substring(0, 150)}...
                      {prompt.preview.substring(0, 150)}...
                    </div>
                    {/* Blur Mask */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/95 to-transparent backdrop-blur-md flex flex-col items-center justify-center p-12 text-center gap-8">
                      <div className="w-20 h-20 bg-skyblue/10 rounded-3xl flex items-center justify-center border border-skyblue/20 shadow-2xl relative">
                        <div className="absolute inset-0 bg-skyblue/20 blur-2xl rounded-full" />
                        <Lock className="w-10 h-10 text-skyblue relative z-10" />
                      </div>
                      <div className="space-y-3">
                        <h3 className="text-3xl font-black tracking-tighter">Content Locked</h3>
                        <p className="text-sm text-muted-foreground max-w-xs font-medium leading-relaxed">
                          Secure this logic engine to gain lifetime access to the full command set.
                        </p>
                      </div>
                      <Button className="rounded-full px-12 h-14 bg-skyblue text-white hover:bg-skyblue/90 font-black uppercase tracking-widest text-xs shadow-[0_15px_40px_-5px_rgba(56,189,248,0.5)] transition-all hover:scale-105" onClick={handlePurchase}>
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
                    {prompt.preview}
                  </motion.div>
                )}
              </div>
            </div>
          </Card>

          {/* Reviews Section */}
          <div className="space-y-10">
            <h2 className="text-3xl font-black tracking-tight">Trust & Feedback</h2>
            <div className="grid gap-8">
              {[1, 2].map((i) => (
                <Card key={i} className="glass-card p-10 rounded-[2.5rem] border-white/5 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-skyblue/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                  <div className="flex justify-between items-start mb-6 relative">
                    <div className="flex gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-white/5 overflow-hidden border border-white/10 shadow-lg">
                        <img src={`https://i.pravatar.cc/150?u=rev${i}`} alt="Reviewer" className="w-full h-full object-cover" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-black tracking-tight text-lg">Verified Creator_{i}</h4>
                        <div className="flex gap-1 text-skyblue">
                          {[1, 2, 3, 4, 5].map((s) => <Star key={s} className="w-4 h-4 fill-current drop-shadow-[0_0_5px_rgba(56,189,248,0.5)]" />)}
                        </div>
                      </div>
                    </div>
                    <Badge className="bg-skyblue/10 text-skyblue border-skyblue/20 px-4 py-1.5 font-black uppercase tracking-widest text-[9px]">Verified Purchase</Badge>
                  </div>
                  <p className="text-muted-foreground font-medium text-base leading-relaxed relative group-hover:text-foreground transition-colors italic">
                    "High-performance prompt construction. The detail is incredible and works perfectly on the first try! Definitely worth the investment for professional workflows."
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Actions Sidebar */}
        <aside className="space-y-10">
          <Card className="glass-panel p-10 rounded-[3rem] sticky top-28 border-white/5 space-y-10 shadow-3xl">
            <div className="space-y-3">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">Investment Required</span>
              <div className="flex items-end gap-3 text-6xl font-black text-skyblue tracking-tighter">
                {prompt.price}<span className="text-sm font-black uppercase tracking-[0.2em] text-muted-foreground pb-2">CR</span>
              </div>
            </div>

            <div className="space-y-4">
              {!isPurchased ? (
                <Button className="w-full h-16 rounded-2xl text-base font-black uppercase tracking-widest bg-skyblue text-white hover:bg-skyblue/90 shadow-[0_20px_50px_-10px_rgba(56,189,248,0.5)] transition-all hover:scale-[1.02]" onClick={handlePurchase}>
                  Acquire Logic
                </Button>
              ) : (
                <div className="grid grid-cols-1 gap-4">
                  <Button className="w-full h-16 rounded-2xl bg-white/5 border border-white/10 hover:bg-skyblue hover:text-white transition-all font-black uppercase tracking-widest text-xs">
                    <Download className="w-5 h-5 mr-3" /> Download Source
                  </Button>
                  <Button className="w-full h-16 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all font-black uppercase tracking-widest text-xs">
                    <Share2 className="w-5 h-5 mr-3" /> Distribute
                  </Button>
                </div>
              )}
              <Button variant="outline" className="w-full h-16 rounded-2xl border-white/5 bg-white/5 hover:bg-white/10 transition-all font-black uppercase tracking-widest text-xs">
                <Heart className="w-5 h-5 mr-3" /> Save to Vault
              </Button>
            </div>

            <div className="border-t border-white/5 pt-10 space-y-8">
              <div className="flex items-center gap-5">
                <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-skyblue/20 p-0.5 shadow-2xl relative group">
                  <div className="absolute inset-0 bg-skyblue/20 animate-pulse" />
                  <img src={seller?.avatar || `https://i.pravatar.cc/150?u=${prompt.seller}`} alt="Seller" className="w-full h-full object-cover rounded-[calc(1rem-2.5px)] relative z-10" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-black text-xl tracking-tight">@{prompt.seller}</h4>
                  <div className="flex items-center gap-3">
                    <Badge className="bg-skyblue/10 text-skyblue border-skyblue/20 text-[9px] font-black tracking-widest">MASTER</Badge>
                    <span className="text-xs font-black text-muted-foreground uppercase">{prompt.rating} SCORE</span>
                  </div>
                </div>
              </div>
              <Link href={`/u/${prompt.seller}`} className="w-full">
                <Button variant="outline" className="w-full h-12 border border-white/5 rounded-xl hover:border-skyblue/30 transition-all font-black uppercase tracking-widest text-[10px]">Engineer Profile</Button>
              </Link>
            </div>

            <div className="space-y-4 bg-skyblue/5 p-6 rounded-[2rem] border border-skyblue/10">
              <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.15em] text-skyblue">
                <ShieldCheck className="w-4 h-4" /> Secure Channel
              </div>
              <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.15em] text-skyblue/60">
                <ShieldCheck className="w-4 h-4" /> Infinite Versioning
              </div>
            </div>
          </Card>
        </aside>
      </div>
      
      {/* Mobile Sticky CTA */}
      {!isPurchased && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 p-6 bg-background/95 backdrop-blur-2xl border-t border-white/5 z-50">
          <Button className="w-full h-16 rounded-2xl text-base font-black uppercase tracking-widest bg-skyblue text-white shadow-[0_-15px_40px_-5px_rgba(56,189,248,0.4)]" onClick={handlePurchase}>
            Unlock Engineering • {prompt.price} Coins
          </Button>
        </div>
      )}
    </div>
  );
}

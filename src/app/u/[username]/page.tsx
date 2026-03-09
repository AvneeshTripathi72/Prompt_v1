"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { PromptCard } from "@/components/prompt/PromptCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, MessageCircle, Share2, Globe, Twitter, Github, Zap, Search } from "lucide-react";
import { notFound } from "next/navigation";

export default function SellerProfilePage({ params: paramsPromise }: { params: Promise<{ username: string }> }) {
  const params = React.use(paramsPromise);
  const [user, setUser] = useState<any>(null);
  const [sellerPrompts, setSellerPrompts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // 1. Fetch user profile
        const userRes = await fetch(`/api/user/${params.username}`);
        if (!userRes.ok) {
          setError(true);
          return;
        }
        const userData = await userRes.json();
        setUser(userData);

        // 2. Fetch user prompts
        const promptsRes = await fetch(`/api/prompts?seller=${params.username}`);
        const promptsData = await promptsRes.json();
        if (promptsData.prompts) {
          setSellerPrompts(promptsData.prompts);
        }
      } catch (err) {
        console.error("Failed to fetch profile data:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [params.username]);

  if (error) {
    return notFound();
  }

  if (loading) {
    return (
      <div className="container mx-auto px-6 py-16 max-w-7xl animate-pulse space-y-16">
        <div className="h-64 bg-white/5 rounded-[4rem]" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {[1, 2, 3, 4].map(i => <div key={i} className="h-[400px] bg-white/5 rounded-[2.5rem]" />)}
        </div>
      </div>
    );
  }

  if (!user) return notFound();

  const totalSales = sellerPrompts.reduce((acc, p) => acc + (p.sales || 0), 0);

  return (
    <div className="container mx-auto px-6 py-16 max-w-7xl">
      <div className="space-y-16">
        <div className="glass-panel p-12 md:p-16 rounded-[4rem] border-white/5 relative overflow-hidden shadow-3xl">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-skyblue/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="flex flex-col md:flex-row items-center md:items-start gap-12 relative z-10">
            <div className="w-44 h-44 rounded-[3rem] overflow-hidden border-2 border-skyblue/20 p-1.5 shadow-2xl group flex items-center justify-center bg-white/5">
              {user.avatar ? (
                <img 
                  src={user.avatar} 
                  className="w-full h-full object-cover rounded-[2.8rem] group-hover:scale-110 transition-transform duration-700" 
                  alt="Profile"
                />
              ) : (
                <div className="w-full h-full rounded-[2.8rem] bg-skyblue/10 flex items-center justify-center">
                  <span className="text-4xl font-black text-skyblue/30">{user.username[0]?.toUpperCase()}</span>
                </div>
              )}
            </div>
            
            <div className="flex-grow text-center md:text-left space-y-8">
              <div className="space-y-4">
                <div className="flex flex-col md:flex-row md:items-center gap-6 justify-center md:justify-start">
                  <h1 className="text-5xl font-black tracking-tighter">@{user.username}</h1>
                  <Badge className="w-fit mx-auto md:mx-0 bg-skyblue/10 text-skyblue border-skyblue/20 px-4 py-1.5 rounded-xl font-black uppercase tracking-widest text-[9px]">Elite Engineer</Badge>
                </div>
                <p className="text-xl text-muted-foreground/80 font-medium max-w-2xl leading-relaxed italic">
                  "{user.bio || "No biography available."}"
                </p>
              </div>

              <div className="flex items-center justify-center md:justify-start gap-10">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Quality</span>
                  <div className="flex items-center gap-2 font-black text-2xl tracking-tighter">
                    <Star className="w-5 h-5 text-skyblue fill-current" /> 4.98
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Output</span>
                  <div className="flex items-center gap-2 font-black text-2xl tracking-tighter">
                    <Globe className="w-5 h-5 text-skyblue" /> {totalSales}+
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Expertise</span>
                  <div className="flex items-center gap-2 font-black text-2xl tracking-tighter">
                    <Zap className="w-5 h-5 text-skyblue" /> L5
                  </div>
                </div>
              </div>

              <div className="flex justify-center md:justify-start gap-4">
                <Button variant="outline" className="h-12 w-12 rounded-2xl border-white/5 bg-white/5 hover:border-skyblue/30 transition-all p-0"><Twitter className="w-4 h-4 text-skyblue" /></Button>
                <Button variant="outline" className="h-12 w-12 rounded-2xl border-white/5 bg-white/5 hover:border-skyblue/30 transition-all p-0"><Github className="w-4 h-4 text-skyblue" /></Button>
                <Button variant="outline" className="h-12 w-12 rounded-2xl border-white/5 bg-white/5 hover:border-skyblue/30 transition-all p-0"><Share2 className="w-4 h-4 text-skyblue" /></Button>
              </div>
            </div>

            <div className="flex flex-col gap-4 w-full md:w-auto">
              <Button className="h-16 rounded-[2rem] px-10 font-black uppercase tracking-widest text-xs bg-skyblue text-white shadow-[0_15px_40px_-10px_rgba(56,189,248,0.5)] transition-all hover:scale-105">Verify Connection</Button>
              <Button variant="outline" className="h-16 rounded-[2rem] px-10 font-black uppercase tracking-widest text-xs border-white/5 hover:bg-white/5">Signal Creator</Button>
            </div>
          </div>
        </div>

        <div className="space-y-12">
          <div className="flex justify-between items-end border-b border-white/5 pb-8">
            <div className="space-y-2">
              <h2 className="text-3xl font-black tracking-tight">Logic Inventory</h2>
              <p className="text-xs text-muted-foreground font-black uppercase tracking-widest">A curated catalog of verified instructions</p>
            </div>
            <span className="text-xs font-black text-skyblue bg-skyblue/5 px-4 py-2 rounded-xl border border-skyblue/10">{sellerPrompts.length} Assets Found</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {sellerPrompts.map((prompt) => (
              <PromptCard 
                key={prompt._id || prompt.id}
                id={prompt._id || prompt.id}
                title={prompt.title || "Untitled Prompt"}
                tagline={prompt.tagline || ""}
                price={prompt.price || 0}
                rating={prompt.rating || 5}
                platform={prompt.platform || "Unknown"}
                author={{ username: user.username, avatar: user.avatar || "" }}
                previewImage={prompt.images?.[0] || ""}
                promptPreview={prompt.promptText?.substring(0, 80) || ""}
              />
            ))}
          </div>
          {sellerPrompts.length === 0 && (
            <div className="py-40 text-center space-y-4">
              <MessageCircle className="w-16 h-16 mx-auto text-muted-foreground/20" />
              <div className="space-y-1">
                <p className="text-2xl font-black text-muted-foreground/40 uppercase tracking-widest">No assets deployed</p>
                <p className="text-sm font-medium text-muted-foreground/60">This creator has not listed any public prompts yet.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

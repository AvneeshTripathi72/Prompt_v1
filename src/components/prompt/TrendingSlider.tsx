"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { ChevronLeft, ChevronRight, Flame, Star, Wallet } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

export const TrendingSlider = ({ prompts, users = [] }: { prompts: any[], users?: any[] }) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeFeaturedIndex, setActiveFeaturedIndex] = useState(0);

  const safePrompts = Array.isArray(prompts) ? prompts : [];
  const featuredPrompts = safePrompts.slice(0, 5);
  const otherTrending = safePrompts.slice(5, 15);

  useEffect(() => {
    if (featuredPrompts.length === 0) return;
    const timer = setInterval(() => {
      setActiveFeaturedIndex((prev) => (prev + 1) % featuredPrompts.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [featuredPrompts.length]);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, []);

  const scrollTrending = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -350 : 350;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const currentFeatured = featuredPrompts[activeFeaturedIndex];

  return (
    <div className="space-y-16">
      <div className="relative group">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-crimson/20 rounded-2xl flex items-center justify-center border border-crimson/20 shadow-[0_0_20px_-5px_hsl(0_60%_70%_/_0.3)]">
              <Flame className="w-6 h-6 text-crimson fill-current" />
            </div>
            <div>
              <h2 className="text-3xl font-black tracking-tight flex items-center gap-3">Trending <span className="text-crimson">Logic</span></h2>
              <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-widest opacity-50">Hot Architectures This Minute</p>
            </div>
          </div>

          <div className="flex gap-3">
            <Button 
              variant="outline" 
              size="icon" 
              className="w-12 h-12 rounded-2xl border-white/5 bg-background/50 backdrop-blur-sm hover:bg-crimson hover:text-white transition-all"
              onClick={() => setActiveFeaturedIndex((prev) => (prev - 1 + featuredPrompts.length) % featuredPrompts.length)}
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              className="w-12 h-12 rounded-2xl border-white/5 bg-background/50 backdrop-blur-sm hover:bg-crimson hover:text-white transition-all"
              onClick={() => setActiveFeaturedIndex((prev) => (prev + 1) % featuredPrompts.length)}
            >
              <ChevronRight className="w-6 h-6" />
            </Button>
          </div>
        </div>

        {currentFeatured && (
          <Link href={`/prompt/${currentFeatured.id || currentFeatured._id}`}>
            <motion.div
              key={currentFeatured.id || currentFeatured._id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <Card className="glass-card group/card overflow-hidden rounded-[2.5rem] h-[480px] flex flex-col md:flex-row relative premium-shadow border-white/5 hover:border-skyblue/30 transition-all duration-700">
                <div className="absolute top-10 left-10 z-30">
                  <div className="w-20 h-20 bg-crimson rounded-3xl flex items-center justify-center border-4 border-white/10 font-black text-5xl text-white shadow-2xl animate-float">
                    {activeFeaturedIndex + 1}
                  </div>
                </div>

                <div className="absolute bottom-10 right-10 z-30 flex gap-2">
                  {featuredPrompts.map((_, i) => (
                    <button 
                      key={i}
                      onClick={(e) => {
                        e.preventDefault();
                        setActiveFeaturedIndex(i);
                      }}
                      className={cn(
                        "h-1.5 rounded-full transition-all duration-500",
                        i === activeFeaturedIndex ? "w-8 bg-crimson" : "w-1.5 bg-white/20 hover:bg-white/40"
                      )}
                    />
                  ))}
                </div>

                <div className="md:w-3/5 relative h-full bg-muted overflow-hidden">
                  {currentFeatured.images?.[0] ? (
                    <img 
                      src={currentFeatured.images[0]} 
                      alt={currentFeatured.title} 
                      className="w-full h-full object-cover group-hover/card:scale-110 transition-transform duration-[2000ms] cubic-bezier(0.4, 0, 0.2, 1)"
                    />
                  ) : (
                    <div className="w-full h-full bg-skyblue/5 flex items-center justify-center">
                      <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/20">No Preview</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-r from-background/0 via-background/0 to-background hidden md:block" />
                  <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent md:hidden" />
                  
                  <div className="absolute bottom-10 left-10 flex gap-4">
                    <Badge className="bg-skyblue text-black font-black px-6 py-2 rounded-xl text-xs uppercase tracking-widest">{currentFeatured.platform}</Badge>
                    <Badge className="bg-white/10 backdrop-blur-xl border-white/10 text-white font-black px-6 py-2 rounded-xl text-xs uppercase tracking-widest">Verified Logic</Badge>
                  </div>
                </div>

                <div className="md:w-2/5 p-8 md:p-12 flex flex-col justify-center gap-6 relative z-10 bg-background/50 backdrop-blur-3xl md:bg-transparent">
                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                      <Star className="w-5 h-5 text-crimson fill-current" />
                      <span className="text-sm font-black uppercase tracking-[0.2em] text-crimson">Elite Status</span>
                    </div>
                    <h3 className="text-4xl md:text-5xl font-black tracking-tighter leading-[0.9] group-hover/card:text-gradient-lavender transition-all duration-500">
                      {currentFeatured.title}
                    </h3>
                    <p className="text-lg text-muted-foreground/80 leading-relaxed font-medium line-clamp-3">
                      {currentFeatured.tagline}
                    </p>
                  </div>

                  <div className="flex flex-col gap-8 pt-8 border-t border-white/10">
                    <div className="flex items-center gap-5">
                      <div className="w-16 h-16 rounded-3xl overflow-hidden border-2 border-skyblue/30 shadow-2xl transform group-hover/card:rotate-12 transition-transform duration-500 flex items-center justify-center bg-white/5">
                        {currentFeatured.seller ? (
                          <img 
                            src={`https://avatar.iran.liara.run/public/boy?username=${currentFeatured.seller}`} 
                            alt="Avatar" 
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-skyblue/10" />
                        )}
                      </div>
                    <div className="flex flex-col">
                      <span className="text-lg font-black tracking-tight">@{currentFeatured.seller}</span>
                      <span className="text-[10px] text-muted-foreground font-black uppercase tracking-widest">Genesis Creator</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">Professional License</span>
                      <div className="flex items-center gap-3">
                        <Wallet className="w-6 h-6 text-skyblue" />
                        <span className="text-3xl font-black text-skyblue">{currentFeatured.price}</span>
                      </div>
                    </div>
                    <Button className="h-14 px-8 rounded-xl bg-crimson text-white font-black uppercase tracking-widest hover:scale-105 active:scale-95 shadow-[0_15px_40px_-10px_rgba(255,100,100,0.4)] transition-all">
                      Unlock Now
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </Link>
      )}
    </div>

      <div className="relative pt-10">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-2xl font-black tracking-tight uppercase tracking-widest flex items-center gap-3 text-muted-foreground">
            <span className="w-8 h-[2px] bg-white/10" /> Global Standouts
          </h3>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="icon" 
              className={`w-12 h-12 rounded-2xl border-white/5 bg-background/50 backdrop-blur-sm transition-all ${!canScrollLeft ? 'opacity-30 cursor-not-allowed' : 'hover:bg-skyblue hover:text-black hover:border-skyblue'}`}
              onClick={() => scrollTrending("left")}
              disabled={!canScrollLeft}
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              className={`w-12 h-12 rounded-2xl border-white/5 bg-background/50 backdrop-blur-sm transition-all ${!canScrollRight ? 'opacity-30 cursor-not-allowed' : 'hover:bg-skyblue hover:text-black hover:border-skyblue'}`}
              onClick={() => scrollTrending("right")}
              disabled={!canScrollRight}
            >
              <ChevronRight className="w-6 h-6" />
            </Button>
          </div>
        </div>

        <div 
          ref={scrollRef}
          onScroll={checkScroll}
          className="flex gap-8 overflow-x-auto scrollbar-hide pb-10 px-2 -mx-2 snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {otherTrending.map((prompt, index) => {
            const user = users.find(u => u.username === prompt.seller);
            return (
              <motion.div
                key={prompt._id || prompt.id || `trending-${index}`}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="min-w-[320px] snap-start"
              >
                <Link href={`/prompt/${prompt.id}`}>
                  <Card className="glass-card group/card overflow-hidden rounded-[2rem] h-[380px] flex flex-col relative ring-1 ring-white/5 hover:ring-skyblue/30 transition-all duration-500">
                    <div className="absolute top-6 left-6 z-30 flex items-center gap-3">
                      <div className="w-12 h-12 bg-black/80 backdrop-blur-2xl rounded-xl flex items-center justify-center border border-white/10 font-black text-2xl text-white shadow-xl">
                        {index + 6}
                      </div>
                    </div>

                    <div className="relative h-48 bg-muted overflow-hidden">
                      {prompt.images?.[0] ? (
                        <img 
                          src={prompt.images[0]} 
                          alt={prompt.title} 
                          className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-700"
                        />
                      ) : (
                        <div className="w-full h-full bg-skyblue/5 flex items-center justify-center">
                          <span className="text-[8px] font-black uppercase tracking-widest text-muted-foreground/20">No Preview</span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                      <Badge className="absolute bottom-4 left-6 bg-white/10 backdrop-blur-xl border-white/10 text-white font-bold px-4 py-1.5 rounded-xl uppercase tracking-widest text-[8px]">
                        {prompt.platform}
                      </Badge>
                    </div>

                    <div className="p-8 flex-grow flex flex-col gap-4">
                      <h3 className="text-2xl font-black tracking-tight line-clamp-1 group-hover/card:text-skyblue transition-colors">{prompt.title}</h3>
                      <p className="text-sm text-muted-foreground/70 line-clamp-2 font-medium">{prompt.tagline}</p>

                      <div className="mt-auto flex justify-between items-center pt-6 border-t border-white/5">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl overflow-hidden border border-white/10 flex items-center justify-center bg-white/5">
                            {prompt.seller ? (
                              <img 
                                src={`https://avatar.iran.liara.run/public/boy?username=${prompt.seller}`} 
                                alt="Avatar" 
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full bg-skyblue/10" />
                            )}
                          </div>
                          <span className="text-sm font-bold tracking-tight">@{prompt.seller}</span>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          <div className="flex items-center gap-2 text-skyblue font-black text-xl">
                            <Wallet className="w-4 h-4" /> {prompt.price}
                          </div>
                          <div className="flex items-center gap-1 text-[10px] text-crimson font-black uppercase tracking-widest">
                            <Star className="w-3 h-3 fill-current" /> {prompt.rating}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

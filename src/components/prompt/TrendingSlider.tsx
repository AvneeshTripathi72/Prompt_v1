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

  const getSellerHandle = (seller: any) => {
    if (typeof seller === 'string') return seller;
    if (seller && typeof seller === 'object') return seller.name || seller.username || 'anonymous';
    return 'anonymous';
  };

  const getSellerAvatar = (seller: any) => {
    if (seller && typeof seller === 'object' && seller.avatar) return seller.avatar;
    return `https://avatar.iran.liara.run/public/boy?username=${getSellerHandle(seller)}`;
  };

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
    <div className="space-y-12">
      <div className="relative group">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center border border-primary/20">
              <Flame className="w-5 h-5 text-primary fill-current" />
            </div>
            <div>
              <h2 className="text-2xl font-black tracking-tight">Trending <span className="text-primary italic">Now</span></h2>
              <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest opacity-60">Handpicked by community experts</p>
            </div>
          </div>

          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="icon" 
              className="w-10 h-10 rounded-xl border-border/40 bg-background/50 hover:bg-primary hover:text-white transition-all shadow-sm"
              onClick={() => setActiveFeaturedIndex((prev) => (prev - 1 + featuredPrompts.length) % featuredPrompts.length)}
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              className="w-10 h-10 rounded-xl border-border/40 bg-background/50 hover:bg-primary hover:text-white transition-all shadow-sm"
              onClick={() => setActiveFeaturedIndex((prev) => (prev + 1) % featuredPrompts.length)}
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {currentFeatured && (
          <Link href={`/prompt/${currentFeatured.id || currentFeatured._id}`}>
            <motion.div
              key={currentFeatured.id || currentFeatured._id}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="glass-card overflow-hidden rounded-[2rem] h-[500px] flex flex-col md:flex-row relative border-border/40 hover:border-primary/40 transition-all duration-500 shadow-xl">
                <div className="md:w-3/5 h-[300px] md:h-full relative bg-muted overflow-hidden">
                  {currentFeatured.images?.[0] ? (
                    <img 
                      src={currentFeatured.images[0]} 
                      alt={currentFeatured.title} 
                      className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-[2000ms]"
                    />
                  ) : (
                    <div className="w-full h-full bg-primary/5" />
                  )}
                  <div className="absolute top-6 left-6 z-30">
                    <Badge className="bg-background/80 backdrop-blur-md border-border/50 text-foreground font-bold px-4 py-1.5 rounded-lg text-xs uppercase tracking-widest">{currentFeatured.platform}</Badge>
                  </div>
                </div>

                <div className="md:w-2/5 p-8 md:p-12 flex flex-col justify-center gap-8 bg-card border-t md:border-t-0 md:border-l border-border/40">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-primary">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="text-[10px] font-black uppercase tracking-widest">Featured Selection</span>
                    </div>
                    <h3 className="text-4xl md:text-5xl font-black tracking-tight leading-none text-foreground">
                      {currentFeatured.title}
                    </h3>
                    <p className="text-lg text-muted-foreground/80 leading-relaxed font-medium line-clamp-3">
                      {currentFeatured.tagline}
                    </p>
                  </div>

                  <div className="flex flex-col gap-6 pt-6 border-t border-border/40">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl overflow-hidden border border-border/50 bg-secondary flex items-center justify-center">
                          {currentFeatured.seller && (
                            <img 
                              src={getSellerAvatar(currentFeatured.seller)} 
                              alt="Avatar" 
                              className="w-full h-full object-cover"
                            />
                          )}
                        </div>
                        <div className="flex flex-col">
                          <span className="text-base font-bold text-foreground">@{getSellerHandle(currentFeatured.seller)}</span>
                          <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Elite Creator</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">Starting at</p>
                        <span className="text-3xl font-black text-primary italic">₹{currentFeatured.price}</span>
                      </div>
                    </div>
                    <Button className="h-14 rounded-xl bg-primary text-primary-foreground font-bold uppercase tracking-widest hover:translate-y-[-2px] hover:shadow-lg transition-all">
                      View full prompt
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          </Link>
        )}
      </div>

      <div className="relative pt-6">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-xl font-black tracking-tight uppercase tracking-[0.2em] text-muted-foreground/50">
            Recent Standouts
          </h3>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="icon" 
              className={cn(
                "w-10 h-10 rounded-xl border-border/40 bg-background/50 transition-all",
                !canScrollLeft ? 'opacity-30 cursor-not-allowed' : 'hover:bg-primary hover:text-white'
              )}
              onClick={() => scrollTrending("left")}
              disabled={!canScrollLeft}
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              className={cn(
                "w-10 h-10 rounded-xl border-border/40 bg-background/50 transition-all",
                !canScrollRight ? 'opacity-30 cursor-not-allowed' : 'hover:bg-primary hover:text-white'
              )}
              onClick={() => scrollTrending("right")}
              disabled={!canScrollRight}
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>

        <div 
          ref={scrollRef}
          onScroll={checkScroll}
          className="flex gap-6 overflow-x-auto scrollbar-hide pb-8 px-2 -mx-2 snap-x snap-mandatory"
        >
          {otherTrending.map((prompt, index) => (
            <motion.div
              key={prompt._id || prompt.id || `trending-${index}`}
              className="min-w-[280px] snap-start"
            >
              <Link href={`/prompt/${prompt.id}`}>
                <Card className="glass-card group/card overflow-hidden rounded-2xl flex flex-col relative border-border/40 hover:shadow-xl transition-all duration-300">
                  <div className="relative aspect-[3/4] bg-muted overflow-hidden">
                    {prompt.images?.[0] ? (
                      <img 
                        src={prompt.images[0]} 
                        alt={prompt.title} 
                        className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-primary/5" />
                    )}
                    <Badge className="absolute top-4 left-4 bg-background/80 backdrop-blur-md border-border/50 text-foreground font-bold px-3 py-1 rounded text-[9px] uppercase tracking-wider">
                      {prompt.platform}
                    </Badge>
                  </div>

                  <div className="p-4 flex-grow flex flex-col gap-3">
                    <h3 className="text-lg font-black tracking-tight text-foreground line-clamp-1 group-hover/card:text-primary transition-colors">{prompt.title}</h3>
                    <div className="mt-auto flex justify-between items-center pt-3 border-t border-border/30">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-secondary overflow-hidden border border-border/50 flex items-center justify-center">
                          <img 
                            src={getSellerAvatar(prompt.seller)} 
                            alt="Avatar" 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span className="text-[11px] font-bold text-muted-foreground">@{getSellerHandle(prompt.seller)}</span>
                      </div>
                      <span className="text-sm font-black text-primary italic">₹{prompt.price}</span>
                    </div>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

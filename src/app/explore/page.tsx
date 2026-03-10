"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, SlidersHorizontal, ChevronDown, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PromptCard } from "@/components/prompt/PromptCard";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import { useEffect, Suspense } from "react";

const CATEGORIES = ["All", "Marketing", "Development", "Design", "Writing"];
const PLATFORMS = ["ChatGPT", "Midjourney", "Claude", "Stable Diffusion"];

function ExploreContent() {
  const searchParams = useSearchParams();
  const q = searchParams.get("q") || "";
  
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [minRating, setMinRating] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState("Newest First");
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const ITEMS_PER_PAGE = 9;

  const [prompts, setPrompts] = useState<any[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchPrompts = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: ITEMS_PER_PAGE.toString(),
        q: q,
        category: activeCategory,
        platform: selectedPlatforms.join(","),
        minRating: minRating?.toString() || "",
        sortBy: sortBy,
        minPrice: priceRange[0].toString(),
        maxPrice: priceRange[1].toString(),
      });

      const res = await fetch(`/api/prompts?${params.toString()}`);
      const data = await res.json();
      
      if (data.prompts) {
        setPrompts(data.prompts);
        setTotalItems(data.total);
        setTotalPages(data.totalPages);
      } else {
        setPrompts([]);
        setTotalItems(0);
        setTotalPages(0);
      }
    } catch (error) {
      console.error("Failed to fetch prompts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrompts();
  }, [q, priceRange, activeCategory, selectedPlatforms, minRating, sortBy, currentPage]);

  const paginatedPrompts = prompts;


  const togglePlatform = (platform: string) => {
    setSelectedPlatforms(prev => 
      prev.includes(platform) ? prev.filter(p => p !== platform) : [...prev, platform]
    );
  };

  const handleReset = () => {
    setPriceRange([0, 1000]);
    setActiveCategory("All");
    setSelectedPlatforms([]);
    setMinRating(null);
    setSortBy("Newest First");
    setCurrentPage(1);
  };

  return (
    <div className="container mx-auto px-6 py-10 max-w-[1500px]">
      <div className="space-y-8">
        <div className="glass-card p-6 rounded-2xl border-border/50 shadow-sm space-y-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div className="space-y-2">
              <h1 className="text-3xl md:text-4xl font-black tracking-tight leading-none">
                Explore <span className="text-primary">Logic</span>
              </h1>
              <div className="flex items-center gap-4">
                <Button 
                  onClick={() => setShowFilters(!showFilters)}
                  className={cn(
                    "h-10 rounded-xl px-6 gap-2 font-bold uppercase tracking-widest text-[10px] transition-all duration-300",
                    showFilters 
                      ? "bg-destructive text-destructive-foreground shadow-sm" 
                      : "bg-primary text-primary-foreground hover:opacity-90 shadow-sm"
                  )}
                >
                  <SlidersHorizontal className={cn("w-3.5 h-3.5", showFilters ? "animate-spin-slow" : "")} /> 
                  {showFilters ? "Close Filters" : "Filter Logic"}
                </Button>
                <div className="h-4 w-px bg-border hidden md:block" />
                <p className="text-muted-foreground font-black text-[10px] uppercase tracking-widest opacity-60 hidden md:block">
                  {totalItems} Available
                </p>
              </div>
            </div>
            
            <Tabs value={activeCategory} className="w-full lg:w-fit">
              <TabsList className="bg-muted border border-border p-1 h-12 rounded-xl flex overflow-x-auto scrollbar-hide">
                {CATEGORIES.map((cat) => (
                  <TabsTrigger 
                    key={cat} 
                    value={cat}
                    className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-6 font-bold text-[10px] uppercase tracking-widest transition-all"
                    onClick={() => setActiveCategory(cat)}
                  >
                    {cat}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>

          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="pt-10 space-y-12">
                  <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent w-full" />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
                    <div className="space-y-6">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-skyblue animate-pulse" />
                        <label className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">Select Platform</label>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        {PLATFORMS.map((platform) => (
                          <Button
                            key={platform}
                            variant="outline"
                            size="sm"
                            className={cn(
                              "rounded-2xl h-12 border-white/5 font-black text-[10px] uppercase tracking-widest transition-all duration-500",
                              selectedPlatforms.includes(platform) 
                                ? "bg-skyblue text-white shadow-[0_10px_30px_-10px_rgba(56,189,248,0.5)] border-skyblue scale-105" 
                                : "bg-white/5 hover:bg-white/10 hover:border-white/20"
                            )}
                            onClick={() => togglePlatform(platform)}
                          >
                            {platform}
                          </Button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-8">
                      <div className="flex justify-between items-center">
                        <label className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">Price (Coins)</label>
                        <span className="text-skyblue font-black text-xs tracking-tighter bg-skyblue/10 px-3 py-1 rounded-lg">
                          {priceRange[0]} — {priceRange[1]}
                        </span>
                      </div>
                      <div className="px-2">
                        <Slider 
                          value={priceRange} 
                          max={1000} 
                          step={10} 
                          onValueChange={setPriceRange}
                          className="py-4"
                        />
                      </div>
                    </div>

                    <div className="space-y-6">
                      <label className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">Min Star Rating</label>
                      <div className="flex justify-between gap-3">
                        {[4, 3, 2, 1].map((rating) => (
                          <Button
                            key={rating}
                            variant="outline"
                            size="sm"
                            className={cn(
                              "rounded-2xl h-12 flex-grow border-white/5 font-black text-sm transition-all duration-500",
                              minRating === rating 
                                ? "bg-skyblue text-white border-skyblue shadow-xl scale-110 z-10" 
                                : "bg-white/5 hover:bg-white/10"
                            )}
                            onClick={() => setMinRating(minRating === rating ? null : rating)}
                          >
                            {rating}<Star className={cn("w-3 h-3 ml-1", minRating === rating ? "fill-current" : "opacity-30")} />
                          </Button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-6">
                      <label className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">Sort By</label>
                      <div className="flex gap-3">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="h-12 rounded-2xl bg-white/5 border-white/10 gap-3 font-black px-6 flex-grow text-[10px] uppercase tracking-widest hover:bg-white/10 transition-all">
                              {sortBy} <ChevronDown className="w-4 h-4 text-skyblue" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="glass-panel p-2 rounded-2xl border-white/10 min-w-[240px] z-[100] shadow-3xl">
                            {["Newest First", "Price: Low to High", "Price: High to Low", "Most Purchased"].map((option) => (
                              <DropdownMenuItem 
                                key={option}
                                className={cn(
                                  "p-4 rounded-xl font-black text-[10px] uppercase tracking-widest cursor-pointer mb-1 last:mb-0 transition-all",
                                  sortBy === option ? "bg-skyblue text-white shadow-lg" : "hover:bg-white/10"
                                )}
                                onClick={() => setSortBy(option)}
                              >
                                {option}
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenu>
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="h-12 w-12 rounded-2xl border-white/10 hover:border-crimson hover:text-crimson bg-white/5 transition-all duration-500 group"
                          onClick={handleReset}
                        >
                          <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-500" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-center gap-6 pt-4">
                    <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent w-64" />
                    <Button 
                      onClick={() => setShowFilters(false)}
                      className="h-13 px-12 rounded-2xl bg-skyblue text-white font-black uppercase tracking-[0.15em] text-[10px] shadow-[0_10px_30px_-5px_rgba(56,189,248,0.4)] hover:shadow-[0_15px_40px_-5px_rgba(56,189,248,0.6)] hover:scale-105 active:scale-95 transition-all duration-300 group relative overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                      <span className="relative">Show Results</span>
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-[400px] rounded-[2.5rem] bg-white/5 animate-pulse border border-white/5" />
            ))
          ) : (
            paginatedPrompts.map((prompt: any) => (
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
                    : `https://avatar.iran.liara.run/public/boy?username=${typeof prompt.seller === 'object' ? (prompt.seller.name || prompt.seller.username || "anonymous") : (prompt.seller || "anonymous")}`
                }}
                previewImage={prompt.images?.[0] || ""}
                promptPreview={prompt.promptText?.substring(0, 80) || ""}
              />
            ))
          )}
        </div>
        
        {totalItems === 0 && (
          <div className="flex flex-col items-center justify-center py-40 text-center space-y-4">
            <Search className="w-16 h-16 text-muted-foreground/20" />
            <div className="space-y-1">
              <p className="text-2xl font-black">No matches found</p>
              <p className="text-muted-foreground font-medium">Try broadening your search or resetting filters.</p>
            </div>
          </div>
        )}
        
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 pt-12">
            <Button 
              variant="outline" 
              className="rounded-xl border-white/5 bg-white/5 h-12 w-12 p-0"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            
            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }).map((_, i) => (
                <Button
                  key={i + 1}
                  variant="outline"
                  className={cn(
                    "w-12 h-12 rounded-xl border-white/5 font-black transition-all",
                    currentPage === i + 1 ? "bg-skyblue border-skyblue text-white shadow-xl" : "bg-white/5"
                  )}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </Button>
              ))}
            </div>

            <Button 
              variant="outline" 
              className="rounded-xl border-white/5 bg-white/5 h-12 w-12 p-0"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ExplorePage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-12 h-12 border-4 border-skyblue border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <ExploreContent />
    </Suspense>
  );
}

"use client";

import { useState } from "react";
import { Search, SlidersHorizontal, ChevronDown, Star } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PromptCard } from "@/components/prompt/PromptCard";
import { prompts, users } from "@/lib/dummyData";
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

const CATEGORIES = ["All", "Design", "Development", "Marketing", "Writing", "Photography"];
const PLATFORMS = ["ChatGPT", "Midjourney", "Claude", "Stable Diffusion"];

function ExploreContent() {
  const searchParams = useSearchParams();
  const q = searchParams.get("q") || "";
  
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [minRating, setMinRating] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState("Newest First");

  const filteredPrompts = prompts.filter(p => {
    const matchesSearch = q === "" || 
      p.title.toLowerCase().includes(q.toLowerCase()) || 
      p.tagline.toLowerCase().includes(q.toLowerCase());
    const matchesCategory = activeCategory === "All" || p.category === activeCategory;
    const matchesPlatform = selectedPlatforms.length === 0 || selectedPlatforms.includes(p.platform);
    const matchesPrice = p.price >= priceRange[0] && p.price <= priceRange[1];
    const matchesRating = minRating === null || p.rating >= minRating;
    
    return matchesSearch && matchesCategory && matchesPlatform && matchesPrice && matchesRating;
  }).sort((a, b) => {
    if (sortBy === "Price: Low to High") return a.price - b.price;
    if (sortBy === "Price: High to Low") return b.price - a.price;
    // Default or "Newest" (mocking by sales/rating for now as there's no date)
    if (sortBy === "Most Purchased") return b.sales - a.sales;
    return 0;
  });

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
  };

  return (
    <div className="container mx-auto px-6 pt-10 pb-16 max-w-7xl">
      <div className="flex flex-col gap-12">

        <div className="flex flex-col lg:flex-row gap-12 pt-4">
          {/* Sidebar Filters */}
          <aside className="lg:w-72 space-y-10 sticky top-28 h-fit">
            <div className="glass-card p-8 rounded-[2rem] border-white/5 shadow-2xl space-y-8">
              <h3 className="text-lg font-black tracking-tight flex items-center gap-3">
                <SlidersHorizontal className="w-5 h-5 text-skyblue" /> Filters
              </h3>
              
              <div className="space-y-10">
                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Platforms</label>
                  <div className="grid grid-cols-1 gap-3">
                    {PLATFORMS.map((platform) => (
                      <div 
                        key={platform} 
                        className="flex items-center gap-3 cursor-pointer group"
                        onClick={() => togglePlatform(platform)}
                      >
                        <div className={cn(
                          "w-5 h-5 rounded-lg border-2 transition-all flex items-center justify-center p-1",
                          selectedPlatforms.includes(platform) 
                            ? "bg-skyblue border-skyblue text-white rotate-0" 
                            : "border-white/10 group-hover:border-skyblue/50 bg-white/5"
                        )}>
                          {selectedPlatforms.includes(platform) && <Check className="w-4 h-4" strokeWidth={4} />}
                        </div>
                        <span className={cn(
                          "text-sm font-semibold transition-colors",
                          selectedPlatforms.includes(platform) ? "text-skyblue" : "group-hover:text-skyblue"
                        )}>{platform}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-5">
                  <div className="flex justify-between items-center">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Price Range</label>
                    <span className="text-xs font-black text-skyblue bg-skyblue/5 px-2.5 py-1 rounded-lg border border-skyblue/10">{priceRange[0]} - {priceRange[1]}</span>
                  </div>
                  <Slider 
                    value={priceRange} 
                    max={1000} 
                    step={10} 
                    onValueChange={setPriceRange}
                    className="py-2 cursor-pointer"
                  />
                  <p className="text-[10px] text-muted-foreground font-medium text-center">Price measured in coins</p>
                </div>

                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Quality Score</label>
                  <div className="space-y-3">
                    {[4, 3, 2, 1].map((rating) => (
                      <div 
                        key={rating} 
                        className="flex items-center gap-3 cursor-pointer group"
                        onClick={() => setMinRating(minRating === rating ? null : rating)}
                      >
                        <div className={cn(
                          "w-5 h-5 rounded-lg border-2 transition-all flex items-center justify-center p-1",
                          minRating === rating
                            ? "bg-crimson border-crimson text-white"
                            : "border-white/10 group-hover:border-skyblue/50 bg-white/5"
                        )}>
                          {minRating === rating && <Check className="w-4 h-4" strokeWidth={4} />}
                        </div>
                        <span className={cn(
                          "text-sm font-semibold flex items-center gap-1.5 transition-colors",
                          minRating === rating ? "text-crimson" : "group-hover:text-skyblue"
                        )}>
                          <Star className={cn("w-3.5 h-3.5 fill-current", minRating === rating ? "text-white" : "text-skyblue")} /> {rating}+ Ratings
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <Button 
                variant="outline" 
                className="w-full h-12 rounded-xl text-xs font-black uppercase tracking-widest border-white/5 hover:border-crimson hover:text-crimson transition-all font-bold group" 
                onClick={handleReset}
              >
                <X className="w-4 h-4 mr-2 group-hover:rotate-90 transition-transform" /> Reset All Filters
              </Button>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-grow space-y-10">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
              <Tabs defaultValue="All" className="w-full sm:w-fit">
                <TabsList className="bg-white/5 border border-white/5 p-1.5 h-14 rounded-2xl flex overflow-x-auto scrollbar-hide">
                  {CATEGORIES.map((cat) => (
                    <TabsTrigger 
                      key={cat} 
                      value={cat}
                      className="rounded-xl data-[state=active]:bg-skyblue data-[state=active]:text-white px-6 font-bold text-sm transition-all shadow-xl"
                      onClick={() => setActiveCategory(cat)}
                    >
                      {cat}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="h-14 rounded-2xl bg-white/5 border-white/5 gap-3 font-bold px-6 shadow-xl">
                    Sort by <ChevronDown className="w-4 h-4 text-skyblue" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="glass-panel p-2 rounded-xl border-white/10 min-w-[200px] z-[100]">
                  {["Newest First", "Price: Low to High", "Price: High to Low", "Most Purchased"].map((option) => (
                    <DropdownMenuItem 
                      key={option}
                      className={cn(
                        "p-3 rounded-lg font-medium cursor-pointer mb-1 last:mb-0",
                        sortBy === option ? "bg-skyblue text-white" : "hover:bg-white/5 focus:bg-white/5"
                      )}
                      onClick={() => setSortBy(option)}
                    >
                      {option}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {filteredPrompts.map((prompt) => {
                const user = users.find(u => u.username === prompt.seller);
                return (
                  <PromptCard 
                    key={prompt.id}
                    id={prompt.id}
                    title={prompt.title}
                    tagline={prompt.tagline}
                    price={prompt.price}
                    rating={prompt.rating}
                    platform={prompt.platform}
                    author={{
                      username: prompt.seller,
                      avatar: user?.avatar || `https://i.pravatar.cc/150?u=${prompt.seller}`
                    }}
                    previewImage={prompt.images[0]}
                    promptPreview={prompt.preview.substring(0, 80)}
                  />
                );
              })}
            </div>
            
            {filteredPrompts.length === 0 && (
              <div className="flex flex-col items-center justify-center py-40 text-center space-y-4">
                <Search className="w-16 h-16 text-muted-foreground/20" />
                <div className="space-y-1">
                  <p className="text-2xl font-black">No matches found</p>
                  <p className="text-muted-foreground font-medium">Try broadening your search or resetting filters.</p>
                </div>
              </div>
            )}
            
            {filteredPrompts.length > 0 && (
              <div className="flex justify-center pt-16 border-t border-white/5">
                <Button variant="outline" className="h-14 px-12 rounded-full border-white/10 hover:bg-white/5 font-black uppercase tracking-widest text-xs">Load More Engineering</Button>
              </div>
            )}
          </div>
        </div>
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

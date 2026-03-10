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
    <div className="container mx-auto px-6 py-8 max-w-[1400px]">
      <div className="space-y-10">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 pb-6 border-b border-border/40">
          <div className="space-y-1">
            <h1 className="text-4xl font-black tracking-tight text-foreground">
              Market <span className="text-primary italic">Logic</span>
            </h1>
            <p className="text-muted-foreground text-sm font-medium">Explore engineered prompts from master creators.</p>
          </div>
          
          <div className="flex flex-wrap items-center gap-3">
            <Tabs value={activeCategory} className="w-full sm:w-fit">
              <TabsList className="bg-muted/50 border border-border/50 p-1 h-10 rounded-lg flex overflow-x-auto scrollbar-hide">
                {CATEGORIES.map((cat) => (
                  <TabsTrigger 
                    key={cat} 
                    value={cat}
                    className="rounded-md data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-5 font-bold text-[11px] uppercase tracking-wider transition-all"
                    onClick={() => setActiveCategory(cat)}
                  >
                    {cat}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
            
            <Button 
              variant="outline"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className={cn(
                "h-10 rounded-lg px-5 gap-2 font-bold text-[11px] uppercase tracking-widest border-border/50",
                showFilters ? "bg-primary/5 text-primary border-primary/30" : "bg-background text-foreground hover:bg-muted"
              )}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" /> 
              Filters
            </Button>
          </div>
        </div>

        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden bg-muted/30 p-8 rounded-2xl border border-border/40"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                {/* ... existing filters ... */}
                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-60">Platform</label>
                  <div className="grid grid-cols-2 gap-2">
                    {PLATFORMS.map((platform) => (
                      <Button
                        key={platform}
                        variant="outline"
                        size="sm"
                        className={cn(
                          "rounded-lg h-9 border-border/40 font-bold text-[10px] uppercase tracking-wider transition-all",
                          selectedPlatforms.includes(platform) ? "bg-primary text-white border-primary" : "bg-background hover:bg-muted"
                        )}
                        onClick={() => togglePlatform(platform)}
                      >
                        {platform}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="space-y-6">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-60">Price Range</label>
                  <Slider value={priceRange} max={1000} step={10} onValueChange={setPriceRange} className="py-2" />
                  <div className="flex justify-between text-[11px] font-bold text-muted-foreground">
                    <span>₹{priceRange[0]}</span>
                    <span>₹{priceRange[1]}</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-60">Min Rating</label>
                  <div className="flex gap-2">
                    {[4, 3, 2, 1].map((rating) => (
                      <Button
                        key={rating}
                        variant="outline"
                        size="sm"
                        className={cn(
                          "rounded-lg h-9 flex-grow border-border/40 font-bold text-xs",
                          minRating === rating ? "bg-primary text-white border-primary" : "bg-background hover:bg-muted"
                        )}
                        onClick={() => setMinRating(minRating === rating ? null : rating)}
                      >
                        {rating}★
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-60">Sort Direction</label>
                  <div className="flex gap-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="h-9 rounded-lg bg-background border-border/40 gap-2 font-bold px-4 flex-grow text-[10px] uppercase tracking-wider">
                          {sortBy} <ChevronDown className="w-3 h-3 text-primary" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="p-1 rounded-lg border-border/40 min-w-[200px]">
                        {["Newest First", "Price: Low to High", "Price: High to Low", "Most Purchased"].map((option) => (
                          <DropdownMenuItem key={option} className="text-[10px] font-bold uppercase tracking-wider p-2 cursor-pointer" onClick={() => setSortBy(option)}>
                            {option}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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

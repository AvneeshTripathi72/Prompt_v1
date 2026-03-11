"use client";

import { motion } from "framer-motion";
import { Flame } from "lucide-react";
import { PromptCard } from "@/components/prompt/PromptCard";

export const TrendingSlider = ({ prompts }: { prompts: any[] }) => {
  const safePrompts = Array.isArray(prompts) ? prompts : [];
  const displayPrompts = safePrompts.slice(0, 5);

  return (
    <div className="relative group">
      {/* Window Framing Concept */}
      <div className="rounded-[2.5rem] border border-border/40 bg-card overflow-hidden shadow-2xl relative transition-all duration-500 hover:shadow-primary/5">
        
        {/* Window Top Bar */}
        <div className="flex items-center justify-between px-8 py-5 border-b border-border/40 bg-muted/30 backdrop-blur-md">
          <div className="flex items-center gap-6">
            <div className="flex gap-2">
              <div className="w-3.5 h-3.5 rounded-full bg-red-500/20 border border-red-500/30 shadow-sm" />
              <div className="w-3.5 h-3.5 rounded-full bg-yellow-500/20 border border-yellow-500/30 shadow-sm" />
              <div className="w-3.5 h-3.5 rounded-full bg-green-500/20 border border-green-500/30 shadow-sm" />
            </div>
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-background/50 border border-border/40">
              <Flame className="w-3.5 h-3.5 text-primary" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground opacity-80">Market_Trending_Live</span>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-4">
            <div className="w-32 h-1.5 rounded-full bg-border/30 overflow-hidden">
               <motion.div 
                 initial={{ width: "30%" }} 
                 animate={{ width: "100%" }} 
                 transition={{ duration: 5, repeat: Infinity }}
                 className="h-full bg-primary" 
               />
            </div>
          </div>
        </div>

        {/* Content Area - Dynamic auto-fill to target 5 cards */}
        <div className="p-6 md:p-10 bg-grid-white/[0.02]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayPrompts.map((prompt, index) => (
              <motion.div
                key={prompt._id || prompt.id || `trending-${index}`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="h-full"
              >
                <PromptCard 
                  id={prompt._id || prompt.id}
                  title={prompt.title || "Untitled"}
                  tagline={prompt.tagline || ""}
                  price={prompt.price || 0}
                  rating={prompt.rating || 5}
                  platform={prompt.platform || "Unknown"}
                  author={{
                    username: typeof prompt.seller === 'object' ? (prompt.seller.name || prompt.seller.username || "anon") : (prompt.seller || "anonymous"),
                    avatar: (prompt.seller && typeof prompt.seller === 'object' && prompt.seller.avatar) || ""
                  }}
                  previewImage={prompt.images?.[0] || ""}
                  promptPreview={prompt.promptText?.substring(0, 100) || ""}
                />
              </motion.div>
            ))}
          </div>
        </div>

      </div>

      {/* Background Decorative Element */}
      <div className="absolute -z-10 -bottom-24 -right-24 w-96 h-96 bg-primary/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute -z-10 -top-24 -left-24 w-96 h-96 bg-primary/10 blur-[120px] rounded-full pointer-events-none" />
    </div>
  );
};




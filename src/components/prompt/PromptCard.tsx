"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Wallet, Lock, Eye } from "lucide-react";
import Link from "next/link";

interface PromptCardProps {
  id: string;
  title: string;
  tagline: string;
  price: number;
  rating: number;
  platform: string;
  author: {
    username: string;
    avatar: string;
  };
  previewImage: string;
  promptPreview: string;
}

export const PromptCard = ({
  id,
  title,
  tagline,
  price,
  rating,
  platform,
  author,
  previewImage,
  promptPreview,
}: PromptCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      layout
      whileHover={{ y: -8 }}
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/prompt/${id}`}>
        <Card className="glass-card group/card overflow-hidden rounded-3xl h-[440px] flex flex-col relative premium-shadow border-white/5 hover:border-skyblue/20">
          <div className="relative aspect-[4/3] bg-muted overflow-hidden">
            <AnimatePresence mode="wait">
              {isHovered ? (
                <motion.div
                  key="preview"
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  className="absolute inset-0 z-20 bg-background/95 backdrop-blur-xl p-8 flex flex-col justify-center items-center text-center gap-5"
                >
                  <div className="w-12 h-12 bg-skyblue/10 rounded-2xl flex items-center justify-center border border-skyblue/20">
                    <Lock className="w-6 h-6 text-skyblue" />
                  </div>
                  <p className="text-sm font-medium text-muted-foreground/90 leading-relaxed italic line-clamp-4 px-2">
                    "{promptPreview}..."
                  </p>
                  <div className="text-[10px] font-black uppercase tracking-widest text-skyblue bg-skyblue/5 px-3 py-1 rounded-full border border-skyblue/10">Access restricted</div>
                </motion.div>
              ) : null}
            </AnimatePresence>
            
            {previewImage ? (
              <img 
                src={previewImage} 
                alt={title} 
                className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110" 
              />
            ) : (
              <div className="w-full h-full bg-muted flex items-center justify-center">
                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/40">No Preview</p>
              </div>
            )}
            
            <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/20 to-transparent z-10" />
            
            <div className="absolute top-4 left-4 z-30 flex gap-2">
              <Badge className="bg-black/60 backdrop-blur-xl border-white/10 text-[10px] font-bold px-3 py-1 rounded-lg text-skyblue uppercase tracking-wider">{platform}</Badge>
            </div>
            
            <div className="absolute bottom-4 left-4 z-30 flex items-center gap-2 text-crimson">
              <Star className="w-4 h-4 fill-current drop-shadow-[0_0_8px_rgba(255,100,100,0.5)]" />
              <span className="text-sm font-black tracking-tight">{rating}</span>
            </div>
          </div>

          <div className="p-6 flex-grow flex flex-col gap-4">
            <div className="space-y-2">
              <h3 className="font-black text-xl tracking-tight line-clamp-1 group-hover:text-skyblue transition-colors duration-300">{title}</h3>
              <p className="text-sm text-muted-foreground/80 line-clamp-2 leading-relaxed font-medium">
                {tagline}
              </p>
            </div>

            <div className="mt-auto pt-5 flex justify-between items-center border-t border-white/5">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-skyblue/10 overflow-hidden border border-white/10 p-0.5 group-hover:rotate-6 transition-transform flex items-center justify-center">
                  {author.avatar ? (
                    <img src={author.avatar} alt={author.username} className="w-full h-full object-cover rounded-[calc(0.75rem-1px)]" />
                  ) : (
                    <div className="w-full h-full bg-skyblue/20 rounded-[calc(0.75rem-1px)]" />
                  )}
                </div>
                <span className="text-xs font-bold text-muted-foreground transition-colors group-hover:text-foreground">@{author.username}</span>
              </div>
              
              <div className="flex items-center gap-2 bg-crimson/10 px-4 py-2 rounded-2xl border border-crimson/20 shadow-[0_4px_12px_rgba(255,100,100,0.1)] group-hover:scale-105 transition-transform duration-300">
                <Wallet className="w-3.5 h-3.5 text-crimson" />
                <span className="text-base font-black text-crimson">{price}</span>
              </div>
            </div>
          </div>
        </Card>
      </Link>
    </motion.div>
  );
};

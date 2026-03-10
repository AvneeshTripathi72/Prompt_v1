"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Wallet, Lock, Eye, Sparkles } from "lucide-react";
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
        <Card className="glass-card group/card overflow-hidden rounded-2xl flex flex-col relative border-border hover:border-primary/50 bg-card shadow-sm transition-all duration-300 hover:shadow-[0_0_20px_rgba(139,92,246,0.15)]">
          <div className="relative aspect-[4/5] bg-muted overflow-hidden">
            <AnimatePresence mode="wait">
              {isHovered ? (
                <motion.div
                  key="preview"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 z-20 bg-background/80 backdrop-blur-md p-4 flex flex-col justify-center items-center text-center gap-2"
                >
                  <Lock className="w-5 h-5 text-primary" />
                  <p className="text-[10px] font-medium text-foreground/70 leading-tight italic line-clamp-3">
                    {promptPreview}
                  </p>
                </motion.div>
              ) : null}
            </AnimatePresence>
            
            {previewImage ? (
              <img 
                src={previewImage} 
                alt={title} 
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110" 
              />
            ) : (
              <div className="w-full h-full bg-muted/30 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-muted-foreground/20" />
              </div>
            )}
            
            <div className="absolute top-2 left-2 z-30">
              <Badge className="bg-black/40 backdrop-blur-md border border-white/10 text-[8px] font-bold px-1.5 py-0.5 rounded text-white uppercase tracking-wider">{platform}</Badge>
            </div>
          </div>

          <div className="p-3 flex flex-col gap-2 bg-card">
            <div className="space-y-0.5">
              <div className="flex justify-between items-start gap-2">
                <h3 className="font-bold text-[13px] leading-tight tracking-tight line-clamp-1 group-hover:text-primary transition-colors">{title}</h3>
                <div className="flex items-center gap-0.5 text-yellow-500 shrink-0">
                  <Star className="w-2.5 h-2.5 fill-current" />
                  <span className="text-[10px] font-bold">{rating}</span>
                </div>
              </div>
              <p className="text-[11px] text-muted-foreground line-clamp-1 font-medium italic">
                {tagline}
              </p>
            </div>

            <div className="flex justify-between items-center pt-2 border-t border-border/50">
              <div className="flex items-center gap-1.5">
                <div className="w-5 h-5 rounded-full bg-muted overflow-hidden border border-border">
                  {author.avatar && <img src={author.avatar} alt={author.username} className="w-full h-full object-cover" />}
                </div>
                <span className="text-[10px] font-bold text-muted-foreground">@{author.username}</span>
              </div>
              <span className="text-[13px] font-black text-primary">₹{price}</span>
            </div>
          </div>
        </Card>
      </Link>
    </motion.div>
  );
};

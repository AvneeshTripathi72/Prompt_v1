"use client";

import { useState } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Wallet, Lock, Eye, Sparkles } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

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
  aspectRatio?: string;
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
  const [imageRatio, setImageRatio] = useState<number>(3/4); // Default fallback

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const { naturalWidth, naturalHeight } = e.currentTarget;
    if (naturalWidth && naturalHeight) {
      setImageRatio(naturalWidth / naturalHeight);
    }
  };

  // 3D Tilt Effect Values
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
    
    // Set raw mouse position for glow effect
    mouseXRaw.set(mouseX);
    mouseYRaw.set(mouseY);
  };

  const mouseXRaw = useMotionValue(0);
  const mouseYRaw = useMotionValue(0);
  const glow = useTransform(
    [mouseXRaw, mouseYRaw],
    ([mx, my]) => `radial-gradient(400px circle at ${mx}px ${my}px, rgba(139, 92, 246, 0.1), transparent 80%)`
  );

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
    mouseXRaw.set(-1000);
    mouseYRaw.set(-1000);
  };

  return (
    <motion.div
      layout
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      whileHover={{ y: -6 }}
      className="group relative h-full perspective-1000"
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <Link href={`/prompt/${id}`} className="block h-full">
        <Card className="glass-card h-full overflow-hidden rounded-2xl flex flex-col border-border/40 bg-card/60 backdrop-blur-xl transition-all duration-300 relative">
          {/* Global Card Blurred Background (Integrated color matching) */}
          {previewImage && (
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
              <img 
                src={previewImage} 
                alt="" 
                className="w-full h-full object-cover blur-[80px] scale-150 opacity-20 contrast-150 brightness-110"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background/80" />
            </div>
          )}

          {/* Dynamic Glow Overlay */}
          <motion.div 
            className="absolute inset-0 z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ background: glow }}
          />
          
          {/* Image Section - Static 1:1 Aspect Ratio with Color-Matched Blur BG */}
          <div className="relative aspect-square overflow-hidden z-20">
            <AnimatePresence mode="wait">
              {isHovered && (
                <motion.div
                  key="preview"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 z-30 flex flex-col justify-center items-center text-center p-6"
                >
                  <div className="absolute inset-0 z-0 backdrop-blur-[6px] bg-background/30" />

                  <div className="relative z-10 flex flex-col items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-2xl">
                      <Lock className="w-5 h-5 text-white shadow-sm" />
                    </div>
                    <p className="text-[12px] font-bold text-white leading-tight drop-shadow-md italic line-clamp-4 max-w-[180px]">
                      "{promptPreview}"
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
            {previewImage ? (
              <img 
                src={previewImage} 
                alt={title} 
                className="absolute inset-0 w-full h-full object-contain z-10 p-2 transition-transform duration-500 ease-out group-hover:scale-105" 
              />
            ) : (
              <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-muted/10 z-10">
                <Sparkles className="w-6 h-6 text-muted-foreground/10" />
              </div>
            )}
            
            <div className="absolute top-3 left-3 z-30">
              <Badge className="bg-background/80 backdrop-blur-md border-border/50 text-[9px] font-bold px-2 py-0.5 rounded-md text-foreground uppercase tracking-wider">{platform}</Badge>
            </div>
          </div>

          {/* Content Section - Transparent to show matching blur */}
          <div className="p-4 flex flex-col gap-3 flex-grow relative z-20">
            <div className="space-y-1">
              <div className="flex justify-between items-start gap-2">
                <h3 className="font-bold text-[15px] leading-tight tracking-tight text-foreground line-clamp-1 group-hover:text-primary transition-colors">{title}</h3>
                <div className="flex items-center gap-0.5 text-yellow-500 shrink-0">
                  <Star className="w-3 h-3 fill-current" />
                  <span className="text-[11px] font-bold">{rating}</span>
                </div>
              </div>
              <p className="text-[12px] text-muted-foreground line-clamp-1 font-medium opacity-80">
                {tagline}
              </p>
            </div>

            <div className="mt-auto flex justify-between items-center pt-3 border-t border-border/20">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-secondary/50 overflow-hidden border border-border/50 flex items-center justify-center">
                  {author.avatar ? (
                    <img src={author.avatar} alt={author.username} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-[8px] font-bold opacity-30">{author.username[0]}</span>
                  )}
                </div>
                <span className="text-[11px] font-semibold text-muted-foreground hover:text-foreground transition-colors">@{author.username}</span>
              </div>
              <span className="text-[15px] font-black text-primary italic">₹{price}</span>
            </div>
          </div>
        </Card>

      </Link>
    </motion.div>
  );
};

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
        <Card className="glass-card h-full overflow-hidden rounded-2xl flex flex-col border-border bg-card transition-all duration-300 relative">
          {/* Dynamic Glow Overlay */}
          <motion.div 
            className="absolute inset-0 z-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ background: glow }}
          />
          
          {/* Image Section - Respects Image's Natural Aspect Ratio */}
          <div 
            className="relative bg-muted/30 overflow-hidden transition-[padding-top] duration-500 ease-out"
            style={{ paddingTop: `${(1 / imageRatio) * 100}%` }}
          >
            <AnimatePresence mode="wait">
              {isHovered && (
                <motion.div
                  key="preview"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 z-20 bg-background/60 backdrop-blur-[6px] p-5 flex flex-col justify-center items-center text-center gap-3"
                >
                  <Lock className="w-5 h-5 text-primary/80" />
                  <p className="text-[11px] font-medium text-foreground/80 leading-snug italic line-clamp-4">
                    {promptPreview}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
            
            {previewImage ? (
              <img 
                src={previewImage} 
                alt={title} 
                onLoad={handleImageLoad}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105" 
              />
            ) : (
              <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-muted/20">
                <Sparkles className="w-6 h-6 text-muted-foreground/10" />
              </div>
            )}
            
            <div className="absolute top-3 left-3 z-30">
              <Badge className="bg-background/80 backdrop-blur-md border-border/50 text-[9px] font-bold px-2 py-0.5 rounded-md text-foreground uppercase tracking-wider">{platform}</Badge>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-4 flex flex-col gap-3 flex-grow bg-card">
            <div className="space-y-1">
              <div className="flex justify-between items-start gap-2">
                <h3 className="font-bold text-[15px] leading-tight tracking-tight text-foreground line-clamp-1 group-hover:text-primary transition-colors">{title}</h3>
                <div className="flex items-center gap-0.5 text-yellow-500 shrink-0">
                  <Star className="w-3 h-3 fill-current" />
                  <span className="text-[11px] font-bold">{rating}</span>
                </div>
              </div>
              <p className="text-[12px] text-muted-foreground line-clamp-1 font-medium">
                {tagline}
              </p>
            </div>

            <div className="mt-auto flex justify-between items-center pt-3 border-t border-border/30">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-secondary overflow-hidden border border-border/50 flex items-center justify-center">
                  {author.avatar ? (
                    <img src={author.avatar} alt={author.username} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-[8px] font-bold opacity-30">{author.username[0]}</span>
                  )}
                </div>
                <span className="text-[11px] font-semibold text-muted-foreground hover:text-foreground transition-colors">@{author.username}</span>
              </div>
              <span className="text-[15px] font-black text-primary">₹{price}</span>
            </div>
          </div>
        </Card>
      </Link>
    </motion.div>
  );
};

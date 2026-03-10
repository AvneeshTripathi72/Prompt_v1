import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, TrendingUp } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface SellerCardProps {
  username: string;
  avatar: string;
  earnings: string;
  rating: number;
  totalSales: number;
}

export const SellerCard = ({ username, avatar, earnings, rating, totalSales }: SellerCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  // 3D Tilt Effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  // Glow effect
  const mouseXRaw = useMotionValue(0);
  const mouseYRaw = useMotionValue(0);
  const glow = useTransform(
    [mouseXRaw, mouseYRaw],
    ([mx, my]) => `radial-gradient(300px circle at ${mx}px ${my}px, rgba(139, 92, 246, 0.1), transparent 80%)`
  );

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - rect.left) / rect.width - 0.5);
    y.set((event.clientY - rect.top) / rect.height - 0.5);
    mouseXRaw.set(event.clientX - rect.left);
    mouseYRaw.set(event.clientY - rect.top);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
    mouseXRaw.set(-1000);
    mouseYRaw.set(-1000);
  };

  return (
    <motion.div
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="perspective-1000"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setIsHovered(true)}
    >
      <Card className="glass-card p-6 rounded-[2rem] border-border/40 hover:border-primary/20 transition-all group bg-card shadow-sm relative overflow-hidden">
        <motion.div 
          className="absolute inset-0 z-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: glow }}
        />
    <div className="flex flex-col items-center text-center gap-4">
      <div className="relative">
        <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full scale-0 group-hover:scale-100 transition-transform duration-500" />
        <div className="w-20 h-20 rounded-full border-2 border-primary/20 overflow-hidden relative z-10 bg-secondary">
          {avatar ? (
            <img src={avatar} alt={username} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-primary/10 flex items-center justify-center">
              <span className="text-xl font-black text-primary/30">{username[0]?.toUpperCase()}</span>
            </div>
          )}
        </div>
      </div>
      <div>
        <h4 className="font-bold text-lg">@{username}</h4>
        <div className="flex items-center gap-1 justify-center text-sm text-muted-foreground mt-1">
          <Star className="w-3.5 h-3.5 text-yellow-500 fill-current" />
          <span className="font-bold text-foreground">{rating}</span>
          <span>• {totalSales} Sales</span>
        </div>
      </div>
      <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 rounded-full px-4 py-1 gap-1.5 font-bold">
        <TrendingUp className="w-3.5 h-3.5" /> {earnings} Earned
      </Badge>
      <Link href={`/u/${username}`} className="w-full">
        <div className="text-xs font-bold text-primary hover:underline cursor-pointer">View Public Profile</div>
      </Link>
    </div>
      </Card>
    </motion.div>
  );
};

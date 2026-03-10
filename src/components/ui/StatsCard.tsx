import { Card } from "./card";
import { Badge } from "./badge";
import { LucideIcon } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useState } from "react";

interface StatsCardProps {
  label: string;
  value: string | number;
  trend?: string;
  icon: LucideIcon;
  color?: string;
}

export const StatsCard = ({ label, value, trend, icon: Icon, color = "text-primary" }: StatsCardProps) => {
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
    ([mx, my]) => `radial-gradient(400px circle at ${mx}px ${my}px, rgba(139, 92, 246, 0.1), transparent 80%)`
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
      <Card className="glass-card p-10 rounded-[2.5rem] border-border bg-card space-y-8 scale-100 transition-all duration-500 shadow-sm hover:shadow-xl relative overflow-hidden">
        <motion.div 
          className="absolute inset-0 z-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: glow }}
        />
        <div className="relative z-10 flex justify-between items-start">
          <div className={`w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center border border-border shadow-sm ${color}`}>
            <Icon className="w-6 h-6" />
          </div>
          {trend && (
            <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 font-black px-3 py-1 scale-110">{trend}</Badge>
          )}
        </div>
        <div className="relative z-10 space-y-1">
          <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">{label}</p>
          <h3 className="text-4xl font-black tracking-tighter text-foreground">{value}</h3>
        </div>
      </Card>
    </motion.div>
  );
};

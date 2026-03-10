import { Card } from "./card";
import { Badge } from "./badge";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  label: string;
  value: string | number;
  trend?: string;
  icon: LucideIcon;
  color?: string;
}

export const StatsCard = ({ label, value, trend, icon: Icon, color = "text-primary" }: StatsCardProps) => (
  <Card className="glass-card p-10 rounded-[2.5rem] border-border bg-card space-y-8 scale-100 hover:scale-[1.02] transition-all duration-500 shadow-sm hover:shadow-xl">
    <div className="flex justify-between items-start">
      <div className={`w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center border border-border shadow-sm ${color}`}>
        <Icon className="w-6 h-6" />
      </div>
      {trend && (
        <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 font-black px-3 py-1 scale-110">{trend}</Badge>
      )}
    </div>
    <div className="space-y-1">
      <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">{label}</p>
      <h3 className="text-4xl font-black tracking-tighter text-foreground">{value}</h3>
    </div>
  </Card>
);

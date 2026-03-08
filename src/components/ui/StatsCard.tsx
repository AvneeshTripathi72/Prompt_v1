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
  <Card className="glass-card p-8 rounded-[2rem] border-white/5 space-y-4">
    <div className="flex justify-between items-start">
      <div className={`p-4 rounded-2xl bg-white/5 ${color}`}>
        <Icon className="w-6 h-6" />
      </div>
      {trend && (
        <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20">{trend}</Badge>
      )}
    </div>
    <div className="space-y-1">
      <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">{label}</p>
      <h3 className="text-2xl font-bold">{value}</h3>
    </div>
  </Card>
);

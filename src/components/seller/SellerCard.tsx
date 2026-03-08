import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, TrendingUp } from "lucide-react";
import Link from "next/link";

interface SellerCardProps {
  username: string;
  avatar: string;
  earnings: string;
  rating: number;
  totalSales: number;
}

export const SellerCard = ({ username, avatar, earnings, rating, totalSales }: SellerCardProps) => (
  <Card className="glass-card p-6 rounded-[2rem] border-white/5 hover:border-primary/20 transition-all group">
    <div className="flex flex-col items-center text-center gap-4">
      <div className="relative">
        <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full scale-0 group-hover:scale-100 transition-transform duration-500" />
        <div className="w-20 h-20 rounded-full border-2 border-primary/20 overflow-hidden relative z-10">
          <img src={avatar} alt={username} className="w-full h-full object-cover" />
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
);

import { Wallet } from "lucide-react";
import { cn } from "@/lib/utils";

interface CoinBadgeProps {
  amount: number;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export const CoinBadge = ({ amount, className, size = "md" }: CoinBadgeProps) => {
  const sizes = {
    sm: "px-2 pb-0.5 text-[10px] gap-1",
    md: "px-3 py-1.5 text-sm gap-1.5",
    lg: "px-4 py-2 text-lg gap-2",
  };

  const iconSizes = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  };

  return (
    <div className={cn(
      "inline-flex items-center font-bold bg-primary/10 text-primary border border-primary/20 rounded-full",
      sizes[size],
      className
    )}>
      <Wallet className={iconSizes[size]} />
      <span>{amount}</span>
    </div>
  );
};

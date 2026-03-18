"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Home, 
  Search, 
  PlusCircle, 
  Wallet, 
  LayoutDashboard, 
  ShoppingBag, 
  Settings,
  LogOut,
  Sparkles,
  Zap,
  Flame
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const menuItems = [
  { icon: Home, label: "Home", href: "/" },
  { icon: Search, label: "Explore", href: "/explore" },
  { icon: PlusCircle, label: "Add Prompt", href: "/sell" },
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: ShoppingBag, label: "My Purchases", href: "/purchases" },
  { icon: Wallet, label: "Wallet", href: "/wallet" },
];

export const Sidebar = () => {
  const pathname = usePathname();

  if (pathname === "/auth") return null;

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-black border-r border-white/5 z-50 hidden lg:flex flex-col p-8 shadow-[20px_0_100px_rgba(0,0,0,0.5)] overflow-y-auto scrollbar-hide">
      {/* Brand & Structural Header */}
      <div className="mb-12 shrink-0 border-b border-white/5 pb-8">
        <Link href="/" className="flex flex-col gap-2 group">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-[0_0_30px_rgba(139,92,246,0.4)] group-hover:scale-105 transition-all duration-700">
                P
            </div>
            <div className="flex flex-col">
                <span className="text-2xl font-black tracking-tighter leading-none text-white uppercase group-hover:text-primary transition-colors">Vault</span>
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20">Structural</span>
            </div>
          </div>
          <div className="mt-6 flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[8px] font-black uppercase tracking-[0.2em] text-emerald-500/60">System_Active_v4.2</span>
          </div>
        </Link>
      </div>

      <div className="text-[9px] font-black uppercase tracking-[0.4em] text-white/10 mb-6 px-4 italic">Core_Navigation</div>
      
      <nav className="flex-grow space-y-2">
        {menuItems.map((item, index) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-500 group relative overflow-hidden border",
                isActive 
                  ? "bg-primary/5 border-primary/20 text-primary shadow-[inset_0_0_20px_rgba(139,92,246,0.1)]" 
                  : "bg-transparent border-transparent text-white/40 hover:text-white hover:bg-white/[0.02] hover:border-white/5"
              )}
              suppressHydrationWarning
            >
              {isActive && (
                <motion.div 
                  layoutId="active-nav-line"
                  className="absolute left-0 w-1 h-6 bg-primary rounded-r-full shadow-[0_0_15px_rgba(139,92,246,0.8)] z-20"
                />
              )}
              <item.icon className={cn(
                "w-5 h-5 transition-all duration-500",
                isActive ? "text-primary scale-110" : "group-hover:text-primary group-hover:scale-110"
              )} />
              <span className="font-black text-[11px] uppercase tracking-widest leading-none">{item.label}</span>
              
              {isActive && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer Info */}
      <div className="mt-auto pt-8 border-t border-white/5">
        <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4">
            <div className="text-[8px] font-black text-white/20 uppercase tracking-widest mb-2">Vault_Stability</div>
            <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: "94%" }}
                    className="h-full bg-emerald-500"
                />
            </div>
            <div className="flex justify-between items-center mt-2">
                <span className="text-[7px] font-black text-emerald-500/40 uppercase">Safe_Sync</span>
                <span className="text-[7px] font-black text-white/20 uppercase tracking-tighter">0x4F_E8</span>
            </div>
        </div>
      </div>
    </aside>
  );
};

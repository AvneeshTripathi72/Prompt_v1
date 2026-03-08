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
  { icon: PlusCircle, label: "Sell Prompt", href: "/sell" },
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: ShoppingBag, label: "My Purchases", href: "/purchases" },
  { icon: Wallet, label: "Wallet", href: "/wallet" },
];

export const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-background/95 backdrop-blur-xl border-r border-white/5 z-50 hidden lg:flex flex-col p-6 shadow-2xl overflow-y-auto scrollbar-hide">
      <div className="mb-8 shrink-0">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-skyblue rounded-xl flex items-center justify-center text-white font-black text-xl shadow-[0_10px_20px_-5px_rgba(56,189,248,0.5)] group-hover:scale-110 transition-transform duration-700">
            P
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-black tracking-tighter leading-none">Vault<span className="text-skyblue">.</span></span>
            <span className="text-[8px] font-black uppercase tracking-[0.3em] text-muted-foreground/60">Foundation</span>
          </div>
        </Link>
      </div>

      <nav className="flex-grow space-y-2">
        {menuItems.map((item, index) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-500 group relative overflow-hidden",
              pathname === item.href 
                ? "bg-skyblue/10 text-white shadow-inner" 
                : "text-muted-foreground hover:bg-white/5 hover:text-white"
            )}
          >
            {pathname === item.href && (
              <motion.div 
                layoutId="active-nav"
                className="absolute left-0 w-1.5 h-6 bg-skyblue rounded-r-full shadow-[0_0_20px_#38bdf8] z-20"
              />
            )}
            <item.icon className={cn(
              "w-5 h-5 transition-all duration-500 group-hover:scale-125",
              pathname === item.href ? "text-skyblue" : "group-hover:text-skyblue"
            )} />
            <span className="font-black text-sm tracking-tight uppercase tracking-[0.05em]">{item.label}</span>
            
            {/* Hover Shine Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-skyblue/0 via-skyblue/10 to-skyblue/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
          </Link>
        ))}
      </nav>

      <div className="mt-auto pb-4 shrink-0">

        <div className="pt-8 border-t border-white/5 flex flex-col gap-3">
          <Link href="/settings" className="flex items-center gap-4 px-5 py-3 text-xs font-black uppercase tracking-widest text-muted-foreground hover:text-skyblue transition-colors">
            <Settings className="w-4 h-4" /> Config
          </Link>
          <button className="flex items-center gap-4 px-5 py-3 text-xs font-black uppercase tracking-widest text-crimson/60 hover:text-crimson transition-colors">
            <LogOut className="w-4 h-4" /> Shutdown
          </button>
        </div>
      </div>
    </aside>
  );
};

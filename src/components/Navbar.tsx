"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Wallet, Search, Menu, X, Bell, User, LogOut, Settings, CreditCard, Sparkles, Sun, Moon } from "lucide-react";
import SellPromptDialog from "./prompt/SellPromptDialog";
import { Button } from "./ui/button";
import { useState, useEffect } from "react";
import { Input } from "./ui/input";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const router = useRouter();

  const [balance, setBalance] = useState<number>(0);
  const [user, setUser] = useState<any>(null);

  const fetchProfile = async () => {
    try {
      const res = await fetch("/api/user/profile");
      if (!res.ok) {
        if (res.status === 401) {
          setUser(null);
          setBalance(0);
        }
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      if (data) {
        setUser(data);
        if (typeof data.coins === "number") {
          setBalance(data.coins);
        }
        setAvatarError(false);
      }
    } catch (e: any) {
      console.error("Fetch profile error:", e.message);
      setUser(null);
      setBalance(0);
    }
  };

  const [avatarError, setAvatarError] = useState(false);

  useEffect(() => {
    setIsLoggedIn(document.cookie.includes("vault_username"));
    fetchProfile();
    
    const handleUpdate = () => fetchProfile();
    window.addEventListener("balanceUpdate", handleUpdate);
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("balanceUpdate", handleUpdate);
    };
  }, []);

  const handleLogout = () => {
    document.cookie = "auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    document.cookie = "vault_username=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    
    setUser(null);
    setBalance(0);
    setIsLoggedIn(false);
    
    window.location.href = "/";
  };

  if (pathname === "/auth") return null;

  const handleSearch = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && search.trim()) {
      router.push(`/explore?q=${encodeURIComponent(search.trim())}`);
    }
  };

  return (
    <>
      <nav
        className={cn(
          "absolute top-0 right-0 w-full z-40 transition-all duration-500",
          scrolled ? "bg-black/60 backdrop-blur-xl border-b border-white/5 py-2" : "bg-transparent py-4"
        )}
      >
        <div className="container mx-auto px-6 h-16 flex items-center justify-between gap-12">
          {/* Hidden on Large screens because Sidebar has it, but good to keep for mobile or top-only layout */}
          <div className="flex items-center gap-6 lg:hidden">
            <Link href="/" className="text-2xl font-black tracking-tighter flex items-center gap-2">
              <span className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-xl shadow-primary/20 font-black">V</span>
            </Link>
          </div>

          {/* Premium Search Bar */}
          <div className="flex-1 max-w-2xl hidden md:flex relative group">
            <div className="absolute inset-0 bg-primary/20 blur-[20px] opacity-0 group-focus-within:opacity-100 transition-opacity pointer-events-none" />
            <div className="relative w-full flex items-center">
                <Search className="absolute left-4 w-4 h-4 text-white/20 transition-colors group-focus-within:text-primary z-10" />
                <Input 
                  placeholder="Vault_Network_Query..." 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={handleSearch}
                  suppressHydrationWarning
                  className="pl-12 h-12 bg-white/[0.03] border-white/5 rounded-2xl focus:ring-primary/20 focus:border-primary transition-all text-[11px] font-black tracking-widest text-white placeholder:text-white/10 uppercase ring-offset-0"
                />
                <div className="absolute right-3 flex items-center gap-2">
                    <div className="px-2 py-1 rounded bg-white/5 border border-white/10 text-[8px] font-bold text-white/30 tracking-tighter">CMD + K</div>
                </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/wallet" className="hidden sm:flex items-center gap-4 bg-white/[0.02] hover:bg-white/[0.05] p-2 px-4 rounded-2xl border border-white/5 transition-all group">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <div className="flex flex-col items-end">
                <span className="text-[8px] font-black text-white/20 uppercase tracking-widest leading-none mb-1">Balance_Sync</span>
                <span className="text-xs font-black text-white tracking-widest">₹{balance}</span>
              </div>
            </Link>

            
            <div className="flex items-center gap-2">
              {mounted && (
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="text-muted-foreground hover:text-primary transition-colors h-10 w-10 rounded-lg hover:bg-muted"
                >
                  {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </Button>
              )}
              
              <div className="h-4 w-px bg-border/40 mx-1 hidden sm:block" />

              {mounted && (
                isLoggedIn ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <div className="flex items-center gap-3 cursor-pointer group">
                        <div className="hidden sm:flex flex-col items-end gap-0.5">
                          <span className="text-[11px] font-black tracking-tight text-foreground group-hover:text-primary transition-colors uppercase">
                            {user?.username || (user?.email ? user.email.split('@')[0] : 'User')}
                          </span>
                          <div className="flex items-center gap-1.5 bg-primary/10 px-2 py-0.5 rounded-full border border-primary/20 transition-all group-hover:bg-primary group-hover:border-primary">
                            <span className="text-[9px] font-black text-primary group-hover:text-white uppercase tracking-widest">₹{balance}</span>
                          </div>
                        </div>
                        
                        <div className="h-10 w-10 overflow-hidden rounded-xl border-2 border-border/40 group-hover:border-primary transition-all shadow-xl shadow-black/10 bg-muted/20 flex shrink-0">
                          {user?.avatar && !avatarError ? (
                            <img 
                              src={user.avatar} 
                              className="w-full h-full object-cover" 
                              alt=""
                              onError={() => setAvatarError(true)}
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-primary text-white font-black text-xl shadow-inner uppercase">
                              {(user?.username?.[0] || user?.email?.[0] || 'U')}
                            </div>
                          )}
                        </div>
                      </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56 bg-background/95 backdrop-blur-xl border-border/40 p-2 rounded-2xl shadow-2xl z-[100]">
                      <DropdownMenuLabel className="font-black text-xs uppercase tracking-widest opacity-60 px-3 py-3">Account_Nexus</DropdownMenuLabel>
                      <DropdownMenuSeparator className="bg-border/20 mx-1" />
                      <DropdownMenuItem asChild className="rounded-xl transition-all hover:bg-primary/10 focus:bg-primary/10 cursor-pointer">
                        <Link href="/profile" className="flex items-center gap-3 px-3 py-2.5">
                          <User className="w-4 h-4 text-primary" />
                          <span className="font-bold text-sm">View Profile</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild className="rounded-xl transition-all hover:bg-primary/10 focus:bg-primary/10 cursor-pointer">
                        <Link href="/settings" className="flex items-center gap-3 px-3 py-2.5">
                          <Settings className="w-4 h-4 text-muted-foreground" />
                          <span className="font-bold text-sm">Settings</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator className="bg-border/20 mx-1" />
                      <DropdownMenuItem 
                        className="rounded-xl transition-all text-destructive hover:bg-destructive/10 focus:bg-destructive/10 cursor-pointer px-3 py-2.5"
                        onClick={handleLogout}
                      >
                        <div className="flex items-center gap-3 w-full">
                          <LogOut className="w-4 h-4" />
                           <span className="font-black uppercase tracking-[0.2em] text-[10px]">Logout Account</span>
                        </div>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Button 
                    onClick={() => router.push("/auth")}
                    size="sm" 
                    className="rounded-lg px-5 h-10 bg-primary text-primary-foreground hover:opacity-90 shadow-lg shadow-primary/20 transition-all font-bold text-xs uppercase tracking-widest"
                  >
                    Sign In
                  </Button>
                )
              )}
              
              <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setMobileMenuOpen(true)}>
                <Menu className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
          <nav className="absolute top-0 left-0 bottom-0 w-80 bg-background border-r border-border/40 p-8 flex flex-col gap-8 shadow-2xl animate-in slide-in-from-left duration-300">
            <div className="flex justify-between items-center">
              <Link href="/" className="text-2xl font-black tracking-tighter flex items-center gap-2">
                <span className="w-10 h-10 bg-black dark:bg-white rounded-xl flex items-center justify-center text-primary shadow-lg shadow-primary/20">N</span>
                <span className="text-foreground">NORAG<span className="text-primary italic">.</span></span>
              </Link>
              <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)}>
                <X className="w-6 h-6 text-foreground" />
              </Button>
            </div>
            
            <div className="flex flex-col gap-2">
              {[
                { label: "Home", href: "/" },
                { label: "Explore", href: "/explore" },
                { label: "Add Prompt", href: "/sell" },
                { label: "Dashboard", href: "/dashboard" },
                { label: "Purchases", href: "/purchases" },
                { label: "Wallet", href: "/wallet" },
              ].map((item) => (
                <Link 
                  key={item.href} 
                  href={item.href} 
                  className={cn(
                    "px-4 py-3 rounded-xl hover:bg-secondary font-black uppercase tracking-widest text-[10px] transition-all",
                    pathname === item.href ? "text-primary bg-primary/5" : "text-muted-foreground"
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="mt-auto space-y-4">
              {isLoggedIn ? (
                <Button 
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  variant="outline" 
                  className="w-full h-12 rounded-xl border-destructive/20 text-destructive font-black uppercase tracking-widest text-[10px] hover:bg-destructive/5"
                >
                  <LogOut className="w-4 h-4 mr-2" /> Logout Account
                </Button>
              ) : (
                <Button 
                  onClick={() => {
                    router.push("/auth");
                    setMobileMenuOpen(false);
                  }}
                  className="w-full h-12 rounded-xl bg-primary text-white font-black uppercase tracking-widest text-[10px] shadow-lg shadow-primary/20"
                >
                  Sign In to Vault
                </Button>
              )}
            </div>
          </nav>
        </div>
      )}
    </>
  );
};

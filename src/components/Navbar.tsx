"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Search, Wallet, Bell, Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import { useState, useEffect } from "react";
import { Input } from "./ui/input";

export const Navbar = () => {
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const router = useRouter();

  const [balance, setBalance] = useState<number>(0);

  const fetchBalance = async () => {
    try {
      const res = await fetch("/api/user/profile");
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      if (data && typeof data.coins === "number") {
        setBalance(data.coins);
      }
    } catch (e: any) {
      console.error("Fetch balance error:", e.message);
    }
  };

  useEffect(() => {
    setIsLoggedIn(document.cookie.includes("auth_token"));
    fetchBalance();
    
    window.addEventListener("balanceUpdate", fetchBalance);
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("balanceUpdate", fetchBalance);
    };
  }, []);

  if (pathname === "/auth") return null;

  const handleSearch = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && search.trim()) {
      router.push(`/explore?q=${encodeURIComponent(search.trim())}`);
    }
  };

  return (
    <>
      <nav
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled ? "bg-background/80 backdrop-blur-md border-b border-white/5" : "bg-transparent"
        }`}
      >
        <div className="px-5 h-16 flex items-center justify-between gap-8">
          <div className="flex items-center gap-4 lg:hidden">
            <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(true)}>
              <Menu className="w-6 h-6" />
            </Button>
            <Link href="/" className="text-xl font-bold tracking-tighter flex items-center gap-2">
              <span className="w-8 h-8 bg-skyblue rounded-lg flex items-center justify-center text-white">P</span>
            </Link>
          </div>

          <div className="hidden md:flex flex-1 max-w-xl relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-skyblue transition-colors" />
            <Input 
              placeholder="Search prompts, engineers, collections..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleSearch}
              className="pl-12 h-12 bg-white/5 border-white/5 rounded-2xl focus:ring-skyblue/20 focus:border-skyblue/30 transition-all text-sm"
            />
          </div>

          <div className="flex items-center gap-6">
            <Link href="/wallet" className="hidden sm:flex items-center gap-2 bg-white/5 hover:bg-white/10 px-4 py-2 rounded-2xl border border-white/10 transition-colors">
              <Wallet className="w-4 h-4 text-crimson" />
              <span className="text-sm font-bold">{balance}</span>
            </Link>
            
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="hidden sm:flex text-muted-foreground hover:text-skyblue">
                <Bell className="w-5 h-5" />
              </Button>
              {isLoggedIn ? (
                <Button 
                  variant="outline" 
                  onClick={() => {
                    document.cookie = "auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
                    window.location.reload();
                  }}
                  className="rounded-2xl px-6 h-11 border-white/10 hover:bg-white/5 transition-all font-bold"
                >
                  Logout
                </Button>
              ) : (
                <Link href="/auth">
                  <Button variant="default" className="rounded-2xl px-6 h-11 bg-crimson text-white hover:bg-crimson/90 shadow-[0_4px_15px_-3px_hsla(0,60%,70%,0.4)] transition-all font-bold">
                    Join Now
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
          <nav className="absolute top-0 left-0 bottom-0 w-80 bg-background border-r border-white/5 p-8 flex flex-col gap-8 shadow-2xl animate-in slide-in-from-left duration-300">
            <div className="flex justify-between items-center">
              <Link href="/" className="text-2xl font-black tracking-tighter flex items-center gap-2">
                <span className="w-10 h-10 bg-skyblue rounded-xl flex items-center justify-center text-white">P</span>
                <span>Vault<span className="text-skyblue">.</span></span>
              </Link>
              <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)}>
                <X className="w-6 h-6" />
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
                  className="px-4 py-3 rounded-xl hover:bg-white/5 font-medium transition-all"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="mt-auto space-y-4">
               <Button className="w-full h-12 rounded-xl bg-skyblue text-white font-bold hover:bg-skyblue/90 shadow-[0_4px_12px_-4px_hsl(199_89%_48%)]">Join Community</Button>
            </div>
          </nav>
        </div>
      )}
    </>
  );
};

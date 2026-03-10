import Link from "next/link";
import { Github, Twitter, Linkedin, ExternalLink } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="mt-20 pt-16 pb-8 border-t border-border/40">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <Link href="/" className="text-2xl font-black tracking-tighter flex items-center gap-2">
              <span className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20">P</span>
              <span>Vault<span className="text-primary italic">.</span></span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs font-medium">
              The world's most sophisticated prompt architecture marketplace. Built for quality, performance, and the future of AI.
            </p>
            <div className="flex gap-3">
              {[Twitter, Github, Linkedin].map((Icon, i) => (
                <div key={i} className="w-9 h-9 rounded-lg bg-muted border border-border/50 flex items-center justify-center cursor-pointer hover:bg-primary hover:text-white transition-all">
                  <Icon className="w-4.5 h-4.5" />
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="font-bold text-xs uppercase tracking-widest text-foreground">Marketplace</h4>
            <div className="flex flex-col gap-3">
              {["Explore", "Selling", "Featured", "Prompts"].map((link) => (
                <Link key={link} href={`/${link.toLowerCase()}`} className="text-muted-foreground hover:text-primary text-sm font-medium transition-colors">{link}</Link>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="font-bold text-xs uppercase tracking-widest text-foreground">Community</h4>
            <div className="flex flex-col gap-3">
              {["Engineers", "Collections", "Discord", "Twitter"].map((link) => (
                <Link key={link} href="#" className="text-muted-foreground hover:text-primary text-sm font-medium transition-colors">{link}</Link>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="font-bold text-xs uppercase tracking-widest text-foreground">Support</h4>
            <div className="flex flex-col gap-3">
              {["FAQ", "Contact Us", "Terms of Service", "Privacy Policy"].map((link) => (
                <Link key={link} href="#" className="text-muted-foreground hover:text-primary text-sm font-medium transition-colors">{link}</Link>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-border/20 flex flex-col md:flex-row justify-between items-center gap-4 text-muted-foreground text-[11px] font-bold uppercase tracking-wider">
          <p>© {new Date().getFullYear()} PROMPT VAULT. ALL RIGHTS RESERVED.</p>
          <div className="flex items-center gap-2 opacity-50">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Network Status: Optimal</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

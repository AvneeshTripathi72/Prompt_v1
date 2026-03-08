import Link from "next/link";
import { Github, Twitter, Linkedin, ExternalLink } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="mt-32 pb-16 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 py-20">
          <div className="space-y-8">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-skyblue rounded-2xl flex items-center justify-center text-black font-black text-sm shadow-[0_0_20px_rgba(56,189,248,0.3)] group-hover:rotate-12 transition-transform duration-500">P</div>
              <span className="text-2xl font-black tracking-tighter">Vault<span className="text-skyblue">.</span></span>
            </Link>
            <p className="text-sm text-muted-foreground/60 font-medium leading-relaxed max-w-xs">
              The world's first decentralized protocol for high-performance engineered instructions. Architect, deploy, and monetize your logic.
            </p>
            <div className="flex gap-4">
              {[Twitter, Github, Linkedin].map((Icon, i) => (
                <div key={i} className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center cursor-pointer hover:bg-skyblue hover:text-black hover:border-skyblue transition-all duration-500 hover:-translate-y-1">
                  <Icon className="w-5 h-5" />
                </div>
              ))}
            </div>
          </div>
          
          <div className="space-y-6">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-skyblue">Marketplace</h4>
            <ul className="space-y-4">
              {["All Prompts", "Writing", "Design", "Development"].map((item) => (
                <li key={item}>
                  <Link href="/explore" className="text-sm font-bold text-muted-foreground hover:text-white transition-colors flex items-center gap-2 group">
                    {item} <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="space-y-6">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">Creation Engine</h4>
            <ul className="space-y-4">
              {["List a Prompt", "Seller Dashboard", "Seller Terms"].map((item) => (
                <li key={item}>
                  <Link href="/sell" className="text-sm font-bold text-muted-foreground hover:text-white transition-colors">{item}</Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="space-y-6">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">Nexus Support</h4>
            <ul className="space-y-4">
              {["FAQ", "Contact Us", "Privacy Policy", "Genesis Terms"].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-sm font-bold text-muted-foreground hover:text-white transition-colors">{item}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground opacity-30">
            © {new Date().getFullYear()} PROMPTVAULT INDUSTRIES. ALL RIGHTS RESERVED.
          </p>
          <div className="flex gap-8">
             <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[8px] font-black uppercase tracking-[0.2em] text-muted-foreground">Network Status: Online</span>
             </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

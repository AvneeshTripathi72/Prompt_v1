"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-[#0A0A0C] border-t border-white/5 pt-28 pb-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20 mb-20">
          {/* Brand Col */}
          <div className="space-y-8">
            <Link href="/" className="text-2xl font-black tracking-tighter flex items-center gap-3 group">
              <span className="w-12 h-12 bg-black rounded-2xl flex items-center justify-center text-primary shadow-2xl shadow-primary/20 font-black transition-transform group-hover:scale-105">N</span>
              <span className="font-black tracking-tight text-xl">NORAG<span className="text-primary italic">.</span></span>
            </Link>
            <p className="text-[11px] font-black text-white/30 uppercase tracking-[0.15em] leading-loose max-w-xs">
              The elite high-performance prompt marketplace for the next generation of creators and structural engineers.
            </p>
          </div>

          {/* Links Col 1 */}
          <div className="space-y-8">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20">Marketplace</h4>
            <ul className="space-y-5">
              {["Explore Prompts", "Categories", "Top Creators", "Elite Packages"].map(item => (
                <li key={item}>
                  <Link href="#" className="text-sm font-bold text-white/60 hover:text-primary transition-all hover:translate-x-1 inline-block">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links Col 2 */}
          <div className="space-y-8">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20">Company</h4>
            <ul className="space-y-5">
              {["About Norag", "Creator Program", "Terms of Service", "Privacy Policy"].map(item => (
                <li key={item}>
                  <Link href="#" className="text-sm font-bold text-white/60 hover:text-primary transition-all hover:translate-x-1 inline-block">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Col */}
          <div className="space-y-8">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20">Newsletter</h4>
            <div className="relative group">
              <input 
                type="text" 
                placeholder="PROMT_ACCESS@GATEWAY.IO"
                className="w-full h-14 bg-white/5 border border-white/5 rounded-2xl px-5 text-[10px] font-black tracking-widest focus:outline-none focus:border-primary/40 focus:bg-[#121218] transition-all pr-14 placeholder:text-white/10"
              />
              <button className="absolute right-2 top-2 w-10 h-10 rounded-xl bg-black text-white flex items-center justify-center hover:bg-primary transition-all shadow-lg hover:shadow-primary/40">
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
            <p className="text-[9px] font-black text-white/10 uppercase tracking-widest text-center">Join 50K+ Active Controllers</p>
          </div>
        </div>

        <div className="pt-10 border-t border-black/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/10">
            © 2026 NORAG SYSTEMS. ALL RIGHTS RESERVED.
          </p>
          <div className="flex gap-10">
            {["X-FEED", "INSTAGRAM", "DISCORD", "LINKEDIN"].map(social => (
              <Link key={social} href="#" className="text-[10px] font-black uppercase tracking-[0.2em] text-white/20 hover:text-primary transition-colors">
                {social}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

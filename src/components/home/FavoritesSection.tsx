"use client";

import React from "react";
import { motion } from "framer-motion";
import { Heart, Search } from "lucide-react";

export const FavoritesSection = () => {
  return (
    <section className="bg-black py-40 border-t border-white/5 relative overflow-hidden">
      {/* Decorative Structural Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/10 blur-[150px] rounded-full opacity-20" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="border border-white/5 rounded-[64px] bg-[#0D0D12] p-24 text-center relative overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.8)]">
            <div className="absolute top-0 right-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
            
            <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                className="w-24 h-24 rounded-[32px] bg-primary/20 border border-primary/30 flex items-center justify-center text-primary mx-auto mb-12 shadow-[0_0_50px_rgba(139,92,246,0.2)]"
            >
                <Heart className="w-12 h-12 fill-current" />
            </motion.div>
            
            <h4 className="text-[10px] font-black uppercase tracking-[0.6em] text-primary/60 mb-6">User_Personal_Nexus</h4>
            <h2 className="text-5xl md:text-6xl font-black text-white tracking-tighter uppercase mb-6 leading-none">Elite_Vault_Curations</h2>
            <p className="text-white/30 max-w-xl mx-auto mb-12 text-[11px] leading-relaxed uppercase tracking-widest font-bold font-mono">
                Structural intelligence archival. Your most powerful assets, indexed and ready for immediate execution within the global logic engine.
            </p>
            
            <div className="flex justify-center flex-wrap gap-6 pt-12 border-t border-white/5">
                <button className="group relative px-12 py-5 rounded-2xl bg-primary text-white font-black uppercase tracking-[0.2em] text-[11px] hover:scale-105 transition-all shadow-2xl shadow-primary/40 overflow-hidden">
                    <span className="relative z-10">Initialize_Collection_Sync</span>
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform" />
                </button>
                <button className="px-12 py-5 rounded-2xl bg-white/5 border border-white/10 text-white/40 font-black uppercase tracking-[0.2em] text-[11px] hover:bg-white/10 hover:text-white transition-all">Explore_Market_Core</button>
            </div>

            {/* Terminal Decorative Lines */}
            <div className="absolute bottom-8 left-12 opacity-10 font-mono text-[8px] text-white">
                SYS_STATUS: READY<br/>
                VAULT_ADDR: 0x92E...F4B
            </div>
        </div>
      </div>
    </section>
  );
};

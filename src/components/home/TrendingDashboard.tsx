"use client";

import React from "react";
import { motion } from "framer-motion";

const trendingItems = [
  { id: 1, title: "Cyber-Vanguard", category: "MIDJOURNEY", image: "https://images.unsplash.com/photo-1614728263952-84ea206f99b6?q=80&w=1974&auto=format&fit=crop", rate: "90.0%", sales: "2.4k", time: "46.5s" },
  { id: 2, title: "Organic Weaver", category: "DALL-E 3", image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070&auto=format&fit=crop", rate: "88.2%", sales: "1.1k", time: "32.1s" },
  { id: 3, title: "Logic Architect", category: "CHATGPT", image: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=2070&auto=format&fit=crop", rate: "94.5%", sales: "4.8k", time: "12.8s" },
  { id: 4, title: "Aura Flow V2", category: "CLAUDE", image: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=2070&auto=format&fit=crop", rate: "91.1%", sales: "3.2k", time: "24.4s" },
  { id: 5, title: "Dark Horizon", category: "STABLE DIFFUSION", image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2070&auto=format&fit=crop", rate: "86.4%", sales: "5.4k", time: "58.2s" },
  { id: 6, title: "Neon Structural", category: "MIDJOURNEY", image: "https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?q=80&w=2070&auto=format&fit=crop", rate: "92.0%", sales: "1.2k", time: "41.0s" },
  { id: 7, title: "Eco-Cyber Hub", category: "DALL-E 3", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=2070&auto=format&fit=crop", rate: "89.7%", sales: "3.9k", time: "29.5s" },
  { id: 8, title: "Quantum Logic", category: "CHATGPT", image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=2070&auto=format&fit=crop", rate: "95.1%", sales: "6.7k", time: "10.2s" },
];

export const TrendingDashboard = () => {
  return (
    <section className="bg-black py-32">
      <div className="container mx-auto px-6">
        <div className="bg-[#0D0D12] rounded-[48px] border border-white/5 overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.8)] relative group">
          
          {/* Section Header - Terminal Style Refined */}
          <div className="flex items-center justify-between px-12 py-8 border-b border-white/5 bg-white/[0.01]">
            <div className="flex items-center gap-8">
                <div className="flex gap-2.5">
                    <div className="w-3.5 h-3.5 rounded-full bg-[#FF5F57]/10 border border-[#FF5F57]/30" />
                    <div className="w-3.5 h-3.5 rounded-full bg-[#FFBD2E]/10 border border-[#FFBD2E]/30" />
                    <div className="w-3.5 h-3.5 rounded-full bg-[#27C93F]/10 border border-[#27C93F]/30" />
                </div>
                <div className="h-6 w-px bg-white/5" />
                <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    <span className="text-[11px] font-black uppercase tracking-[0.6em] text-primary/80">
                        Market_Trending_Live
                    </span>
                </div>
            </div>
            
            <div className="hidden lg:flex items-center gap-6">
                <div className="text-right">
                    <div className="text-[9px] font-bold text-white/20 uppercase tracking-widest mb-1">Global_Sync_Status</div>
                    <div className="text-[10px] font-black text-emerald-500 uppercase tracking-widest flex items-center gap-2">
                        <div className="w-1 h-1 rounded-full bg-emerald-500" />
                        Operational
                    </div>
                </div>
            </div>
          </div>

          {/* Large Grid Content */}
          <div className="p-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                {trendingItems.map((item, idx) => (
                <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="group"
                >
                    <div className="relative aspect-[3/4] rounded-[32px] overflow-hidden bg-black border border-white/5 group-hover:border-primary/40 transition-all duration-700 shadow-2xl">
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-1000 group-hover:scale-110" />
                        
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                        
                        {/* Top Info (CONSUS Style) */}
                        <div className="absolute top-6 left-6 right-6 flex justify-between items-start">
                            <div className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-lg px-2 py-1 flex items-center gap-2">
                                <div className="w-3 h-2 bg-emerald-500 rounded-sm" />
                                <span className="text-[8px] font-black text-white/50 uppercase tracking-tighter">GLOBAL_RANK</span>
                            </div>
                            <button className="w-8 h-8 rounded-full bg-white/5 border border-white/5 flex items-center justify-center text-white/20 hover:text-white hover:bg-white/10 transition-all">
                                <div className="w-1.5 h-1.5 rounded-full border border-current" />
                            </button>
                        </div>

                        {/* Title & Brand */}
                        <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 text-center pointer-events-none px-6">
                            <h3 className="text-2xl font-black text-white tracking-tighter uppercase leading-none mb-1 opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:translate-y-0 translate-y-4">
                                {item.title}
                            </h3>
                            <span className="text-[8px] font-bold text-primary tracking-[0.5em] uppercase opacity-0 group-hover:opacity-80 transition-all duration-700">Structural_Access</span>
                        </div>

                        {/* Stats Footer (CONSUS Style Triple Stats) */}
                        <div className="absolute bottom-6 left-6 right-6">
                            <h4 className="text-lg font-black text-white uppercase tracking-tighter mb-4 text-center group-hover:opacity-20 transition-opacity">{item.title}</h4>
                            <div className="bg-white/5 backdrop-blur-2xl rounded-2xl p-4 border border-white/5 grid grid-cols-3 gap-2">
                                <div className="text-center border-r border-white/5 last:border-0 pr-2">
                                    <div className="text-[8px] font-bold text-white/20 uppercase tracking-tighter mb-0.5">Success</div>
                                    <div className="text-[11px] font-black text-primary">{item.rate}</div>
                                </div>
                                <div className="text-center border-r border-white/5 last:border-0 px-2">
                                    <div className="text-[8px] font-bold text-white/20 uppercase tracking-tighter mb-0.5">Sales</div>
                                    <div className="text-[11px] font-black text-white/80">{item.sales}</div>
                                </div>
                                <div className="text-center border-r border-white/5 last:border-0 pl-2">
                                    <div className="text-[8px] font-bold text-white/20 uppercase tracking-tighter mb-0.5">Exec</div>
                                    <div className="text-[11px] font-black text-white/40">{item.time}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
                ))}
            </div>
          </div>

          {/* Advanced Bottom Bar */}
          <div className="px-12 py-6 bg-white/[0.01] border-t border-white/5 flex justify-between items-center group/footer">
             <div className="flex items-center gap-4">
                <span className="text-[9px] font-black text-white/20 uppercase tracking-[0.5em]">System_Log: Connection_Secure</span>
                <div className="w-8 h-px bg-white/5" />
                <span className="text-[9px] font-bold text-white/10 italic">Updated: {new Date().toLocaleTimeString()}</span>
             </div>
             <button className="flex items-center gap-3 group/btn">
                <span className="text-[10px] font-black text-white group-hover/btn:text-primary transition-colors uppercase tracking-widest">Access_Global_Index</span>
                <div className="w-8 h-8 rounded-full bg-white/5 border border-white/5 flex items-center justify-center transition-all group-hover/btn:border-primary group-hover/btn:bg-primary/10">
                    <div className="w-1.5 h-1.5 bg-white group-hover/btn:bg-primary transition-colors rotate-45" />
                </div>
             </button>
          </div>
          
        </div>
      </div>
    </section>
  );
};

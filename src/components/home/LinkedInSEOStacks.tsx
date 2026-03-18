"use client";

import React from "react";
import { motion } from "framer-motion";
import { Layers, Zap, Layout, BarChart } from "lucide-react";

const stacks = [
  { id: 1, title: "Authority_Stack", category: "LINKEDIN", stats: "120+ Components", icon: Layout },
  { id: 2, title: "Indexing_Base", category: "SEO_STRATEGY", stats: "45 Optimal Paths", icon: Zap },
  { id: 3, title: "Algorithm_Sync", category: "SOCIAL_LOGIC", stats: "12k Growth Units", icon: BarChart },
];

export const LinkedInSEOStacks = () => {
  return (
    <section className="bg-black py-40 border-t border-white/5 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8">
            <div className="flex items-center gap-6">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shadow-2xl shadow-primary/10">
                    <Layers className="w-8 h-8" />
                </div>
                <div>
                    <h4 className="text-[10px] font-black uppercase tracking-[0.5em] text-white/20 mb-2">Structural_Power_Stacks</h4>
                    <h2 className="text-4xl font-black text-white tracking-tighter uppercase">Algorithm Layering</h2>
                </div>
            </div>
            <button className="text-[10px] font-black uppercase tracking-widest text-primary hover:underline transition-all">View_Stack_Repo</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {stacks.map((stack, idx) => (
            <motion.div
              key={stack.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.8 }}
              className="group relative h-[450px] rounded-[48px] bg-[#0D0D12] border border-white/5 p-12 overflow-hidden hover:border-primary/40 transition-all duration-700 shadow-2xl flex flex-col justify-between"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              
              <div className="w-16 h-16 rounded-3xl bg-white/5 flex items-center justify-center mb-10 group-hover:bg-primary/20 transition-all duration-700">
                <stack.icon className="w-8 h-8 text-white/20 group-hover:text-primary transition-all duration-700" />
              </div>
              
              <div className="relative z-10 flex-1">
                <h3 className="text-4xl font-black text-white uppercase tracking-tighter leading-none mb-4 group-hover:text-primary transition-colors">{stack.title}</h3>
                <p className="text-[10px] font-bold text-white/20 uppercase tracking-[0.4em] mb-12">{stack.category}</p>
                
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <span className="text-[11px] font-black text-white/50 uppercase tracking-widest">{stack.stats}</span>
                        <span className="text-[10px] font-black text-primary tracking-widest">0{idx + 1}_V2</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden p-[2px]">
                        <motion.div 
                            initial={{ width: 0 }}
                            whileInView={{ width: "85%" }}
                            transition={{ duration: 1.5, delay: 0.5 + idx * 0.1 }}
                            className="h-full bg-primary rounded-full shadow-[0_0_15px_rgba(139,92,246,0.6)]"
                        />
                    </div>
                </div>
              </div>

              {/* Decorative Terminal Text at bottom */}
              <div className="relative z-10 pt-10 border-t border-white/5 mt-10">
                <div className="flex justify-between items-center text-[8px] font-black tracking-widest font-mono text-white/10 uppercase">
                    <span>SYS_ACCESS: GRANTED</span>
                    <span>0x{stack.id}EF8A9B</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

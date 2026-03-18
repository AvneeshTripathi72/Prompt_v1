"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star, CheckCircle } from "lucide-react";

const contributors = [
  { name: "Neo_Structure", sales: "12.4k", rating: 4.9, avatar: "https://i.pravatar.cc/150?u=1", category: "Engineered Reality" },
  { name: "Vantage_AI", sales: "8.1k", rating: 4.8, avatar: "https://i.pravatar.cc/150?u=2", category: "Structural Logic" },
  { name: "Iris_Design", sales: "15.2k", rating: 5.0, avatar: "https://i.pravatar.cc/150?u=3", category: "Visual Synthesis" },
  { name: "Pulse_Lab", sales: "6.7k", rating: 4.7, avatar: "https://i.pravatar.cc/150?u=4", category: "Dynamic Motion" },
  { name: "Flux_Engine", sales: "10.4k", rating: 4.9, avatar: "https://i.pravatar.cc/150?u=5", category: "Organic Growth" },
];

export const TopContributors = () => {
  return (
    <section className="bg-black py-32 border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
            <div className="flex items-center gap-6">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shadow-2xl shadow-primary/10">
                    <Star className="w-8 h-8 fill-current" />
                </div>
                <div>
                    <h4 className="text-[10px] font-black uppercase tracking-[0.5em] text-white/20 mb-2">Elite_Network</h4>
                    <h2 className="text-4xl font-black text-white tracking-tighter">Top Structural Engineers</h2>
                </div>
            </div>
            <button className="text-[10px] font-black uppercase tracking-widest text-primary hover:underline transition-all">View_All_Engineers</button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          {contributors.map((c, idx) => (
            <motion.div
              key={c.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-[#0D0D12] rounded-[32px] border border-white/5 p-8 text-center group hover:border-primary/40 transition-all duration-500 shadow-2xl relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="relative w-24 h-24 mx-auto mb-6">
                <div className="absolute inset-0 bg-primary/20 blur-[20px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <img src={c.avatar} alt={c.name} className="w-full h-full rounded-full object-cover border-2 border-white/5 group-hover:border-primary transition-all duration-500 p-1 bg-black" />
                <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-black border border-white/10 flex items-center justify-center text-primary shadow-2xl">
                    <CheckCircle className="w-4 h-4 fill-primary text-black" />
                </div>
              </div>
              
              <h3 className="text-lg font-black text-white uppercase tracking-tighter mb-1 line-clamp-1 group-hover:text-primary transition-colors">{c.name}</h3>
              <p className="text-[9px] font-bold text-white/20 uppercase tracking-[0.2em] mb-8">{c.category}</p>
              
              <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/5">
                <div>
                    <div className="text-[8px] font-bold text-white/10 uppercase tracking-widest mb-1.5">Sales</div>
                    <div className="text-sm font-black text-white/40 group-hover:text-white transition-colors">{c.sales}</div>
                </div>
                <div>
                    <div className="text-[8px] font-bold text-white/10 uppercase tracking-widest mb-1.5">Rating</div>
                    <div className="text-sm font-black text-primary">{c.rating}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

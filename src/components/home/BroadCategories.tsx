"use client";

import React from "react";
import { motion } from "framer-motion";
import { Camera, Video, Code, BookOpen, Brain, Sparkles } from "lucide-react";

const categories = [
  { icon: Camera, name: "Photography", count: "1,240 Assets", role: "Visual_Capture" },
  { icon: Video, name: "Videography", count: "890 Assets", role: "Motion_Design" },
  { icon: Code, name: "Development", count: "2,150 Assets", role: "Logic_Engines" },
  { icon: BookOpen, name: "Copywriting", count: "1,120 Assets", role: "Text_Synthesis" },
  { icon: Brain, name: "Research", count: "740 Assets", role: "Data_Insights" },
];

export const BroadCategories = () => {
  return (
    <section className="bg-black py-32 border-t border-white/5 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-end mb-16">
            <div>
                <h4 className="text-[10px] font-black uppercase tracking-[0.5em] text-white/20 mb-2">Discovery_Engines</h4>
                <h2 className="text-4xl font-black text-white tracking-tighter uppercase">Broad Categories</h2>
            </div>
            <div className="h-px flex-1 bg-white/5 mx-10 mb-4 hidden md:block" />
            <button className="text-[10px] font-black uppercase tracking-widest text-primary hover:underline transition-all">Explore_Map</button>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {categories.map((cat, idx) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="bg-[#0D0D12] border border-white/5 p-10 rounded-[32px] hover:border-primary/40 transition-all duration-500 cursor-pointer group flex flex-col items-center text-center shadow-2xl relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-8 group-hover:bg-primary/20 transition-all duration-500 group-hover:scale-110">
                <cat.icon className="w-8 h-8 text-white/20 group-hover:text-primary transition-all duration-500" />
              </div>
              <h3 className="text-lg font-black text-white uppercase tracking-tighter mb-1.5 group-hover:text-primary transition-colors">{cat.name}</h3>
              <p className="text-[9px] font-bold text-white/10 uppercase tracking-widest mb-6">{cat.role}</p>
              <div className="mt-auto px-4 py-1.5 rounded-full bg-white/5 border border-white/5 text-[8px] font-black text-white/30 uppercase tracking-widest">
                {cat.count}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

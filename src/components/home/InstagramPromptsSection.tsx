"use client";

import React from "react";
import { motion } from "framer-motion";
import { Heart, Copy } from "lucide-react";

const reels = [
  { id: 1, title: "Visual_Sync_01", author: "0xNEO", image: "https://images.unsplash.com/photo-1614728263952-84ea206f99b6?q=80&w=1974&auto=format&fit=crop", reach: "1.2M" },
  { id: 2, title: "Algorithm_Path_V2", author: "0xVANTAGE", image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070&auto=format&fit=crop", reach: "840K" },
  { id: 3, title: "Aura_Logic_Core", author: "0xPULSE", image: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=2070&auto=format&fit=crop", reach: "2.5M" },
  { id: 4, title: "Neural_Bloom_Set", author: "0xIRIS", image: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=2070&auto=format&fit=crop", reach: "620K" },
];

export const InstagramPromptsSection = () => {
  return (
    <section className="bg-black py-40 border-t border-white/5 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8">
            <div className="flex items-center gap-6">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shadow-2xl shadow-primary/10">
                    <Heart className="w-8 h-8" />
                </div>
                <div>
                    <h4 className="text-[10px] font-black uppercase tracking-[0.5em] text-white/20 mb-2">Social_Logic_Engineering</h4>
                    <h2 className="text-4xl font-black text-white tracking-tighter uppercase">Instagram Dynamics</h2>
                </div>
            </div>
            <button className="text-[10px] font-black uppercase tracking-widest text-primary hover:underline transition-all">View_All_Modules</button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {reels.map((reel, idx) => (
            <motion.div
              key={reel.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.8 }}
              className="group relative h-[600px] rounded-[48px] bg-[#0D0D12] border border-white/5 overflow-hidden hover:border-primary/40 transition-all duration-700 shadow-2xl"
            >
              <img src={reel.image} alt={reel.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-1000 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
              
              {/* Technical Stats Header */}
              <div className="absolute top-8 left-8 right-8 flex justify-between items-start">
                  <div className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-lg px-2 py-1 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        <span className="text-[8px] font-black text-white/50 uppercase tracking-widest">{reel.reach}_REACH</span>
                  </div>
              </div>

              {/* Persona Info */}
              <div className="absolute bottom-8 left-8 right-8">
                  <h3 className="text-2xl font-black text-white uppercase tracking-tighter leading-none mb-4 group-hover:text-primary transition-colors">{reel.title}</h3>
                  <div className="flex items-center justify-between pt-6 border-t border-white/5">
                      <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-white/5 border border-white/5 flex items-center justify-center">
                              <span className="text-[10px] font-black text-white/40">{reel.author[2]}</span>
                          </div>
                          <span className="text-[10px] font-bold text-white/40 tracking-widest">{reel.author}</span>
                      </div>
                      <button className="w-10 h-10 rounded-full bg-white/5 border border-white/5 flex items-center justify-center text-white/20 hover:text-white hover:bg-primary transition-all">
                          <Copy className="w-4 h-4" />
                      </button>
                  </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

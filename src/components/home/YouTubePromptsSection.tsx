"use client";

import React from "react";
import { motion } from "framer-motion";
import { Youtube, Play, Clock, BarChart3 } from "lucide-react";

const videos = [
  { id: 1, title: "Retention_Engine_0x1", stats: "94% CTR", length: "12:40", image: "https://images.unsplash.com/photo-1492724441997-5dc865305da7?q=80&w=2070&auto=format&fit=crop" },
  { id: 2, title: "Hook_Protocol_Base", stats: "88% CTR", length: "08:15", image: "https://images.unsplash.com/photo-1542435503-956c469947f6?q=80&w=2074&auto=format&fit=crop" },
];

export const YouTubePromptsSection = () => {
  return (
    <section className="bg-black py-40 border-t border-white/5 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8">
            <div className="flex items-center gap-6">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shadow-2xl shadow-primary/10">
                    <Youtube className="w-8 h-8" />
                </div>
                <div>
                    <h4 className="text-[10px] font-black uppercase tracking-[0.5em] text-white/20 mb-2">Video_Authority_Architecture</h4>
                    <h2 className="text-4xl font-black text-white tracking-tighter uppercase">YouTube Mastery</h2>
                </div>
            </div>
            <button className="text-[10px] font-black uppercase tracking-widest text-primary hover:underline transition-all">Request_Script_Sync</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {videos.map((vid, idx) => (
            <motion.div
              key={vid.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1, duration: 0.8 }}
              className="group relative rounded-[48px] bg-[#0D0D12] border border-white/5 overflow-hidden hover:border-red-500/40 transition-all duration-700 shadow-2xl"
            >
              <div className="relative aspect-video overflow-hidden">
                <img src={vid.image} alt={vid.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-1000 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full bg-red-600 flex items-center justify-center text-white shadow-2xl shadow-red-600/50 scale-100 group-hover:scale-110 transition-transform">
                        <Play className="w-10 h-10 fill-current" />
                    </div>
                </div>
                <div className="absolute bottom-6 right-6 bg-black/80 backdrop-blur-xl px-3 py-1.5 rounded-lg text-[10px] font-black text-white uppercase tracking-widest border border-white/10">{vid.length}</div>
              </div>

              <div className="p-12">
                <div className="flex justify-between items-start mb-8">
                    <div>
                        <h3 className="text-3xl font-black text-white uppercase tracking-tighter leading-none mb-4 group-hover:text-red-500 transition-colors">{vid.title}</h3>
                        <div className="flex items-center gap-4">
                            <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                            <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em]">Retention_Engine_Active</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 px-3 py-1.5 rounded-full">
                        <BarChart3 className="w-4 h-4 text-red-500" />
                        <span className="text-xs font-black text-red-500">{vid.stats}</span>
                    </div>
                </div>
                
                <p className="text-white/40 mb-10 text-[11px] leading-relaxed uppercase tracking-widest font-bold">Structural prompt blocks for explosive retention scripts and authority building.</p>
                
                <div className="flex gap-4">
                    <button className="flex-1 py-4 rounded-2xl bg-white/5 border border-white/10 text-[11px] font-black uppercase tracking-widest text-white hover:bg-red-600 hover:border-red-600 transition-all active:scale-95 shadow-xl shadow-red-600/0 hover:shadow-red-600/20">Sync_Stack</button>
                    <button className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/20 hover:text-white transition-all">
                        <Clock className="w-5 h-5" />
                    </button>
                </div>
              </div>

              {/* Terminal Decorative Bottom */}
              <div className="px-12 py-4 border-t border-white/5 flex justify-between items-center text-[7px] font-black text-white/10 uppercase tracking-widest">
                  <span>LOG: STREAM_READY</span>
                  <span>0xYT_ID_{vid.id}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

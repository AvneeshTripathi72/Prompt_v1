"use client";

import React from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Background Glows/Mesh */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-full h-[80%] bg-[radial-gradient(circle_at_50%_0%,rgba(139,92,246,0.15)_0%,transparent_70%)]" />
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-white/5 bg-white/[0.03] mb-12 backdrop-blur-xl hover:border-primary/40 transition-colors cursor-default"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/50">
            The Elite Prompt Marketplace
          </span>
        </motion.div>

        {/* Title */}
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
            <h1 className="text-[56px] md:text-[140px] font-black tracking-[-0.05em] mb-10 text-white leading-[0.85] filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]">
            Engineered <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] via-[#D8B4FE] to-[#8B5CF6] italic bg-[length:200%_auto] animate-gradient-x">Intelligence</span>
            </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-lg md:text-2xl text-white/30 max-w-2xl mx-auto font-medium tracking-tight leading-relaxed italic mb-12"
        >
          High-performance structural prompts crafted by <span className="text-white/60">leading AI engineers</span>.
        </motion.p>

        {/* Search Bar */}
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8, delay: 0.7 }}
           className="max-w-4xl mx-auto relative group"
        >
            <div className="absolute inset-0 bg-primary/20 blur-[40px] opacity-0 group-focus-within:opacity-100 transition-opacity" />
            <div className="relative flex items-center bg-[#0D0D0F] border border-white/10 rounded-[32px] p-2 hover:border-white/20 transition-all shadow-2xl">
                <div className="flex-1 flex items-center px-6">
                    <Search className="w-5 h-5 text-white/20 mr-4" />
                    <input 
                        type="text" 
                        placeholder="Search for prompts, tools, or engineers..." 
                        className="w-full bg-transparent border-none focus:outline-none text-white font-medium text-lg placeholder:text-white/10"
                    />
                </div>
                <button className="bg-primary text-white px-10 py-4 rounded-[24px] font-black uppercase tracking-widest text-xs hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-primary/20">
                    Find_Assets
                </button>
            </div>
            
            {/* Quick Filters */}
            <div className="flex justify-center gap-4 mt-6">
                {["MIDJOURNEY", "CHATGPT", "CLAUDE", "STABLE_DIFFUSION"].map(tag => (
                    <button key={tag} className="text-[9px] font-black text-white/20 hover:text-primary transition-colors tracking-[0.2em]">
                        {tag}
                    </button>
                ))}
            </div>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes gradient-x {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient-x {
          animation: gradient-x 15s ease infinite;
        }
      `}</style>
    </section>
  );
};

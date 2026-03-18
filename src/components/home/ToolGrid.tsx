"use client";

import React from "react";
import { motion } from "framer-motion";

const tools = [
  { name: "ChatGPT", icon: "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg" },
  { name: "Midjourney", icon: "https://upload.wikimedia.org/wikipedia/commons/e/e6/Midjourney_Emblem.svg" },
  { name: "Claude", icon: "https://upload.wikimedia.org/wikipedia/commons/d/d3/Anthropic_logo.svg" },
  { name: "DALL-E", icon: "https://upload.wikimedia.org/wikipedia/commons/4/4d/OpenAI_Logo.svg" },
  { name: "Gemini", icon: "https://upload.wikimedia.org/wikipedia/commons/8/8a/Google_Gemini_logo.svg" },
  { name: "Stable Diffusion", icon: "https://upload.wikimedia.org/wikipedia/commons/e/e0/Stable_Diffusion_Logo.png" },
];

export const ToolGrid = () => {
  return (
    <section className="bg-black py-32 relative overflow-hidden">
      {/* Structural Dividers */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      
      <div className="container mx-auto px-6 text-center">
        <h4 className="text-[10px] font-black uppercase tracking-[0.5em] text-white/20 mb-16">Ecosystem_Integration</h4>
        
        <div className="flex flex-wrap justify-center gap-10 max-w-5xl mx-auto">
            {tools.map((tool, idx) => (
                <motion.div
                    key={tool.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.05 }}
                    whileHover={{ scale: 1.1, y: -5 }}
                    className="group flex flex-col items-center gap-4"
                >
                    <div className="w-16 h-16 rounded-full bg-[#121218] border-2 border-white/5 flex items-center justify-center p-4 group-hover:border-primary group-hover:bg-primary/5 transition-all shadow-xl group-hover:shadow-primary/20">
                        <img src={tool.icon} alt={tool.name} className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all opacity-40 group-hover:opacity-100" />
                    </div>
                </motion.div>
            ))}
        </div>
      </div>
    </section>
  );
};

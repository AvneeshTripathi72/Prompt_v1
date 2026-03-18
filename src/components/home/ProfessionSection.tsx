"use client";

import React from "react";
import { motion } from "framer-motion";
import { Users, Code, Palette, Zap, BarChart } from "lucide-react";

const professions = [
  { id: 1, name: "Founders", role: "Venture Builders", icon: Users },
  { id: 2, name: "Developers", role: "Structural Engineers", icon: Code },
  { id: 3, name: "Designers", role: "Visual Synthesists", icon: Palette },
  { id: 4, name: "Marketers", role: "Growth Controllers", icon: Zap },
  { id: 5, name: "Consultants", role: "Logic Architects", icon: BarChart },
];

export const ProfessionSection = () => {
  return (
    <section className="bg-black py-40 border-t border-white/5">
      <div className="container mx-auto px-6 text-center">
        <h4 className="text-[10px] font-black uppercase tracking-[0.6em] text-white/20 mb-20 px-10 py-3 border border-white/5 rounded-full inline-block group hover:grid-cols-primary transition-colors cursor-default">
            Engineered_For_Your_Persona
        </h4>
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-16 max-w-6xl mx-auto">
          {professions.map((p, idx) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.8 }}
              className="group cursor-pointer flex flex-col items-center"
            >
              <div className="w-40 h-40 rounded-full bg-[#0D0D12] border border-white/5 mb-10 flex items-center justify-center relative transition-all duration-700 group-hover:border-primary group-hover:bg-primary/5 group-hover:shadow-[0_0_50px_rgba(139,92,246,0.1)]">
                <div className="absolute inset-0 bg-primary/20 blur-[40px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <p.icon className="w-14 h-14 text-white/10 group-hover:text-primary transition-all duration-700 group-hover:scale-110" />
              </div>
              <h3 className="text-2xl font-black text-white uppercase tracking-tighter mb-2 group-hover:text-primary transition-colors">{p.name}</h3>
              <p className="text-[10px] font-bold text-white/20 uppercase tracking-[0.3em]">{p.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

"use client";

import React from "react";
import { motion } from "framer-motion";
import { Package, ArrowUpRight } from "lucide-react";

const packages = [
  { name: "Global_Sync_Authority", price: "₹2,499", items: "12 Components", role: "Network_Expansion" },
  { name: "Logic_Engine_Pack", price: "₹3,999", items: "25 Path_Sets", role: "Structural_Mastery" },
  { name: "Venture_Core_Launch", price: "₹5,499", items: "40 Logic_Blocks", role: "Full_Scale_Build" },
];

export const GuidePackages = () => {
  return (
    <section className="bg-black py-40 border-t border-white/5 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8">
            <div className="flex items-center gap-6">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shadow-2xl shadow-primary/10">
                    <Package className="w-8 h-8" />
                </div>
                <div>
                    <h4 className="text-[10px] font-black uppercase tracking-[0.5em] text-white/20 mb-2">Elite_Logistics_Core</h4>
                    <h2 className="text-4xl font-black text-white tracking-tighter uppercase">Guide Packages</h2>
                </div>
            </div>
            <div className="flex items-center gap-4">
                <span className="text-[10px] font-black uppercase tracking-widest text-white/10 italic">Updated_to_v4.2</span>
                <button className="text-[10px] font-black uppercase tracking-widest text-primary hover:underline transition-all">Request_Custom_Build</button>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {packages.map((pkg, idx) => (
            <motion.div
              key={pkg.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.8 }}
              className="group relative rounded-[48px] bg-[#0D0D12] border border-white/5 p-12 overflow-hidden hover:border-primary/40 transition-all duration-700 shadow-2xl flex flex-col"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              
              <div className="flex justify-between items-start mb-12">
                <div className="w-16 h-16 rounded-3xl bg-white/5 flex items-center justify-center text-white/20 group-hover:bg-primary/20 group-hover:text-primary transition-all duration-700">
                    <Package className="w-8 h-8" />
                </div>
                <div className="px-4 py-1.5 rounded-full bg-white/5 border border-white/5 text-[8px] font-black text-white/30 uppercase tracking-[0.2em]">
                    {pkg.role}
                </div>
              </div>
              
              <h3 className="text-3xl font-black text-white uppercase tracking-tighter leading-none mb-4 group-hover:text-primary transition-colors">{pkg.name}</h3>
              <p className="text-[11px] font-black text-white/40 uppercase tracking-[0.3em] mb-12">{pkg.items}</p>
              
              <div className="mt-auto flex items-center justify-between pt-10 border-t border-white/5">
                <div>
                    <div className="text-[8px] font-black text-white/20 uppercase tracking-widest mb-1.5">Acquisition_Cost</div>
                    <span className="text-3xl font-black text-white tracking-tighter">{pkg.price}</span>
                </div>
                <button className="group/btn relative px-8 py-4 rounded-2xl bg-primary text-white text-[11px] font-black uppercase tracking-widest shadow-2xl shadow-primary/40 hover:scale-105 transition-all active:scale-95 overflow-hidden">
                    <span className="relative z-10 transition-colors group-hover/btn:text-white">Unlock_Access</span>
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Zap, Image as ImageIcon } from "lucide-react";

const transformations = [
    { 
        id: 1, 
        title: "Cyberpunk Interior", 
        author: "@neo_struct", 
        image: "https://images.unsplash.com/photo-1605146764387-6d76d342247b?q=80&w=2070&auto=format&fit=crop",
        tags: ["MIDJOURNEY", "V6.1"]
    },
    { 
        id: 2, 
        title: "Organic Fabric", 
        author: "@weaver", 
        image: "https://images.unsplash.com/photo-1550684847-75bdda21cc95?q=80&w=2070&auto=format&fit=crop",
        tags: ["DALL-E 3", "HD"]
    },
];

export const ImageTransformationSection = () => {
  return (
    <section className="bg-black py-24 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-end mb-16">
            <div>
                <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-2 mb-4"
                >
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40">Visual_Architecture</span>
                </motion.div>
                <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-none">Image <br/><span className="text-primary italic">Transformation_</span></h2>
            </div>
            
            <div className="hidden md:flex gap-4">
                <button className="w-12 h-12 rounded-full border border-white/5 flex items-center justify-center text-white/20 hover:text-primary hover:border-primary/40 transition-all">
                    <ArrowRight className="w-5 h-5 rotate-180" />
                </button>
                <button className="w-12 h-12 rounded-full border border-white/5 flex items-center justify-center text-white/20 hover:text-primary hover:border-primary/40 transition-all">
                    <ArrowRight className="w-5 h-5" />
                </button>
            </div>
        </div>

        <div className="flex gap-8 overflow-x-auto no-scrollbar pb-8">
            {transformations.map((item, idx) => (
                <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="min-w-[400px] md:min-w-[600px] group"
                >
                    <div className="relative aspect-[16/9] rounded-[32px] overflow-hidden bg-[#121218] border border-white/5 group-hover:border-primary/30 transition-all duration-700">
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-80 group-hover:opacity-100" />
                        
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0C] via-transparent to-transparent" />
                        
                        <div className="absolute top-6 left-6 flex gap-2">
                            {item.tags.map(tag => (
                                <span key={tag} className="px-3 py-1 rounded bg-black/60 backdrop-blur-xl border border-white/10 text-[9px] font-black text-white uppercase tracking-widest">{tag}</span>
                            ))}
                        </div>

                        <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
                            <div>
                                <h3 className="text-2xl font-black text-white mb-2">{item.title}</h3>
                                <div className="flex items-center gap-2">
                                    <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                                        <ImageIcon className="w-3 h-3 text-primary" />
                                    </div>
                                    <span className="text-xs font-bold text-white/40 italic">{item.author}</span>
                                </div>
                            </div>
                            
                            <motion.button 
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="h-14 px-8 rounded-2xl bg-white text-black font-black uppercase tracking-widest text-[11px] shadow-2xl"
                            >
                                Get_Prompt
                            </motion.button>
                        </div>
                    </div>
                </motion.div>
            ))}
            
            {/* CTA Box */}
            <div className="min-w-[300px] bg-[#121218] border border-white/10 rounded-[32px] p-10 flex flex-col justify-center items-center text-center group hover:border-primary/20 transition-all">
                <div className="w-16 h-16 rounded-3xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                    <Sparkles className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-black text-white mb-4 italic">Next Generation_</h3>
                <p className="text-sm text-white/30 mb-8 leading-relaxed">Access 5,000+ structural prompts for v6.1 architectures.</p>
                <button className="text-[10px] font-black uppercase tracking-[0.2em] text-primary border-b border-primary/20 pb-1">View_All_Engines</button>
            </div>
        </div>
      </div>
    </section>
  );
};

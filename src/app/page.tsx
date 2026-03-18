"use client";

import React from "react";
import { Hero } from "@/components/home/Hero";
import { ImageTransformationSection } from "@/components/home/ImageTransformationSection";
import { InstagramPromptsSection } from "@/components/home/InstagramPromptsSection";
import { ToolGrid } from "@/components/home/ToolGrid";
import { YouTubePromptsSection } from "@/components/home/YouTubePromptsSection";
import { LinkedInSEOStacks } from "@/components/home/LinkedInSEOStacks";
import { ProfessionSection } from "@/components/home/ProfessionSection";
import { BroadCategories } from "@/components/home/BroadCategories";
import { GuidePackages } from "@/components/home/GuidePackages";
import { TrendingDashboard } from "@/components/home/TrendingDashboard";
import { TopContributors } from "@/components/home/TopContributors";
import { FavoritesSection } from "@/components/home/FavoritesSection";
import { Footer } from "@/components/Footer";

export default function NoragHomePage() {
  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-primary/20">
      <main>
        {/* Top Hero Section */}
        <Hero />

        {/* Core Content Blocks */}
        <div className="space-y-0">
          <ImageTransformationSection />
          <InstagramPromptsSection />
          <ToolGrid />
          <YouTubePromptsSection />
          <LinkedInSEOStacks />
          <ProfessionSection />
          <BroadCategories />
          <GuidePackages />
          <TrendingDashboard />
          <TopContributors />
          <FavoritesSection />
        </div>
      </main>

      {/* Footer Part */}
      <Footer />

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}

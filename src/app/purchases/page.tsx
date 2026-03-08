"use client";

import { ShoppingBag, Search, ExternalLink, MessageCircle, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function PurchasesPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="space-y-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-4xl font-bold mb-2">My Library</h1>
            <p className="text-muted-foreground">Access all your purchased prompts and specialized guides.</p>
          </div>
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search your library..." 
              className="pl-10 h-12 bg-white/5 border-white/10 rounded-xl"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="glass-card overflow-hidden border-white/5 rounded-3xl group">
              <div className="aspect-video relative overflow-hidden bg-muted">
                <img 
                  src={`https://images.unsplash.com/photo-${1680000000000+i}?auto=format&fit=crop&q=80&w=600`} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  alt="Prompt result"
                />
                <div className="absolute top-3 left-3 flex gap-2">
                  <Badge className="bg-black/50 backdrop-blur-md">Midjourney</Badge>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <div className="space-y-1">
                  <h3 className="font-bold text-lg line-clamp-1">Professional Portrait Master</h3>
                  <p className="text-xs text-muted-foreground">Purchased on Oct 24, 2023</p>
                </div>
                
                <div className="flex flex-col gap-2 pt-4">
                  <Link href={`/prompt/${i}`}>
                    <Button className="w-full h-11 rounded-xl gap-2 font-bold glow-primary">
                      <ExternalLink className="w-4 h-4" /> View Prompt
                    </Button>
                  </Link>
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" className="rounded-xl h-11 border-white/10 bg-white/5">
                      <Download className="w-4 h-4 mr-2" /> Files
                    </Button>
                    <Button variant="outline" className="rounded-xl h-11 border-white/10 bg-white/5">
                      <MessageCircle className="w-4 h-4 mr-2" /> Review
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Empty State Mock */}
        <div className="hidden flex flex-col items-center justify-center py-24 text-center space-y-6">
          <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center text-muted-foreground">
            <ShoppingBag className="w-10 h-10" />
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-bold">No purchases yet</h3>
            <p className="text-muted-foreground max-w-xs">Start exploring our marketplace to find high-performance AI prompts.</p>
          </div>
          <Link href="/explore">
            <Button className="px-8 h-12 rounded-full glow-primary">Browse Marketplace</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

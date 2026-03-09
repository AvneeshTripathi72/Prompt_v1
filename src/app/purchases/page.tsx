"use client";

import { ShoppingBag, Search, ExternalLink, MessageCircle, Download, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export default function PurchasesPage() {
  const [purchases, setPurchases] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const ITEMS_PER_PAGE = 9;

  const fetchPurchases = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/user/purchases?page=${currentPage}&limit=${ITEMS_PER_PAGE}`);
      const data = await res.json();
      setPurchases(data.prompts || []);
      setTotalPages(data.totalPages || 0);
      setTotalItems(data.total || 0);
    } catch (error) {
      console.error("Error fetching library:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPurchases();
  }, [currentPage]);

  const filteredPurchases = purchases.filter(p => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-12 h-12 border-4 border-skyblue border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

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
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 bg-white/5 border-white/10 rounded-xl"
            />
          </div>
        </div>

        {filteredPurchases.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPurchases.map((prompt) => (
                <Card key={prompt._id} className="glass-card overflow-hidden border-white/5 rounded-3xl group">
                  <div className="aspect-video relative overflow-hidden bg-muted">
                    {prompt.images?.[0] ? (
                      <img 
                        src={prompt.images[0]} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        alt={prompt.title || "Untitled"}
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center bg-white/5 relative group-hover:bg-white/[0.07] transition-colors">
                        <div className="absolute inset-0 bg-gradient-to-br from-skyblue/5 via-transparent to-crimson/5 opacity-50" />
                        <Sparkles className="w-8 h-8 text-muted-foreground/20 mb-2 group-hover:scale-110 transition-transform duration-500" />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/30 relative z-10">Encoded Logic</span>
                      </div>
                    )}
                    <div className="absolute top-3 left-3 flex gap-2">
                       <Badge className="bg-black/50 backdrop-blur-md">{prompt.platform}</Badge>
                    </div>
                  </div>
                  <div className="p-6 space-y-4">
                    <div className="space-y-1">
                      <h3 className="font-bold text-lg line-clamp-1">{prompt.title}</h3>
                      <p className="text-xs text-muted-foreground">Category: {prompt.category}</p>
                    </div>
                    
                    <div className="flex flex-col gap-2 pt-4">
                      <Link href={`/prompt/${prompt._id}`}>
                        <Button className="w-full h-11 rounded-xl gap-2 font-bold bg-skyblue text-white hover:bg-skyblue/90 shadow-[0_10px_30px_-5px_rgba(56,189,248,0.4)] transition-all">
                          <ExternalLink className="w-4 h-4" /> View Prompt
                        </Button>
                      </Link>
                      <div className="grid grid-cols-2 gap-2">
                        <Button variant="outline" className="rounded-xl h-11 border-white/10 bg-white/5 hover:bg-white/10">
                          <Download className="w-4 h-4 mr-2" /> Source
                        </Button>
                        <Button variant="outline" className="rounded-xl h-11 border-white/10 bg-white/5 hover:bg-white/10">
                          <MessageCircle className="w-4 h-4 mr-2" /> Help
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-4 pt-12">
                <Button 
                  variant="outline" 
                  className="rounded-xl border-white/5 bg-white/5 h-12 w-12 p-0"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                >
                  <ChevronLeft className="w-5 h-5" />
                </Button>
                
                <div className="flex items-center gap-2">
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <Button
                      key={i + 1}
                      variant="outline"
                      className={cn(
                        "w-12 h-12 rounded-xl border-white/5 font-black transition-all",
                        currentPage === i + 1 ? "bg-skyblue border-skyblue text-white shadow-xl" : "bg-white/5"
                      )}
                      onClick={() => setCurrentPage(i + 1)}
                    >
                      {i + 1}
                    </Button>
                  ))}
                </div>

                <Button 
                  variant="outline" 
                  className="rounded-xl border-white/5 bg-white/5 h-12 w-12 p-0"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                >
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center space-y-6">
            <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center text-muted-foreground">
              <ShoppingBag className="w-10 h-10" />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-bold">No prompts in your library</h3>
              <p className="text-muted-foreground max-w-xs">Start exploring our marketplace to find high-performance AI prompts.</p>
            </div>
            <Link href="/explore">
              <Button className="px-8 h-12 rounded-full bg-skyblue text-white hover:bg-skyblue/90 shadow-[0_10px_30px_-5px_rgba(56,189,248,0.4)]">Browse Marketplace</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

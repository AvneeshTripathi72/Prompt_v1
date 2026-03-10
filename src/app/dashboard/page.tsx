"use client";

import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area 
} from "recharts";
import { 
  TrendingUp, 
  Users, 
  ShoppingBag, 
  DollarSign, 
  Star, 
  ArrowUpRight, 
  MessageSquare, 
  Trophy,
  Trash2,
  Edit
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useState, useEffect } from "react";
import { toast } from "sonner";

export default function DashboardPage() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      const res = await fetch("/api/dashboard/stats");
      const data = await res.json();
      setStats(data);
    } catch (error) {
      console.error("Failed to fetch stats:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm("Are you sure you want to delete this prompt?")) return;
    
    try {
      const res = await fetch(`/api/prompts/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error("Deletion failed");
      toast.success("Prompt deleted successfully");
      fetchStats();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const chartData = stats?.dailyData || [];
  return (
    <div className="container mx-auto px-6 py-16 max-w-7xl">
      <div className="space-y-16">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
          <div className="space-y-2">
            <h1 className="text-5xl font-black tracking-tight">Creator Hub</h1>
            <p className="text-muted-foreground font-medium text-lg">Real-time performance metrics and revenue analytics.</p>
          </div>
          <div className="flex gap-4">
            <Button variant="outline" className="h-11 px-6 rounded-xl border-border/40 bg-secondary font-black uppercase tracking-widest text-[9px] hover:bg-muted transition-all duration-300 shadow-sm">Export CSV</Button>
            <Button className="h-11 px-6 rounded-xl font-black uppercase tracking-widest text-[9px] shadow-lg shadow-primary/20 bg-primary text-white hover:scale-105 active:scale-95 transition-all duration-300">New Submission</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { label: "Revenue", value: stats?.revenue || "₹0", trend: "+12.5%", icon: DollarSign, color: "text-primary" },
            { label: "Sales", value: stats?.sales || "0", trend: "+8.2%", icon: ShoppingBag, color: "text-primary" },
            { label: "Engagement", value: stats?.engagement || "0", trend: "+24.3%", icon: Users, color: "text-primary" },
            { label: "Quality Score", value: stats?.qualityScore || "5.00", trend: "0.0%", icon: Star, color: "text-primary" },
          ].map((stat, i) => (
            <Card key={stat.label} className="glass-card p-10 rounded-[2.5rem] border-border bg-card scale-100 hover:scale-[1.02] transition-transform duration-500">
              <div className="flex justify-between items-start mb-8">
                <div className={`w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center border border-border shadow-sm ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <Badge className="bg-primary/10 text-primary border-primary/20 px-3 py-1 font-black">{stat.trend}</Badge>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">{stat.label}</p>
                <h3 className="text-4xl font-black tracking-tighter text-foreground">{stat.value}</h3>
              </div>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <Card className="lg:col-span-2 glass-card p-10 rounded-[2.5rem] border-border bg-card space-y-10">
            <div className="flex justify-between items-center">
              <div className="space-y-1">
                <h3 className="text-2xl font-black tracking-tight text-foreground">Financial Growth</h3>
                <p className="text-xs text-muted-foreground font-medium">Monthly revenue projection for Q1 2024</p>
              </div>
              <select className="bg-secondary text-xs font-black uppercase tracking-widest outline-none border border-border rounded-xl px-4 py-2 hover:bg-muted transition-colors">
                <option>Last 30 Days</option>
                <option>This Year</option>
              </select>
            </div>
            <div className="h-[400px] w-full pr-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#7C3AED" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                  <XAxis dataKey="name" stroke="#666" fontSize={10} tickLine={false} axisLine={false} />
                  <YAxis stroke="#666" fontSize={10} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', backdropFilter: 'blur(12px)', border: '1px solid hsl(var(--border))', borderRadius: '16px', padding: '12px' }}
                    itemStyle={{ color: '#7C3AED', fontWeight: '900' }}
                  />
                  <Area type="monotone" dataKey="sales" stroke="#7C3AED" fillOpacity={1} fill="url(#colorSales)" strokeWidth={4} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="glass-card p-10 rounded-[2.5rem] border-border/40 space-y-10">
            <div className="space-y-1">
              <h3 className="text-2xl font-black tracking-tight flex items-center gap-3 text-foreground">
                <Trophy className="w-6 h-6 text-primary" /> Recognition
              </h3>
              <p className="text-xs text-muted-foreground font-medium">Your current global ranking status</p>
            </div>
            <div className="space-y-10">
              <div className="text-center py-10 bg-primary/5 rounded-[2.5rem] border border-primary/10 shadow-sm relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-4">World Standing</p>
                <h2 className="text-7xl font-black text-gradient">#42</h2>
                <Badge className="bg-primary/10 text-primary border-primary/20 px-4 py-1.5 mt-6 font-black uppercase text-[9px] tracking-widest">Master Class</Badge>
              </div>
              <div className="space-y-6">
                <p className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground">Top 3 Rivals</p>
                <div className="text-center py-10 text-muted-foreground/40 font-bold text-xs">
                  Awaiting global ranking synchronization...
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
          <Card className="xl:col-span-2 glass-card overflow-hidden border-border/40 rounded-[2.5rem]">
            <div className="p-10 border-b border-border/40 flex justify-between items-center bg-card">
              <h3 className="text-2xl font-black tracking-tight text-foreground">Best Sellers</h3>
              <Button variant="ghost" className="text-xs font-black uppercase tracking-widest text-primary hover:bg-primary/5">View Inventory</Button>
            </div>
            <Table>
              <TableHeader className="bg-secondary border-b border-border/40">
                <TableRow className="hover:bg-transparent border-none h-16">
                  <TableHead className="pl-10 font-black uppercase text-[10px] tracking-widest text-muted-foreground">Asset</TableHead>
                  <TableHead className="font-black uppercase text-[10px] tracking-widest text-muted-foreground">Sales</TableHead>
                  <TableHead className="font-black uppercase text-[10px] tracking-widest text-muted-foreground">Index</TableHead>
                  <TableHead className="font-black uppercase text-[10px] tracking-widest text-muted-foreground">Conversion</TableHead>
                  <TableHead className="font-black uppercase text-[10px] tracking-widest text-muted-foreground">Net Profit</TableHead>
                  <TableHead className="text-right pr-10 font-black uppercase text-[10px] tracking-widest text-muted-foreground">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="bg-card">
                {(stats?.topSellers || []).length > 0 ? (
                  stats.topSellers.map((row: any, i: number) => (
                    <TableRow key={row.id || i} className="border-border/40 h-20 hover:bg-secondary/50 transition-colors group cursor-pointer">
                      <TableCell className="font-black tracking-tight text-base pl-10 group-hover:text-primary transition-colors text-foreground">{row.name}</TableCell>
                      <TableCell className="font-bold text-muted-foreground">{row.sales}</TableCell>
                      <TableCell className="font-bold text-muted-foreground">{row.views}</TableCell>
                      <TableCell>
                        <Badge className="bg-primary/10 text-primary border-primary/20 px-3 py-1 font-black">{row.cr}</Badge>
                      </TableCell>
                      <TableCell className="font-black text-lg text-primary">{row.revenue}</TableCell>
                      <TableCell className="text-right pr-10">
                        <div className="flex justify-end gap-2">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="w-9 h-9 rounded-xl hover:bg-primary/10 hover:text-primary transition-all"
                            onClick={(e) => {
                              e.stopPropagation();
                              toast.info("Edit feature coming soon!");
                            }}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="w-9 h-9 rounded-xl hover:bg-red-500/10 hover:text-red-500 transition-all text-muted-foreground"
                            onClick={(e) => handleDelete(row.id, e)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                     <TableCell colSpan={6} className="h-40 text-center text-muted-foreground/40 font-bold uppercase tracking-widest text-xs">No assets detected in current sector</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </Card>

          <Card className="glass-card p-10 rounded-[2.5rem] border-border bg-card space-y-8">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-black tracking-tight text-foreground">Feedback</h3>
              <Button variant="ghost" size="sm" className="text-xs font-black uppercase tracking-widest text-primary hover:bg-primary/5">Archives</Button>
            </div>
            <div className="flex flex-col items-center justify-center py-20 bg-secondary rounded-[2rem] border border-border text-center px-6">
              <MessageSquare className="w-8 h-8 text-muted-foreground/20 mb-4" />
              <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">Channel Idle</p>
              <p className="text-xs text-muted-foreground opacity-60">Customer sentiment analysis will populate here post-transaction.</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

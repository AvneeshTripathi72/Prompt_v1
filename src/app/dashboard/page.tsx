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
        <div className="w-12 h-12 border-4 border-skyblue border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const chartData = stats?.dailyData || [
    { name: "Oct 1", sales: 400 },
    { name: "Oct 5", sales: 700 },
    { name: "Oct 10", sales: 1200 },
    { name: "Oct 15", sales: 900 },
    { name: "Oct 20", sales: 2400 },
    { name: "Oct 25", sales: 1800 },
    { name: "Oct 30", sales: 3200 },
  ];
  return (
    <div className="container mx-auto px-6 py-16 max-w-7xl">
      <div className="space-y-16">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
          <div className="space-y-2">
            <h1 className="text-5xl font-black tracking-tight">Creator Hub</h1>
            <p className="text-muted-foreground font-medium text-lg">Real-time performance metrics and revenue analytics.</p>
          </div>
          <div className="flex gap-4">
            <Button variant="outline" className="h-11 px-6 rounded-xl border-white/5 font-black uppercase tracking-widest text-[9px] hover:bg-white/5 hover:border-white/20 transition-all duration-300">Export CSV</Button>
            <Button className="h-11 px-6 rounded-xl font-black uppercase tracking-widest text-[9px] shadow-lg bg-skyblue text-white hover:scale-105 active:scale-95 transition-all duration-300">New Submission</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { label: "Revenue", value: stats?.revenue || "₹0", trend: "+12.5%", icon: DollarSign, color: "text-skyblue" },
            { label: "Sales", value: stats?.sales || "0", trend: "+8.2%", icon: ShoppingBag, color: "text-blue-500" },
            { label: "Engagement", value: stats?.engagement || "0", trend: "+24.3%", icon: Users, color: "text-indigo-500" },
            { label: "Quality Score", value: stats?.qualityScore || "5.00", trend: "0.0%", icon: Star, color: "text-skyblue" },
          ].map((stat, i) => (
            <Card key={stat.label} className="glass-card p-10 rounded-[2.5rem] border-white/5 scale-100 hover:scale-[1.02] transition-transform duration-500">
              <div className="flex justify-between items-start mb-8">
                <div className={`w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center border border-white/5 shadow-inner ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <Badge className="bg-skyblue/10 text-skyblue border-skyblue/20 px-3 py-1 font-black">{stat.trend}</Badge>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">{stat.label}</p>
                <h3 className="text-4xl font-black tracking-tighter">{stat.value}</h3>
              </div>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <Card className="lg:col-span-2 glass-card p-10 rounded-[2.5rem] border-white/5 space-y-10">
            <div className="flex justify-between items-center">
              <div className="space-y-1">
                <h3 className="text-2xl font-black tracking-tight">Financial Growth</h3>
                <p className="text-xs text-muted-foreground font-medium">Monthly revenue projection for Q1 2024</p>
              </div>
              <select className="bg-white/5 text-xs font-black uppercase tracking-widest outline-none border border-white/5 rounded-xl px-4 py-2 hover:bg-white/10 transition-colors">
                <option>Last 30 Days</option>
                <option>This Year</option>
              </select>
            </div>
            <div className="h-[400px] w-full pr-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#38bdf8" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.03)" />
                  <XAxis dataKey="name" stroke="#666" fontSize={10} tickLine={false} axisLine={false} />
                  <YAxis stroke="#666" fontSize={10} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'rgba(15,23,42,0.9)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px', padding: '12px' }}
                    itemStyle={{ color: '#38bdf8', fontWeight: '900' }}
                  />
                  <Area type="monotone" dataKey="sales" stroke="#38bdf8" fillOpacity={1} fill="url(#colorSales)" strokeWidth={4} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="glass-card p-10 rounded-[2.5rem] border-white/5 space-y-10">
            <div className="space-y-1">
              <h3 className="text-2xl font-black tracking-tight flex items-center gap-3">
                <Trophy className="w-6 h-6 text-skyblue" /> Recognition
              </h3>
              <p className="text-xs text-muted-foreground font-medium">Your current global ranking status</p>
            </div>
            <div className="space-y-10">
              <div className="text-center py-10 bg-skyblue/5 rounded-[2.5rem] border border-skyblue/10 shadow-2xl relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-skyblue/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <p className="text-[10px] font-black text-skyblue uppercase tracking-[0.2em] mb-4">World Standing</p>
                <h2 className="text-7xl font-black text-gradient">#42</h2>
                <Badge className="bg-skyblue/10 text-skyblue border-skyblue/20 px-4 py-1.5 mt-6 font-black uppercase text-[9px] tracking-widest">Master Class</Badge>
              </div>
              <div className="space-y-6">
                <p className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground">Top 3 Rivals</p>
                {[
                  { name: "@pixel_wizard", earned: "₹120k", rank: "1" },
                  { name: "@prompt_king", earned: "₹95k", rank: "2" },
                  { name: "@ai_artist", earned: "₹88k", rank: "3" },
                ].map((p, i) => (
                  <div key={i} className="flex justify-between items-center text-sm p-5 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors cursor-pointer group">
                    <div className="flex items-center gap-4">
                      <span className="font-black text-muted-foreground w-4 text-xs group-hover:text-skyblue transition-colors">{p.rank}</span>
                      <span className="font-bold tracking-tight">{p.name}</span>
                    </div>
                    <span className="font-black text-skyblue">{p.earned}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
          <Card className="xl:col-span-2 glass-card overflow-hidden border-white/5 rounded-[2.5rem]">
            <div className="p-10 border-b border-white/5 flex justify-between items-center">
              <h3 className="text-2xl font-black tracking-tight">Best Sellers</h3>
              <Button variant="ghost" className="text-xs font-black uppercase tracking-widest text-skyblue">View Inventory</Button>
            </div>
            <Table>
              <TableHeader className="bg-white/5 border-b border-white/5">
                <TableRow className="hover:bg-transparent border-none h-16">
                  <TableHead className="pl-10 font-black uppercase text-[10px] tracking-widest">Asset</TableHead>
                  <TableHead className="font-black uppercase text-[10px] tracking-widest">Sales</TableHead>
                  <TableHead className="font-black uppercase text-[10px] tracking-widest">Index</TableHead>
                  <TableHead className="font-black uppercase text-[10px] tracking-widest">Conversion</TableHead>
                  <TableHead className="font-black uppercase text-[10px] tracking-widest">Net Profit</TableHead>
                  <TableHead className="text-right pr-10 font-black uppercase text-[10px] tracking-widest">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {(stats?.topSellers || []).map((row: any, i: number) => (
                  <TableRow key={row.id || i} className="border-white/5 h-20 hover:bg-white/5 transition-colors group cursor-pointer">
                    <TableCell className="font-black tracking-tight text-base pl-10 group-hover:text-skyblue transition-colors">{row.name}</TableCell>
                    <TableCell className="font-bold text-muted-foreground">{row.sales}</TableCell>
                    <TableCell className="font-bold text-muted-foreground">{row.views}</TableCell>
                    <TableCell>
                      <Badge className="bg-skyblue/10 text-skyblue border-skyblue/20 px-3 py-1 font-black">{row.cr}</Badge>
                    </TableCell>
                    <TableCell className="font-black text-lg text-skyblue">{row.revenue}</TableCell>
                    <TableCell className="text-right pr-10">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="w-9 h-9 rounded-xl hover:bg-skyblue/10 hover:text-skyblue transition-all"
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
                ))}
              </TableBody>
            </Table>
          </Card>

          <Card className="glass-card p-10 rounded-[2.5rem] border-white/5 space-y-8">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-black tracking-tight">Feedback</h3>
              <Button variant="ghost" size="sm" className="text-xs font-black uppercase tracking-widest text-skyblue">Archives</Button>
            </div>
            <div className="space-y-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="space-y-4 p-6 bg-white/5 rounded-[2rem] border border-white/5 hover:border-skyblue/20 transition-all cursor-pointer group">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2 bg-skyblue/10 px-3 py-1.5 rounded-xl border border-skyblue/20">
                       <Star className="w-3.5 h-3.5 text-skyblue fill-current" />
                       <span className="text-xs font-black text-skyblue">5.0</span>
                    </div>
                    <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{i * 2}h ago</span>
                  </div>
                  <p className="text-sm font-medium leading-relaxed italic text-muted-foreground group-hover:text-foreground transition-colors">"High-performance logic that saved me days of engineering. Highly recommended for production use."</p>
                  <div className="flex justify-between items-center pt-4 border-t border-white/5">
                    <span className="text-xs font-black tracking-tight">@indie_dev</span>
                    <Button variant="outline" size="sm" className="h-9 px-4 rounded-xl text-[10px] font-black uppercase tracking-widest border-white/5 hover:bg-skyblue hover:text-white transition-all">Reply</Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

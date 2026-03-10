"use client";

import { useState, useEffect } from "react";
import { Wallet, CreditCard, ArrowUpRight, ArrowDownLeft, Clock, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const COIN_PACKAGES = [
  { coins: 100, price: 89, popular: false, bonus: 0 },
  { coins: 500, price: 399, popular: true, bonus: 20 },
  { coins: 1200, price: 849, popular: false, bonus: 100 },
];

export default function WalletPage() {
  const [balance, setBalance] = useState<number>(0);

  const fetchBalance = async () => {
    try {
      const res = await fetch("/api/user/profile");
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      if (data && typeof data.coins === "number") {
        setBalance(data.coins);
      }
    } catch (e: any) {
      console.error("Failed to fetch balance:", e.message);
    }
  };

  useEffect(() => {
    fetchBalance();
    window.addEventListener("balanceUpdate", fetchBalance);
    return () => window.removeEventListener("balanceUpdate", fetchBalance);
  }, []);

  const handleCheckout = async (pkg: typeof COIN_PACKAGES[0]) => {
    try {
      if (!pkg) {
        toast.error("Invalid package selection");
        return;
      }

      const response = await fetch('/api/razorpay/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: pkg.price }),
      });

      if (!response) {
        throw new Error("No response from server");
      }

      const order = await response.json().catch(() => null);
      
      if (!order) {
        throw new Error(`Failed to parse server response. Status: ${response.status}`);
      }

      if (order.error) {
        throw new Error(order.error);
      }

      if (!(window as any).Razorpay) {
        throw new Error("Razorpay SDK not loaded. Please refresh the page.");
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "PromptVault",
        description: `Purchase ${pkg.coins} coins`,
        order_id: order.id,
        handler: async function (response: any) {
          // In a real app, verify the payment on the server before updating balance
          // For now, update locally for UX
          setBalance(prev => prev + pkg.coins + pkg.bonus);
          toast.success("Payment Successful!", {
            description: `Added ${pkg.coins + pkg.bonus} coins to your wallet.`,
          });
          window.dispatchEvent(new Event("balanceUpdate"));
        },
        prefill: {
          name: "Global Engineer",
          email: "creator@promptvault.com",
        },
        theme: {
          color: "#38bdf8",
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (error: any) {
      console.error("Razorpay Error:", error);
      toast.error(`Payment Initialization Failed: ${error.message}`);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <div className="space-y-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-1">
            <h1 className="text-4xl font-black tracking-tight text-foreground">My Wallet</h1>
            <p className="text-muted-foreground font-medium">Manage your coins and view transaction history.</p>
          </div>
          <Card className="glass-card px-8 py-6 rounded-[2rem] border-border bg-card flex items-center gap-6 shadow-xl">
            <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary border border-border shadow-sm">
              <Wallet className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Total Balance</p>
              <h2 className="text-3xl font-black tracking-tighter text-foreground flex items-center gap-2">
                {balance} <span className="text-sm font-black text-muted-foreground/40">CR</span>
              </h2>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-black tracking-tight text-foreground">Top Up Coins</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {COIN_PACKAGES.map((pkg) => (
              <Card 
                key={pkg.coins} 
                className={`glass-card p-8 rounded-[2rem] bg-card relative flex flex-col items-center text-center gap-6 group hover:border-primary/50 transition-all shadow-sm hover:shadow-xl duration-500 ${pkg.popular ? 'border-primary ring-1 ring-primary/20' : 'border-border'}`}
              >
                {pkg.popular && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white px-4 py-1.5 rounded-full font-black uppercase tracking-widest text-[9px] shadow-lg shadow-primary/20">Best Value</Badge>
                )}
                {pkg.bonus > 0 && (
                  <Badge variant="secondary" className="bg-primary/5 text-primary border-primary/20 rounded-full font-black uppercase tracking-widest text-[9px]">+{pkg.bonus} Bonus Coins</Badge>
                )}
                
                <div className="space-y-2">
                  <h3 className="text-xl font-black text-foreground">{pkg.coins} Coins</h3>
                  <p className="text-4xl font-black tracking-tighter text-primary">₹{pkg.price}</p>
                </div>

                <ul className="space-y-3 text-sm text-muted-foreground font-medium flex-grow w-full">
                  <li className="flex items-center gap-2 justify-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" /> Multi-platform access
                  </li>
                  <li className="flex items-center gap-2 justify-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" /> Verified prompts
                  </li>
                  <li className="flex items-center gap-2 justify-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" /> Lifetime storage
                  </li>
                </ul>

                <Button 
                  className={`w-full h-12 rounded-xl font-black uppercase tracking-widest text-[10px] transition-all ${pkg.popular ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-secondary border-border/40 hover:bg-muted'}`}
                  variant={pkg.popular ? "default" : "outline"}
                  onClick={() => handleCheckout(pkg)}
                >
                  Purchase Now
                </Button>
              </Card>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-black tracking-tight text-foreground">History</h2>
          <Card className="glass-card overflow-hidden border-border rounded-3xl bg-card shadow-sm">
            <Table>
              <TableHeader className="bg-secondary">
                <TableRow className="hover:bg-transparent border-border h-14">
                  <TableHead className="w-[150px] font-black uppercase tracking-widest text-[10px] text-muted-foreground pl-10">Date</TableHead>
                  <TableHead className="font-black uppercase tracking-widest text-[10px] text-muted-foreground">Activity</TableHead>
                  <TableHead className="font-black uppercase tracking-widest text-[10px] text-muted-foreground">Type</TableHead>
                  <TableHead className="text-right font-black uppercase tracking-widest text-[10px] text-muted-foreground">Amount</TableHead>
                  <TableHead className="text-right pr-10 font-black uppercase tracking-widest text-[10px] text-muted-foreground">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  { date: "Oct 24, 2023", activity: "Purchased 'Steampunk Character'", type: "purchase", amount: -150, status: "Success" },
                  { date: "Oct 22, 2023", activity: "Wallet Top-up", type: "topup", amount: 500, status: "Success" },
                  { date: "Oct 20, 2023", activity: "Sold 'Minimalist Logo Generator'", type: "sale", amount: 45, status: "Success" },
                ].map((row, i) => (
                  <TableRow key={i} className="border-border h-20 hover:bg-secondary/50 transition-colors group">
                    <TableCell className="font-bold text-muted-foreground pl-10">{row.date}</TableCell>
                    <TableCell className="font-black text-foreground group-hover:text-primary transition-colors">{row.activity}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={`rounded-lg border-border/40 dark:border-white/10 font-black uppercase tracking-widest text-[8px] ${
                        row.type === 'purchase' ? 'text-red-500 bg-red-500/5' : 
                        row.type === 'topup' ? 'text-emerald-500 bg-emerald-500/5' : 
                        'text-primary bg-primary/5'
                      }`}>
                        {row.type}
                      </Badge>
                    </TableCell>
                    <TableCell className={`text-right font-black text-lg tracking-tight ${row.amount > 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                      {row.amount > 0 ? `+${row.amount}` : row.amount}
                    </TableCell>
                    <TableCell className="text-right pr-10">
                      <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-emerald-500">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> {row.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </div>
      </div>
    </div>
  );
}

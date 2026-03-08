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
          <div>
            <h1 className="text-4xl font-bold mb-2">My Wallet</h1>
            <p className="text-muted-foreground">Manage your coins and view transaction history.</p>
          </div>
          <Card className="glass-card px-8 py-6 rounded-[2rem] border-primary/20 bg-primary/5 flex items-center gap-6">
            <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center text-primary">
              <Wallet className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Total Balance</p>
              <h2 className="text-3xl font-bold flex items-center gap-2">
                {balance} <span className="text-sm font-normal text-muted-foreground">Coins</span>
              </h2>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Top Up Coins</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {COIN_PACKAGES.map((pkg) => (
              <Card 
                key={pkg.coins} 
                className={`glass-card p-8 rounded-[2rem] relative flex flex-col items-center text-center gap-6 group hover:border-primary/50 transition-all ${pkg.popular ? 'border-primary/30 ring-1 ring-primary/20' : 'border-white/5'}`}
              >
                {pkg.popular && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1">Best Value</Badge>
                )}
                {pkg.bonus > 0 && (
                  <Badge variant="secondary" className="bg-purple-500/20 text-purple-400 border-purple-500/20">+{pkg.bonus} Bonus Coins</Badge>
                )}
                
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">{pkg.coins} Coins</h3>
                  <p className="text-4xl font-bold">₹{pkg.price}</p>
                </div>

                <ul className="space-y-3 text-sm text-muted-foreground flex-grow w-full">
                  <li className="flex items-center gap-2 justify-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" /> Multi-platform access
                  </li>
                  <li className="flex items-center gap-2 justify-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" /> Verified prompts
                  </li>
                  <li className="flex items-center gap-2 justify-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" /> Lifetime content storage
                  </li>
                </ul>

                <Button 
                  className={`w-full h-12 rounded-xl font-bold ${pkg.popular ? 'glow-primary' : 'bg-white/5 hover:bg-white/10'}`}
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
          <h2 className="text-2xl font-bold">History</h2>
          <Card className="glass-card overflow-hidden border-white/5 rounded-3xl">
            <Table>
              <TableHeader className="bg-white/5">
                <TableRow className="hover:bg-transparent border-white/5 h-14">
                  <TableHead className="w-[150px]">Date</TableHead>
                  <TableHead>Activity</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead className="text-right">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  { date: "Oct 24, 2023", activity: "Purchased 'Steampunk Character'", type: "purchase", amount: -150, status: "Success" },
                  { date: "Oct 22, 2023", activity: "Wallet Top-up", type: "topup", amount: 500, status: "Success" },
                  { date: "Oct 20, 2023", activity: "Sold 'Minimalist Logo Generator'", type: "sale", amount: 45, status: "Success" },
                ].map((row, i) => (
                  <TableRow key={i} className="border-white/5 h-16 hover:bg-white/5 transition-colors">
                    <TableCell className="font-medium text-muted-foreground">{row.date}</TableCell>
                    <TableCell className="font-semibold">{row.activity}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={`rounded-full ${
                        row.type === 'purchase' ? 'border-red-500/20 text-red-400 bg-red-500/5' : 
                        row.type === 'topup' ? 'border-green-500/20 text-green-400 bg-green-500/5' : 
                        'border-blue-500/20 text-blue-400 bg-blue-500/5'
                      }`}>
                        {row.type}
                      </Badge>
                    </TableCell>
                    <TableCell className={`text-right font-bold ${row.amount > 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {row.amount > 0 ? `+${row.amount}` : row.amount}
                    </TableCell>
                    <TableCell className="text-right">
                      <span className="inline-flex items-center gap-1.5 text-xs text-green-500">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /> {row.status}
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

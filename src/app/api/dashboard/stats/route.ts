import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Prompt from '@/models/Prompt';

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    
    // In a real app, filter by the logged-in user
    // const sellerId = "avneesh"; 
    // const prompts = await Prompt.find({ seller: sellerId });
    
    // For now, let's show prompts belonging to Global_Engineer
    const prompts = await Prompt.find({ seller: 'Global_Engineer' });
    
    const totalSales = prompts.reduce((acc, p) => acc + (p.sales || 0), 0);
    const totalRevenue = prompts.reduce((acc, p) => acc + ((p.sales || 0) * (p.price || 0)), 0);
    const avgRating = prompts.length > 0 
      ? prompts.reduce((acc, p) => acc + (p.rating || 0), 0) / prompts.length 
      : 0;
    
    // Top sellers
    const topSellers = [...prompts]
      .sort((a, b) => (b.sales || 0) - (a.sales || 0))
      .slice(0, 5)
      .map(p => ({
        id: p._id,
        name: p.title,
        sales: p.sales || 0,
        views: `${(p.sales || 0) * 12}k`, // Mocked views based on sales
        cr: `${((p.sales || 0) / ((p.sales || 0) * 12 + 1) * 100).toFixed(2)}%`,
        revenue: `₹${((p.sales || 0) * (p.price || 0)).toLocaleString()}`
      }));

    // Mocking chart data based on real volume
    const dailyData = [
      { name: "Day 1", sales: Math.round(totalRevenue * 0.1) },
      { name: "Day 5", sales: Math.round(totalRevenue * 0.15) },
      { name: "Day 10", sales: Math.round(totalRevenue * 0.25) },
      { name: "Day 15", sales: Math.round(totalRevenue * 0.2) },
      { name: "Day 20", sales: Math.round(totalRevenue * 0.4) },
      { name: "Day 25", sales: Math.round(totalRevenue * 0.3) },
      { name: "Day 30", sales: Math.round(totalRevenue * 0.5) },
    ];

    return NextResponse.json({
      revenue: `₹${(totalRevenue / 1000).toFixed(1)}k`,
      revenueRaw: totalRevenue,
      sales: totalSales.toLocaleString(),
      engagement: `${(totalSales * 15 / 1000).toFixed(1)}k`,
      qualityScore: avgRating.toFixed(2),
      topSellers,
      dailyData
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

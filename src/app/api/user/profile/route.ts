import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import Prompt from '@/models/Prompt'; // Register the model

export async function GET() {
  try {
    await connectDB();
    let user = await User.findOne({ username: 'Global_Engineer' }).populate('purchasedPrompts');
    
    if (!user) {
      user = await User.create({
        username: 'Global_Engineer',
        coins: 1000,
        avatar: 'https://avatar.iran.liara.run/public/boy?username=Global_Engineer'
      });
      // Re-query to get populated if newly created
      user = await User.findOne({ username: 'Global_Engineer' }).populate('purchasedPrompts');
    }
    
    return NextResponse.json(user);
  } catch (error: any) {
    console.error("Profile API error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import Prompt from '@/models/Prompt';

export async function POST(req: NextRequest) {
  try {
    const { promptId } = await req.json();
    await connectDB();

    // 1. Get the prompt
    const prompt = await Prompt.findById(promptId);
    if (!prompt) return NextResponse.json({ error: 'Prompt not found' }, { status: 404 });

    // 2. Get the current user (Mocking Global_Engineer)
    const user = await User.findOne({ username: 'Global_Engineer' });
    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

    // 3. Check if user has enough coins
    if (user.coins < prompt.price) {
      return NextResponse.json({ error: 'Insufficient coins' }, { status: 400 });
    }

    // 4. Deduct coins and record purchase
    user.coins -= prompt.price;
    if (!user.purchasedPrompts) user.purchasedPrompts = [];
    if (!user.purchasedPrompts.includes(promptId)) {
      user.purchasedPrompts.push(promptId);
    }
    await user.save();

    // 5. Update prompt sales
    prompt.sales = (prompt.sales || 0) + 1;
    await prompt.save();

    return NextResponse.json({ 
      success: true, 
      newBalance: user.coins,
      message: `Successfully unlocked ${prompt.title}`
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

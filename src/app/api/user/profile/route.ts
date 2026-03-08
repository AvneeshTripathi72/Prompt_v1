import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';

export async function GET() {
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
}

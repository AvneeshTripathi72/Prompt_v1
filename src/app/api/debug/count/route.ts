import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Prompt from '@/models/Prompt';

export async function GET() {
  await connectDB();
  const count = await Prompt.countDocuments({});
  const all = await Prompt.find({});
  return NextResponse.json({ count, all });
}

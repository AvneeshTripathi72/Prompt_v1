import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Prompt from '@/models/Prompt';

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    
    // In a real app, you'd get the seller from the session
    const prompt = await Prompt.create({
      ...body,
      seller: body.seller || 'anonymous',
    });

    return NextResponse.json(prompt, { status: 201 });
  } catch (error: any) {
    console.error('Error creating prompt:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const prompts = await Prompt.find({}).sort({ createdAt: -1 });
    return NextResponse.json(prompts);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

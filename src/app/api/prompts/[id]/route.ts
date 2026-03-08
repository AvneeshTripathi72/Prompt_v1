import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Prompt from '@/models/Prompt';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await connectDB();
    const prompt = await Prompt.findById(id);
    
    if (!prompt) {
      return NextResponse.json({ error: 'Prompt not found' }, { status: 404 });
    }

    return NextResponse.json(prompt);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await connectDB();
    
    // In a real app, you'd verify the user from the session
    // For now, we allow deletion by Global_Engineer
    const prompt = await Prompt.findById(id);
    if (!prompt) return NextResponse.json({ error: 'Prompt not found' }, { status: 404 });

    if (prompt.seller !== 'Global_Engineer') {
      return NextResponse.json({ error: 'You do not have permission to delete this prompt' }, { status: 403 });
    }

    await Prompt.findByIdAndDelete(id);
    return NextResponse.json({ message: 'Prompt deleted successfully' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    await connectDB();

    const prompt = await Prompt.findById(id);
    if (!prompt) return NextResponse.json({ error: 'Prompt not found' }, { status: 404 });

    if (prompt.seller !== 'Global_Engineer') {
      return NextResponse.json({ error: 'You do not have permission to edit this prompt' }, { status: 403 });
    }

    // Update fields
    const updatedPrompt = await Prompt.findByIdAndUpdate(id, body, { new: true });
    return NextResponse.json(updatedPrompt);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

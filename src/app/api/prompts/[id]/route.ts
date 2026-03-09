import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Prompt from '@/models/Prompt';
import { unstable_cache } from 'next/cache';

const getCachedPrompt = (id: string) => 
  unstable_cache(
    async () => {
      await connectDB();
      return Prompt.findById(id).lean();
    },
    [`prompt-detail-${id}`],
    { revalidate: 300, tags: ['prompts'] } // Cache for 5 mins
  )();

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const prompt = await getCachedPrompt(id);
    
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
    
    const prompt = await Prompt.findById(id);
    if (!prompt) return NextResponse.json({ error: 'Prompt not found' }, { status: 404 });

    // For now, allow Global_Engineer
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

    const updatedPrompt = await Prompt.findByIdAndUpdate(id, body, { new: true });
    return NextResponse.json(updatedPrompt);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

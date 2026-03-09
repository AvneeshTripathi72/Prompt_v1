import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import Prompt from '@/models/Prompt';

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '9');
    const skip = (page - 1) * limit;

    // Hardcoded user for now
    const user = await User.findOne({ username: 'Global_Engineer' }).lean();
    if (!user) {
      return NextResponse.json({ prompts: [], total: 0 });
    }

    const purchasedIds = user.purchasedPrompts || [];
    
    const [prompts, total] = await Promise.all([
      Prompt.find({ _id: { $in: purchasedIds } })
        .skip(skip)
        .limit(limit)
        .lean(),
      Prompt.countDocuments({ _id: { $in: purchasedIds } })
    ]);

    return NextResponse.json({
      prompts,
      total,
      page,
      totalPages: Math.ceil(total / limit)
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

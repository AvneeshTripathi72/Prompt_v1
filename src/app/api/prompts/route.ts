import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Prompt from '@/models/Prompt';
import { unstable_cache, revalidateTag } from 'next/cache';

// Low-level caching for prompts with dynamic keys
const getCachedPrompts = (query: any, sort: any, skip: number, limit: number) => 
  unstable_cache(
    async () => {
      await connectDB();
      return Prompt.find(query).sort(sort).skip(skip).limit(limit).lean();
    },
    [`prompts-list-${JSON.stringify({ query, sort, skip, limit })}`],
    { revalidate: 60, tags: ['prompts'] }
  )();

const getCachedCount = (query: any) => 
  unstable_cache(
    async () => {
      await connectDB();
      return Prompt.countDocuments(query);
    },
    [`prompts-count-${JSON.stringify(query)}`],
    { revalidate: 60, tags: ['prompts'] }
  )();

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    
    const prompt = await Prompt.create({
      ...body,
      seller: body.seller || 'anonymous',
    });

    // Invalidate the 'prompts' cache tag
    revalidateTag('prompts');

    return NextResponse.json(prompt, { status: 201 });
  } catch (error: any) {
    console.error('Error creating prompt:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    
    // Pagination params
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;

    // Filter params
    const q = searchParams.get('q') || '';
    const category = searchParams.get('category');
    const platform = searchParams.get('platform');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const minRating = searchParams.get('minRating');
    const seller = searchParams.get('seller');
    const sortBy = searchParams.get('sortBy') || 'Newest First';

    // Build Query
    const query: any = {};
    if (q) {
      query.$or = [
        { title: { $regex: q, $options: 'i' } },
        { tagline: { $regex: q, $options: 'i' } }
      ];
    }
    if (category && category !== 'All') query.category = { $regex: new RegExp(`^${category}$`, 'i') };
    if (platform) {
      const platforms = platform.split(',');
      if (platforms.length > 0 && platforms[0] !== "") {
        query.platform = { $in: platforms.map(p => new RegExp(`^${p}$`, 'i')) };
      }
    }
    if (seller) query.seller = seller;
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }
    if (minRating) query.rating = { $gte: Number(minRating) };

    // Sort Mapping
    let sort: any = { createdAt: -1 };
    if (sortBy === 'Price: Low to High') sort = { price: 1 };
    if (sortBy === 'Price: High to Low') sort = { price: -1 };
    if (sortBy === 'Most Purchased') sort = { sales: -1 };

    // Execute with caching
    const [prompts, total] = await Promise.all([
      getCachedPrompts(query, sort, skip, limit),
      getCachedCount(query)
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

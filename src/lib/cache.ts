import { unstable_cache } from 'next/cache';
import connectDB from './mongodb';
import Prompt from '@/models/Prompt';

export const getCachedPrompts = unstable_cache(
  async (query: any, sort: any, skip: number, limit: number) => {
    await connectDB();
    return Prompt.find(query)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .lean();
  },
  ['prompts-list'],
  { revalidate: 60, tags: ['prompts'] }
);

export const getCachedPromptCount = unstable_cache(
  async (query: any) => {
    await connectDB();
    return Prompt.countDocuments(query);
  },
  ['prompts-count'],
  { revalidate: 60, tags: ['prompts'] }
);

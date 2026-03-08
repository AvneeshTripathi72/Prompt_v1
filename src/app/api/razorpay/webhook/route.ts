import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const signature = req.headers.get('x-razorpay-signature');

  const secret = process.env.RAZORPAY_WEBHOOK_SECRET!;
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(JSON.stringify(body))
    .digest('hex');

  if (signature !== expectedSignature) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  const { event, payload } = body;

  if (event === 'payment.captured') {
    const payment = payload.payment.entity;
    const { amount, email, notes } = payment;
    const userId = notes.userId;
    const coinAmount = notes.coinAmount;

    try {
      await connectDB();
      const user = await User.findByIdAndUpdate(
        userId,
        { $inc: { coins: parseInt(coinAmount) } },
        { new: true }
      );

      if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
      }
    } catch (error) {
      console.error('Error updating balance:', error);
      return NextResponse.json({ error: 'Balance update failed' }, { status: 500 });
    }
  }

  return NextResponse.json({ status: 'ok' });
}

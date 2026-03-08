import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { supabase } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const signature = req.headers.get('x-razorpay-signature');

  // Verify signature
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

    // Update user balance in Supabase
    const { error } = await supabase.rpc('increment_coins', { 
      user_id: userId, 
      amount: parseInt(coinAmount) 
    });

    if (error) {
      console.error('Error updating balance:', error);
      return NextResponse.json({ error: 'Balance update failed' }, { status: 500 });
    }
  }

  return NextResponse.json({ status: 'ok' });
}

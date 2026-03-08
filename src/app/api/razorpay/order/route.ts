import { NextRequest, NextResponse } from 'next/server';
import { razorpay } from '@/lib/razorpay';

export async function POST(req: NextRequest) {
  try {
    const { amount, currency = 'INR' } = await req.json();

    const options = {
      amount: amount * 100, // amount in the smallest currency unit
      currency,
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    return NextResponse.json(order);
  } catch (error: any) {
    console.error('Error creating Razorpay order:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";

export async function POST(request: NextRequest) {
  try {
    const { amount } = await request.json();

    const donationAmount = Number(amount);

    if (!donationAmount || donationAmount <= 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid donation amount.",
        },
        { status: 400 }
      );
    }

    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keyId || !keySecret) {
      return NextResponse.json(
        {
          success: false,
          message: "Razorpay keys are not configured.",
        },
        { status: 500 }
      );
    }

    const razorpay = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    });

    const order = await razorpay.orders.create({
      amount: Math.round(donationAmount * 100),
      currency: "INR",
      receipt: `donation_${Date.now()}`,
      notes: {
        purpose: "Mayu's Library Donation",
      },
    });

    return NextResponse.json({
      success: true,
      order: {
        id: order.id,
        amount: order.amount,
        currency: order.currency,
      },
      keyId,
    });
  } catch (error) {
    console.error("Razorpay order error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to create Razorpay order.",
      },
      { status: 500 }
    );
  }
}
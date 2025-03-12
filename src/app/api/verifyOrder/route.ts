import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(request: Request) {
  try {
    const { orderId, razorpayPaymentId, razorpaySignature } = await request.json();

    // Build the string to be hashed
    const body = orderId + "|" + razorpayPaymentId;

    // Generate the signature using your Razorpay secret
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET_ID as string)
      .update(body)
      .digest("hex");

    // Compare the signatures
    if (expectedSignature === razorpaySignature) {
      return NextResponse.json({ isOk: true });
    } else {
      return NextResponse.json({ isOk: false });
    }
  } catch (error: any) {
    console.error("Error verifying payment:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

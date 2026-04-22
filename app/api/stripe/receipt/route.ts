import { NextResponse } from "next/server";
import Stripe from "stripe";
import { setGlobalDispatcher, Agent } from "undici";

setGlobalDispatcher(
  new Agent({
    connect: {
      timeout: 30000, // 30 seconds - increase if needed
    },
  })
);

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const paymentIntentId = searchParams.get("payment_intent");

    if (!paymentIntentId) {
      return NextResponse.json(
        { error: "Missing payment_intent parameter" },
        { status: 400 }
      );
    }

    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId, {
      expand: ["latest_charge"],
    });

    const charge = paymentIntent.latest_charge as Stripe.Charge;

    if (!charge?.receipt_url) {
      return NextResponse.json(
        { error: "No receipt available for this payment" },
        { status: 404 }
      );
    }

    // Fetch the receipt HTML with proper timeout handling
    const htmlResponse = await fetch(charge.receipt_url, {
      signal: AbortSignal.timeout(45000), // 45 seconds total timeout
    });

    if (!htmlResponse.ok) {
      return NextResponse.json(
        { error: `Failed to fetch receipt: ${htmlResponse.status}` },
        { status: 502 }
      );
    }

    const body = await htmlResponse.text();

    return NextResponse.json({
      success: true,
      body,
      receipt_url: charge.receipt_url,
      receipt_number: charge.receipt_number,
    });
  } catch (error: any) {
    console.error("Stripe receipt fetch error:", error);

    // Specific handling for timeout errors
    if (error.cause?.code === "UND_ERR_CONNECT_TIMEOUT") {
      return NextResponse.json(
        { error: "Connection timeout while fetching Stripe receipt" },
        { status: 504 }
      );
    }

    if (error.name === "AbortError" || error.message?.includes("timeout")) {
      return NextResponse.json(
        { error: "Request timeout while fetching receipt" },
        { status: 504 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
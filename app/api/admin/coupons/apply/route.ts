import { createSupabaseServerClient } from "@/lib/server";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
  try {
    const { code, amount, type } = await req.json();


    const supabase = await createSupabaseServerClient();

    if (!code || !amount || !type) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Get coupon
    const { data: coupon, error } = await supabase
      .from("coupons")
      .select("*")
      .eq("code", code.toLowerCase())
      .single();

    if (error || !coupon) {
      return NextResponse.json({ error: "Invalid coupon "+ error }, { status: 404 });
    }

    const now = new Date();

    // Checks
    if (!coupon.is_active) {
      return NextResponse.json({ error: "Coupon inactive" }, { status: 400 });
    }

    if (coupon.valid_until && new Date(coupon.valid_until) < now) {
      return NextResponse.json({ error: "Coupon expired" }, { status: 400 });
    }

    if (coupon.valid_from && new Date(coupon.valid_from) > now) {
      return NextResponse.json({ error: "Coupon not started yet" }, { status: 400 });
    }

    if (coupon.max_uses && coupon.used_count >= coupon.max_uses) {
      return NextResponse.json(
        { error: "Coupon usage limit reached" },
        { status: 400 }
      );
    }

    if (
      coupon.applies_to !== "both" &&
      coupon.applies_to !== type
    ) {
      return NextResponse.json(
        { error: "Coupon not valid for this service" },
        { status: 400 }
      );
    }

    // Calculate discount
    let discount = 0;

    if (coupon.discount_type === "percentage") {
      discount = (amount * coupon.discount_value) / 100;
    } else {
      discount = coupon.discount_value;
    }

    const finalAmount = Math.max(amount - discount, 0);

    return NextResponse.json({
      success: true,
      data: {
        couponId: coupon.id,
        code: coupon.code,
        discount,
        finalAmount,
      },
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Server error" },
      { status: 500 }
    );
  }
}
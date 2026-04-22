import { createSupabaseServerClient } from "@/lib/server";
import { NextRequest, NextResponse } from "next/server";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function POST(request: NextRequest) {
    try {

        const supabase = await createSupabaseServerClient()
        const { amount, id, code } = await request.json();


        let finalAmount = amount;

        if (code) {
            const { data: coupon, error } = await supabase
                .from("coupons")
                .select("*")
                .eq("code", code.toLowerCase())
                .single();

            if (error || !coupon) {
                return NextResponse.json({ error: "Invalid coupon" }, { status: 404 });
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

            let discount = 0;

            if (coupon.discount_type === "percentage") {
                discount = (amount * coupon.discount_value) / 100;
            } else {
                discount = coupon.discount_value;
            }

            finalAmount = Math.max(amount - discount, 0);

            await supabase
                .from("coupons")
                .update({ used_count: coupon.used_count + 1 })
                .eq("code", code.toLowerCase())
                .single();

            if (finalAmount === 0) {

                return NextResponse.json({
                    free: true,
                    message: "Order completed with 100% discount"
                });
            }

        }

        const paymentIntent = await stripe.paymentIntents.create({
            amount: Number(finalAmount),
            currency: "usd",
            metadata: {
                id
            }
        });

        return NextResponse.json({ clientSecret: paymentIntent.client_secret })

    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Internal Server Error:' + error, status: 500 })
    }
}
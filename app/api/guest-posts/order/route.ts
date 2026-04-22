import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/server";


export async function POST(req: Request) {
    try {
        const supabase = await createSupabaseServerClient()
        const body = await req.json();

        const { user_id, websites, total } = body;

        if (!user_id || !websites || websites.length === 0) {
            return NextResponse.json(
                { message: "Invalid data" },
                { status: 400 }
            );
        }

        const { data, error } = await supabase
            .from("guest_post_orders")
            .insert([
                {
                    user_id,
                    websites,
                    paid: false,
                    total,
                    status: "pending",
                },
            ])
            .select()
            .single();

        if (error) {
            console.error(error);
            return NextResponse.json(
                { message: "DB error" },
                { status: 500 }
            );
        }

        return NextResponse.json(
            { message: "Order created", data },
            { status: 201 }
        );
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { message: "Server error" },
            { status: 500 }
        );
    }
}


export const PATCH = async (req: Request) => {

    const supabase = await createSupabaseServerClient();
    try {
        const { orderId, paid, stripe_payment_intent, coupon } =  await req.json()


        if (!orderId || !paid) {
            return NextResponse.json(
                { success: false, message: "Missing guest post id or paid" },
                { status: 400 }
            );
        }

        if (coupon) {
            const { data: existingCoupon, error } = await supabase
                .from("coupons")
                .select("*")
                .eq("code", coupon.toLowerCase())
                .single();

                if (error || !existingCoupon) {
                    return NextResponse.json({ success: false, message: "Invalid coupon "+ error }, { status: 404 });
                }
        }
        
        const { data, error } = await supabase
            .from("guest_post_orders")
            .update({ paid, stripe_payment_intent, status: 'pending', coupon: coupon || null })
            .eq("id", orderId)
            .select("*")
            .single();

        if (error) {
            return NextResponse.json(
                { success: false, message: "Failed to update guest post paid", error: error.message },
                { status: 500 }
            );
        }

        return NextResponse.json({ success: true, data });
    } catch (error: any) {
        return NextResponse.json(
            { success: false, message: "An error occurred while updating the guest post paid", error: error.message },
            { status: 500 }
        );
    }
};
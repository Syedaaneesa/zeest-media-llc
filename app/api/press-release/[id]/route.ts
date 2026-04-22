import { createSupabaseServerClient } from "@/lib/server";
import { NextResponse } from "next/server";


export const GET = async (request: Request,
    context: { params: Promise<{ id: string }> }) => {

    const supabase = await createSupabaseServerClient();

    try {
        const { id } = await context.params;

        if (!id) {
            return NextResponse.json(
                { success: false, message: "Missing press release id" },
                { status: 400 }
            );
        }
        const { data, error } = await supabase
            .from("press_release")
            .select("*")
            .eq("id", id)
            .single();

        if (error) {
            return NextResponse.json(
                { success: false, message: "Failed to fetch press release", error: error.message },
                { status: 500 }
            );
        }

        return NextResponse.json({ success: true, data });
    } catch (error: any) {
        return NextResponse.json(
            { success: false, message: "An error occurred while fetching the press release", error: error.message },
            { status: 500 }
        );
    }
};



export const PATCH = async (request: Request, context: { params: Promise<{ id: string }> }) => {

    const supabase = await createSupabaseServerClient();
    try {
        const { id } = await context.params;
        const { paid, stripe_payment_intent, status, coupon } = await request.json();

        if (!id || !paid) {
            return NextResponse.json(
                { success: false, message: "Missing press release id or paid" },
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
                return NextResponse.json({ success: false, message: "Invalid coupon " + error }, { status: 404 });
            }
        }


        const { data, error } = await supabase
            .from("press_release")
            .update({ paid, stripe_payment_intent, status, coupon: coupon || null })
            .eq("id", id)
            .select("*")
            .single();

        if (error) {
            return NextResponse.json(
                { success: false, message: "Failed to update press release paid", error: error.message },
                { status: 500 }
            );
        }

        return NextResponse.json({ success: true, data });
    } catch (error: any) {
        return NextResponse.json(
            { success: false, message: "An error occurred while updating the press release paid", error: error.message },
            { status: 500 }
        );
    }
};
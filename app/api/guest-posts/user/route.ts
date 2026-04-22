import { createSupabaseServerClient } from "@/lib/server";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {

    const supabase = await createSupabaseServerClient();
    try {
        const { searchParams } = new URL(req.url);
        const user_id = searchParams.get("user_id");
        const { data, error } = await supabase
            .from("guest_post_orders")
            .select("*")
            .eq("user_id", user_id)
            .order("created_at", { ascending: false });

        if (error) {
            return NextResponse.json(
                { success: false, message: error.message },
                { status: 400 }
            );
        }

        return NextResponse.json({ data }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { success: false, message: "An unknown error occurred" },
            { status: 500 }
        );
    }
};

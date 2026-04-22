import { createSupabaseServerClient } from "@/lib/server";
import { NextResponse } from "next/server";

export const PATCH = async (request: Request, context: { params: Promise<{ id: string }> }) => {

    const supabase = await createSupabaseServerClient();
    try {
        const { id } = await context.params;
        const { status } = await request.json();

        const { data, error } = await supabase
            .from("press_release")
            .update({ status })
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
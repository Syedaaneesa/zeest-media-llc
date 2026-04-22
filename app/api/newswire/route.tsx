import { createSupabaseServerClient } from "@/lib/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const supabase = await createSupabaseServerClient();
    
    const page = Number(searchParams.get("page") || 1);
    const limit = Number(searchParams.get("limit") || 10);

    const from = (page - 1) * limit;
    const to = from + limit - 1;

    // Query Supabase
    const { data, error, count } = await supabase
      .from("press_release") 
      .select("*", { count: "exact" })
      .eq("status", "published")
      .range(from, to)
      .order("created_at", { ascending: false });

    if (error) {
      throw error;
    }

    const totalPages = Math.ceil((count || 0) / limit);

    return new NextResponse(JSON.stringify(data), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "X-Total-Pages": totalPages.toString(),
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}
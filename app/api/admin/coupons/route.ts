import { getAdminClient } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const supabase = await getAdminClient();

    const { data, error } = await supabase.from("coupons")
    .select("*")
    .order("created_at", { ascending: false});

    if (error) throw error;

    return NextResponse.json({ success: true, data });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to create coupon" },
      { status: 403 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const supabase = await getAdminClient();
    const body = await req.json();

    const {
      code,
      discount_type,
      discount_value,
      max_uses,
      valid_until,
      applies_to,
    } = body;

    const { data, error } = await supabase.from("coupons").insert([
      {
        code: code.toLowerCase(),
        discount_type,
        discount_value,
        max_uses,
        valid_until,
        applies_to,
      },
    ]);

    if (error) throw error;

    return NextResponse.json({ success: true, data },
      { status: 201 });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to create coupon" },
      { status: 403 }
    );
  }
}
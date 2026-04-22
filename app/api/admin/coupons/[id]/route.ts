import { NextResponse } from "next/server";
import { getAdminClient } from "@/lib/auth";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = await getAdminClient();
    const body = await req.json();
    const param = await params

    const { data, error } = await supabase
      .from("coupons")
      .update({
        ...body,
        code: body.code?.toLowerCase(),
      })
      .eq("id", param.id);

    if (error) throw error;

    return NextResponse.json({ success: true, data },
      { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to update coupon" },
      { status: 403 }
    );
  }
}




export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {

    const param = await params


    const supabase = await getAdminClient();

    const { error } = await supabase
      .from("coupons")
      .delete()
      .eq("id", param.id);

    if (error) throw error;

    return NextResponse.json({ success: true },
      { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to delete coupon" },
      { status: 403 }
    );
  }
}
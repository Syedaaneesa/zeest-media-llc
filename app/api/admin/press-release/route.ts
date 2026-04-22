import { createSupabaseServerClient } from "@/lib/server";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  try {
   
    const supabase = await createSupabaseServerClient();

    const { data: pressReleases, error } = await supabase
      .from('press_release')
      .select('*')
      .order('created_at', { ascending: false }); 

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ error: 'Failed to fetch press releases' }, { status: 500 });
    }

    return NextResponse.json({ data: pressReleases }, { status: 200 });

  } catch (error) {
    console.error('Error fetching press releases:', error);
    return NextResponse.json({ error: 'Failed to fetch press releases' }, { status: 500 });
  }
};



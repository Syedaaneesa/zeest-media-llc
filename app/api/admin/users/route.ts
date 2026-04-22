import { createSupabaseServerClient } from "@/lib/server";
import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  try {
   
    const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_SUPABASE_SERVICE_ROLE_KEY! 
  )

    const { data: users, error } = await supabase.auth.admin.listUsers();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
    }

    return NextResponse.json({ data: users }, { status: 200 });

  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
};



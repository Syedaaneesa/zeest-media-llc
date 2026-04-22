import { createSupabaseServerClient } from "@/lib/server";

export async function getAdminClient() {

  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || user.app_metadata.role !== "super-admin") {
    throw new Error("Unauthorized");
  }

  return supabase;
}
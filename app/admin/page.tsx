import { Suspense } from "react";
import AdminDashboard from "@/components/admin/AdminPage";
import { createSupabaseServerClient } from "@/lib/server";
import { redirect } from "next/navigation";

export default async function Page() {

  const supabase = await createSupabaseServerClient();

  const {data: { user }} = await supabase.auth.getUser()

  if (user?.app_metadata.role !== "super-admin") {
    redirect('/dashboard')
  }

  return (
    <Suspense fallback={<div className="w-full min-h-screen flex items-center justify-center">
      <div className="w-16 h-16 rounded-full border-4 border-[#D34586]/20 border-t-[#D34586] mb-4 animate-spin flex items-center justify-center" /></div>}>
      <AdminDashboard/>
    </Suspense>
  );
}
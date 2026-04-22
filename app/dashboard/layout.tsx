import { SidebarProvider } from "@/components/ui/sidebar";
import { GuestPostProvider } from "@/context/GuestPosts";
import { createSupabaseServerClient } from "@/lib/server";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  return (
    <GuestPostProvider>
    <SidebarProvider>
      {children}
    </SidebarProvider>
    </GuestPostProvider>
  )
}
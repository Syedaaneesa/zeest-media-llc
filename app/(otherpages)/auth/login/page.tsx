import { createSupabaseServerClient } from "@/lib/server";
import LoginClient from "./LoginClient";
import { redirect } from "next/navigation";
export default async function LoginPage() {
const supabase = await createSupabaseServerClient()

const { data: {user} } = await supabase.auth.getUser();
 
if(user) {
  redirect("/dashboard");
}
  return (
    <div className="w-full max-w-7xl mx-auto flex min-h-screen mt-20 items-center justify-center bg-background">
      <LoginClient />
    </div>
  );
}



/*

          
*/
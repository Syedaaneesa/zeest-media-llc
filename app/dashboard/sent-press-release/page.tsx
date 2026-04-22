import { createSupabaseServerClient } from "@/lib/server";
import StripeWrapper from "./StripeWraper";

const page = async () => {

  const supabase = await createSupabaseServerClient();

  const { data: { user } } = await supabase.auth.getUser();

  return (
    <StripeWrapper user={user} />
  )
}

export default page
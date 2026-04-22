import { createBrowserClient } from "@supabase/ssr";

let client: ReturnType<typeof createBrowserClient> | null = null;

export const getSupabaseBrowserClient = () => {
    const supabaseURL = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!client) {
        client = createBrowserClient(
            supabaseURL!,
            supabaseAnonKey!
        );
    }
    return client;
};
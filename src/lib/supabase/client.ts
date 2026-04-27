// Supabase browser client — placeholder until env vars are configured
// Replace NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local

let supabase: unknown = null;

export function getSupabaseClient() {
  if (supabase) return supabase;
  // TODO: initialise once @supabase/supabase-js is installed:
  // import { createBrowserClient } from "@supabase/ssr";
  // supabase = createBrowserClient(
  //   process.env.NEXT_PUBLIC_SUPABASE_URL!,
  //   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  // );
  return supabase;
}

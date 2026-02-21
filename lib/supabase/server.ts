import { createClient as createSupabaseClient } from "@supabase/supabase-js";

/**
 * Creates a Supabase client for server-side operations.
 * Prefers the server-side Service Role key when available (safe on server).
 */
export async function createServerClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  // Prefer service role key for server operations (do NOT expose this to clients)
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  const keyToUse = serviceRoleKey ?? anonKey;

  if (!supabaseUrl || !keyToUse) {
    throw new Error(
      "Missing Supabase environment variables. Please check your .env.local file."
    );
  }

  return createSupabaseClient(supabaseUrl, keyToUse);
}

/**
 * Alias for createServerClient for backward compatibility
 */
export const createClient = createServerClient;

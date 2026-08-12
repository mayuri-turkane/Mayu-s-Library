import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// The client is created only when public environment variables are configured.
// Never put a Supabase service-role key in a NEXT_PUBLIC_ variable.
export const supabase = url && key ? createClient(url, key) : null;

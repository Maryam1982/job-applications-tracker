"use client";

import { createSupabaseBrowserClient } from "@/lib/supabase/browserClient";

export async function getUserClient() {
  const supabase = createSupabaseBrowserClient();
  const { data } = await supabase.auth.getUser();
  return data.user;
}

"use server";

import { createClient } from "../supabase/serverClient";

export async function getUserServer() {
  const supabase = await createClient();

  const { data } = await supabase.auth.getUser();
  return data.user;
}

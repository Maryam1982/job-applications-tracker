export const dynamic = "force-dynamic";
export const revalidate = 0;

import { createClient } from "@/lib/supabase/serverClient";

export async function GET() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();

  return Response.json({ user: data.user ?? null });
}

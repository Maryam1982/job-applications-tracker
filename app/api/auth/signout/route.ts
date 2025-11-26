import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/serverClient";

export async function POST() {
  try {
    const supabase = await createClient();
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Supabase sign-out error:", error.message);
      return NextResponse.json(
        { ok: false, error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Unexpected sign-out error:", err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}

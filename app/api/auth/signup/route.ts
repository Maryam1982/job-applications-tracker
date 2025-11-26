import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/serverClient";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body.email || !body.password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    const { data, error } = await supabase.auth.signUp({
      email: body.email,
      password: body.password,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ user: data.user ?? null }, { status: 201 });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Unexpected error during signup";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}

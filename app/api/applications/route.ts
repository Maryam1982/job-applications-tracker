import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { NextRequest } from "next/server";
import { ApplicationRow } from "@/app/types";
import { getUserId } from "@/lib/auth/getUserId";

// ---------------------------------------------
// GET: fetch all applications for the logged-in user
// ---------------------------------------------
export async function GET() {
  const user_id = await getUserId();

  if (!user_id) {
    return Response.json({ error: "User not authenticated" }, { status: 401 });
  }

  const { data, error } = await supabaseAdmin
    .from("job_applications")
    .select("*")
    .eq("user_id", user_id) // filter by owner
    .order("id", { ascending: false });

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  return Response.json(data as ApplicationRow[], { status: 200 });
}

// ---------------------------------------------
// POST: add a new application (belongs to the logged-in user)
// ---------------------------------------------
export async function POST(request: NextRequest) {
  const user_id = await getUserId();

  if (!user_id) {
    return Response.json({ error: "User not authenticated" }, { status: 401 });
  }

  const body = await request.json();

  const company_name = body.company_name ?? body.company;
  const job_title = body.job_title ?? body.position;
  const status = body.status;
  const application_date = body.application_date ?? body.applied_on;
  const notes = body.notes ?? null;

  if (!company_name || !job_title || !status || !application_date) {
    return Response.json(
      { error: "Required fields are missing" },
      { status: 400 }
    );
  }

  const payload = {
    company_name,
    job_title,
    status,
    application_date,
    notes,
    user_id, // attach owner
  };

  const { data, error } = await supabaseAdmin
    .from("job_applications")
    .insert([payload])
    .select()
    .single();

  if (error) {
    return Response.json({ error: error.message }, { status: 400 });
  }

  return Response.json(data as ApplicationRow, { status: 201 });
}

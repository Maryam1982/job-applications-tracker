import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { NextRequest } from "next/server";
import { ApplicationRow } from "@/app/types";

//GET: fetch all applications
export async function GET() {
  const { data, error } = await supabaseAdmin
    .from("job_applications")
    .select("*")
    .order("id", { ascending: false });

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  return Response.json(data as ApplicationRow[], { status: 200 });
}

//POST: add a new application
export async function POST(request: NextRequest) {
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

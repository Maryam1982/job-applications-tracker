import { supabaseAdmin } from "@/lib/supabaseAdmin";

//GET: fetch all applications
export async function GET() {
  const { data, error } = await supabaseAdmin
    .from("job_applications")
    .select("*")
    .order("id", { ascending: false });

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  return Response.json(data, { status: 200 });
}

//POST: add a new application
export async function POST(request) {
  const body = await request.json();
  const { company_name, job_title, status, application_date } = body;

  if (!company_name || !job_title || !status || !application_date) {
    return Response.json(
      { error: "Required fields are missing" },
      { status: 400 }
    );
  }

  const { data, error } = await supabaseAdmin
    .from("job_applications")
    .insert([{ company_name, job_title, status, application_date }])
    .select();

  if (error) {
    return Response.json({ error: error.message }, { status: 400 });
  }

  return Response.json(data?.[0] ?? { message: "Application added" }, {
    status: 201,
  });
}

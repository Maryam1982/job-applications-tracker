import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { NextRequest } from "next/server";
import { getUserId } from "@/lib/auth/getUserId";

// PATCH: edit an application
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const updates = await request.json();

  const userId = await getUserId();
  if (!userId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!updates || Object.keys(updates).length === 0) {
    return Response.json({ error: "No data provided" }, { status: 400 });
  }

  const payload = {
    company_name: updates.company ?? updates.company_name,
    job_title: updates.position ?? updates.job_title,
    status: updates.status,
    application_date: updates.applied_on ?? updates.application_date,
    notes: updates.notes ?? null,
    contract_type: updates.contract_type ?? null,
    location: updates.location ?? null,
  };

  try {
    const { data, error } = await supabaseAdmin
      .from("job_applications")
      .update(payload)
      .eq("id", id)
      .eq("user_id", userId) //  IMPORTANT: auth-bound update
      .select()
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        return Response.json(
          { message: "Application not found" },
          { status: 404 }
        );
      }
      return Response.json({ error: error.message }, { status: 500 });
    }

    if (!data) {
      return Response.json(
        { message: "Application not found or unauthorized" },
        { status: 404 }
      );
    }

    return Response.json(
      { message: "Application updated successfully", application: data },
      { status: 200 }
    );
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Update attempt was not successful.";
    return Response.json({ error: message }, { status: 500 });
  }
}

// DELETE: delete an application
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const userId = await getUserId();

  if (!userId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!id) {
    return Response.json({ error: "ID is required" }, { status: 400 });
  }

  try {
    const { data, error } = await supabaseAdmin
      .from("job_applications")
      .delete()
      .eq("id", id)
      .eq("user_id", userId) //  IMPORTANT: only delete user's own items
      .select()
      .single();

    if (error) {
      return Response.json({ error: error.message }, { status: 400 });
    }

    if (!data) {
      return Response.json(
        { message: "Application not found or unauthorized." },
        { status: 404 }
      );
    }

    return Response.json(
      { message: "Application deleted successfully.", deleted: data },
      { status: 200 }
    );
  } catch (err) {
    console.error("DELETE handler unexpected error:", err);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { NextRequest } from "next/server";

// PATCH: edit an application
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const updates = await request.json();
  const { id } = await params;

  if (!updates || Object.keys(updates).length === 0) {
    return Response.json({ error: "No data provided" }, { status: 400 });
  }

  // Build payload safely, only including defined values
  const payload = {
    company_name: updates.company ?? updates.company_name,
    job_title: updates.position ?? updates.job_title,
    status: updates.status,
    application_date: updates.applied_on ?? updates.application_date,
    notes: updates.notes ?? null,
  };

  try {
    const { data, error } = await supabaseAdmin
      .from("job_applications")
      .update(payload)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      // Handle "no rows" case explicitly
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
        { message: "Application not found" },
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

//DELETE: delete an application
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;

    // Check that an ID was provided
    if (!id) {
      return Response.json({ error: "ID is required" }, { status: 400 });
    }

    // Perform the delete
    const { data, error } = await supabaseAdmin
      .from("job_applications")
      .delete()
      .eq("id", id)
      .select(); // select() returns the deleted row(s)

    if (error) {
      return Response.json({ error: error.message }, { status: 400 });
    }

    if (!data || data.length === 0) {
      // No row found with that ID
      return Response.json(
        { message: "No application found with the given ID." },
        { status: 404 }
      );
    }

    // Successfully deleted
    return Response.json(
      { message: "Application deleted successfully.", deleted: data[0] },
      { status: 200 }
    );
  } catch (err) {
    console.error("DELETE handler unexpected error:", err);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

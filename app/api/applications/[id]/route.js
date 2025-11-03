import { supabaseAdmin } from "@/lib/supabaseAdmin";

//PATCH: edit an application
export async function PATCH(request, { params }) {
  const updates = await request.json();
  const { id } = await params;

  if (!updates || Object.keys(updates).length === 0) {
    return Response.json({ error: "No data provided" }, { status: 400 });
  }

  try {
    const { data, error } = await supabaseAdmin
      .from("job_applications")
      .update(updates)
      .eq("id", id)
      .select();

    if (error) {
      return Response.json({ error: error.message }, { status: 400 });
    }

    return Response.json(
      data.length === 0 ? { message: "Application was updated" } : data[0],
      { status: 200 }
    );
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}

//DELETE: delete an application
export async function DELETE(req, { params }) {
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
      console.error("Supabase DELETE error:", error);
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

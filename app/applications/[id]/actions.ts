"use server";

import { createClient } from "@/lib/supabase/serverClient";
import { redirect } from "next/navigation";

export async function deleteApplicationAction(id: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("job_applications")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Error deleting application:", error);
    throw new Error("Failed to delete application");
  }

  redirect("/applications");
}

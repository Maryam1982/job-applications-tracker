import { getApplication } from "@/lib/api";
import EditClient from "./EditClient";
import { Application } from "@/app/types";

export default async function EditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let application: Application | null = null;

  try {
    application = await getApplication(id);
  } catch (error) {
    console.error("Error fetching application:", error);
    return <div>Error loading application.</div>;
  }

  return <EditClient id={id} initialData={application} />;
}

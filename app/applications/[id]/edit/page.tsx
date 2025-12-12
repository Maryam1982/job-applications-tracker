import EditClient from "../../../components/EditClient";
import { Application } from "@/app/types";
import { getServerAdapter } from "@/lib/adapters";

export default async function EditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // Determine source (for routing + client logic)
  const { getUserServer } = await import("@/lib/auth/getUserServer");
  const user = await getUserServer();
  const source: "db" | "guest" = user ? "db" : "guest";

  let application: Application | null | undefined = null;

  try {
    // If user is guest → this will THROW (correct behavior)
    // If user is authenticated → server adapter loads from DB
    const adapter = await getServerAdapter();
    application = await adapter.getById(id);
  } catch (error) {
    console.error("Error fetching application:", error);
    // For guests we expect null — EditClient will load from localStorage
  }

  return <EditClient id={id} initialData={application} source={source} />;
}

"use client";

import { useRouter } from "next/navigation";
import JobForm from "@/app/components/JobForm";
import { getClientAdapter } from "@/lib/adapters"; // runtime factory (client-safe)
import { useBuildRoute } from "@/lib/routes/useBuildRoute";
import type { ApplicationCreate } from "@/app/types";

export default function AddPageWrapper() {
  const router = useRouter();
  const { buildRoute } = useBuildRoute();

  async function handleAdd(data: ApplicationCreate) {
    try {
      const adapter = await getClientAdapter(); // selects localStorage or db client adapter
      await adapter.create(data);

      // Redirect to appropriate home ("/" or "/guest")
      router.push(buildRoute("/"));
    } catch (err) {
      console.error("Create application failed:", err);
      alert("Error adding application");
    }
  }

  return <JobForm<ApplicationCreate> onSubmit={handleAdd} />;
}

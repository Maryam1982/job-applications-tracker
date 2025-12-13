"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import JobForm from "@/app/components/JobForm";
import { ApplicationUpdate } from "@/app/types";
import { getClientAdapter } from "@/lib/adapters";
import { useBuildRoute } from "@/app/hooks/useBuildRoute";

interface EditClientProps {
  id: string;
  initialData: ApplicationUpdate | null | undefined;
  source?: "db" | "guest"; // optional
}

export default function EditClient({
  id,
  initialData,
  source,
}: EditClientProps) {
  const router = useRouter();
  const { buildRoute } = useBuildRoute();

  const searchParams = useSearchParams();
  const returnTo = searchParams.get("from") ?? "/applications";

  const [data, setData] = useState<ApplicationUpdate | null | undefined>(
    initialData
  );
  const [loading, setLoading] = useState(!initialData); // if no initialData, begin loading

  // ------------------------------
  // Fetch guest data on client if needed
  // ------------------------------
  useEffect(() => {
    if (initialData) return; // DB user → already have data

    // Only attempt a client fetch for guest users
    if (source === "guest") {
      (async () => {
        try {
          const adapter = await getClientAdapter(); // localStorage adapter for guests
          const app = await adapter.getById(id);
          setData(app);
        } catch (err) {
          console.error("Error loading guest application:", err);
          setData(null);
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [id, source, initialData]);

  // ------------------------------
  // Save handler
  // ------------------------------
  async function handleEdit(updated: ApplicationUpdate) {
    try {
      const adapter = await getClientAdapter();
      await adapter.update(id, updated);
      router.push(buildRoute(returnTo));
    } catch (error) {
      console.error("Update failed:", error);
      alert("Error updating application");
    }
  }

  // ------------------------------
  // UI states
  // ------------------------------
  if (loading) {
    return <div>Loading…</div>;
  }

  if (!data) {
    return <div>Application not found.</div>;
  }

  // ------------------------------
  // Render form
  // ------------------------------
  return (
    <JobForm<ApplicationUpdate> onSubmit={handleEdit} initialData={data} />
  );
}

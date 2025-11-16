"use client";

import { useRouter } from "next/navigation";
import JobForm from "@/app/components/JobForm";
import { updateApplication } from "@/lib/apiClient";
import { ApplicationUpdate } from "@/app/types";

interface EditClientProps {
  id: string;
  initialData: ApplicationUpdate;
}

export default function EditClient({ id, initialData }: EditClientProps) {
  const router = useRouter();

  const handleEdit = async (data: ApplicationUpdate) => {
    try {
      await updateApplication(id, data);
      router.push("/");
    } catch (error) {
      console.error(error);
      alert("Error updating application");
    }
  };

  return (
    <JobForm<ApplicationUpdate>
      onSubmit={handleEdit}
      initialData={initialData}
    />
  );
}

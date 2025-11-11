"use client";

import JobForm from "@/app/components/JobForm";
import { useRouter } from "next/navigation";
import { createApplication } from "@/lib/apiClient";
import { ApplicationCreate } from "../types";

export default function AddPage() {
  const router = useRouter();
  const handleAdd = async (data: ApplicationCreate) => {
    try {
      await createApplication(data);
      router.push("/");
    } catch (error) {
      console.error(error);
      alert("Error adding application");
    }
  };
  return (
    <>
      <JobForm onSubmit={handleAdd} />
    </>
  );
}

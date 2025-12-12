import EditClient from "@/app/components/EditClient";

export default async function GuestEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // Guest mode: no server fetching, everything happens in the client
  return <EditClient id={id} initialData={null} source="guest" />;
}

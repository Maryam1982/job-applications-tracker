export async function getUserId(): Promise<string | null> {
  try {
    const isServer = typeof window === "undefined";

    if (isServer) {
      // Dynamically load server-only code so it never enters client bundle
      const { getUserServer } = await import("./getUserServer");
      const user = await getUserServer();
      return user?.id ?? null;
    } else {
      // Dynamically load client-only code
      const { getUserClient } = await import("./getUserClient");
      const user = await getUserClient();
      return user?.id ?? null;
    }
  } catch (err) {
    console.error("Unexpected getUserId error:", err);
    return null;
  }
}

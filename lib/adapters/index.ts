// We do NOT place any static imports here for server-only or client-only code.
// Everything is dynamically imported so Next.js does tree-shaking correctly
// and never sends server code to the client bundle.

/**
 * Returns the correct adapter for CLIENT components/pages.
 *
 * - Uses getUserClient()
 * - Loads either:
 *    - db/clientAdapter  (for authenticated DB users)
 *    - guest/localStorageAdapter (for guests)
 */
export async function getClientAdapter() {
  // Import client-side auth dynamically
  const { getUserClient } = await import("@/lib/auth/getUserClient");
  const user = await getUserClient();

  if (user) {
    // Authenticated → DB client adapter (safe for client)
    const { clientAdapter } = await import("./db/clientAdapter");
    return clientAdapter;
  } else {
    // Guest mode → localStorage adapter (client only)
    const { localStorageAdapter } = await import("./guest/localStorageAdapter");
    return localStorageAdapter;
  }
}

/**
 * Returns the correct adapter for SERVER components/pages.
 *
 * - Uses getUserServer()
 * - Loads either:
 *    - db/serverAdapter (for authenticated DB users)
 *    - guest/localStorageAdapter (for guests — if used, must be client-only)
 */
export async function getServerAdapter() {
  const { getUserServer } = await import("@/lib/auth/getUserServer");
  const user = await getUserServer();

  if (user) {
    const { dbServerAdapter } = await import("./db/serverAdapter");
    return dbServerAdapter;
  }

  /**
   * 🚫 This branch should NEVER run in production.
   * Guest mode is client-only.
   * If this executes, it's a misuse of getServerAdapter().
   */
  console.warn(
    "⚠ getServerAdapter() called for guest user. This should not happen."
  );
  throw new Error(
    "Guest mode cannot run on server. Use getClientAdapter() instead."
  );
}

"use client";

import { usePathname } from "next/navigation";

export function useBuildRoute() {
  const pathname = usePathname();

  const isGuest = pathname.startsWith("/guest");

  function buildRoute(target: string) {
    if (isGuest) {
      // Ensure no double slashes, clean result
      return `/guest${target.startsWith("/") ? target : "/" + target}`;
    }
    return target;
  }

  return { buildRoute, isGuest };
}

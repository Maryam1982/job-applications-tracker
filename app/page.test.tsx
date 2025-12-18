import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import type { User } from "@supabase/supabase-js";

const mockUser = {
  id: "123",
  email: "test@test.com",
  app_metadata: {},
  user_metadata: {},
  aud: "authenticated",
  created_at: new Date().toISOString(),
} satisfies User;

import LandingPage from "./page";
import { getUserServer } from "@/lib/auth/getUserServer";

vi.mock("@/lib/auth/getUserServer", () => ({
  getUserServer: vi.fn(),
}));

describe("LandingPage", () => {
  it("shows guest option when user is not logged in", async () => {
    vi.mocked(getUserServer).mockResolvedValue(null);
    render(await LandingPage());

    expect(screen.getByText(/continue as guest/i)).toBeInTheDocument();
  });

  it("does not show guest option when user is logged in", async () => {
    vi.mocked(getUserServer).mockResolvedValue(mockUser);

    render(await LandingPage());

    expect(screen.queryByText(/continue as guest/i)).not.toBeInTheDocument();
  });
});

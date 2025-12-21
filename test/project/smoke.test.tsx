import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import LandingPage from "@/app/page";

vi.mock("@/lib/auth/getUserServer", () => ({
  getUserServer: vi.fn().mockResolvedValue(null),
}));

test("app renders without crashing", async () => {
  render(await LandingPage());
  expect(screen.getByRole("main")).toBeInTheDocument();
});

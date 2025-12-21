import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import JobItem from "./JobItem";
import { Application } from "../types";

//Mocks
const pushMock = vi.fn();
const refreshMock = vi.fn();
const deleteMock = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: pushMock,
    refresh: refreshMock,
  }),
}));

vi.mock("@/lib/adapters", () => ({
  getClientAdapter: async () => ({
    delete: deleteMock,
  }),
}));

vi.mock("@/app/hooks/useBuildRoute", () => ({
  useBuildRoute: () => ({
    buildRoute: (path: string) => path,
  }),
}));

// ---- test data ----
const mockApplication = {
  id: "app-1",
  company: "Acme Corp",
  position: "Frontend Engineer",
  status: "Applied",
  applied_on: "2024-01-10",
  created_at: "2024-01-10",
  updated_at: "2024-01-10",
} satisfies Application;

describe("JobItem", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders application information", () => {
    render(<JobItem application={mockApplication} source="db" />);

    expect(screen.getByText("Acme Corp")).toBeInTheDocument();
    expect(screen.getByText("Frontend Engineer")).toBeInTheDocument();
    expect(screen.getByText("Applied")).toBeInTheDocument();
  });

  it("navigates to application details when clicked", () => {
    render(<JobItem application={mockApplication} source="db" />);

    fireEvent.click(screen.getByRole("button", { name: /acme corp/i }));

    expect(pushMock).toHaveBeenCalledWith(
      `/applications/${mockApplication.id}`
    );
  });

  it("calls delete and onDeleted when confirmed", async () => {
    const onDeleted = vi.fn();
    vi.spyOn(window, "confirm").mockReturnValue(true);

    render(
      <JobItem
        application={mockApplication}
        source="db"
        onDeleted={onDeleted}
      />
    );

    fireEvent.click(screen.getByText("Delete"));

    await waitFor(() => {
      expect(deleteMock).toHaveBeenCalledWith(mockApplication.id);
      expect(onDeleted).toHaveBeenCalledWith(mockApplication.id);
    });
  });

  it("does not delete when confirmation is cancelled", () => {
    vi.spyOn(window, "confirm").mockReturnValue(false);

    render(<JobItem application={mockApplication} source="db" />);

    fireEvent.click(screen.getByText("Delete"));

    expect(deleteMock).not.toHaveBeenCalled();
  });

  it("navigates when Enter key is pressed on the article", () => {
    render(<JobItem application={mockApplication} source="db" />);

    fireEvent.keyDown(screen.getByRole("button", { name: /acme corp/i }), {
      key: "Enter",
    });
    expect(pushMock).toHaveBeenCalledWith(
      `/applications/${mockApplication.id}`
    );
  });

  it("disables delete button while deleting", async () => {
    vi.spyOn(window, "confirm").mockReturnValue(true);
    deleteMock.mockImplementation(
      () => new Promise((resolve) => setTimeout(resolve, 50))
    );

    render(<JobItem application={mockApplication} source="db" />);

    fireEvent.click(screen.getByText("Delete"));

    expect(screen.getByText("Deleting…")).toBeDisabled();
  });
});

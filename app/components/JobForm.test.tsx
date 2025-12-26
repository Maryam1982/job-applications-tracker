import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import JobForm from "./JobForm";

const pushMock = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: pushMock,
  }),
  useSearchParams: () => ({
    get: () => null,
  }),
}));

vi.mock("@/app/hooks/useBuildRoute", () => ({
  useBuildRoute: () => ({
    buildRoute: (path: string) => path,
  }),
}));

describe("JobForm", () => {
  beforeEach(() => {
    pushMock.mockClear();
  });
  describe("when creating a new application", () => {
    it("renders add form correctly", () => {
      render(<JobForm onSubmit={vi.fn()} />);

      expect(screen.getByText("Add New Application")).toBeInTheDocument();
      expect(screen.getByLabelText(/Company/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Position/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Applied On/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Status/i)).toBeInTheDocument();
    });

    it("shows validation errors on empty submit", async () => {
      render(<JobForm onSubmit={vi.fn()} />);

      fireEvent.click(screen.getByText("Submit"));

      expect(
        await screen.findByText("Company can't be empty.")
      ).toBeInTheDocument();
      expect(screen.getByText("Position can't be empty.")).toBeInTheDocument();
    });

    it("submits form with correct data", async () => {
      const onSubmit = vi.fn().mockResolvedValue(undefined);

      render(<JobForm onSubmit={onSubmit} />);

      fireEvent.change(screen.getByLabelText(/Company/i), {
        target: { value: "Google" },
      });

      fireEvent.change(screen.getByLabelText(/Position/i), {
        target: { value: "Frontend Developer" },
      });

      fireEvent.change(screen.getByLabelText(/Status/i), {
        target: { value: "Applied" },
      });

      fireEvent.click(screen.getByText("Submit"));

      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledWith(
          expect.objectContaining({
            company: "Google",
            position: "Frontend Developer",
            status: "Applied",
          })
        );
      });

      expect(
        screen.getByText("Application added successfully!")
      ).toBeInTheDocument();
    });
  });
  describe("when editing an existing application", () => {
    it("renders edit mode and submits updated data", async () => {
      const onSubmit = vi.fn().mockResolvedValue(undefined);

      const initialData = {
        id: 1,
        company: "Amazon",
        position: "Engineer",
        status: "Interview",
        applied_on: "2024-01-01",
        notes: "",
        contract_type: "",
        location: "",
      };

      render(<JobForm onSubmit={onSubmit} initialData={initialData} />);

      expect(screen.getByText("Edit Application")).toBeInTheDocument();
      expect(screen.getByDisplayValue("Amazon")).toBeInTheDocument();

      fireEvent.click(screen.getByText("Submit"));

      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledWith(
          expect.objectContaining({
            id: 1,
            company: "Amazon",
          })
        );
      });

      expect(
        screen.getByText("Application updated successfully!")
      ).toBeInTheDocument();
    });
  });

  it("navigates back on cancel", () => {
    render(<JobForm onSubmit={vi.fn()} />);

    fireEvent.click(screen.getByText("Cancel"));

    expect(pushMock).toHaveBeenCalledWith("/applications");
  });
});

import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import JobList from "./JobList";
import { Application } from "../types";
import { createApplication } from "../test-utils/applicationFactory";
/**
 * Mock JobItem
 * - exposes whether onDeleted is wired
 * - allows triggering onDeleted when present
 * - does NOT test JobItem internals
 */
interface JobItemProps {
  application: Application;
  source: "db" | "guest";
  onDeleted?: (id: string) => void;
}

vi.mock("./JobItem", () => ({
  default: (props: JobItemProps) => (
    <div>
      <span>{props.application.position}</span>

      {props.onDeleted && (
        <button onClick={() => props.onDeleted?.(props.application.id)}>
          delete {props.application.id}
        </button>
      )}
    </div>
  ),
}));

const applications = [
  createApplication({
    id: "1",
    position: "Frontend Dev",
  }),
  createApplication({
    id: "2",
    position: "React Engineer",
  }),
];

describe("JobList", () => {
  it("renders empty state when no applications exist", () => {
    render(<JobList applications={[]} source="guest" />);

    expect(screen.getByText(/no applications found/i)).toBeInTheDocument();
  });

  it("renders a JobItem for each application", () => {
    render(<JobList applications={applications} source="guest" />);

    expect(screen.getByText("Frontend Dev")).toBeInTheDocument();
    expect(screen.getByText("React Engineer")).toBeInTheDocument();
  });

  it("provides deletion capability in guest mode", () => {
    render(<JobList applications={applications} source="guest" />);

    expect(
      screen.getByRole("button", { name: /delete 1/i })
    ).toBeInTheDocument();
  });

  it("removes item locally when onDeleted is triggered in guest mode", () => {
    render(<JobList applications={applications} source="guest" />);

    fireEvent.click(screen.getByRole("button", { name: /delete 1/i }));

    expect(screen.queryByText("Frontend Dev")).not.toBeInTheDocument();
    expect(screen.getByText("React Engineer")).toBeInTheDocument();
  });

  it("does not wire deletion capability in db mode", () => {
    render(<JobList applications={applications} source="db" />);

    expect(
      screen.queryByRole("button", { name: /delete/i })
    ).not.toBeInTheDocument();
  });
});

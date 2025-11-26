import { useState } from "react";
import { cn } from "@/lib/utils";
import { ApplicationCreate, ApplicationUpdate } from "../types";
import { STATUS_LIST } from "../constants";
import { useRouter } from "next/navigation";

interface JobFormProps<T> {
  onSubmit: (data: T) => Promise<void>;
  initialData?: T;
}

type ErrorState = {
  company: string;
  position: string;
  status: string;
  appliedOn: string;
};

export default function JobForm<
  T extends ApplicationCreate | ApplicationUpdate
>({ onSubmit, initialData }: JobFormProps<T>) {
  const [company, setCompany] = useState(initialData?.company ?? "");
  const [position, setPosition] = useState(initialData?.position ?? "");
  const [status, setStatus] = useState(initialData?.status ?? "Applied");

  const [appliedOn, setAppliedOn] = useState(() => {
    if (initialData?.applied_on) return initialData.applied_on;
    const today = new Date().toISOString().split("T")[0];
    return today;
  });

  const [notes, setNotes] = useState(initialData?.notes ?? "");
  const [errors, setErrors] = useState<ErrorState>({
    company: "",
    position: "",
    status: "",
    appliedOn: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const router = useRouter();

  function validate() {
    const newErrors: ErrorState = {
      company: company.trim() ? "" : "Company can't be empty.",
      position: position.trim() ? "" : "Position can't be empty.",
      status: status.trim() ? "" : "Status can't be empty.",
      appliedOn: appliedOn.trim() ? "" : "Application date can't be empty.",
    };

    setErrors(newErrors);

    return Object.values(newErrors).every((v) => v === "");
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setMessage("");

    try {
      const payload: T = {
        company,
        position,
        status,
        applied_on: appliedOn,
        notes,
        ...(initialData && "id" in initialData ? { id: initialData.id } : {}),
      } as T;

      await onSubmit(payload);

      setMessage(
        initialData
          ? "Application updated successfully!"
          : "Application added successfully!"
      );

      if (!initialData) {
        setCompany("");
        setPosition("");
        setNotes("");
      }
    } catch (error) {
      const msg =
        error instanceof Error
          ? error.message
          : "Something went wrong while submitting.";

      setMessage(`Error: ${msg}`);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen pt-8 px-4">
      <h1 className="text-xl font-semibold pb-2 mb-4 text-center">
        {initialData ? "Edit Application" : "Add New Application"}
      </h1>

      <div className="bg-surface border border-border-divider rounded-md shadow-sm p-6 w-full max-w-md">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-center items-center pt-2 px-4 w-full max-w-md"
          noValidate
        >
          {/* Company */}
          <div className="w-full flex flex-col mb-4">
            <label htmlFor="company" className="mb-2 text-sm font-medium">
              Company:
            </label>
            <input
              id="company"
              name="company"
              type="text"
              value={company}
              placeholder="company name"
              onChange={(e) => {
                setCompany(e.target.value);
                setErrors({ ...errors, company: "" });
              }}
              className={cn(
                "w-full p-2 border border-border-divider rounded bg-background",
                errors.company && "border-border-error"
              )}
            />
            {errors.company && (
              <p className="text-sm text-error mt-1">{errors.company}</p>
            )}
          </div>

          {/* Position */}
          <div className="w-full flex flex-col mb-4">
            <label htmlFor="position" className="mb-2 text-sm font-medium">
              Position:
            </label>
            <input
              id="position"
              name="position"
              type="text"
              value={position}
              placeholder="position"
              onChange={(e) => {
                setPosition(e.target.value);
                setErrors({ ...errors, position: "" });
              }}
              className={cn(
                "w-full p-2 border border-border-divider rounded bg-background",
                errors.position && "border-border-error"
              )}
            />
            {errors.position && (
              <p className="text-sm text-error mt-1">{errors.position}</p>
            )}
          </div>

          {/* Applied On */}
          <div className="w-full flex flex-col mb-4">
            <label htmlFor="appliedOn" className="mb-2 text-sm font-medium">
              Applied On:
            </label>
            <input
              id="appliedOn"
              name="appliedOn"
              type="date"
              value={appliedOn}
              onChange={(e) => {
                setAppliedOn(e.target.value);
                setErrors({ ...errors, appliedOn: "" });
              }}
              className={cn(
                "w-full p-2 border border-border-divider rounded bg-background",
                errors.appliedOn && "border-border-error"
              )}
            />
            {errors.appliedOn && (
              <p className="text-sm text-error mt-1">{errors.appliedOn}</p>
            )}
          </div>

          {/* Status */}
          <div className="w-full flex flex-col mb-4">
            <label htmlFor="status" className="mb-2 text-sm font-medium">
              Status:
            </label>
            <select
              id="status"
              name="status"
              value={status}
              onChange={(e) => {
                setStatus(e.target.value);
                setErrors({ ...errors, status: "" });
              }}
              className={cn(
                "w-full p-2 border border-border-divider rounded bg-background",
                errors.status && "border-border-error"
              )}
            >
              <option value="">--Select Status--</option>
              {STATUS_LIST.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            {errors.status && (
              <p className="text-sm text-error mt-1">{errors.status}</p>
            )}
          </div>

          {/* Notes */}
          <div className="w-full flex flex-col mb-4">
            <label htmlFor="notes" className="mb-2 text-sm font-medium">
              Notes:
            </label>
            <textarea
              id="notes"
              name="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full p-2 border border-border-divider rounded bg-background"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-2 justify-between w-full">
            <button
              type="submit"
              className="flex-1 bg-primary hover:bg-primary-dark"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>

            <button
              type="button"
              className="flex-1 bg-border-focus hover:bg-text-secondary"
              onClick={() => router.push("/")}
            >
              Cancel
            </button>
          </div>

          {message && <p className="text-sm text-center mt-2">{message}</p>}
        </form>
      </div>
    </div>
  );
}

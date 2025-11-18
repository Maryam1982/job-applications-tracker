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
  const [company, setCompany] = useState(initialData?.company || "");
  const [position, setPosition] = useState(initialData?.position || "");
  const [status, setStatus] = useState(initialData?.status || "Applied");
  const [appliedOn, setAppliedOn] = useState(() => {
    if (initialData?.applied_on) {
      return initialData?.applied_on;
    }
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  });
  const [notes, setNotes] = useState(initialData?.notes || "");
  const [errors, setErrors] = useState<ErrorState>({
    company: "",
    position: "",
    status: "",
    appliedOn: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors({ company: "", position: "", status: "", appliedOn: "" });

    const newErrors: ErrorState = {
      company: "",
      position: "",
      status: "",
      appliedOn: "",
    };

    if (!company.trim()) newErrors.company = "Company can't be empty.";
    if (!position.trim()) newErrors.position = "Position can't be empty.";
    if (!status.trim()) newErrors.status = "Status can't be empty.";
    if (!appliedOn.trim())
      newErrors.appliedOn = "Application date can't be empty.";

    setErrors(newErrors);

    const isValid = Object.values(newErrors).every((val) => val === "");
    if (isValid) {
      setIsSubmitting(true);
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
        if (initialData) {
          setMessage("Application updated successfully!");
        } else {
          setMessage("Application added successfully!");
          setCompany("");
          setPosition("");
          setNotes("");
        }
      } catch (error) {
        if (error instanceof Error) {
          console.log(error.message);
          setMessage(`Error: ${error.message}`);
        } else
          setMessage(
            "Something went wrong while trying to add the job application."
          );
      } finally {
        setIsSubmitting(false);
      }
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen pt-8 px-4 ">
      <h1 className="text-xl font-semibold pb-2 mb-4  text-center">
        {initialData ? "Edit Application" : "Add New Application"}
      </h1>
      <div className="bg-surface border border-border-divider rounded-md shadow-sm p-6 w-full max-w-md">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-center items-center pt-2 px-4 w-full max-w-md"
          noValidate
        >
          <div className="w-full flex flex-col mb-4">
            <label htmlFor="company" className="mb-2 text-sm font-medium">
              Company:
            </label>
            <input
              type="text"
              placeholder="company name"
              value={company}
              onChange={(e) => {
                setCompany(e.target.value);
                setErrors({ ...errors, company: "" });
              }}
              name="company"
              id="company"
              required
              className={cn(
                "w-full p-2 border border-border-divider rounded bg-background",
                !!errors.company && "border-border-error"
              )}
            />
            {!!errors.company && (
              <p className="text-sm text-error mt-1">{errors.company}</p>
            )}
          </div>
          <div className="w-full flex flex-col mb-4">
            <label htmlFor="company" className="mb-2 text-sm font-medium">
              Position:
            </label>
            <input
              type="text"
              placeholder="position"
              value={position}
              onChange={(e) => {
                setPosition(e.target.value);
                setErrors({ ...errors, position: "" });
              }}
              name="position"
              id="position"
              required
              className={cn(
                "w-full p-2 border border-border-divider rounded bg-background",
                !!errors.position && "border-border-error"
              )}
            />
            {!!errors.position && (
              <p className="text-sm text-error mt-1">{errors.position}</p>
            )}
          </div>

          <div className="w-full flex flex-col mb-4">
            <label htmlFor="company" className="mb-2 text-sm font-medium">
              Applied On:
            </label>
            <input
              type="date"
              placeholder="applied on"
              value={appliedOn}
              onChange={(e) => {
                setAppliedOn(e.target.value);
                setErrors({ ...errors, appliedOn: "" });
              }}
              name="appliedOn"
              id="appliedOn"
              required
              className={cn(
                "w-full p-2 border border-border-divider rounded bg-background",
                !!errors.appliedOn && "border-border-error"
              )}
            />
            {!!errors.appliedOn && (
              <p className="text-sm text-error mt-1">{errors.appliedOn}</p>
            )}
          </div>
          <div className="w-full flex flex-col mb-4">
            <label htmlFor="company" className="mb-2 text-sm font-medium">
              Status:
            </label>
            <select
              name="status"
              value={status}
              onChange={(e) => {
                setStatus(e.target.value);
                setErrors({ ...errors, status: "" });
              }}
              id="status"
              required
              className={cn(
                "w-full p-2 border border-border-divider rounded bg-background",
                !!errors.status && "border-border-error"
              )}
            >
              <option value="">--Select Status--</option>
              {STATUS_LIST.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </select>
            {!!errors.status && (
              <p className="text-sm text-error mt-1">{errors.status}</p>
            )}
          </div>
          <div className="w-full flex flex-col mb-4">
            <label htmlFor="company" className="mb-2 text-sm font-medium">
              Notes:
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              name="notes"
              id="notes"
              className="w-full p-2 border border-border-divider rounded bg-background"
            ></textarea>
          </div>

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
              className="flex-1 bg-border-focus hover:bg-text-secondary w-full"
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

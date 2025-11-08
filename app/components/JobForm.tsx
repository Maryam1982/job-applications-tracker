import { useState } from "react";
import { cn } from "@/lib/utils";

const statusList = [
  "Applied",
  "More Information Requested",
  "Phone Interview",
  "Technical Interview",
  "Offer Received",
  "Rejected",
  "No Response",
];

type ErrorState = {
  company: string;
  position: string;
  status: string;
  appliedOn: string;
};

export default function JobForm() {
  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const [status, setStatus] = useState("Applied");
  const [appliedOn, setAppliedOn] = useState(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  });
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState<ErrorState>({
    company: "",
    position: "",
    status: "",
    appliedOn: "",
  });
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
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
      setSubmitted(true);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen pt-8 px-4">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center items-center pt-2 px-4 w-full max-w-md"
        noValidate
      >
        <label htmlFor="company" className="w-full flex flex-col mb-4">
          Company:
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
              "w-full p-2 border border-border-divider rounded",
              !!errors.company && "border-border-error"
            )}
          />
          {!!errors.company && (
            <p className="text-sm text-error mt-1">{errors.company}</p>
          )}
        </label>
        <label htmlFor="position" className="w-full flex flex-col mb-4">
          Position:
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
              "w-full p-2 border border-border-divider rounded",
              !!errors.position && "border-border-error"
            )}
          />
          {!!errors.position && (
            <p className="text-sm text-error mt-1">{errors.position}</p>
          )}
        </label>
        <label htmlFor="appliedOn" className="w-full flex flex-col mb-4">
          Applied On:
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
              "w-full p-2 border border-border-divider rounded",
              !!errors.appliedOn && "border-border-error"
            )}
          />
          {!!errors.appliedOn && (
            <p className="text-sm text-error mt-1">{errors.appliedOn}</p>
          )}
        </label>
        <label htmlFor="status" className="w-full flex flex-col mb-4">
          Status:
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
              "w-full p-2 border border-border-divider rounded",
              !!errors.status && "border-border-error"
            )}
          >
            <option value="">--Select Status--</option>
            {statusList.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
          {!!errors.status && (
            <p className="text-sm text-error mt-1">{errors.status}</p>
          )}
        </label>
        <label htmlFor="notes" className="w-full flex flex-col mb-4">
          Notes:
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            name="notes"
            id="notes"
            className="w-full p-2 border border-border-divider rounded"
          ></textarea>
        </label>
        <button type="submit" className="w-full">
          Submit
        </button>
      </form>
      {submitted && (
        <p className="mt-4 text-primary-dark">
          Validation is completed. Ready for the backend integration!
        </p>
      )}
    </div>
  );
}

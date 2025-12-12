import { cn } from "@/lib/utils";

type FieldProps = {
  label: string;
  value?: string | number | null;
  className?: string;
};

export default function Field({ label, value, className }: FieldProps) {
  if (value == null || value === "") return null;

  return (
    <div className={cn("flex flex-col  gap-1.5", className)}>
      <span className="font-normal text-border-focus">{label}</span>
      <span>{value}</span>
    </div>
  );
}

import Link from "next/link";
import { LayoutDashboard, Folder } from "lucide-react";

type NavLinksProps = {
  isDashboard: boolean;
  isApplications: boolean;
  onNavigate?: () => void;
};

export default function NavLinks({
  isDashboard,
  isApplications,
  onNavigate,
}: NavLinksProps) {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-8">
      <Link
        href="/dashboard"
        className={`text-sm font-medium transition-colors ${
          isDashboard ? "text-primary font-semibold" : "hover:text-primary"
        }`}
        onClick={onNavigate ? onNavigate : undefined}
      >
        <div className="flex items-center gap-2">
          <LayoutDashboard className="w-6 h-6 text-current" />
          Dashboard
        </div>
      </Link>

      <Link
        href="/applications"
        className={`text-sm font-medium transition-colors ${
          isApplications ? "text-primary font-semibold" : "hover:text-primary"
        }`}
        onClick={onNavigate ? onNavigate : undefined}
      >
        <div className="flex items-center gap-2">
          <Folder className="w-6 h-6 text-current" />
          Applications
        </div>
      </Link>
    </div>
  );
}

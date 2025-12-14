type MobileMenuButtonProps = {
  open: boolean;
  onToggle: () => void;
};
export default function MobileMenuButton({
  open,
  onToggle,
}: MobileMenuButtonProps) {
  return (
    <button
      className="sm:hidden relative w-8 h-6"
      aria-label="Toggle navigation"
      aria-expanded={open}
      onClick={onToggle}
    >
      {/* Top bar */}
      <span
        className={`absolute left-0 top-1/2 h-0.5 w-full bg-primary transition-transform
      ${open ? "-translate-y-1/2 rotate-45" : "-translate-y-3"}`}
      />

      {/* Middle bar */}
      <span
        className={`absolute left-0 top-1/2 h-0.5 w-full bg-primary transition-opacity
      -translate-y-1/2 ${open ? "opacity-0" : ""}`}
      />

      {/* Bottom bar */}
      <span
        className={`absolute left-0 top-1/2 h-0.5 w-full bg-primary transition-transform
      ${open ? "-translate-y-1/2 -rotate-45" : "translate-y-3"}`}
      />
    </button>
  );
}

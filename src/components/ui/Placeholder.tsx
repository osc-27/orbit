import { ImageIcon } from "lucide-react";

// Mock image block — a brand-tinted gradient with an optional label, standing in
// for photography/illustration until real assets land. Clearly "mock" by design.
export function Placeholder({
  label,
  className = "",
  ratio = "16 / 9",
  tone = "brand",
}: {
  label?: string;
  className?: string;
  ratio?: string;
  tone?: "brand" | "navy" | "amber";
}) {
  const bg =
    tone === "navy"
      ? "linear-gradient(135deg, var(--color-brand-darker), var(--color-brand-dark))"
      : tone === "amber"
        ? "linear-gradient(135deg, #ffd27a, var(--color-accent))"
        : "linear-gradient(135deg, var(--color-brand-tint-2), var(--color-brand))";
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden ${className}`}
      style={{ aspectRatio: ratio, background: bg }}
      aria-hidden="true"
    >
      <ImageIcon className="h-6 w-6 text-white/70" strokeWidth={1.6} />
      {label && (
        <span className="absolute bottom-2 left-3 text-[11px] font-semibold uppercase tracking-wide text-white/85">
          {label}
        </span>
      )}
    </div>
  );
}

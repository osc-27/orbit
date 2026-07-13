import type { ApprovalOdds as Odds } from "@/lib/offers/types";

const LABELS: Record<Odds, string> = {
  excellent: "Excellent approval odds",
  good: "Good approval odds",
  fair: "Fair approval odds",
  unknown: "Approval odds unavailable",
};

const CLASS: Record<Odds, string> = {
  excellent: "odds-excellent",
  good: "odds-good",
  fair: "odds-fair",
  unknown: "chip-neutral",
};

export function ApprovalOdds({ odds, compact = false }: { odds: Odds; compact?: boolean }) {
  if (odds === "unknown") return null;
  return (
    <span className={CLASS[odds]}>
      <span
        className="h-1.5 w-1.5 rounded-full"
        style={{ backgroundColor: "currentColor" }}
        aria-hidden="true"
      />
      {compact ? labelShort(odds) : LABELS[odds]}
    </span>
  );
}

function labelShort(odds: Odds): string {
  return odds.charAt(0).toUpperCase() + odds.slice(1);
}

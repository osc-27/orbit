"use client";

import { useState } from "react";
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

const FACTORS = [
  "Your credit profile",
  "Income and employment",
  "The amount you request",
  "Your state and the lender's criteria",
];

// Tappable odds pill with a Toss/Kakao-style explainer: what odds mean, what
// affects them, and the reassurance that they're an estimate — not a guarantee —
// with no impact to your credit score.
export function ApprovalOdds({ odds, compact = false }: { odds: Odds; compact?: boolean }) {
  const [open, setOpen] = useState(false);
  if (odds === "unknown") return null;

  return (
    <span className="relative inline-block">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={`${LABELS[odds]}. What affects this?`}
        className={`${CLASS[odds]} cursor-pointer`}
      >
        <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: "currentColor" }} aria-hidden="true" />
        {compact ? label(odds) : LABELS[odds]}
        <span aria-hidden="true" className="ml-0.5 opacity-60">
          ⓘ
        </span>
      </button>

      {open && (
        <>
          <button
            type="button"
            aria-label="Close"
            className="fixed inset-0 z-10 cursor-default"
            onClick={() => setOpen(false)}
          />
          <div
            role="dialog"
            aria-label="About approval odds"
            className="card absolute left-0 z-20 mt-2 w-72 p-4 text-left shadow-[var(--shadow-lift)]"
          >
            <p className="text-sm font-bold text-ink">Your approval odds: {label(odds)}</p>
            <p className="mt-1.5 text-xs leading-relaxed text-muted">
              This estimates how likely you are to be approved, based on a soft inquiry. It&apos;s not a guarantee — the
              lender makes the final decision.
            </p>
            <p className="mt-3 text-[11px] font-bold uppercase tracking-wide text-ink">What affects your odds</p>
            <ul className="mt-1.5 flex flex-col gap-1.5">
              {FACTORS.map((f) => (
                <li key={f} className="flex items-start gap-2 text-xs text-muted">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                  {f}
                </li>
              ))}
            </ul>
            <p className="mt-3 border-t border-line pt-2 text-[11px] text-muted">
              Checking your rate is a soft inquiry — it won&apos;t affect your credit score.
            </p>
          </div>
        </>
      )}
    </span>
  );
}

function label(odds: Odds): string {
  return odds.charAt(0).toUpperCase() + odds.slice(1);
}

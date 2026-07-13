"use client";

import { useState } from "react";
import { Info } from "lucide-react";

// Transparency popover, modeled on Credit Karma's "How we rank offers ⓘ".
// Makes the honest-sort + paid-placement story legible to the consumer — the
// UX half of the compliance design.
export function RankingInfo({ sortBasis }: { sortBasis: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="chip-neutral transition-colors hover:text-brand"
      >
        {sortBasis}
        <Info className="h-3.5 w-3.5" aria-hidden="true" />
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
            aria-label="How Orbit ranks offers"
            className="card absolute right-0 z-20 mt-2 w-80 p-4 text-left shadow-[var(--shadow-lift)]"
          >
            <p className="text-sm font-bold text-ink">How Orbit ranks offers</p>
            <ul className="mt-2 flex flex-col gap-2 text-xs leading-relaxed text-muted">
              <li>
                <span className="font-semibold text-brand-dark">Featured from OppFi</span> is a paid placement from
                OppFi, the company behind Orbit. It&apos;s shown only when you&apos;re likely to qualify.
              </li>
              <li>
                <span className="font-semibold text-ink">The market list</span> is sorted by lowest APR — never by what
                a lender pays us. Sponsored rows are labeled.
              </li>
              <li>
                <span className="font-semibold text-ink">Approval odds</span> estimate your likelihood of approval from
                a soft inquiry. They&apos;re not a guarantee — the lender makes the final decision.
              </li>
            </ul>
            <p className="mt-3 border-t border-line pt-2 text-[11px] text-muted">
              Orbit is a marketplace, not a lender, and doesn&apos;t make credit decisions.
            </p>
          </div>
        </>
      )}
    </div>
  );
}

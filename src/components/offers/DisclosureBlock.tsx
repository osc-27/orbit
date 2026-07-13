"use client";

import { useState } from "react";
import type { Disclosure } from "@/lib/offers/types";

export function DisclosureBlock({ disclosures }: { disclosures: Disclosure[] }) {
  const [open, setOpen] = useState(false);
  if (disclosures.length === 0) return null;
  return (
    <div className="mt-3 border-t border-line pt-3">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="text-xs font-semibold text-muted underline-offset-2 hover:text-brand hover:underline"
      >
        {open ? "Hide" : "Rates, terms & disclosures"}
      </button>
      {open && (
        <dl className="mt-2 flex flex-col gap-2">
          {disclosures.map((d) => (
            <div key={d.label}>
              <dt className="text-[11px] font-bold uppercase tracking-wide text-ink">{d.label}</dt>
              <dd className="text-xs leading-relaxed text-muted">{d.text}</dd>
            </div>
          ))}
        </dl>
      )}
    </div>
  );
}

"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { OffersView } from "./OffersView";
import { currency } from "@/lib/format";
import type { OfferResult, Vertical, CreditBand } from "@/lib/offers/types";

// Inline "Update offers" filter — the Lantern/Engine pattern: SSR'd initial rate
// table (SEO) that a shopper can re-query live by amount + credit band without
// leaving the page.
const BANDS: [CreditBand, string][] = [
  ["excellent", "Excellent (720–850)"],
  ["good", "Good (660–719)"],
  ["fair", "Fair (620–659)"],
  ["poor", "Building (300–619)"],
];

export function InlineOffers({
  vertical,
  initialResult,
  initialAmount,
}: {
  vertical: Vertical;
  initialResult: OfferResult;
  initialAmount: number;
}) {
  const [result, setResult] = useState(initialResult);
  const [amount, setAmount] = useState(initialAmount);
  const [band, setBand] = useState<CreditBand>("good");
  const [loading, setLoading] = useState(false);

  const isCard = vertical === "card";

  async function update() {
    setLoading(true);
    try {
      const res: OfferResult = await fetch("/api/offers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ vertical, amount, creditBand: band, consent: true }),
      }).then((r) => r.json());
      setResult(res);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div className="card mb-6 flex flex-wrap items-end gap-5 p-5">
        <label className="min-w-[200px] flex-1">
          <span className="text-sm font-semibold text-ink">
            {isCard ? "Credit line" : "Loan amount"}:{" "}
            <span className="text-brand-dark">{currency(amount)}</span>
          </span>
          <input
            type="range"
            min={isCard ? 300 : 1000}
            max={isCard ? 15000 : 50000}
            step={isCard ? 100 : 500}
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="mt-2 w-full accent-[var(--color-brand)]"
            aria-label={isCard ? "Credit line" : "Loan amount"}
          />
        </label>
        <label className="min-w-[180px]">
          <span className="text-sm font-semibold text-ink">Credit rating</span>
          <select
            value={band}
            onChange={(e) => setBand(e.target.value as CreditBand)}
            className="input mt-1"
            aria-label="Credit rating"
          >
            {BANDS.map(([v, l]) => (
              <option key={v} value={v}>
                {l}
              </option>
            ))}
          </select>
        </label>
        <button type="button" onClick={update} disabled={loading} className="btn-primary">
          {loading && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
          Update offers
        </button>
      </div>

      <div className={loading ? "opacity-60 transition-opacity" : "transition-opacity"}>
        <OffersView result={result} />
      </div>
    </div>
  );
}

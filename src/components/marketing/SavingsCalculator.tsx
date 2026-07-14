"use client";

import { useState } from "react";
import { monthlyPayment } from "@/lib/offers/finance";
import { currency } from "@/lib/format";

const TARGET_APR = 24.99;
const TERM = 36;

// Illustrative consolidation savings widget. Compares rough current card interest
// against an estimated consolidation-loan payment. Mock math for the preview.
export function SavingsCalculator() {
  const [debt, setDebt] = useState(10000);
  const [apr, setApr] = useState(27);

  const newMonthly = monthlyPayment(debt, TARGET_APR, TERM);
  const currentMonthlyInterest = Math.round((debt * (apr / 100)) / 12);
  const newMonthlyInterest = Math.round((debt * (TARGET_APR / 100)) / 12);
  const savedPerMonth = Math.max(0, currentMonthlyInterest - newMonthlyInterest);

  return (
    <div className="card p-6">
      <h3 className="text-sm font-bold uppercase tracking-wide text-brand-dark">Estimate your savings</h3>
      <div className="mt-4 flex flex-col gap-4">
        <label className="block">
          <span className="text-sm font-semibold text-ink">Total debt</span>
          <span className="ml-2 text-sm font-bold text-brand-dark">{currency(debt)}</span>
          <input
            type="range"
            min={1000}
            max={50000}
            step={500}
            value={debt}
            onChange={(e) => setDebt(Number(e.target.value))}
            className="mt-2 w-full accent-[var(--color-brand)]"
          />
        </label>
        <label className="block">
          <span className="text-sm font-semibold text-ink">Current average APR</span>
          <span className="ml-2 text-sm font-bold text-brand-dark">{apr}%</span>
          <input
            type="range"
            min={12}
            max={36}
            step={1}
            value={apr}
            onChange={(e) => setApr(Number(e.target.value))}
            className="mt-2 w-full accent-[var(--color-brand)]"
          />
        </label>
      </div>
      <div className="mt-5 grid grid-cols-2 gap-4 border-t border-line pt-5">
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-wide text-muted">Est. new payment</div>
          <div className="text-2xl font-extrabold text-brand-dark">{currency(newMonthly)}/mo</div>
        </div>
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-wide text-muted">Est. interest saved</div>
          <div className="text-2xl font-extrabold text-good">{currency(savedPerMonth)}/mo</div>
        </div>
      </div>
      <p className="mt-3 text-[11px] leading-relaxed text-muted">
        Illustrative estimate at {TARGET_APR}% APR over {TERM} months. Your actual rate depends on approval.
      </p>
    </div>
  );
}

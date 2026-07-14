import type { NormalizedOffer } from "@/lib/offers/types";
import { LenderLogo } from "./LenderLogo";
import { ApprovalOdds } from "./ApprovalOdds";
import { aprRange, currency } from "@/lib/format";
import { Check } from "lucide-react";

const ODDS_W: Record<string, number> = { excellent: 3, good: 2, fair: 1, unknown: 0 };
const TIER: Record<string, string> = {
  "direct-premium": "Direct partner",
  network: "Network",
  overflow: "Extended network",
  "first-party": "OppFi",
};

function argmin(nums: number[]): number {
  return nums.reduce((best, n, i) => (n < nums[best] ? i : best), 0);
}
function argmax(nums: number[]): number {
  return nums.reduce((best, n, i) => (n > nums[best] ? i : best), 0);
}

export function CompareTable({ offers }: { offers: NormalizedOffer[] }) {
  if (offers.length === 0) return null;

  // Best-in-row markers are computed FROM THE DATA — never tied to the featured
  // column. OppFi wins a row only where it genuinely does.
  const bestApr = argmin(offers.map((o) => o.apr.min));
  const bestMonthly = argmin(offers.map((o) => o.estMonthlyPayment));
  const bestOdds = argmax(offers.map((o) => ODDS_W[o.approvalOdds]));

  const rows: { label: string; render: (o: NormalizedOffer) => React.ReactNode; best?: number }[] = [
    { label: "Est. APR", render: (o) => aprRange(o.apr.min, o.apr.max), best: bestApr },
    {
      label: "Est. monthly",
      render: (o) => (o.term.months > 0 ? currency(o.estMonthlyPayment) : "—"),
      best: bestMonthly,
    },
    { label: "Term", render: (o) => (o.term.months > 0 ? `${o.term.months} mo` : "Revolving") },
    { label: "Loan amount", render: (o) => `${currency(o.amountRange.min)}–${currency(o.amountRange.max)}` },
    { label: "Funding speed", render: (o) => o.fundingSpeed },
    { label: "Approval odds", render: (o) => <ApprovalOdds odds={o.approvalOdds} compact />, best: bestOdds },
    { label: "Source", render: (o) => (o.isFirstParty ? "OppFi (featured)" : TIER[o.sourceTier] ?? "Network") },
  ];

  return (
    <div className="overflow-x-auto rounded-xl border border-line bg-paper shadow-[var(--shadow-card)]">
      <table className="w-full min-w-[640px] border-collapse">
        <thead>
          <tr>
            <th className="w-40 border-b border-line p-4 text-left align-bottom text-xs font-medium uppercase tracking-wide text-muted">
              Offer attributes
            </th>
            {offers.map((o) => (
              <th
                key={o.id}
                className={`border-b border-line p-4 text-left align-bottom ${o.isFirstParty ? "bg-brand-tint/50" : ""}`}
              >
                {o.isFirstParty && (
                  <span className="mb-2 inline-block rounded bg-brand px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
                    Featured from OppFi
                  </span>
                )}
                <div className="flex items-center gap-2">
                  <LenderLogo text={o.lender.logoText} color={o.lender.brandColor} size={36} />
                  <div>
                    <div className="font-bold text-ink">{o.lender.name}</div>
                    {o.lender.rating != null && <div className="text-xs text-muted">★ {o.lender.rating.toFixed(1)}</div>}
                  </div>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.label}>
              <td className="border-b border-line p-4 text-sm font-semibold text-ink">{row.label}</td>
              {offers.map((o, i) => {
                const isBest = row.best === i;
                return (
                  <td
                    key={o.id}
                    className={`border-b border-line p-4 text-sm ${o.isFirstParty ? "bg-brand-tint/30" : ""}`}
                  >
                    <span
                      className={`inline-flex items-center gap-1.5 ${isBest ? "font-bold text-good" : "font-semibold text-ink"}`}
                    >
                      {isBest && <Check className="h-4 w-4" aria-hidden="true" />}
                      {row.render(o)}
                    </span>
                  </td>
                );
              })}
            </tr>
          ))}
          <tr>
            <td className="p-4" />
            {offers.map((o) => (
              <td key={o.id} className={`p-4 ${o.isFirstParty ? "bg-brand-tint/30" : ""}`}>
                <a href={o.applyUrl} className={o.isFirstParty ? "btn-accent w-full" : "btn-ghost w-full"}>
                  {o.isFirstParty ? "Continue with OppFi" : "View offer"}
                </a>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

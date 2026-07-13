import type { NormalizedOffer } from "@/lib/offers/types";
import { LenderLogo } from "./LenderLogo";
import { ApprovalOdds } from "./ApprovalOdds";
import { DisclosureBlock } from "./DisclosureBlock";
import { aprRange, currency } from "@/lib/format";

const TIER_LABEL: Record<string, string> = {
  "direct-premium": "Direct partner",
  network: "Network",
  overflow: "Extended network",
  "first-party": "OppFi",
};

// A market offer. Sorted by APR upstream; sponsored placement is LABELED here,
// never silently reordered to the top.
export function OfferRow({ offer }: { offer: NormalizedOffer }) {
  return (
    <article className="card p-5 transition-shadow hover:shadow-[var(--shadow-lift)]">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="flex min-w-0 flex-1 items-center gap-3.5">
          <LenderLogo text={offer.lender.logoText} color={offer.lender.brandColor} />
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="truncate font-bold text-ink">{offer.lender.name}</h3>
              {offer.isSponsored && (
                <span className="chip bg-[#fbefe1] text-[#b56a1e]">Sponsored</span>
              )}
            </div>
            <div className="mt-0.5 flex items-center gap-2 text-xs text-muted">
              {offer.lender.rating != null && <span>★ {offer.lender.rating.toFixed(1)}</span>}
              <span aria-hidden="true">·</span>
              <span>{TIER_LABEL[offer.sourceTier] ?? "Network"}</span>
              <span aria-hidden="true">·</span>
              <span>{offer.fundingSpeed}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 sm:w-auto sm:grid-cols-3 sm:gap-6">
          <Cell label="APR" value={aprRange(offer.apr.min, offer.apr.max)} strong />
          <Cell
            label={offer.term.months > 0 ? "Est. / mo" : "Est. / mo"}
            value={currency(offer.estMonthlyPayment)}
          />
          <div className="flex flex-col justify-center">
            <ApprovalOdds odds={offer.approvalOdds} compact />
          </div>
        </div>

        <a
          href={offer.applyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-ghost shrink-0 sm:ml-2"
        >
          View offer
        </a>
      </div>
      <DisclosureBlock disclosures={offer.disclosures} />
    </article>
  );
}

function Cell({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return (
    <div>
      <div className="text-[11px] font-semibold uppercase tracking-wide text-muted">{label}</div>
      <div className={strong ? "text-lg font-extrabold text-ink" : "text-base font-semibold text-ink"}>
        {value}
      </div>
    </div>
  );
}

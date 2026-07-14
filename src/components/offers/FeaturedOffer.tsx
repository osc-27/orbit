import type { NormalizedOffer } from "@/lib/offers/types";
import { LenderLogo } from "./LenderLogo";
import { ApprovalOdds } from "./ApprovalOdds";
import { DisclosureBlock } from "./DisclosureBlock";
import { aprRange, currency } from "@/lib/format";

// The labeled first-party module. Prominent — but honestly marked "From OppFi",
// never blended into the market table under a "best rate" claim.
export function FeaturedOffer({ offer }: { offer: NormalizedOffer }) {
  return (
    <article className="relative overflow-hidden rounded-xl border-2 border-brand/40 bg-gradient-to-br from-brand-tint to-paper shadow-[var(--shadow-card)]">
      <div className="flex items-center justify-between bg-brand px-5 py-2 text-white">
        <span className="text-xs font-bold uppercase tracking-[0.14em]">From OppFi · Featured</span>
        <ApprovalOdds odds={offer.approvalOdds} compact />
      </div>
      <div className="p-5 sm:p-6">
        <div className="flex flex-wrap items-start gap-4">
          <LenderLogo text={offer.lender.logoText} color={offer.lender.brandColor} size={52} />
          <div className="min-w-0 flex-1">
            <h3 className="text-lg font-bold text-ink">{offer.lender.name}</h3>
            <div className="mt-1 flex flex-wrap gap-2">
              {offer.highlights.map((h) => (
                <span key={h} className="chip-neutral">
                  {h}
                </span>
              ))}
            </div>
          </div>
          <a href={offer.applyUrl} className="btn-accent shrink-0">
            Continue with OppFi
          </a>
        </div>

        <dl className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <Metric label="Est. APR" value={aprRange(offer.apr.min, offer.apr.max)} big />
          <Metric
            label={offer.term.months > 0 ? "Est. monthly" : "Est. monthly cost"}
            value={currency(offer.estMonthlyPayment)}
          />
          <Metric
            label="Amount"
            value={`${currency(offer.amountRange.min)}–${currency(offer.amountRange.max)}`}
          />
          <Metric
            label="Funding"
            value={offer.fundingSpeed}
            small
          />
        </dl>

        <DisclosureBlock disclosures={offer.disclosures} />
      </div>
    </article>
  );
}

function Metric({
  label,
  value,
  big,
  small,
}: {
  label: string;
  value: string;
  big?: boolean;
  small?: boolean;
}) {
  return (
    <div>
      <dt className="text-[11px] font-semibold uppercase tracking-wide text-muted">{label}</dt>
      <dd
        className={
          big
            ? "text-2xl font-extrabold text-brand-dark"
            : small
              ? "text-xs font-medium leading-snug text-ink"
              : "text-lg font-bold text-ink"
        }
      >
        {value}
      </dd>
    </div>
  );
}

import type { OfferResult } from "@/lib/offers/types";
import { FeaturedOffer } from "./FeaturedOffer";
import { OfferRow } from "./OfferRow";
import { ShieldCheck, Info } from "lucide-react";

// Presentational results surface, shared by the live /offers page and the
// category landing pages. Renders the labeled OppFi module, then the honestly
// sorted market — the two-surface design from the blueprint.
export function OffersView({
  result,
  showFeaturedEmptyNote = false,
}: {
  result: OfferResult;
  showFeaturedEmptyNote?: boolean;
}) {
  const { featured, market, meta } = result;

  return (
    <div className="flex flex-col gap-8">
      {/* ── Featured: first-party OppFi module ── */}
      {featured.length > 0 ? (
        <section aria-labelledby="featured-heading">
          <div className="mb-3 flex items-center justify-between">
            <h2 id="featured-heading" className="text-sm font-bold uppercase tracking-[0.14em] text-brand-dark">
              Featured from OppFi
            </h2>
            <span className="text-xs text-muted">The company behind Orbit</span>
          </div>
          <div className="flex flex-col gap-4">
            {featured.map((o) => (
              <FeaturedOffer key={o.id} offer={o} />
            ))}
          </div>
        </section>
      ) : (
        showFeaturedEmptyNote && (
          <div className="card flex items-start gap-3 p-4">
            <Info className="mt-0.5 h-5 w-5 shrink-0 text-brand" strokeWidth={1.8} aria-hidden="true" />
            <p className="text-sm text-muted">
              No OppFi product matches your profile right now — but here&apos;s the wider market below.
            </p>
          </div>
        )
      )}

      {/* ── Market: external offers, honest sort ── */}
      <section aria-labelledby="market-heading">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <h2 id="market-heading" className="text-lg font-bold text-ink">
            {market.length} more {market.length === 1 ? "offer" : "offers"} from the market
          </h2>
          <span className="chip-neutral">{meta.sortBasis}</span>
        </div>
        {market.length > 0 ? (
          <div className="flex flex-col gap-3">
            {market.map((o) => (
              <OfferRow key={o.id} offer={o} />
            ))}
          </div>
        ) : (
          <div className="card p-8 text-center">
            <p className="font-semibold text-ink">No market offers matched your profile.</p>
            <p className="mt-1 text-sm text-muted">
              Try adjusting your amount, or explore the Orbit marketplace for other ways to reach your goal.
            </p>
          </div>
        )}
      </section>

      {/* ── Compliance footnote ── */}
      <div className="flex items-start gap-2.5 rounded-xl bg-brand-tint/60 p-4 text-xs leading-relaxed text-brand-darker">
        <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0" strokeWidth={2} aria-hidden="true" />
        <p>
          These estimates come from a soft credit inquiry and don&apos;t affect your credit score. Featured OppFi
          placement is paid for by OppFi. The market list is sorted by APR — not by what any lender pays us. Final
          rates and terms are set by each lender after a full application.
        </p>
      </div>
    </div>
  );
}

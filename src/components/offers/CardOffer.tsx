import type { NormalizedOffer } from "@/lib/offers/types";
import { ApprovalOdds } from "./ApprovalOdds";
import { DisclosureBlock } from "./DisclosureBlock";

// Card art stand-in — a small gradient rectangle mimicking a credit card.
function CardArt({ color, name }: { color: string; name: string }) {
  return (
    <div
      className="relative flex aspect-[1.586] w-28 shrink-0 flex-col justify-between overflow-hidden rounded-lg p-2.5 text-white shadow-[var(--shadow-card)]"
      style={{ background: `linear-gradient(135deg, ${color}, color-mix(in srgb, ${color} 60%, #000))` }}
      aria-hidden="true"
    >
      <span className="text-[9px] font-bold uppercase tracking-wide opacity-80">{name.split(" ")[0]}</span>
      <span className="font-mono text-[9px] tracking-widest opacity-90">•••• 1234</span>
    </div>
  );
}

function CardMetric({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return (
    <div>
      <dt className="text-[11px] font-semibold uppercase tracking-wide text-muted">{label}</dt>
      <dd className={strong ? "text-lg font-extrabold text-brand-dark" : "text-sm font-bold text-ink"}>{value}</dd>
    </div>
  );
}

// Featured first-party card (Opp+ Card), labeled — the card analogue of FeaturedOffer.
export function CardFeatured({ offer }: { offer: NormalizedOffer }) {
  const c = offer.card;
  return (
    <article className="relative overflow-hidden rounded-xl border-2 border-brand/40 bg-gradient-to-br from-brand-tint to-paper shadow-[var(--shadow-card)]">
      <div className="flex items-center justify-between bg-brand px-5 py-2 text-white">
        <span className="text-xs font-bold uppercase tracking-[0.14em]">From OppFi · Featured</span>
        <ApprovalOdds odds={offer.approvalOdds} compact />
      </div>
      <div className="p-5 sm:p-6">
        <div className="flex flex-wrap items-start gap-4">
          <CardArt color={offer.lender.brandColor} name={offer.lender.name} />
          <div className="min-w-0 flex-1">
            <h3 className="text-lg font-bold text-ink">{offer.lender.name}</h3>
            <p className="mt-1 text-sm text-muted">{c?.rewards}</p>
          </div>
          <a href={offer.applyUrl} className="btn-accent shrink-0">
            Continue with OppFi
          </a>
        </div>
        <dl className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3">
          <CardMetric label="Purchase APR" value={c?.regularApr ?? "—"} strong />
          <CardMetric label="Annual fee" value={c?.annualFee ?? "—"} />
          <CardMetric label="Credit line" value={c?.creditLine ?? "—"} />
        </dl>
        <DisclosureBlock disclosures={offer.disclosures} />
      </div>
    </article>
  );
}

// Market card row — the card analogue of OfferRow.
export function CardOfferRow({ offer }: { offer: NormalizedOffer }) {
  const c = offer.card;
  return (
    <article className="card p-5 transition-shadow hover:shadow-[var(--shadow-lift)]">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="flex min-w-0 flex-1 items-center gap-3.5">
          <CardArt color={offer.lender.brandColor} name={offer.lender.name} />
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="truncate font-bold text-ink">{offer.lender.name}</h3>
              {offer.isSponsored && <span className="chip bg-[#fbefe1] text-[#b56a1e]">Sponsored</span>}
            </div>
            <p className="mt-0.5 text-sm font-medium text-brand-dark">{c?.rewards}</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 sm:gap-6">
          <CardMetric label="Intro APR" value={c?.introApr ?? "—"} />
          <CardMetric label="Regular APR" value={c?.regularApr ?? "—"} />
          <div className="flex flex-col justify-center">
            <ApprovalOdds odds={offer.approvalOdds} compact />
          </div>
        </div>
        <a href={offer.applyUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost shrink-0 sm:ml-2">
          View card
        </a>
      </div>
      <DisclosureBlock disclosures={offer.disclosures} />
    </article>
  );
}

import type { Lead, NormalizedOffer, OfferResult } from "./types";
import { adapters } from "./adapters";
import { rankMarket, orderFeatured, MARKET_SORT_BASIS } from "./rank";

// ── The Orbit orchestrator ───────────────────────────────────────────────────
// Fan out the lead to every source adapter, merge, dedupe, then split into two
// surfaces:
//   • featured  → OppFi first-party offers the lead qualifies for (labeled module)
//   • market    → external offers, honestly sorted by APR
// The featured module is how OppFi gets top-of-page attention; the honest market
// sort is how we stay defensible. Both truths coexist by design.

export async function getOffers(lead: Lead): Promise<OfferResult> {
  const settled = await Promise.all(
    adapters.map((a) => a.getOffers(lead).catch(() => [] as NormalizedOffer[])),
  );
  const all = dedupe(settled.flat());

  const featured = orderFeatured(all.filter((o) => o.isFirstParty));
  const market = rankMarket(all.filter((o) => !o.isFirstParty));

  return {
    featured,
    market,
    meta: {
      sortBasis: MARKET_SORT_BASIS,
      sources: [...new Set(all.map((o) => o.source))],
      generatedAt: new Date().toISOString(),
      lead: { vertical: lead.vertical, amount: lead.amount, creditBand: lead.creditBand },
    },
  };
}

function dedupe(offers: NormalizedOffer[]): NormalizedOffer[] {
  const seen = new Map<string, NormalizedOffer>();
  for (const o of offers) {
    // A lender reaching us from two sources: keep the better-tier / lower-APR one.
    const key = `${o.lender.name}:${o.vertical}`;
    const prev = seen.get(key);
    if (!prev || o.apr.min < prev.apr.min) seen.set(key, o);
  }
  return [...seen.values()];
}

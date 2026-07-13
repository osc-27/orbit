import type { NormalizedOffer } from "./types";

// ── Honest ranking ───────────────────────────────────────────────────────────
// The market table is sorted by APR (lowest first) — the basis we DISCLOSE to
// the consumer. We deliberately do NOT sort by our payout. Sponsored/overflow
// inventory is labeled in the UI, not reordered to the top under a "best" claim.
// This is the UDAAP-safe design: placement of first-party product happens in a
// separate, labeled module (see orchestrator), never by dressing this sort.

export const MARKET_SORT_BASIS = "Sorted by lowest APR";

export function rankMarket(offers: NormalizedOffer[]): NormalizedOffer[] {
  return [...offers].sort((a, b) => {
    if (a.apr.min !== b.apr.min) return a.apr.min - b.apr.min;
    // tie-breakers that still serve the consumer, not us
    if (a.apr.max !== b.apr.max) return a.apr.max - b.apr.max;
    return (b.lender.rating ?? 0) - (a.lender.rating ?? 0);
  });
}

const ODDS_WEIGHT: Record<string, number> = { excellent: 3, good: 2, fair: 1, unknown: 0 };

/**
 * Order the featured (first-party) module by relevance to the lead — strongest
 * approval odds first. This is the defensible form of self-preferencing: we
 * surface the OppFi product the consumer is most likely to actually get, rather
 * than pinning it above cheaper offers under a market "best rate" banner.
 */
export function orderFeatured(offers: NormalizedOffer[]): NormalizedOffer[] {
  return [...offers].sort((a, b) => ODDS_WEIGHT[b.approvalOdds] - ODDS_WEIGHT[a.approvalOdds]);
}

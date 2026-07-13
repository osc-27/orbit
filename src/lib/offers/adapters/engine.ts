import type { OfferAdapter, Lead, NormalizedOffer } from "../types";
import { LENDERS } from "../lenders";
import { buildOffer } from "../build";

// Engine by MoneyLion adapter (MOCK).
//
// The real integration: POST /leads/rateTables, then poll GET /rateTables until
// `pendingResponses` empties, because financial institutions return quotes at
// different speeds. We simulate that async settle with a short delay. When live
// Engine creds arrive, replace the body below with the real rate-table client —
// nothing else in the app changes.
export const engineAdapter: OfferAdapter = {
  id: "engine",
  label: "Engine by MoneyLion (network)",
  async getOffers(lead: Lead): Promise<NormalizedOffer[]> {
    await settle(120); // stand-in for rate-table polling latency
    return LENDERS.filter((l) => l.source === "engine" && l.vertical === lead.vertical)
      .map((l) => buildOffer(l, lead))
      .filter((o): o is NormalizedOffer => o !== null);
  },
};

function settle(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

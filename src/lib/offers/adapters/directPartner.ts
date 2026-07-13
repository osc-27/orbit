import type { OfferAdapter, Lead, NormalizedOffer } from "../types";
import { LENDERS } from "../lenders";
import { buildOffer } from "../build";

// Direct-partner adapter (MOCK). A one-off partnership hosted on Orbit. Each new
// signed partner is just another adapter like this — a static rate sheet, their
// own prequal API, or a hosted listing — with zero changes to the orchestrator
// or UI. This is what makes the "hybrid" cheap.
export const directPartnerAdapter: OfferAdapter = {
  id: "partner:reach",
  label: "Reach Financial (direct)",
  async getOffers(lead: Lead): Promise<NormalizedOffer[]> {
    return LENDERS.filter((l) => l.source.startsWith("partner:") && l.vertical === lead.vertical)
      .map((l) => buildOffer(l, lead))
      .filter((o): o is NormalizedOffer => o !== null);
  },
};

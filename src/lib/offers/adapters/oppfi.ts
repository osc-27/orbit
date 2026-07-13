import type { OfferAdapter, Lead, NormalizedOffer } from "../types";
import { LENDERS } from "../lenders";
import { buildOffer } from "../build";

// First-party adapter. In production this hits OppFi's own decisioning; here it
// maps the OppFi mock products. This is the highest-priority source (best
// economics, no rev-share leakage) and feeds the labeled "From OppFi" module.
export const oppfiAdapter: OfferAdapter = {
  id: "oppfi",
  label: "OppFi (first-party)",
  async getOffers(lead: Lead): Promise<NormalizedOffer[]> {
    return LENDERS.filter((l) => l.isFirstParty && l.vertical === lead.vertical)
      .map((l) => buildOffer(l, lead))
      .filter((o): o is NormalizedOffer => o !== null);
  },
};

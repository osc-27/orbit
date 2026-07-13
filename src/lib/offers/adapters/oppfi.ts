import type { OfferAdapter, Lead, NormalizedOffer } from "../types";
import { getOppFiClient } from "../../oppfi/client";

// First-party adapter. Delegates to the OppFiClient seam — mock today, live
// OppFi decisioning API tomorrow (set ORBIT_OPPFI_API_URL / _API_KEY). This is
// the highest-priority source and feeds the labeled "From OppFi" module.
export const oppfiAdapter: OfferAdapter = {
  id: "oppfi",
  label: "OppFi (first-party)",
  getOffers(lead: Lead): Promise<NormalizedOffer[]> {
    return getOppFiClient().getOffers(lead);
  },
};

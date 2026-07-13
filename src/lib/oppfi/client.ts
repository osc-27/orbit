import type { Lead, NormalizedOffer } from "../offers/types";
import { LENDERS } from "../offers/lenders";
import { buildOffer } from "../offers/build";

// ── OppFiClient ──────────────────────────────────────────────────────────────
// The seam between Orbit and OppFi's real lending stack. Today it's a mock that
// maps the OppFi products from the local catalog. To go live, implement this
// same interface against OppFi's decisioning/prequal API and return real offers.
// Nothing else in Orbit changes — the adapter, orchestrator, and UI are agnostic.

export interface OppFiClient {
  getOffers(lead: Lead): Promise<NormalizedOffer[]>;
}

const mockOppFiClient: OppFiClient = {
  async getOffers(lead: Lead): Promise<NormalizedOffer[]> {
    return LENDERS.filter((l) => l.isFirstParty && l.vertical === lead.vertical)
      .map((l) => buildOffer(l, lead))
      .filter((o): o is NormalizedOffer => o !== null);
  },
};

/**
 * The real client goes here. Wire OppFi's decisioning endpoint, map its response
 * into NormalizedOffer[], and return it. Kept as a stub so the integration point
 * is explicit and typed.
 */
export function createOppFiClient(_config: { baseUrl: string; apiKey: string }): OppFiClient {
  return {
    async getOffers(_lead: Lead): Promise<NormalizedOffer[]> {
      // TODO: const res = await fetch(`${_config.baseUrl}/prequalify`, { ... });
      //       return mapOppFiResponse(await res.json());
      throw new Error("Live OppFiClient not yet configured — provide OppFi decisioning API access.");
    },
  };
}

/** Returns the live client when configured via env, else the mock. */
export function getOppFiClient(): OppFiClient {
  const baseUrl = process.env.ORBIT_OPPFI_API_URL;
  const apiKey = process.env.ORBIT_OPPFI_API_KEY;
  if (baseUrl && apiKey) return createOppFiClient({ baseUrl, apiKey });
  return mockOppFiClient;
}

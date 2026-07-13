import type { Lead, NormalizedOffer, Disclosure, CreditBand } from "./types";
import type { MockLender } from "./lenders";
import { monthlyPayment, computeOdds, clampAmount } from "./finance";
import { aprRange, currency } from "../format";

function midpoint([a, b]: [number, number]): number {
  return (a + b) / 2;
}

/** Choose the APR band the lead actually falls into, else the nearest served band. */
function aprForBand(lender: MockLender, band: CreditBand): [number, number] | null {
  if (lender.aprByBand[band]) return lender.aprByBand[band]!;
  // Fall back to the closest defined band so a "fair" lead can still see an
  // adjacent lender's indicative range (odds will reflect the stretch).
  const defined = Object.entries(lender.aprByBand) as [CreditBand, [number, number]][];
  return defined.length ? defined[0][1] : null;
}

function buildDisclosures(lender: MockLender, apr: [number, number], amount: number): Disclosure[] {
  const items: Disclosure[] = [
    {
      label: "Representative example",
      text:
        lender.term > 0
          ? `A ${currency(amount)} loan at ${aprRange(apr[0], apr[1])} APR over ${lender.term} months. ` +
            `Your actual rate, amount, and term depend on credit approval. APR includes all finance charges.`
          : `Purchase APR ${aprRange(apr[0], apr[1])} (variable). Credit line and terms depend on approval.`,
    },
    {
      label: "Not a commitment to lend",
      text:
        "Orbit is not a lender. Prequalified estimates are based on a soft credit inquiry and do not affect " +
        "your credit score. Final terms are set by the lender after a full application and hard credit inquiry.",
    },
  ];
  if (lender.isFirstParty) {
    items.push({
      label: "OppFi product",
      text: "This product is offered by OppFi. Availability and rates vary by state. See lender site for full terms.",
    });
  }
  if (lender.isSponsored) {
    items.push({
      label: "Sponsored placement",
      text: "This is a paid partner placement. It is featured for visibility and is not ranked by rate.",
    });
  }
  return items;
}

/** Map one mock lender into a NormalizedOffer for this lead, or null if it can't serve them. */
export function buildOffer(lender: MockLender, lead: Lead): NormalizedOffer | null {
  const odds = computeOdds(lead.creditBand, lender.serves);
  if (odds === "unknown") return null; // don't surface offers the lead clearly won't get

  const apr = aprForBand(lender, lead.creditBand);
  if (!apr) return null;

  const amount = clampAmount(lead.amount, lender.amount);
  const est =
    lender.term > 0 ? monthlyPayment(amount, midpoint(apr), lender.term) : Math.round((amount * (midpoint(apr) / 100)) / 12);

  return {
    id: `${lender.id}:${lead.vertical}`,
    vertical: lender.vertical,
    lender: {
      name: lender.name,
      logoText: lender.logoText,
      brandColor: lender.brandColor,
      rating: lender.rating,
    },
    apr: { min: apr[0], max: apr[1], type: lender.vertical === "card" ? "variable" : "fixed" },
    term: { months: lender.term },
    amountRange: { min: lender.amount[0], max: lender.amount[1] },
    estMonthlyPayment: est,
    approvalOdds: odds,
    // First-party offers route through the Orbit → OppFi handoff endpoint (which
    // mints a signed prefill token and tracks the click). External offers link out
    // directly to the lender/aggregator.
    applyUrl: lender.isFirstParty
      ? `/handoff/oppfi?offer=${encodeURIComponent(lender.id)}&amt=${amount}`
      : lender.applyUrl,
    disclosures: buildDisclosures(lender, apr, amount),
    highlights: lender.highlights,
    fundingSpeed: lender.fundingSpeed,
    source: lender.source,
    sourceTier: lender.sourceTier,
    isSponsored: lender.isSponsored,
    isFirstParty: lender.isFirstParty,
  };
}

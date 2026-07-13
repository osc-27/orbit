// ── Orbit offer layer: the canonical internal shapes ─────────────────────────
// Every source (OppFi first-party, Engine network, direct partners) is an
// adapter that maps INTO these types. The UI and orchestrator never know or
// care where an offer came from — only its `source`, `sourceTier`, and flags.

export type Vertical = "personal" | "auto" | "card" | "student-refi" | "home";

export type CreditBand = "excellent" | "good" | "fair" | "poor";

export type ApprovalOdds = "excellent" | "good" | "fair" | "unknown";

/** first-party = OppFi's own products; the rest are external supply tiers. */
export type SourceTier = "first-party" | "direct-premium" | "network" | "overflow";

export type SourceId = "oppfi" | "engine" | `partner:${string}`;

export interface Lead {
  vertical: Vertical;
  goal?: string;
  amount: number;
  creditBand: CreditBand;
  zip?: string;
  // Contact/identity — mock only in this build; never persisted or sent anywhere.
  firstName?: string;
  lastName?: string;
  email?: string;
  consent: boolean;
}

export interface Disclosure {
  label: string;
  text: string;
}

export interface NormalizedOffer {
  id: string;
  vertical: Vertical;
  lender: {
    name: string;
    /** short initials used to render a logo chip without external assets */
    logoText: string;
    brandColor: string;
    rating?: number;
  };
  apr: { min: number; max: number; type: "fixed" | "variable" };
  term: { months: number };
  amountRange: { min: number; max: number };
  estMonthlyPayment: number;
  approvalOdds: ApprovalOdds;
  applyUrl: string;
  disclosures: Disclosure[];
  highlights: string[];
  fundingSpeed: string;

  // ── provenance & compliance (baked in from day one) ──
  source: SourceId;
  sourceTier: SourceTier;
  /** UI must label; the sort must never be described as "best" because of it. */
  isSponsored: boolean;
  isFirstParty: boolean;
}

export interface OfferResult {
  /** First-party (OppFi) offers the lead actually qualifies for. Labeled, featured. */
  featured: NormalizedOffer[];
  /** External market offers, honestly sorted. */
  market: NormalizedOffer[];
  meta: {
    sortBasis: string;
    sources: string[];
    generatedAt: string;
    lead: Pick<Lead, "vertical" | "amount" | "creditBand">;
  };
}

/** One interface per source of inventory. This is the whole extensibility story. */
export interface OfferAdapter {
  id: string;
  label: string;
  getOffers(lead: Lead): Promise<NormalizedOffer[]>;
}

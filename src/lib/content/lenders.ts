// ── Lender review content (mock) ─────────────────────────────────────────────
// SEO/trust pages. OppLoans is the first-party flagship; others are illustrative.

export interface LenderReview {
  slug: string;
  name: string;
  logoText: string;
  brandColor: string;
  isFirstParty?: boolean;
  rating: number;
  reviewCount: number;
  tagline: string;
  facts: { apr: string; amount: string; term: string; funding: string; minCredit: string };
  ourTake: string;
  bestFor: string;
  pros: string[];
  cons: string[];
  rates: { label: string; value: string }[];
  compare: { feature: string; self: string; a: string; b: string }[];
}

export const LENDER_REVIEWS: LenderReview[] = [
  {
    slug: "opploans",
    name: "OppLoans",
    logoText: "OL",
    brandColor: "#005AFF",
    isFirstParty: true,
    rating: 4.8,
    reviewCount: 12400,
    tagline: "A credit-building alternative to payday loans",
    facts: {
      apr: "59% – 160%",
      amount: "$500 – $4,000",
      term: "9 – 18 months",
      funding: "Next business day",
      minCredit: "None",
    },
    ourTake:
      "OppLoans stands out as a premier alternative to payday loans for consumers with limited or poor credit history. Unlike traditional high-interest lenders, OppLoans reports your payments to the major credit bureaus, making it a strategic choice for credit building. Transparent terms and fast funding provide a much-needed safety net without the predatory traps typical of the subprime market.",
    bestFor:
      "Borrowers often rejected by traditional banks — ideal if you have a credit score below 600 or no credit history at all, but a steady income.",
    pros: [
      "Reports to all three credit bureaus",
      "No credit score requirement for approval",
      "Funding as soon as the next business day",
      "No prepayment penalty",
    ],
    cons: ["APRs significantly higher than bank loans", "Small maximum loan amount ($4,000)", "Not available in all 50 states"],
    rates: [
      { label: "APR range", value: "59.00% – 160.00%" },
      { label: "Origination fee", value: "$0 (no hidden fees)" },
      { label: "Late fee", value: "Varies by state (usually $0 or nominal)" },
      { label: "Prepayment penalty", value: "None" },
    ],
    compare: [
      { feature: "Max APR", self: "160%", a: "399%", b: "199%" },
      { feature: "Reports to bureaus", self: "Yes (all 3)", a: "No", b: "Partial" },
      { feature: "Funding speed", self: "Next day", a: "Same day", b: "2–3 days" },
    ],
  },
  {
    slug: "sofi",
    name: "SoFi",
    logoText: "SF",
    brandColor: "#00A0DF",
    rating: 4.8,
    reviewCount: 8900,
    tagline: "Low rates for strong-credit borrowers",
    facts: {
      apr: "8.99% – 22.99%",
      amount: "$5,000 – $100,000",
      term: "24 – 84 months",
      funding: "Same day possible",
      minCredit: "680+",
    },
    ourTake:
      "SoFi is a top pick for prime borrowers, with no required fees and member perks. Rates are among the most competitive in the market for those with excellent credit.",
    bestFor: "Borrowers with good-to-excellent credit seeking a large, low-rate loan.",
    pros: ["No required fees", "Unemployment protection", "Large loan amounts"],
    cons: ["Needs strong credit", "Not built for thin files"],
    rates: [
      { label: "APR range", value: "8.99% – 22.99%" },
      { label: "Origination fee", value: "$0 (optional)" },
      { label: "Late fee", value: "None" },
      { label: "Prepayment penalty", value: "None" },
    ],
    compare: [
      { feature: "Min credit", self: "680", a: "None", b: "640" },
      { feature: "Max amount", self: "$100k", a: "$4k", b: "$50k" },
      { feature: "Lowest APR", self: "8.99%", a: "59%", b: "14.99%" },
    ],
  },
  {
    slug: "upstart",
    name: "Upstart",
    logoText: "UP",
    brandColor: "#3FB68B",
    rating: 4.7,
    reviewCount: 15200,
    tagline: "AI underwriting that looks beyond your score",
    facts: {
      apr: "9.99% – 35.99%",
      amount: "$1,000 – $50,000",
      term: "36 – 60 months",
      funding: "Next business day",
      minCredit: "300 / none",
    },
    ourTake:
      "Upstart uses AI-driven underwriting that considers education and employment, so it can approve thinner or fair-credit files that traditional models decline.",
    bestFor: "Fair-credit or thin-file borrowers who may be declined elsewhere.",
    pros: ["Accepts thinner credit files", "Fast funding", "Considers more than your score"],
    cons: ["Can carry origination fees", "Higher end of APR range for fair credit"],
    rates: [
      { label: "APR range", value: "9.99% – 35.99%" },
      { label: "Origination fee", value: "0% – 12%" },
      { label: "Late fee", value: "$15 or 5%" },
      { label: "Prepayment penalty", value: "None" },
    ],
    compare: [
      { feature: "Min credit", self: "300", a: "None", b: "680" },
      { feature: "Approves thin files", self: "Yes", a: "Yes", b: "No" },
      { feature: "Funding", self: "Next day", a: "Next day", b: "Same day" },
    ],
  },
];

export function lenderReviewBySlug(slug: string): LenderReview | undefined {
  return LENDER_REVIEWS.find((l) => l.slug === slug);
}

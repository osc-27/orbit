// ── Lane B: curated catalog ──────────────────────────────────────────────────
// Browse-and-click inventory with no lead and no soft pull — gig platforms,
// sponsored one-offs, and partners with no prequal API. In production this is
// CMS-managed so the SEO/partnerships team publishes without engineering. Here
// it's a static mock.

export interface CatalogItem {
  id: string;
  name: string;
  logoText: string;
  brandColor: string;
  category: "Earn income" | "Build credit" | "Save & bank" | "Partner perk";
  blurb: string;
  tag?: string;
  ctaLabel: string;
  url: string;
  sponsored?: boolean;
}

export const CATALOG: CatalogItem[] = [
  {
    id: "impact-gig",
    name: "Impact Gig Network",
    logoText: "IM",
    brandColor: "#0AA2AA",
    category: "Earn income",
    blurb: "Flexible gig and delivery work matched to your area. Start earning this week.",
    tag: "Popular",
    ctaLabel: "Explore gigs",
    url: "https://example.com/impact",
  },
  {
    id: "oppu",
    name: "OppU Financial Education",
    logoText: "OU",
    brandColor: "#067A80",
    category: "Build credit",
    blurb: "Free, gamified courses on budgeting, credit, and borrowing — no strings attached.",
    tag: "Free",
    ctaLabel: "Start learning",
    url: "https://www.opploans.com/oppu/",
  },
  {
    id: "instacart-shopper",
    name: "Instacart Shopper",
    logoText: "IC",
    brandColor: "#43B02A",
    category: "Earn income",
    blurb: "Shop and deliver groceries on your own schedule. Weekly pay.",
    ctaLabel: "Sign up",
    url: "https://example.com/instacart",
  },
  {
    id: "chime-spot",
    name: "Chime Checking",
    logoText: "CH",
    brandColor: "#1EC677",
    category: "Save & bank",
    blurb: "Fee-free checking with early direct deposit and no minimum balance.",
    ctaLabel: "Open account",
    url: "https://example.com/chime",
    sponsored: true,
  },
  {
    id: "experian-boost",
    name: "Experian Boost",
    logoText: "EX",
    brandColor: "#4B2A8B",
    category: "Build credit",
    blurb: "Add utility and streaming payments to your credit file — instantly, for free.",
    ctaLabel: "Boost my score",
    url: "https://example.com/experian",
  },
  {
    id: "upside-cashback",
    name: "Upside Cash Back",
    logoText: "UP",
    brandColor: "#00C08B",
    category: "Partner perk",
    blurb: "Earn real cash back on gas, groceries, and dining you already buy.",
    tag: "Partner",
    ctaLabel: "Get cash back",
    url: "https://example.com/upside",
    sponsored: true,
  },
];

export const CATALOG_CATEGORIES = [
  "Earn income",
  "Build credit",
  "Save & bank",
  "Partner perk",
] as const;

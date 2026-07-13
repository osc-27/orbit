import type { Vertical } from "../offers/types";

export interface VerticalMeta {
  slug: Vertical;
  href: string;
  label: string;
  short: string;
  headline: string;
  blurb: string;
  icon: string; // inline emoji-free glyph handled in UI; keep a keyword
  available: boolean;
}

export const VERTICALS: VerticalMeta[] = [
  {
    slug: "personal",
    href: "/loans/personal",
    label: "Personal Loans",
    short: "Personal",
    headline: "Personal loans that fit real life",
    blurb: "Consolidate debt, cover an emergency, or fund a big expense. Compare real prequalified rates in minutes.",
    icon: "wallet",
    available: true,
  },
  {
    slug: "auto",
    href: "/loans/auto",
    label: "Auto",
    short: "Auto",
    headline: "Auto financing and refinancing",
    blurb: "Shop rates to buy or refinance a vehicle without touching your credit score.",
    icon: "car",
    available: true,
  },
  {
    slug: "card",
    href: "/loans/card",
    label: "Credit Cards",
    short: "Cards",
    headline: "Cards that move your credit forward",
    blurb: "Find a card matched to your profile — including credit-building options for thinner files.",
    icon: "card",
    available: true,
  },
  {
    slug: "student-refi",
    href: "/loans/student-refi",
    label: "Student Refi",
    short: "Student",
    headline: "Refinance student debt",
    blurb: "See whether refinancing could lower your rate. Coming soon to Orbit.",
    icon: "cap",
    available: false,
  },
  {
    slug: "home",
    href: "/loans/home",
    label: "Home",
    short: "Home",
    headline: "Home financing",
    blurb: "Purchase, refinance, and home-equity options. Coming soon to Orbit.",
    icon: "home",
    available: false,
  },
];

export const GOALS: { id: string; label: string; vertical: Vertical; amount: number }[] = [
  { id: "consolidate", label: "Consolidate debt", vertical: "personal", amount: 10000 },
  { id: "emergency", label: "Cover an emergency", vertical: "personal", amount: 2500 },
  { id: "big-purchase", label: "Fund a big purchase", vertical: "personal", amount: 5000 },
  { id: "build-credit", label: "Build my credit", vertical: "card", amount: 1000 },
  { id: "car", label: "Buy or refinance a car", vertical: "auto", amount: 15000 },
];

export function verticalBySlug(slug: string): VerticalMeta | undefined {
  return VERTICALS.find((v) => v.slug === slug);
}

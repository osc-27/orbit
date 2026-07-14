// ── Editorial content (mock) ─────────────────────────────────────────────────
// The SEO team's surface. In production this is CMS-managed.

export type ArticleCategory = "Credit" | "Borrowing" | "Budgeting" | "Debt";

export interface ArticleBlock {
  type: "p" | "h2" | "quote" | "callout";
  text: string;
}

export interface Article {
  slug: string;
  title: string;
  category: ArticleCategory;
  excerpt: string;
  readMins: number;
  author: string;
  date: string;
  tone: "brand" | "navy" | "amber";
  body: ArticleBlock[];
}

const GENERIC_BODY: ArticleBlock[] = [
  { type: "p", text: "Understanding how the pieces fit together is the first step to making a confident money decision. Here's a plain-English walkthrough." },
  { type: "h2", text: "The basics" },
  { type: "p", text: "Lenders look at a handful of signals to decide what to offer you. Knowing what they are puts you in control of the conversation." },
  { type: "callout", text: "Checking your rate through a marketplace like Orbit uses a soft inquiry — it never affects your credit score." },
  { type: "h2", text: "What to do next" },
  { type: "p", text: "Compare a few real, prequalified offers before you commit. A two-minute check can save you meaningful money over the life of a loan." },
];

export const ARTICLES: Article[] = [
  {
    slug: "how-loans-affect-credit",
    title: "How personal loans affect your credit score",
    category: "Credit",
    excerpt: "Applying, borrowing, and repaying all move your score in different directions. Here's what actually happens.",
    readMins: 6,
    author: "The Orbit Team",
    date: "March 2026",
    tone: "brand",
    body: [
      { type: "p", text: "A personal loan can help or hurt your credit — it depends entirely on how you use it. Let's break down each stage so there are no surprises." },
      { type: "h2", text: "Shopping for a loan: soft vs. hard inquiries" },
      { type: "p", text: "When you check your rate through a marketplace, lenders run a soft inquiry — it shows your likely terms without touching your score. A hard inquiry only happens later, when you formally apply with a chosen lender, and it typically dings your score a few points for a short time." },
      { type: "callout", text: "Tip: rate-shopping within a short window is usually treated as a single inquiry by scoring models, so comparing offers won't stack up damage." },
      { type: "h2", text: "Taking the loan: a new account + a credit-mix boost" },
      { type: "p", text: "A new installment loan adds to your credit mix, which can help. It also lowers your credit utilization if you use it to pay off revolving card debt — often the single biggest positive move." },
      { type: "quote", text: "The fastest way to improve a fair score is usually to lower card utilization — not to open more cards." },
      { type: "h2", text: "Repaying: the part that matters most" },
      { type: "p", text: "Payment history is the largest factor in your score. On-time payments, reported to all three bureaus, are what build credit over time. Lenders like OppLoans report your payments specifically so responsible borrowing counts." },
      { type: "h2", text: "The bottom line" },
      { type: "p", text: "Used well, a personal loan is a credit-building tool. Compare prequalified offers with a soft inquiry, pick terms you can comfortably repay, and let on-time payments do the work." },
    ],
  },
  {
    slug: "debt-consolidation-explained",
    title: "Debt consolidation, explained simply",
    category: "Debt",
    excerpt: "Rolling multiple balances into one payment can lower your rate and your stress. Here's when it makes sense.",
    readMins: 5,
    author: "The Orbit Team",
    date: "March 2026",
    tone: "navy",
    body: GENERIC_BODY,
  },
  {
    slug: "understanding-apr",
    title: "APR vs. interest rate: what's the difference?",
    category: "Borrowing",
    excerpt: "They're not the same number — and knowing which is which can save you real money.",
    readMins: 4,
    author: "The Orbit Team",
    date: "February 2026",
    tone: "amber",
    body: GENERIC_BODY,
  },
  {
    slug: "build-credit-from-scratch",
    title: "How to build credit from scratch",
    category: "Credit",
    excerpt: "No credit history? Here are the fastest, safest ways to start building one.",
    readMins: 7,
    author: "The Orbit Team",
    date: "February 2026",
    tone: "brand",
    body: GENERIC_BODY,
  },
  {
    slug: "budgeting-that-sticks",
    title: "A budget that actually sticks",
    category: "Budgeting",
    excerpt: "Most budgets fail because they're too strict. Try this flexible framework instead.",
    readMins: 5,
    author: "The Orbit Team",
    date: "January 2026",
    tone: "navy",
    body: GENERIC_BODY,
  },
];

export const ARTICLE_CATEGORIES: ArticleCategory[] = ["Credit", "Borrowing", "Budgeting", "Debt"];

export function articleBySlug(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}

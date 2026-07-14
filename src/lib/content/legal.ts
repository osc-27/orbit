// ── Legal/trust content (MOCK placeholder) ──────────────────────────────────
// Placeholder copy for the preview build — NOT real legal language. Replace with
// counsel-reviewed documents before launch.

export interface LegalDoc {
  slug: string;
  title: string;
  updated: string;
  intro: string;
  sections: { h: string; p: string[] }[];
}

export const LEGAL_DOCS: LegalDoc[] = [
  {
    slug: "privacy",
    title: "Privacy Policy",
    updated: "March 2026",
    intro: "This policy explains what information Orbit collects, how we use it, and the choices you have.",
    sections: [
      { h: "Information we collect", p: ["Information you provide when you check your rate (such as name, contact details, and the financial details needed to match you with offers).", "Automatically collected data such as device and usage information."] },
      { h: "How we use it", p: ["To match you with prequalified offers, to operate and improve Orbit, and — with your consent — to send you offer summaries and rate alerts."] },
      { h: "Sharing", p: ["We share the information needed to generate your offers with the lenders and partners you're matched with. We do not sell your personal information."] },
      { h: "Your choices", p: ["You can unsubscribe from marketing at any time and request access to or deletion of your data, subject to applicable law."] },
    ],
  },
  {
    slug: "terms",
    title: "Terms of Use",
    updated: "March 2026",
    intro: "By using Orbit, you agree to these terms.",
    sections: [
      { h: "The service", p: ["Orbit is a financial-product marketplace, not a lender. We connect you with third-party lenders and partners. We do not make credit decisions."] },
      { h: "No guarantee of offers", p: ["Prequalified estimates are not offers of credit and are not guaranteed. Final terms are determined by the lender after a full application."] },
      { h: "Acceptable use", p: ["You agree to provide accurate information and to use Orbit only for lawful purposes."] },
    ],
  },
  {
    slug: "e-consent",
    title: "E-Sign Consent",
    updated: "March 2026",
    intro: "Your consent to receive records and disclosures electronically.",
    sections: [
      { h: "Electronic records", p: ["By agreeing, you consent to receive communications, disclosures, and records electronically rather than on paper."] },
      { h: "Withdrawing consent", p: ["You may withdraw consent at any time; doing so may limit your ability to use certain features."] },
      { h: "System requirements", p: ["You'll need a device with internet access and a current browser to view and retain electronic records."] },
    ],
  },
  {
    slug: "disclosures",
    title: "Disclosures & Licensing",
    updated: "March 2026",
    intro: "Important disclosures about how Orbit operates.",
    sections: [
      { h: "Not a lender / broker role", p: ["Orbit is a marketplace and, where applicable, a broker. Orbit does not lend money or make credit decisions, and does not broker loans initiated through certain third-party network partners."] },
      { h: "Compensation", p: ["Orbit may be compensated by lenders and partners when you obtain a product through the marketplace. Featured placements are paid. This does not change the APR-based ordering of market results."] },
      { h: "State availability", p: ["Products and availability vary by state, and Orbit may not operate in every state. Some products (for example, OppLoans) are offered by lending partners such as FinWise Bank, Member FDIC, and are subject to state law."] },
      { h: "Credit impact", p: ["Checking your rate uses a soft inquiry and does not affect your credit score. A hard inquiry occurs only when you formally apply with a chosen lender."] },
    ],
  },
];

export function legalDocBySlug(slug: string): LegalDoc | undefined {
  return LEGAL_DOCS.find((d) => d.slug === slug);
}

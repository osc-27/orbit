import Link from "next/link";
import { Logo } from "./ui/Logo";
import { VERTICALS } from "@/lib/content/verticals";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-line bg-paper">
      <div className="wrap grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <div className="text-brand">
            <Logo height={28} />
          </div>
          <p className="mt-3 max-w-xs text-sm text-muted">
            Orbit is a financial-product marketplace by OppFi. We help you compare prequalified offers without
            affecting your credit score.
          </p>
        </div>
        <FooterCol title="Products" links={VERTICALS.map((v) => ({ label: v.label, href: v.href }))} />
        <FooterCol
          title="Company"
          links={[
            { label: "How Orbit works", href: "/about" },
            { label: "Orbit Marketplace", href: "/orbit" },
            { label: "Lender reviews", href: "/lenders" },
            { label: "Learn", href: "/learn" },
            { label: "Help & FAQ", href: "/help" },
          ]}
        />
        <FooterCol
          title="Legal"
          links={[
            { label: "Disclosures & Licensing", href: "/legal/disclosures" },
            { label: "Privacy Policy", href: "/legal/privacy" },
            { label: "Terms of Use", href: "/legal/terms" },
            { label: "E-Sign Consent", href: "/legal/e-consent" },
          ]}
        />
      </div>
      <div className="border-t border-line">
        <div className="wrap py-6 text-xs leading-relaxed text-muted">
          <p>
            Orbit is not a lender and does not make credit decisions. Prequalified estimates are based on a soft
            credit inquiry and do not affect your credit score. Rates, terms, and offers shown are illustrative mock
            data for this preview build and are not real offers. Actual terms are determined by the lender after a
            full application. OppFi products are offered by Opportunity Financial, LLC and its affiliates; availability
            and rates vary by state.
          </p>
          <p className="mt-3">© {new Date().getFullYear()} OppFi · Orbit. Preview build.</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-ink">{title}</h3>
      <ul className="mt-4 flex flex-col gap-2.5">
        {links.map((l) => (
          <li key={l.label}>
            <Link href={l.href} className="text-sm text-muted transition-colors hover:text-brand">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

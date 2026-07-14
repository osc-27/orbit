import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Layers, TrendingDown, CircleDollarSign } from "lucide-react";
import { getOffers } from "@/lib/offers/orchestrator";
import { OffersView } from "@/components/offers/OffersView";
import { SavingsCalculator } from "@/components/marketing/SavingsCalculator";
import { TrustWall } from "@/components/ui/TrustWall";

export const metadata: Metadata = {
  title: "Debt consolidation loans",
  description:
    "Consolidate multiple debts into one simple monthly payment. Compare prequalified debt-consolidation loans with no impact to your credit score.",
};

const FAQ = [
  {
    q: "Will consolidating hurt my credit?",
    a: "Checking your rate uses a soft inquiry, which doesn't affect your score. Consolidating can actually help over time by lowering your card utilization and building on-time payment history.",
  },
  { q: "What APR can I get?", a: "It depends on your credit profile, income, and state. Prequalify to see real, personalized rates in about two minutes." },
  { q: "How much can I borrow?", a: "Amounts vary by lender and profile. Orbit's partners offer consolidation loans across a wide range — compare offers to find your fit." },
  { q: "Is Orbit a lender?", a: "No. Orbit is a marketplace that matches you with lenders. You complete your application directly with the lender you choose." },
];

export default async function DebtConsolidationPage() {
  const sample = await getOffers({ vertical: "personal", amount: 10000, creditBand: "good", consent: true });

  return (
    <div>
      {/* hero */}
      <section className="wrap grid gap-10 py-14 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div>
          <p className="eyebrow">Debt consolidation</p>
          <h1 className="mt-3 text-4xl font-extrabold leading-[1.05] tracking-tight text-ink sm:text-5xl">
            Consolidate debt into <span className="text-brand">one simple payment.</span>
          </h1>
          <p className="mt-5 max-w-xl text-lg text-muted">
            Roll multiple balances into a single fixed monthly payment — often at a lower rate. Compare prequalified
            offers without touching your credit score.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Link href="/prequalify?goal=consolidate" className="btn-primary text-base">
              Check my rate <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <span className="inline-flex items-center gap-1.5 text-sm text-muted">
              <ShieldCheck className="h-4 w-4 text-accent" aria-hidden="true" /> Soft inquiry · no score impact
            </span>
          </div>
        </div>
        <SavingsCalculator />
      </section>

      <div className="wrap">
        <TrustWall />
      </div>

      {/* how it works */}
      <section className="wrap py-14">
        <h2 className="text-2xl font-extrabold tracking-tight text-ink">How consolidation works</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-3">
          {[
            { icon: Layers, t: "Combine your balances", b: "One new loan pays off your existing cards and debts." },
            { icon: TrendingDown, t: "Lower your rate", b: "Swap high card APRs for one fixed, often-lower rate." },
            { icon: CircleDollarSign, t: "One payment", b: "A single predictable monthly payment with an end date." },
          ].map((s, i) => (
            <div key={s.t} className="card p-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-tint text-brand-dark">
                <s.icon className="h-5 w-5" strokeWidth={1.9} aria-hidden="true" />
              </div>
              <h3 className="mt-4 flex items-center gap-2 text-lg font-bold text-ink">
                <span className="text-brand">{i + 1}.</span> {s.t}
              </h3>
              <p className="mt-1.5 text-sm text-muted">{s.b}</p>
            </div>
          ))}
        </div>
      </section>

      {/* sample offers */}
      <section className="wrap py-4">
        <div className="mb-6">
          <h2 className="text-2xl font-extrabold tracking-tight text-ink">A look at today&apos;s offers</h2>
          <p className="mt-1 text-sm text-muted">Sample results for a $10,000 consolidation loan. Prequalify for your real rates.</p>
        </div>
        <OffersView result={sample} />
      </section>

      {/* FAQ */}
      <section className="wrap py-14">
        <h2 className="text-2xl font-extrabold tracking-tight text-ink">Common questions</h2>
        <div className="mt-6 flex flex-col gap-3">
          {FAQ.map((f) => (
            <details key={f.q} className="card group p-5">
              <summary className="cursor-pointer list-none font-bold text-ink marker:content-none">
                <span className="flex items-center justify-between">
                  {f.q}
                  <span className="text-brand transition-transform group-open:rotate-45">+</span>
                </span>
              </summary>
              <p className="mt-2 text-sm text-muted">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* final CTA */}
      <section className="wrap pb-16">
        <div className="rounded-3xl bg-gradient-to-br from-brand-darker to-brand-dark p-8 text-center text-white sm:p-12">
          <h2 className="text-3xl font-extrabold tracking-tight">See what one payment could look like</h2>
          <p className="mx-auto mt-3 max-w-lg text-white/85">Two minutes, a soft inquiry, and real prequalified offers. No obligation.</p>
          <Link href="/prequalify?goal=consolidate" className="btn-accent mt-6 text-base">
            Check my rate <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </div>
  );
}

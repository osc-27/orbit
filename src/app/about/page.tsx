import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Sparkles, Scale, Store } from "lucide-react";

export const metadata: Metadata = {
  title: "How Orbit works",
  description: "Orbit is OppFi's financial marketplace — how we match you with offers, and how we make money.",
};

export default function AboutPage() {
  return (
    <div className="wrap-narrow py-14 sm:py-20">
      <p className="eyebrow">How Orbit works</p>
      <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-ink">A marketplace built to be on your side</h1>
      <p className="mt-4 text-lg text-muted">
        Orbit is OppFi&apos;s financial-product marketplace. We help you compare real, prequalified offers in minutes —
        and we&apos;re upfront about how it all works.
      </p>

      <div className="mt-10 flex flex-col gap-6">
        <Section icon={Sparkles} title="One soft-pull, many offers">
          Answer a few questions and we fan your request to OppFi and top lenders using a soft credit inquiry — so you
          see personalized rates without any hit to your credit score.
        </Section>
        <Section icon={Store} title="Two ways to reach your goal">
          Beyond loans, our Marketplace curates other ways to move forward — gig work, credit-building tools, and
          partner perks. Loans are a prequalified comparison; the marketplace is browse-and-go.
        </Section>
        <Section icon={Scale} title="Honest by design">
          We&apos;re a marketplace, not a lender. OppFi products are featured and clearly labeled — the rest of the
          market is sorted by APR, never by what a lender pays us. Sponsored placements are always marked.
        </Section>
      </div>

      <div className="mt-10 rounded-2xl bg-cloud p-6">
        <h2 className="font-bold text-ink">How we make money</h2>
        <p className="mt-2 text-sm text-muted">
          When you get a product through Orbit, the lender or partner may compensate us. That&apos;s how the service
          stays free for you. It never changes the APR-based ordering of market results — see our{" "}
          <Link href="/legal/disclosures" className="font-semibold text-brand hover:underline">
            disclosures
          </Link>
          .
        </p>
      </div>

      <Link href="/prequalify" className="btn-primary mt-10">
        Check my rate <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </Link>
    </div>
  );
}

function Section({
  icon: Icon,
  title,
  children,
}: {
  icon: typeof Sparkles;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="flex gap-4">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-tint text-brand-dark">
        <Icon className="h-5 w-5" strokeWidth={1.9} aria-hidden="true" />
      </div>
      <div>
        <h2 className="text-lg font-bold text-ink">{title}</h2>
        <p className="mt-1 text-muted">{children}</p>
      </div>
    </section>
  );
}

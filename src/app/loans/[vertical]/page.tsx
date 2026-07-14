import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import { verticalBySlug, VERTICALS } from "@/lib/content/verticals";
import { getOffers } from "@/lib/offers/orchestrator";
import { InlineOffers } from "@/components/offers/InlineOffers";
import { VerticalIcon } from "@/components/ui/VerticalIcon";
import type { Vertical } from "@/lib/offers/types";

const SAMPLE_AMOUNT: Record<string, number> = { personal: 10000, auto: 15000, card: 1000 };

export function generateStaticParams() {
  return VERTICALS.map((v) => ({ vertical: v.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ vertical: string }>;
}): Promise<Metadata> {
  const { vertical } = await params;
  const meta = verticalBySlug(vertical);
  if (!meta) return { title: "Not found" };
  return { title: meta.label, description: meta.blurb };
}

export default async function VerticalPage({ params }: { params: Promise<{ vertical: string }> }) {
  const { vertical } = await params;
  const meta = verticalBySlug(vertical);
  if (!meta) notFound();

  if (!meta.available) {
    return (
      <div className="wrap-narrow py-24 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-tint text-brand-dark">
          <VerticalIcon name={meta.icon} className="h-6 w-6" />
        </div>
        <h1 className="mt-5 text-3xl font-extrabold text-ink">{meta.label} — coming soon</h1>
        <p className="mx-auto mt-2 max-w-md text-muted">{meta.blurb}</p>
        <Link href="/" className="btn-ghost mt-6">
          Back home
        </Link>
      </div>
    );
  }

  const amount = SAMPLE_AMOUNT[meta.slug] ?? 5000;
  const sample = await getOffers({
    vertical: meta.slug as Vertical,
    amount,
    creditBand: "good",
    consent: true,
  });

  return (
    <div className="wrap py-12 sm:py-16">
      {/* editorial hero */}
      <div className="grid gap-8 lg:grid-cols-[1fr_360px] lg:items-start">
        <div>
          <p className="eyebrow">{meta.label}</p>
          <h1 className="mt-2 text-4xl font-extrabold leading-tight tracking-tight text-ink">{meta.headline}</h1>
          <p className="mt-4 max-w-xl text-lg text-muted">{meta.blurb}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href={`/prequalify?vertical=${meta.slug}`} className="btn-primary">
              Check my rate <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <span className="inline-flex items-center gap-1.5 self-center text-sm text-muted">
              <ShieldCheck className="h-4 w-4 text-accent" aria-hidden="true" /> Soft inquiry · no score impact
            </span>
          </div>
        </div>

        {/* editorial "best rate vs average" social proof, NerdWallet-style */}
        <aside className="card p-6">
          <div className="flex items-center gap-2 text-brand-dark">
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            <span className="text-xs font-bold uppercase tracking-wide">Best on Orbit today</span>
          </div>
          <div className="mt-4 flex items-end justify-between border-b border-line pb-4">
            <div>
              <div className="text-3xl font-extrabold text-brand-dark">
                {sample.market[0]?.apr.min.toFixed(2) ?? "—"}%
              </div>
              <div className="text-xs text-muted">Lowest market APR</div>
            </div>
            <div className="text-right">
              <div className="text-xl font-bold text-muted">24.99%</div>
              <div className="text-xs text-muted">Typical fair-credit APR</div>
            </div>
          </div>
          <p className="mt-4 text-xs leading-relaxed text-muted">
            Sample rates for a {`$${amount.toLocaleString()}`} request with good credit. Your rate depends on approval.
          </p>
        </aside>
      </div>

      {/* sample rate table */}
      <div className="mt-14">
        <div className="mb-6">
          <h2 className="text-2xl font-extrabold tracking-tight text-ink">A look at today&apos;s offers</h2>
          <p className="mt-1 text-sm text-muted">
            Adjust the amount and credit rating to update offers instantly. Prequalify to see your personalized rates.
          </p>
        </div>
        <InlineOffers vertical={meta.slug as Vertical} initialResult={sample} initialAmount={amount} />
      </div>
    </div>
  );
}

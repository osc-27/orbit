import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Star, Check, X, ShieldCheck } from "lucide-react";
import { LENDER_REVIEWS, lenderReviewBySlug } from "@/lib/content/lenders";
import { LenderLogo } from "@/components/offers/LenderLogo";
import { Breadcrumb } from "@/components/ui/Breadcrumb";

export function generateStaticParams() {
  return LENDER_REVIEWS.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const l = lenderReviewBySlug(slug);
  if (!l) return { title: "Not found" };
  return { title: `${l.name} review`, description: `${l.name} review — ${l.tagline}. Rates, terms, pros and cons.` };
}

export default async function LenderReviewPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const l = lenderReviewBySlug(slug);
  if (!l) notFound();

  return (
    <div className="wrap py-10 sm:py-14">
      <Breadcrumb items={[{ label: "Lenders", href: "/lenders" }, { label: `${l.name} review` }]} />

      {/* header */}
      <div className="card mt-4 p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <LenderLogo text={l.logoText} color={l.brandColor} size={56} />
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-ink">{l.name} Review</h1>
              <div className="mt-1 flex items-center gap-1.5 text-sm text-muted">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 text-warn"
                    fill={i < Math.round(l.rating) ? "currentColor" : "none"}
                    aria-hidden="true"
                  />
                ))}
                <span className="ml-1">
                  {l.rating.toFixed(1)} ({l.reviewCount.toLocaleString()} reviews)
                </span>
              </div>
            </div>
          </div>
          <Link href="/prequalify" className="btn-primary">
            Check your rate
          </Link>
        </div>
        <div className="mt-6 flex flex-wrap gap-2 border-t border-line pt-6">
          {[
            ["APR", l.facts.apr],
            ["Amount", l.facts.amount],
            ["Term", l.facts.term],
            ["Funding", l.facts.funding],
            ["Min credit", l.facts.minCredit],
          ].map(([k, v]) => (
            <span key={k} className="chip-neutral">
              <span className="text-muted">{k}:</span>&nbsp;<span className="text-ink">{v}</span>
            </span>
          ))}
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="flex flex-col gap-6">
          {/* our take */}
          <section className="card border-l-4 border-l-brand p-6">
            <h2 className="text-lg font-bold text-ink">Our take</h2>
            <p className="mt-2 text-muted">{l.ourTake}</p>
          </section>

          {/* pros / cons */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="card p-6">
              <h3 className="flex items-center gap-2 font-bold text-good">
                <Check className="h-5 w-5" aria-hidden="true" /> Pros
              </h3>
              <ul className="mt-3 flex flex-col gap-2">
                {l.pros.map((p) => (
                  <li key={p} className="flex items-start gap-2 text-sm text-ink">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-good" aria-hidden="true" /> {p}
                  </li>
                ))}
              </ul>
            </div>
            <div className="card p-6">
              <h3 className="flex items-center gap-2 font-bold text-crit">
                <X className="h-5 w-5" aria-hidden="true" /> Cons
              </h3>
              <ul className="mt-3 flex flex-col gap-2">
                {l.cons.map((c) => (
                  <li key={c} className="flex items-start gap-2 text-sm text-ink">
                    <X className="mt-0.5 h-4 w-4 shrink-0 text-crit" aria-hidden="true" /> {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* rates */}
          <section className="card p-6">
            <h2 className="text-lg font-bold text-ink">Rates and fees</h2>
            <dl className="mt-4 divide-y divide-line">
              {l.rates.map((r) => (
                <div key={r.label} className="flex justify-between py-3 text-sm">
                  <dt className="font-semibold text-ink">{r.label}</dt>
                  <dd className="text-muted">{r.value}</dd>
                </div>
              ))}
            </dl>
          </section>

          {/* compare */}
          <section className="card p-6">
            <h2 className="text-lg font-bold text-ink">How {l.name} compares</h2>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[420px] text-sm">
                <thead>
                  <tr className="text-left text-xs uppercase tracking-wide text-muted">
                    <th className="pb-2 font-medium">Feature</th>
                    <th className="pb-2 font-bold text-brand">{l.name}</th>
                    <th className="pb-2 font-medium">Lender A</th>
                    <th className="pb-2 font-medium">Lender B</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {l.compare.map((row) => (
                    <tr key={row.feature}>
                      <td className="py-3 font-semibold text-ink">{row.feature}</td>
                      <td className="py-3 font-bold text-brand">{row.self}</td>
                      <td className="py-3 text-muted">{row.a}</td>
                      <td className="py-3 text-muted">{row.b}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>

        {/* rail */}
        <aside className="flex flex-col gap-4">
          <div className="card sticky top-24 overflow-hidden">
            <div className="bg-gradient-to-br from-brand-darker to-brand-dark p-5 text-white">
              <p className="text-xs font-bold uppercase tracking-wide text-brand-tint">Who it&apos;s best for</p>
              <p className="mt-2 text-sm text-white/90">{l.bestFor}</p>
            </div>
            <div className="p-5">
              <Link href="/prequalify" className="btn-primary w-full">
                Check your rate
              </Link>
              <p className="mt-3 flex items-center gap-1.5 text-xs text-muted">
                <ShieldCheck className="h-4 w-4 text-accent" aria-hidden="true" /> Soft inquiry · no score impact
              </p>
            </div>
          </div>
        </aside>
      </div>

      <p className="mt-8 text-xs text-muted">
        Orbit may be compensated when you get a loan through our marketplace. Reviews reflect our editorial
        assessment. Figures are illustrative mock data for this preview.
      </p>
    </div>
  );
}

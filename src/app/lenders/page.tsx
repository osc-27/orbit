import type { Metadata } from "next";
import Link from "next/link";
import { Star, ArrowRight } from "lucide-react";
import { LENDER_REVIEWS } from "@/lib/content/lenders";
import { LenderLogo } from "@/components/offers/LenderLogo";

export const metadata: Metadata = {
  title: "Lender reviews",
  description: "Independent reviews of the lenders and partners in the Orbit marketplace.",
};

export default function LendersIndexPage() {
  return (
    <div className="wrap py-12 sm:py-16">
      <header className="max-w-2xl">
        <p className="eyebrow">Lender reviews</p>
        <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-ink">Know before you borrow</h1>
        <p className="mt-4 text-lg text-muted">
          Straight-talking reviews of the lenders in our marketplace — rates, terms, pros and cons, and who each
          one is really for.
        </p>
      </header>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {LENDER_REVIEWS.map((l) => (
          <Link
            key={l.slug}
            href={`/lenders/${l.slug}`}
            className="card group flex flex-col p-6 transition-all hover:-translate-y-0.5 hover:border-brand hover:shadow-[var(--shadow-lift)]"
          >
            <div className="flex items-center gap-3">
              <LenderLogo text={l.logoText} color={l.brandColor} />
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-bold text-ink">{l.name}</h2>
                  {l.isFirstParty && <span className="chip-brand">OppFi</span>}
                </div>
                <div className="flex items-center gap-1 text-xs text-muted">
                  <Star className="h-3.5 w-3.5 text-warn" fill="currentColor" aria-hidden="true" />
                  {l.rating.toFixed(1)} · {(l.reviewCount / 1000).toFixed(1)}k reviews
                </div>
              </div>
            </div>
            <p className="mt-3 flex-1 text-sm text-muted">{l.tagline}</p>
            <div className="mt-4 flex items-center justify-between text-sm">
              <span className="font-semibold text-ink">APR {l.facts.apr}</span>
              <span className="inline-flex items-center gap-1 font-semibold text-brand group-hover:gap-2">
                Read review <ArrowRight className="h-4 w-4 transition-all" aria-hidden="true" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

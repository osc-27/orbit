import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { ARTICLES, ARTICLE_CATEGORIES } from "@/lib/content/articles";
import { Placeholder } from "@/components/ui/Placeholder";

export const metadata: Metadata = {
  title: "Learn",
  description: "Plain-English money guidance from Orbit — credit, borrowing, budgeting, and debt.",
};

export default function LearnIndexPage() {
  const [featured, ...rest] = ARTICLES;
  return (
    <div className="wrap py-12 sm:py-16">
      <header className="max-w-2xl">
        <p className="eyebrow">Learn</p>
        <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-ink">Money guidance that actually helps</h1>
        <p className="mt-4 text-lg text-muted">
          No jargon, no upsell — just clear answers on credit, borrowing, and building a stronger financial life.
        </p>
      </header>

      {/* featured */}
      <Link
        href={`/learn/${featured.slug}`}
        className="card group mt-8 grid overflow-hidden md:grid-cols-2"
      >
        <Placeholder tone={featured.tone} label="Featured" className="h-full min-h-[220px]" ratio="auto" />
        <div className="flex flex-col justify-center p-7">
          <span className="chip-brand w-fit">{featured.category}</span>
          <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-ink">{featured.title}</h2>
          <p className="mt-2 text-muted">{featured.excerpt}</p>
          <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand group-hover:gap-2.5">
            Read article <ArrowRight className="h-4 w-4 transition-all" aria-hidden="true" />
          </span>
        </div>
      </Link>

      {/* category chips */}
      <div className="mt-10 flex flex-wrap gap-2">
        <span className="chip bg-brand text-white">All</span>
        {ARTICLE_CATEGORIES.map((c) => (
          <span key={c} className="chip-neutral">
            {c}
          </span>
        ))}
      </div>

      {/* grid */}
      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {rest.map((a) => (
          <Link
            key={a.slug}
            href={`/learn/${a.slug}`}
            className="card group flex flex-col overflow-hidden transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-lift)]"
          >
            <Placeholder tone={a.tone} label={a.category} />
            <div className="flex flex-1 flex-col p-5">
              <h3 className="font-bold text-ink">{a.title}</h3>
              <p className="mt-1 flex-1 text-sm text-muted">{a.excerpt}</p>
              <div className="mt-3 flex items-center gap-1.5 text-xs text-muted">
                <Clock className="h-3.5 w-3.5" aria-hidden="true" /> {a.readMins} min read
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* newsletter */}
      <div className="mt-14 rounded-2xl bg-gradient-to-br from-brand-darker to-brand-dark p-8 text-center text-white">
        <h2 className="text-2xl font-extrabold">Money tips, no noise</h2>
        <p className="mx-auto mt-2 max-w-md text-white/85">Occasional, genuinely useful guidance. Unsubscribe anytime.</p>
        <form className="mx-auto mt-5 flex max-w-md gap-2">
          <input type="email" placeholder="you@email.com" className="input flex-1" aria-label="Email address" />
          <button type="button" className="btn bg-white text-brand-dark hover:bg-brand-tint">
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
}

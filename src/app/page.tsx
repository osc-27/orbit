import Link from "next/link";
import {
  ShieldCheck,
  Zap,
  HeartHandshake,
  ArrowRight,
  Star,
  Sparkles,
  BookOpen,
  Store,
} from "lucide-react";
import { VERTICALS, GOALS } from "@/lib/content/verticals";
import { VerticalIcon } from "@/components/ui/VerticalIcon";
import { TrustWall } from "@/components/ui/TrustWall";

export default function HomePage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-brand-tint blur-3xl" aria-hidden="true" />
        <div className="wrap grid gap-10 py-16 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <p className="eyebrow">The OppFi marketplace</p>
            <h1 className="mt-3 text-4xl font-extrabold leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-6xl">
              Compare offers <span className="text-brand">built around you.</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg text-muted">
              See real, prequalified rates from OppFi and top lenders in minutes — with a soft inquiry that never
              touches your credit score.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link href="/prequalify" className="btn-primary text-base">
                Check my rate <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link href="/orbit" className="btn-ghost text-base">
                Browse the marketplace
              </Link>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted">
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-accent" aria-hidden="true" /> No credit score impact
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Star className="h-4 w-4 text-warn" aria-hidden="true" /> Excellent · 9,500+ reviews
              </span>
            </div>
          </div>

          {/* sample offer preview */}
          <HeroPreview />
        </div>
      </section>

      {/* ── Goal-based entry ── */}
      <section className="wrap pb-4">
        <h2 className="text-sm font-bold uppercase tracking-[0.14em] text-muted">I want to…</h2>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {GOALS.map((g) => (
            <Link
              key={g.id}
              href={`/prequalify?goal=${g.id}`}
              className="card group flex items-center justify-between p-4 transition-all hover:-translate-y-0.5 hover:border-brand hover:shadow-[var(--shadow-lift)]"
            >
              <span className="font-semibold text-ink">{g.label}</span>
              <ArrowRight className="h-4 w-4 text-muted transition-colors group-hover:text-brand" aria-hidden="true" />
            </Link>
          ))}
        </div>
      </section>

      {/* ── How it works ── */}
      <section id="how" className="wrap py-16">
        <div className="grid gap-6 sm:grid-cols-3">
          {[
            { icon: Zap, title: "Tell us your goal", body: "Answer a few questions. It takes about two minutes and uses only a soft credit check." },
            { icon: Sparkles, title: "Compare real offers", body: "We fan your request to OppFi and the market, then show prequalified rates side by side." },
            { icon: HeartHandshake, title: "Choose with confidence", body: "Pick the offer that fits and finish with that lender. No obligation, ever." },
          ].map((s, i) => (
            <div key={s.title} className="card p-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-tint text-brand-dark">
                <s.icon className="h-5 w-5" strokeWidth={1.9} aria-hidden="true" />
              </div>
              <h3 className="mt-4 flex items-center gap-2 text-lg font-bold text-ink">
                <span className="text-brand">{i + 1}.</span> {s.title}
              </h3>
              <p className="mt-1.5 text-sm text-muted">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Featured OppFi band ── */}
      <section className="wrap">
        <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-brand-darker to-brand-dark p-8 text-white sm:p-12">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-tint">From OppFi</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Built for real credit — not just perfect credit.
            </h2>
            <p className="mt-4 text-white/85">
              OppFi is the company behind Orbit. When you qualify, our OppLoans and Opp+ products are featured first —
              designed for the millions of people the prime market leaves behind.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/prequalify?goal=emergency" className="btn bg-white text-brand-dark hover:bg-brand-tint">
                See if you qualify
              </Link>
              <Link href="https://www.opploans.com/oppu/" className="btn border border-white/30 text-white hover:bg-white/10">
                Free financial education
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Trust wall ── */}
      <div className="wrap">
        <TrustWall heading="Our marketplace partners" />
      </div>

      {/* ── Verticals ── */}
      <section className="wrap py-16">
        <h2 className="text-2xl font-extrabold tracking-tight text-ink">Explore by product</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {VERTICALS.map((v) => (
            <Link
              key={v.slug}
              href={v.available ? v.href : "#"}
              aria-disabled={!v.available}
              className={`card group p-6 transition-all ${
                v.available ? "hover:-translate-y-0.5 hover:border-brand hover:shadow-[var(--shadow-lift)]" : "opacity-60"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cloud text-brand-dark">
                  <VerticalIcon name={v.icon} className="h-5 w-5" />
                </div>
                {!v.available && <span className="chip-neutral">Coming soon</span>}
              </div>
              <h3 className="mt-4 text-lg font-bold text-ink">{v.label}</h3>
              <p className="mt-1 text-sm text-muted">{v.blurb}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Marketplace + learn teasers ── */}
      <section className="wrap grid gap-4 pb-4 md:grid-cols-2">
        <TeaserCard
          icon={Store}
          eyebrow="Orbit Marketplace"
          title="More ways to reach your goal"
          body="Beyond loans — gig work, credit-building tools, and partner perks, all curated in one place."
          href="/orbit"
          cta="Browse the marketplace"
        />
        <TeaserCard
          icon={BookOpen}
          eyebrow="Learn"
          title="Money guidance that actually helps"
          body="Plain-English guides on credit, borrowing, and budgeting from OppU — free and unlocked."
          href="https://www.opploans.com/oppu/"
          cta="Start learning"
        />
      </section>
    </>
  );
}

function HeroPreview() {
  return (
    <div className="relative mx-auto w-full max-w-md">
      <div className="card overflow-hidden">
        <div className="flex items-center justify-between bg-brand px-5 py-2.5 text-white">
          <span className="text-xs font-bold uppercase tracking-[0.14em]">From OppFi · Featured</span>
          <span className="rounded-full bg-white/20 px-2 py-0.5 text-xs font-bold">Excellent odds</span>
        </div>
        <div className="p-5">
          <div className="flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand text-lg font-extrabold text-white">OL</span>
            <div>
              <div className="font-bold text-ink">OppLoans Installment Loan</div>
              <div className="text-xs text-muted">★ 4.8 · Next-day funding</div>
            </div>
          </div>
          <div className="mt-5 grid grid-cols-3 gap-3">
            <Stat label="Est. APR" value="59–99%" strong />
            <Stat label="Est. / mo" value="$188" />
            <Stat label="Amount" value="$4,000" />
          </div>
          <div className="mt-5 h-11 rounded-full bg-brand text-center text-sm font-semibold leading-[2.75rem] text-white">
            Continue with OppFi
          </div>
        </div>
      </div>
      <div className="card mt-3 flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#00A0DF] text-sm font-bold text-white">SF</span>
          <div>
            <div className="text-sm font-bold text-ink">SoFi</div>
            <div className="text-xs text-muted">Network · sorted by APR</div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-base font-extrabold text-ink">8.99%</div>
          <div className="text-xs text-muted">APR from</div>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return (
    <div>
      <div className="text-[11px] font-semibold uppercase tracking-wide text-muted">{label}</div>
      <div className={strong ? "text-lg font-extrabold text-brand-dark" : "text-base font-bold text-ink"}>{value}</div>
    </div>
  );
}

function TeaserCard({
  icon: Icon,
  eyebrow,
  title,
  body,
  href,
  cta,
}: {
  icon: typeof Store;
  eyebrow: string;
  title: string;
  body: string;
  href: string;
  cta: string;
}) {
  return (
    <Link href={href} className="card group flex flex-col p-7 transition-all hover:border-brand hover:shadow-[var(--shadow-lift)]">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-tint text-brand-dark">
        <Icon className="h-5 w-5" strokeWidth={1.9} aria-hidden="true" />
      </div>
      <p className="mt-4 eyebrow">{eyebrow}</p>
      <h3 className="mt-1 text-xl font-bold text-ink">{title}</h3>
      <p className="mt-1.5 text-sm text-muted">{body}</p>
      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand group-hover:gap-2.5">
        {cta} <ArrowRight className="h-4 w-4 transition-all" aria-hidden="true" />
      </span>
    </Link>
  );
}

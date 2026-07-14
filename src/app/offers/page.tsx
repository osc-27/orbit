"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { Loader2, RotateCcw, SlidersHorizontal } from "lucide-react";
import { OffersView } from "@/components/offers/OffersView";
import { EmailCapture } from "@/components/marketing/EmailCapture";
import { verticalBySlug } from "@/lib/content/verticals";
import { currency } from "@/lib/format";
import type { OfferResult, Lead } from "@/lib/offers/types";

type Phase = "loading" | "ready" | "nolead";

const SOURCES = ["OppFi", "Engine network", "Direct partners"];

export default function OffersPage() {
  const [phase, setPhase] = useState<Phase>("loading");
  const [result, setResult] = useState<OfferResult | null>(null);
  const [lead, setLead] = useState<Lead | null>(null);

  useEffect(() => {
    let raw: string | null = null;
    try {
      raw = sessionStorage.getItem("orbit.lead");
    } catch {
      /* ignore */
    }
    if (!raw) {
      setPhase("nolead");
      return;
    }
    try {
      setLead(JSON.parse(raw) as Lead);
    } catch {
      setPhase("nolead");
      return;
    }

    (async () => {
      const [res] = await Promise.all([
        fetch("/api/offers", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: raw as string,
        }).then((r) => r.json() as Promise<OfferResult>),
        new Promise((resolve) => setTimeout(resolve, 1100)), // let the "checking" state read
      ]);
      setResult(res);
      setPhase("ready");
    })();
  }, []);

  if (phase === "nolead") {
    return (
      <div className="wrap-narrow py-20 text-center">
        <h1 className="text-2xl font-bold text-ink">Let&apos;s find your offers</h1>
        <p className="mx-auto mt-2 max-w-md text-muted">
          Answer a few quick questions and we&apos;ll show your prequalified matches — a soft inquiry that won&apos;t
          affect your credit.
        </p>
        <Link href="/prequalify" className="btn-primary mt-6">
          Check my rate
        </Link>
      </div>
    );
  }

  if (phase === "loading") {
    return (
      <div className="wrap-narrow py-24">
        <div className="mx-auto max-w-sm text-center">
          <Loader2 className="mx-auto h-8 w-8 animate-spin text-brand" aria-hidden="true" />
          <h1 className="mt-4 text-xl font-bold text-ink">Checking your matches…</h1>
          <p className="mt-1 text-sm text-muted">Polling our sources for your prequalified rate table.</p>
          <ul className="mt-6 flex flex-col gap-2 text-left">
            {SOURCES.map((s, i) => (
              <motion.li
                key={s}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.28 }}
                className="flex items-center gap-3 rounded-xl border border-line bg-paper px-4 py-2.5 text-sm font-medium text-ink"
              >
                <span className="h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
                {s}
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  const v = lead ? verticalBySlug(lead.vertical) : undefined;

  return (
    <div className="wrap py-10 sm:py-14">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow">Your prequalified offers</p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-ink">
            {v?.label ?? "Offers"} · {lead ? currency(lead.amount) : ""}
          </h1>
          {lead && (
            <p className="mt-1 flex items-center gap-2 text-sm text-muted">
              <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
              Based on {creditLabel(lead.creditBand)} credit · soft inquiry, no score impact
            </p>
          )}
        </div>
        <Link href="/prequalify" className="btn-ghost">
          <RotateCcw className="h-4 w-4" aria-hidden="true" /> Start over
        </Link>
      </div>

      {result && (
        <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
          <OffersView result={result} showFeaturedEmptyNote />
          <aside className="hidden lg:block">
            <div className="sticky top-24 flex flex-col gap-4">
              <div className="card p-5">
                <h2 className="text-sm font-bold uppercase tracking-wide text-brand-dark">How Orbit works</h2>
                <ol className="mt-3 flex flex-col gap-3 text-sm text-muted">
                  <li><span className="font-semibold text-ink">1.</span> We fan your soft-pull lead to OppFi + the market.</li>
                  <li><span className="font-semibold text-ink">2.</span> OppFi products are featured; the market is sorted by APR.</li>
                  <li><span className="font-semibold text-ink">3.</span> You pick an offer and finish with that lender.</li>
                </ol>
                <p className="mt-4 border-t border-line pt-3 text-xs text-muted">
                  Not a lender. Featured OppFi placement is paid. Market sort is by APR, not payout.
                </p>
              </div>
              <EmailCapture />
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}

function creditLabel(band: string): string {
  return { excellent: "excellent", good: "good", fair: "fair", poor: "building" }[band] ?? band;
}

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { CompareTable } from "@/components/offers/CompareTable";
import { RankingInfo } from "@/components/offers/RankingInfo";
import type { OfferResult, Lead, NormalizedOffer } from "@/lib/offers/types";

const DEFAULT_LEAD: Lead = { vertical: "personal", amount: 2500, creditBand: "good", consent: true };

export default function ComparePage() {
  const [offers, setOffers] = useState<NormalizedOffer[] | null>(null);

  useEffect(() => {
    let lead: Lead = DEFAULT_LEAD;
    try {
      const raw = sessionStorage.getItem("orbit.lead");
      if (raw) lead = JSON.parse(raw) as Lead;
    } catch {
      /* use default */
    }
    (async () => {
      const res: OfferResult = await fetch("/api/offers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lead),
      }).then((r) => r.json());
      const picked = [...res.featured.slice(0, 1), ...res.market.slice(0, 2)].filter(Boolean);
      setOffers(picked);
    })();
  }, []);

  return (
    <div className="wrap py-10 sm:py-14">
      <nav className="flex items-center gap-1.5 text-sm text-muted">
        <Link href="/orbit" className="hover:text-brand">
          Marketplace
        </Link>
        <span aria-hidden="true">›</span>
        <span className="font-semibold text-ink">Compare Offers</span>
      </nav>
      <div className="mt-3 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-ink">Compare personal loan offers</h1>
          <p className="mt-1 text-muted">
            {offers ? `Comparing ${offers.length} offers side by side.` : "Loading your offers…"}
          </p>
        </div>
        {offers && <RankingInfo sortBasis="How we rank" />}
      </div>

      <div className="mt-8">
        {!offers ? (
          <div className="flex items-center justify-center py-24">
            <Loader2 className="h-7 w-7 animate-spin text-brand" aria-hidden="true" />
          </div>
        ) : (
          <CompareTable offers={offers} />
        )}
      </div>

      <p className="mt-6 max-w-3xl text-xs leading-relaxed text-muted">
        <span className="font-semibold text-ink">Our ranking methodology:</span> we rank offers by a combination of
        APR, funding speed, and historical approval rates for your credit profile. Offers labeled &quot;Featured&quot;
        may provide compensation to Orbit. Best-value markers reflect the actual figures shown, not paid placement.
        Checking your rate is a soft inquiry and does not affect your credit score.
      </p>
    </div>
  );
}

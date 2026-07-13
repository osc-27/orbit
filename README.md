# Orbit

An OppFi financial-product marketplace. Engine-first, tiered-hybrid, built on a
**source-agnostic offer layer** so no single supplier owns the surface.

> Preview build — all offers are **mock data**. Swap in the live Engine
> rate-table client behind the adapter interface and nothing else changes.

## Stack

- **Next.js 15** (App Router) + **TypeScript** + **Tailwind CSS v4**
- `react-hook-form` + `zod` (prequal funnel), `lucide-react` (icons), `motion` (transitions)
- Brand DNA inherited from OppLoans (teal / green, airy, rounded)

## Architecture

```
Lead ─▶ Orchestrator ─▶ [ adapters ] ─▶ NormalizedOffer[]
                          ├─ oppfi        (first-party, featured module)
                          ├─ engine       (mock; replace with rate-table API)
                          └─ partner:*    (direct one-off partnerships)
                        │
                        ├─ featured  → OppFi offers the lead qualifies for (labeled)
                        └─ market    → external offers, sorted by APR (disclosed basis)
```

Key files:

| Path | Role |
| --- | --- |
| `src/lib/offers/types.ts` | Canonical `NormalizedOffer` / `Lead` shapes |
| `src/lib/offers/adapters/*` | One adapter per source (swap `engine.ts` for the real API) |
| `src/lib/offers/orchestrator.ts` | Fan-out, dedupe, OppFi-first split |
| `src/lib/offers/rank.ts` | **Honest** market sort (by APR, never by payout) |
| `src/app/api/offers/route.ts` | POST endpoint the funnel calls |

## Compliance posture (baked in)

- Soft-pull only upstream; hard pull deferred to the chosen lender.
- OppFi self-preferencing lives in a **labeled "From OppFi" module**, gated by
  approval odds — never blended into the market list under a "best" claim.
- `isSponsored` / `sourceTier` on every offer so the UI labels honestly.
- Disclosures travel **with** each offer, not as page chrome.

## Run

```bash
npm install
npm run dev      # http://localhost:3000
```

## Routes

- `/` — home (goal entry, how-it-works, featured OppFi, teasers)
- `/prequalify` — multi-step soft-pull funnel
- `/offers` — live results (OppFi featured + ranked market)
- `/loans/[vertical]` — SEO category landing with sample rate table
- `/orbit` — Lane B curated marketplace (gig, credit tools, perks)

## TODO (next)

- Replace `engine.ts` mock with the live Engine `POST /leads/rateTables` client.
- Move Lane B catalog + editorial to a headless CMS for the SEO team.
- Wire analytics (funnel steps, offer impressions, outbound clicks).

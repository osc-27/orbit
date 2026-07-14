# Engine by MoneyLion — integration blueprint

Measured from Lantern by SoFi (lanterncredit.com), which runs on Engine, so Orbit
can wire Engine the same proven way. Lantern's own disclosure: _"operated by SoFi
Lending Corp. in cooperation with Engine by MoneyLion."_

## Architecture (how it actually works)

**No Engine-hosted iframe.** Lantern renders its **own responsive UI** and calls a
**first-party backend proxy** that talks to Engine server-side (keeping keys off the
client). Observed calls:

```
GET  /lantern_backend_service/v2/auth              → 200   (session/auth token)
POST /lantern_backend_service/v2/even/rate-table   → 200   (the Engine rate table)
```

→ **Orbit already matches this**: browser → `POST /api/offers` (our proxy) →
orchestrator → `engineAdapter`. When live, the engine adapter calls Engine's
`POST /leads/rateTables` and polls `GET /rateTables` until `pendingResponses` empties.
Nothing in the Orbit UI changes.

## Rate-table request inputs (what Engine needs)

From Lantern's filter widget (instant re-query on "Update offers"):

| Field | Example | Orbit `Lead` field |
| --- | --- | --- |
| Loan amount | `15000` | `amount` |
| Loan purpose | `debt_consolidation` | `goal` → add `purpose` |
| Zip code | `94105` | `zip` |
| Credit rating band | `Good (660–719)` | `creditBand` |
| (PII at lead step) | name, email | `firstName/lastName/email` |

**Credit bands (align Orbit to these exact ranges):**
Poor 300–619 · Fair 620–659 · Good 660–719 · Excellent 720–850.

## Rate-table response (offer shape)

Each offer card observed carries: lender name + logo, star rating + review count,
APR, monthly payment, term, loan amount, an apply/Get-Started URL, and a TILA-style
assumption line (e.g. _"$342 monthly payment assumes $15,000 loan with 20.975% APR
over 84 months."_). → Maps 1:1 to Orbit `NormalizedOffer` + `OfferRow`.

## Two surfaces (both worth building)

1. **Inline filter + rate table** on category pages — amount / purpose / zip / credit
   slider with an "Update offers" button that re-queries instantly. (Orbit: add an
   inline re-query to `/loans/[vertical]`.)
2. **Dedicated lead flow** at `/lead/personal-loan/new/...` — minimal brand chrome
   (logo + progress), steps for purpose/amount/details, ending in **email + ESIGN /
   Privacy / Terms / Arbitration consent** with "pre-fill my application." (Orbit:
   `/prequalify` already this shape.)

## What to change in Orbit to be Engine-ready

- [x] Backend proxy (`/api/offers`) + adapter seam — done.
- [ ] Align `creditBand` ranges to Engine's (Fair 620–659, Poor 300–619).
- [ ] Add `purpose` to `Lead` and pass it to the engine adapter request.
- [ ] Add an inline "Update offers" re-query widget on category pages.
- [ ] Replace `engineAdapter` mock body with the real `/leads/rateTables` client +
      poll loop when `ORBIT_ENGINE_API_URL/_KEY` are set.

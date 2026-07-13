import type { CreditBand, ApprovalOdds } from "./types";

/** Standard amortized monthly payment. r is the ANNUAL rate as a percentage. */
export function monthlyPayment(principal: number, annualRatePct: number, months: number): number {
  const r = annualRatePct / 100 / 12;
  if (r === 0) return principal / months;
  const m = (principal * r) / (1 - Math.pow(1 + r, -months));
  return Math.round(m);
}

export const BAND_ORDER: CreditBand[] = ["excellent", "good", "fair", "poor"];

export function bandIndex(band: CreditBand): number {
  return BAND_ORDER.indexOf(band);
}

/**
 * Approval odds heuristic. A lender's `serves` list is ordered from its core
 * band outward. If the lead's band is the lender's first served band → excellent;
 * present but not first → good; one step outside the served range → fair;
 * further out → unknown (the offer is dropped upstream).
 */
export function computeOdds(leadBand: CreditBand, serves: CreditBand[]): ApprovalOdds {
  if (serves.length === 0) return "unknown";
  const li = bandIndex(leadBand);
  const servedIdx = serves.map(bandIndex);
  const min = Math.min(...servedIdx);
  const max = Math.max(...servedIdx);
  if (li === servedIdx[0]) return "excellent";
  if (li >= min && li <= max) return "good";
  if (li === min - 1 || li === max + 1) return "fair";
  return "unknown";
}

export function clampAmount(requested: number, range: [number, number]): number {
  return Math.min(Math.max(requested, range[0]), range[1]);
}

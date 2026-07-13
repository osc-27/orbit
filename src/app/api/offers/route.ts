import { NextResponse } from "next/server";
import { getOffers } from "@/lib/offers/orchestrator";
import type { Lead, CreditBand, Vertical } from "@/lib/offers/types";

const VERTICALS: Vertical[] = ["personal", "auto", "card", "student-refi", "home"];
const BANDS: CreditBand[] = ["excellent", "good", "fair", "poor"];

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const b = body as Partial<Lead>;
  const vertical = VERTICALS.includes(b.vertical as Vertical) ? (b.vertical as Vertical) : "personal";
  const creditBand = BANDS.includes(b.creditBand as CreditBand) ? (b.creditBand as CreditBand) : "good";
  const amount = typeof b.amount === "number" && b.amount > 0 ? b.amount : 5000;

  const lead: Lead = {
    vertical,
    creditBand,
    amount,
    goal: typeof b.goal === "string" ? b.goal : undefined,
    zip: typeof b.zip === "string" ? b.zip : undefined,
    firstName: typeof b.firstName === "string" ? b.firstName : undefined,
    lastName: typeof b.lastName === "string" ? b.lastName : undefined,
    email: typeof b.email === "string" ? b.email : undefined,
    consent: Boolean(b.consent),
  };

  const result = await getOffers(lead);
  return NextResponse.json(result);
}

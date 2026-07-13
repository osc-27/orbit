import { NextResponse, type NextRequest } from "next/server";
import { LENDERS } from "@/lib/offers/lenders";
import { signHandoffToken, buildOppLoansDeepLink } from "@/lib/oppfi/handoff";
import { track } from "@/lib/analytics/track";

// GET /handoff/oppfi?offer=<id>&amt=<amount>
// Mints a signed handoff token, records the outbound click, and 302-redirects
// into the OppLoans application flow with prefill context. This is the live
// integration seam between Orbit and OppFi's own pages.
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const offerId = searchParams.get("offer") ?? "";
  const amount = Number(searchParams.get("amt") ?? "0");

  const product = LENDERS.find((l) => l.id === offerId && l.isFirstParty);
  if (!product) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  const token = await signHandoffToken({ product: product.id, amount, vertical: product.vertical });
  track({ name: "handoff.oppfi.click", props: { product: product.id, amount } });

  const destination = buildOppLoansDeepLink({ productId: product.id, amount, token });
  return NextResponse.redirect(destination, 302);
}

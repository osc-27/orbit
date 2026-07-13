import { SignJWT, jwtVerify, type JWTPayload } from "jose";

// ── OppFi handoff ────────────────────────────────────────────────────────────
// When a user picks an OppFi product in Orbit, we hand them off to the OppLoans
// application flow with a SIGNED token so the destination can trust the context
// (product + requested amount) and prefill without the user re-entering data.
// PII is deliberately NOT placed in the URL — the token carries only non-personal
// context; the receiving app resolves the session server-side.

const ISSUER = "orbit";
const AUDIENCE = "oppfi-apply";

function secret(): Uint8Array {
  const s = process.env.ORBIT_HANDOFF_SECRET ?? "dev-only-secret-change-me";
  return new TextEncoder().encode(s);
}

export interface HandoffClaims extends JWTPayload {
  product: string;
  amount: number;
  vertical?: string;
}

export async function signHandoffToken(input: { product: string; amount: number; vertical?: string }): Promise<string> {
  return new SignJWT({ product: input.product, amount: input.amount, vertical: input.vertical })
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setIssuedAt()
    .setIssuer(ISSUER)
    .setAudience(AUDIENCE)
    .setExpirationTime("15m")
    .sign(secret());
}

/** The receiving side (OppLoans) would verify like this before prefilling. */
export async function verifyHandoffToken(token: string): Promise<HandoffClaims> {
  const { payload } = await jwtVerify(token, secret(), { issuer: ISSUER, audience: AUDIENCE });
  return payload as HandoffClaims;
}

const OPPLOANS_APPLY_BASE = process.env.ORBIT_OPPLOANS_APPLY_URL ?? "https://www.opploans.com/";

export function buildOppLoansDeepLink(input: { productId: string; amount: number; token: string }): string {
  const url = new URL(OPPLOANS_APPLY_BASE);
  url.searchParams.set("utm_source", "orbit");
  url.searchParams.set("utm_medium", "marketplace");
  url.searchParams.set("utm_campaign", "oppfi-handoff");
  url.searchParams.set("product", input.productId);
  if (input.amount > 0) url.searchParams.set("amount", String(input.amount));
  url.searchParams.set("orbit_token", input.token); // signed, non-PII context
  return url.toString();
}

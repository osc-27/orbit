// ── Analytics ────────────────────────────────────────────────────────────────
// Minimal server-side event sink. Swap the body for a real destination
// (Segment, GA4 Measurement Protocol, an internal events endpoint) without
// changing call sites. Funnel steps, offer impressions, and outbound/handoff
// clicks all flow through here.

export interface OrbitEvent {
  name:
    | "funnel.step"
    | "offers.viewed"
    | "offer.outbound_click"
    | "handoff.oppfi.click";
  props?: Record<string, string | number | boolean | undefined>;
}

export function track(event: OrbitEvent): void {
  // eslint-disable-next-line no-console
  console.log("[orbit:event]", event.name, JSON.stringify(event.props ?? {}));
}

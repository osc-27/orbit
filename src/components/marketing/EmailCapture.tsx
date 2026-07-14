"use client";

import { useState } from "react";
import { Mail, Check } from "lucide-react";

// Lightweight re-marketing hook that replaces accounts for launch: capture an
// email (with consent) so we can send the offer summary + rate alerts. No login,
// minimal PII, ~80% of the retention value at ~5% of the compliance cost.
export function EmailCapture({
  variant = "card",
}: {
  variant?: "card" | "inline";
}) {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const valid = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!valid) return;
    // Mock: in production, POST to a consented marketing endpoint.
    setDone(true);
  }

  return (
    <div
      className={
        variant === "card"
          ? "card flex flex-col gap-3 bg-brand-tint/50 p-5"
          : "flex flex-col gap-3"
      }
    >
      <div className="flex items-center gap-2 text-brand-dark">
        <Mail className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
        <h3 className="text-sm font-bold">Email me these offers</h3>
      </div>
      {done ? (
        <p className="flex items-center gap-2 text-sm font-semibold text-good">
          <Check className="h-4 w-4" aria-hidden="true" /> Sent. Check your inbox for your offer summary.
        </p>
      ) : (
        <>
          <form onSubmit={submit} className="flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@email.com"
              className="input flex-1"
              aria-label="Email address"
            />
            <button type="submit" disabled={!valid} className="btn-primary px-4 py-2 text-sm">
              Send
            </button>
          </form>
          <p className="text-[11px] leading-relaxed text-muted">
            We&apos;ll email your offer summary and occasional rate alerts. No spam, unsubscribe anytime. This
            won&apos;t affect your credit score.
          </p>
        </>
      )}
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";

// Privacy-forward consent bar: "Decline non-essential" carries equal weight to
// "Accept all" (no dark pattern). Remembers the choice locally.
export function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem("orbit.consent")) setShow(true);
    } catch {
      /* ignore */
    }
  }, []);

  function decide(value: "all" | "essential") {
    try {
      localStorage.setItem("orbit.consent", value);
    } catch {
      /* ignore */
    }
    setShow(false);
  }

  if (!show) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-paper/95 backdrop-blur-md">
      <div className="wrap flex flex-col items-center gap-3 py-3.5 sm:flex-row sm:justify-between">
        <p className="text-xs text-muted sm:max-w-2xl">
          We use cookies to run Orbit and improve your experience. You can accept all, or keep only what&apos;s
          essential.{" "}
          <a href="/legal/privacy" className="font-semibold text-brand hover:underline">
            Manage preferences
          </a>
          .
        </p>
        <div className="flex shrink-0 items-center gap-2">
          <button type="button" onClick={() => decide("essential")} className="btn-ghost px-4 py-2 text-xs">
            Decline non-essential
          </button>
          <button type="button" onClick={() => decide("all")} className="btn-primary px-4 py-2 text-xs">
            Accept all
          </button>
        </div>
      </div>
    </div>
  );
}

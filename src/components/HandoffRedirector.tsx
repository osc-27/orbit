"use client";

import { useEffect } from "react";

// Forwards to the signed handoff route after a brief branded pause.
export function HandoffRedirector({ to, delay = 1700 }: { to: string; delay?: number }) {
  useEffect(() => {
    const t = setTimeout(() => {
      window.location.href = to;
    }, delay);
    return () => clearTimeout(t);
  }, [to, delay]);
  return null;
}

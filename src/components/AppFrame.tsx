"use client";

import { usePathname } from "next/navigation";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";

// Lantern-style chrome control: the qualification flow runs in a minimal branded
// shell (logo + progress only, no site nav), because — like Lantern wrapping
// Engine — the questions and offers are loaded by the flow itself. Everything
// else gets the full marketing chrome.
const CHROMELESS_PREFIXES = ["/prequalify", "/continue"];

export function AppFrame({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const bare = CHROMELESS_PREFIXES.some((p) => pathname?.startsWith(p));

  if (bare) return <main>{children}</main>;

  return (
    <>
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
    </>
  );
}

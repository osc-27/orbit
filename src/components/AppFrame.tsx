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

  if (bare) return <main id="main-content">{children}</main>;

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-brand focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        Skip to content
      </a>
      <SiteHeader />
      <main id="main-content">{children}</main>
      <SiteFooter />
    </>
  );
}

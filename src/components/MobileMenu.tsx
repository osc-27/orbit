"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Logo } from "./ui/Logo";

const LINKS = [
  { label: "Personal Loans", href: "/loans/personal" },
  { label: "Auto", href: "/loans/auto" },
  { label: "Credit Cards", href: "/loans/card" },
  { label: "Marketplace", href: "/orbit" },
  { label: "Learn", href: "/learn" },
  { label: "Lender reviews", href: "/lenders" },
  { label: "How Orbit works", href: "/about" },
  { label: "Help & FAQ", href: "/help" },
];

export function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        className="flex h-10 w-10 items-center justify-center rounded-lg text-ink hover:bg-cloud"
      >
        <Menu className="h-6 w-6" aria-hidden="true" />
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex flex-col bg-paper" role="dialog" aria-modal="true" aria-label="Menu">
          <div className="flex h-16 items-center justify-between border-b border-line px-5">
            <span className="text-brand">
              <Logo height={28} />
            </span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="flex h-10 w-10 items-center justify-center rounded-lg text-ink hover:bg-cloud"
            >
              <X className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-5 py-5">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-lg font-semibold text-ink hover:bg-cloud"
              >
                {l.label}
              </Link>
            ))}
            <Link href="/prequalify" onClick={() => setOpen(false)} className="btn-primary mt-4 w-full text-base">
              Check my rate
            </Link>
          </nav>
        </div>
      )}
    </div>
  );
}

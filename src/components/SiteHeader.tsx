import Link from "next/link";
import { Logo } from "./ui/Logo";
import { VERTICALS } from "@/lib/content/verticals";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/85 backdrop-blur-md">
      <div className="wrap flex h-16 items-center justify-between gap-4">
        <Link href="/" className="text-brand" aria-label="Orbit home">
          <Logo height={28} />
        </Link>
        <nav className="hidden items-center gap-6 md:flex" aria-label="Primary">
          {VERTICALS.filter((v) => v.available).map((v) => (
            <Link
              key={v.slug}
              href={v.href}
              className="text-sm font-medium text-muted transition-colors hover:text-brand"
            >
              {v.label}
            </Link>
          ))}
          <Link href="/orbit" className="text-sm font-medium text-muted transition-colors hover:text-brand">
            Orbit Marketplace
          </Link>
        </nav>
        <div className="flex items-center gap-3">
          <Link href="/prequalify" className="btn-primary text-sm">
            Check my rate
          </Link>
        </div>
      </div>
    </header>
  );
}

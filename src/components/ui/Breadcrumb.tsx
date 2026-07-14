import Link from "next/link";
import { ChevronRight } from "lucide-react";

export function Breadcrumb({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-muted">
      {items.map((it, i) => (
        <span key={it.label} className="flex items-center gap-1.5">
          {it.href ? (
            <Link href={it.href} className="hover:text-brand">
              {it.label}
            </Link>
          ) : (
            <span className="font-semibold text-ink">{it.label}</span>
          )}
          {i < items.length - 1 && <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />}
        </span>
      ))}
    </nav>
  );
}

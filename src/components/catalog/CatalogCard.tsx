import { ArrowUpRight } from "lucide-react";
import type { CatalogItem } from "@/lib/catalog/data";
import { LenderLogo } from "@/components/offers/LenderLogo";

export function CatalogCard({ item }: { item: CatalogItem }) {
  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="card group flex flex-col p-5 transition-all hover:-translate-y-0.5 hover:border-brand hover:shadow-[var(--shadow-lift)]"
    >
      <div className="flex items-start justify-between">
        <LenderLogo text={item.logoText} color={item.brandColor} />
        <div className="flex items-center gap-1.5">
          {item.tag && <span className="chip-brand">{item.tag}</span>}
          {item.sponsored && <span className="chip bg-[#fbefe1] text-[#b56a1e]">Sponsored</span>}
        </div>
      </div>
      <h3 className="mt-4 font-bold text-ink">{item.name}</h3>
      <p className="mt-1 flex-1 text-sm text-muted">{item.blurb}</p>
      <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand group-hover:gap-2">
        {item.ctaLabel} <ArrowUpRight className="h-4 w-4 transition-all" aria-hidden="true" />
      </span>
    </a>
  );
}

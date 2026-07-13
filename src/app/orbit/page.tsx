import type { Metadata } from "next";
import { CATALOG, CATALOG_CATEGORIES } from "@/lib/catalog/data";
import { CatalogCard } from "@/components/catalog/CatalogCard";

export const metadata: Metadata = {
  title: "Orbit Marketplace",
  description:
    "More ways to reach your money goals — gig work, credit-building tools, banking, and partner perks, curated by OppFi.",
};

export default function OrbitMarketplacePage() {
  return (
    <div className="wrap py-12 sm:py-16">
      <header className="max-w-2xl">
        <p className="eyebrow">Orbit Marketplace</p>
        <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-ink">More ways to reach your goal</h1>
        <p className="mt-4 text-lg text-muted">
          Beyond loans. A curated set of ways to earn more, build credit, bank smarter, and unlock partner perks —
          hand-picked by OppFi. No credit check to browse.
        </p>
      </header>

      <div className="mt-12 flex flex-col gap-12">
        {CATALOG_CATEGORIES.map((category) => {
          const items = CATALOG.filter((i) => i.category === category);
          if (items.length === 0) return null;
          return (
            <section key={category}>
              <h2 className="text-sm font-bold uppercase tracking-[0.14em] text-brand-dark">{category}</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((item) => (
                  <CatalogCard key={item.id} item={item} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}

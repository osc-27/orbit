import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LEGAL_DOCS, legalDocBySlug } from "@/lib/content/legal";

export function generateStaticParams() {
  return LEGAL_DOCS.map((d) => ({ doc: d.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ doc: string }> }): Promise<Metadata> {
  const { doc } = await params;
  const d = legalDocBySlug(doc);
  return { title: d ? d.title : "Not found" };
}

export default async function LegalDocPage({ params }: { params: Promise<{ doc: string }> }) {
  const { doc } = await params;
  const d = legalDocBySlug(doc);
  if (!d) notFound();

  return (
    <div className="wrap-narrow py-12 sm:py-16">
      <p className="text-xs font-semibold uppercase tracking-wide text-muted">Last updated {d.updated}</p>
      <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-ink">{d.title}</h1>
      <p className="mt-3 text-lg text-muted">{d.intro}</p>

      <div className="mt-8 flex flex-col gap-8">
        {d.sections.map((s) => (
          <section key={s.h}>
            <h2 className="text-lg font-bold text-ink">{s.h}</h2>
            <div className="mt-2 flex flex-col gap-2">
              {s.p.map((para, i) => (
                <p key={i} className="text-muted">
                  {para}
                </p>
              ))}
            </div>
          </section>
        ))}
      </div>

      <p className="mt-12 rounded-xl bg-cloud p-4 text-xs text-muted">
        This is placeholder content for a preview build and is not legal advice or a final agreement. Production
        documents will be reviewed by counsel.
      </p>
    </div>
  );
}

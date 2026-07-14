import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock, ArrowRight } from "lucide-react";
import { ARTICLES, articleBySlug } from "@/lib/content/articles";
import { Placeholder } from "@/components/ui/Placeholder";
import { Breadcrumb } from "@/components/ui/Breadcrumb";

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const a = articleBySlug(slug);
  if (!a) return { title: "Not found" };
  return { title: a.title, description: a.excerpt };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = articleBySlug(slug);
  if (!article) notFound();

  const related = ARTICLES.filter((a) => a.slug !== article.slug).slice(0, 3);

  return (
    <div className="wrap-narrow py-10 sm:py-14">
      <Breadcrumb items={[{ label: "Learn", href: "/learn" }, { label: article.category }]} />

      <header className="mt-4">
        <span className="chip-brand">{article.category}</span>
        <h1 className="mt-3 text-4xl font-extrabold leading-tight tracking-tight text-ink">{article.title}</h1>
        <div className="mt-3 flex items-center gap-3 text-sm text-muted">
          <span>{article.author}</span>
          <span aria-hidden="true">·</span>
          <span>{article.date}</span>
          <span aria-hidden="true">·</span>
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" aria-hidden="true" /> {article.readMins} min read
          </span>
        </div>
      </header>

      <Placeholder tone={article.tone} label={article.category} className="mt-6 rounded-xl" ratio="21 / 9" />

      <article className="mt-8 flex flex-col gap-5">
        {article.body.map((block, i) => {
          if (block.type === "h2")
            return (
              <h2 key={i} className="mt-4 text-2xl font-bold tracking-tight text-ink">
                {block.text}
              </h2>
            );
          if (block.type === "quote")
            return (
              <blockquote key={i} className="border-l-4 border-brand pl-4 text-lg font-semibold italic text-brand-dark">
                {block.text}
              </blockquote>
            );
          if (block.type === "callout")
            return (
              <p key={i} className="rounded-xl bg-brand-tint/60 p-4 text-sm font-medium text-brand-darker">
                {block.text}
              </p>
            );
          return (
            <p key={i} className="text-[17px] leading-relaxed text-ink/90">
              {block.text}
            </p>
          );
        })}
      </article>

      {/* inline CTA */}
      <div className="my-10 flex flex-col items-center gap-3 rounded-2xl border border-line bg-cloud p-6 text-center sm:flex-row sm:justify-between sm:text-left">
        <div>
          <h3 className="font-bold text-ink">See your real rate in 2 minutes</h3>
          <p className="text-sm text-muted">Soft inquiry — it won&apos;t affect your credit score.</p>
        </div>
        <Link href="/prequalify" className="btn-primary shrink-0">
          Check my rate
        </Link>
      </div>

      {/* related */}
      <section>
        <h2 className="text-lg font-bold text-ink">Keep reading</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {related.map((a) => (
            <Link key={a.slug} href={`/learn/${a.slug}`} className="card group p-5">
              <span className="text-xs font-semibold uppercase tracking-wide text-brand">{a.category}</span>
              <h3 className="mt-1 font-bold text-ink group-hover:text-brand">{a.title}</h3>
              <span className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-brand">
                Read <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

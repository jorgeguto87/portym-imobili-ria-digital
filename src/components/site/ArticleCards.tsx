import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import type { ArticleSummary } from "@/lib/blogApi";

export const fmtDate = (d: string | null) =>
  d ? new Date(d).toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric", timeZone: "America/Sao_Paulo" }) : "";

export function ArticleCard({ a }: { a: ArticleSummary }) {
  return (
    <Link to="/blog/$slug" params={{ slug: a.slug }} className="group flex flex-col rounded-[24px] border border-border bg-card p-6 shadow-soft transition hover:-translate-y-1">
      {a.publishedAt && <span className="text-xs font-semibold text-primary">{fmtDate(a.publishedAt)}</span>}
      <h3 className="mt-2 text-lg font-bold leading-snug">{a.title}</h3>
      <p className="mt-2 line-clamp-3 flex-1 text-sm text-muted-foreground">{a.excerpt}</p>
      <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">
        Ler artigo <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}

/** "Últimos artigos" (home) e "Artigos relacionados" (páginas de funcionalidade). Some se não houver artigos. */
export function ArticleStrip({ title, eyebrow, articles }: { title: string; eyebrow: string; articles: ArticleSummary[] }) {
  if (!articles?.length) return null;
  return (
    <section className="py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">{eyebrow}</p>
            <h2 className="mt-2 font-display text-3xl font-extrabold sm:text-4xl">{title}</h2>
          </div>
          <Link to="/blog" className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
            Ver todos os artigos <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-3">{articles.map((a) => <ArticleCard key={a.slug} a={a} />)}</div>
      </div>
    </section>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { pageHead } from "@/lib/seo";
import { SITE } from "@/content/site";
import { getBlogList } from "@/lib/blogApi";
import { ArticleCard } from "@/components/site/ArticleCards";
import { PageHero, Section } from "@/components/site/ui";

export const Route = createFileRoute("/blog/")({
  loader: () => getBlogList(),
  head: ({ loaderData }) => {
    const h = pageHead({
      title: "Blog Portym — Gestão imobiliária na prática",
      description: "Artigos sobre gestão de locação, cobrança de aluguel, repasse, CRM e atendimento no WhatsApp para corretores e imobiliárias.",
      path: "/blog",
      breadcrumbs: [{ name: "Blog", path: "/blog" }],
      jsonLd: loaderData?.ok
        ? [{ "@context": "https://schema.org", "@type": "Blog", name: "Blog Portym", url: `${SITE.url}/blog`, blogPost: loaderData.articles.slice(0, 20).map((a) => ({ "@type": "BlogPosting", headline: a.title, url: `${SITE.url}/blog/${a.slug}`, datePublished: a.publishedAt, dateModified: a.updatedAt })) }]
        : [],
    });
    return { ...h, links: [...h.links, { rel: "alternate", type: "application/rss+xml", title: "Blog Portym", href: `${SITE.url}/blog/rss.xml` }] };
  },
  component: Blog,
});

const fold = (s: string) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

function Blog() {
  const data = Route.useLoaderData();
  const [q, setQ] = useState("");
  const list = data.articles.filter((p) => fold(`${p.title} ${p.excerpt}`).includes(fold(q)));
  return (
    <>
      <PageHero title="Blog Portym" subtitle="Ideias práticas para corretores e imobiliárias organizarem a carteira, cobrarem em dia e atenderem melhor." />
      <Section>
        {!data.ok ? (
          <p className="mx-auto max-w-xl rounded-[24px] border border-border bg-card p-8 text-center text-muted-foreground">Os artigos estão temporariamente indisponíveis. Voltamos em instantes.</p>
        ) : (
          <>
            <div className="mb-8">
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar artigos" aria-label="Buscar artigos" className="w-full max-w-md rounded-full border border-input bg-card px-5 py-3" />
            </div>
            {list.length ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{list.map((a) => <ArticleCard key={a.slug} a={a} />)}</div>
            ) : (
              <p className="text-muted-foreground">{data.articles.length ? "Nenhum artigo encontrado com essa busca." : "Em breve, os primeiros artigos."}</p>
            )}
          </>
        )}
      </Section>
    </>
  );
}

import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { pageHead } from "@/lib/seo";
import { SITE } from "@/content/site";
import { getBlogArticle } from "@/lib/blogApi";
import { fmtDate } from "@/components/site/ArticleCards";
import { CtaButton, PageHero, Section } from "@/components/site/ui";

export const Route = createFileRoute("/blog/$slug")({
  loader: async ({ params }) => {
    const r = await getBlogArticle({ data: params.slug });
    if (r.status === "not_found") throw notFound();
    return r;
  },
  head: ({ loaderData, params }) => {
    if (!loaderData || loaderData.status !== "ok") return { meta: [{ title: "Blog Portym" }, { name: "robots", content: "noindex" }] };
    const a = loaderData.article;
    const path = `/blog/${params.slug}`;
    const h = pageHead({
      title: a.metaTitle ? `${a.metaTitle} | Portym` : `${a.title} | Blog Portym`,
      description: a.metaDescription || a.excerpt,
      path,
      type: "article",
      breadcrumbs: [{ name: "Blog", path: "/blog" }, { name: a.title, path }],
      jsonLd: [{
        "@context": "https://schema.org", "@type": "BlogPosting", headline: a.title, description: a.metaDescription || a.excerpt,
        url: `${SITE.url}${path}`, mainEntityOfPage: `${SITE.url}${path}`, image: `${SITE.url}/og-portym.png`,
        datePublished: a.publishedAt, dateModified: a.updatedAt, inLanguage: "pt-BR",
        author: { "@type": "Organization", name: a.author || "Equipe Portym" },
        publisher: { "@type": "Organization", name: "Portym", logo: { "@type": "ImageObject", url: `${SITE.url}/logo-portym-escura.png` } },
        keywords: [a.focusKeyword, ...a.secondaryKeywords].filter(Boolean).join(", "),
      }],
    });
    return {
      ...h,
      meta: [
        ...h.meta,
        ...(a.publishedAt ? [{ property: "article:published_time", content: a.publishedAt }] : []),
        ...(a.updatedAt ? [{ property: "article:modified_time", content: a.updatedAt }] : []),
      ],
    };
  },
  component: Post,
});

function Post() {
  const data = Route.useLoaderData();
  if (data.status !== "ok") {
    return (
      <>
        <PageHero title="Blog Portym" />
        <Section>
          <p className="mx-auto max-w-xl rounded-[24px] border border-border bg-card p-8 text-center text-muted-foreground">
            Este artigo está temporariamente indisponível. Voltamos em instantes. <Link to="/blog" className="font-semibold text-primary">Ver o blog</Link>
          </p>
        </Section>
      </>
    );
  }
  const a = data.article;
  const by = [a.author, fmtDate(a.publishedAt), `${a.readingMinutes} min de leitura`].filter(Boolean).join(" • ");
  return (
    <>
      <PageHero eyebrow="Blog Portym" title={a.title} subtitle={by} />
      <Section>
        <div className="grid gap-10 lg:grid-cols-[220px_1fr_240px]">
          <nav className="hidden lg:block" aria-label="Sumário">
            {a.toc.length > 0 && (
              <div className="sticky top-28 space-y-2 text-sm">
                <p className="font-bold">Sumário</p>
                {a.toc.map((t) => <a key={t.id} href={`#${t.id}`} className="block text-muted-foreground hover:text-primary">{t.text}</a>)}
              </div>
            )}
          </nav>
          <article className="prose-portym min-w-0">
            {a.excerpt && <p className="lead">{a.excerpt}</p>}
            <div dangerouslySetInnerHTML={{ __html: a.html }} />
            {a.updatedAt && a.publishedAt && a.updatedAt.slice(0, 10) !== a.publishedAt.slice(0, 10) && (
              <p className="mt-8 text-sm">Atualizado em {fmtDate(a.updatedAt)}.</p>
            )}
            <div className="mt-10 rounded-[24px] bg-ink p-6 text-ink-foreground lg:hidden">
              <p className="font-bold">Teste o Portym grátis por 14 dias</p>
              <CtaButton size="md" className="mt-4">Testar grátis</CtaButton>
            </div>
          </article>
          <aside className="hidden lg:block">
            <div className="sticky top-28 rounded-[24px] bg-ink p-6 text-ink-foreground">
              <p className="font-bold">Teste o Portym grátis por 14 dias</p>
              <CtaButton size="md" className="mt-4">Testar grátis</CtaButton>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}

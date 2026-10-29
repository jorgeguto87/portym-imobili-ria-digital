import { createFileRoute, notFound } from "@tanstack/react-router";
import { pageHead } from "@/lib/seo";
import { POSTS, readingMinutes, slugify } from "@/content/blog";
import { CtaButton, PageHero, Section } from "@/components/site/ui";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => { const post = POSTS.find((p) => p.slug === params.slug); if (!post) throw notFound(); return { post }; },
  head: ({ loaderData, params }) => loaderData ? pageHead({ title: `${loaderData.post.title} | Blog Portym`, description: loaderData.post.excerpt, path: `/blog/${params.slug}`, type: "article", breadcrumbs: [{ name: "Blog", path: "/blog" }, { name: loaderData.post.title, path: `/blog/${params.slug}` }] }) : { meta: [{ title: "Artigo não encontrado" }, { name: "robots", content: "noindex" }] },
  component: Post,
});

function Post() {
  const { post } = Route.useLoaderData();
  const toc = post.body.filter((b) => b.type === "h2") as { text: string }[];
  return (
    <>
      <PageHero eyebrow={post.category} title={post.title} subtitle={`${post.author} • ${new Date(post.date).toLocaleDateString("pt-BR")} • ${readingMinutes(post)} min de leitura`} />
      <Section>
        <div className="grid gap-10 lg:grid-cols-[220px_1fr_240px]">
          <nav className="hidden lg:block"><div className="sticky top-28 space-y-2 text-sm"><p className="font-bold">Sumário</p>{toc.map((t) => <a key={t.text} href={`#${slugify(t.text)}`} className="block text-muted-foreground hover:text-primary">{t.text}</a>)}</div></nav>
          <article className="prose-portym">
            {post.body.map((b, i) => b.type === "ul" ? <ul key={i}>{b.items.map((x) => <li key={x}>{x}</li>)}</ul> : b.type === "h2" ? <h2 key={i} id={slugify(b.text)}>{b.text}</h2> : b.type === "h3" ? <h3 key={i}>{b.text}</h3> : <p key={i}>{b.text}</p>)}
            <p className="mt-8 text-sm">Tags: {post.tags.join(", ")}</p>
          </article>
          <aside className="hidden lg:block"><div className="sticky top-28 rounded-[24px] bg-ink p-6 text-ink-foreground"><p className="font-bold">Teste o Portym grátis por 14 dias</p><CtaButton size="md" className="mt-4">Testar grátis</CtaButton></div></aside>
        </div>
      </Section>
    </>
  );
}

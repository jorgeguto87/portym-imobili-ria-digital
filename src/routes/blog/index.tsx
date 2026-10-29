import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { pageHead } from "@/lib/seo";
import { POSTS, BLOG_CATEGORIES } from "@/content/blog";
import { PageHero, Section } from "@/components/site/ui";

export const Route = createFileRoute("/blog/")({
  head: () => pageHead({ title: "Blog Portym — Gestão imobiliária", description: "Artigos sobre gestão, locação, WhatsApp e finanças para imobiliárias.", path: "/blog", breadcrumbs: [{ name: "Blog", path: "/blog" }] }),
  component: Blog,
});

function Blog() {
  const [q, setQ] = useState(""); const [cat, setCat] = useState<string | null>(null);
  const list = POSTS.filter((p) => (!cat || p.category === cat) && p.title.toLowerCase().includes(q.toLowerCase()));
  return (
    <>
      <PageHero title="Blog Portym" subtitle="Ideias práticas para sua imobiliária render mais." />
      <Section>
        <div className="mb-8 flex flex-wrap gap-2">
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar artigos" className="rounded-full border border-input px-4 py-2" />
          {[null, ...BLOG_CATEGORIES].map((c) => <button key={c ?? "all"} onClick={() => setCat(c)} className={`rounded-full px-4 py-2 text-sm ${cat === c ? "bg-primary text-primary-foreground" : "bg-muted"}`}>{c ?? "Todos"}</button>)}
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {list.map((p) => (
            <Link key={p.slug} to="/blog/$slug" params={{ slug: p.slug }} className="rounded-[24px] border border-border bg-card p-6 shadow-soft hover:-translate-y-1 transition">
              <span className="text-xs font-semibold text-primary">{p.category}</span>
              <h2 className="mt-2 text-lg font-bold">{p.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{p.excerpt}</p>
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}

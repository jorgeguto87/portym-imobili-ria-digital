import { SITE } from "@/content/site";
import { fetchArticleList } from "@/lib/blogApi";

/** Páginas fixas do portal no sitemap (os artigos entram em seguida, com a data real). */
export const STATIC_PAGES: { path: string; priority: string; changefreq: string }[] = [
  { path: "/", priority: "1.0", changefreq: "weekly" },
  { path: "/funcionalidades", priority: "0.8", changefreq: "monthly" },
  { path: "/gestao-de-locacao", priority: "0.9", changefreq: "monthly" },
  { path: "/cobranca-de-aluguel", priority: "0.9", changefreq: "monthly" },
  { path: "/repasse-automatico", priority: "0.9", changefreq: "monthly" },
  { path: "/reajuste-de-aluguel", priority: "0.8", changefreq: "monthly" },
  { path: "/crm-imobiliario", priority: "0.9", changefreq: "monthly" },
  { path: "/whatsapp-para-imobiliaria", priority: "0.9", changefreq: "monthly" },
  { path: "/portfolio-de-imoveis", priority: "0.8", changefreq: "monthly" },
  { path: "/portal-do-inquilino-e-proprietario", priority: "0.8", changefreq: "monthly" },
  { path: "/vendas-e-comissoes", priority: "0.8", changefreq: "monthly" },
  { path: "/para-corretores", priority: "0.8", changefreq: "monthly" },
  { path: "/para-imobiliarias", priority: "0.8", changefreq: "monthly" },
  { path: "/precos", priority: "0.9", changefreq: "monthly" },
  { path: "/comparativo/kenlo", priority: "0.6", changefreq: "monthly" },
  { path: "/comparativo/planilha", priority: "0.6", changefreq: "monthly" },
  { path: "/sobre", priority: "0.5", changefreq: "yearly" },
  { path: "/contato", priority: "0.5", changefreq: "yearly" },
  { path: "/termos", priority: "0.3", changefreq: "yearly" },
  { path: "/privacidade", priority: "0.3", changefreq: "yearly" },
];

const xml = (s: string) => String(s).replace(/[<>&'"]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;" })[c]!);
const iso = (d: string | null) => { if (!d) return ""; const t = new Date(d); return Number.isNaN(t.getTime()) ? "" : t.toISOString(); };
const unavailable = (what: string) =>
  new Response(`${what} temporariamente indisponível.`, { status: 503, headers: { "Content-Type": "text/plain; charset=utf-8", "Retry-After": "120", "Cache-Control": "no-store" } });

// Sem cache longo: o Google sempre vê a versão atual (o reenvio ao Search Console sai 6 min depois da publicação).
const FRESH = "public, max-age=0, s-maxage=60, must-revalidate";

export async function sitemapResponse(): Promise<Response> {
  const r = await fetchArticleList();
  // Melhor um erro temporário do que um sitemap sem os artigos: o Google tenta de novo e mantém o anterior.
  if (!r.ok) return unavailable("Sitemap");
  const lastBlog = r.articles.map((a) => iso(a.updatedAt) || iso(a.publishedAt)).filter(Boolean).sort().pop() || "";
  const entries = [
    ...STATIC_PAGES.map((p) => ({ loc: `${SITE.url}${p.path === "/" ? "/" : p.path}`, lastmod: "", changefreq: p.changefreq, priority: p.priority })),
    { loc: `${SITE.url}/blog`, lastmod: lastBlog, changefreq: "daily", priority: "0.7" },
    ...r.articles.map((a) => ({ loc: `${SITE.url}/blog/${encodeURIComponent(a.slug)}`, lastmod: iso(a.updatedAt) || iso(a.publishedAt), changefreq: "monthly", priority: "0.6" })),
  ];
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.map((e) => `  <url>\n    <loc>${xml(e.loc)}</loc>${e.lastmod ? `\n    <lastmod>${e.lastmod}</lastmod>` : ""}\n    <changefreq>${e.changefreq}</changefreq>\n    <priority>${e.priority}</priority>\n  </url>`).join("\n")}
</urlset>
`;
  return new Response(body, { status: 200, headers: { "Content-Type": "application/xml; charset=utf-8", "Cache-Control": FRESH } });
}

export async function rssResponse(): Promise<Response> {
  const r = await fetchArticleList();
  if (!r.ok) return unavailable("Feed");
  const items = r.articles.slice(0, 30);
  const rfc = (d: string | null) => (d ? new Date(d).toUTCString() : "");
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Blog Portym</title>
    <link>${SITE.url}/blog</link>
    <description>Gestão imobiliária na prática: locação, cobrança, repasse, CRM e atendimento no WhatsApp.</description>
    <language>pt-BR</language>
    <atom:link href="${SITE.url}/blog/rss.xml" rel="self" type="application/rss+xml" />
${items.map((a) => `    <item>
      <title>${xml(a.title)}</title>
      <link>${SITE.url}/blog/${encodeURIComponent(a.slug)}</link>
      <guid isPermaLink="true">${SITE.url}/blog/${encodeURIComponent(a.slug)}</guid>
      <description>${xml(a.excerpt)}</description>${a.publishedAt ? `\n      <pubDate>${rfc(a.publishedAt)}</pubDate>` : ""}
    </item>`).join("\n")}
  </channel>
</rss>
`;
  return new Response(body, { status: 200, headers: { "Content-Type": "application/rss+xml; charset=utf-8", "Cache-Control": FRESH } });
}

/** Chave do IndexNow (INDEXNOW_KEY no ambiente do portal). Sem chave = 404. */
export function indexNowKeyResponse(): Response {
  const key = String(process.env["INDEXNOW_KEY"] || "").trim();
  if (!/^[A-Za-z0-9-]{8,128}$/.test(key)) return new Response("Not found", { status: 404 });
  return new Response(key, { status: 200, headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" } });
}

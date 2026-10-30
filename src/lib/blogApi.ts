import { createServerFn } from "@tanstack/react-start";
import { marked, type Tokens } from "marked";

/**
 * Blog do portal: os artigos vêm do sistema de SEO do Portym (portym-seo-api).
 * Tudo roda no SERVIDOR do portal (server functions), que fala com a API do SEO
 * pelo endereço interno da VPS (SEO_API_URL, padrão http://127.0.0.1:3092) — o
 * navegador nunca chama a API do SEO.
 */

export type ArticleSummary = {
  slug: string;
  title: string;
  excerpt: string;
  metaTitle?: string;
  metaDescription?: string;
  focusKeyword?: string;
  author?: string;
  publishedAt: string | null;
  updatedAt: string | null;
};
export type Article = ArticleSummary & { html: string; toc: { id: string; text: string }[]; readingMinutes: number; secondaryKeywords: string[] };
export type ListResult = { ok: true; articles: ArticleSummary[] } | { ok: false; articles: ArticleSummary[] };

const apiBase = () => (process.env["SEO_API_URL"] || "http://127.0.0.1:3092").replace(/\/+$/, "");
const TIMEOUT_MS = 5000;
const LIST_TTL_MS = 60_000;

// Cache curto em memória: o portal não chama a API do SEO a cada visita, e se a API
// cair por um momento continua servindo a última lista boa.
let listCache: { at: number; articles: ArticleSummary[] } | null = null;
const articleCache = new Map<string, { at: number; article: Article }>();

async function getJson(path: string): Promise<{ status: number; body: any }> {
  const r = await fetch(`${apiBase()}${path}`, { headers: { Accept: "application/json" }, signal: AbortSignal.timeout(TIMEOUT_MS) });
  return { status: r.status, body: await r.json().catch(() => null) };
}

const pick = (a: any): ArticleSummary => ({
  slug: String(a.slug), title: String(a.title || ""), excerpt: String(a.excerpt || ""),
  metaTitle: a.metaTitle || "", metaDescription: a.metaDescription || "", focusKeyword: a.focusKeyword || "",
  author: a.author || "Equipe Portym", publishedAt: a.publishedAt || null, updatedAt: a.updatedAt || a.publishedAt || null,
});

export async function fetchArticleList(): Promise<ListResult> {
  if (listCache && Date.now() - listCache.at < LIST_TTL_MS) return { ok: true, articles: listCache.articles };
  try {
    const { status, body } = await getJson("/api/public/articles");
    if (status !== 200 || !Array.isArray(body?.articles)) throw new Error(`HTTP ${status}`);
    const articles = body.articles.map(pick);
    listCache = { at: Date.now(), articles };
    return { ok: true, articles };
  } catch (err) {
    console.error("[blog] API do SEO indisponível (lista):", (err as Error).message);
    return listCache ? { ok: true, articles: listCache.articles } : { ok: false, articles: [] };
  }
}

// ---------------------------------------------------------------- Markdown → HTML
const escapeHtml = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
export const slugifyHeading = (s: string) =>
  s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
const safeHref = (href: string) => (/^(https?:\/\/|\/|#|mailto:)/i.test(href) ? href : "#");

export function renderMarkdown(md: string, siteOrigin = "https://portal.portym.cloud") {
  const toc: { id: string; text: string }[] = [];
  const used = new Set<string>();
  const renderer = new marked.Renderer();
  // HTML escrito dentro do artigo não é executado: vira texto.
  renderer.html = ({ text }: Tokens.HTML | Tokens.Tag) => escapeHtml(text);
  renderer.heading = function ({ tokens, depth }: Tokens.Heading) {
    const inner = this.parser.parseInline(tokens);
    const plain = inner.replace(/<[^>]+>/g, "");
    // O título do artigo já é o H1 da página: "#" no texto vira H2.
    const level = Math.min(Math.max(depth, 2), 4);
    let id = slugifyHeading(plain) || `secao-${toc.length + 1}`;
    while (used.has(id)) id += "-2";
    used.add(id);
    if (level === 2) toc.push({ id, text: plain });
    return `<h${level} id="${id}">${inner}</h${level}>\n`;
  };
  renderer.link = function ({ href, title, tokens }: Tokens.Link) {
    const text = this.parser.parseInline(tokens);
    const url = safeHref(href);
    const external = /^https?:\/\//i.test(url) && !url.startsWith(siteOrigin);
    return `<a href="${escapeHtml(url)}"${title ? ` title="${escapeHtml(title)}"` : ""}${external ? ' target="_blank" rel="noopener nofollow"' : ""}>${text}</a>`;
  };
  renderer.image = ({ href, title, text }: Tokens.Image) =>
    /^https?:\/\//i.test(href) ? `<img src="${escapeHtml(href)}" alt="${escapeHtml(text)}"${title ? ` title="${escapeHtml(title)}"` : ""} loading="lazy" />` : escapeHtml(text);
  const html = marked.parse(md || "", { renderer, async: false, gfm: true, breaks: false }) as string;
  const words = (md || "").split(/\s+/).filter(Boolean).length;
  return { html, toc, readingMinutes: Math.max(1, Math.round(words / 200)) };
}

export async function fetchArticle(slug: string): Promise<{ status: "ok"; article: Article } | { status: "not_found" } | { status: "unavailable" }> {
  const cached = articleCache.get(slug);
  if (cached && Date.now() - cached.at < LIST_TTL_MS) return { status: "ok", article: cached.article };
  try {
    const { status, body } = await getJson(`/api/public/articles/${encodeURIComponent(slug)}`);
    if (status === 404) return { status: "not_found" };
    if (status !== 200 || !body?.article) throw new Error(`HTTP ${status}`);
    const a = body.article;
    const rendered = renderMarkdown(String(a.content || ""));
    const article: Article = { ...pick(a), ...rendered, secondaryKeywords: Array.isArray(a.secondaryKeywords) ? a.secondaryKeywords : [] };
    articleCache.set(slug, { at: Date.now(), article });
    if (articleCache.size > 300) articleCache.delete(articleCache.keys().next().value!);
    return { status: "ok", article };
  } catch (err) {
    console.error("[blog] API do SEO indisponível (artigo):", (err as Error).message);
    return cached ? { status: "ok", article: cached.article } : { status: "unavailable" };
  }
}

// ---------------------------------------------------------------- Relacionados
const fold = (s: string) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
export function relatedTo(articles: ArticleSummary[], keywords: string[], limit = 3): ArticleSummary[] {
  const keys = keywords.map(fold);
  return articles
    .map((a) => {
      const hay = fold(`${a.title} ${a.focusKeyword || ""} ${a.excerpt}`);
      const score = keys.reduce((n, k) => n + (hay.includes(k) ? (fold(a.focusKeyword || "").includes(k) ? 3 : 1) : 0), 0);
      return { a, score };
    })
    .filter((x) => x.score > 0)
    .sort((x, y) => y.score - x.score || String(y.a.publishedAt).localeCompare(String(x.a.publishedAt)))
    .slice(0, limit)
    .map((x) => x.a);
}

// ---------------------------------------------------------------- Server functions
export const getBlogList = createServerFn({ method: "GET" }).handler(async () => fetchArticleList());

export const getBlogArticle = createServerFn({ method: "GET" })
  .validator((slug: unknown) => String(slug || "").slice(0, 200))
  .handler(async ({ data }) => fetchArticle(data));

export const getLatestArticles = createServerFn({ method: "GET" }).handler(async () => {
  const r = await fetchArticleList();
  return r.articles.slice(0, 3);
});

export const getRelatedArticles = createServerFn({ method: "GET" })
  .validator((keywords: unknown) => (Array.isArray(keywords) ? keywords.map(String).slice(0, 30) : []))
  .handler(async ({ data }) => {
    const r = await fetchArticleList();
    return relatedTo(r.articles, data);
  });

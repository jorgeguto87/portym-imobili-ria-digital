import { SITE } from "@/content/site";
import type { FAQ } from "@/content/features";

type HeadInput = {
  title: string;
  description: string;
  path: string;
  type?: string;
  breadcrumbs?: { name: string; path: string }[];
  jsonLd?: object[];
};

export function pageHead({ title, description, path, type = "website", breadcrumbs, jsonLd = [] }: HeadInput) {
  const url = `${SITE.url}${path === "/" ? "" : path}`;
  const ld = [...jsonLd];
  if (breadcrumbs) {
    ld.push({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [{ name: "Início", path: "/" }, ...breadcrumbs].map((b, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: b.name,
        item: `${SITE.url}${b.path === "/" ? "" : b.path}`,
      })),
    });
  }
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: url },
      { property: "og:type", content: type },
      { property: "og:image", content: `${SITE.url}/og-portym.png` },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "Portym — sua imobiliária no automático" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: `${SITE.url}/og-portym.png` },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: url }],
    scripts: ld.map((o) => ({ type: "application/ld+json", children: JSON.stringify(o) })),
  };
}

export const faqJsonLd = (faq: FAQ[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
});

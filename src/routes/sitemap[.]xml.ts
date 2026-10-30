import { createFileRoute } from "@tanstack/react-router";
import { sitemapResponse } from "@/lib/feeds";

// /sitemap.xml montado na hora: páginas do portal + artigos do sistema de SEO.
export const Route = createFileRoute("/sitemap.xml")({
  server: { handlers: { GET: () => sitemapResponse() } },
});

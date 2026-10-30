import { createFileRoute } from "@tanstack/react-router";
import { rssResponse } from "@/lib/feeds";

export const Route = createFileRoute("/blog/rss.xml")({
  server: { handlers: { GET: () => rssResponse() } },
});

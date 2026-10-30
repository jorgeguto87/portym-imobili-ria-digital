import { createFileRoute } from "@tanstack/react-router";
import { indexNowKeyResponse } from "@/lib/feeds";

// Arquivo de verificação do IndexNow (o sistema de SEO usa INDEXNOW_KEY_LOCATION apontando para cá).
export const Route = createFileRoute("/indexnow.txt")({
  server: { handlers: { GET: () => indexNowKeyResponse() } },
});

import { createFileRoute } from "@tanstack/react-router";
import { FEATURE_PAGES } from "@/content/features";
import { FeaturePageTemplate, featureHead } from "@/components/site/FeaturePageTemplate";

const c = FEATURE_PAGES["whatsapp-para-imobiliaria"];
export const Route = createFileRoute("/whatsapp-para-imobiliaria")({
  head: () => featureHead(c),
  component: () => <FeaturePageTemplate c={c} />,
});

import { createFileRoute } from "@tanstack/react-router";
import { FEATURE_PAGES } from "@/content/features";
import { FeaturePageTemplate, featureHead } from "@/components/site/FeaturePageTemplate";

const c = FEATURE_PAGES["crm-imobiliario"];
export const Route = createFileRoute("/crm-imobiliario")({
  head: () => featureHead(c),
  component: () => <FeaturePageTemplate c={c} />,
});

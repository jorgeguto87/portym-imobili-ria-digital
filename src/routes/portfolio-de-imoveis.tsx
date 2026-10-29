import { createFileRoute } from "@tanstack/react-router";
import { FEATURE_PAGES } from "@/content/features";
import { FeaturePageTemplate, featureHead } from "@/components/site/FeaturePageTemplate";

const c = FEATURE_PAGES["portfolio-de-imoveis"];
export const Route = createFileRoute("/portfolio-de-imoveis")({
  head: () => featureHead(c),
  component: () => <FeaturePageTemplate c={c} />,
});

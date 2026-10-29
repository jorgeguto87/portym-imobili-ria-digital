import { createFileRoute } from "@tanstack/react-router";
import { FEATURE_PAGES } from "@/content/features";
import { FeaturePageTemplate, featureHead } from "@/components/site/FeaturePageTemplate";

const c = FEATURE_PAGES["reajuste-de-aluguel"];
export const Route = createFileRoute("/reajuste-de-aluguel")({
  head: () => featureHead(c),
  component: () => <FeaturePageTemplate c={c} />,
});

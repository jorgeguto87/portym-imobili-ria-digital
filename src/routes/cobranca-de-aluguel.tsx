import { createFileRoute } from "@tanstack/react-router";
import { FEATURE_PAGES } from "@/content/features";
import { FeaturePageTemplate, featureHead } from "@/components/site/FeaturePageTemplate";

const c = FEATURE_PAGES["cobranca-de-aluguel"];
export const Route = createFileRoute("/cobranca-de-aluguel")({
  head: () => featureHead(c),
  component: () => <FeaturePageTemplate c={c} />,
});

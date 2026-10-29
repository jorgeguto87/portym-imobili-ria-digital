import { createFileRoute } from "@tanstack/react-router";
import { FEATURE_PAGES } from "@/content/features";
import { FeaturePageTemplate, featureHead } from "@/components/site/FeaturePageTemplate";

const c = FEATURE_PAGES["vendas-e-comissoes"];
export const Route = createFileRoute("/vendas-e-comissoes")({
  head: () => featureHead(c),
  component: () => <FeaturePageTemplate c={c} />,
});

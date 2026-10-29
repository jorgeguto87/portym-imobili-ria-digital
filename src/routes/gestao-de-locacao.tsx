import { createFileRoute } from "@tanstack/react-router";
import { FEATURE_PAGES } from "@/content/features";
import { FeaturePageTemplate, featureHead } from "@/components/site/FeaturePageTemplate";

const c = FEATURE_PAGES["gestao-de-locacao"];
export const Route = createFileRoute("/gestao-de-locacao")({
  head: () => featureHead(c),
  component: () => <FeaturePageTemplate c={c} />,
});

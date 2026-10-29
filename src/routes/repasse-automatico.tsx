import { createFileRoute } from "@tanstack/react-router";
import { FEATURE_PAGES } from "@/content/features";
import { FeaturePageTemplate, featureHead } from "@/components/site/FeaturePageTemplate";

const c = FEATURE_PAGES["repasse-automatico"];
export const Route = createFileRoute("/repasse-automatico")({
  head: () => featureHead(c),
  component: () => <FeaturePageTemplate c={c} />,
});

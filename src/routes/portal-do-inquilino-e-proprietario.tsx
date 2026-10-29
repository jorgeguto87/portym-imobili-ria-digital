import { createFileRoute } from "@tanstack/react-router";
import { FEATURE_PAGES } from "@/content/features";
import { FeaturePageTemplate, featureHead } from "@/components/site/FeaturePageTemplate";

const c = FEATURE_PAGES["portal-do-inquilino-e-proprietario"];
export const Route = createFileRoute("/portal-do-inquilino-e-proprietario")({
  head: () => featureHead(c),
  component: () => <FeaturePageTemplate c={c} />,
});

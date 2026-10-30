import { createFileRoute } from "@tanstack/react-router";
import { FEATURE_PAGES } from "@/content/features";
import { FeaturePageTemplate, featureHead } from "@/components/site/FeaturePageTemplate";
import { getRelatedArticles } from "@/lib/blogApi";

const c = FEATURE_PAGES["cobranca-de-aluguel"];
export const Route = createFileRoute("/cobranca-de-aluguel")({
  loader: () => getRelatedArticles({ data: c.blogKeywords }),
  head: () => featureHead(c),
  component: function Page() { return <FeaturePageTemplate c={c} related={Route.useLoaderData()} />; },
});

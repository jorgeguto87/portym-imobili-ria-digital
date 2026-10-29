import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/seo";
import { PageHero, Section, FinalCta } from "@/components/site/ui";
import { FeatureGrid, PricingTable, ComparisonTable, FAQAccordion } from "@/components/site/blocks";
import { PRICING_FAQ } from "@/content/pricing";

export const Route = createFileRoute("/precos")({
  head: () => pageHead({ title: "Preços do Portym", description: "Planos por quantidade de imóveis, com usuários ilimitados e todas as funcionalidades.", path: "/precos", breadcrumbs: [{ name: "Preços do Portym", path: "/precos" }] }),
  component: Page,
});

function Page() {
  void PricingTable; void ComparisonTable; void FAQAccordion; void PRICING_FAQ; void FeatureGrid;
  return (
    <>
      <PageHero title="Preços do Portym" subtitle="Planos por quantidade de imóveis, com usuários ilimitados e todas as funcionalidades." />
      <Section><PricingTable /><div className="mt-16"><FAQAccordion items={PRICING_FAQ} /></div></Section>
      <FinalCta />
    </>
  );
}

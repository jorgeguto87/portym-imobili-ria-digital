import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/seo";
import { PageHero, Section, FinalCta } from "@/components/site/ui";
import { FeatureGrid, PricingTable, ComparisonTable, FAQAccordion } from "@/components/site/blocks";
import { PRICING_FAQ } from "@/content/pricing";

export const Route = createFileRoute("/para-imobiliarias")({
  head: () => pageHead({ title: "Portym para imobiliárias", description: "Equipe sem custo por usuário, carteira em escala, menos inadimplência e repasses sem erros.", path: "/para-imobiliarias", breadcrumbs: [{ name: "Portym para imobiliárias", path: "/para-imobiliarias" }] }),
  component: Page,
});

function Page() {
  void PricingTable; void ComparisonTable; void FAQAccordion; void PRICING_FAQ; void FeatureGrid;
  return (
    <>
      <PageHero title="Portym para imobiliárias" subtitle="Equipe sem custo por usuário, carteira em escala, menos inadimplência e repasses sem erros." />
      <Section><FeatureGrid /></Section>
      <FinalCta />
    </>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/seo";
import { PageHero, Section, FinalCta } from "@/components/site/ui";
import { FeatureGrid, PricingTable, ComparisonTable, FAQAccordion } from "@/components/site/blocks";
import { PRICING_FAQ } from "@/content/pricing";

export const Route = createFileRoute("/sobre")({
  head: () => pageHead({ title: "Sobre o Portym", description: "Tecnologia imobiliária descomplicada para corretores e imobiliárias do Brasil.", path: "/sobre", breadcrumbs: [{ name: "Sobre o Portym", path: "/sobre" }] }),
  component: Page,
});

function Page() {
  void PricingTable; void ComparisonTable; void FAQAccordion; void PRICING_FAQ; void FeatureGrid;
  return (
    <>
      <PageHero title="Sobre o Portym" subtitle="Tecnologia imobiliária descomplicada para corretores e imobiliárias do Brasil." />
      <Section><p className="mx-auto max-w-3xl text-lg text-muted-foreground">Nossa missão é tirar o trabalho repetitivo da rotina imobiliária. Nossa visão: ser o sistema mais simples e justo do mercado, com preço transparente e usuários ilimitados.</p></Section>
      <FinalCta />
    </>
  );
}

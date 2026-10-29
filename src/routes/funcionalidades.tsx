import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/seo";
import { PageHero, Section, FinalCta } from "@/components/site/ui";
import { FeatureGrid, PricingTable, ComparisonTable, FAQAccordion } from "@/components/site/blocks";
import { PRICING_FAQ } from "@/content/pricing";

export const Route = createFileRoute("/funcionalidades")({
  head: () => pageHead({ title: "Funcionalidades do Portym", description: "Atendimento no WhatsApp, CRM, cobrança, repasse e gestão de locação num só sistema.", path: "/funcionalidades", breadcrumbs: [{ name: "Funcionalidades do Portym", path: "/funcionalidades" }] }),
  component: Page,
});

function Page() {
  void PricingTable; void ComparisonTable; void FAQAccordion; void PRICING_FAQ; void FeatureGrid;
  return (
    <>
      <PageHero title="Funcionalidades do Portym" subtitle="Atendimento no WhatsApp, CRM, cobrança, repasse e gestão de locação num só sistema." />
      <Section><FeatureGrid /></Section>
      <FinalCta />
    </>
  );
}

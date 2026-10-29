import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/seo";
import { PageHero, Section, FinalCta } from "@/components/site/ui";
import { FeatureGrid, PricingTable, ComparisonTable, FAQAccordion } from "@/components/site/blocks";
import { PRICING_FAQ } from "@/content/pricing";

export const Route = createFileRoute("/para-corretores")({
  head: () => pageHead({ title: "Portym para corretores", description: "Responda leads no WhatsApp na hora e cobre aluguéis sem burocracia.", path: "/para-corretores", breadcrumbs: [{ name: "Portym para corretores", path: "/para-corretores" }] }),
  component: Page,
});

function Page() {
  void PricingTable; void ComparisonTable; void FAQAccordion; void PRICING_FAQ; void FeatureGrid;
  return (
    <>
      <PageHero title="Portym para corretores" subtitle="Responda leads no WhatsApp na hora e cobre aluguéis sem burocracia." />
      <Section><FeatureGrid only={["whatsapp-para-imobiliaria","crm-imobiliario","cobranca-de-aluguel"]} /></Section>
      <FinalCta />
    </>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/seo";
import { PageHero, Section, FinalCta } from "@/components/site/ui";
import { FeatureGrid, PricingTable, ComparisonTable, FAQAccordion } from "@/components/site/blocks";
import { PRICING_FAQ } from "@/content/pricing";

export const Route = createFileRoute("/comparativo/planilha")({
  head: () => pageHead({ title: "Portym x Planilha", description: "Menos tempo perdido, menos erro em repasses e mais segurança da informação.", path: "/comparativo/planilha", breadcrumbs: [{ name: "Portym x Planilha", path: "/comparativo/planilha" }] }),
  component: Page,
});

function Page() {
  void PricingTable; void ComparisonTable; void FAQAccordion; void PRICING_FAQ; void FeatureGrid;
  return (
    <>
      <PageHero title="Portym x Planilha" subtitle="Menos tempo perdido, menos erro em repasses e mais segurança da informação." />
      <Section><ComparisonTable bLabel="Planilha" rows={[{label:"Cobrança automática",a:true,b:false},{label:"Repasse sem digitação",a:true,b:false},{label:"Controle de acesso",a:true,b:false},{label:"Reajuste calculado",a:true,b:false}]} /></Section>
      <FinalCta />
    </>
  );
}

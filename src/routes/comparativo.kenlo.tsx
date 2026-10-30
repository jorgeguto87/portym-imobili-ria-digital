import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/seo";
import { PageHero, Section, FinalCta } from "@/components/site/ui";
import { FeatureGrid, PricingTable, ComparisonTable, FAQAccordion } from "@/components/site/blocks";
import { PRICING_FAQ } from "@/content/pricing";

export const Route = createFileRoute("/comparativo/kenlo")({
  head: () => pageHead({ title: "Portym x Kenlo", description: "Comparativo neutro: preço publicado, usuários ilimitados e automação nativa.", path: "/comparativo/kenlo", breadcrumbs: [{ name: "Portym x Kenlo", path: "/comparativo/kenlo" }] }),
  component: Page,
});

function Page() {
  void PricingTable; void ComparisonTable; void FAQAccordion; void PRICING_FAQ; void FeatureGrid;
  return (
    <>
      <PageHero title="Portym x Kenlo" subtitle="Comparativo neutro: preço publicado, usuários ilimitados e automação nativa." />
      <Section><ComparisonTable bLabel="Kenlo" rows={[{label:"Preço publicado no site",a:true,b:"Consulte o fornecedor"},{label:"Usuários ilimitados",a:true,b:"Consulte o fornecedor"},{label:"Robô de atendimento no WhatsApp",a:"Nativo",b:"Consulte o fornecedor"},{label:"Repasse por Pix",a:"Automático",b:"Consulte o fornecedor"}]} /></Section>
      <FinalCta />
    </>
  );
}

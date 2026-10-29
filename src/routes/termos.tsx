import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/seo";
import { PageHero, Section, FinalCta } from "@/components/site/ui";
import { FeatureGrid, PricingTable, ComparisonTable, FAQAccordion } from "@/components/site/blocks";
import { PRICING_FAQ } from "@/content/pricing";

export const Route = createFileRoute("/termos")({
  head: () => pageHead({ title: "Termos de Uso", description: "Termos de Uso do Portym para clientes empresariais.", path: "/termos", breadcrumbs: [{ name: "Termos de Uso", path: "/termos" }] }),
  component: Page,
});

function Page() {
  void PricingTable; void ComparisonTable; void FAQAccordion; void PRICING_FAQ; void FeatureGrid;
  return (
    <>
      <PageHero title="Termos de Uso" subtitle="Termos de Uso do Portym para clientes empresariais." />
      <Section><div className="prose-portym mx-auto max-w-3xl"><h2>1. Objeto</h2><p>O Portym é um software como serviço para gestão imobiliária.</p><h2>2. Conta</h2><p>O cliente é responsável pelos dados e usuários cadastrados.</p><h2>3. Pagamento</h2><p>Planos mensais podem ser cancelados a qualquer momento.</p><h2>4. Responsabilidades</h2><p>O cliente é o controlador dos dados de seus clientes.</p></div></Section>
      <FinalCta />
    </>
  );
}

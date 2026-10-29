import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/seo";
import { PageHero, Section, FinalCta } from "@/components/site/ui";
import { FeatureGrid, PricingTable, ComparisonTable, FAQAccordion } from "@/components/site/blocks";
import { PRICING_FAQ } from "@/content/pricing";

export const Route = createFileRoute("/privacidade")({
  head: () => pageHead({ title: "Política de Privacidade", description: "Como o Portym trata dados pessoais conforme a LGPD.", path: "/privacidade", breadcrumbs: [{ name: "Política de Privacidade", path: "/privacidade" }] }),
  component: Page,
});

function Page() {
  void PricingTable; void ComparisonTable; void FAQAccordion; void PRICING_FAQ; void FeatureGrid;
  return (
    <>
      <PageHero title="Política de Privacidade" subtitle="Como o Portym trata dados pessoais conforme a LGPD." />
      <Section><div className="prose-portym mx-auto max-w-3xl"><h2>Dados coletados</h2><p>Dados de cadastro e uso, tratados conforme a Lei 13.709/2018 (LGPD).</p><h2>Direitos do titular</h2><p>Acesso, correção, exclusão e portabilidade pelo e-mail contato@portym.cloud.</p><h2>Segurança</h2><p>Criptografia em trânsito e controle de acesso.</p></div></Section>
      <FinalCta />
    </>
  );
}

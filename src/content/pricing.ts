import type { FAQ } from "./features";

export const ANNUAL_DISCOUNT = 0.2;

export type Plan = { id: string; label: string; maxProperties: number | null; monthly: number | null; highlight?: string };

export const PLANS: Plan[] = [
  { id: "p30", label: "Até 30 imóveis", maxProperties: 30, monthly: 99.9 },
  { id: "p60", label: "Até 60 imóveis", maxProperties: 60, monthly: 149.9 },
  { id: "p120", label: "Até 120 imóveis", maxProperties: 120, monthly: 199.9, highlight: "Mais escolhido • Melhor custo-benefício" },
  { id: "p250", label: "Até 250 imóveis", maxProperties: 250, monthly: 249.9 },
  { id: "p500", label: "Até 500 imóveis", maxProperties: 500, monthly: 319.9 },
  { id: "p500plus", label: "Acima de 500 imóveis", maxProperties: null, monthly: null },
];

/** Preço mensal efetivo: anual aplica 20% de desconto. */
export function priceFor(plan: Plan, cycle: "mensal" | "anual"): number | null {
  if (plan.monthly == null) return null;
  const v = cycle === "anual" ? plan.monthly * (1 - ANNUAL_DISCOUNT) : plan.monthly;
  return Math.round(v * 100) / 100;
}

/** Menor plano que comporta a quantidade de imóveis. */
export function planForProperties(count: number): Plan {
  return PLANS.find((p) => p.maxProperties != null && count <= p.maxProperties) ?? PLANS[PLANS.length - 1]!;
}

export const brl = (v: number) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export const PRICING_HIGHLIGHTS = [
  "Todas as funcionalidades em todos os planos",
  "Usuários ilimitados",
  "Sem taxa por contrato",
  "Sem cobrança extra do Portym por boleto gerado",
];

export const INCLUDED: { group: string; items: string[] }[] = [
  { group: "Atendimento", items: ["Atendente virtual no WhatsApp", "Agendamento de visitas", "CRM com funil e origem do lead", "Match automático de imóveis"] },
  { group: "Financeiro", items: ["Boleto, Pix e link de pagamento", "Régua de cobrança no WhatsApp", "Multa e juros automáticos", "Repasse por Pix ao proprietário", "Reajuste IGP-M / IPCA"] },
  { group: "Gestão", items: ["Contratos, vistorias e rescisões", "Vendas, locação e temporada", "Comissões de captador e corretor", "Portfólio online com link próprio"] },
  { group: "Portais e documentos", items: ["Portal do inquilino", "Portal do proprietário", "Informe de rendimentos", "Dados para DIMOB"] },
  { group: "Conta", items: ["Usuários ilimitados", "Suporte por WhatsApp", "Ajuda na migração", "Atualizações sem custo"] },
];

export const PRICING_FAQ: FAQ[] = [
  { q: "Preciso de cartão de crédito para testar?", a: "Não. O teste de 14 dias é gratuito e não pede cartão de crédito." },
  { q: "Como funciona o desconto anual?", a: "No plano anual você paga 20% a menos em relação ao valor mensal de cada faixa." },
  { q: "O que acontece se eu passar do limite de imóveis?", a: "Avisamos você e sugerimos a faixa seguinte. Nada é bloqueado de surpresa." },
  { q: "Vocês ajudam na migração do meu sistema atual?", a: "Sim. Ajudamos a importar imóveis, proprietários, inquilinos e contratos a partir de planilhas ou exportações." },
  { q: "Quais formas de pagamento são aceitas?", a: "Cartão de crédito, Pix e boleto para a assinatura do Portym." },
  { q: "Existe fidelidade?", a: "No plano mensal, não: cancele quando quiser. No anual, o valor é referente aos 12 meses contratados." },
  { q: "Quantos usuários posso cadastrar?", a: "Quantos quiser. Todos os planos têm usuários ilimitados." },
];

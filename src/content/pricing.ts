import type { FAQ } from "./features";

export const ANNUAL_DISCOUNT = 0.15;

export type Plan = { id: string; name?: string; label: string; maxProperties: number | null; monthly: number | null; highlight?: string };

export const PLANS: Plan[] = [
  { id: "p30", name: "Básico", label: "Até 30 imóveis", maxProperties: 30, monthly: 99.9 },
  { id: "p60", name: "Start", label: "Até 60 imóveis", maxProperties: 60, monthly: 149.9 },
  { id: "p120", name: "Plus", label: "Até 120 imóveis", maxProperties: 120, monthly: 199.9, highlight: "Mais escolhido • Melhor custo-benefício" },
  { id: "p250", name: "Power", label: "Até 250 imóveis", maxProperties: 250, monthly: 249.9 },
  { id: "p500", name: "Beta", label: "Até 500 imóveis", maxProperties: 500, monthly: 319.9 },
  { id: "p500plus", label: "Acima de 500 imóveis", maxProperties: null, monthly: null },
];

/** Preço mensal efetivo: anual aplica 15% de desconto. */
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
  "Sem taxa de adesão: a 1ª mensalidade só depois dos 14 dias",
];

export const INCLUDED: { group: string; items: string[] }[] = [
  { group: "Atendimento", items: ["Robô de atendimento no WhatsApp", "Horário de atendimento configurável", "CRM com funil de arrastar e soltar", "Aviso de imóvel compatível ao cliente"] },
  { group: "Financeiro", items: ["Boleto com Pix e link de pagamento", "Lembretes de vencimento e atraso no WhatsApp", "Multa e juros automáticos", "Repasse automático ao proprietário", "Reajuste IGP-M / IPCA"] },
  { group: "Gestão", items: ["Contratos de locação com histórico", "Vendas, locação e temporada", "Comissões de captador e vendedor", "Portfólio online com link próprio"] },
  { group: "Portais", items: ["Portal do inquilino", "Portal do proprietário", "Recibos e comprovantes de repasse", "Documentos do contrato"] },
  { group: "Conta", items: ["Usuários ilimitados", "Treinamento da sua equipe", "Atendimento da equipe Portym", "Atualizações sem custo"] },
];

export const PRICING_FAQ: FAQ[] = [
  { q: "Preciso de cartão de crédito para testar?", a: "Não. O teste de 14 dias é gratuito e não pede cartão de crédito." },
  { q: "Tem taxa de adesão?", a: "Não há taxa extra. Depois dos 14 dias grátis, a primeira cobrança é a primeira mensalidade do plano escolhido." },
  { q: "Como funciona o desconto anual?", a: "No plano anual você paga 15% a menos em relação a 12 mensalidades da sua faixa." },
  { q: "O que acontece se eu passar do limite de imóveis?", a: "O que já está cadastrado continua funcionando normalmente. Para cadastrar imóveis novos acima do limite, basta subir para a faixa seguinte." },
  { q: "Vocês ajudam a começar?", a: "Sim. A equipe Portym entra em contato e faz o treinamento da sua equipe para usar o sistema." },
  { q: "Quais formas de pagamento são aceitas?", a: "Cartão de crédito ou Pix para a assinatura do Portym." },
  { q: "Existe fidelidade?", a: "No plano mensal, não: cancele quando quiser. No anual, o valor é referente aos 12 meses contratados." },
  { q: "Quantos usuários posso cadastrar?", a: "Quantos quiser. Todos os planos têm usuários ilimitados." },
];

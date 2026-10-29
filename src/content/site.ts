export const SITE = {
  name: "Portym",
  url: "https://portal.portym.cloud",
  signupUrl: "https://painel.portym.cloud/cadastro",
  loginUrl: "https://painel.portym.cloud",
  // Número de WhatsApp comercial/suporte (DDI + DDD + número). Substitua pelo número real.
  whatsappNumber: "5511999999999",
  email: "contato@portym.cloud",
  trialBadge: ["14 dias grátis", "Usuários ilimitados", "Cancele quando quiser", "Sem cartão de crédito"],
};

export const whatsappLink = (msg: string) =>
  `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(msg)}`;

export type FeatureKey =
  | "gestao-de-locacao"
  | "cobranca-de-aluguel"
  | "repasse-automatico"
  | "reajuste-de-aluguel"
  | "crm-imobiliario"
  | "whatsapp-para-imobiliaria"
  | "portfolio-de-imoveis"
  | "portal-do-inquilino-e-proprietario"
  | "vendas-e-comissoes";

export const FEATURES: { slug: FeatureKey; title: string; short: string; icon: string }[] = [
  { slug: "whatsapp-para-imobiliaria", title: "Atendimento no WhatsApp", short: "Atendente virtual que apresenta imóveis e agenda visitas.", icon: "MessageCircle" },
  { slug: "cobranca-de-aluguel", title: "Cobrança automática", short: "Boleto, Pix e réguas de cobrança com multa e juros.", icon: "Receipt" },
  { slug: "repasse-automatico", title: "Repasse via Pix", short: "Proprietário recebe no dia certo, com extrato claro.", icon: "ArrowLeftRight" },
  { slug: "gestao-de-locacao", title: "Gestão de locação", short: "Contratos, vistorias, rescisões e reajustes.", icon: "FileText" },
  { slug: "reajuste-de-aluguel", title: "Reajuste automático", short: "IGP-M e IPCA calculados com aviso prévio.", icon: "TrendingUp" },
  { slug: "crm-imobiliario", title: "CRM imobiliário", short: "Funil, origem do lead e match de imóveis.", icon: "Users" },
  { slug: "portfolio-de-imoveis", title: "Portfólio de imóveis", short: "Vitrine online com link próprio e busca rápida.", icon: "Home" },
  { slug: "portal-do-inquilino-e-proprietario", title: "Portal do inquilino e proprietário", short: "2ª via, extratos e informe de rendimentos.", icon: "KeyRound" },
  { slug: "vendas-e-comissoes", title: "Vendas e comissões", short: "Venda, locação e temporada com comissão automática.", icon: "Handshake" },
];

export const NAV_SEGMENTS = [
  { to: "/para-corretores", title: "Para corretores", short: "Agilidade no WhatsApp e cobrança sem burocracia." },
  { to: "/para-imobiliarias", title: "Para imobiliárias", short: "Equipe ilimitada, carteira em escala, zero erro no repasse." },
] as const;

export const NAV_COMPARE = [
  { to: "/comparativo/kenlo", title: "Portym x Kenlo", short: "Preço transparente e usuários ilimitados." },
  { to: "/comparativo/planilha", title: "Portym x Planilha", short: "Menos tempo perdido, menos erro, mais segurança." },
] as const;

export const SITE = {
  name: "Portym",
  url: "https://portal.portym.cloud",
  signupUrl: "https://painel.portym.cloud/cadastro",
  loginUrl: "https://painel.portym.cloud",
  // API do Portym (formulário de contato do site).
  apiUrl: "https://api.portym.cloud/api",
  email: "portym.adm@gmail.com",
  trialBadge: ["14 dias grátis", "Usuários ilimitados", "Cancele quando quiser", "Sem cartão de crédito"],
};


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
  { slug: "whatsapp-para-imobiliaria", title: "Atendimento no WhatsApp", short: "Robô com menu que apresenta imóveis e passa o interessado ao corretor.", icon: "MessageCircle" },
  { slug: "cobranca-de-aluguel", title: "Cobrança automática", short: "Boleto com Pix, lembretes no WhatsApp, multa e juros.", icon: "Receipt" },
  { slug: "repasse-automatico", title: "Repasse via Pix", short: "Proprietário recebe no dia certo, com extrato claro.", icon: "ArrowLeftRight" },
  { slug: "gestao-de-locacao", title: "Gestão de locação", short: "Contratos, cobranças, repasses e reajustes num só lugar.", icon: "FileText" },
  { slug: "reajuste-de-aluguel", title: "Reajuste automático", short: "IGP-M e IPCA buscados no Banco Central e calculados.", icon: "TrendingUp" },
  { slug: "crm-imobiliario", title: "CRM imobiliário", short: "Funil de arrastar, origem do cliente e aviso de imóvel compatível.", icon: "Users" },
  { slug: "portfolio-de-imoveis", title: "Portfólio de imóveis", short: "Vitrine online com link próprio e busca rápida.", icon: "Home" },
  { slug: "portal-do-inquilino-e-proprietario", title: "Portal do inquilino e proprietário", short: "2ª via, recibos, repasses e comprovantes.", icon: "KeyRound" },
  { slug: "vendas-e-comissoes", title: "Vendas e comissões", short: "Venda, locação e temporada com comissão de captador e vendedor.", icon: "Handshake" },
];

export const NAV_SEGMENTS = [
  { to: "/para-corretores", title: "Para corretores", short: "Agilidade no WhatsApp e cobrança sem burocracia." },
  { to: "/para-imobiliarias", title: "Para imobiliárias", short: "Equipe ilimitada, carteira em escala, zero erro no repasse." },
] as const;

export const NAV_COMPARE = [
  { to: "/comparativo/kenlo", title: "Portym x Kenlo", short: "Preço transparente e usuários ilimitados." },
  { to: "/comparativo/planilha", title: "Portym x Planilha", short: "Menos tempo perdido, menos erro, mais segurança." },
] as const;

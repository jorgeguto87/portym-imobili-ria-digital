import type { FAQ } from "./features";

/** Ative/desative seções da home sem mexer nos componentes. */
export const HOME_FLAGS = {
  showTestimonials: false,
  showNumbers: false,
};

export const HERO = {
  title: "Sua imobiliária no automático: do primeiro contato no WhatsApp ao repasse no Pix.",
  subtitle: "Cobrança, repasse, portfólio e atendimento num só sistema. Sem custo por usuário, sem taxa por contrato.",
  primary: "Testar grátis por 14 dias",
  secondary: "Ver como funciona",
};

export const PILLARS = [
  { icon: "MessageCircle", title: "Atende sozinho no WhatsApp", desc: "Responde em segundos, apresenta imóveis, qualifica o cliente e agenda visitas, a qualquer hora." },
  { icon: "Repeat", title: "Cobra e repassa sozinho", desc: "Boleto e Pix enviados no WhatsApp, baixa automática e repasse por Pix ao proprietário." },
  { icon: "BadgeCheck", title: "Preço justo e transparente", desc: "Você paga pela quantidade de imóveis. Usuários ilimitados, sem taxa por contrato." },
];

export const STEPS = [
  { title: "Cadastre seus imóveis", desc: "Fotos, valores e contratos. Importamos sua planilha se você quiser." },
  { title: "O robô atende no WhatsApp", desc: "Apresenta imóveis, entende o perfil e agenda a visita com o corretor." },
  { title: "Feche o negócio", desc: "Contrato, garantias e comissões registrados num só lugar." },
  { title: "Cobrança e repasse automáticos", desc: "Inquilino recebe o Pix, proprietário recebe o repasse. Todo mês." },
];

export const BEFORE_AFTER = {
  before: ["Planilhas caóticas e versões diferentes", "Boleto gerado um a um", "Cobrar atrasado por ligação", "Repasse manual no internet banking", "Cliente sem resposta no fim de semana", "Reajuste esquecido"],
  after: ["Tudo num só sistema, sempre atualizado", "Cobranças geradas para toda a carteira", "Régua automática no WhatsApp", "Repasse por Pix com extrato", "Atendente virtual 24 horas", "Reajuste IGP-M/IPCA com aviso prévio"],
};

export const VS_TRADITIONAL: { label: string; portym: string; traditional: string }[] = [
  { label: "Cobrança por usuário", portym: "Usuários ilimitados", traditional: "Geralmente cobrada por usuário" },
  { label: "Taxa por contrato", portym: "Sem taxa por contrato", traditional: "Comum em alguns modelos" },
  { label: "Atendimento no WhatsApp", portym: "Atendente virtual nativo", traditional: "Integrações à parte" },
  { label: "Repasse ao proprietário", portym: "Pix automático", traditional: "Frequentemente manual" },
  { label: "Funcionalidades", portym: "Todas em todos os planos", traditional: "Módulos separados" },
  { label: "Preço", portym: "Publicado no site", traditional: "Sob consulta" },
];

export const HOME_FAQ: FAQ[] = [
  { q: "O que é o Portym?", a: "Um sistema para imobiliárias e corretores que reúne atendimento no WhatsApp, CRM, portfólio, gestão de locação, cobrança e repasse automáticos." },
  { q: "Preciso de cartão de crédito para o teste grátis?", a: "Não. Você testa por 14 dias sem cartão de crédito e cancela quando quiser." },
  { q: "Quantos usuários posso ter?", a: "Ilimitados em todos os planos. Você paga pela quantidade de imóveis, não por pessoa." },
  { q: "O Portym serve para corretor autônomo?", a: "Sim. O plano de entrada atende até 30 imóveis com todas as funcionalidades." },
  { q: "Consigo migrar da minha planilha ou sistema atual?", a: "Sim. Ajudamos a importar seus dados durante o período de teste." },
  { q: "Meus dados estão seguros?", a: "Sim. Usamos conexão criptografada, controle de acesso por usuário e seguimos a LGPD." },
];

export const TESTIMONIALS = [
  { name: "Nome do cliente", role: "Imobiliária exemplo • Cidade/UF", quote: "Depoimento real do cliente sobre o Portym." },
  { name: "Nome do cliente", role: "Corretor autônomo • Cidade/UF", quote: "Depoimento real do cliente sobre o Portym." },
  { name: "Nome do cliente", role: "Gestora • Cidade/UF", quote: "Depoimento real do cliente sobre o Portym." },
];

export const NUMBERS = [
  { value: 0, suffix: "+", label: "imóveis gerenciados" },
  { value: 0, suffix: "+", label: "cobranças enviadas" },
  { value: 0, suffix: "%", label: "repasses no prazo" },
];

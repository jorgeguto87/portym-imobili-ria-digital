export type BlogCategory = "Gestão" | "Locação" | "WhatsApp" | "Finanças";
export type Block = { type: "h2" | "h3" | "p"; text: string } | { type: "ul"; items: string[] };
export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: BlogCategory;
  tags: string[];
  author: string;
  date: string; // ISO
  body: Block[];
};

export const BLOG_CATEGORIES: BlogCategory[] = ["Gestão", "Locação", "WhatsApp", "Finanças"];

export const POSTS: Post[] = [
  {
    slug: "como-reduzir-inadimplencia-no-aluguel",
    title: "Como reduzir a inadimplência no aluguel: 7 práticas que funcionam",
    excerpt: "Do envio da cobrança no canal certo à régua de lembretes: o que realmente diminui atrasos na sua carteira.",
    category: "Finanças",
    tags: ["inadimplência", "cobrança", "Pix"],
    author: "Equipe Portym",
    date: "2026-09-15",
    body: [
      { type: "p", text: "A inadimplência é um dos maiores custos invisíveis de uma imobiliária. Além do dinheiro que não entra, ela consome horas da equipe em ligações, renegociações e conferências. A boa notícia é que boa parte dos atrasos não é má-fé: é esquecimento, falta de praticidade ou cobrança que não chegou." },
      { type: "h2", text: "1. Cobre no canal que o inquilino usa" },
      { type: "p", text: "E-mail ainda é importante, mas a maioria dos inquilinos lê o WhatsApp primeiro. Enviar a cobrança por lá, com o Pix copia-e-cola pronto, reduz a fricção e aumenta a taxa de pagamento em dia." },
      { type: "h2", text: "2. Use uma régua de lembretes" },
      { type: "p", text: "Uma régua é uma sequência de mensagens programadas. Um bom ponto de partida:" },
      { type: "ul", items: ["3 dias antes do vencimento: lembrete amigável com boleto e Pix", "No dia: aviso curto de que vence hoje", "2 dias após: mensagem com valor atualizado e 2ª via", "7 dias após: contato humano para entender a situação"] },
      { type: "h2", text: "3. Ofereça mais de uma forma de pagamento" },
      { type: "p", text: "Boleto, Pix e link de pagamento atendem perfis diferentes. Quanto mais fácil pagar, menor o atraso." },
      { type: "h2", text: "4. Desconto de pontualidade bem comunicado" },
      { type: "p", text: "Se o contrato prevê desconto por pagamento até uma data, deixe isso claro em todas as mensagens. É um incentivo concreto e simples." },
      { type: "h2", text: "5. Multa e juros sem margem para discussão" },
      { type: "p", text: "Calcular encargos à mão gera erros e discussões. Quando a 2ª via já sai com valores atualizados conforme o contrato, a conversa fica objetiva." },
      { type: "h2", text: "6. Análise cuidadosa na entrada" },
      { type: "p", text: "Garantias adequadas e uma boa análise de perfil evitam problemas lá na frente. Mantenha os vencimentos das garantias sob controle." },
      { type: "h2", text: "7. Acompanhe os números" },
      { type: "p", text: "Saiba quanto da carteira está em atraso, há quanto tempo e quais contratos se repetem. Com dados, você age antes de virar problema." },
      { type: "h3", text: "Conclusão" },
      { type: "p", text: "Automatizar cobrança e lembretes não substitui o relacionamento, mas libera sua equipe para cuidar dos casos que realmente precisam de atenção." },
    ],
  },
  {
    slug: "whatsapp-para-imobiliaria-guia-de-atendimento",
    title: "WhatsApp para imobiliária: guia prático para atender mais rápido sem perder leads",
    excerpt: "Tempo de resposta, qualificação, horários e transbordo para o corretor: como montar um atendimento que converte.",
    category: "WhatsApp",
    tags: ["WhatsApp", "leads", "atendimento"],
    author: "Equipe Portym",
    date: "2026-08-28",
    body: [
      { type: "p", text: "O WhatsApp virou a porta de entrada da maioria dos clientes de imóveis. Quem responde primeiro, com informação útil, sai na frente. Mas responder rápido o tempo todo é impossível sem processo." },
      { type: "h2", text: "Por que o tempo de resposta importa" },
      { type: "p", text: "Um cliente interessado costuma falar com várias imobiliárias ao mesmo tempo. Se a sua demora horas, ele já está conversando com outra. A primeira resposta precisa ser imediata e já trazer valor." },
      { type: "h2", text: "Qualifique antes de passar para o corretor" },
      { type: "p", text: "Algumas perguntas simples economizam muito tempo:" },
      { type: "ul", items: ["Compra ou locação?", "Qual bairro ou região?", "Quantos quartos e vagas?", "Qual a faixa de valor?", "Quando pretende se mudar?"] },
      { type: "h2", text: "Mostre imóveis reais, não promessas" },
      { type: "p", text: "Enviar fotos, valores e o link do imóvel na própria conversa mantém o cliente engajado. Uma vitrine online bem organizada ajuda muito nesse momento." },
      { type: "h2", text: "Defina horários e transbordo" },
      { type: "p", text: "Um atendente virtual pode cuidar das primeiras mensagens 24 horas por dia, mas o corretor precisa assumir no momento certo: visita marcada, proposta ou dúvida específica. Deixe essas regras claras." },
      { type: "h2", text: "Registre tudo no CRM" },
      { type: "p", text: "Conversa que não vira registro vira lead perdido. Cada contato deve gerar um cadastro com origem, perfil e próximos passos." },
      { type: "h3", text: "Resumo" },
      { type: "p", text: "Resposta imediata, qualificação, imóveis reais, regras de transbordo e registro no CRM: com esses cinco pontos, seu WhatsApp passa de caixa de mensagens a máquina de negócios." },
    ],
  },
  {
    slug: "reajuste-de-aluguel-igpm-ou-ipca",
    title: "Reajuste de aluguel: IGP-M ou IPCA? Entenda e aplique sem erro",
    excerpt: "Como funciona o reajuste anual, a diferença entre os índices e como comunicar o novo valor ao inquilino.",
    category: "Locação",
    tags: ["reajuste", "IGP-M", "IPCA", "contrato"],
    author: "Equipe Portym",
    date: "2026-07-10",
    body: [
      { type: "p", text: "O reajuste anual do aluguel está previsto na maioria dos contratos e serve para recompor o valor diante da inflação. Ainda assim, é uma das tarefas mais esquecidas e mais sensíveis da gestão de locação." },
      { type: "h2", text: "Como funciona o reajuste" },
      { type: "p", text: "Normalmente, a cada 12 meses de contrato aplica-se a variação acumulada de um índice definido em contrato. O novo valor passa a valer a partir do mês de aniversário." },
      { type: "h2", text: "IGP-M e IPCA: qual a diferença?" },
      { type: "p", text: "O IGP-M, calculado pela FGV, sofre influência de preços no atacado e do câmbio. O IPCA, medido pelo IBGE, é o índice oficial de inflação ao consumidor. Por terem composições diferentes, podem variar bastante de um ano para outro." },
      { type: "ul", items: ["IGP-M: tradicional em contratos de locação, mais volátil", "IPCA: reflete o custo de vida do consumidor, costuma ser mais estável", "O índice válido é sempre o que está no contrato"] },
      { type: "h2", text: "Comunique com antecedência" },
      { type: "p", text: "Avisar o inquilino com antecedência, mostrando o índice e o cálculo, evita surpresas e conflitos. Transparência aqui fortalece a relação." },
      { type: "h2", text: "E quando há negociação?" },
      { type: "p", text: "Proprietário e inquilino podem combinar um percentual diferente. Nesse caso, registre o acordo por escrito e mantenha o histórico junto ao contrato." },
      { type: "h2", text: "Automatize para não esquecer" },
      { type: "p", text: "Com uma agenda de reajustes e cálculo automático do índice acumulado, você garante que nenhum contrato fique para trás e que as cobranças futuras já saiam corretas." },
    ],
  },
];

export function readingMinutes(post: Post): number {
  const words = post.body
    .map((b) => ("text" in b ? b.text : b.items.join(" ")))
    .join(" ")
    .split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

export const slugify = (s: string) =>
  s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

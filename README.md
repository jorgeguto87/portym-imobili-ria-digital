# Portym Imobiliária Digital

Crie o site institucional (marketing) do PORTYM, um SaaS brasileiro para imobiliárias e corretores de imóveis. Idioma: português do Brasil. Endereço final: https://portal.portym.cloud. Objetivo: converter visitantes em cadastros de teste grátis de 14 dias.

IDENTIDADE
- Marca: Portym. Logo anexada: casa estilizada com "ym" + palavra "Portym" (usar os arquivos anexados logo-portym-clara e logo-portym-escura conforme o fundo claro/escuro).
- Cores: verde-petróleo #0F766E (primária), quase-preto #151515, branco, cinza claro #F5F7F8; acento #14B8A6. Tipografia: títulos em "Plus Jakarta Sans" (700–800), texto em "Inter".
- Estilo: moderno e impactante, confiável. Hero com gradiente escuro → petróleo, mockups inclinados do painel e de celular com conversa de WhatsApp interativa/visual, cartões com glassmorphism sutil, cantos arredondados grandes (20–28px), sombras suaves, micro-animações suaves ao rolar, seções alternando fundo claro/escuro. Design refinado e profissional sem cara de template genérico.

PROPOSTA PRINCIPAL
- Hero: "Sua imobiliária no automático: do primeiro contato no WhatsApp ao repasse no Pix."
- Subtítulo: "Cobrança, repasse, portfólio e atendimento num só sistema. Sem custo por usuário, sem taxa por contrato."
- Botões: "Testar grátis por 14 dias" (primário → https://painel.portym.cloud/cadastro) e "Ver como funciona" (scroll suave até a demonstração).
- Selo: "14 dias grátis • Usuários ilimitados • Cancele quando quiser • Sem cartão de crédito".

PÁGINAS E ROTAS (React Router, mobile-first):
1. "/" Início:
   - Hero completo com CTAs e mockups (Dashboard + conversa WhatsApp realista de atendimento imobiliário e envio de Pix/boleto).
   - 3 pilares: Atende sozinho no WhatsApp / Cobra e repassa sozinho / Preço justo e transparente.
   - "Como funciona" em 4 passos (cadastre imóveis → o robô atende no WhatsApp → feche o negócio → cobrança e repasse automáticos).
   - Grade interativa de funcionalidades com links para cada página específica.
   - "Antes x Depois" (planilha caótica, cobrança manual, repasse manual no banco vs Portym tudo automático).
   - "Portym x sistemas tradicionais" comparativo de proposta de valor.
   - Resumo e calculadora rápida de planos/preços.
   - FAQ em accordion com JSON-LD schema.
   - CTA final imersivo.
   - Seções "Depoimentos" e "Números" prontas no código com flag booleana em `src/content/home.ts` (desativadas por padrão com toggle fácil).

2. "/funcionalidades": Visão geral detalhada de todas as soluções em cartões ricos e interativos.

3. Páginas dedicadas por funcionalidade (com FeaturePageTemplate reutilizável: H1 com benefício claro, problema vs solução, como funciona em 3 passos com mockup visual, lista de benefícios detalhados, FAQ específico de 4-6 perguntas com accordion, seção "Veja também" com 3 funções relacionadas e CTA final):
   - "/gestao-de-locacao" Gestão de locação completa (contratos, vistorias, rescisões, reajustes)
   - "/cobranca-de-aluguel" Cobrança automática (boleto, Pix, link de pagamento, réguas de cobrança WhatsApp, multas e juros automáticos, entrada/caução)
   - "/repasse-automatico" Repasse ao proprietário por Pix (no recebimento ou dia fixo, extrato transparente)
   - "/reajuste-de-aluguel" Reajuste automático anual por IGP-M e IPCA com aviso prévio
   - "/crm-imobiliario" Funil de clientes, pipeline, origem do lead, match automático de imóveis
   - "/whatsapp-para-imobiliaria" Atendente virtual inteligente que apresenta imóveis, filtra perfil, agenda visitas e respeita horários
   - "/portfolio-de-imoveis" Vitrine online moderna com link próprio, busca rápida, fotos em alta e compartilhamento social inteligente
   - "/portal-do-inquilino-e-proprietario" Área exclusiva do inquilino (boletos, Pix, 2ª via) e do proprietário (extratos, informes de rendimentos DIMOB)
   - "/vendas-e-comissoes" Gestão de vendas, locação e temporada; cálculo automático de comissões de captador e corretor

4. Segmentos de público:
   - "/para-corretores": focado em corretores autônomos (agilidade no WhatsApp, não perder leads, cobrança sem burocracia)
   - "/para-imobiliarias": focado em imobiliárias e gestores (equipe sem limites de custo por usuário, escala de carteira, redução de inadimplência e repasses sem erros)

5. "/precos":
   - Seletor Mensal / Anual (com 20% de desconto no plano anual).
   - Planos:
     * Até 30 imóveis — R$ 99,90/mês
     * Até 60 imóveis — R$ 149,90/mês
     * Até 120 imóveis — R$ 199,90/mês (destaque: "Mais escolhido / Melhor custo-benefício")
     * Até 250 imóveis — R$ 249,90/mês
     * Até 500 imóveis — R$ 319,90/mês
     * Acima de 500 imóveis — "Fale com um consultor" (link direto para WhatsApp com mensagem personalizada)
   - Destaques: Todas as funcionalidades inclusas em todos os planos, usuários ilimitados, sem taxa por contrato ou cobrança extra por boleto gerado no Portym.
   - Tabela comparativa "O que está incluso" detalhada.
   - FAQ específico de contratação, migração e formas de pagamento.

6. Comparativos de mercado:
   - "/comparativo/kenlo" (comparativo respeitoso, neutro e factual destacando precificação transparente, usuários ilimitados e automação nativa)
   - "/comparativo/planilha" (comparativo prático mostrando tempo perdido, risco de erros em repasse/cálculos e segurança da informação)

7. Blog e artigos:
   - "/blog": lista com busca, cartões e filtros por categoria (Gestão, Locação, WhatsApp, Finanças).
   - "/blog/:slug": leitura completa com sumário interativo na barra lateral, tempo estimado de leitura, autor, data, tags e CTA fixo no desktop. Incluir 3 artigos iniciais completos e relevantes sobre gestão imobiliária.

8. Institucional:
   - "/sobre": missão, visão, foco na tecnologia imobiliária descomplicada.
   - "/contato": formulário funcional com validação e feedback visual + link direto para suporte via WhatsApp.
   - "/termos": Termos de Uso claros e adequados para SaaS B2B.
   - "/privacidade": Política de Privacidade em conformidade com a LGPD brasileira.

NAVEGAÇÃO:
- Header fixo com efeito blur: Logo, Mega-menu de "Funcionalidades", link "Para quem" (dropdown Corretores / Imobiliárias), "Preços", "Comparativos", "Blog", link "Entrar" (→ https://painel.portym.cloud) e botão de destaque "Testar grátis" (→ https://painel.portym.cloud/cadastro). Drawer lateral mobile suave e completo.
- Footer robusto e profissional com mapa do site, links rápidos para todas as páginas de funcionalidades, contatos, selos de segurança e copyright.

ARQUITETURA TÉCNICA E CONTEÚDOS:
- Organizar todos os textos, dados de planos, FAQs e flags de seções em arquivos dedicados em `src/content/` para fácil manutenção sem alterar componentes.
- Componentes reutilizáveis bem acabados: PhoneMockup com simulação realista de WhatsApp, DashboardMockup com gráficos e métricas de imobiliária, PricingTable com toggle, ComparisonTable e FAQAccordion.
- SEO técnico completo: Meta tags dinâmicas, canonical apontando para https://portal.portym.cloud, Open Graph, Twitter Cards, JSON-LD Schema (Organization, SoftwareApplication com os planos, FAQPage e Breadcrumbs), robots.txt e sitemap.xml em public/.
- Todos os links de cadastro e login devem apontar para https://painel.portym.cloud/cadastro e https://painel.portym.cloud.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/e5abda7c-92c4-435a-af44-e8a76bf452e5).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

import { Fragment, useEffect, useState } from "react";
import { CheckCheck, Phone, Video } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Simulação do robô do Portym no WhatsApp. Os textos seguem as mensagens
 * reais do sistema (menu, perguntas, cartão do imóvel, registro de
 * interesse e lembrete automático de aluguel) — se o robô mudar, atualize aqui.
 */
type Msg =
  | { from: "client" | "bot"; text: string }
  | { from: "divider"; text: string };

const CONVERSATION: Msg[] = [
  { from: "client", text: "Oi" },
  {
    from: "bot",
    text: "Olá! Seja bem-vindo(a). 😊 Como posso ajudar?\n\n👇 Escolha uma opção:\n\n1️⃣ Comprar um imóvel\n2️⃣ Vender/anunciar um imóvel\n3️⃣ Alugar um imóvel\n4️⃣ Financeiro (situação do meu aluguel)\n5️⃣ Falar com um corretor\n6️⃣ Portal do Cliente / Portal do Proprietário",
  },
  { from: "client", text: "3" },
  { from: "bot", text: "Que tipo de imóvel você procura?\n1️⃣ Casa\n2️⃣ Apartamento\n3️⃣ Terreno\n4️⃣ Comercial\n5️⃣ Chácara/Sítio\n6️⃣ Kitnet/Studio" },
  { from: "client", text: "2" },
  { from: "bot", text: "Em qual cidade ou bairro você tem interesse? (ou digite *qualquer* para não filtrar)" },
  { from: "client", text: "Jardim Europa" },
  { from: "bot", text: "Qual o valor máximo que você pretende investir? Pode escrever do seu jeito (ex: 300000, 300.000 ou 300 mil). Ou digite *qualquer*." },
  { from: "client", text: "2500" },
  { from: "bot", text: "Quantos quartos no mínimo? (só números) Ou digite *qualquer*." },
  { from: "client", text: "2" },
  {
    from: "bot",
    text: "🏠 *Apartamento 2 quartos* (1/3)\nJardim Europa — Sua Cidade\n2 quarto(s) · 1 vaga(s)\nAluguel: R$ 2.300,00\n\n1️⃣ Ver detalhes completos\n2️⃣ Próximo imóvel\n3️⃣ Voltar ao menu",
  },
  { from: "client", text: "1" },
  {
    from: "bot",
    text: "🏠 *Apartamento 2 quartos*\nRua das Flores, Jardim Europa — Sua Cidade\n\n2 quarto(s) · 1 suíte(s) · 2 banheiro(s) · 1 vaga(s)\nÁrea: 68m²\nAluguel: R$ 2.300,00 + condomínio R$ 480,00\n\nMais fotos: portym.cloud/p/horizonte/imoveis/…\n\nDigite *SIM* se tiver interesse neste imóvel, ou *0* para voltar à lista.",
  },
  { from: "client", text: "SIM" },
  { from: "bot", text: "Show! Registramos seu interesse e um corretor vai entrar em contato com você. 🎉" },
  { from: "divider", text: "Contrato fechado · lembrete automático" },
  {
    from: "bot",
    text: "📅 *Seu aluguel vence em breve*\n\nApartamento 2 quartos\nAluguel referente a outubro/2026 — vencimento 10/11/2026\nValor: R$ 2.780,00\n\nPague aqui: asaas.com/i/…\nLinha digitável: 34191.79001 01043.510047…\n\nPix copia e cola:\n00020126580014br.gov.bcb.pix…",
  },
];

export function PhoneMockup({ className, messages = CONVERSATION }: { className?: string; messages?: Msg[] }) {
  const [count, setCount] = useState(1);
  useEffect(() => {
    const t = setInterval(() => setCount((c) => (c >= messages.length + 3 ? 1 : c + 1)), 1500);
    return () => clearInterval(t);
  }, [messages.length]);
  const shown = messages.slice(0, Math.min(count, messages.length));
  const typing = count < messages.length && messages[count]?.from === "bot";

  return (
    <div className={cn("relative w-[290px] rounded-[44px] border-[10px] border-ink bg-ink shadow-glow", className)} aria-label="Simulação do atendimento do Portym no WhatsApp">
      <div className="absolute left-1/2 top-2 z-10 h-5 w-24 -translate-x-1/2 rounded-full bg-ink" />
      <div className="overflow-hidden rounded-[34px] bg-chat-bg">
        <div className="flex items-center gap-2 bg-whatsapp px-4 pb-3 pt-8 text-ink-foreground">
          <div className="grid h-8 w-8 place-items-center rounded-full bg-accent text-xs font-bold">ym</div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold">Imobiliária Horizonte</p>
            <p className="text-[11px] opacity-80">{typing ? "digitando…" : "online"}</p>
          </div>
          <Video className="h-4 w-4 opacity-80" />
          <Phone className="h-4 w-4 opacity-80" />
        </div>
        <div className="flex h-[440px] flex-col justify-end gap-2 overflow-hidden px-3 py-3 text-[12px] leading-snug text-ink">
          {shown.map((m, i) => (
            <Bubble key={i} m={m} i={i} />
          ))}
          {typing && (
            <div className="w-14 shrink-0 rounded-2xl rounded-tl-sm bg-card px-3 py-2 shadow-sm">
              <span className="inline-flex gap-1">
                {[0, 1, 2].map((d) => (
                  <span key={d} className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground" style={{ animationDelay: `${d * 120}ms` }} />
                ))}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/** *negrito* do WhatsApp → <strong>. */
function WhatsText({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\*[^*\n]+\*)/g).map((part, i) =>
        part.startsWith("*") && part.endsWith("*") && part.length > 2 ? <strong key={i}>{part.slice(1, -1)}</strong> : <Fragment key={i}>{part}</Fragment>,
      )}
    </>
  );
}

function Bubble({ m, i }: { m: Msg; i: number }) {
  if (m.from === "divider") {
    return (
      <p className="animate-msg shrink-0 self-center rounded-lg bg-card/80 px-2.5 py-1 text-[10.5px] font-medium text-muted-foreground shadow-sm">{m.text}</p>
    );
  }
  const mine = m.from === "client";
  return (
    <div className={cn("animate-msg max-w-[86%] shrink-0 whitespace-pre-line break-words rounded-2xl px-3 py-2 shadow-sm", mine ? "self-end rounded-tr-sm bg-whatsapp-bubble" : "self-start rounded-tl-sm bg-card")}>
      <WhatsText text={m.text} />
      <span className="ml-2 inline-flex translate-y-0.5 items-center text-[10px] text-muted-foreground">
        10:{String(10 + i).padStart(2, "0")} {mine && <CheckCheck className="ml-0.5 h-3 w-3 text-accent" />}
      </span>
    </div>
  );
}

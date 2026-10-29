import { useEffect, useState } from "react";
import { CheckCheck, Copy, Home, Phone, Video } from "lucide-react";
import { cn } from "@/lib/utils";

type Msg =
  | { from: "client" | "bot"; text: string }
  | { from: "bot"; kind: "property" }
  | { from: "bot"; kind: "pix" };

const CONVERSATION: Msg[] = [
  { from: "client", text: "Oi! Vi o apto de 2 quartos no Jardim Europa. Ainda está disponível?" },
  { from: "bot", text: "Olá! Está sim 😊 Aluguel de R$ 2.300 + condomínio. Veja os detalhes:" },
  { from: "bot", kind: "property" },
  { from: "client", text: "Perfeito! Dá pra visitar sábado de manhã?" },
  { from: "bot", text: "Tenho sábado às 10h ou 11h30 com a corretora Ana. Qual prefere?" },
  { from: "client", text: "10h 👍" },
  { from: "bot", text: "Agendado! ✅ Ah, e aqui está o Pix do seu aluguel de outubro:" },
  { from: "bot", kind: "pix" },
];

export function PhoneMockup({ className, messages = CONVERSATION }: { className?: string; messages?: Msg[] }) {
  const [count, setCount] = useState(2);
  useEffect(() => {
    const t = setInterval(() => setCount((c) => (c >= messages.length + 3 ? 2 : c + 1)), 1400);
    return () => clearInterval(t);
  }, [messages.length]);
  const shown = messages.slice(0, Math.min(count, messages.length));
  const typing = count < messages.length && messages[count]?.from === "bot";

  return (
    <div className={cn("relative w-[290px] rounded-[44px] border-[10px] border-ink bg-ink shadow-glow", className)} aria-label="Simulação de conversa no WhatsApp">
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
        <div className="flex h-[440px] flex-col justify-end gap-2 overflow-hidden px-3 py-3 text-[12.5px] leading-snug text-ink">
          {shown.map((m, i) => (
            <Bubble key={i} m={m} />
          ))}
          {typing && (
            <div className="w-14 rounded-2xl rounded-tl-sm bg-card px-3 py-2 shadow-sm">
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

function Bubble({ m }: { m: Msg }) {
  const mine = m.from === "client";
  const base = cn("animate-msg max-w-[82%] rounded-2xl px-3 py-2 shadow-sm", mine ? "self-end rounded-tr-sm bg-whatsapp-bubble" : "self-start rounded-tl-sm bg-card");
  if ("kind" in m && m.kind === "property") {
    return (
      <div className={cn(base, "p-1.5")}>
        <div className="grid h-24 place-items-center rounded-xl bg-gradient-to-br from-primary to-accent text-primary-foreground">
          <Home className="h-8 w-8" />
        </div>
        <p className="mt-1.5 px-1 font-semibold">Apto 2 quartos • 68 m²</p>
        <p className="px-1 text-[11px] text-muted-foreground">Jardim Europa • 1 vaga • Varanda</p>
        <p className="px-1 pb-1 font-bold text-primary">R$ 2.300/mês</p>
      </div>
    );
  }
  if ("kind" in m && m.kind === "pix") {
    return (
      <div className={cn(base, "w-[82%]")}>
        <p className="text-[11px] font-semibold uppercase text-primary">Cobrança • Outubro</p>
        <p className="text-lg font-extrabold">R$ 2.780,00</p>
        <p className="text-[11px] text-muted-foreground">Vence 10/10 • Aluguel + condomínio</p>
        <div className="mt-2 flex items-center justify-center gap-1.5 rounded-lg bg-primary py-1.5 text-[11px] font-semibold text-primary-foreground">
          <Copy className="h-3 w-3" /> Copiar Pix
        </div>
        <p className="mt-1 text-center text-[11px] text-primary">Ver boleto</p>
      </div>
    );
  }
  return (
    <div className={base}>
      {"text" in m && m.text}
      <span className="ml-2 inline-flex translate-y-0.5 items-center text-[10px] text-muted-foreground">
        9:4{Math.min(9, m.from.length)} {mine && <CheckCheck className="ml-0.5 h-3 w-3 text-accent" />}
      </span>
    </div>
  );
}

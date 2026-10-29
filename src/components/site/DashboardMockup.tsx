import { ArrowUpRight, Building2, CircleDollarSign, Send, Users } from "lucide-react";
import { cn } from "@/lib/utils";

const bars = [42, 58, 51, 66, 72, 69, 84, 78, 91, 88, 96, 100];
const months = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];

export function DashboardMockup({ className }: { className?: string }) {
  return (
    <div className={cn("w-full max-w-[640px] overflow-hidden rounded-[24px] border border-border bg-card text-card-foreground shadow-glow", className)} aria-label="Painel do Portym">
      <div className="flex items-center gap-1.5 border-b border-border bg-muted px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-destructive/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-warn" />
        <span className="h-2.5 w-2.5 rounded-full bg-accent" />
        <span className="ml-3 rounded-md bg-card px-3 py-0.5 text-[11px] text-muted-foreground">painel.portym.cloud</span>
      </div>
      <div className="grid grid-cols-[52px_1fr]">
        <div className="flex flex-col items-center gap-4 border-r border-border bg-ink py-4 text-ink-foreground/60">
          <div className="grid h-8 w-8 place-items-center rounded-lg bg-primary text-[11px] font-bold text-primary-foreground">ym</div>
          <Building2 className="h-4 w-4" />
          <CircleDollarSign className="h-4 w-4 text-accent" />
          <Users className="h-4 w-4" />
          <Send className="h-4 w-4" />
        </div>
        <div className="space-y-3 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] text-muted-foreground">Outubro 2026</p>
              <p className="font-display text-sm font-bold">Visão financeira</p>
            </div>
            <span className="rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-semibold text-primary">Tudo automático</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[
              { l: "Recebido", v: "R$ 184,2 mil", d: "+12%" },
              { l: "Repassado", v: "R$ 162,9 mil", d: "Pix" },
              { l: "Inadimplência", v: "2,1%", d: "-38%" },
            ].map((k) => (
              <div key={k.l} className="rounded-xl border border-border p-2.5">
                <p className="text-[10px] text-muted-foreground">{k.l}</p>
                <p className="text-[13px] font-bold">{k.v}</p>
                <p className="flex items-center text-[10px] font-semibold text-primary">
                  <ArrowUpRight className="h-3 w-3" /> {k.d}
                </p>
              </div>
            ))}
          </div>
          <div className="rounded-xl border border-border p-3">
            <p className="mb-2 text-[11px] font-semibold">Recebimentos no ano</p>
            <div className="flex h-24 items-end gap-1.5">
              {bars.map((h, i) => (
                <div key={i} className="flex flex-1 flex-col items-center gap-1">
                  <div className={cn("w-full rounded-t-md", i === bars.length - 1 ? "bg-accent" : "bg-primary/70")} style={{ height: `${h}%` }} />
                  <span className="text-[9px] text-muted-foreground">{months[i]}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-1.5">
            {[
              { n: "Rua das Palmeiras, 120", s: "Pago • repasse enviado", ok: true },
              { n: "Av. Brasil, 2045 ap 31", s: "Lembrete enviado no WhatsApp", ok: false },
              { n: "Cond. Bela Vista, casa 8", s: "Pago • repasse dia 15", ok: true },
            ].map((r) => (
              <div key={r.n} className="flex items-center justify-between rounded-lg bg-muted px-3 py-1.5 text-[11px]">
                <span className="truncate font-medium">{r.n}</span>
                <span className={cn("shrink-0 font-semibold", r.ok ? "text-primary" : "text-warn")}>{r.s}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

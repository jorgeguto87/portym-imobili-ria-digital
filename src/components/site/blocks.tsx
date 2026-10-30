import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Check, Minus, X } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { FEATURES, SITE, type FeatureKey } from "@/content/site";
import type { FAQ } from "@/content/features";
import { ANNUAL_DISCOUNT, PLANS, brl, planForProperties, priceFor, type Plan } from "@/content/pricing";
import { Icon, Reveal } from "./ui";

export function FAQAccordion({ items, dark }: { items: FAQ[]; dark?: boolean }) {
  return (
    <Accordion type="single" collapsible className="mx-auto max-w-3xl space-y-3">
      {items.map((f, i) => (
        <AccordionItem
          key={f.q}
          value={`f${i}`}
          className={cn("rounded-2xl border px-5", dark ? "glass" : "border-border bg-card shadow-soft")}
        >
          <AccordionTrigger className="text-left text-base font-semibold hover:no-underline">{f.q}</AccordionTrigger>
          <AccordionContent className={cn("text-base leading-relaxed", dark ? "text-ink-foreground/70" : "text-muted-foreground")}>
            {f.a}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

export function FeatureGrid({ only, dark }: { only?: FeatureKey[]; dark?: boolean }) {
  const list = only ? FEATURES.filter((f) => only.includes(f.slug)) : FEATURES;
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {list.map((f, i) => (
        <Reveal key={f.slug} delay={i * 60}>
          <Link
            to={`/${f.slug}` as "/"}
            className={cn(
              "group flex h-full flex-col rounded-[24px] border p-6 transition duration-300 hover:-translate-y-1",
              dark ? "glass hover:border-accent/50" : "border-border bg-card shadow-soft hover:border-primary/40",
            )}
          >
            <div className="mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-primary/15 text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
              <Icon name={f.icon} className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold">{f.title}</h3>
            <p className={cn("mt-2 flex-1 text-sm", dark ? "text-ink-foreground/70" : "text-muted-foreground")}>{f.short}</p>
            <span className={cn("mt-5 inline-flex items-center gap-1 text-sm font-semibold", dark ? "text-accent" : "text-primary")}>
              Saiba mais <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </span>
          </Link>
        </Reveal>
      ))}
    </div>
  );
}

export function CycleToggle({ cycle, onChange }: { cycle: "mensal" | "anual"; onChange: (c: "mensal" | "anual") => void }) {
  return (
    <div className="inline-flex rounded-full border border-border bg-card p-1 shadow-soft" role="radiogroup" aria-label="Ciclo de cobrança">
      {(["mensal", "anual"] as const).map((c) => (
        <button
          key={c}
          role="radio"
          aria-checked={cycle === c}
          onClick={() => onChange(c)}
          className={cn("rounded-full px-5 py-2 text-sm font-semibold capitalize transition", cycle === c ? "bg-primary text-primary-foreground" : "text-muted-foreground")}
        >
          {c} {c === "anual" && <span className={cn("ml-1 text-xs", cycle === c ? "text-primary-foreground/80" : "text-primary")}>-{Math.round(ANNUAL_DISCOUNT * 100)}%</span>}
        </button>
      ))}
    </div>
  );
}

// Acima de 500 imóveis: formulário de contato (a equipe Portym retorna).
const consultorLink = "/contato";

function PlanCard({ plan, cycle }: { plan: Plan; cycle: "mensal" | "anual" }) {
  const price = priceFor(plan, cycle);
  const featured = !!plan.highlight;
  return (
    <div className={cn("relative flex flex-col rounded-[24px] border p-6", featured ? "border-primary bg-ink text-ink-foreground shadow-glow lg:-translate-y-3" : "border-border bg-card shadow-soft")}>
      {featured && <span className="absolute -top-3 left-6 rounded-full bg-accent px-3 py-1 text-xs font-bold text-ink">{plan.highlight}</span>}
      {plan.name && <p className={cn("text-xs font-bold uppercase tracking-wider", featured ? "text-accent" : "text-primary")}>{plan.name}</p>}
      <h3 className="text-lg font-bold">{plan.label}</h3>
      {price != null ? (
        <>
          <p className="mt-4">
            <span className="font-display text-4xl font-extrabold">{brl(price)}</span>
            <span className={cn("text-sm", featured ? "text-ink-foreground/70" : "text-muted-foreground")}>/mês</span>
          </p>
          <p className={cn("mt-1 h-5 text-xs", featured ? "text-ink-foreground/60" : "text-muted-foreground")}>
            {cycle === "anual" ? `${brl(price * 12)} cobrados anualmente` : "cobrado mensalmente"}
          </p>
        </>
      ) : (
        <>
          <p className="mt-4 font-display text-3xl font-extrabold">Sob medida</p>
          <p className="mt-1 h-5 text-xs text-muted-foreground">condições para grandes carteiras</p>
        </>
      )}
      <ul className={cn("my-6 flex-1 space-y-2 text-sm", featured ? "text-ink-foreground/80" : "text-muted-foreground")}>
        {["Todas as funcionalidades", "Usuários ilimitados", "Sem taxa por contrato", "Treinamento da equipe"].map((t) => (
          <li key={t} className="flex gap-2">
            <Check className="h-4 w-4 shrink-0 text-accent" /> {t}
          </li>
        ))}
      </ul>
      {price != null ? (
        <a href={SITE.signupUrl} className={cn("rounded-full py-3 text-center text-sm font-semibold transition", featured ? "bg-accent text-ink hover:bg-accent/90" : "bg-primary text-primary-foreground hover:bg-primary/90")}>
          Testar grátis
        </a>
      ) : (
        <a href={consultorLink} className="rounded-full border border-primary py-3 text-center text-sm font-semibold text-primary transition hover:bg-primary/5">
          Fale com um consultor
        </a>
      )}
    </div>
  );
}

export function PricingTable() {
  const [cycle, setCycle] = useState<"mensal" | "anual">("mensal");
  return (
    <div>
      <div className="mb-10 flex justify-center">
        <CycleToggle cycle={cycle} onChange={setCycle} />
      </div>
      <div className="grid gap-6 pt-3 sm:grid-cols-2 lg:grid-cols-3">
        {PLANS.map((p) => (
          <PlanCard key={p.id} plan={p} cycle={cycle} />
        ))}
      </div>
    </div>
  );
}

export function PriceCalculator() {
  const [n, setN] = useState(80);
  const [cycle, setCycle] = useState<"mensal" | "anual">("mensal");
  const plan = planForProperties(n);
  const price = priceFor(plan, cycle);
  return (
    <div className="mx-auto grid max-w-4xl gap-8 rounded-[28px] border border-border bg-card p-6 shadow-soft sm:p-10 md:grid-cols-2">
      <div>
        <label className="text-sm font-semibold text-muted-foreground" htmlFor="calc">Quantos imóveis você administra?</label>
        <p className="mt-2 font-display text-5xl font-extrabold text-primary">{n >= 600 ? "500+" : n}</p>
        <Slider id="calc" className="mt-6" min={1} max={600} step={1} value={[n]} onValueChange={(v) => setN(v[0] ?? 1)} aria-label="Quantidade de imóveis" />
        <div className="mt-6">
          <CycleToggle cycle={cycle} onChange={setCycle} />
        </div>
      </div>
      <div className="flex flex-col justify-center rounded-[22px] bg-ink p-6 text-ink-foreground">
        <p className="text-sm text-ink-foreground/70">Plano ideal</p>
        <p className="text-xl font-bold">{plan.name ? `${plan.name} · ` : ""}{plan.label}</p>
        {price != null ? (
          <>
            <p className="mt-3 font-display text-4xl font-extrabold">{brl(price)}<span className="text-base font-normal text-ink-foreground/60">/mês</span></p>
            <p className="mt-1 text-sm text-accent">Usuários ilimitados • tudo incluso</p>
            <a href={SITE.signupUrl} className="mt-6 rounded-full bg-accent py-3 text-center text-sm font-semibold text-ink">Testar grátis por 14 dias</a>
          </>
        ) : (
          <a href={consultorLink} className="mt-6 rounded-full bg-accent py-3 text-center text-sm font-semibold text-ink">Fale com um consultor</a>
        )}
        <Link to="/precos" className="mt-3 text-center text-sm text-ink-foreground/70 underline-offset-4 hover:underline">Ver todos os planos</Link>
      </div>
    </div>
  );
}

export type CompareRow = { label: string; a: string | boolean; b: string | boolean };

export function ComparisonTable({ rows, aLabel = "Portym", bLabel }: { rows: CompareRow[]; aLabel?: string; bLabel: string }) {
  const cell = (v: string | boolean, mine: boolean) =>
    typeof v === "boolean" ? (
      v ? <Check className={cn("mx-auto h-5 w-5", mine ? "text-primary" : "text-muted-foreground")} /> : <X className="mx-auto h-5 w-5 text-destructive/70" />
    ) : v === "-" ? (
      <Minus className="mx-auto h-5 w-5 text-muted-foreground" />
    ) : (
      v
    );
  return (
    <div className="overflow-x-auto rounded-[24px] border border-border bg-card shadow-soft">
      <table className="w-full min-w-[560px] text-sm">
        <thead>
          <tr className="border-b border-border">
            <th className="p-4 text-left font-semibold text-muted-foreground">Critério</th>
            <th className="bg-primary/5 p-4 text-center font-display text-base font-bold text-primary">{aLabel}</th>
            <th className="p-4 text-center font-display text-base font-bold">{bLabel}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.label} className="border-b border-border last:border-0">
              <td className="p-4 font-medium">{r.label}</td>
              <td className="bg-primary/5 p-4 text-center font-semibold">{cell(r.a, true)}</td>
              <td className="p-4 text-center text-muted-foreground">{cell(r.b, false)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

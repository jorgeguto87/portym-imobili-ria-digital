import { useEffect, useRef, useState, type ReactNode } from "react";
import * as Icons from "lucide-react";
import { ArrowRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { SITE } from "@/content/site";
// Logos servidos de /public (o endereço da Lovable só funciona na hospedagem dela).
const LOGO_CLARA = "/logo-portym-clara.png";
const LOGO_ESCURA = "/logo-portym-escura.png";

export function Logo({ variant = "dark", className }: { variant?: "light" | "dark"; className?: string }) {
  return (
    <img
      src={variant === "light" ? LOGO_CLARA : LOGO_ESCURA}
      alt="Portym"
      width={474}
      height={382}
      className={cn("h-10 w-auto", className)}
    />
  );
}

export function Icon({ name, className }: { name: string; className?: string }) {
  const C = (Icons as unknown as Record<string, Icons.LucideIcon>)[name] ?? Icons.Sparkles;
  return <C className={className} />;
}

export function Reveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} data-visible={visible} className={cn("reveal", className)} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

export function Section({ children, dark, className, id }: { children: ReactNode; dark?: boolean; className?: string; id?: string }) {
  return (
    <section id={id} className={cn("py-20 sm:py-28", dark ? "bg-ink text-ink-foreground" : "", className)}>
      <div className="mx-auto max-w-7xl px-5 sm:px-8">{children}</div>
    </section>
  );
}

export function SectionTitle({ eyebrow, title, desc, dark, center = true }: { eyebrow?: string; title: string; desc?: string; dark?: boolean; center?: boolean }) {
  return (
    <Reveal className={cn("mb-12 max-w-3xl", center && "mx-auto text-center")}>
      {eyebrow && (
        <span className={cn("mb-3 inline-block text-sm font-semibold uppercase tracking-widest", dark ? "text-accent" : "text-primary")}>
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">{title}</h2>
      {desc && <p className={cn("mt-4 text-lg", dark ? "text-ink-foreground/70" : "text-muted-foreground")}>{desc}</p>}
    </Reveal>
  );
}

export function CtaButton({ children = "Testar grátis por 14 dias", className, size = "lg" }: { children?: ReactNode; className?: string; size?: "md" | "lg" }) {
  return (
    <a
      href={SITE.signupUrl}
      className={cn(
        "group inline-flex items-center justify-center gap-2 rounded-full bg-primary font-semibold text-primary-foreground shadow-glow transition hover:-translate-y-0.5 hover:bg-primary/90",
        size === "lg" ? "px-7 py-4 text-base" : "px-5 py-2.5 text-sm",
        className,
      )}
    >
      {children}
      <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
    </a>
  );
}

export function TrialBadge({ dark }: { dark?: boolean }) {
  return (
    <ul className={cn("flex flex-wrap gap-x-5 gap-y-2 text-sm", dark ? "text-ink-foreground/80" : "text-muted-foreground")}>
      {SITE.trialBadge.map((t) => (
        <li key={t} className="flex items-center gap-1.5">
          <Check className="h-4 w-4 text-accent" /> {t}
        </li>
      ))}
    </ul>
  );
}

export function FinalCta({ title = "Coloque sua imobiliária no automático hoje", desc = "Comece seu teste grátis em menos de 2 minutos." }: { title?: string; desc?: string }) {
  return (
    <section className="px-5 py-20 sm:px-8">
      <Reveal className="relative mx-auto max-w-6xl overflow-hidden rounded-[28px] bg-hero px-6 py-16 text-center text-ink-foreground shadow-glow sm:px-12 sm:py-20">
        <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-accent/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-10 h-72 w-72 rounded-full bg-primary/40 blur-3xl" />
        <h2 className="relative mx-auto max-w-3xl text-3xl font-extrabold sm:text-5xl">{title}</h2>
        <p className="relative mx-auto mt-4 max-w-xl text-lg text-ink-foreground/75">{desc}</p>
        <div className="relative mt-8 flex justify-center">
          <CtaButton />
        </div>
        <div className="relative mt-6 flex justify-center">
          <TrialBadge dark />
        </div>
      </Reveal>
    </section>
  );
}

export function PageHero({ eyebrow, title, subtitle, children }: { eyebrow?: string; title: string; subtitle?: string; children?: ReactNode }) {
  return (
    <section className="relative overflow-hidden bg-hero pb-20 pt-32 text-ink-foreground sm:pt-40">
      <div className="mx-auto max-w-5xl px-5 text-center sm:px-8">
        {eyebrow && <span className="glass mb-5 inline-block rounded-full px-4 py-1.5 text-sm font-medium text-accent">{eyebrow}</span>}
        <h1 className="text-4xl font-extrabold leading-[1.1] sm:text-5xl lg:text-6xl">{title}</h1>
        {subtitle && <p className="mx-auto mt-5 max-w-2xl text-lg text-ink-foreground/75">{subtitle}</p>}
        {children}
      </div>
    </section>
  );
}

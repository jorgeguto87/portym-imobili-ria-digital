import { createFileRoute } from "@tanstack/react-router";
import { Check, X } from "lucide-react";
import { pageHead, faqJsonLd } from "@/lib/seo";
import { SITE } from "@/content/site";
import { PLANS } from "@/content/pricing";
import { HERO, PILLARS, STEPS, BEFORE_AFTER, VS_TRADITIONAL, HOME_FAQ, HOME_FLAGS, TESTIMONIALS, NUMBERS } from "@/content/home";
import { CtaButton, FinalCta, Icon, Reveal, Section, SectionTitle, TrialBadge } from "@/components/site/ui";
import { PhoneMockup } from "@/components/site/PhoneMockup";
import { DashboardMockup } from "@/components/site/DashboardMockup";
import { ComparisonTable, FAQAccordion, FeatureGrid, PriceCalculator } from "@/components/site/blocks";

export const Route = createFileRoute("/")({
  head: () =>
    pageHead({
      title: "Portym — Sistema para imobiliárias no automático",
      description: HERO.subtitle,
      path: "/",
      jsonLd: [
        faqJsonLd(HOME_FAQ),
        { "@context": "https://schema.org", "@type": "Organization", name: "Portym", url: SITE.url },
        {
          "@context": "https://schema.org", "@type": "SoftwareApplication", name: "Portym", applicationCategory: "BusinessApplication", operatingSystem: "Web",
          offers: PLANS.filter((p) => p.monthly).map((p) => ({ "@type": "Offer", name: p.label, price: p.monthly, priceCurrency: "BRL" })),
        },
      ],
    }),
  component: Home,
});

function Home() {
  return (
    <>
      <section className="relative overflow-hidden bg-hero pb-24 pt-32 text-ink-foreground sm:pt-40">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <h1 className="text-4xl font-extrabold leading-[1.08] sm:text-5xl lg:text-6xl">{HERO.title}</h1>
            <p className="mt-6 max-w-xl text-lg text-ink-foreground/75">{HERO.subtitle}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <CtaButton>{HERO.primary}</CtaButton>
              <a href="#como-funciona" className="glass rounded-full px-7 py-4 font-semibold">{HERO.secondary}</a>
            </div>
            <div className="mt-8"><TrialBadge dark /></div>
          </div>
          <div className="relative flex justify-center">
            <DashboardMockup className="hidden rotate-[-4deg] sm:block" />
            <PhoneMockup className="animate-float sm:absolute sm:-bottom-16 sm:right-0 sm:rotate-[4deg]" />
          </div>
        </div>
      </section>

      <Section>
        <div className="grid gap-6 md:grid-cols-3">
          {PILLARS.map((p, i) => (
            <Reveal key={p.title} delay={i * 100} className="rounded-[24px] border border-border bg-card p-8 shadow-soft">
              <Icon name={p.icon} className="mb-4 h-8 w-8 text-primary" />
              <h2 className="text-xl font-bold">{p.title}</h2>
              <p className="mt-2 text-muted-foreground">{p.desc}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section dark id="como-funciona">
        <SectionTitle dark eyebrow="Como funciona" title="Do anúncio ao repasse em 4 passos" />
        <div className="grid gap-5 md:grid-cols-4">
          {STEPS.map((s, i) => (
            <Reveal key={s.title} delay={i * 100} className="glass rounded-[22px] p-6">
              <span className="font-display text-4xl font-extrabold text-accent">0{i + 1}</span>
              <h3 className="mt-3 font-bold">{s.title}</h3>
              <p className="mt-2 text-sm text-ink-foreground/70">{s.desc}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <SectionTitle eyebrow="Funcionalidades" title="Tudo o que sua imobiliária precisa" />
        <FeatureGrid />
      </Section>

      <Section className="bg-muted">
        <SectionTitle eyebrow="Antes x Depois" title="Chega de planilha e banco" />
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-[24px] bg-card p-8">{BEFORE_AFTER.before.map((t) => <p key={t} className="flex gap-2 py-1.5 text-muted-foreground"><X className="h-5 w-5 text-destructive/70" />{t}</p>)}</div>
          <div className="rounded-[24px] bg-ink p-8 text-ink-foreground">{BEFORE_AFTER.after.map((t) => <p key={t} className="flex gap-2 py-1.5"><Check className="h-5 w-5 text-accent" />{t}</p>)}</div>
        </div>
      </Section>

      <Section>
        <SectionTitle eyebrow="Comparativo" title="Portym x sistemas tradicionais" />
        <ComparisonTable bLabel="Tradicionais" rows={VS_TRADITIONAL.map((r) => ({ label: r.label, a: r.portym, b: r.traditional }))} />
      </Section>

      {HOME_FLAGS.showNumbers && (
        <Section dark><div className="grid gap-6 text-center md:grid-cols-3">{NUMBERS.map((n) => <div key={n.label}><p className="font-display text-5xl font-extrabold">{n.value}{n.suffix}</p><p>{n.label}</p></div>)}</div></Section>
      )}
      {HOME_FLAGS.showTestimonials && (
        <Section><div className="grid gap-6 md:grid-cols-3">{TESTIMONIALS.map((t, i) => <blockquote key={i} className="rounded-[24px] border p-6">“{t.quote}”<footer className="mt-3 font-semibold">{t.name} — {t.role}</footer></blockquote>)}</div></Section>
      )}

      <Section className="bg-muted">
        <SectionTitle eyebrow="Preços" title="Pague por imóvel, não por usuário" />
        <PriceCalculator />
      </Section>

      <Section>
        <SectionTitle eyebrow="FAQ" title="Perguntas frequentes" />
        <FAQAccordion items={HOME_FAQ} />
      </Section>
      <FinalCta />
    </>
  );
}

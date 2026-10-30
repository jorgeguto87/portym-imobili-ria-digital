import { Check, X } from "lucide-react";
import type { FeatureContent } from "@/content/features";
import { pageHead, faqJsonLd } from "@/lib/seo";
import { DashboardMockup } from "./DashboardMockup";
import { PhoneMockup } from "./PhoneMockup";
import { ScreenShot } from "./ScreenShot";
import { FAQAccordion, FeatureGrid } from "./blocks";
import { CtaButton, FinalCta, PageHero, Reveal, Section, SectionTitle, TrialBadge } from "./ui";

export const featureHead = (c: FeatureContent) =>
  pageHead({
    title: c.seoTitle,
    description: c.seoDescription,
    path: `/${c.slug}`,
    breadcrumbs: [
      { name: "Funcionalidades", path: "/funcionalidades" },
      { name: c.name, path: `/${c.slug}` },
    ],
    jsonLd: [faqJsonLd(c.faq)],
  });

export function FeaturePageTemplate({ c }: { c: FeatureContent }) {
  return (
    <>
      <PageHero eyebrow={c.eyebrow} title={c.h1} subtitle={c.subtitle}>
        <div className="mt-8 flex justify-center"><CtaButton /></div>
        <div className="mt-6 flex justify-center"><TrialBadge dark /></div>
      </PageHero>

      <Section>
        <SectionTitle eyebrow="Problema x solução" title="Do jeito antigo para o jeito Portym" />
        <div className="grid gap-6 md:grid-cols-2">
          <Reveal className="rounded-[24px] border border-border bg-muted p-8">
            <h3 className="mb-5 text-lg font-bold">Sem o Portym</h3>
            <ul className="space-y-3">
              {c.problems.map((p) => (
                <li key={p} className="flex gap-3 text-muted-foreground"><X className="mt-0.5 h-5 w-5 shrink-0 text-destructive/70" />{p}</li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={120} className="rounded-[24px] bg-ink p-8 text-ink-foreground shadow-glow">
            <h3 className="mb-5 text-lg font-bold">Com o Portym</h3>
            <ul className="space-y-3">
              {c.solutions.map((p) => (
                <li key={p} className="flex gap-3 text-ink-foreground/85"><Check className="mt-0.5 h-5 w-5 shrink-0 text-accent" />{p}</li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      <Section dark className="overflow-hidden">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionTitle dark center={false} eyebrow="Como funciona" title="Três passos e pronto" />
            <ol className="space-y-6">
              {c.steps.map((s, i) => (
                <Reveal key={s.title} delay={i * 100} className="glass flex gap-4 rounded-[22px] p-5">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary font-display font-bold">{i + 1}</span>
                  <div>
                    <h3 className="font-bold">{s.title}</h3>
                    <p className="mt-1 text-sm text-ink-foreground/70">{s.desc}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
          <Reveal className="flex justify-center">
            {c.screen ? (
              <ScreenShot name={c.screen.name} alt={c.screen.alt} show={c.screen.mobileOnly ? "mobile" : "auto"} />
            ) : c.mockup === "phone" ? <PhoneMockup className="animate-float" /> : <DashboardMockup className="rotate-[-2deg]" />}
          </Reveal>
        </div>
      </Section>

      <Section>
        <SectionTitle eyebrow="Benefícios" title={`O que você ganha com ${c.name.toLowerCase()}`} />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {c.benefits.map((b, i) => (
            <Reveal key={b.title} delay={i * 60} className="rounded-[22px] border border-border bg-card p-6 shadow-soft">
              <Check className="mb-3 h-6 w-6 text-primary" />
              <h3 className="font-bold">{b.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{b.desc}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="bg-muted">
        <SectionTitle eyebrow="Dúvidas" title="Perguntas frequentes" />
        <FAQAccordion items={c.faq} />
      </Section>

      <Section>
        <SectionTitle eyebrow="Veja também" title="Funcionalidades relacionadas" />
        <FeatureGrid only={c.related} />
      </Section>

      <FinalCta />
    </>
  );
}

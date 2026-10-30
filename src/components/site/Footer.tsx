import { Link } from "@tanstack/react-router";
import { Lock, ShieldCheck, Mail } from "lucide-react";
import { FEATURES, NAV_COMPARE, NAV_SEGMENTS, SITE } from "@/content/site";
import { Logo } from "./ui";

export function Footer() {
  const col = "space-y-2.5 text-sm text-ink-foreground/65";
  const a = "transition hover:text-accent";
  return (
    <footer className="bg-ink text-ink-foreground">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr_1fr]">
          <div>
            <Logo variant="light" className="h-14" />
            <p className="mt-5 max-w-xs text-sm text-ink-foreground/65">
              O sistema que coloca sua imobiliária no automático: atendimento, cobrança, repasse e portfólio num só lugar.
            </p>
            <div className="mt-5 space-y-2 text-sm">
              <a className={`flex items-center gap-2 text-ink-foreground/80 ${a}`} href={`mailto:${SITE.email}`}>
                <Mail className="h-4 w-4" /> {SITE.email}
              </a>
            </div>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-bold">Funcionalidades</h3>
            <ul className={col}>
              {FEATURES.map((f) => (
                <li key={f.slug}><Link className={a} to={`/${f.slug}` as "/"}>{f.title}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-bold">Para quem</h3>
            <ul className={col}>
              {NAV_SEGMENTS.map((s) => <li key={s.to}><Link className={a} to={s.to}>{s.title}</Link></li>)}
            </ul>
            <h3 className="mb-4 mt-8 text-sm font-bold">Comparativos</h3>
            <ul className={col}>
              {NAV_COMPARE.map((s) => <li key={s.to}><Link className={a} to={s.to}>{s.title}</Link></li>)}
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-bold">Portym</h3>
            <ul className={col}>
              <li><Link className={a} to="/funcionalidades">Funcionalidades</Link></li>
              <li><Link className={a} to="/precos">Preços</Link></li>
              <li><Link className={a} to="/blog">Blog</Link></li>
              <li><Link className={a} to="/sobre">Sobre</Link></li>
              <li><Link className={a} to="/contato">Contato</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-bold">Acesso</h3>
            <ul className={col}>
              <li><a className={a} href={SITE.signupUrl}>Testar grátis</a></li>
              <li><a className={a} href={SITE.loginUrl}>Entrar</a></li>
              <li><Link className={a} to="/termos">Termos de Uso</Link></li>
              <li><Link className={a} to="/privacidade">Privacidade (LGPD)</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-col gap-4 border-t border-ink-foreground/10 pt-8 text-xs text-ink-foreground/55 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-4">
            <span className="flex items-center gap-1.5"><Lock className="h-4 w-4 text-accent" /> Conexão criptografada (SSL)</span>
            <span className="flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-accent" /> Em conformidade com a LGPD</span>
          </div>
          <p>© {new Date().getFullYear()} Portym. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}

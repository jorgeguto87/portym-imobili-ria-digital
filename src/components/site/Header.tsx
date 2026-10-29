import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { ChevronDown, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { FEATURES, NAV_COMPARE, NAV_SEGMENTS, SITE } from "@/content/site";
import { Icon, Logo } from "./ui";

const DARK_TOP_ROUTES = true; // todas as páginas começam com hero escuro

function Dropdown({ label, children, wide }: { label: string; children: React.ReactNode; wide?: boolean }) {
  return (
    <div className="group relative">
      <button className="flex items-center gap-1 rounded-full px-3 py-2 text-sm font-medium transition hover:bg-foreground/5">
        {label} <ChevronDown className="h-4 w-4 transition group-hover:rotate-180" />
      </button>
      <div className="invisible absolute left-1/2 top-full -translate-x-1/2 pt-3 opacity-0 transition group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
        <div className={cn("rounded-[22px] border border-border bg-popover p-3 text-popover-foreground shadow-glow", wide ? "w-[720px]" : "w-80")}>{children}</div>
      </div>
    </div>
  );
}

function MenuItem({ to, title, short, icon }: { to: string; title: string; short: string; icon?: string }) {
  return (
    <Link to={to as "/"} className="flex gap-3 rounded-2xl p-3 transition hover:bg-muted">
      {icon && (
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
          <Icon name={icon} className="h-5 w-5" />
        </span>
      )}
      <span className="min-w-0">
        <span className="block text-sm font-semibold">{title}</span>
        <span className="block text-xs text-muted-foreground">{short}</span>
      </span>
    </Link>
  );
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 20);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => setOpen(false), [path]);
  const light = scrolled || !DARK_TOP_ROUTES;

  return (
    <header className={cn("fixed inset-x-0 top-0 z-50 transition-all duration-300", light ? "border-b border-border bg-background/80 text-foreground backdrop-blur-xl" : "text-ink-foreground")}>
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-4 px-5 py-3 sm:px-8">
        <Link to="/" aria-label="Portym — início" className="shrink-0">
          <Logo variant={light ? "dark" : "light"} className="h-11" />
        </Link>
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Principal">
          <Dropdown label="Funcionalidades" wide>
            <div className="grid grid-cols-2 gap-1">
              {FEATURES.map((f) => (
                <MenuItem key={f.slug} to={`/${f.slug}`} title={f.title} short={f.short} icon={f.icon} />
              ))}
            </div>
            <Link to="/funcionalidades" className="mt-2 block rounded-2xl bg-muted p-3 text-center text-sm font-semibold text-primary">Ver todas as funcionalidades →</Link>
          </Dropdown>
          <Dropdown label="Para quem">
            {NAV_SEGMENTS.map((s) => <MenuItem key={s.to} {...s} />)}
          </Dropdown>
          <Link to="/precos" className="rounded-full px-3 py-2 text-sm font-medium hover:bg-foreground/5">Preços</Link>
          <Dropdown label="Comparativos">
            {NAV_COMPARE.map((s) => <MenuItem key={s.to} {...s} />)}
          </Dropdown>
          <Link to="/blog" className="rounded-full px-3 py-2 text-sm font-medium hover:bg-foreground/5">Blog</Link>
        </nav>
        <div className="hidden items-center gap-2 lg:flex">
          <a href={SITE.loginUrl} className="rounded-full px-4 py-2 text-sm font-semibold hover:bg-foreground/5">Entrar</a>
          <a href={SITE.signupUrl} className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-glow transition hover:bg-primary/90">Testar grátis</a>
        </div>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger className="rounded-full p-2 lg:hidden" aria-label="Abrir menu">
            <Menu className="h-6 w-6" />
          </SheetTrigger>
          <SheetContent side="right" className="w-[88vw] max-w-sm overflow-y-auto p-6">
            <SheetTitle className="sr-only">Menu</SheetTitle>
            <Logo className="mb-6 h-10" />
            <MobileGroup title="Funcionalidades">
              <Link to="/funcionalidades" className="block py-2 font-semibold text-primary">Visão geral</Link>
              {FEATURES.map((f) => (
                <Link key={f.slug} to={`/${f.slug}` as "/"} className="block py-2 text-sm">{f.title}</Link>
              ))}
            </MobileGroup>
            <MobileGroup title="Para quem">
              {NAV_SEGMENTS.map((s) => <Link key={s.to} to={s.to} className="block py-2 text-sm">{s.title}</Link>)}
            </MobileGroup>
            <MobileGroup title="Comparativos">
              {NAV_COMPARE.map((s) => <Link key={s.to} to={s.to} className="block py-2 text-sm">{s.title}</Link>)}
            </MobileGroup>
            <Link to="/precos" className="block border-b border-border py-3 font-semibold">Preços</Link>
            <Link to="/blog" className="block border-b border-border py-3 font-semibold">Blog</Link>
            <Link to="/contato" className="block border-b border-border py-3 font-semibold">Contato</Link>
            <div className="mt-6 grid gap-3">
              <a href={SITE.signupUrl} className="rounded-full bg-primary py-3 text-center font-semibold text-primary-foreground">Testar grátis</a>
              <a href={SITE.loginUrl} className="rounded-full border border-border py-3 text-center font-semibold">Entrar</a>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

function MobileGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <details className="group border-b border-border py-1">
      <summary className="flex cursor-pointer list-none items-center justify-between py-2 font-semibold">
        {title} <ChevronDown className="h-4 w-4 transition group-open:rotate-180" />
      </summary>
      <div className="pb-2 pl-2">{children}</div>
    </details>
  );
}

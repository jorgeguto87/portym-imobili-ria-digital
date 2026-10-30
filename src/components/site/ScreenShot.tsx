import { cn } from "@/lib/utils";

/**
 * Tela real do Portym (dados fictícios). No computador mostra a versão
 * desktop numa moldura de navegador; no celular, a versão celular numa
 * moldura de telefone. As imagens ficam em /public/telas
 * (<nome>-desktop.webp e <nome>-celular.webp). Imagem escondida com
 * loading="lazy" não é baixada, então cada aparelho baixa só a sua.
 */
export type ScreenName = "inicio" | "cobranca" | "locacao" | "repasse" | "reajuste" | "crm" | "comissoes" | "portal";

/** show: "auto" = desktop no computador e celular no celular; "desktop"/"mobile" = sempre a mesma. */
export function ScreenShot({ name, alt, url = "painel.portym.cloud", className, mobileOnly = false, show }: { name: ScreenName; alt: string; url?: string; className?: string; mobileOnly?: boolean; show?: "auto" | "desktop" | "mobile" }) {
  const mode = show ?? (mobileOnly ? "mobile" : "auto");
  return (
    <div className={cn("w-full", className)}>
      {mode !== "mobile" && (
        <div className={cn("w-full max-w-[680px] overflow-hidden rounded-[18px] border border-border bg-card shadow-glow", mode === "auto" && "hidden lg:block")}>
          <div className="flex items-center gap-1.5 border-b border-border bg-muted px-4 py-2.5">
            <span className="h-2.5 w-2.5 rounded-full bg-destructive/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-warn" />
            <span className="h-2.5 w-2.5 rounded-full bg-accent" />
            <span className="ml-3 rounded-md bg-card px-3 py-0.5 text-[11px] text-muted-foreground">{url}</span>
          </div>
          <a href={`/telas/${name}-desktop.webp`} target="_blank" rel="noopener" className="block cursor-zoom-in" title="Ver a tela em tamanho maior">
            <img src={`/telas/${name}-desktop.webp`} alt={alt} width={1600} height={1047} loading="lazy" decoding="async" className="block h-auto w-full" />
          </a>
        </div>
      )}
      {mode !== "desktop" && (
        <div className={cn("mx-auto w-[270px] overflow-hidden rounded-[40px] border-[9px] border-ink bg-ink shadow-glow", mode === "auto" && "lg:hidden")}>
          <img src={`/telas/${name}-celular.webp`} alt={alt} width={780} height={1688} loading="lazy" decoding="async" className="block h-auto w-full rounded-[31px]" />
        </div>
      )}
    </div>
  );
}

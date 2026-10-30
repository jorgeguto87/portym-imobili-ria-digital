import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { pageHead } from "@/lib/seo";
import { SITE } from "@/content/site";
import { PageHero, Section } from "@/components/site/ui";

const schema = z.object({
  nome: z.string().trim().min(2, "Informe seu nome").max(100),
  email: z.string().trim().email("E-mail inválido").max(255),
  telefone: z.string().trim().max(30).optional(),
  mensagem: z.string().trim().min(10, "Mensagem muito curta").max(2000),
});

export const Route = createFileRoute("/contato")({
  head: () => pageHead({ title: "Contato — Portym", description: "Fale com a equipe Portym. Deixe sua mensagem e entramos em contato.", path: "/contato", breadcrumbs: [{ name: "Contato", path: "/contato" }] }),
  component: Contato,
});

function Contato() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    const form = e.currentTarget;
    const raw = Object.fromEntries(new FormData(form)) as Record<string, string>;
    const r = schema.safeParse(raw);
    if (!r.success) { setErrors(Object.fromEntries(r.error.issues.map((i) => [i.path[0], i.message]))); return; }
    setErrors({});
    setStatus("sending");
    try {
      const res = await fetch(`${SITE.apiUrl}/site/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // "website" é o campo escondido anti-robô (pessoa não vê, robô preenche).
        body: JSON.stringify({ ...r.data, website: raw["website"] || "" }),
      });
      const body = await res.json().catch(() => null);
      if (!res.ok) throw new Error(body?.error?.message || "Não foi possível enviar agora. Tente novamente mais tarde.");
      form.reset();
      setStatus("ok");
    } catch (err) {
      setErrorMsg(err instanceof Error && err.message !== "Failed to fetch" ? err.message : "Não foi possível enviar agora. Verifique sua conexão e tente novamente.");
      setStatus("error");
    }
  }

  const f = "mt-1 w-full rounded-2xl border border-input bg-card px-4 py-3 font-normal";
  const err = (k: string) => errors[k] && <span className="text-sm font-normal text-destructive">{errors[k]}</span>;
  return (
    <>
      <PageHero title="Fale com a gente" subtitle="Deixe sua mensagem e a equipe Portym entra em contato com você." />
      <Section>
        {status === "ok" ? (
          <div className="mx-auto max-w-xl rounded-[24px] border border-border bg-card p-8 text-center shadow-soft">
            <p className="font-display text-2xl font-bold">Mensagem enviada!</p>
            <p className="mt-2 text-muted-foreground">Recebemos seu contato e vamos retornar em breve.</p>
            <button type="button" onClick={() => setStatus("idle")} className="mt-6 text-sm font-semibold text-primary underline-offset-4 hover:underline">Enviar outra mensagem</button>
          </div>
        ) : (
          <form onSubmit={submit} className="mx-auto max-w-xl space-y-4" noValidate>
            <label className="block text-sm font-semibold">Nome<input name="nome" autoComplete="name" className={f} />{err("nome")}</label>
            <label className="block text-sm font-semibold">E-mail<input name="email" type="email" autoComplete="email" className={f} />{err("email")}</label>
            <label className="block text-sm font-semibold">Telefone / WhatsApp <span className="font-normal text-muted-foreground">(opcional)</span><input name="telefone" type="tel" autoComplete="tel" className={f} />{err("telefone")}</label>
            <label className="block text-sm font-semibold">Mensagem<textarea name="mensagem" rows={5} className={f} />{err("mensagem")}</label>
            <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
              <label>Site<input name="website" tabIndex={-1} autoComplete="off" /></label>
            </div>
            {status === "error" && <p className="rounded-2xl bg-destructive/10 px-4 py-3 text-sm text-destructive">{errorMsg}</p>}
            <button disabled={status === "sending"} className="w-full rounded-full bg-primary py-3 font-semibold text-primary-foreground disabled:opacity-60">
              {status === "sending" ? "Enviando…" : "Enviar mensagem"}
            </button>
            <p className="text-center text-sm text-muted-foreground">Se preferir, escreva para <a className="font-semibold text-primary" href={`mailto:${SITE.email}`}>{SITE.email}</a>.</p>
          </form>
        )}
      </Section>
    </>
  );
}

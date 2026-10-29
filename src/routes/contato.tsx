import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { pageHead } from "@/lib/seo";
import { whatsappLink } from "@/content/site";
import { PageHero, Section } from "@/components/site/ui";

const schema = z.object({
  nome: z.string().trim().min(2, "Informe seu nome").max(100),
  email: z.string().trim().email("E-mail inválido").max(255),
  mensagem: z.string().trim().min(10, "Mensagem muito curta").max(1000),
});

export const Route = createFileRoute("/contato")({
  head: () => pageHead({ title: "Contato — Portym", description: "Fale com a equipe Portym por formulário ou WhatsApp.", path: "/contato", breadcrumbs: [{ name: "Contato", path: "/contato" }] }),
  component: Contato,
});

function Contato() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [ok, setOk] = useState(false);
  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const r = schema.safeParse(Object.fromEntries(new FormData(e.currentTarget)));
    if (!r.success) { setErrors(Object.fromEntries(r.error.issues.map((i) => [i.path[0], i.message]))); return; }
    setErrors({});
    const d = r.data;
    window.open(whatsappLink(`Olá! Sou ${d.nome} (${d.email}). ${d.mensagem}`), "_blank", "noopener");
    setOk(true);
  }
  const f = "mt-1 w-full rounded-2xl border border-input bg-card px-4 py-3";
  return (
    <>
      <PageHero title="Fale com a gente" subtitle="Respondemos rapidinho, também pelo WhatsApp." />
      <Section>
        <form onSubmit={submit} className="mx-auto max-w-xl space-y-4" noValidate>
          {(["nome", "email"] as const).map((k) => (
            <label key={k} className="block text-sm font-semibold capitalize">{k === "email" ? "E-mail" : "Nome"}
              <input name={k} className={f} />{errors[k] && <span className="text-sm text-destructive">{errors[k]}</span>}</label>
          ))}
          <label className="block text-sm font-semibold">Mensagem<textarea name="mensagem" rows={5} className={f} />{errors["mensagem"] && <span className="text-sm text-destructive">{errors["mensagem"]}</span>}</label>
          <button className="w-full rounded-full bg-primary py-3 font-semibold text-primary-foreground">Enviar mensagem</button>
          {ok && <p className="text-center text-primary">Mensagem pronta! Abrimos o WhatsApp para você enviar.</p>}
        </form>
      </Section>
    </>
  );
}

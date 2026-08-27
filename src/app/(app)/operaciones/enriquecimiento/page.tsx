"use client";

import { ENRICHMENT_DEMO } from "@/lib/ops-data";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function EnrichmentOpsPage() {
  const d = ENRICHMENT_DEMO;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-[#003366]">Enriquecimiento · Perplexity</h1>
        <p className="mt-1 text-sm text-[#64748b]">
          Consulta simulada — prompt enviado vs resultado generado
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="border-[#003366]/20">
          <CardHeader>
            <CardTitle>Prompt enviado</CardTitle>
            <CardDescription>{d.lead} · {d.empresa}</CardDescription>
          </CardHeader>
          <CardContent>
            <pre className="whitespace-pre-wrap rounded-lg bg-[#0f172a] p-4 text-xs leading-relaxed text-[#e2e8f0] font-mono">
              {d.prompt}
            </pre>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Resultado generado</CardTitle>
            <CardDescription>Insights comerciales estructurados</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <Field label="Empresa" value={d.resultado.empresa} />
            <Field label="Industria" value={d.resultado.industria} />
            <Field label="Ingresos estimados" value={d.resultado.ingresos} />
            <div>
              <p className="text-xs uppercase tracking-wide text-[#94a3b8]">Tecnologías</p>
              <div className="mt-1 flex flex-wrap gap-1.5">
                {d.resultado.tecnologias.map((t) => (
                  <Badge key={t} variant="secondary">{t}</Badge>
                ))}
              </div>
            </div>
            <List label="Noticias recientes" items={d.resultado.noticias} />
            <List label="Dolores potenciales" items={d.resultado.dolores} />
            <List label="Oportunidades comerciales" items={d.resultado.oportunidades} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-wide text-[#94a3b8]">{label}</p>
      <p className="font-medium text-[#003366]">{value}</p>
    </div>
  );
}

function List({ label, items }: { label: string; items: string[] }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-wide text-[#94a3b8]">{label}</p>
      <ul className="mt-1 space-y-1">
        {items.map((item) => (
          <li key={item} className="rounded-md bg-[#EAF4FF]/60 px-2 py-1.5 text-[#003366]">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

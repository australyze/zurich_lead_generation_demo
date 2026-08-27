"use client";

import { CAMPAIGN_GEN_DEMO } from "@/lib/ops-data";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function CampanasAiPage() {
  const d = CAMPAIGN_GEN_DEMO;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-[#003366]">Generación de campañas · OpenAI</h1>
        <p className="mt-1 text-sm text-[#64748b]">
          Proceso visible: lead, contexto, prompt, modelo, tokens, costo y secuencia de 4 correos
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Meta label="Modelo" value={d.modelo} />
        <Meta label="Tokens estimados" value={String(d.tokens)} />
        <Meta label="Costo estimado" value={`$${d.costo.toFixed(3)}`} />
        <Meta label="Lead" value={`${d.lead} · ${d.empresa}`} />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Contexto</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-[#003366]">{d.contexto}</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Prompt</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="whitespace-pre-wrap rounded-lg bg-[#0f172a] p-4 text-xs text-[#e2e8f0] font-mono">
              {d.prompt}
            </pre>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Resultado · Secuencia de 4 correos</CardTitle>
          <CardDescription>Variables dinámicas incluidas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-3 flex flex-wrap gap-2">
            {["{{nombre}}", "{{empresa}}", "{{cargo}}", "{{remitente}}"].map((v) => (
              <Badge key={v} variant="secondary" className="font-mono text-[10px]">{v}</Badge>
            ))}
          </div>
          <Tabs defaultValue="1">
            <TabsList>
              {d.emails.map((e) => (
                <TabsTrigger key={e.order} value={String(e.order)}>Correo {e.order}</TabsTrigger>
              ))}
            </TabsList>
            {d.emails.map((e) => (
              <TabsContent key={e.order} value={String(e.order)} className="space-y-2">
                <p className="text-sm font-semibold text-[#003366]">{e.subject}</p>
                <pre className="whitespace-pre-wrap rounded-lg border border-[#e2e8f0] bg-[#F5F7FA] p-4 text-sm text-[#003366]">
                  {e.body}
                </pre>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <Card>
      <CardContent className="p-4">
        <p className="text-[11px] uppercase tracking-wide text-[#94a3b8]">{label}</p>
        <p className="mt-1 font-semibold text-[#003366]">{value}</p>
      </CardContent>
    </Card>
  );
}

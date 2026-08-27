"use client";

import { toast } from "sonner";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { AI_BENCHMARKS, AI_MODELS } from "@/lib/enterprise-data";
import { getModelLabel, useEnterpriseStore } from "@/stores/enterprise-store";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export default function ModelosIaPage() {
  const enrichmentModelId = useEnterpriseStore((s) => s.enrichmentModelId);
  const campaignModelId = useEnterpriseStore((s) => s.campaignModelId);
  const setEnrichment = useEnterpriseStore((s) => s.setEnrichmentModel);
  const setCampaign = useEnterpriseStore((s) => s.setCampaignModel);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-[#003366]">Modelos IA</h1>
        <p className="mt-1 text-sm text-[#64748b]">
          Multi-proveedor para enriquecimiento y generación de campañas — sin APIs reales
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Selector global</CardTitle>
          <CardDescription>También disponible en el header superior</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label>Modelo para Enriquecimiento</Label>
            <Select
              value={enrichmentModelId}
              onValueChange={(v) => {
                setEnrichment(v);
                toast.success(`Enriquecimiento → ${getModelLabel(v)}`);
              }}
            >
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {AI_MODELS.map((m) => (
                  <SelectItem key={m.id} value={m.id}>{m.modelo}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label>Modelo para Generación de Campañas</Label>
            <Select
              value={campaignModelId}
              onValueChange={(v) => {
                setCampaign(v);
                toast.success(`Campañas → ${getModelLabel(v)}`);
              }}
            >
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {AI_MODELS.map((m) => (
                  <SelectItem key={m.id} value={m.id}>{m.modelo}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="tabla">
        <TabsList>
          <TabsTrigger value="tabla">Comparativa</TabsTrigger>
          <TabsTrigger value="benchmark">Comparador / Benchmark</TabsTrigger>
        </TabsList>

        <TabsContent value="tabla">
          <Card>
            <CardHeader>
              <CardTitle>Tabla comparativa de modelos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-auto rounded-lg border border-[#e2e8f0]">
                <table className="w-full min-w-[900px] text-sm">
                  <thead className="bg-[#F5F7FA] text-left text-xs uppercase text-[#64748b]">
                    <tr>
                      <th className="px-3 py-3 font-medium">Proveedor</th>
                      <th className="px-3 py-3 font-medium">Modelo</th>
                      <th className="px-3 py-3 font-medium">Velocidad</th>
                      <th className="px-3 py-3 font-medium">Costo relativo</th>
                      <th className="px-3 py-3 font-medium">Razonamiento</th>
                      <th className="px-3 py-3 font-medium">Calidad escritura</th>
                      <th className="px-3 py-3 font-medium">Uso recomendado</th>
                      <th className="px-3 py-3 font-medium">Estado</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#e2e8f0]">
                    {AI_MODELS.map((m) => (
                      <tr key={m.id} className="hover:bg-[#F5F7FA]/60">
                        <td className="px-3 py-3 text-[#64748b]">{m.proveedor}</td>
                        <td className="px-3 py-3 font-medium text-[#003366]">{m.modelo}</td>
                        <td className="px-3 py-3">{m.velocidad}</td>
                        <td className="px-3 py-3">{m.costoRelativo}</td>
                        <td className="px-3 py-3">{m.razonamiento}</td>
                        <td className="px-3 py-3">{m.escritura}</td>
                        <td className="px-3 py-3 text-[#64748b]">{m.usoRecomendado}</td>
                        <td className="px-3 py-3">
                          <Badge variant={m.estado === "Activo" ? "success" : "secondary"}>{m.estado}</Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="benchmark" className="space-y-4">
          <div className="grid gap-4 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Costo estimado vs calidad</CardTitle>
              </CardHeader>
              <CardContent className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={AI_BENCHMARKS}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="modelo" tick={{ fontSize: 11, fill: "#64748b" }} />
                    <YAxis tick={{ fontSize: 11, fill: "#64748b" }} />
                    <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid #e2e8f0", fontSize: 12 }} />
                    <Legend />
                    <Bar dataKey="costo" name="Costo USD" fill="#0066CC" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="calidad" name="Calidad" fill="#003366" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Detalle benchmark</CardTitle>
                <CardDescription>Tiempo, tokens y casos de uso</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {AI_BENCHMARKS.map((b) => (
                  <div key={b.id} className="rounded-lg border border-[#e2e8f0] p-3">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-[#003366]">{b.modelo}</p>
                      <Badge variant="secondary">${b.costo.toFixed(3)}</Badge>
                    </div>
                    <p className="mt-1 text-xs text-[#64748b]">
                      {b.tiempoMs} ms · {b.tokens} tokens · Calidad {b.calidad}
                    </p>
                    <p className="mt-1 text-sm text-[#003366]">{b.casosUso}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

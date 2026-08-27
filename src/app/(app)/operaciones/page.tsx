"use client";

import { Play, Square, Eye } from "lucide-react";
import { toast } from "sonner";
import { useOpsStore } from "@/stores/ops-store";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PipelineFlow } from "@/components/ops/pipeline-flow";
import { JobQueue } from "@/components/ops/job-queue";
import { ServicesGrid } from "@/components/ops/services-grid";
import { StageStatusBadge } from "@/components/ops/status-badges";

export default function OperacionesPage() {
  const stages = useOpsStore((s) => s.stages);
  const jobs = useOpsStore((s) => s.jobs);
  const services = useOpsStore((s) => s.services);
  const leads = useOpsStore((s) => s.leads);
  const simulating = useOpsStore((s) => s.simulating);
  const startSimulation = useOpsStore((s) => s.startSimulation);
  const stopSimulation = useOpsStore((s) => s.stopSimulation);
  const setTrace = useOpsStore((s) => s.setSelectedTraceLeadId);

  function onStart() {
    startSimulation();
    toast.message("Prospección iniciada", {
      description: "El orquestador ejecutará Apify → URL → AnymailFinder → Validación → NeverBounce → Enrichment → Campañas.",
    });
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-[#003366]">Centro de Operaciones</h1>
          <p className="mt-1 text-sm text-[#64748b]">
            Mission Control del pipeline comercial — visibilidad total de servicios, estados y trazabilidad
          </p>
        </div>
        <div className="flex gap-2">
          {simulating ? (
            <Button variant="destructive" onClick={stopSimulation}>
              <Square size={14} />
              Detener simulación
            </Button>
          ) : (
            <Button onClick={onStart}>
              <Play size={14} />
              Iniciar Prospección
            </Button>
          )}
        </div>
      </div>

      {simulating && (
        <div className="rounded-lg border border-[#0066CC]/30 bg-[#EAF4FF] px-4 py-3 text-sm text-[#003366]">
          Simulación en curso — observe el movimiento de registros entre etapas y la cola de trabajos.
        </div>
      )}

      <div className="grid gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2 space-y-3">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-[#64748b]">
            Pipeline operacional
          </h2>
          <PipelineFlow stages={stages} />
        </div>
        <div>
          <JobQueue jobs={jobs} />
        </div>
      </div>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-[#64748b]">Servicios</h2>
        <ServicesGrid services={services} />
      </section>

      <Card>
        <CardHeader>
          <CardTitle>Trazabilidad de leads</CardTitle>
          <CardDescription>Historial completo por lead — desde Apify hasta respuesta</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-auto rounded-lg border border-[#e2e8f0]">
            <table className="w-full text-sm">
              <thead className="bg-[#F5F7FA] text-left text-xs uppercase tracking-wide text-[#64748b]">
                <tr>
                  <th className="px-4 py-3 font-medium">Lead</th>
                  <th className="px-4 py-3 font-medium">Empresa</th>
                  <th className="px-4 py-3 font-medium">Email</th>
                  <th className="px-4 py-3 font-medium">Último estado</th>
                  <th className="px-4 py-3 font-medium"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e2e8f0]">
                {leads.map((lead) => {
                  const last = [...lead.steps].reverse().find((s) => s.status !== "pendiente") ?? lead.steps[0];
                  return (
                    <tr key={lead.id} className="hover:bg-[#F5F7FA]/60">
                      <td className="px-4 py-3 font-medium text-[#003366]">{lead.nombre}</td>
                      <td className="px-4 py-3 text-[#64748b]">{lead.empresa}</td>
                      <td className="px-4 py-3 text-[#64748b]">{lead.email ?? "—"}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-[#64748b]">{last.label}</span>
                          <StageStatusBadge status={last.status} />
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <Button size="sm" variant="secondary" onClick={() => setTrace(lead.id)}>
                          <Eye size={14} />
                          Ver Trazabilidad
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

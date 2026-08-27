"use client";

import { useOpsStore } from "@/stores/ops-store";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StageStatusBadge } from "@/components/ops/status-badges";
import { toast } from "sonner";

export default function AnymailFinderPage() {
  const rows = useOpsStore((s) => s.anymailRows);
  const setTrace = useOpsStore((s) => s.setSelectedTraceLeadId);
  const leads = useOpsStore((s) => s.leads);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-[#003366]">AnymailFinder</h1>
        <p className="mt-1 text-sm text-[#64748b]">
          Descubrimiento de emails corporativos con nivel de confianza
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Resultados de búsqueda</CardTitle>
          <CardDescription>Lead · Empresa · Dominio · Email · Confianza · Estado</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-auto rounded-lg border border-[#e2e8f0]">
            <table className="w-full min-w-[900px] text-sm">
              <thead className="bg-[#F5F7FA] text-left text-xs uppercase text-[#64748b]">
                <tr>
                  <th className="px-4 py-3 font-medium">Lead</th>
                  <th className="px-4 py-3 font-medium">Empresa</th>
                  <th className="px-4 py-3 font-medium">Dominio</th>
                  <th className="px-4 py-3 font-medium">Email detectado</th>
                  <th className="px-4 py-3 font-medium">Confianza</th>
                  <th className="px-4 py-3 font-medium">Estado</th>
                  <th className="px-4 py-3 font-medium">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e2e8f0]">
                {rows.map((r) => (
                  <tr key={r.id} className="hover:bg-[#F5F7FA]/60">
                    <td className="px-4 py-3 font-medium text-[#003366]">{r.lead}</td>
                    <td className="px-4 py-3 text-[#64748b]">{r.empresa}</td>
                    <td className="px-4 py-3 font-mono text-xs text-[#64748b]">{r.dominio}</td>
                    <td className="px-4 py-3 text-[#0066CC]">{r.email ?? "—"}</td>
                    <td className="px-4 py-3 tabular-nums">{r.confianza > 0 ? `${r.confianza}%` : "—"}</td>
                    <td className="px-4 py-3"><StageStatusBadge status={r.status} /></td>
                    <td className="px-4 py-3">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          const match = leads.find((l) => l.nombre === r.lead);
                          if (match) setTrace(match.id);
                          else toast.message("Sin trazabilidad vinculada para este lead mock");
                        }}
                      >
                        Ver trazabilidad
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

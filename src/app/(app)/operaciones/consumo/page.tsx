"use client";

import { useMemo } from "react";
import { useOpsStore } from "@/stores/ops-store";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatNumber } from "@/lib/utils";

export default function ConsumoPage() {
  const costs = useOpsStore((s) => s.costs);

  const totals = useMemo(() => {
    const total = costs.reduce((a, c) => a + c.totalCost, 0);
    const queries = costs.reduce((a, c) => a + c.queries, 0);
    return {
      total,
      queries,
      perLead: total / 1000,
      perCampaign: total / 250,
      monthly: total * 1.35,
    };
  }, [costs]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-[#003366]">Consumo operacional</h1>
        <p className="mt-1 text-sm text-[#64748b]">
          Costos simulados por proveedor del pipeline
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <Metric label="Costo total período" value={`$${totals.total.toFixed(2)}`} />
        <Metric label="Costo por lead" value={`$${totals.perLead.toFixed(3)}`} />
        <Metric label="Costo por campaña" value={`$${totals.perCampaign.toFixed(3)}`} />
        <Metric label="Costo mensual estimado" value={`$${totals.monthly.toFixed(2)}`} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Detalle por proveedor</CardTitle>
          <CardDescription>Consultas · Costo unitario · Costo total</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-auto rounded-lg border border-[#e2e8f0]">
            <table className="w-full text-sm">
              <thead className="bg-[#F5F7FA] text-left text-xs uppercase text-[#64748b]">
                <tr>
                  <th className="px-4 py-3 font-medium">Proveedor</th>
                  <th className="px-4 py-3 font-medium">Consultas</th>
                  <th className="px-4 py-3 font-medium">Costo unitario</th>
                  <th className="px-4 py-3 font-medium">Costo total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e2e8f0]">
                {costs.map((c) => (
                  <tr key={c.provider} className="hover:bg-[#F5F7FA]/60">
                    <td className="px-4 py-3 font-medium text-[#003366]">{c.provider}</td>
                    <td className="px-4 py-3 tabular-nums">{formatNumber(c.queries)}</td>
                    <td className="px-4 py-3 tabular-nums">${c.unitCost.toFixed(3)}</td>
                    <td className="px-4 py-3 tabular-nums font-semibold text-[#003366]">
                      ${c.totalCost.toFixed(2)}
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

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <Card>
      <CardContent className="p-4">
        <p className="text-[11px] uppercase tracking-wide text-[#94a3b8]">{label}</p>
        <p className="mt-1 text-xl font-semibold tabular-nums text-[#003366]">{value}</p>
      </CardContent>
    </Card>
  );
}

"use client";

import { useOpsStore } from "@/stores/ops-store";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const VARIANT: Record<string, "outline" | "info" | "success" | "warning" | "secondary" | "default"> = {
  pendiente: "outline",
  listo: "info",
  enviado: "secondary",
  activo: "success",
  pausado: "warning",
  finalizado: "default",
};

export default function InstantlyOpsPage() {
  const queue = useOpsStore((s) => s.instantlyQueue);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-[#003366]">Envío a Instantly</h1>
        <p className="mt-1 text-sm text-[#64748b]">
          Cola operacional post-aprobación humana
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-3 xl:grid-cols-6">
        {(["pendiente", "listo", "enviado", "activo", "pausado", "finalizado"] as const).map((status) => (
          <Card key={status}>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-semibold tabular-nums text-[#003366]">
                {queue.filter((q) => q.status === status).length}
              </p>
              <p className="mt-1 text-xs capitalize text-[#64748b]">{status}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Cola Instantly</CardTitle>
          <CardDescription>Solo campañas aprobadas ingresan a esta cola</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-auto rounded-lg border border-[#e2e8f0]">
            <table className="w-full text-sm">
              <thead className="bg-[#F5F7FA] text-left text-xs uppercase text-[#64748b]">
                <tr>
                  <th className="px-4 py-3 font-medium">ID</th>
                  <th className="px-4 py-3 font-medium">Campaña</th>
                  <th className="px-4 py-3 font-medium">Leads</th>
                  <th className="px-4 py-3 font-medium">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e2e8f0]">
                {queue.map((item) => (
                  <tr key={item.id} className="hover:bg-[#F5F7FA]/60">
                    <td className="px-4 py-3 font-mono text-xs text-[#0066CC]">{item.id}</td>
                    <td className="px-4 py-3 font-medium text-[#003366]">{item.campana}</td>
                    <td className="px-4 py-3 tabular-nums">{item.leads}</td>
                    <td className="px-4 py-3">
                      <Badge variant={VARIANT[item.status]} className="capitalize">{item.status}</Badge>
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

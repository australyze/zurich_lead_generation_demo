"use client";

import { ArrowDown } from "lucide-react";
import { useOpsStore } from "@/stores/ops-store";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { StageStatusBadge } from "@/components/ops/status-badges";

export default function CrmSyncOpsPage() {
  const rows = useOpsStore((s) => s.crmRows);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-[#003366]">Sincronización CRM</h1>
        <p className="mt-1 text-sm text-[#64748b]">
          Lead → Contacto HubSpot → Empresa → Oportunidad → Sincronizado
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Flujo de sincronización</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center gap-2 text-sm md:flex-row md:justify-center md:gap-3">
            {["Lead", "Contacto HubSpot", "Empresa HubSpot", "Oportunidad", "Sincronizado"].map((label, i) => (
              <div key={label} className="flex items-center gap-2 md:flex-col">
                {i > 0 && <ArrowDown className="text-[#94a3b8] md:rotate-[-90deg]" size={16} />}
                <div className="rounded-lg border border-[#e2e8f0] bg-[#EAF4FF] px-3 py-2 font-medium text-[#003366]">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Estado por lead</CardTitle>
          <CardDescription>Sincronización posterior a respuestas positivas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-auto rounded-lg border border-[#e2e8f0]">
            <table className="w-full text-sm">
              <thead className="bg-[#F5F7FA] text-left text-xs uppercase text-[#64748b]">
                <tr>
                  <th className="px-4 py-3 font-medium">Lead</th>
                  <th className="px-4 py-3 font-medium">Contacto</th>
                  <th className="px-4 py-3 font-medium">Empresa</th>
                  <th className="px-4 py-3 font-medium">Oportunidad</th>
                  <th className="px-4 py-3 font-medium">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e2e8f0]">
                {rows.map((r) => (
                  <tr key={r.id} className="hover:bg-[#F5F7FA]/60">
                    <td className="px-4 py-3 font-medium text-[#003366]">{r.lead}</td>
                    <td className="px-4 py-3 text-[#64748b]">{r.contacto}</td>
                    <td className="px-4 py-3 text-[#64748b]">{r.empresa}</td>
                    <td className="px-4 py-3 text-[#64748b]">{r.oportunidad ?? "—"}</td>
                    <td className="px-4 py-3"><StageStatusBadge status={r.status} /></td>
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

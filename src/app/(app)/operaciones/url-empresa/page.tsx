"use client";

import { ArrowDown } from "lucide-react";
import { useOpsStore } from "@/stores/ops-store";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { StageStatusBadge } from "@/components/ops/status-badges";

export default function UrlEmpresaPage() {
  const rows = useOpsStore((s) => s.urlRows);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-[#003366]">Identificación de empresa</h1>
        <p className="mt-1 text-sm text-[#64748b]">
          De LinkedIn Empresa a URL corporativa vía Perplexity
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Flujo del servicio</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center gap-2 text-sm md:flex-row md:justify-center md:gap-4">
            {["Nombre Empresa", "LinkedIn Empresa", "Consulta Perplexity", "URL Empresa Detectada"].map((label, i) => (
              <div key={label} className="flex items-center gap-2 md:flex-col">
                {i > 0 && <ArrowDown className="text-[#94a3b8] md:rotate-[-90deg]" size={16} />}
                <div className="rounded-lg border border-[#e2e8f0] bg-[#EAF4FF] px-4 py-2 font-medium text-[#003366]">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Resultados</CardTitle>
          <CardDescription>Estados: Pendiente · Procesando · Completado · No encontrado</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-auto rounded-lg border border-[#e2e8f0]">
            <table className="w-full text-sm">
              <thead className="bg-[#F5F7FA] text-left text-xs uppercase text-[#64748b]">
                <tr>
                  <th className="px-4 py-3 font-medium">Empresa</th>
                  <th className="px-4 py-3 font-medium">LinkedIn Empresa</th>
                  <th className="px-4 py-3 font-medium">URL detectada</th>
                  <th className="px-4 py-3 font-medium">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e2e8f0]">
                {rows.map((r) => (
                  <tr key={r.id} className="hover:bg-[#F5F7FA]/60">
                    <td className="px-4 py-3 font-medium text-[#003366]">{r.empresa}</td>
                    <td className="px-4 py-3 text-[#64748b]">{r.linkedinEmpresa}</td>
                    <td className="px-4 py-3 text-[#0066CC]">{r.urlDetectada ?? (r.status === "error" ? "No encontrado" : "—")}</td>
                    <td className="px-4 py-3">
                      <StageStatusBadge status={r.status === "error" ? "error" : r.status} />
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

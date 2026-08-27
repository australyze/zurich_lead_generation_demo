"use client";

import { useMemo, useState } from "react";
import { Search, Filter } from "lucide-react";
import { useAppStore } from "@/stores/app-store";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { EmailStatusBadge } from "@/components/shared/status-badges";
import { EmptyState } from "@/components/shared/empty-state";
import type { EmailStatus } from "@/lib/types";

const STATUS_OPTIONS: { value: EmailStatus | "all"; label: string }[] = [
  { value: "all", label: "Todos los estados" },
  { value: "no_procesado", label: "No procesado" },
  { value: "buscando", label: "Buscando" },
  { value: "encontrado", label: "Encontrado" },
  { value: "no_encontrado", label: "No encontrado" },
  { value: "validado", label: "Validado" },
  { value: "riesgoso", label: "Riesgoso" },
  { value: "neverbounce", label: "NeverBounce" },
  { value: "listo", label: "Listo para usar" },
];

export default function CorreosPage() {
  const leads = useAppStore((s) => s.leads);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<EmailStatus | "all">("all");

  const filtered = useMemo(() => {
    return leads.filter((l) => {
      const q = query.toLowerCase();
      const matchQ =
        !q ||
        l.nombre.toLowerCase().includes(q) ||
        l.empresa.toLowerCase().includes(q) ||
        (l.email?.toLowerCase().includes(q) ?? false);
      const matchS = status === "all" || l.emailStatus === status;
      return matchQ && matchS;
    });
  }, [leads, query, status]);

  const counts = useMemo(() => {
    const map: Record<string, number> = {};
    leads.forEach((l) => {
      map[l.emailStatus] = (map[l.emailStatus] ?? 0) + 1;
    });
    return map;
  }, [leads]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-[#003366]">Correos</h1>
        <p className="mt-1 text-sm text-[#64748b]">
          Búsqueda, validación y estados de email por lead
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {STATUS_OPTIONS.filter((s) => s.value !== "all").map((s) => (
          <button
            key={s.value}
            onClick={() => setStatus(s.value)}
            className={`rounded-md border px-2.5 py-1 text-xs font-medium transition-colors cursor-pointer ${
              status === s.value
                ? "border-[#0066CC] bg-[#EAF4FF] text-[#003366]"
                : "border-[#e2e8f0] bg-white text-[#64748b] hover:bg-[#F5F7FA]"
            }`}
          >
            {s.label} · {counts[s.value as string] ?? 0}
          </button>
        ))}
      </div>

      <Card>
        <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle>Leads y estado de email</CardTitle>
            <CardDescription>{filtered.length} resultados</CardDescription>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94a3b8]" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar nombre, empresa, email…"
                className="w-64 pl-9"
              />
            </div>
            <Select value={status} onValueChange={(v) => setStatus(v as EmailStatus | "all")}>
              <SelectTrigger className="w-48">
                <Filter size={14} className="mr-1 text-[#94a3b8]" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {STATUS_OPTIONS.map((s) => (
                  <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          {filtered.length === 0 ? (
            <EmptyState
              title="Sin resultados"
              description="Ajuste los filtros o el término de búsqueda para ver leads."
              actionLabel="Limpiar filtros"
              onAction={() => {
                setQuery("");
                setStatus("all");
              }}
            />
          ) : (
            <div className="overflow-auto rounded-lg border border-[#e2e8f0]">
              <table className="w-full min-w-[800px] text-sm">
                <thead className="bg-[#F5F7FA] text-left text-xs uppercase tracking-wide text-[#64748b]">
                  <tr>
                    <th className="px-4 py-3 font-medium">Nombre</th>
                    <th className="px-4 py-3 font-medium">Cargo</th>
                    <th className="px-4 py-3 font-medium">Empresa</th>
                    <th className="px-4 py-3 font-medium">Email</th>
                    <th className="px-4 py-3 font-medium">Estado búsqueda</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e2e8f0]">
                  {filtered.map((lead) => (
                    <tr key={lead.id} className="hover:bg-[#F5F7FA]/60">
                      <td className="px-4 py-3 font-medium text-[#003366]">{lead.nombre}</td>
                      <td className="px-4 py-3 text-[#64748b]">{lead.cargo}</td>
                      <td className="px-4 py-3 text-[#64748b]">{lead.empresa}</td>
                      <td className="px-4 py-3 text-[#003366]">
                        {lead.email ?? <span className="text-[#94a3b8]">—</span>}
                      </td>
                      <td className="px-4 py-3">
                        <EmailStatusBadge status={lead.emailStatus} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

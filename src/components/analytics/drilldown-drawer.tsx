"use client";

import { Download } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { toast } from "sonner";
import { getDrilldownRows, KPI_TITLES } from "@/lib/analytics-data";
import { useFilterStore } from "@/stores/filter-store";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useMemo, useState } from "react";

export function DrilldownDrawer() {
  const drilldownId = useFilterStore((s) => s.drilldownId);
  const setDrilldownId = useFilterStore((s) => s.setDrilldownId);
  const filters = useFilterStore((s) => s.filters);
  const [query, setQuery] = useState("");

  const rows = useMemo(() => {
    if (!drilldownId) return [];
    return getDrilldownRows(drilldownId, filters);
  }, [drilldownId, filters]);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    if (!q) return rows;
    return rows.filter(
      (r) =>
        r.nombre.toLowerCase().includes(q) ||
        r.empresa.toLowerCase().includes(q) ||
        r.industria.toLowerCase().includes(q) ||
        r.estado.toLowerCase().includes(q)
    );
  }, [rows, query]);

  function exportCsv() {
    toast.success("Exportación CSV simulada", {
      description: `Se generó un archivo con ${filtered.length} filas de ${KPI_TITLES[drilldownId ?? ""] ?? "detalle"}.`,
    });
  }

  return (
    <Sheet open={!!drilldownId} onOpenChange={(o) => !o && setDrilldownId(null)}>
      <SheetContent className="w-full sm:max-w-2xl overflow-hidden flex flex-col">
        <SheetHeader>
          <SheetTitle>{KPI_TITLES[drilldownId ?? ""] ?? "Detalle"}</SheetTitle>
          <SheetDescription>
            Vista drill-down con filtros locales y exportación simulada
          </SheetDescription>
        </SheetHeader>

        <div className="mt-4 flex items-center gap-2">
          <Input
            placeholder="Filtrar por nombre, empresa, estado…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1"
          />
          <Button variant="outline" onClick={exportCsv}>
            <Download size={14} />
            CSV
          </Button>
        </div>

        <div className="mt-4 flex-1 overflow-auto rounded-lg border border-[#e2e8f0]">
          <table className="w-full text-sm">
            <thead className="sticky top-0 bg-[#F5F7FA] text-left text-xs uppercase tracking-wide text-[#64748b]">
              <tr>
                <th className="px-3 py-2.5 font-medium">Nombre</th>
                <th className="px-3 py-2.5 font-medium">Empresa</th>
                <th className="px-3 py-2.5 font-medium">Industria</th>
                <th className="px-3 py-2.5 font-medium">País</th>
                <th className="px-3 py-2.5 font-medium">Estado</th>
                <th className="px-3 py-2.5 font-medium">Fecha</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e2e8f0]">
              {filtered.map((r) => (
                <tr key={r.id} className="hover:bg-[#F5F7FA]/60">
                  <td className="px-3 py-2.5">
                    <p className="font-medium text-[#003366]">{r.nombre}</p>
                    <p className="text-[11px] text-[#94a3b8]">{r.cargo}</p>
                    {r.valor && <p className="text-[11px] text-[#0066CC]">{r.valor}</p>}
                  </td>
                  <td className="px-3 py-2.5 text-[#64748b]">{r.empresa}</td>
                  <td className="px-3 py-2.5 text-[#64748b]">{r.industria}</td>
                  <td className="px-3 py-2.5 text-[#64748b]">{r.pais}</td>
                  <td className="px-3 py-2.5">
                    <Badge variant="secondary">{r.estado}</Badge>
                  </td>
                  <td className="px-3 py-2.5 text-xs text-[#94a3b8]">
                    {format(new Date(r.fecha), "dd MMM HH:mm", { locale: es })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-xs text-[#94a3b8]">{filtered.length} registros</p>
      </SheetContent>
    </Sheet>
  );
}

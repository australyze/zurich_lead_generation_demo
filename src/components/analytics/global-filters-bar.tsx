"use client";

import { RotateCcw } from "lucide-react";
import { useFilterStore } from "@/stores/filter-store";
import { FILTER_OPTIONS } from "@/lib/analytics-data";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export function GlobalFiltersBar() {
  const filters = useFilterStore((s) => s.filters);
  const setFilter = useFilterStore((s) => s.setFilter);
  const resetFilters = useFilterStore((s) => s.resetFilters);

  return (
    <div className="rounded-xl border border-[#e2e8f0] bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-[#003366]">Filtros globales</p>
          <p className="text-xs text-[#64748b]">Todos los gráficos y KPIs reaccionan a esta selección</p>
        </div>
        <Button variant="ghost" size="sm" onClick={resetFilters}>
          <RotateCcw size={14} />
          Limpiar
        </Button>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
        <FilterSelect
          label="Fecha"
          value={filters.dateRange}
          onChange={(v) => setFilter("dateRange", v as typeof filters.dateRange)}
          options={[
            { value: "7d", label: "Últimos 7 días" },
            { value: "30d", label: "Últimos 30 días" },
            { value: "90d", label: "Últimos 90 días" },
            { value: "all", label: "Todo el historial" },
          ]}
        />
        <FilterSelect
          label="Industria"
          value={filters.industria}
          onChange={(v) => setFilter("industria", v)}
          options={FILTER_OPTIONS.industrias.map((i) => ({ value: i, label: i === "todas" ? "Todas" : i }))}
        />
        <FilterSelect
          label="País"
          value={filters.pais}
          onChange={(v) => setFilter("pais", v)}
          options={FILTER_OPTIONS.paises.map((p) => ({ value: p, label: p === "todos" ? "Todos" : p }))}
        />
        <FilterSelect
          label="Empresa"
          value={filters.empresa}
          onChange={(v) => setFilter("empresa", v)}
          options={FILTER_OPTIONS.empresas.map((e) => ({ value: e, label: e === "todas" ? "Todas" : e }))}
        />
        <FilterSelect
          label="Estado"
          value={filters.estado}
          onChange={(v) => setFilter("estado", v)}
          options={FILTER_OPTIONS.estados.map((e) => ({
            value: e,
            label: e === "todos" ? "Todos" : e.replace("_", " "),
          }))}
        />
        <FilterSelect
          label="Proveedor IA"
          value={filters.proveedorIa}
          onChange={(v) => setFilter("proveedorIa", v)}
          options={FILTER_OPTIONS.proveedoresIa.map((p) => ({ value: p, label: p === "todos" ? "Todos" : p }))}
        />
        <FilterSelect
          label="Campaña"
          value={filters.campana}
          onChange={(v) => setFilter("campana", v)}
          options={FILTER_OPTIONS.campanas.map((c) => ({ value: c, label: c === "todas" ? "Todas" : c }))}
        />
      </div>
    </div>
  );
}

function FilterSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-[11px] uppercase tracking-wide text-[#94a3b8]">{label}</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="h-9 bg-[#F5F7FA] border-transparent">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map((o) => (
            <SelectItem key={o.value} value={o.value}>
              {o.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

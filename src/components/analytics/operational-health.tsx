"use client";

import { cn } from "@/lib/utils";
import type { HealthMetric } from "@/lib/analytics-types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const LEVEL_STYLES = {
  verde: { badge: "bg-emerald-50 text-emerald-700 border-emerald-200", bar: "bg-emerald-500", label: "Saludable" },
  amarillo: { badge: "bg-amber-50 text-amber-700 border-amber-200", bar: "bg-amber-500", label: "Atención" },
  rojo: { badge: "bg-red-50 text-red-700 border-red-200", bar: "bg-red-500", label: "Crítico" },
};

export function OperationalHealth({ metrics }: { metrics: HealthMetric[] }) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Salud operacional</CardTitle>
        <CardDescription>Monitoreo de tasas clave del pipeline</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-3 sm:grid-cols-2">
        {metrics.map((m) => {
          const style = LEVEL_STYLES[m.level];
          return (
            <div key={m.id} className="rounded-lg border border-[#e2e8f0] p-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-xs font-medium text-[#003366]">{m.label}</p>
                  <p className="mt-0.5 text-[10px] text-[#94a3b8]">{m.description}</p>
                </div>
                <span className={cn("rounded-md border px-1.5 py-0.5 text-[10px] font-semibold", style.badge)}>
                  {style.label}
                </span>
              </div>
              <div className="mt-3 flex items-end justify-between">
                <p className="text-xl font-semibold tabular-nums text-[#003366]">{m.value}%</p>
                <p className="text-[10px] text-[#94a3b8]">Meta {m.target}%</p>
              </div>
              <div className="mt-2 relative">
                <Progress value={Math.min(100, m.value)} className="h-1.5" />
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}

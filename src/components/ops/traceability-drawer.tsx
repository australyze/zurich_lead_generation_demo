"use client";

import { format } from "date-fns";
import { es } from "date-fns/locale";
import { useOpsStore } from "@/stores/ops-store";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { StageStatusBadge } from "@/components/ops/status-badges";
import { ScrollArea } from "@/components/ui/scroll-area";

export function TraceabilityDrawer() {
  const selectedId = useOpsStore((s) => s.selectedTraceLeadId);
  const setSelected = useOpsStore((s) => s.setSelectedTraceLeadId);
  const leads = useOpsStore((s) => s.leads);
  const lead = leads.find((l) => l.id === selectedId);

  return (
    <Sheet open={!!selectedId} onOpenChange={(o) => !o && setSelected(null)}>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Trazabilidad del lead</SheetTitle>
          <SheetDescription>
            {lead ? `${lead.nombre} · ${lead.empresa}` : "Historial completo del pipeline"}
          </SheetDescription>
        </SheetHeader>
        {lead && (
          <ScrollArea className="mt-4 h-[calc(100vh-8rem)] pr-3">
            <div className="mb-4 rounded-lg border border-[#e2e8f0] bg-[#F5F7FA] p-3 text-sm">
              <p className="font-medium text-[#003366]">{lead.cargo}</p>
              {lead.email && <p className="text-[#0066CC]">{lead.email}</p>}
              <p className="text-xs text-[#94a3b8]">{lead.id}</p>
            </div>
            <div className="relative space-y-0">
              <div className="absolute left-[15px] top-2 bottom-2 w-px bg-[#e2e8f0]" />
              {lead.steps.map((step) => (
                <div key={step.id} className="relative flex gap-3 pb-4">
                  <div
                    className={`z-10 mt-1 h-8 w-8 shrink-0 rounded-full border-2 bg-white ${
                      step.status === "completada"
                        ? "border-emerald-500"
                        : step.status === "ejecutando"
                          ? "border-[#0066CC]"
                          : step.status === "error"
                            ? "border-red-500"
                            : "border-[#cbd5e1]"
                    }`}
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm font-medium text-[#003366]">{step.label}</p>
                      <StageStatusBadge status={step.status} />
                    </div>
                    {step.provider && (
                      <p className="text-xs text-[#64748b]">Proveedor: {step.provider}</p>
                    )}
                    {step.detail && <p className="text-xs text-[#003366] mt-0.5">{step.detail}</p>}
                    {step.timestamp && (
                      <p className="text-[11px] text-[#94a3b8] mt-1">
                        {format(new Date(step.timestamp), "dd MMM yyyy HH:mm", { locale: es })}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </SheetContent>
    </Sheet>
  );
}

"use client";

import { motion } from "framer-motion";
import { formatNumber } from "@/lib/utils";
import type { FunnelStage } from "@/lib/analytics-types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface OperationalFunnelProps {
  stages: FunnelStage[];
  onStageClick: (id: string) => void;
}

export function OperationalFunnel({ stages, onStageClick }: OperationalFunnelProps) {
  const max = stages[0]?.value || 1;

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Funnel operacional</CardTitle>
        <CardDescription>
          Conversión etapa a etapa del pipeline comercial — haga clic para ver detalle
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        {stages.map((stage, i) => {
          const width = Math.max(18, (stage.value / max) * 100);
          return (
            <div key={stage.id}>
              {i > 0 && (
                <div className="flex justify-center py-0.5">
                  <div className="h-3 w-px bg-[#cbd5e1]" />
                </div>
              )}
              <motion.button
                type="button"
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => onStageClick(stage.id)}
                className="group w-full cursor-pointer"
              >
                <div className="mb-1 flex items-center justify-between text-xs">
                  <span className="font-medium text-[#003366]">{stage.label}</span>
                  <div className="flex items-center gap-3 text-[#64748b]">
                    <span className="tabular-nums font-semibold text-[#003366]">{formatNumber(stage.value)}</span>
                    {i > 0 && (
                      <>
                        <span className="text-emerald-600">{stage.conversionFromPrev}% conv.</span>
                        <span className="text-amber-600">{stage.dropOff}% pérdida</span>
                      </>
                    )}
                  </div>
                </div>
                <div className="h-9 w-full rounded-md bg-[#F5F7FA] overflow-hidden">
                  <div
                    className="flex h-full items-center rounded-md px-3 text-xs font-medium text-white transition-all group-hover:brightness-110"
                    style={{ width: `${width}%`, backgroundColor: stage.color }}
                  >
                    {width > 30 && <span className="truncate opacity-90">{stage.label}</span>}
                  </div>
                </div>
              </motion.button>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}

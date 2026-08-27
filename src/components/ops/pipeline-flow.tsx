"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowDown, Loader2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";
import type { PipelineStage } from "@/lib/ops-types";
import { StageStatusBadge } from "@/components/ops/status-badges";
import { formatNumber } from "@/lib/utils";
import { cn } from "@/lib/utils";

export function PipelineFlow({ stages }: { stages: PipelineStage[] }) {
  return (
    <div className="space-y-1">
      {stages.map((stage, i) => (
        <div key={stage.id}>
          {i > 0 && (
            <div className="flex justify-center py-1">
              <motion.div
                animate={
                  stages[i - 1].status === "completada" && stage.status === "ejecutando"
                    ? { y: [0, 4, 0], opacity: [0.5, 1, 0.5] }
                    : {}
                }
                transition={{ repeat: Infinity, duration: 1.2 }}
              >
                <ArrowDown size={16} className="text-[#94a3b8]" />
              </motion.div>
            </div>
          )}
          <Link href={stage.href}>
            <motion.div
              layout
              className={cn(
                "rounded-xl border bg-white p-4 shadow-sm transition-all hover:shadow-md",
                stage.status === "ejecutando" && "border-[#0066CC] ring-2 ring-[#0066CC]/15",
                stage.status === "error" && "border-red-300 bg-red-50/40",
                stage.status === "completada" && "border-emerald-200",
                stage.status === "pausada" && "border-amber-200",
                stage.status === "pendiente" && "border-[#e2e8f0]"
              )}
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-lg text-xs font-bold",
                      stage.status === "ejecutando" ? "bg-[#0066CC] text-white" : "bg-[#EAF4FF] text-[#0066CC]"
                    )}
                  >
                    {stage.status === "ejecutando" ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : (
                      String(i + 1).padStart(2, "0")
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#003366]">{stage.label}</p>
                    <p className="text-xs text-[#64748b]">Proveedor: {stage.provider}</p>
                  </div>
                </div>
                <StageStatusBadge status={stage.status} />
              </div>
              <div className="mt-3 grid grid-cols-3 gap-3 text-xs">
                <div>
                  <p className="text-[#94a3b8]">Registros</p>
                  <p className="font-semibold tabular-nums text-[#003366]">{formatNumber(stage.records)}</p>
                </div>
                <div>
                  <p className="text-[#94a3b8]">Tiempo</p>
                  <p className="font-semibold tabular-nums text-[#003366]">
                    {stage.durationSec > 0 ? `${stage.durationSec}s` : "—"}
                  </p>
                </div>
                <div>
                  <p className="text-[#94a3b8]">Última ejecución</p>
                  <p className="font-semibold text-[#003366]">
                    {stage.lastRun
                      ? formatDistanceToNow(new Date(stage.lastRun), { addSuffix: true, locale: es })
                      : "—"}
                  </p>
                </div>
              </div>
            </motion.div>
          </Link>
        </div>
      ))}
    </div>
  );
}

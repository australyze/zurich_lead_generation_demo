"use client";

import { motion } from "framer-motion";
import { formatNumber, formatPercent } from "@/lib/utils";
import type { ExecutiveScorecard } from "@/lib/analytics-types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

function money(n: number) {
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}

export function ExecutiveScorecardPanel({ data }: { data: ExecutiveScorecard }) {
  const items = [
    { label: "Leads totales", value: formatNumber(data.leadsTotales) },
    { label: "Pipeline activo", value: formatNumber(data.pipelineActivo) },
    { label: "Conversión global", value: formatPercent(data.conversionGlobal) },
    { label: "Tasa de respuesta", value: formatPercent(data.tasaRespuesta) },
    { label: "Campañas activas", value: formatNumber(data.campanasActivas) },
    { label: "Oportunidades potenciales", value: formatNumber(data.oportunidadesPotenciales) },
    { label: "Ingresos estimados", value: money(data.ingresosEstimados), highlight: true },
    { label: "Valor potencial pipeline", value: money(data.valorPotencialPipeline), highlight: true },
  ];

  return (
    <Card className="overflow-hidden border-[#003366]/20 bg-gradient-to-br from-[#003366] via-[#004080] to-[#0066CC] text-white shadow-lg">
      <CardHeader className="border-b border-white/10">
        <CardTitle className="text-white tracking-tight">Resumen Ejecutivo Comercial</CardTitle>
        <CardDescription className="text-white/70">
          Scorecard para reuniones gerenciales — visión consolidada del pipeline
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-5">
        <div className="grid gap-px overflow-hidden rounded-lg bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.04 }}
              className="bg-[#003366]/40 backdrop-blur-sm p-4"
            >
              <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-white/60">
                {item.label}
              </p>
              <p
                className={`mt-2 tabular-nums font-semibold ${
                  item.highlight ? "text-lg text-[#A8D4FF]" : "text-xl text-white"
                }`}
              >
                {item.value}
              </p>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

"use client";

import { motion } from "framer-motion";
import { USE_CASES } from "@/lib/enterprise-data";
import { formatNumber } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function CasosUsoPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-[#003366]">Casos de uso</h1>
        <p className="mt-1 text-sm text-[#64748b]">
          Escenarios comerciales listos para demostrar valor por industria y geografía
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {USE_CASES.map((uc, i) => (
          <motion.div
            key={uc.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
          >
            <Card className="h-full transition-all hover:border-[#0066CC]/40 hover:shadow-md">
              <CardHeader>
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-lg">{uc.titulo}</CardTitle>
                  <Badge variant="secondary">Caso {i + 1}</Badge>
                </div>
                <CardDescription>{uc.descripcion}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-3">
                  <Metric label="Leads" value={formatNumber(uc.leads)} />
                  <Metric label="Correos" value={formatNumber(uc.correos)} />
                  <Metric label="Campañas" value={formatNumber(uc.campanas)} />
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-[#94a3b8]">Resultados</p>
                  <ul className="mt-2 space-y-1.5">
                    {uc.resultados.map((r) => (
                      <li
                        key={r}
                        className="rounded-md border border-[#EAF4FF] bg-[#EAF4FF]/50 px-3 py-2 text-sm text-[#003366]"
                      >
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-[#F5F7FA] p-3 text-center">
      <p className="text-[11px] uppercase tracking-wide text-[#94a3b8]">{label}</p>
      <p className="mt-1 text-lg font-semibold tabular-nums text-[#003366]">{value}</p>
    </div>
  );
}

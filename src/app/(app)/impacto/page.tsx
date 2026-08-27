"use client";

import { motion } from "framer-motion";
import { COMMERCIAL_IMPACT } from "@/lib/enterprise-data";
import { formatNumber } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

function money(n: number) {
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}

export default function ImpactoPage() {
  const d = COMMERCIAL_IMPACT;
  const items = [
    { label: "Leads generados mensuales", value: formatNumber(d.leadsMensuales) },
    { label: "Correos validados", value: formatNumber(d.correosValidados) },
    { label: "Reuniones potenciales", value: formatNumber(d.reunionesPotenciales) },
    { label: "Oportunidades potenciales", value: formatNumber(d.oportunidadesPotenciales) },
    { label: "Pipeline comercial estimado", value: money(d.pipelineEstimado), highlight: true },
    { label: "ROI potencial", value: `${d.roiPotencial}x`, highlight: true },
    { label: "Costo por lead", value: `$${d.costoPorLead.toFixed(3)}` },
    { label: "Costo por reunión", value: `$${d.costoPorReunion.toFixed(2)}` },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-[#003366]">Impacto Comercial Estimado</h1>
        <p className="mt-1 text-sm text-[#64748b]">
          Centro de valor comercial — indicadores simulados para conversaciones ejecutivas
        </p>
      </div>

      <Card className="overflow-hidden border-0 bg-gradient-to-br from-[#003366] via-[#004080] to-[#0066CC] text-white shadow-xl">
        <CardHeader>
          <CardTitle className="text-white tracking-tight">Valor entregado por el pipeline</CardTitle>
          <CardDescription className="text-white/70">
            Escala demo coherente con Dashboard, Analítica y Operaciones
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-px overflow-hidden rounded-xl bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {items.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                className="bg-[#003366]/50 p-5 backdrop-blur-sm"
              >
                <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-white/60">
                  {item.label}
                </p>
                <p
                  className={`mt-2 tabular-nums font-semibold ${
                    item.highlight ? "text-xl text-[#A8D4FF]" : "text-2xl text-white"
                  }`}
                >
                  {item.value}
                </p>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-3">
        <Insight
          title="Eficiencia de captación"
          body="Con 1.000 leads/mes y 55% de validación, el funnel sostiene un volumen enterprise listo para Instantly."
        />
        <Insight
          title="Conversión a reunión"
          body="48 reuniones potenciales implican un costo por reunión competitivo frente a outbound manual."
        />
        <Insight
          title="Escalabilidad"
          body="El mismo stack puede crecer vía CRM, múltiples modelos de IA y nuevos conectores sin rehacer el proceso."
        />
      </div>
    </div>
  );
}

function Insight({ title, body }: { title: string; body: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent className="text-sm text-[#64748b]">{body}</CardContent>
    </Card>
  );
}

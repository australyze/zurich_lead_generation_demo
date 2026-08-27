"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useFilterStore } from "@/stores/filter-store";
import {
  getExecutiveKpis,
  getOperationalFunnel,
  getHealthMetrics,
  getTimelineEvents,
  getOpsAlerts,
  getScorecard,
} from "@/lib/analytics-data";
import { GlobalFiltersBar } from "@/components/analytics/global-filters-bar";
import { ExecutiveKpiCard } from "@/components/analytics/executive-kpi-card";
import { OperationalFunnel } from "@/components/analytics/operational-funnel";
import { OperationalHealth } from "@/components/analytics/operational-health";
import { ActivityTimeline } from "@/components/analytics/activity-timeline";
import { AlertsWidget } from "@/components/analytics/alerts-widget";
import { ExecutiveScorecardPanel } from "@/components/analytics/executive-scorecard";
import { DrilldownDrawer } from "@/components/analytics/drilldown-drawer";
import type { OpsAlert } from "@/lib/analytics-types";

export default function DashboardPage() {
  const filters = useFilterStore((s) => s.filters);
  const setDrilldownId = useFilterStore((s) => s.setDrilldownId);
  const router = useRouter();

  const kpis = useMemo(() => getExecutiveKpis(filters), [filters]);
  const funnel = useMemo(() => getOperationalFunnel(filters), [filters]);
  const health = useMemo(() => getHealthMetrics(filters), [filters]);
  const timeline = useMemo(() => getTimelineEvents(), []);
  const alerts = useMemo(() => getOpsAlerts(filters), [filters]);
  const scorecard = useMemo(() => getScorecard(filters), [filters]);

  function handleAlert(alert: OpsAlert) {
    const map: Record<string, string> = {
      a1: "/correos",
      a2: "/campanas",
      a3: "/prospection",
      a4: "/campanas",
      a5: "/analitica",
    };
    toast.message(alert.title, { description: `Navegando a ${alert.actionLabel}…` });
    router.push(map[alert.id] ?? "/analitica");
  }

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-semibold tracking-tight text-[#003366]">
          Dashboard ejecutivo
        </h1>
        <p className="mt-1 text-sm text-[#64748b]">
          Desempeño operacional del pipeline comercial — listo para reuniones gerenciales
        </p>
      </motion.div>

      <GlobalFiltersBar />

      <ExecutiveScorecardPanel data={scorecard} />

      {/* Zona 1 */}
      <section>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-[#64748b]">
          Zona 1 · Resumen ejecutivo
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
          {kpis.map((kpi, i) => (
            <ExecutiveKpiCard
              key={kpi.id}
              kpi={kpi}
              index={i}
              onClick={() => setDrilldownId(kpi.id)}
            />
          ))}
        </div>
      </section>

      {/* Zona 2 + 3 */}
      <section className="grid gap-4 xl:grid-cols-2">
        <div>
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-[#64748b]">
            Zona 2 · Funnel operacional
          </h2>
          <OperationalFunnel stages={funnel} onStageClick={(id) => setDrilldownId(id)} />
        </div>
        <div>
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-[#64748b]">
            Zona 3 · Salud operacional
          </h2>
          <OperationalHealth metrics={health} />
        </div>
      </section>

      {/* Zona 4 + 5 */}
      <section className="grid gap-4 xl:grid-cols-2">
        <div>
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-[#64748b]">
            Zona 4 · Actividad reciente
          </h2>
          <ActivityTimeline events={timeline} />
        </div>
        <div>
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-[#64748b]">
            Zona 5 · Alertas
          </h2>
          <AlertsWidget alerts={alerts} onAction={handleAlert} />
        </div>
      </section>

      <DrilldownDrawer />
    </div>
  );
}

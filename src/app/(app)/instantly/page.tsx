"use client";

import { useMemo } from "react";
import { Eye, MessageSquare, ThumbsUp, ThumbsDown, AlertCircle, Pause, Play } from "lucide-react";
import { toast } from "sonner";
import { useAppStore } from "@/stores/app-store";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { KpiCard } from "@/components/shared/kpi-card";
import { InstantlyStatusBadge } from "@/components/shared/status-badges";
import { formatPercent } from "@/lib/utils";
import type { InstantlyStatus } from "@/lib/types";

export default function InstantlyPage() {
  const campaigns = useAppStore((s) => s.instantlyCampaigns);
  const updateStatus = useAppStore((s) => s.updateInstantlyStatus);

  const metrics = useMemo(() => {
    const active = campaigns.filter((c) => c.status === "activa" || c.status === "enviada" || c.status === "finalizada");
    const avg = (key: "openRate" | "replyRate" | "bounceRate") =>
      active.length ? active.reduce((a, c) => a + c[key], 0) / active.length : 0;
    return {
      openRate: avg("openRate"),
      replyRate: avg("replyRate"),
      positive: campaigns.reduce((a, c) => a + c.positiveReplies, 0),
      negative: campaigns.reduce((a, c) => a + c.negativeReplies, 0),
      bounceRate: avg("bounceRate"),
    };
  }, [campaigns]);

  function togglePause(id: string, status: InstantlyStatus) {
    if (status === "activa") {
      updateStatus(id, "pausada");
      toast.message("Campaña pausada");
    } else if (status === "pausada") {
      updateStatus(id, "activa");
      toast.success("Campaña reactivada");
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-[#003366]">Instantly</h1>
        <p className="mt-1 text-sm text-[#64748b]">
          Operación de campañas aprobadas — métricas de engagement en tiempo real (mock)
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <KpiCard title="Open Rate" value={Number(metrics.openRate.toFixed(1))} icon={Eye} hint={formatPercent(metrics.openRate)} index={0} />
        <KpiCard title="Reply Rate" value={Number(metrics.replyRate.toFixed(1))} icon={MessageSquare} hint={formatPercent(metrics.replyRate)} index={1} />
        <KpiCard title="Positive Replies" value={metrics.positive} icon={ThumbsUp} accent="bg-emerald-50 text-emerald-600" index={2} />
        <KpiCard title="Negative Replies" value={metrics.negative} icon={ThumbsDown} accent="bg-red-50 text-red-600" index={3} />
        <KpiCard title="Bounce Rate" value={Number(metrics.bounceRate.toFixed(1))} icon={AlertCircle} hint={formatPercent(metrics.bounceRate)} accent="bg-amber-50 text-amber-600" index={4} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Campañas aprobadas</CardTitle>
          <CardDescription>Estados operacionales Instantly.ai (simulado)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-auto rounded-lg border border-[#e2e8f0]">
            <table className="w-full min-w-[1000px] text-sm">
              <thead className="bg-[#F5F7FA] text-left text-xs uppercase tracking-wide text-[#64748b]">
                <tr>
                  <th className="px-4 py-3 font-medium">Campaña</th>
                  <th className="px-4 py-3 font-medium">Leads</th>
                  <th className="px-4 py-3 font-medium">Estado</th>
                  <th className="px-4 py-3 font-medium">Open Rate</th>
                  <th className="px-4 py-3 font-medium">Reply Rate</th>
                  <th className="px-4 py-3 font-medium">Positive</th>
                  <th className="px-4 py-3 font-medium">Negative</th>
                  <th className="px-4 py-3 font-medium">Bounce</th>
                  <th className="px-4 py-3 font-medium">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e2e8f0]">
                {campaigns.map((c) => (
                  <tr key={c.id} className="hover:bg-[#F5F7FA]/60">
                    <td className="px-4 py-3 font-medium text-[#003366]">{c.name}</td>
                    <td className="px-4 py-3 text-[#64748b]">{c.leadCount}</td>
                    <td className="px-4 py-3">
                      <InstantlyStatusBadge status={c.status} />
                    </td>
                    <td className="px-4 py-3 tabular-nums text-[#003366]">{formatPercent(c.openRate)}</td>
                    <td className="px-4 py-3 tabular-nums text-[#003366]">{formatPercent(c.replyRate)}</td>
                    <td className="px-4 py-3 tabular-nums text-emerald-700">{c.positiveReplies}</td>
                    <td className="px-4 py-3 tabular-nums text-red-600">{c.negativeReplies}</td>
                    <td className="px-4 py-3 tabular-nums text-[#64748b]">{formatPercent(c.bounceRate)}</td>
                    <td className="px-4 py-3">
                      {(c.status === "activa" || c.status === "pausada") && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => togglePause(c.id, c.status)}
                        >
                          {c.status === "activa" ? <Pause size={14} /> : <Play size={14} />}
                          {c.status === "activa" ? "Pausar" : "Reactivar"}
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

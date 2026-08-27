"use client";

import { AlertTriangle, Info, ShieldAlert } from "lucide-react";
import type { OpsAlert } from "@/lib/analytics-types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const SEVERITY = {
  critica: { icon: ShieldAlert, className: "border-red-200 bg-red-50", iconColor: "text-red-600", label: "Crítica" },
  alta: { icon: AlertTriangle, className: "border-amber-200 bg-amber-50", iconColor: "text-amber-600", label: "Alta" },
  media: { icon: AlertTriangle, className: "border-orange-200 bg-orange-50/60", iconColor: "text-orange-600", label: "Media" },
  info: { icon: Info, className: "border-sky-200 bg-sky-50", iconColor: "text-sky-600", label: "Info" },
};

export function AlertsWidget({
  alerts,
  onAction,
}: {
  alerts: OpsAlert[];
  onAction?: (alert: OpsAlert) => void;
}) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Alertas operacionales</CardTitle>
        <CardDescription>Problemas que requieren atención del equipo comercial</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {alerts.map((alert) => {
          const s = SEVERITY[alert.severity];
          const Icon = s.icon;
          return (
            <div
              key={alert.id}
              className={cn("rounded-lg border p-3", s.className)}
            >
              <div className="flex items-start gap-3">
                <Icon className={cn("mt-0.5 shrink-0", s.iconColor)} size={18} />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-semibold uppercase tracking-wide text-[#64748b]">
                      {s.label}
                    </span>
                    <span className="rounded-md bg-white/80 px-1.5 py-0.5 text-xs font-bold tabular-nums text-[#003366]">
                      {alert.count}
                    </span>
                  </div>
                  <p className="mt-1 text-sm font-medium text-[#003366]">{alert.title}</p>
                  <p className="text-xs text-[#64748b]">{alert.description}</p>
                  <Button
                    size="sm"
                    variant="outline"
                    className="mt-2 h-7 bg-white"
                    onClick={() => onAction?.(alert)}
                  >
                    {alert.actionLabel}
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}

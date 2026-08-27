"use client";

import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";
import { useOpsStore } from "@/stores/ops-store";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function RespuestasOpsPage() {
  const replies = useOpsStore((s) => s.replies);
  const counts = replies.reduce<Record<string, number>>((acc, r) => {
    acc[r.clasificacion] = (acc[r.clasificacion] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-[#003366]">Monitor de respuestas</h1>
        <p className="mt-1 text-sm text-[#64748b]">
          Clasificación automática de replies inbound
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {Object.entries(counts).map(([k, v]) => (
          <Badge key={k} variant="secondary" className="px-3 py-1">
            {k}: {v}
          </Badge>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Bandeja de respuestas</CardTitle>
          <CardDescription>
            Positiva · Negativa · OOO · Rebote · Interesado · Solicita reunión · Contacto incorrecto
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {replies.map((r) => (
            <div key={r.id} className="rounded-lg border border-[#e2e8f0] p-4">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <p className="text-sm font-medium text-[#003366]">{r.lead}</p>
                  <p className="text-xs text-[#64748b]">{r.empresa}</p>
                </div>
                <div className="text-right">
                  <Badge variant="secondary">{r.clasificacion}</Badge>
                  <p className="mt-1 text-[11px] text-[#94a3b8]">
                    {formatDistanceToNow(new Date(r.fecha), { addSuffix: true, locale: es })}
                  </p>
                </div>
              </div>
              <p className="mt-2 text-sm text-[#003366]">“{r.preview}”</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

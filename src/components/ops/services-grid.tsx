"use client";

import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";
import type { ServiceCard } from "@/lib/ops-types";
import { StageStatusBadge } from "@/components/ops/status-badges";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatNumber, formatPercent } from "@/lib/utils";

export function ServicesGrid({ services }: { services: ServiceCard[] }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {services.map((svc) => (
        <Link key={svc.id} href={svc.href}>
          <Card className="h-full transition-all hover:border-[#0066CC]/40 hover:shadow-md">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between gap-2">
                <CardTitle className="text-base">{svc.name}</CardTitle>
                <StageStatusBadge status={svc.status} />
              </div>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <p className="text-[#94a3b8]">Última ejecución</p>
                <p className="font-medium text-[#003366]">
                  {formatDistanceToNow(new Date(svc.lastRun), { addSuffix: true, locale: es })}
                </p>
              </div>
              <div>
                <p className="text-[#94a3b8]">Tiempo promedio</p>
                <p className="font-medium text-[#003366]">{svc.avgTimeSec}s</p>
              </div>
              <div>
                <p className="text-[#94a3b8]">Registros</p>
                <p className="font-medium text-[#003366]">{formatNumber(svc.recordsProcessed)}</p>
              </div>
              <div>
                <p className="text-[#94a3b8]">Tasa éxito</p>
                <p className="font-medium text-[#003366]">{formatPercent(svc.successRate)}</p>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}

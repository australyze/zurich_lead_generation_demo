"use client";

import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";
import type { OpsJob } from "@/lib/ops-types";
import { JobStatusBadge } from "@/components/ops/status-badges";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

export function JobQueue({ jobs }: { jobs: OpsJob[] }) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Trabajos en proceso</CardTitle>
        <CardDescription>Cola operacional del orquestador</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[520px] pr-3">
          <div className="space-y-3">
            {jobs.map((job) => (
              <div key={job.id} className="rounded-lg border border-[#e2e8f0] p-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-xs font-mono text-[#0066CC]">{job.id}</p>
                    <p className="text-sm font-medium text-[#003366]">{job.typeLabel}</p>
                  </div>
                  <JobStatusBadge status={job.status} />
                </div>
                <div className="mt-2 grid grid-cols-2 gap-2 text-[11px] text-[#64748b]">
                  <p>Proveedor: <span className="text-[#003366]">{job.provider}</span></p>
                  <p>Registros: <span className="text-[#003366]">{job.recordsProcessed}</span></p>
                  <p>
                    Inicio:{" "}
                    <span className="text-[#003366]">
                      {formatDistanceToNow(new Date(job.startedAt), { addSuffix: true, locale: es })}
                    </span>
                  </p>
                  <p>Duración: <span className="text-[#003366]">{job.durationSec > 0 ? `${job.durationSec}s` : "—"}</span></p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

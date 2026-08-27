import { Badge } from "@/components/ui/badge";
import type { JobStatus, LogSeverity, StageStatus } from "@/lib/ops-types";

const STAGE: Record<StageStatus, { label: string; variant: "outline" | "info" | "success" | "danger" | "warning" }> = {
  pendiente: { label: "Pendiente", variant: "outline" },
  ejecutando: { label: "En ejecución", variant: "info" },
  completada: { label: "Completada", variant: "success" },
  error: { label: "Error", variant: "danger" },
  pausada: { label: "Pausada", variant: "warning" },
};

const JOB: Record<JobStatus, { label: string; variant: "outline" | "info" | "success" | "danger" | "warning" }> = {
  pendiente: { label: "Pendiente", variant: "outline" },
  ejecutando: { label: "Ejecutando", variant: "info" },
  completado: { label: "Completado", variant: "success" },
  error: { label: "Error", variant: "danger" },
  pausado: { label: "Pausado", variant: "warning" },
};

const LOG: Record<LogSeverity, { variant: "outline" | "info" | "success" | "danger" | "warning" }> = {
  INFO: { variant: "info" },
  WARNING: { variant: "warning" },
  SUCCESS: { variant: "success" },
  ERROR: { variant: "danger" },
};

export function StageStatusBadge({ status }: { status: StageStatus }) {
  const m = STAGE[status];
  return <Badge variant={m.variant}>{m.label}</Badge>;
}

export function JobStatusBadge({ status }: { status: JobStatus }) {
  const m = JOB[status];
  return <Badge variant={m.variant}>{m.label}</Badge>;
}

export function LogSeverityBadge({ severity }: { severity: LogSeverity }) {
  return <Badge variant={LOG[severity].variant}>{severity}</Badge>;
}

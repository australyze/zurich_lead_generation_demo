import { Badge } from "@/components/ui/badge";
import type {
  CrmStatus,
  EmailStatus,
  ProspectingStatus,
  CommercialPriority,
  CampaignEmailStatus,
} from "@/lib/types";

const EMAIL_MAP: Record<EmailStatus, { label: string; variant: "default" | "secondary" | "success" | "warning" | "danger" | "outline" | "info" }> = {
  no_procesado: { label: "No procesado", variant: "outline" },
  buscando: { label: "Buscando", variant: "info" },
  encontrado: { label: "Encontrado", variant: "secondary" },
  no_encontrado: { label: "No encontrado", variant: "danger" },
  validado: { label: "Validado", variant: "success" },
  riesgoso: { label: "Riesgoso", variant: "warning" },
  neverbounce: { label: "NeverBounce", variant: "info" },
  listo: { label: "Listo para usar", variant: "success" },
};

const PROSPECT_MAP: Record<ProspectingStatus, { label: string; variant: "default" | "secondary" | "success" | "warning" | "danger" | "outline" | "info" }> = {
  pendiente: { label: "Pendiente", variant: "outline" },
  ejecutando: { label: "Ejecutando", variant: "info" },
  completado: { label: "Completado", variant: "success" },
  error: { label: "Error", variant: "danger" },
};

const CRM_MAP: Record<CrmStatus, { label: string; variant: "default" | "secondary" | "success" | "warning" | "danger" | "outline" | "info" }> = {
  conectado: { label: "Conectado", variant: "success" },
  desconectado: { label: "Desconectado", variant: "outline" },
  proximamente: { label: "Próximamente", variant: "info" },
};

const PRIORITY_MAP: Record<CommercialPriority, { label: string; variant: "default" | "secondary" | "success" | "warning" | "danger" | "outline" | "info" }> = {
  alta: { label: "Alta", variant: "danger" },
  media: { label: "Media", variant: "warning" },
  baja: { label: "Baja", variant: "outline" },
};

const CAMPAIGN_EMAIL_MAP: Record<CampaignEmailStatus, { label: string; variant: "default" | "secondary" | "success" | "warning" | "danger" | "outline" | "info" }> = {
  borrador: { label: "Borrador", variant: "outline" },
  guardado: { label: "Guardado", variant: "info" },
  aprobado: { label: "Aprobado", variant: "success" },
};

export function EmailStatusBadge({ status }: { status: EmailStatus }) {
  const m = EMAIL_MAP[status];
  return <Badge variant={m.variant}>{m.label}</Badge>;
}

export function ProspectStatusBadge({ status }: { status: ProspectingStatus }) {
  const m = PROSPECT_MAP[status];
  return <Badge variant={m.variant}>{m.label}</Badge>;
}

export function CrmStatusBadge({ status }: { status: CrmStatus }) {
  const m = CRM_MAP[status];
  return <Badge variant={m.variant}>{m.label}</Badge>;
}

export function PriorityBadge({ priority }: { priority: CommercialPriority }) {
  const m = PRIORITY_MAP[priority];
  return <Badge variant={m.variant}>{m.label}</Badge>;
}

export function CampaignEmailStatusBadge({ status }: { status: CampaignEmailStatus }) {
  const m = CAMPAIGN_EMAIL_MAP[status];
  return <Badge variant={m.variant}>{m.label}</Badge>;
}

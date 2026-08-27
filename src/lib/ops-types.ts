export type StageStatus = "pendiente" | "ejecutando" | "completada" | "error" | "pausada";

export type JobType =
  | "busqueda_leads"
  | "url_empresa"
  | "email_finder"
  | "validacion"
  | "neverbounce"
  | "enriquecimiento"
  | "campana"
  | "envio"
  | "crm";

export type JobStatus = "pendiente" | "ejecutando" | "completado" | "error" | "pausado";

export type LogSeverity = "INFO" | "WARNING" | "SUCCESS" | "ERROR";

export type ProviderId =
  | "apify"
  | "perplexity_url"
  | "anymailfinder"
  | "validation"
  | "neverbounce"
  | "perplexity"
  | "openai"
  | "approval"
  | "instantly"
  | "hubspot";

export interface PipelineStage {
  id: ProviderId;
  label: string;
  provider: string;
  status: StageStatus;
  records: number;
  durationSec: number;
  lastRun?: string;
  href: string;
}

export interface OpsJob {
  id: string;
  type: JobType;
  typeLabel: string;
  status: JobStatus;
  startedAt: string;
  durationSec: number;
  recordsProcessed: number;
  provider: string;
}

export interface TraceStep {
  id: string;
  label: string;
  status: StageStatus;
  timestamp: string;
  detail?: string;
  provider?: string;
}

export interface TraceableLead {
  id: string;
  nombre: string;
  empresa: string;
  email?: string;
  cargo: string;
  steps: TraceStep[];
}

export interface ServiceCard {
  id: string;
  name: string;
  status: StageStatus;
  lastRun: string;
  avgTimeSec: number;
  recordsProcessed: number;
  successRate: number;
  href: string;
}

export interface CostRow {
  provider: string;
  queries: number;
  unitCost: number;
  totalCost: number;
}

export interface SystemLog {
  id: string;
  timestamp: string;
  severity: LogSeverity;
  provider: string;
  message: string;
}

export interface UrlEmpresaRow {
  id: string;
  empresa: string;
  linkedinEmpresa: string;
  urlDetectada?: string;
  status: StageStatus;
}

export interface AnymailRow {
  id: string;
  lead: string;
  empresa: string;
  dominio: string;
  email?: string;
  confianza: number;
  status: StageStatus;
}

export interface ValidationBucket {
  validos: AnymailRow[];
  riesgosos: AnymailRow[];
  invalidos: AnymailRow[];
}

export interface NeverBounceRow {
  id: string;
  email: string;
  resultado: "Valid" | "Catch-All" | "Risky" | "Disposable" | "Invalid";
  reason: string;
  score: number;
  estadoFinal: string;
}

export interface EnrichmentDemo {
  lead: string;
  empresa: string;
  prompt: string;
  resultado: {
    empresa: string;
    industria: string;
    ingresos: string;
    tecnologias: string[];
    noticias: string[];
    dolores: string[];
    oportunidades: string[];
  };
}

export interface CampaignGenDemo {
  lead: string;
  empresa: string;
  contexto: string;
  prompt: string;
  modelo: string;
  tokens: number;
  costo: number;
  emails: { order: number; subject: string; body: string }[];
}

export interface ApprovalItem {
  id: string;
  lead: string;
  empresa: string;
  estado: "pendiente" | "aprobada" | "rechazada";
  fecha: string;
  usuario: string;
  emails: { order: number; subject: string; body: string }[];
}

export interface InstantlyQueueItem {
  id: string;
  campana: string;
  leads: number;
  status: "pendiente" | "listo" | "enviado" | "activo" | "pausado" | "finalizado";
}

export interface ReplyMonitorItem {
  id: string;
  lead: string;
  empresa: string;
  clasificacion:
    | "Positiva"
    | "Negativa"
    | "Fuera de Oficina"
    | "Rebote"
    | "Interesado"
    | "Solicita Reunión"
    | "No es el contacto correcto";
  preview: string;
  fecha: string;
}

export interface CrmSyncRow {
  id: string;
  lead: string;
  contacto: string;
  empresa: string;
  oportunidad?: string;
  status: StageStatus;
}

export type DateRangeFilter = "7d" | "30d" | "90d" | "all";

export type HealthLevel = "verde" | "amarillo" | "rojo";

export type AlertSeverity = "critica" | "alta" | "media" | "info";

export type ReplyCategory =
  | "positiva"
  | "negativa"
  | "interesado"
  | "no_interesado"
  | "fuera_oficina"
  | "rebote"
  | "reagendar";

export type TimelineEventType =
  | "enriquecimiento"
  | "email"
  | "campana"
  | "envio"
  | "respuesta"
  | "crm"
  | "prospection";

export interface GlobalFilters {
  dateRange: DateRangeFilter;
  industria: string;
  pais: string;
  empresa: string;
  estado: string;
  proveedorIa: string;
  campana: string;
}

export interface SparkKpi {
  id: string;
  label: string;
  value: number;
  delta: number;
  sparkline: number[];
  format?: "number" | "percent";
}

export interface FunnelStage {
  id: string;
  label: string;
  value: number;
  conversionFromPrev: number;
  dropOff: number;
  color: string;
}

export interface HealthMetric {
  id: string;
  label: string;
  value: number;
  target: number;
  level: HealthLevel;
  description: string;
}

export interface TimelineEvent {
  id: string;
  time: string;
  type: TimelineEventType;
  title: string;
  lead: string;
  empresa: string;
  estado: string;
}

export interface OpsAlert {
  id: string;
  severity: AlertSeverity;
  title: string;
  description: string;
  count: number;
  actionLabel: string;
}

export interface ExecutiveScorecard {
  leadsTotales: number;
  pipelineActivo: number;
  conversionGlobal: number;
  tasaRespuesta: number;
  campanasActivas: number;
  oportunidadesPotenciales: number;
  ingresosEstimados: number;
  valorPotencialPipeline: number;
}

export interface DrilldownRow {
  id: string;
  nombre: string;
  empresa: string;
  industria: string;
  pais: string;
  cargo: string;
  estado: string;
  valor?: string;
  fecha: string;
}

export interface CampaignRankingRow {
  id: string;
  campana: string;
  leads: number;
  openRate: number;
  replyRate: number;
  positivos: number;
  negativos: number;
  rebotes: number;
  estado: string;
  score: number;
}

export interface CrmSyncStats {
  leadsSincronizados: number;
  oportunidadesCreadas: number;
  empresasCreadas: number;
  contactosCreados: number;
  sincronizacionesFallidas: number;
  hubspot: "conectado" | "degradado" | "desconectado";
  salesforce: "conectado" | "degradado" | "desconectado";
  monday: "conectado" | "degradado" | "desconectado";
}

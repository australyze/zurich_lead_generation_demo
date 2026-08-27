export type ProspectingStatus = "pendiente" | "ejecutando" | "completado" | "error";

export type EmailStatus =
  | "no_procesado"
  | "buscando"
  | "encontrado"
  | "no_encontrado"
  | "validado"
  | "riesgoso"
  | "neverbounce"
  | "listo";

export type CampaignEmailStatus = "borrador" | "guardado" | "aprobado";

export type InstantlyStatus =
  | "pendiente_envio"
  | "programada"
  | "enviada"
  | "activa"
  | "pausada"
  | "finalizada";

export type CrmStatus = "conectado" | "desconectado" | "proximamente";

export type CommercialPriority = "alta" | "media" | "baja";

export interface Lead {
  id: string;
  nombre: string;
  cargo: string;
  empresa: string;
  industria: string;
  pais: string;
  nivelJerarquico: string;
  linkedinPersonal: string;
  linkedinEmpresa: string;
  estado: ProspectingStatus;
  fecha: string;
  email?: string;
  emailStatus: EmailStatus;
  enriquecido: boolean;
  prioridad: CommercialPriority;
  telefono?: string;
  ubicacion?: string;
  empresaSize?: string;
  tecnologias?: string[];
  insights?: string[];
  companyDescription?: string;
  campaignReady: boolean;
  campaignId?: string;
}

export interface CampaignSequenceEmail {
  id: string;
  order: number;
  subject: string;
  body: string;
  status: CampaignEmailStatus;
}

export interface Campaign {
  id: string;
  leadId: string;
  leadName: string;
  company: string;
  emails: CampaignSequenceEmail[];
  approved: boolean;
  createdAt: string;
}

export interface InstantlyCampaign {
  id: string;
  name: string;
  leadCount: number;
  status: InstantlyStatus;
  openRate: number;
  replyRate: number;
  positiveReplies: number;
  negativeReplies: number;
  bounceRate: number;
  scheduledAt?: string;
  activatedAt?: string;
}

export interface ActivityItem {
  id: string;
  type: "prospection" | "email" | "enrichment" | "campaign" | "instantly" | "crm";
  title: string;
  description: string;
  timestamp: string;
}

export interface KpiStats {
  leadsEncontrados: number;
  correosEncontrados: number;
  correosValidados: number;
  leadsEnriquecidos: number;
  campanasGeneradas: number;
  campanasActivadas: number;
  respuestasPositivas: number;
  respuestasNegativas: number;
}

export interface AiProvider {
  id: string;
  name: string;
  cost: string;
  speed: "Alta" | "Media" | "Muy Alta";
  quality: "Excelente" | "Muy Buena" | "Buena";
  description: string;
}

export interface CrmIntegration {
  id: string;
  name: string;
  status: CrmStatus;
  description: string;
}

export interface ProspectingJob {
  id: string;
  status: ProspectingStatus;
  progress: number;
  config: ProspectingConfig;
  startedAt?: string;
  completedAt?: string;
  leadsGenerated: number;
}

export interface ProspectingConfig {
  empresaObjetivo: string;
  industria: string;
  pais: string;
  cargo: string;
  nivelJerarquico: string;
  cantidadMaxima: number;
  keywords: string;
  linkedinSearchUrl: string;
}

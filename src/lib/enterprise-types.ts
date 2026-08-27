export interface AiModelRow {
  id: string;
  proveedor: string;
  modelo: string;
  velocidad: string;
  costoRelativo: string;
  razonamiento: string;
  escritura: string;
  usoRecomendado: string;
  estado: "Activo" | "Disponible" | "Beta";
}

export interface AiBenchmark {
  id: string;
  modelo: string;
  costo: number;
  tiempoMs: number;
  calidad: number;
  tokens: number;
  casosUso: string;
}

export interface TeamRow {
  id: string;
  nombre: string;
  usuarios: number;
  ultimoAcceso: string;
  estado: "Activo" | "Inactivo";
}

export interface RoleRow {
  id: string;
  rol: string;
  descripcion: string;
  permisos: string[];
}

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  time: string;
  read: boolean;
  href?: string;
}

export interface SearchResult {
  id: string;
  type: "Lead" | "Campaña" | "Empresa" | "CRM";
  title: string;
  subtitle: string;
  href: string;
}

export interface CommercialImpact {
  leadsMensuales: number;
  correosValidados: number;
  reunionesPotenciales: number;
  oportunidadesPotenciales: number;
  pipelineEstimado: number;
  roiPotencial: number;
  costoPorLead: number;
  costoPorReunion: number;
}

export interface TourStep {
  id: string;
  route: string;
  title: string;
  description: string;
}

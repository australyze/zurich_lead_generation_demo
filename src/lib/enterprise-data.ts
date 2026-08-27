import type {
  AiBenchmark,
  AiModelRow,
  CommercialImpact,
  NotificationItem,
  RoleRow,
  SearchResult,
  TeamRow,
  TourStep,
  UseCaseCard,
} from "./enterprise-types";

export const AI_MODELS: AiModelRow[] = [
  { id: "gpt-5", proveedor: "OpenAI", modelo: "GPT-5", velocidad: "Alta", costoRelativo: "$$$", razonamiento: "Excelente", escritura: "Excelente", usoRecomendado: "Campañas y copy ejecutivo", estado: "Activo" },
  { id: "gpt-5-mini", proveedor: "OpenAI", modelo: "GPT-5 Mini", velocidad: "Muy Alta", costoRelativo: "$", razonamiento: "Muy Buena", escritura: "Muy Buena", usoRecomendado: "Volumen y drafts rápidos", estado: "Disponible" },
  { id: "gpt-4.1", proveedor: "OpenAI", modelo: "GPT-4.1", velocidad: "Alta", costoRelativo: "$$", razonamiento: "Muy Buena", escritura: "Muy Buena", usoRecomendado: "Personalización por industria", estado: "Disponible" },
  { id: "perplexity-sonar", proveedor: "Perplexity", modelo: "Perplexity Sonar", velocidad: "Media", costoRelativo: "$$", razonamiento: "Excelente", escritura: "Buena", usoRecomendado: "Enriquecimiento y research", estado: "Activo" },
];

export const AI_BENCHMARKS: AiBenchmark[] = [
  { id: "gpt-5", modelo: "GPT-5", costo: 0.022, tiempoMs: 1800, calidad: 96, tokens: 1840, casosUso: "Secuencias de 4 correos, tono ejecutivo" },
  { id: "gpt-5-mini", modelo: "GPT-5 Mini", costo: 0.006, tiempoMs: 900, calidad: 88, tokens: 1200, casosUso: "Drafts masivos y subject lines" },
  { id: "gpt-4.1", modelo: "GPT-4.1", costo: 0.014, tiempoMs: 1500, calidad: 91, tokens: 1600, casosUso: "Personalización industria/cargo" },
  { id: "perplexity-sonar", modelo: "Perplexity Sonar", costo: 0.012, tiempoMs: 2100, calidad: 94, tokens: 2100, casosUso: "Insights de empresa y señales de compra" },
];

export const TEAMS: TeamRow[] = [
  { id: "t1", nombre: "Ventas", usuarios: 18, ultimoAcceso: new Date(Date.now() - 1200_000).toISOString(), estado: "Activo" },
  { id: "t2", nombre: "Marketing", usuarios: 7, ultimoAcceso: new Date(Date.now() - 5400_000).toISOString(), estado: "Activo" },
  { id: "t3", nombre: "Operaciones", usuarios: 5, ultimoAcceso: new Date(Date.now() - 3600_000).toISOString(), estado: "Activo" },
  { id: "t4", nombre: "Administración", usuarios: 3, ultimoAcceso: new Date(Date.now() - 86400_000).toISOString(), estado: "Activo" },
];

export const ROLES: RoleRow[] = [
  { id: "r1", rol: "Administrador", descripcion: "Control total de configuración, usuarios y conectores CRM.", permisos: ["Gestionar usuarios", "CRM", "IA", "Billing"] },
  { id: "r2", rol: "Gerente Comercial", descripcion: "Visión ejecutiva, aprobación de campañas y reportería.", permisos: ["Dashboard", "Aprobar campañas", "Analítica", "Impacto"] },
  { id: "r3", rol: "Ejecutivo Comercial", descripcion: "Operación diaria de prospección y seguimiento.", permisos: ["Prospección", "Correos", "Campañas", "CRM"] },
  { id: "r4", rol: "Analista", descripcion: "Análisis de funnel, costos y performance.", permisos: ["Analítica", "Logs", "Consumo", "Exportar"] },
];

export const NOTIFICATIONS: NotificationItem[] = [
  { id: "n1", title: "Campaña aprobada", description: "Diego Pérez / Latam Airlines lista para Instantly.", time: "Hace 12 min", read: false, href: "/operaciones/aprobacion" },
  { id: "n2", title: "Lead enriquecido", description: "María González (Falabella) con insights Perplexity.", time: "Hace 28 min", read: false, href: "/enriquecimiento" },
  { id: "n3", title: "Sincronización CRM completada", description: "2 contactos y 1 oportunidad en HubSpot.", time: "Hace 1 h", read: false, href: "/operaciones/crm" },
  { id: "n4", title: "Solicitud CRM registrada", description: "Salesforce en evaluación desde el módulo CRM.", time: "Hace 2 h", read: true, href: "/crm" },
  { id: "n5", title: "Respuesta positiva recibida", description: "María González solicita reunión.", time: "Hace 3 h", read: true, href: "/operaciones/respuestas" },
];

export const SEARCH_INDEX: SearchResult[] = [
  { id: "s1", type: "Lead", title: "María González", subtitle: "Falabella · Gerente Comercial", href: "/enriquecimiento" },
  { id: "s2", type: "Lead", title: "Carlos Muñoz", subtitle: "Banco Estado · Director de Ventas", href: "/correos" },
  { id: "s3", type: "Campaña", title: "Outbound Banca Q3", subtitle: "Activa · Open Rate 52%", href: "/instantly" },
  { id: "s4", type: "Campaña", title: "Retail Decision Makers", subtitle: "Activa · 36 leads", href: "/campanas" },
  { id: "s5", type: "Empresa", title: "Falabella", subtitle: "Retail · URL detectada", href: "/operaciones/url-empresa" },
  { id: "s6", type: "Empresa", title: "Codelco", subtitle: "Minería · URL pendiente", href: "/operaciones/url-empresa" },
  { id: "s7", type: "CRM", title: "HubSpot", subtitle: "Conectado", href: "/crm" },
  { id: "s8", type: "CRM", title: "Salesforce", subtitle: "Desconectado", href: "/crm" },
];

export const USE_CASES: UseCaseCard[] = [
  {
    id: "uc1",
    titulo: "Captación Empresas Logística",
    descripcion: "Outbound a gerencias de operaciones y commercial directors en logística LatAm.",
    leads: 180,
    correos: 126,
    campanas: 22,
    resultados: ["14 reuniones", "9 oportunidades", "Pipeline USD 420K"],
  },
  {
    id: "uc2",
    titulo: "Captación Empresas Retail",
    descripcion: "Prospección de retailers omnicanal con validación NeverBounce y copy GPT-5.",
    leads: 240,
    correos: 168,
    campanas: 31,
    resultados: ["21 reuniones", "12 oportunidades", "Pipeline USD 610K"],
  },
  {
    id: "uc3",
    titulo: "Captación Empresas Tecnología",
    descripcion: "C-Level y Heads of Growth en SaaS y servicios TI.",
    leads: 150,
    correos: 112,
    campanas: 18,
    resultados: ["11 reuniones", "7 oportunidades", "Pipeline USD 380K"],
  },
  {
    id: "uc4",
    titulo: "Expansión Comercial Regional",
    descripcion: "Campaña multi-país Chile–Perú–Colombia con scoring por prioridad.",
    leads: 320,
    correos: 224,
    campanas: 40,
    resultados: ["28 reuniones", "16 oportunidades", "Pipeline USD 890K"],
  },
];

export const COMMERCIAL_IMPACT: CommercialImpact = {
  leadsMensuales: 1000,
  correosValidados: 550,
  reunionesPotenciales: 48,
  oportunidadesPotenciales: 35,
  pipelineEstimado: 1_240_000,
  roiPotencial: 8.4,
  costoPorLead: 0.041,
  costoPorReunion: 18.5,
};

export const TOUR_STEPS: TourStep[] = [
  { id: "t1", route: "/dashboard", title: "Dashboard ejecutivo", description: "KPIs, funnel y scorecard para reuniones gerenciales." },
  { id: "t2", route: "/prospection", title: "Prospección", description: "Configure actores Apify y genere leads LinkedIn." },
  { id: "t3", route: "/operaciones", title: "Pipeline operacional", description: "Mission Control: vea cada servicio del flujo en tiempo real." },
  { id: "t4", route: "/campanas", title: "Campañas", description: "Secuencias de 4 correos con aprobación humana." },
  { id: "t5", route: "/analitica", title: "Reportería", description: "Analítica avanzada del performance comercial." },
  { id: "t6", route: "/crm", title: "CRM", description: "Integraciones con HubSpot, Salesforce y más." },
  { id: "t7", route: "/casos-uso", title: "Casos de uso", description: "Escenarios comerciales listos para demostrar valor." },
];

import type {
  AiBenchmark,
  AiModelRow,
  CommercialImpact,
  IntegrationCard,
  IntegrationRequest,
  NotificationItem,
  RoleRow,
  SearchResult,
  TeamRow,
  TourStep,
  UseCaseCard,
} from "./enterprise-types";

export const INTEGRATIONS: IntegrationCard[] = [
  { id: "hubspot", name: "HubSpot", category: "CRM", description: "Sincronice contactos, deals y actividades con HubSpot CRM.", status: "disponible", initials: "HS" },
  { id: "salesforce", name: "Salesforce", category: "CRM", description: "Push de leads enriquecidos a Salesforce Lightning.", status: "solicitar", initials: "SF" },
  { id: "dynamics", name: "Microsoft Dynamics", category: "CRM", description: "Integración nativa con Dynamics 365 Sales.", status: "proximamente", initials: "MD" },
  { id: "monday", name: "Monday CRM", category: "CRM", description: "Boards y pipelines sincronizados con Monday.", status: "solicitar", initials: "MO" },
  { id: "pipedrive", name: "Pipedrive", category: "CRM", description: "Empuje leads calificados a su pipeline Pipedrive.", status: "solicitar", initials: "PD" },
  { id: "zoho", name: "Zoho CRM", category: "CRM", description: "Sincronización bidireccional con Zoho CRM.", status: "proximamente", initials: "ZO" },
  { id: "marketo", name: "Adobe Marketo", category: "Marketing", description: "Nutrición de leads y campañas inbound.", status: "proximamente", initials: "MK" },
  { id: "mailchimp", name: "Mailchimp", category: "Marketing", description: "Listas y automatizaciones de email marketing.", status: "solicitar", initials: "MC" },
  { id: "apify", name: "Apify", category: "Prospección", description: "Actors de scraping LinkedIn y fuentes B2B.", status: "disponible", initials: "AP" },
  { id: "clay", name: "Clay", category: "Prospección", description: "Orquestación de datos GTM a escala.", status: "proximamente", initials: "CL" },
  { id: "clearbit", name: "Clearbit", category: "Enriquecimiento", description: "Firmográficos y technographics en tiempo real.", status: "proximamente", initials: "CB" },
  { id: "apollo", name: "Apollo.io", category: "Enriquecimiento", description: "Base B2B e intent signals.", status: "solicitar", initials: "AO" },
  { id: "neverbounce", name: "NeverBounce", category: "Email", description: "Validación enterprise de correos.", status: "disponible", initials: "NB" },
  { id: "instantly", name: "Instantly.ai", category: "Email", description: "Cold email a escala con warmup.", status: "disponible", initials: "IN" },
  { id: "anymail", name: "AnymailFinder", category: "Email", description: "Descubrimiento de emails corporativos.", status: "disponible", initials: "AM" },
  { id: "openai", name: "OpenAI", category: "IA", description: "Generación de copy e insights con GPT.", status: "disponible", initials: "OI" },
  { id: "perplexity", name: "Perplexity", category: "IA", description: "Research comercial con fuentes actualizadas.", status: "disponible", initials: "PX" },
  { id: "looker", name: "Looker", category: "Analytics", description: "Dashboards BI conectados al pipeline.", status: "proximamente", initials: "LK" },
  { id: "powerbi", name: "Power BI", category: "Analytics", description: "Reportería ejecutiva Microsoft.", status: "solicitar", initials: "PB" },
  { id: "slack", name: "Slack", category: "Comunicación", description: "Alertas de campañas y respuestas en canales.", status: "disponible", initials: "SL" },
  { id: "teams", name: "Microsoft Teams", category: "Comunicación", description: "Notificaciones operacionales en Teams.", status: "proximamente", initials: "MT" },
];

export const INTEGRATION_REQUESTS: IntegrationRequest[] = [
  { id: "REQ-014", solicitud: "Salesforce Connector", fecha: new Date(Date.now() - 86400_000 * 2).toISOString(), solicitante: "Gerente Comercial", estado: "En Evaluación", prioridad: "Alta" },
  { id: "REQ-013", solicitud: "Microsoft Dynamics", fecha: new Date(Date.now() - 86400_000 * 5).toISOString(), solicitante: "Operaciones", estado: "Aprobada", prioridad: "Alta" },
  { id: "REQ-012", solicitud: "Power BI Export", fecha: new Date(Date.now() - 86400_000 * 8).toISOString(), solicitante: "Analista", estado: "En Desarrollo", prioridad: "Media" },
  { id: "REQ-011", solicitud: "Apollo.io Enrichment", fecha: new Date(Date.now() - 86400_000 * 12).toISOString(), solicitante: "Marketing", estado: "Nueva", prioridad: "Media" },
  { id: "REQ-010", solicitud: "Slack Alerts", fecha: new Date(Date.now() - 86400_000 * 20).toISOString(), solicitante: "Administrador", estado: "Disponible", prioridad: "Baja" },
];

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
  { id: "r1", rol: "Administrador", descripcion: "Control total de configuración, usuarios e integraciones.", permisos: ["Gestionar usuarios", "Integraciones", "IA", "Billing"] },
  { id: "r2", rol: "Gerente Comercial", descripcion: "Visión ejecutiva, aprobación de campañas y reportería.", permisos: ["Dashboard", "Aprobar campañas", "Analítica", "Impacto"] },
  { id: "r3", rol: "Ejecutivo Comercial", descripcion: "Operación diaria de prospección y seguimiento.", permisos: ["Prospección", "Correos", "Campañas", "CRM"] },
  { id: "r4", rol: "Analista", descripcion: "Análisis de funnel, costos y performance.", permisos: ["Analítica", "Logs", "Consumo", "Exportar"] },
];

export const NOTIFICATIONS: NotificationItem[] = [
  { id: "n1", title: "Campaña aprobada", description: "Diego Pérez / Latam Airlines lista para Instantly.", time: "Hace 12 min", read: false, href: "/operaciones/aprobacion" },
  { id: "n2", title: "Lead enriquecido", description: "María González (Falabella) con insights Perplexity.", time: "Hace 28 min", read: false, href: "/enriquecimiento" },
  { id: "n3", title: "Sincronización CRM completada", description: "2 contactos y 1 oportunidad en HubSpot.", time: "Hace 1 h", read: false, href: "/operaciones/crm" },
  { id: "n4", title: "Solicitud de integración creada", description: "Salesforce Connector en evaluación.", time: "Hace 2 h", read: true, href: "/integraciones" },
  { id: "n5", title: "Respuesta positiva recibida", description: "María González solicita reunión.", time: "Hace 3 h", read: true, href: "/operaciones/respuestas" },
];

export const SEARCH_INDEX: SearchResult[] = [
  { id: "s1", type: "Lead", title: "María González", subtitle: "Falabella · Gerente Comercial", href: "/enriquecimiento" },
  { id: "s2", type: "Lead", title: "Carlos Muñoz", subtitle: "Banco Estado · Director de Ventas", href: "/correos" },
  { id: "s3", type: "Campaña", title: "Outbound Banca Q3", subtitle: "Activa · Open Rate 52%", href: "/instantly" },
  { id: "s4", type: "Campaña", title: "Retail Decision Makers", subtitle: "Activa · 36 leads", href: "/campanas" },
  { id: "s5", type: "Empresa", title: "Falabella", subtitle: "Retail · URL detectada", href: "/operaciones/url-empresa" },
  { id: "s6", type: "Empresa", title: "Codelco", subtitle: "Minería · URL pendiente", href: "/operaciones/url-empresa" },
  { id: "s7", type: "Integración", title: "HubSpot", subtitle: "CRM · Disponible", href: "/integraciones" },
  { id: "s8", type: "Integración", title: "NeverBounce", subtitle: "Email · Disponible", href: "/integraciones" },
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
  { id: "t7", route: "/integraciones", title: "Marketplace", description: "Escale conectando su ecosistema tecnológico." },
];

export const INTEGRATION_CATEGORIES = [
  "Todas",
  "CRM",
  "Marketing",
  "Prospección",
  "Enriquecimiento",
  "Email",
  "IA",
  "Analytics",
  "Comunicación",
] as const;

import type {
  AnymailRow,
  ApprovalItem,
  CampaignGenDemo,
  CostRow,
  CrmSyncRow,
  EnrichmentDemo,
  InstantlyQueueItem,
  NeverBounceRow,
  OpsJob,
  PipelineStage,
  ReplyMonitorItem,
  ServiceCard,
  SystemLog,
  TraceableLead,
  UrlEmpresaRow,
} from "./ops-types";

export const PIPELINE_STAGES: PipelineStage[] = [
  { id: "apify", label: "Apify", provider: "Apify", status: "completada", records: 120, durationSec: 48, lastRun: new Date(Date.now() - 3600_000).toISOString(), href: "/operaciones/apify" },
  { id: "perplexity_url", label: "URL Empresa", provider: "Perplexity", status: "completada", records: 112, durationSec: 32, lastRun: new Date(Date.now() - 3400_000).toISOString(), href: "/operaciones/url-empresa" },
  { id: "anymailfinder", label: "AnymailFinder", provider: "AnymailFinder", status: "ejecutando", records: 78, durationSec: 21, lastRun: new Date(Date.now() - 600_000).toISOString(), href: "/operaciones/anymailfinder" },
  { id: "validation", label: "Validación Email", provider: "Motor interno", status: "pendiente", records: 0, durationSec: 0, href: "/operaciones/validacion" },
  { id: "neverbounce", label: "NeverBounce", provider: "NeverBounce", status: "pendiente", records: 0, durationSec: 0, href: "/operaciones/neverbounce" },
  { id: "perplexity", label: "Enriquecimiento", provider: "Perplexity", status: "pendiente", records: 0, durationSec: 0, href: "/operaciones/enriquecimiento" },
  { id: "openai", label: "Generación Campaña", provider: "OpenAI", status: "pendiente", records: 0, durationSec: 0, href: "/operaciones/campanas" },
  { id: "approval", label: "Aprobación Usuario", provider: "Humano", status: "pendiente", records: 7, durationSec: 0, lastRun: new Date(Date.now() - 7200_000).toISOString(), href: "/operaciones/aprobacion" },
  { id: "instantly", label: "Instantly", provider: "Instantly.ai", status: "pausada", records: 85, durationSec: 0, lastRun: new Date(Date.now() - 86400_000).toISOString(), href: "/operaciones/instantly" },
  { id: "hubspot", label: "CRM", provider: "HubSpot", status: "completada", records: 64, durationSec: 12, lastRun: new Date(Date.now() - 1800_000).toISOString(), href: "/operaciones/crm" },
];

export const INITIAL_JOBS: OpsJob[] = [
  { id: "JOB-1023", type: "busqueda_leads", typeLabel: "Búsqueda Leads", status: "completado", startedAt: new Date(Date.now() - 3900_000).toISOString(), durationSec: 48, recordsProcessed: 120, provider: "Apify" },
  { id: "JOB-1024", type: "url_empresa", typeLabel: "URL Empresa", status: "completado", startedAt: new Date(Date.now() - 3500_000).toISOString(), durationSec: 32, recordsProcessed: 112, provider: "Perplexity" },
  { id: "JOB-1025", type: "email_finder", typeLabel: "AnymailFinder", status: "ejecutando", startedAt: new Date(Date.now() - 620_000).toISOString(), durationSec: 21, recordsProcessed: 78, provider: "AnymailFinder" },
  { id: "JOB-1020", type: "campana", typeLabel: "Generación Campaña", status: "completado", startedAt: new Date(Date.now() - 9200_000).toISOString(), durationSec: 95, recordsProcessed: 25, provider: "OpenAI" },
  { id: "JOB-1018", type: "envio", typeLabel: "Envío Instantly", status: "pausado", startedAt: new Date(Date.now() - 86400_000).toISOString(), durationSec: 0, recordsProcessed: 85, provider: "Instantly" },
];

export const TRACEABLE_LEADS: TraceableLead[] = [
  {
    id: "TRL-001",
    nombre: "María González",
    empresa: "Falabella",
    email: "maria.gonzalez@falabella.com",
    cargo: "Gerente Comercial",
    steps: [
      { id: "s1", label: "Lead encontrado", status: "completada", timestamp: new Date(Date.now() - 8000_000).toISOString(), provider: "Apify", detail: "Actor LinkedIn People Search" },
      { id: "s2", label: "URL empresa identificada", status: "completada", timestamp: new Date(Date.now() - 7800_000).toISOString(), provider: "Perplexity", detail: "https://www.falabella.com" },
      { id: "s3", label: "Correo encontrado", status: "completada", timestamp: new Date(Date.now() - 7600_000).toISOString(), provider: "AnymailFinder", detail: "Confianza 92%" },
      { id: "s4", label: "Correo validado", status: "completada", timestamp: new Date(Date.now() - 7500_000).toISOString(), provider: "NeverBounce", detail: "Valid" },
      { id: "s5", label: "Enriquecido", status: "completada", timestamp: new Date(Date.now() - 7300_000).toISOString(), provider: "Perplexity" },
      { id: "s6", label: "Campaña generada", status: "completada", timestamp: new Date(Date.now() - 7100_000).toISOString(), provider: "OpenAI GPT-5" },
      { id: "s7", label: "Campaña aprobada", status: "completada", timestamp: new Date(Date.now() - 7000_000).toISOString(), provider: "Humano", detail: "Aprobado por GC Demo" },
      { id: "s8", label: "Enviado", status: "completada", timestamp: new Date(Date.now() - 6800_000).toISOString(), provider: "Instantly" },
      { id: "s9", label: "Respuesta recibida", status: "completada", timestamp: new Date(Date.now() - 2000_000).toISOString(), provider: "Instantly", detail: "Positiva — solicita reunión" },
    ],
  },
  {
    id: "TRL-002",
    nombre: "Carlos Muñoz",
    empresa: "Banco Estado",
    email: "carlos.munoz@bancoestado.cl",
    cargo: "Director de Ventas",
    steps: [
      { id: "s1", label: "Lead encontrado", status: "completada", timestamp: new Date(Date.now() - 5000_000).toISOString(), provider: "Apify" },
      { id: "s2", label: "URL empresa identificada", status: "completada", timestamp: new Date(Date.now() - 4800_000).toISOString(), provider: "Perplexity", detail: "https://www.bancoestado.cl" },
      { id: "s3", label: "Correo encontrado", status: "completada", timestamp: new Date(Date.now() - 4600_000).toISOString(), provider: "AnymailFinder", detail: "Confianza 78%" },
      { id: "s4", label: "Correo validado", status: "ejecutando", timestamp: new Date(Date.now() - 1000_000).toISOString(), provider: "NeverBounce", detail: "En cola — Catch-All" },
      { id: "s5", label: "Enriquecido", status: "pendiente", timestamp: "", provider: "Perplexity" },
      { id: "s6", label: "Campaña generada", status: "pendiente", timestamp: "", provider: "OpenAI" },
      { id: "s7", label: "Campaña aprobada", status: "pendiente", timestamp: "" },
      { id: "s8", label: "Enviado", status: "pendiente", timestamp: "" },
      { id: "s9", label: "Respuesta recibida", status: "pendiente", timestamp: "" },
    ],
  },
  {
    id: "TRL-003",
    nombre: "Ana Rojas",
    empresa: "Codelco",
    cargo: "VP de Marketing",
    steps: [
      { id: "s1", label: "Lead encontrado", status: "completada", timestamp: new Date(Date.now() - 3000_000).toISOString(), provider: "Apify" },
      { id: "s2", label: "URL empresa identificada", status: "error", timestamp: new Date(Date.now() - 2800_000).toISOString(), provider: "Perplexity", detail: "No fue posible encontrar URL corporativa" },
      { id: "s3", label: "Correo encontrado", status: "pendiente", timestamp: "" },
      { id: "s4", label: "Correo validado", status: "pendiente", timestamp: "" },
      { id: "s5", label: "Enriquecido", status: "pendiente", timestamp: "" },
      { id: "s6", label: "Campaña generada", status: "pendiente", timestamp: "" },
      { id: "s7", label: "Campaña aprobada", status: "pendiente", timestamp: "" },
      { id: "s8", label: "Enviado", status: "pendiente", timestamp: "" },
      { id: "s9", label: "Respuesta recibida", status: "pendiente", timestamp: "" },
    ],
  },
];

export const SERVICE_CARDS: ServiceCard[] = [
  { id: "apify", name: "Apify", status: "completada", lastRun: new Date(Date.now() - 3600_000).toISOString(), avgTimeSec: 52, recordsProcessed: 1240, successRate: 97.2, href: "/operaciones/apify" },
  { id: "anymailfinder", name: "AnymailFinder", status: "ejecutando", lastRun: new Date(Date.now() - 600_000).toISOString(), avgTimeSec: 18, recordsProcessed: 860, successRate: 71.4, href: "/operaciones/anymailfinder" },
  { id: "neverbounce", name: "NeverBounce", status: "pendiente", lastRun: new Date(Date.now() - 9200_000).toISOString(), avgTimeSec: 9, recordsProcessed: 720, successRate: 98.1, href: "/operaciones/neverbounce" },
  { id: "perplexity", name: "Perplexity", status: "completada", lastRun: new Date(Date.now() - 3400_000).toISOString(), avgTimeSec: 14, recordsProcessed: 980, successRate: 94.5, href: "/operaciones/enriquecimiento" },
  { id: "openai", name: "OpenAI", status: "pendiente", lastRun: new Date(Date.now() - 9100_000).toISOString(), avgTimeSec: 22, recordsProcessed: 310, successRate: 99.0, href: "/operaciones/campanas" },
  { id: "instantly", name: "Instantly", status: "pausada", lastRun: new Date(Date.now() - 86400_000).toISOString(), avgTimeSec: 0, recordsProcessed: 540, successRate: 96.8, href: "/operaciones/instantly" },
  { id: "hubspot", name: "HubSpot", status: "completada", lastRun: new Date(Date.now() - 1800_000).toISOString(), avgTimeSec: 6, recordsProcessed: 410, successRate: 99.4, href: "/operaciones/crm" },
];

export const URL_EMPRESA_ROWS: UrlEmpresaRow[] = [
  { id: "u1", empresa: "Falabella", linkedinEmpresa: "linkedin.com/company/falabella", urlDetectada: "https://www.falabella.com", status: "completada" },
  { id: "u2", empresa: "Banco Estado", linkedinEmpresa: "linkedin.com/company/bancoestado", urlDetectada: "https://www.bancoestado.cl", status: "completada" },
  { id: "u3", empresa: "Codelco", linkedinEmpresa: "linkedin.com/company/codelco", status: "error" },
  { id: "u4", empresa: "Latam Airlines", linkedinEmpresa: "linkedin.com/company/latam", urlDetectada: "https://www.latam.com", status: "completada" },
  { id: "u5", empresa: "Entel", linkedinEmpresa: "linkedin.com/company/entel", status: "ejecutando" },
  { id: "u6", empresa: "SQM", linkedinEmpresa: "linkedin.com/company/sqm", status: "pendiente" },
];

export const ANYMAIL_ROWS: AnymailRow[] = [
  { id: "am1", lead: "María González", empresa: "Falabella", dominio: "falabella.com", email: "maria.gonzalez@falabella.com", confianza: 92, status: "completada" },
  { id: "am2", lead: "Carlos Muñoz", empresa: "Banco Estado", dominio: "bancoestado.cl", email: "carlos.munoz@bancoestado.cl", confianza: 78, status: "completada" },
  { id: "am3", lead: "Diego Pérez", empresa: "Latam Airlines", dominio: "latam.com", email: "d.perez@latam.com", confianza: 61, status: "completada" },
  { id: "am4", lead: "Valentina Soto", empresa: "Entel", dominio: "entel.cl", confianza: 0, status: "ejecutando" },
  { id: "am5", lead: "Andrés Contreras", empresa: "BCI", dominio: "bci.cl", email: "a.contreras@bci.cl", confianza: 88, status: "completada" },
  { id: "am6", lead: "Camila Silva", empresa: "SQM", dominio: "sqm.com", confianza: 0, status: "error" },
];

export const NEVERBOUNCE_ROWS: NeverBounceRow[] = [
  { id: "nb1", email: "maria.gonzalez@falabella.com", resultado: "Valid", reason: "Mailbox exists", score: 98, estadoFinal: "Listo para usar" },
  { id: "nb2", email: "carlos.munoz@bancoestado.cl", resultado: "Catch-All", reason: "Domain accepts all", score: 62, estadoFinal: "Derivado a revisión" },
  { id: "nb3", email: "d.perez@latam.com", resultado: "Risky", reason: "Low trust signal", score: 44, estadoFinal: "Riesgoso" },
  { id: "nb4", email: "temp@mailinator.com", resultado: "Disposable", reason: "Disposable domain", score: 5, estadoFinal: "Rechazado" },
  { id: "nb5", email: "noexiste@empresa.cl", resultado: "Invalid", reason: "Mailbox not found", score: 2, estadoFinal: "Inválido" },
];

export const ENRICHMENT_DEMO: EnrichmentDemo = {
  lead: "María González",
  empresa: "Falabella",
  prompt: `Analiza Falabella como cuenta objetivo B2B para seguros comerciales Zurich.
Incluye: industria, ingresos estimados, stack tecnológico, noticias recientes,
dolores del equipo comercial y oportunidades de lead intelligence.`,
  resultado: {
    empresa: "Falabella",
    industria: "Retail / Omnicanal LatAm",
    ingresos: "USD 12–15B (estimado grupo)",
    tecnologias: ["Salesforce", "AWS", "Snowflake", "Segment"],
    noticias: [
      "Expansión de marketplace en Perú y Colombia",
      "Inversión en logística de última milla 2026",
    ],
    dolores: [
      "Prospección outbound fragmentada entre equipos regionales",
      "Baja visibilidad de validación de emails en campañas",
    ],
    oportunidades: [
      "Centralizar prospección + validación + Instantly",
      "Score de prioridad comercial por industria retail",
    ],
  },
};

export const CAMPAIGN_GEN_DEMO: CampaignGenDemo = {
  lead: "María González",
  empresa: "Falabella",
  contexto: "Gerente Comercial · Retail · Prioridad Alta · Email validado · Enriquecido",
  prompt: "Genera secuencia de 4 correos outbound personalizados en español, tono ejecutivo Zurich.",
  modelo: "GPT-5",
  tokens: 1840,
  costo: 0.022,
  emails: [
    { order: 1, subject: "{{nombre}}, oportunidad de potenciar el pipeline en {{empresa}}", body: "Hola {{nombre}},\n\nHe seguido el crecimiento de {{empresa}} en retail LatAm...\n\nSaludos,\n{{remitente}}" },
    { order: 2, subject: "Re: pipeline comercial en {{empresa}}", body: "Hola {{nombre}},\n\nEquipos similares recuperan 20–30% más oportunidades...\n\nSaludos,\n{{remitente}}" },
    { order: 3, subject: "Caso relevante para {{cargo}} en {{empresa}}", body: "Hola {{nombre}},\n\nComparto un caso breve de 12 campañas activas en 3 semanas...\n\nSaludos,\n{{remitente}}" },
    { order: 4, subject: "Último seguimiento — Zurich Lead Intelligence", body: "Hola {{nombre}},\n\nDejo abierta la puerta para evaluar la plataforma este trimestre...\n\nSaludos,\n{{remitente}}" },
  ],
};

export const APPROVAL_ITEMS: ApprovalItem[] = [
  {
    id: "APR-01",
    lead: "María González",
    empresa: "Falabella",
    estado: "pendiente",
    fecha: new Date(Date.now() - 3600_000).toISOString(),
    usuario: "Sistema · GPT-5",
    emails: CAMPAIGN_GEN_DEMO.emails,
  },
  {
    id: "APR-02",
    lead: "Andrés Contreras",
    empresa: "BCI",
    estado: "pendiente",
    fecha: new Date(Date.now() - 7200_000).toISOString(),
    usuario: "Sistema · GPT-5",
    emails: CAMPAIGN_GEN_DEMO.emails.map((e) => ({ ...e, subject: e.subject.replace("Falabella", "BCI") })),
  },
  {
    id: "APR-03",
    lead: "Diego Pérez",
    empresa: "Latam Airlines",
    estado: "aprobada",
    fecha: new Date(Date.now() - 86400_000).toISOString(),
    usuario: "GC Demo",
    emails: CAMPAIGN_GEN_DEMO.emails,
  },
];

export const INSTANTLY_QUEUE: InstantlyQueueItem[] = [
  { id: "IQ-01", campana: "Outbound Banca Q3", leads: 48, status: "activo" },
  { id: "IQ-02", campana: "Retail Decision Makers", leads: 36, status: "enviado" },
  { id: "IQ-03", campana: "C-Level Outreach", leads: 12, status: "listo" },
  { id: "IQ-04", campana: "Minería LatAm", leads: 22, status: "pendiente" },
  { id: "IQ-05", campana: "Telecom Growth", leads: 18, status: "pausado" },
  { id: "IQ-06", campana: "Consultoría Q2", leads: 15, status: "finalizado" },
];

export const REPLY_MONITOR: ReplyMonitorItem[] = [
  { id: "r1", lead: "María González", empresa: "Falabella", clasificacion: "Solicita Reunión", preview: "Me interesa, ¿podemos agendar 15 min el jueves?", fecha: new Date(Date.now() - 2000_000).toISOString() },
  { id: "r2", lead: "Valentina Soto", empresa: "Entel", clasificacion: "Interesado", preview: "Envíenme más detalle del caso retail.", fecha: new Date(Date.now() - 4000_000).toISOString() },
  { id: "r3", lead: "Sebastián Martínez", empresa: "Ripley", clasificacion: "Fuera de Oficina", preview: "Estoy fuera hasta el 5 de septiembre.", fecha: new Date(Date.now() - 5000_000).toISOString() },
  { id: "r4", lead: "Patricio Vargas", empresa: "Copec", clasificacion: "Negativa", preview: "No es prioridad este trimestre.", fecha: new Date(Date.now() - 6000_000).toISOString() },
  { id: "r5", lead: "Lorena Tapia", empresa: "Sonda", clasificacion: "No es el contacto correcto", preview: "Favor contactar a mi colega de partnerships.", fecha: new Date(Date.now() - 7000_000).toISOString() },
  { id: "r6", lead: "unknown@olddomain.cl", empresa: "—", clasificacion: "Rebote", preview: "550 mailbox unavailable", fecha: new Date(Date.now() - 8000_000).toISOString() },
  { id: "r7", lead: "Francisca Sepúlveda", empresa: "CMPC", clasificacion: "Positiva", preview: "Buena propuesta, sigamos conversando.", fecha: new Date(Date.now() - 9000_000).toISOString() },
];

export const CRM_SYNC_ROWS: CrmSyncRow[] = [
  { id: "c1", lead: "María González", contacto: "Contacto creado", empresa: "Empresa vinculada", oportunidad: "Opp · Lead Intelligence Retail", status: "completada" },
  { id: "c2", lead: "Diego Pérez", contacto: "Contacto creado", empresa: "Empresa vinculada", oportunidad: "Opp · Aviación Q3", status: "completada" },
  { id: "c3", lead: "Andrés Contreras", contacto: "Pendiente sync", empresa: "Empresa existente", status: "ejecutando" },
  { id: "c4", lead: "Camila Silva", contacto: "Error de mapping", empresa: "—", status: "error" },
];

export const COST_ROWS: CostRow[] = [
  { provider: "Apify", queries: 42, unitCost: 0.35, totalCost: 14.7 },
  { provider: "AnymailFinder", queries: 700, unitCost: 0.008, totalCost: 5.6 },
  { provider: "NeverBounce", queries: 550, unitCost: 0.006, totalCost: 3.3 },
  { provider: "Perplexity", queries: 520, unitCost: 0.012, totalCost: 6.24 },
  { provider: "OpenAI", queries: 250, unitCost: 0.022, totalCost: 5.5 },
  { provider: "Instantly", queries: 140, unitCost: 0.04, totalCost: 5.6 },
];

export const INITIAL_LOGS: SystemLog[] = [
  { id: "l1", timestamp: new Date(Date.now() - 120_000).toISOString(), severity: "INFO", provider: "AnymailFinder", message: "Lead procesado correctamente — Valentina Soto" },
  { id: "l2", timestamp: new Date(Date.now() - 300_000).toISOString(), severity: "WARNING", provider: "NeverBounce", message: "Email marcado como riesgoso — d.perez@latam.com" },
  { id: "l3", timestamp: new Date(Date.now() - 900_000).toISOString(), severity: "SUCCESS", provider: "Aprobación", message: "Campaña aprobada — Diego Pérez / Latam Airlines" },
  { id: "l4", timestamp: new Date(Date.now() - 2800_000).toISOString(), severity: "ERROR", provider: "Perplexity", message: "No fue posible encontrar URL corporativa — Codelco" },
  { id: "l5", timestamp: new Date(Date.now() - 3600_000).toISOString(), severity: "SUCCESS", provider: "Apify", message: "Actor finalizado — 120 leads generados" },
  { id: "l6", timestamp: new Date(Date.now() - 3700_000).toISOString(), severity: "INFO", provider: "Apify", message: "Iniciando actor LinkedIn People Search" },
  { id: "l7", timestamp: new Date(Date.now() - 1800_000).toISOString(), severity: "SUCCESS", provider: "HubSpot", message: "Sincronización completada — 2 contactos, 1 oportunidad" },
  { id: "l8", timestamp: new Date(Date.now() - 500_000).toISOString(), severity: "INFO", provider: "OpenAI", message: "Secuencia generada — 4 correos · 1840 tokens" },
];

export const OPS_NAV = [
  { href: "/operaciones", label: "Mission Control", exact: true },
  { href: "/operaciones/apify", label: "Apify" },
  { href: "/operaciones/url-empresa", label: "URL Empresa" },
  { href: "/operaciones/anymailfinder", label: "AnymailFinder" },
  { href: "/operaciones/validacion", label: "Validación" },
  { href: "/operaciones/neverbounce", label: "NeverBounce" },
  { href: "/operaciones/enriquecimiento", label: "Enriquecimiento" },
  { href: "/operaciones/campanas", label: "Campañas AI" },
  { href: "/operaciones/aprobacion", label: "Aprobación" },
  { href: "/operaciones/instantly", label: "Instantly" },
  { href: "/operaciones/respuestas", label: "Respuestas" },
  { href: "/operaciones/crm", label: "CRM Sync" },
  { href: "/operaciones/consumo", label: "Consumo" },
  { href: "/operaciones/logs", label: "Logs" },
];

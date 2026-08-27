import type {
  CampaignRankingRow,
  CrmSyncStats,
  DateRangeFilter,
  DrilldownRow,
  ExecutiveScorecard,
  FunnelStage,
  GlobalFilters,
  HealthMetric,
  OpsAlert,
  ReplyCategory,
  SparkKpi,
  TimelineEvent,
} from "./analytics-types";

/** Baseline ejecutivo coherente (escala demo) */
export const BASELINE = {
  leads: 1000,
  urlEmpresa: 920,
  correosEncontrados: 700,
  correosValidados: 550,
  leadsEnriquecidos: 420,
  campanasGeneradas: 250,
  campanasAprobadas: 180,
  enviadosInstantly: 140,
  respuestasRecibidas: 72,
  campanasActivas: 85,
  respuestasPositivas: 35,
  respuestasNegativas: 18,
  rebotes: 22,
  fueraOficina: 14,
} as const;

const RANGE_FACTOR: Record<DateRangeFilter, number> = {
  "7d": 0.22,
  "30d": 0.55,
  "90d": 0.85,
  all: 1,
};

export const DEFAULT_FILTERS: GlobalFilters = {
  dateRange: "30d",
  industria: "todas",
  pais: "todos",
  empresa: "todas",
  estado: "todos",
  proveedorIa: "todos",
  campana: "todas",
};

export const FILTER_OPTIONS = {
  industrias: ["todas", "Banca", "Retail", "Minería", "Tecnología", "Salud", "Energía", "Telecomunicaciones"],
  paises: ["todos", "Chile", "Perú", "Colombia", "México", "Argentina", "España"],
  empresas: ["todas", "Falabella", "Banco Estado", "Codelco", "Latam Airlines", "Entel", "BCI", "SQM"],
  estados: ["todos", "activo", "pendiente", "completado", "en_riesgo"],
  proveedoresIa: ["todos", "GPT-5", "GPT-5 Mini", "GPT-4.1", "Perplexity Sonar"],
  campanas: ["todas", "Outbound Banca Q3", "Retail Decision Makers", "Minería & Energía LatAm", "Telecom Growth Wave", "C-Level Outreach"],
};

function clamp(n: number, min = 0) {
  return Math.max(min, Math.round(n));
}

function filterFactor(filters: GlobalFilters): number {
  let f = RANGE_FACTOR[filters.dateRange];
  if (filters.industria !== "todas") f *= 0.18;
  if (filters.pais !== "todos") f *= 0.28;
  if (filters.empresa !== "todas") f *= 0.12;
  if (filters.estado !== "todos") f *= 0.65;
  if (filters.proveedorIa !== "todos") f *= 0.9;
  if (filters.campana !== "todas") f *= 0.15;
  return f;
}

function spark(seed: number, points = 12, trend = 1): number[] {
  const out: number[] = [];
  let v = 40 + (seed % 20);
  for (let i = 0; i < points; i++) {
    v += ((seed * (i + 3)) % 7) - 3 + trend * 0.8;
    out.push(Math.max(8, Math.round(v)));
  }
  return out;
}

export function getExecutiveKpis(filters: GlobalFilters): SparkKpi[] {
  const f = filterFactor(filters);
  const b = BASELINE;
  return [
    { id: "leads", label: "Leads encontrados", value: clamp(b.leads * f), delta: 12.4, sparkline: spark(1, 12, 1.2) },
    { id: "emails", label: "Correos encontrados", value: clamp(b.correosEncontrados * f), delta: 8.1, sparkline: spark(2, 12, 1) },
    { id: "validated", label: "Correos validados", value: clamp(b.correosValidados * f), delta: 6.7, sparkline: spark(3, 12, 0.9) },
    { id: "enriched", label: "Leads enriquecidos", value: clamp(b.leadsEnriquecidos * f), delta: 9.3, sparkline: spark(4, 12, 1.1) },
    { id: "campaigns", label: "Campañas generadas", value: clamp(b.campanasGeneradas * f), delta: 4.2, sparkline: spark(5, 12, 0.7) },
    { id: "active", label: "Campañas activas", value: clamp(b.campanasActivas * f), delta: 11.5, sparkline: spark(6, 12, 1.3) },
    { id: "positive", label: "Respuestas positivas", value: clamp(b.respuestasPositivas * f), delta: 15.8, sparkline: spark(7, 12, 1.4) },
    { id: "negative", label: "Respuestas negativas", value: clamp(b.respuestasNegativas * f), delta: -3.2, sparkline: spark(8, 12, -0.4) },
    { id: "bounces", label: "Rebotes", value: clamp(b.rebotes * f), delta: -5.6, sparkline: spark(9, 12, -0.6) },
    { id: "ooo", label: "Fuera de oficina", value: clamp(b.fueraOficina * f), delta: 1.4, sparkline: spark(10, 12, 0.2) },
  ];
}

export function getOperationalFunnel(filters: GlobalFilters): FunnelStage[] {
  const f = filterFactor(filters);
  const stages = [
    { id: "leads", label: "Leads encontrados", value: BASELINE.leads, color: "#003366" },
    { id: "url", label: "URL empresa identificada", value: BASELINE.urlEmpresa, color: "#004d99" },
    { id: "email", label: "Correo encontrado", value: BASELINE.correosEncontrados, color: "#0066CC" },
    { id: "validated", label: "Correo validado", value: BASELINE.correosValidados, color: "#1a7adf" },
    { id: "enriched", label: "Lead enriquecido", value: BASELINE.leadsEnriquecidos, color: "#3d8fe6" },
    { id: "generated", label: "Campaña generada", value: BASELINE.campanasGeneradas, color: "#5aa3eb" },
    { id: "approved", label: "Campaña aprobada", value: BASELINE.campanasAprobadas, color: "#78b7f0" },
    { id: "instantly", label: "Enviado a Instantly", value: BASELINE.enviadosInstantly, color: "#96cbf5" },
    { id: "reply", label: "Respuesta recibida", value: BASELINE.respuestasRecibidas, color: "#4da3ff" },
  ];

  return stages.map((s, i) => {
    const value = clamp(s.value * f);
    const prev = i === 0 ? value : clamp(stages[i - 1].value * f);
    const conversionFromPrev = prev === 0 ? 100 : Math.round((value / prev) * 1000) / 10;
    const dropOff = Math.round((100 - conversionFromPrev) * 10) / 10;
    return { ...s, value, conversionFromPrev: i === 0 ? 100 : conversionFromPrev, dropOff: i === 0 ? 0 : dropOff };
  });
}

export function getHealthMetrics(filters: GlobalFilters): HealthMetric[] {
  const funnel = getOperationalFunnel(filters);
  const byId = Object.fromEntries(funnel.map((s) => [s.id, s.value]));
  const discovery = Math.round((byId.email / byId.leads) * 1000) / 10;
  const validation = Math.round((byId.validated / byId.email) * 1000) / 10;
  const enrichment = Math.round((byId.enriched / byId.validated) * 1000) / 10;
  const generation = Math.round((byId.generated / byId.enriched) * 1000) / 10;
  const delivery = 96.4;
  const openRate = 47.8;
  const replyRate = 12.6;
  const bounceRate = 2.4;

  const level = (v: number, good: number, warn: number, inverse = false): HealthMetric["level"] => {
    if (inverse) {
      if (v <= good) return "verde";
      if (v <= warn) return "amarillo";
      return "rojo";
    }
    if (v >= good) return "verde";
    if (v >= warn) return "amarillo";
    return "rojo";
  };

  return [
    { id: "discovery", label: "Tasa de descubrimiento de correos", value: discovery, target: 70, level: level(discovery, 68, 55), description: "Correos encontrados / leads" },
    { id: "validation", label: "Tasa de validación", value: validation, target: 78, level: level(validation, 75, 60), description: "Correos validados / encontrados" },
    { id: "enrichment", label: "Tasa de enriquecimiento", value: enrichment, target: 75, level: level(enrichment, 72, 55), description: "Leads enriquecidos / validados" },
    { id: "generation", label: "Tasa de generación de campañas", value: generation, target: 60, level: level(generation, 55, 40), description: "Campañas / leads enriquecidos" },
    { id: "delivery", label: "Tasa de entrega", value: delivery, target: 95, level: level(delivery, 95, 90), description: "Emails entregados / enviados" },
    { id: "open", label: "Open Rate", value: openRate, target: 40, level: level(openRate, 40, 30), description: "Aperturas únicas promedio" },
    { id: "reply", label: "Reply Rate", value: replyRate, target: 10, level: level(replyRate, 10, 6), description: "Respuestas / entregados" },
    { id: "bounce", label: "Bounce Rate", value: bounceRate, target: 3, level: level(bounceRate, 3, 5, true), description: "Rebotes / enviados" },
  ];
}

export function getTimelineEvents(): TimelineEvent[] {
  return [
    { id: "t1", time: "11:42", type: "enriquecimiento", title: "Lead enriquecido", lead: "María González", empresa: "Falabella", estado: "Completado" },
    { id: "t2", time: "11:28", type: "email", title: "Correo validado (NeverBounce)", lead: "Carlos Muñoz", empresa: "Banco Estado", estado: "Validado" },
    { id: "t3", time: "11:05", type: "campana", title: "Campaña aprobada", lead: "Ana Rojas", empresa: "Codelco", estado: "Aprobada" },
    { id: "t4", time: "10:51", type: "envio", title: "Campaña enviada a Instantly", lead: "Diego Pérez", empresa: "Latam Airlines", estado: "Enviada" },
    { id: "t5", time: "10:33", type: "respuesta", title: "Respuesta positiva recibida", lead: "Valentina Soto", empresa: "Entel", estado: "Positiva" },
    { id: "t6", time: "10:12", type: "crm", title: "Lead sincronizado con HubSpot", lead: "Andrés Contreras", empresa: "BCI", estado: "Sincronizado" },
    { id: "t7", time: "09:48", type: "prospection", title: "Prospección Apify completada", lead: "—", empresa: "Retail LatAm", estado: "24 leads" },
    { id: "t8", time: "09:21", type: "respuesta", title: "Fuera de oficina detectado", lead: "Camila Silva", empresa: "SQM", estado: "OOO" },
    { id: "t9", time: "08:57", type: "email", title: "Correo marcado como riesgoso", lead: "Sebastián Martínez", empresa: "Ripley", estado: "Riesgoso" },
    { id: "t10", time: "08:30", type: "campana", title: "Secuencia generada con GPT-5", lead: "Francisca Sepúlveda", empresa: "CMPC", estado: "Borrador" },
  ];
}

export function getOpsAlerts(filters: GlobalFilters): OpsAlert[] {
  const f = filterFactor(filters);
  return [
    { id: "a1", severity: "alta", title: "Correos requieren validación NeverBounce", description: "Pendientes en cola de validación enterprise.", count: clamp(15 * Math.max(f, 0.4)), actionLabel: "Revisar correos" },
    { id: "a2", severity: "media", title: "Campañas esperan aprobación", description: "Secuencias listas sin firma comercial.", count: clamp(7 * Math.max(f, 0.4)), actionLabel: "Ir a campañas" },
    { id: "a3", severity: "alta", title: "Leads sin URL corporativa", description: "Bloquean el descubrimiento de email.", count: clamp(12 * Math.max(f, 0.4)), actionLabel: "Ver leads" },
    { id: "a4", severity: "critica", title: "Campañas con alto bounce rate", description: "Supera el umbral del 5% — revisar dominios.", count: clamp(3 * Math.max(f, 0.5)), actionLabel: "Ver Instantly" },
    { id: "a5", severity: "info", title: "Respuestas sin clasificar", description: "Clasificación automática pendiente de revisión.", count: clamp(9 * Math.max(f, 0.4)), actionLabel: "Clasificar" },
  ];
}

export function getScorecard(filters: GlobalFilters): ExecutiveScorecard {
  const f = filterFactor(filters);
  const leads = clamp(BASELINE.leads * f);
  const activos = clamp(BASELINE.campanasActivas * f);
  const conversion = Math.round((BASELINE.respuestasRecibidas / BASELINE.leads) * 1000) / 10;
  const reply = Math.round((BASELINE.respuestasPositivas / BASELINE.enviadosInstantly) * 1000) / 10;
  const oportunidades = clamp(BASELINE.respuestasPositivas * f * 1.4);
  const ticket = 18500;
  return {
    leadsTotales: leads,
    pipelineActivo: clamp(BASELINE.leadsEnriquecidos * f),
    conversionGlobal: conversion,
    tasaRespuesta: reply,
    campanasActivas: activos,
    oportunidadesPotenciales: oportunidades,
    ingresosEstimados: oportunidades * ticket,
    valorPotencialPipeline: clamp(BASELINE.leadsEnriquecidos * f) * ticket * 0.35,
  };
}

export function getDrilldownRows(kpiId: string, filters: GlobalFilters): DrilldownRow[] {
  const f = filterFactor(filters);
  const count = Math.min(40, Math.max(8, clamp(28 * f)));
  const industries = FILTER_OPTIONS.industrias.filter((i) => i !== "todas");
  const countries = FILTER_OPTIONS.paises.filter((p) => p !== "todos");
  const companies = FILTER_OPTIONS.empresas.filter((e) => e !== "todas");
  const names = ["María González", "Carlos Muñoz", "Ana Rojas", "Diego Pérez", "Valentina Soto", "Andrés Contreras", "Camila Silva", "Sebastián Martínez", "Francisca Sepúlveda", "Matías Morales"];
  const roles = ["Gerente Comercial", "Director de Ventas", "VP Marketing", "CRO", "Head of Growth", "BDM"];
  const estados: Record<string, string[]> = {
    leads: ["Completado", "En proceso", "Pendiente"],
    emails: ["Encontrado", "Buscando", "Listo"],
    validated: ["Validado", "NeverBounce", "Listo para usar"],
    enriched: ["Enriquecido", "Prioridad alta", "Prioridad media"],
    campaigns: ["Borrador", "Guardado", "Aprobado"],
    active: ["Activa", "Programada", "Pausada"],
    positive: ["Positiva", "Interesado", "Reagendar"],
    negative: ["Negativa", "No interesado"],
    bounces: ["Hard bounce", "Soft bounce"],
    ooo: ["Fuera de oficina"],
    url: ["URL encontrada", "URL parcial"],
    email: ["Encontrado", "Validado"],
    generated: ["Generada"],
    approved: ["Aprobada"],
    instantly: ["Enviada", "Activa"],
    reply: ["Positiva", "Negativa", "OOO"],
  };
  const pool = estados[kpiId] ?? ["Activo"];

  return Array.from({ length: count }).map((_, i) => ({
    id: `${kpiId}-${i + 1}`,
    nombre: names[i % names.length],
    empresa: companies[i % companies.length],
    industria: industries[i % industries.length],
    pais: countries[i % countries.length],
    cargo: roles[i % roles.length],
    estado: pool[i % pool.length],
    valor: kpiId.includes("email") || kpiId === "validated" ? `contacto${i + 1}@empresa.cl` : undefined,
    fecha: new Date(Date.now() - i * 3600_000 * 5).toISOString(),
  }));
}

export function getPipelineHistory(range: DateRangeFilter) {
  const days = range === "7d" ? 7 : range === "90d" ? 12 : 10;
  const labels = range === "7d"
    ? ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"]
    : range === "90d"
      ? ["Sem 1", "Sem 2", "Sem 3", "Sem 4", "Sem 5", "Sem 6", "Sem 7", "Sem 8", "Sem 9", "Sem 10", "Sem 11", "Sem 12"]
      : ["S1", "S2", "S3", "S4", "S5", "S6", "S7", "S8", "S9", "S10"];

  return labels.slice(0, days).map((label, i) => ({
    periodo: label,
    leads: 60 + i * 8 + (i % 3) * 12,
    correos: 40 + i * 6 + (i % 2) * 8,
    validados: 30 + i * 5,
    enriquecidos: 22 + i * 4,
    campanas: 12 + i * 2,
    respuestas: 3 + Math.floor(i * 1.2),
  }));
}

export function getLeadsBreakdown(filters: GlobalFilters) {
  const f = filterFactor(filters);
  const scale = (n: number) => clamp(n * f);
  return {
    porIndustria: [
      { name: "Banca", value: scale(210) },
      { name: "Retail", value: scale(180) },
      { name: "Minería", value: scale(140) },
      { name: "Tecnología", value: scale(130) },
      { name: "Telecomunicaciones", value: scale(110) },
      { name: "Salud", value: scale(90) },
      { name: "Energía", value: scale(80) },
      { name: "Otros", value: scale(60) },
    ],
    porPais: [
      { name: "Chile", value: scale(420) },
      { name: "Perú", value: scale(160) },
      { name: "Colombia", value: scale(140) },
      { name: "México", value: scale(130) },
      { name: "Argentina", value: scale(90) },
      { name: "España", value: scale(60) },
    ],
    porCargo: [
      { name: "Gerente Comercial", value: scale(220) },
      { name: "Director de Ventas", value: scale(160) },
      { name: "VP / C-Level", value: scale(140) },
      { name: "Head of Growth", value: scale(120) },
      { name: "BDM / AE", value: scale(200) },
      { name: "Otros", value: scale(160) },
    ],
    porTamano: [
      { name: "1–50", value: scale(80), size: 80 },
      { name: "51–200", value: scale(160), size: 160 },
      { name: "201–1.000", value: scale(240), size: 240 },
      { name: "1.001–5.000", value: scale(280), size: 280 },
      { name: "5.000+", value: scale(240), size: 240 },
    ],
  };
}

export function getEmailAnalytics(filters: GlobalFilters) {
  const f = filterFactor(filters);
  const encontrados = clamp(BASELINE.correosEncontrados * f);
  const validos = clamp(BASELINE.correosValidados * f);
  const riesgosos = clamp(48 * f);
  const rechazados = clamp(95 * f);
  const neverbounce = clamp(120 * f);
  return {
    resumen: [
      { name: "Encontrados", value: encontrados },
      { name: "Válidos", value: validos },
      { name: "Riesgosos", value: riesgosos },
      { name: "Rechazados", value: rechazados },
      { name: "NeverBounce", value: neverbounce },
    ],
    evolucion: Array.from({ length: 14 }).map((_, i) => ({
      dia: `D${i + 1}`,
      encontrados: 35 + i * 3 + (i % 4) * 5,
      validos: 25 + i * 2 + (i % 3) * 4,
      riesgosos: 4 + (i % 5),
      rechazados: 6 + (i % 4),
    })),
  };
}

export function getCampaignRankings(filters: GlobalFilters): CampaignRankingRow[] {
  const f = filterFactor(filters);
  const rows: CampaignRankingRow[] = [
    { id: "c1", campana: "Outbound Banca Q3", leads: Math.max(1, clamp(48 * f)), openRate: 52.1, replyRate: 14.8, positivos: 9, negativos: 2, rebotes: 1, estado: "Activa", score: 94 },
    { id: "c2", campana: "Retail Decision Makers", leads: Math.max(1, clamp(42 * f)), openRate: 49.6, replyRate: 13.2, positivos: 7, negativos: 3, rebotes: 2, estado: "Activa", score: 88 },
    { id: "c3", campana: "C-Level Outreach Agosto", leads: Math.max(1, clamp(28 * f)), openRate: 55.4, replyRate: 16.1, positivos: 6, negativos: 1, rebotes: 0, estado: "Activa", score: 96 },
    { id: "c4", campana: "Minería & Energía LatAm", leads: Math.max(1, clamp(36 * f)), openRate: 41.2, replyRate: 9.4, positivos: 4, negativos: 3, rebotes: 3, estado: "Programada", score: 72 },
    { id: "c5", campana: "Telecom Growth Wave", leads: Math.max(1, clamp(31 * f)), openRate: 38.8, replyRate: 8.1, positivos: 3, negativos: 2, rebotes: 4, estado: "Pausada", score: 61 },
    { id: "c6", campana: "Healthcare Decision Makers", leads: Math.max(1, clamp(25 * f)), openRate: 46.0, replyRate: 11.0, positivos: 4, negativos: 1, rebotes: 1, estado: "Activa", score: 81 },
    { id: "c7", campana: "Consultoría & Servicios", leads: Math.max(1, clamp(22 * f)), openRate: 44.5, replyRate: 10.2, positivos: 3, negativos: 2, rebotes: 1, estado: "Finalizada", score: 77 },
    { id: "c8", campana: "SaaS Buyers Chile", leads: Math.max(1, clamp(19 * f)), openRate: 33.2, replyRate: 5.4, positivos: 1, negativos: 3, rebotes: 5, estado: "Pausada", score: 48 },
  ];
  return rows.sort((a, b) => b.score - a.score);
}

export function getReplyDistribution(filters: GlobalFilters): { category: ReplyCategory; label: string; value: number; percent: number }[] {
  const f = filterFactor(filters);
  const raw: { category: ReplyCategory; label: string; value: number }[] = [
    { category: "positiva", label: "Positiva", value: clamp(BASELINE.respuestasPositivas * f) },
    { category: "interesado", label: "Interesado", value: clamp(16 * f) },
    { category: "reagendar", label: "Reagendar", value: clamp(9 * f) },
    { category: "negativa", label: "Negativa", value: clamp(BASELINE.respuestasNegativas * f) },
    { category: "no_interesado", label: "No interesado", value: clamp(11 * f) },
    { category: "fuera_oficina", label: "Fuera de oficina", value: clamp(BASELINE.fueraOficina * f) },
    { category: "rebote", label: "Rebote", value: clamp(BASELINE.rebotes * f) },
  ];
  const total = raw.reduce((a, r) => a + r.value, 0) || 1;
  return raw.map((r) => ({ ...r, percent: Math.round((r.value / total) * 1000) / 10 }));
}

export function getCrmAnalytics(filters: GlobalFilters): CrmSyncStats {
  const f = filterFactor(filters);
  return {
    leadsSincronizados: clamp(186 * f),
    oportunidadesCreadas: clamp(42 * f),
    empresasCreadas: clamp(67 * f),
    contactosCreados: clamp(154 * f),
    sincronizacionesFallidas: clamp(8 * f),
    hubspot: "conectado",
    salesforce: "degradado",
    monday: "desconectado",
  };
}

export const KPI_TITLES: Record<string, string> = {
  leads: "Leads encontrados",
  emails: "Correos encontrados",
  validated: "Correos validados",
  enriched: "Leads enriquecidos",
  campaigns: "Campañas generadas",
  active: "Campañas activas",
  positive: "Respuestas positivas",
  negative: "Respuestas negativas",
  bounces: "Rebotes",
  ooo: "Fuera de oficina",
  url: "URL empresa identificada",
  email: "Correo encontrado",
  generated: "Campaña generada",
  approved: "Campaña aprobada",
  instantly: "Enviado a Instantly",
  reply: "Respuesta recibida",
};

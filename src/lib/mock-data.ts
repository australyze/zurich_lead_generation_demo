import type {
  ActivityItem,
  AiProvider,
  Campaign,
  CrmIntegration,
  InstantlyCampaign,
  KpiStats,
  Lead,
} from "./types";

const FIRST_NAMES = [
  "María", "Carlos", "Ana", "Diego", "Valentina", "Andrés", "Camila", "Sebastián",
  "Francisca", "Matías", "Javiera", "Nicolás", "Constanza", "Felipe", "Catalina",
  "Tomás", "Isidora", "Martín", "Paula", "Ignacio", "Sofía", "Benjamín", "Antonia",
  "Joaquín", "Fernanda", "Vicente", "Amanda", "Cristóbal", "Daniela", "Gabriel",
  "Josefina", "Lucas", "Trinidad", "Emilio", "Florencia", "Agustín", "Renata",
  "Maximiliano", "Pía", "Rodrigo", "Alejandra", "Patricio", "Macarena", "Esteban",
  "Beatriz", "Roberto", "Natalia", "Héctor", "Lorena", "Álvaro",
];

const LAST_NAMES = [
  "González", "Muñoz", "Rojas", "Díaz", "Pérez", "Soto", "Contreras", "Silva",
  "Martínez", "Sepúlveda", "Morales", "Rodríguez", "López", "Fuentes", "Hernández",
  "Torres", "Araya", "Flores", "Espinoza", "Valenzuela", "Castillo", "Tapia",
  "Reyes", "Gutiérrez", "Castro", "Vargas", "Álvarez", "Vásquez", "Sánchez", "Ramírez",
];

const COMPANIES = [
  { name: "Banco Estado", industry: "Banca", size: "10,000+", tech: ["SAP", "Salesforce", "Azure"] },
  { name: "Falabella", industry: "Retail", size: "50,000+", tech: ["AWS", "Salesforce", "Snowflake"] },
  { name: "Codelco", industry: "Minería", size: "15,000+", tech: ["SAP", "Oracle", "Azure"] },
  { name: "Latam Airlines", industry: "Aviación", size: "30,000+", tech: ["AWS", "Salesforce", "Tableau"] },
  { name: "Entel", industry: "Telecomunicaciones", size: "5,000–10,000", tech: ["GCP", "HubSpot", "Kafka"] },
  { name: "CMPC", industry: "Forestal", size: "10,000+", tech: ["SAP", "Microsoft 365", "Power BI"] },
  { name: "Cencosud", industry: "Retail", size: "50,000+", tech: ["AWS", "Salesforce", "Databricks"] },
  { name: "BCI", industry: "Banca", size: "10,000+", tech: ["Azure", "Salesforce", "MuleSoft"] },
  { name: "Copec", industry: "Energía", size: "10,000+", tech: ["SAP", "Oracle", "AWS"] },
  { name: "SQM", industry: "Minería", size: "5,000–10,000", tech: ["SAP", "Azure", "Power BI"] },
  { name: "Ripley", industry: "Retail", size: "10,000+", tech: ["AWS", "Salesforce", "Segment"] },
  { name: "Claro Chile", industry: "Telecomunicaciones", size: "5,000–10,000", tech: ["GCP", "Oracle", "Kafka"] },
  { name: "Aguas Andinas", industry: "Utilities", size: "1,000–5,000", tech: ["SAP", "Azure", "Power BI"] },
  { name: "Sonda", industry: "Tecnología", size: "5,000–10,000", tech: ["AWS", "Azure", "ServiceNow"] },
  { name: "Negocios Digitales SpA", industry: "Tecnología", size: "50–200", tech: ["HubSpot", "Notion", "Slack"] },
  { name: "Andes Consulting", industry: "Consultoría", size: "200–500", tech: ["Salesforce", "Tableau", "Office 365"] },
  { name: "Pacific Logistics", industry: "Logística", size: "500–1,000", tech: ["SAP", "Oracle", "AWS"] },
  { name: "VitaSalud", industry: "Salud", size: "1,000–5,000", tech: ["Epic", "Azure", "Power BI"] },
  { name: "AgroSur Export", industry: "Agroindustria", size: "200–500", tech: ["SAP", "Excel", "Power BI"] },
  { name: "Inmobiliaria Cordillera", industry: "Inmobiliaria", size: "50–200", tech: ["Salesforce", "Autodesk", "Office 365"] },
];

const ROLES = [
  { cargo: "Gerente Comercial", nivel: "Gerencia", prioridad: "alta" as const },
  { cargo: "Director de Ventas", nivel: "Dirección", prioridad: "alta" as const },
  { cargo: "VP de Marketing", nivel: "C-Level", prioridad: "alta" as const },
  { cargo: "Chief Revenue Officer", nivel: "C-Level", prioridad: "alta" as const },
  { cargo: "Gerente de Operaciones", nivel: "Gerencia", prioridad: "media" as const },
  { cargo: "Head of Growth", nivel: "Gerencia", prioridad: "alta" as const },
  { cargo: "Jefe de Prospección", nivel: "Jefatura", prioridad: "media" as const },
  { cargo: "Account Executive Senior", nivel: "Senior", prioridad: "media" as const },
  { cargo: "Business Development Manager", nivel: "Gerencia", prioridad: "alta" as const },
  { cargo: "Gerente de Canales", nivel: "Gerencia", prioridad: "media" as const },
  { cargo: "Director Comercial LatAm", nivel: "Dirección", prioridad: "alta" as const },
  { cargo: "Sales Operations Manager", nivel: "Gerencia", prioridad: "baja" as const },
  { cargo: "Key Account Manager", nivel: "Senior", prioridad: "media" as const },
  { cargo: "CMO", nivel: "C-Level", prioridad: "alta" as const },
  { cargo: "Analista Comercial Senior", nivel: "Senior", prioridad: "baja" as const },
];

const COUNTRIES = ["Chile", "Perú", "Colombia", "México", "Argentina", "España"];

const INSIGHTS = [
  "Empresa en proceso de expansión regional en LatAm.",
  "Recientemente abrió RFP para herramientas de ventas.",
  "Equipo comercial creció 25% en los últimos 12 meses.",
  "Busca digitalizar el pipeline de prospección outbound.",
  "Alta exposición a riesgos cibernéticos en operaciones.",
  "Prioriza aseguramiento de flotas y responsabilidad civil.",
  "Inversión activa en transformación digital 2025–2026.",
  "Interés declarado en soluciones de lead intelligence.",
  "Historial de compra de software SaaS enterprise.",
  "Presupuesto comercial disponible en Q3/Q4.",
];

const EMAIL_DOMAINS: Record<string, string> = {
  "Banco Estado": "bancoestado.cl",
  Falabella: "falabella.com",
  Codelco: "codelco.cl",
  "Latam Airlines": "latam.com",
  Entel: "entel.cl",
  CMPC: "cmpc.cl",
  Cencosud: "cencosud.com",
  BCI: "bci.cl",
  Copec: "copec.cl",
  SQM: "sqm.com",
  Ripley: "ripley.cl",
  "Claro Chile": "claro.cl",
  "Aguas Andinas": "aguasandinas.cl",
  Sonda: "sonda.com",
  "Negocios Digitales SpA": "negociosdigitales.cl",
  "Andes Consulting": "andesconsulting.cl",
  "Pacific Logistics": "pacificlogistics.cl",
  VitaSalud: "vitasalud.cl",
  "AgroSur Export": "agrosur.cl",
  "Inmobiliaria Cordillera": "inmocordillera.cl",
};

function slugify(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function daysAgo(n: number): string {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString();
}

function makeEmail(nombre: string, empresa: string): string {
  const parts = nombre.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").split(" ");
  const domain = EMAIL_DOMAINS[empresa] ?? "empresa.cl";
  return `${parts[0]}.${parts[parts.length - 1]}@${domain}`;
}

function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

export function generateLeads(): Lead[] {
  const rand = seededRandom(42);
  const leads: Lead[] = [];

  for (let i = 0; i < 100; i++) {
    const first = FIRST_NAMES[i % FIRST_NAMES.length];
    const last = LAST_NAMES[(i * 3) % LAST_NAMES.length];
    const nombre = `${first} ${last}`;
    const company = COMPANIES[i % COMPANIES.length];
    const role = ROLES[i % ROLES.length];
    const pais = COUNTRIES[i % COUNTRIES.length];
    const companySlug = slugify(company.name);
    const personSlug = slugify(nombre);

    // Distribution targets:
    // 100 leads total
    // 70 emails found (encontrado + validado + riesgoso + neverbounce + listo)
    // 55 validated (validado + listo roughly, plus some neverbounce as validated path)
    // 40 enriched
    // 25 campaign ready
    const emailBucket = i < 70;
    const validatedBucket = i < 55;
    const enrichedBucket = i < 40;
    const campaignBucket = i < 25;

    let emailStatus: Lead["emailStatus"] = "no_procesado";
    let email: string | undefined;

    if (!emailBucket) {
      if (i < 78) emailStatus = "no_encontrado";
      else if (i < 85) emailStatus = "buscando";
      else emailStatus = "no_procesado";
    } else if (validatedBucket) {
      if (i < 40) {
        emailStatus = "listo";
        email = makeEmail(nombre, company.name);
      } else if (i < 48) {
        emailStatus = "validado";
        email = makeEmail(nombre, company.name);
      } else if (i < 52) {
        emailStatus = "neverbounce";
        email = makeEmail(nombre, company.name);
      } else {
        emailStatus = "validado";
        email = makeEmail(nombre, company.name);
      }
    } else {
      if (i < 62) {
        emailStatus = "encontrado";
        email = makeEmail(nombre, company.name);
      } else if (i < 67) {
        emailStatus = "riesgoso";
        email = makeEmail(nombre, company.name);
      } else {
        emailStatus = "encontrado";
        email = makeEmail(nombre, company.name);
      }
    }

    leads.push({
      id: `lead-${String(i + 1).padStart(3, "0")}`,
      nombre,
      cargo: role.cargo,
      empresa: company.name,
      industria: company.industry,
      pais,
      nivelJerarquico: role.nivel,
      linkedinPersonal: `https://linkedin.com/in/${personSlug}`,
      linkedinEmpresa: `https://linkedin.com/company/${companySlug}`,
      estado: i < 95 ? "completado" : i < 98 ? "ejecutando" : "pendiente",
      fecha: daysAgo(Math.floor(rand() * 45)),
      email,
      emailStatus,
      enriquecido: enrichedBucket,
      prioridad: role.prioridad,
      telefono: enrichedBucket ? `+56 9 ${String(70000000 + i * 137).slice(0, 8)}` : undefined,
      ubicacion: enrichedBucket ? `${pais === "Chile" ? "Santiago" : pais}, ${pais}` : undefined,
      empresaSize: enrichedBucket ? company.size : undefined,
      tecnologias: enrichedBucket ? company.tech : undefined,
      insights: enrichedBucket
        ? [INSIGHTS[i % INSIGHTS.length], INSIGHTS[(i + 3) % INSIGHTS.length]]
        : undefined,
      companyDescription: enrichedBucket
        ? `${company.name} es una organización líder en el sector ${company.industry.toLowerCase()} con operaciones en ${pais} y foco en crecimiento comercial.`
        : undefined,
      campaignReady: campaignBucket,
      campaignId: campaignBucket ? `camp-${String(i + 1).padStart(3, "0")}` : undefined,
    });
  }

  return leads;
}

export function generateCampaigns(leads: Lead[]): Campaign[] {
  return leads
    .filter((l) => l.campaignReady)
    .map((lead, idx) => {
      const approved = idx < 12;
      return {
        id: lead.campaignId!,
        leadId: lead.id,
        leadName: lead.nombre,
        company: lead.empresa,
        approved,
        createdAt: daysAgo(Math.floor(idx / 2) + 1),
        emails: [
          {
            id: `${lead.campaignId}-e1`,
            order: 1,
            subject: `{{nombre}}, oportunidad de potenciar el pipeline en ${lead.empresa}`,
            body: `Hola {{nombre}},\n\nHe seguido de cerca el crecimiento de {{empresa}} en el sector {{industria}} y creo que Zurich Lead Intelligence Platform puede acelerar su prospección comercial.\n\n¿Tendría 15 minutos esta semana para una conversación breve?\n\nSaludos,\n{{remitente}}`,
            status: approved ? "aprobado" : idx % 3 === 0 ? "guardado" : "borrador",
          },
          {
            id: `${lead.campaignId}-e2`,
            order: 2,
            subject: `Re: pipeline comercial en {{empresa}}`,
            body: `Hola {{nombre}},\n\nQuería retomar el contacto. Equipos como el de {{empresa}} suelen recuperar 20–30% más oportunidades cuando centralizan prospección, validación de emails y campañas en una sola plataforma.\n\n¿Le parece útil una demo de 10 minutos?\n\nSaludos,\n{{remitente}}`,
            status: approved ? "aprobado" : "borrador",
          },
          {
            id: `${lead.campaignId}-e3`,
            order: 3,
            subject: `Caso relevante para {{cargo}} en {{empresa}}`,
            body: `Hola {{nombre}},\n\nComparto un caso breve: un equipo comercial similar al suyo pasó de 0 a 12 campañas activas en 3 semanas con validación NeverBounce incluida.\n\nSi le interesa, se lo detallo en una llamada corta.\n\nSaludos,\n{{remitente}}`,
            status: approved ? "aprobado" : "borrador",
          },
          {
            id: `${lead.campaignId}-e4`,
            order: 4,
            subject: `Último seguimiento — Zurich Lead Intelligence`,
            body: `Hola {{nombre}},\n\nEntiendo que la agenda de un {{cargo}} es exigente. Dejo abierta la puerta por si desea evaluar Zurich Lead Intelligence Platform cuando prioricen outbound este trimestre.\n\nQuedo atento.\n\nSaludos,\n{{remitente}}`,
            status: approved ? "aprobado" : "borrador",
          },
        ],
      };
    });
}

export function generateInstantlyCampaigns(): InstantlyCampaign[] {
  return [
    {
      id: "ins-001",
      name: "Outbound Banca Q3",
      leadCount: 8,
      status: "activa",
      openRate: 48.2,
      replyRate: 12.5,
      positiveReplies: 6,
      negativeReplies: 2,
      bounceRate: 1.8,
      activatedAt: daysAgo(12),
    },
    {
      id: "ins-002",
      name: "Retail Decision Makers",
      leadCount: 6,
      status: "activa",
      openRate: 52.1,
      replyRate: 14.2,
      positiveReplies: 5,
      negativeReplies: 1,
      bounceRate: 2.1,
      activatedAt: daysAgo(8),
    },
    {
      id: "ins-003",
      name: "Minería & Energía LatAm",
      leadCount: 5,
      status: "programada",
      openRate: 0,
      replyRate: 0,
      positiveReplies: 0,
      negativeReplies: 0,
      bounceRate: 0,
      scheduledAt: daysAgo(-2),
    },
    {
      id: "ins-004",
      name: "Telecom Growth Wave",
      leadCount: 4,
      status: "enviada",
      openRate: 41.0,
      replyRate: 9.8,
      positiveReplies: 2,
      negativeReplies: 1,
      bounceRate: 3.2,
      activatedAt: daysAgo(3),
    },
    {
      id: "ins-005",
      name: "SaaS Buyers Chile",
      leadCount: 7,
      status: "pausada",
      openRate: 39.4,
      replyRate: 8.1,
      positiveReplies: 3,
      negativeReplies: 2,
      bounceRate: 2.5,
      activatedAt: daysAgo(18),
    },
    {
      id: "ins-006",
      name: "C-Level Outreach Agosto",
      leadCount: 3,
      status: "pendiente_envio",
      openRate: 0,
      replyRate: 0,
      positiveReplies: 0,
      negativeReplies: 0,
      bounceRate: 0,
    },
    {
      id: "ins-007",
      name: "Consultoría & Servicios",
      leadCount: 5,
      status: "finalizada",
      openRate: 55.6,
      replyRate: 16.4,
      positiveReplies: 7,
      negativeReplies: 3,
      bounceRate: 1.2,
      activatedAt: daysAgo(40),
    },
    {
      id: "ins-008",
      name: "Healthcare Decision Makers",
      leadCount: 4,
      status: "activa",
      openRate: 46.8,
      replyRate: 11.0,
      positiveReplies: 4,
      negativeReplies: 1,
      bounceRate: 1.5,
      activatedAt: daysAgo(6),
    },
  ];
}

export function computeKpis(
  leads: Lead[],
  campaigns: Campaign[],
  instantly: InstantlyCampaign[]
): KpiStats {
  const correosEncontrados = leads.filter((l) =>
    ["encontrado", "validado", "riesgoso", "neverbounce", "listo"].includes(l.emailStatus)
  ).length;
  const correosValidados = leads.filter((l) =>
    ["validado", "neverbounce", "listo"].includes(l.emailStatus)
  ).length;
  const leadsEnriquecidos = leads.filter((l) => l.enriquecido).length;
  const campanasGeneradas = campaigns.length;
  const campanasActivadas = instantly.filter((c) =>
    ["activa", "enviada", "pausada", "finalizada"].includes(c.status)
  ).length;
  const respuestasPositivas = instantly.reduce((a, c) => a + c.positiveReplies, 0);
  const respuestasNegativas = instantly.reduce((a, c) => a + c.negativeReplies, 0);

  return {
    leadsEncontrados: leads.length,
    correosEncontrados,
    correosValidados,
    leadsEnriquecidos,
    campanasGeneradas,
    campanasActivadas,
    respuestasPositivas,
    respuestasNegativas,
  };
}

export function generateActivity(leads: Lead[]): ActivityItem[] {
  return [
    {
      id: "act-1",
      type: "prospection",
      title: "Prospección completada",
      description: `Se encontraron 24 nuevos leads en ${leads[0].empresa} y afines.`,
      timestamp: daysAgo(0),
    },
    {
      id: "act-2",
      type: "email",
      title: "Validación NeverBounce",
      description: "18 correos pasaron a estado Validado / Listo para usar.",
      timestamp: daysAgo(0),
    },
    {
      id: "act-3",
      type: "enrichment",
      title: "Enriquecimiento finalizado",
      description: `${leads[2].nombre} (${leads[2].empresa}) enriquecido con insights comerciales.`,
      timestamp: daysAgo(1),
    },
    {
      id: "act-4",
      type: "campaign",
      title: "Secuencia aprobada",
      description: `Campaña de ${leads[1].nombre} lista para Instantly.`,
      timestamp: daysAgo(1),
    },
    {
      id: "act-5",
      type: "instantly",
      title: "Campaña activada",
      description: "Outbound Banca Q3 entró en estado Activa.",
      timestamp: daysAgo(2),
    },
    {
      id: "act-6",
      type: "crm",
      title: "Solicitud de integración",
      description: "Se registró solicitud para Microsoft Dynamics.",
      timestamp: daysAgo(3),
    },
    {
      id: "act-7",
      type: "email",
      title: "Correos encontrados",
      description: `Email localizado para ${leads[5].nombre}.`,
      timestamp: daysAgo(3),
    },
    {
      id: "act-8",
      type: "prospection",
      title: "Actor Apify en ejecución",
      description: "Búsqueda LinkedIn en curso — Industria Retail.",
      timestamp: daysAgo(4),
    },
  ];
}

export const AI_PROVIDERS: AiProvider[] = [
  {
    id: "gpt-5",
    name: "GPT-5",
    cost: "$0.012 / 1K tokens",
    speed: "Alta",
    quality: "Excelente",
    description: "Modelo flagship para copy comercial, insights y secuencias de alto impacto.",
  },
  {
    id: "gpt-5-mini",
    name: "GPT-5 Mini",
    cost: "$0.004 / 1K tokens",
    speed: "Muy Alta",
    quality: "Muy Buena",
    description: "Ideal para volumen: enrichment masivo y drafts rápidos con excelente relación costo/calidad.",
  },
  {
    id: "gpt-4.1",
    name: "GPT-4.1",
    cost: "$0.008 / 1K tokens",
    speed: "Alta",
    quality: "Muy Buena",
    description: "Opción consolidada para generación de campañas y personalización por industria.",
  },
  {
    id: "perplexity-sonar",
    name: "Perplexity Sonar",
    cost: "$0.006 / 1K tokens",
    speed: "Media",
    quality: "Excelente",
    description: "Fuerte en research en tiempo real: insights de empresa, señales de compra y contexto de mercado.",
  },
];

export const CRM_INTEGRATIONS: CrmIntegration[] = [
  {
    id: "hubspot",
    name: "HubSpot",
    status: "conectado",
    description: "Sincronice leads, deals y actividades de outreach con HubSpot CRM.",
  },
  {
    id: "salesforce",
    name: "Salesforce",
    status: "desconectado",
    description: "Conecte oportunidades y cuentas enterprise con Salesforce Lightning.",
  },
  {
    id: "monday",
    name: "Monday CRM",
    status: "desconectado",
    description: "Visualice pipelines y boards comerciales sincronizados con Monday.",
  },
  {
    id: "dynamics",
    name: "Microsoft Dynamics",
    status: "proximamente",
    description: "Integración nativa con Dynamics 365 Sales — próximamente disponible.",
  },
  {
    id: "pipedrive",
    name: "Pipedrive",
    status: "desconectado",
    description: "Empuje leads calificados directamente a su pipeline de Pipedrive.",
  },
  {
    id: "zoho",
    name: "Zoho CRM",
    status: "proximamente",
    description: "Sincronización bidireccional con Zoho CRM en roadmap Q4.",
  },
];

export const FUNNEL_DATA = [
  { stage: "Leads", value: 100 },
  { stage: "Emails", value: 70 },
  { stage: "Emails Validados", value: 55 },
  { stage: "Enriquecidos", value: 40 },
  { stage: "Campañas", value: 25 },
  { stage: "Activadas", value: 12 },
];

export const WEEKLY_TREND = [
  { week: "Sem 1", leads: 18, emails: 12, campaigns: 3 },
  { week: "Sem 2", leads: 22, emails: 16, campaigns: 4 },
  { week: "Sem 3", leads: 15, emails: 11, campaigns: 5 },
  { week: "Sem 4", leads: 28, emails: 19, campaigns: 6 },
  { week: "Sem 5", leads: 17, emails: 12, campaigns: 4 },
  { week: "Sem 6", leads: 0, emails: 0, campaigns: 3 },
];

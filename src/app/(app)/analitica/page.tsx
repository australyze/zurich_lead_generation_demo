"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  Treemap,
  XAxis,
  YAxis,
} from "recharts";
import { useFilterStore } from "@/stores/filter-store";
import {
  getCampaignRankings,
  getCrmAnalytics,
  getEmailAnalytics,
  getLeadsBreakdown,
  getPipelineHistory,
  getReplyDistribution,
} from "@/lib/analytics-data";
import { GlobalFiltersBar } from "@/components/analytics/global-filters-bar";
import { DrilldownDrawer } from "@/components/analytics/drilldown-drawer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { formatNumber, formatPercent } from "@/lib/utils";
import { KpiCard } from "@/components/shared/kpi-card";
import {
  Users,
  Building2,
  Contact,
  Briefcase,
  AlertCircle,
} from "lucide-react";

const COLORS = ["#003366", "#0066CC", "#1a7adf", "#4da3ff", "#78b7f0", "#96cbf5", "#b4dff9", "#64748b"];

const REPLY_COLORS: Record<string, string> = {
  positiva: "#059669",
  interesado: "#0d9488",
  reagendar: "#0284c7",
  negativa: "#dc2626",
  no_interesado: "#ea580c",
  fuera_oficina: "#ca8a04",
  rebote: "#64748b",
};

export default function AnaliticaPage() {
  const filters = useFilterStore((s) => s.filters);
  const setFilter = useFilterStore((s) => s.setFilter);
  const setDrilldownId = useFilterStore((s) => s.setDrilldownId);

  const history = useMemo(() => getPipelineHistory(filters.dateRange), [filters.dateRange]);
  const leads = useMemo(() => getLeadsBreakdown(filters), [filters]);
  const emails = useMemo(() => getEmailAnalytics(filters), [filters]);
  const campaigns = useMemo(() => getCampaignRankings(filters), [filters]);
  const replies = useMemo(() => getReplyDistribution(filters), [filters]);
  const crm = useMemo(() => getCrmAnalytics(filters), [filters]);

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-semibold tracking-tight text-[#003366]">Analítica</h1>
        <p className="mt-1 text-sm text-[#64748b]">
          Reportería avanzada del pipeline — performance, leads, correos, campañas, respuestas y CRM
        </p>
      </motion.div>

      <GlobalFiltersBar />

      <Tabs defaultValue="pipeline" className="space-y-4">
        <TabsList className="h-auto flex-wrap justify-start gap-1">
          <TabsTrigger value="pipeline">Performance del pipeline</TabsTrigger>
          <TabsTrigger value="leads">Leads</TabsTrigger>
          <TabsTrigger value="correos">Correos</TabsTrigger>
          <TabsTrigger value="campanas">Campañas</TabsTrigger>
          <TabsTrigger value="respuestas">Respuestas</TabsTrigger>
          <TabsTrigger value="crm">CRM</TabsTrigger>
        </TabsList>

        {/* TAB 1 */}
        <TabsContent value="pipeline" className="space-y-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-semibold text-[#003366]">Embudo histórico</h2>
              <p className="text-sm text-[#64748b]">Evolución del pipeline en el período seleccionado</p>
            </div>
            <Select
              value={filters.dateRange === "all" ? "30d" : filters.dateRange}
              onValueChange={(v) => setFilter("dateRange", v as typeof filters.dateRange)}
            >
              <SelectTrigger className="w-44">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Últimos 7 días</SelectItem>
                <SelectItem value="30d">Últimos 30 días</SelectItem>
                <SelectItem value="90d">Últimos 90 días</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Card>
            <CardContent className="h-96 pt-6">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={history}>
                  <defs>
                    <linearGradient id="histLeads" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#0066CC" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="#0066CC" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="periodo" tick={{ fill: "#64748b", fontSize: 12 }} />
                  <YAxis tick={{ fill: "#64748b", fontSize: 12 }} />
                  <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid #e2e8f0", fontSize: 12 }} />
                  <Legend />
                  <Area type="monotone" dataKey="leads" name="Leads" stroke="#003366" fill="url(#histLeads)" strokeWidth={2} />
                  <Area type="monotone" dataKey="correos" name="Correos" stroke="#0066CC" fill="transparent" strokeWidth={2} />
                  <Area type="monotone" dataKey="validados" name="Validados" stroke="#1a7adf" fill="transparent" strokeWidth={2} />
                  <Area type="monotone" dataKey="enriquecidos" name="Enriquecidos" stroke="#4da3ff" fill="transparent" strokeWidth={2} />
                  <Area type="monotone" dataKey="campanas" name="Campañas" stroke="#78b7f0" fill="transparent" strokeWidth={2} />
                  <Area type="monotone" dataKey="respuestas" name="Respuestas" stroke="#059669" fill="transparent" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* TAB 2 */}
        <TabsContent value="leads" className="space-y-4">
          <div className="grid gap-4 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Leads por industria</CardTitle>
                <CardDescription>Distribución vertical del pipeline</CardDescription>
              </CardHeader>
              <CardContent className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={leads.porIndustria} layout="vertical" margin={{ left: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" horizontal={false} />
                    <XAxis type="number" tick={{ fill: "#64748b", fontSize: 11 }} />
                    <YAxis type="category" dataKey="name" width={110} tick={{ fill: "#003366", fontSize: 11 }} />
                    <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid #e2e8f0", fontSize: 12 }} />
                    <Bar
                      dataKey="value"
                      name="Leads"
                      fill="#0066CC"
                      radius={[0, 6, 6, 0]}
                      cursor="pointer"
                      onClick={() => setDrilldownId("leads")}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Leads por país</CardTitle>
                <CardDescription>Cobertura geográfica</CardDescription>
              </CardHeader>
              <CardContent className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={leads.porPais}
                      dataKey="value"
                      nameKey="name"
                      innerRadius={55}
                      outerRadius={95}
                      paddingAngle={2}
                      cursor="pointer"
                      onClick={() => setDrilldownId("leads")}
                    >
                      {leads.porPais.map((_, i) => (
                        <Cell key={i} fill={COLORS[i % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid #e2e8f0", fontSize: 12 }} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Leads por cargo</CardTitle>
                <CardDescription>Nivel de decisión contactado</CardDescription>
              </CardHeader>
              <CardContent className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={leads.porCargo}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="name" tick={{ fill: "#64748b", fontSize: 10 }} interval={0} angle={-20} textAnchor="end" height={60} />
                    <YAxis tick={{ fill: "#64748b", fontSize: 11 }} />
                    <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid #e2e8f0", fontSize: 12 }} />
                    <Bar dataKey="value" name="Leads" fill="#003366" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Leads por tamaño de empresa</CardTitle>
                <CardDescription>Treemap firmográfico</CardDescription>
              </CardHeader>
              <CardContent className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <Treemap
                    data={leads.porTamano.map((d) => ({ name: d.name, size: d.value }))}
                    dataKey="size"
                    stroke="#fff"
                    fill="#0066CC"
                    content={<TreemapContent />}
                  />
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* TAB 3 */}
        <TabsContent value="correos" className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
            {emails.resumen.map((item, i) => (
              <button
                key={item.name}
                type="button"
                onClick={() => setDrilldownId(i < 2 ? "emails" : i === 2 ? "bounces" : "validated")}
                className="rounded-xl border border-[#e2e8f0] bg-white p-4 text-left shadow-sm hover:border-[#0066CC]/40 cursor-pointer"
              >
                <p className="text-[11px] uppercase tracking-wide text-[#64748b]">{item.name}</p>
                <p className="mt-2 text-2xl font-semibold tabular-nums text-[#003366]">{formatNumber(item.value)}</p>
              </button>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Evolución temporal de correos</CardTitle>
              <CardDescription>Encontrados, válidos, riesgosos y rechazados</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={emails.evolucion}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="dia" tick={{ fill: "#64748b", fontSize: 11 }} />
                  <YAxis tick={{ fill: "#64748b", fontSize: 11 }} />
                  <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid #e2e8f0", fontSize: 12 }} />
                  <Legend />
                  <Line type="monotone" dataKey="encontrados" name="Encontrados" stroke="#0066CC" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="validos" name="Válidos" stroke="#059669" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="riesgosos" name="Riesgosos" stroke="#d97706" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="rechazados" name="Rechazados" stroke="#dc2626" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* TAB 4 */}
        <TabsContent value="campanas" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Ranking de campañas</CardTitle>
              <CardDescription>Mejores campañas por score compuesto (open + reply + positivos − rebotes)</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-auto rounded-lg border border-[#e2e8f0]">
                <table className="w-full min-w-[900px] text-sm">
                  <thead className="bg-[#F5F7FA] text-left text-xs uppercase tracking-wide text-[#64748b]">
                    <tr>
                      <th className="px-4 py-3 font-medium">#</th>
                      <th className="px-4 py-3 font-medium">Campaña</th>
                      <th className="px-4 py-3 font-medium">Leads</th>
                      <th className="px-4 py-3 font-medium">Open Rate</th>
                      <th className="px-4 py-3 font-medium">Reply Rate</th>
                      <th className="px-4 py-3 font-medium">Positivos</th>
                      <th className="px-4 py-3 font-medium">Negativos</th>
                      <th className="px-4 py-3 font-medium">Rebotes</th>
                      <th className="px-4 py-3 font-medium">Estado</th>
                      <th className="px-4 py-3 font-medium">Score</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#e2e8f0]">
                    {campaigns.map((c, i) => (
                      <tr key={c.id} className="hover:bg-[#F5F7FA]/60">
                        <td className="px-4 py-3 tabular-nums text-[#94a3b8]">{i + 1}</td>
                        <td className="px-4 py-3 font-medium text-[#003366]">{c.campana}</td>
                        <td className="px-4 py-3 tabular-nums">{c.leads}</td>
                        <td className="px-4 py-3 tabular-nums">{formatPercent(c.openRate)}</td>
                        <td className="px-4 py-3 tabular-nums">{formatPercent(c.replyRate)}</td>
                        <td className="px-4 py-3 tabular-nums text-emerald-700">{c.positivos}</td>
                        <td className="px-4 py-3 tabular-nums text-red-600">{c.negativos}</td>
                        <td className="px-4 py-3 tabular-nums text-amber-600">{c.rebotes}</td>
                        <td className="px-4 py-3">
                          <Badge variant={c.estado === "Activa" ? "success" : c.estado === "Pausada" ? "warning" : "secondary"}>
                            {c.estado}
                          </Badge>
                        </td>
                        <td className="px-4 py-3">
                          <span className="inline-flex h-7 min-w-7 items-center justify-center rounded-md bg-[#EAF4FF] px-2 text-xs font-bold text-[#0066CC]">
                            {c.score}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* TAB 5 */}
        <TabsContent value="respuestas" className="space-y-4">
          <div className="grid gap-4 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Clasificación automática</CardTitle>
                <CardDescription>Distribución porcentual de respuestas</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={replies}
                      dataKey="value"
                      nameKey="label"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={2}
                    >
                      {replies.map((r) => (
                        <Cell key={r.category} fill={REPLY_COLORS[r.category] ?? "#64748b"} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value, _n, props) => [
                        `${formatNumber(Number(value))} (${props.payload.percent}%)`,
                        props.payload.label,
                      ]}
                      contentStyle={{ borderRadius: 8, border: "1px solid #e2e8f0", fontSize: 12 }}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Detalle por categoría</CardTitle>
                <CardDescription>Volumen y peso relativo</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {replies.map((r) => (
                  <div key={r.category}>
                    <div className="mb-1 flex items-center justify-between text-sm">
                      <span className="font-medium text-[#003366]">{r.label}</span>
                      <span className="tabular-nums text-[#64748b]">
                        {formatNumber(r.value)} · {r.percent}%
                      </span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-[#F5F7FA]">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${r.percent}%`,
                          backgroundColor: REPLY_COLORS[r.category],
                        }}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* TAB 6 */}
        <TabsContent value="crm" className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
            <KpiCard title="Leads sincronizados" value={crm.leadsSincronizados} icon={Users} index={0} />
            <KpiCard title="Oportunidades creadas" value={crm.oportunidadesCreadas} icon={Briefcase} index={1} />
            <KpiCard title="Empresas creadas" value={crm.empresasCreadas} icon={Building2} index={2} />
            <KpiCard title="Contactos creados" value={crm.contactosCreados} icon={Contact} index={3} />
            <KpiCard
              title="Sincronizaciones fallidas"
              value={crm.sincronizacionesFallidas}
              icon={AlertCircle}
              accent="bg-red-50 text-red-600"
              index={4}
            />
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <CrmStatusCard name="HubSpot" status={crm.hubspot} />
            <CrmStatusCard name="Salesforce" status={crm.salesforce} />
            <CrmStatusCard name="Monday CRM" status={crm.monday} />
          </div>
        </TabsContent>
      </Tabs>

      <DrilldownDrawer />
    </div>
  );
}

function CrmStatusCard({
  name,
  status,
}: {
  name: string;
  status: "conectado" | "degradado" | "desconectado";
}) {
  const map = {
    conectado: { label: "Conectado", variant: "success" as const, desc: "Sincronización operativa" },
    degradado: { label: "Degradado", variant: "warning" as const, desc: "Latencia elevada / reintentos" },
    desconectado: { label: "Desconectado", variant: "outline" as const, desc: "Sin conexión activa" },
  };
  const s = map[status];
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">{name}</CardTitle>
          <Badge variant={s.variant}>{s.label}</Badge>
        </div>
        <CardDescription>{s.desc}</CardDescription>
      </CardHeader>
    </Card>
  );
}

function TreemapContent(props: {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  name?: string;
  depth?: number;
  index?: number;
}) {
  const { x = 0, y = 0, width = 0, height = 0, name, index = 0 } = props;
  if (width < 40 || height < 28) return null;
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        style={{ fill: COLORS[index % COLORS.length], stroke: "#fff", strokeWidth: 2 }}
      />
      <text x={x + 8} y={y + 20} fill="#fff" fontSize={12} fontWeight={600}>
        {name}
      </text>
    </g>
  );
}

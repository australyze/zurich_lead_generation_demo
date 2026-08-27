"use client";

import { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Users,
  Mail,
  BadgeCheck,
  Sparkles,
  Megaphone,
  Zap,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip as ReTooltip,
  XAxis,
  YAxis,
  Area,
  AreaChart,
} from "recharts";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";
import { useAppStore } from "@/stores/app-store";
import { KpiCard } from "@/components/shared/kpi-card";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { formatNumber } from "@/lib/utils";

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const leads = useAppStore((s) => s.leads);
  const campaigns = useAppStore((s) => s.campaigns);
  const instantly = useAppStore((s) => s.instantlyCampaigns);
  const funnelData = useAppStore((s) => s.funnelData);
  const weeklyTrend = useAppStore((s) => s.weeklyTrend);
  const getKpis = useAppStore((s) => s.getKpis);
  const getActivity = useAppStore((s) => s.getActivity);

  const kpis = useMemo(() => getKpis(), [getKpis, leads.length, campaigns.length, instantly.length]);
  const activity = useMemo(() => getActivity(), [getActivity, leads.length]);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(t);
  }, []);

  const kpiItems = [
    { title: "Leads encontrados", value: kpis.leadsEncontrados, icon: Users, hint: "Total en pipeline" },
    { title: "Correos encontrados", value: kpis.correosEncontrados, icon: Mail, hint: "70% hit rate" },
    { title: "Correos validados", value: kpis.correosValidados, icon: BadgeCheck, hint: "NeverBounce OK" },
    { title: "Leads enriquecidos", value: kpis.leadsEnriquecidos, icon: Sparkles, hint: "Perfiles premium" },
    { title: "Campañas generadas", value: kpis.campanasGeneradas, icon: Megaphone, hint: "Secuencias de 4 emails" },
    { title: "Campañas activadas", value: kpis.campanasActivadas, icon: Zap, hint: "En Instantly" },
    { title: "Respuestas positivas", value: kpis.respuestasPositivas, icon: ThumbsUp, hint: "Interés comercial", accent: "bg-emerald-50 text-emerald-600" },
    { title: "Respuestas negativas", value: kpis.respuestasNegativas, icon: ThumbsDown, hint: "Opt-out / no interest", accent: "bg-red-50 text-red-600" },
  ];

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <Skeleton className="h-8 w-72" />
          <Skeleton className="mt-2 h-4 w-96" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="h-28 rounded-xl" />
          ))}
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          <Skeleton className="h-80 rounded-xl" />
          <Skeleton className="h-80 rounded-xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-semibold tracking-tight text-[#003366]">Dashboard ejecutivo</h1>
        <p className="mt-1 text-sm text-[#64748b]">
          Visión consolidada del funnel comercial — Zurich Lead Intelligence Platform
        </p>
      </motion.div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpiItems.map((item, i) => (
          <KpiCard key={item.title} {...item} index={i} />
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Funnel comercial</CardTitle>
            <CardDescription>Leads → Emails → Validados → Enriquecidos → Campañas → Activadas</CardDescription>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={funnelData} layout="vertical" margin={{ left: 20, right: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" horizontal={false} />
                <XAxis type="number" tick={{ fill: "#64748b", fontSize: 12 }} />
                <YAxis
                  type="category"
                  dataKey="stage"
                  width={120}
                  tick={{ fill: "#003366", fontSize: 12 }}
                />
                <ReTooltip
                  contentStyle={{
                    borderRadius: 8,
                    border: "1px solid #e2e8f0",
                    fontSize: 12,
                  }}
                  formatter={(value) => [formatNumber(Number(value)), "Cantidad"]}
                />
                <Bar dataKey="value" fill="#0066CC" radius={[0, 6, 6, 0]} barSize={22} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tendencia semanal</CardTitle>
            <CardDescription>Leads, emails y campañas en las últimas 6 semanas</CardDescription>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weeklyTrend}>
                <defs>
                  <linearGradient id="gLeads" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0066CC" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="#0066CC" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="week" tick={{ fill: "#64748b", fontSize: 12 }} />
                <YAxis tick={{ fill: "#64748b", fontSize: 12 }} />
                <ReTooltip
                  contentStyle={{
                    borderRadius: 8,
                    border: "1px solid #e2e8f0",
                    fontSize: 12,
                  }}
                />
                <Area type="monotone" dataKey="leads" stroke="#0066CC" fill="url(#gLeads)" strokeWidth={2} />
                <Area type="monotone" dataKey="emails" stroke="#003366" fill="transparent" strokeWidth={2} />
                <Area type="monotone" dataKey="campaigns" stroke="#4da3ff" fill="transparent" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Actividad reciente</CardTitle>
          <CardDescription>Últimos eventos operacionales de la plataforma</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-hidden rounded-lg border border-[#e2e8f0]">
            <table className="w-full text-sm">
              <thead className="bg-[#F5F7FA] text-left text-xs uppercase tracking-wide text-[#64748b]">
                <tr>
                  <th className="px-4 py-3 font-medium">Evento</th>
                  <th className="px-4 py-3 font-medium">Descripción</th>
                  <th className="px-4 py-3 font-medium">Tipo</th>
                  <th className="px-4 py-3 font-medium">Cuándo</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e2e8f0]">
                {activity.map((item) => (
                  <tr key={item.id} className="bg-white hover:bg-[#F5F7FA]/60 transition-colors">
                    <td className="px-4 py-3 font-medium text-[#003366]">{item.title}</td>
                    <td className="px-4 py-3 text-[#64748b]">{item.description}</td>
                    <td className="px-4 py-3 capitalize text-[#64748b]">{item.type}</td>
                    <td className="px-4 py-3 text-[#94a3b8]">
                      {formatDistanceToNow(new Date(item.timestamp), { addSuffix: true, locale: es })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

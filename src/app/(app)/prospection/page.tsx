"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Loader2, CheckCircle2, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { useAppStore } from "@/stores/app-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ProspectStatusBadge } from "@/components/shared/status-badges";
import type { ProspectingConfig } from "@/lib/types";

const INITIAL: ProspectingConfig = {
  empresaObjetivo: "Falabella",
  industria: "Retail",
  pais: "Chile",
  cargo: "Gerente Comercial",
  nivelJerarquico: "Gerencia",
  cantidadMaxima: 25,
  keywords: "ventas B2B, retail, LatAm",
  linkedinSearchUrl: "https://www.linkedin.com/search/results/people/?keywords=Gerente%20Comercial%20Retail",
};

export default function ProspectionPage() {
  const [form, setForm] = useState<ProspectingConfig>(INITIAL);
  const job = useAppStore((s) => s.prospectingJob);
  const leads = useAppStore((s) => s.leads);
  const startProspecting = useAppStore((s) => s.startProspecting);
  const updateProgress = useAppStore((s) => s.updateProspectingProgress);
  const completeProspecting = useAppStore((s) => s.completeProspecting);
  const failProspecting = useAppStore((s) => s.failProspecting);

  const recentLeads = leads.slice(0, 20);

  useEffect(() => {
    if (!job || job.status !== "ejecutando") return;

    const steps = [15, 35, 55, 75, 90, 100];
    let i = 0;
    const interval = setInterval(() => {
      if (i >= steps.length) {
        clearInterval(interval);
        // 8% chance of simulated error for demo drama — keep success path
        if (form.empresaObjetivo.toLowerCase() === "error") {
          failProspecting();
          toast.error("Error en actor Apify", {
            description: "No se pudo completar la búsqueda LinkedIn. Reintente.",
          });
        } else {
          completeProspecting();
          toast.success("Prospección completada", {
            description: "Se generó una tabla mock de leads listos para revisión.",
          });
        }
        return;
      }
      updateProgress(steps[i]);
      i += 1;
    }, 700);

    return () => clearInterval(interval);
  }, [job?.id, job?.status]); // eslint-disable-line react-hooks/exhaustive-deps

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (job?.status === "ejecutando") return;
    startProspecting(form);
    toast.message("Actor Apify iniciado", {
      description: "Simulando scraping de LinkedIn…",
    });
  }

  function set<K extends keyof ProspectingConfig>(key: K, value: ProspectingConfig[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-[#003366]">Prospección</h1>
        <p className="mt-1 text-sm text-[#64748b]">
          Configure el actor Apify y ejecute búsquedas LinkedIn simuladas
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-5">
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle>Configuración del actor</CardTitle>
            <CardDescription>Parámetros de búsqueda B2B — simulación Apify</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={onSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="empresa">Empresa objetivo</Label>
                <Input id="empresa" value={form.empresaObjetivo} onChange={(e) => set("empresaObjetivo", e.target.value)} />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Industria</Label>
                  <Select value={form.industria} onValueChange={(v) => set("industria", v)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {["Retail", "Banca", "Minería", "Tecnología", "Salud", "Energía", "Telecomunicaciones"].map((i) => (
                        <SelectItem key={i} value={i}>{i}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>País</Label>
                  <Select value={form.pais} onValueChange={(v) => set("pais", v)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {["Chile", "Perú", "Colombia", "México", "Argentina", "España"].map((p) => (
                        <SelectItem key={p} value={p}>{p}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="cargo">Cargo</Label>
                  <Input id="cargo" value={form.cargo} onChange={(e) => set("cargo", e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>Nivel jerárquico</Label>
                  <Select value={form.nivelJerarquico} onValueChange={(v) => set("nivelJerarquico", v)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {["C-Level", "Dirección", "Gerencia", "Jefatura", "Senior"].map((n) => (
                        <SelectItem key={n} value={n}>{n}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="max">Cantidad máxima de leads</Label>
                <Input
                  id="max"
                  type="number"
                  min={1}
                  max={100}
                  value={form.cantidadMaxima}
                  onChange={(e) => set("cantidadMaxima", Number(e.target.value))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="kw">Palabras clave LinkedIn</Label>
                <Input id="kw" value={form.keywords} onChange={(e) => set("keywords", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="url">URL de búsqueda LinkedIn</Label>
                <Input id="url" value={form.linkedinSearchUrl} onChange={(e) => set("linkedinSearchUrl", e.target.value)} />
              </div>
              <Button type="submit" className="w-full" disabled={job?.status === "ejecutando"}>
                {job?.status === "ejecutando" ? (
                  <>
                    <Loader2 className="animate-spin" size={16} />
                    Ejecutando…
                  </>
                ) : (
                  <>
                    <Play size={16} />
                    Iniciar Prospección
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="space-y-6 xl:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle>Estado del proceso</CardTitle>
              <CardDescription>Simulación visual del actor Apify</CardDescription>
            </CardHeader>
            <CardContent>
              <AnimatePresence mode="wait">
                {!job ? (
                  <motion.div
                    key="idle"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="rounded-lg border border-dashed border-[#d0d7e2] bg-[#F5F7FA] px-6 py-10 text-center"
                  >
                    <p className="text-sm text-[#64748b]">
                      Configure los parámetros y pulse <strong>Iniciar Prospección</strong> para comenzar.
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key={job.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {job.status === "ejecutando" && <Loader2 className="animate-spin text-[#0066CC]" size={20} />}
                        {job.status === "completado" && <CheckCircle2 className="text-emerald-600" size={20} />}
                        {job.status === "error" && <AlertTriangle className="text-red-600" size={20} />}
                        <div>
                          <p className="text-sm font-medium text-[#003366]">Job {job.id}</p>
                          <p className="text-xs text-[#64748b]">
                            {job.config.empresaObjetivo} · {job.config.industria} · {job.config.pais}
                          </p>
                        </div>
                      </div>
                      <ProspectStatusBadge status={job.status} />
                    </div>
                    <Progress value={job.progress} />
                    <div className="flex justify-between text-xs text-[#94a3b8]">
                      <span>{job.progress}% completado</span>
                      {job.leadsGenerated > 0 && <span>{job.leadsGenerated} leads generados</span>}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Leads prospectados</CardTitle>
              <CardDescription>Tabla mock generada al finalizar la prospección</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-auto rounded-lg border border-[#e2e8f0]">
                <table className="w-full min-w-[900px] text-sm">
                  <thead className="bg-[#F5F7FA] text-left text-xs uppercase tracking-wide text-[#64748b]">
                    <tr>
                      <th className="px-3 py-3 font-medium">Nombre</th>
                      <th className="px-3 py-3 font-medium">Cargo</th>
                      <th className="px-3 py-3 font-medium">Empresa</th>
                      <th className="px-3 py-3 font-medium">LinkedIn Personal</th>
                      <th className="px-3 py-3 font-medium">LinkedIn Empresa</th>
                      <th className="px-3 py-3 font-medium">Estado</th>
                      <th className="px-3 py-3 font-medium">Fecha</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#e2e8f0]">
                    {recentLeads.map((lead) => (
                      <tr key={lead.id} className="hover:bg-[#F5F7FA]/60">
                        <td className="px-3 py-2.5 font-medium text-[#003366]">{lead.nombre}</td>
                        <td className="px-3 py-2.5 text-[#64748b]">{lead.cargo}</td>
                        <td className="px-3 py-2.5 text-[#64748b]">{lead.empresa}</td>
                        <td className="px-3 py-2.5">
                          <a href={lead.linkedinPersonal} target="_blank" rel="noreferrer" className="text-[#0066CC] hover:underline text-xs">
                            Perfil
                          </a>
                        </td>
                        <td className="px-3 py-2.5">
                          <a href={lead.linkedinEmpresa} target="_blank" rel="noreferrer" className="text-[#0066CC] hover:underline text-xs">
                            Empresa
                          </a>
                        </td>
                        <td className="px-3 py-2.5">
                          <ProspectStatusBadge status={lead.estado} />
                        </td>
                        <td className="px-3 py-2.5 text-xs text-[#94a3b8]">
                          {format(new Date(lead.fecha), "dd MMM yyyy", { locale: es })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

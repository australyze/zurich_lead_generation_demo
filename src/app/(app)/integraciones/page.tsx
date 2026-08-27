"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { toast } from "sonner";
import { INTEGRATION_CATEGORIES, INTEGRATIONS } from "@/lib/enterprise-data";
import { useEnterpriseStore } from "@/stores/enterprise-store";
import type { IntegrationAvailability, IntegrationCard, RequestPriority } from "@/lib/enterprise-types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const STATUS_LABEL: Record<IntegrationAvailability, string> = {
  disponible: "Disponible",
  proximamente: "Próximamente",
  solicitar: "Solicitar",
};

const EMPTY_FORM = {
  nombre: "",
  justificacion: "",
  impacto: "",
  prioridad: "Media" as RequestPriority,
};

export default function IntegracionesPage() {
  const [category, setCategory] = useState<(typeof INTEGRATION_CATEGORIES)[number]>("Todas");
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const requests = useEnterpriseStore((s) => s.integrationRequests);
  const addRequest = useEnterpriseStore((s) => s.addIntegrationRequest);

  const filtered = useMemo(
    () => (category === "Todas" ? INTEGRATIONS : INTEGRATIONS.filter((i) => i.category === category)),
    [category]
  );

  function openRequest(card?: IntegrationCard) {
    setForm({ ...EMPTY_FORM, nombre: card?.name ?? "" });
    setOpen(true);
  }

  function submit() {
    if (!form.nombre.trim()) {
      toast.error("Indique el nombre de la integración");
      return;
    }
    addRequest({
      solicitud: form.nombre,
      justificacion: form.justificacion,
      impacto: form.impacto,
      prioridad: form.prioridad,
    });
    toast.success("Solicitud enviada", {
      description: "Registrada para evaluación del equipo de producto (simulado).",
    });
    setOpen(false);
    setForm(EMPTY_FORM);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-[#003366]">Centro de Integraciones</h1>
        <p className="mt-1 text-sm text-[#64748b]">
          Marketplace enterprise para conectar el ecosistema tecnológico de Zurich
        </p>
      </div>

      <div className="sticky top-16 z-20 -mx-1 flex flex-wrap gap-2 bg-[#F5F7FA]/95 py-2 backdrop-blur">
        {INTEGRATION_CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setCategory(cat)}
            className={`rounded-md border px-3 py-1.5 text-xs font-medium cursor-pointer transition-colors ${
              category === cat
                ? "border-[#0066CC] bg-[#0066CC] text-white"
                : "border-[#e2e8f0] bg-white text-[#64748b] hover:bg-[#EAF4FF]"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {filtered.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.03 }}
          >
            <Card className="h-full transition-all hover:border-[#0066CC]/40 hover:shadow-md">
              <CardHeader>
                <div className="flex items-start gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#e2e8f0] bg-gradient-to-br from-[#EAF4FF] to-white text-sm font-bold text-[#0066CC]">
                    {item.initials}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <CardTitle className="text-base">{item.name}</CardTitle>
                      <Badge
                        variant={
                          item.status === "disponible"
                            ? "success"
                            : item.status === "proximamente"
                              ? "info"
                              : "warning"
                        }
                      >
                        {STATUS_LABEL[item.status]}
                      </Badge>
                    </div>
                    <p className="mt-1 text-[11px] font-medium uppercase tracking-wide text-[#94a3b8]">
                      {item.category}
                    </p>
                  </div>
                </div>
                <CardDescription className="pt-2">{item.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  className="w-full"
                  variant={item.status === "disponible" ? "secondary" : "outline"}
                  onClick={() => openRequest(item)}
                >
                  Solicitar Desarrollo
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between gap-3">
          <div>
            <CardTitle>Solicitudes de Integración</CardTitle>
            <CardDescription>Portal de seguimiento de requerimientos</CardDescription>
          </div>
          <Button variant="outline" size="sm" onClick={() => openRequest()}>
            Nueva solicitud
          </Button>
        </CardHeader>
        <CardContent>
          <div className="overflow-auto rounded-lg border border-[#e2e8f0]">
            <table className="w-full text-sm">
              <thead className="bg-[#F5F7FA] text-left text-xs uppercase text-[#64748b]">
                <tr>
                  <th className="px-4 py-3 font-medium">Solicitud</th>
                  <th className="px-4 py-3 font-medium">Fecha</th>
                  <th className="px-4 py-3 font-medium">Solicitante</th>
                  <th className="px-4 py-3 font-medium">Estado</th>
                  <th className="px-4 py-3 font-medium">Prioridad</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e2e8f0]">
                {requests.map((r) => (
                  <tr key={r.id} className="hover:bg-[#F5F7FA]/60">
                    <td className="px-4 py-3">
                      <p className="font-medium text-[#003366]">{r.solicitud}</p>
                      <p className="text-[11px] text-[#94a3b8]">{r.id}</p>
                    </td>
                    <td className="px-4 py-3 text-[#64748b]">
                      {format(new Date(r.fecha), "dd MMM yyyy", { locale: es })}
                    </td>
                    <td className="px-4 py-3 text-[#64748b]">{r.solicitante}</td>
                    <td className="px-4 py-3">
                      <Badge variant="secondary">{r.estado}</Badge>
                    </td>
                    <td className="px-4 py-3">
                      <Badge
                        variant={
                          r.prioridad === "Alta" ? "danger" : r.prioridad === "Media" ? "warning" : "outline"
                        }
                      >
                        {r.prioridad}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Solicitar Desarrollo</DialogTitle>
            <DialogDescription>
              Registre la necesidad comercial. No se conectan APIs reales en esta demo.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <div className="space-y-1.5">
              <Label>Nombre Integración</Label>
              <Input
                value={form.nombre}
                onChange={(e) => setForm((f) => ({ ...f, nombre: e.target.value }))}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Justificación Comercial</Label>
              <Textarea
                value={form.justificacion}
                onChange={(e) => setForm((f) => ({ ...f, justificacion: e.target.value }))}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Impacto Esperado</Label>
              <Textarea
                value={form.impacto}
                onChange={(e) => setForm((f) => ({ ...f, impacto: e.target.value }))}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Prioridad</Label>
              <Select
                value={form.prioridad}
                onValueChange={(v) => setForm((f) => ({ ...f, prioridad: v as RequestPriority }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {(["Alta", "Media", "Baja"] as const).map((p) => (
                    <SelectItem key={p} value={p}>
                      {p}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button className="w-full" onClick={submit}>
              Enviar Solicitud
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

"use client";

import { useMemo, useState } from "react";
import { Building2, MapPin, Phone, Sparkles, Cpu } from "lucide-react";
import { useAppStore } from "@/stores/app-store";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { EmailStatusBadge, PriorityBadge } from "@/components/shared/status-badges";
import { EmptyState } from "@/components/shared/empty-state";
import type { Lead } from "@/lib/types";

export default function EnriquecimientoPage() {
  const leads = useAppStore((s) => s.leads);
  const [selected, setSelected] = useState<Lead | null>(null);
  const [onlyEnriched, setOnlyEnriched] = useState(false);

  const rows = useMemo(
    () => (onlyEnriched ? leads.filter((l) => l.enriquecido) : leads),
    [leads, onlyEnriched]
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-[#003366]">Enriquecimiento</h1>
          <p className="mt-1 text-sm text-[#64748b]">
            Perfiles enriquecidos, insights comerciales y technographics
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant={onlyEnriched ? "default" : "outline"}
            size="sm"
            onClick={() => setOnlyEnriched(true)}
          >
            Solo enriquecidos ({leads.filter((l) => l.enriquecido).length})
          </Button>
          <Button
            variant={!onlyEnriched ? "default" : "outline"}
            size="sm"
            onClick={() => setOnlyEnriched(false)}
          >
            Todos
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tabla de leads</CardTitle>
          <CardDescription>Seleccione un lead para abrir el panel de enriquecimiento</CardDescription>
        </CardHeader>
        <CardContent>
          {rows.length === 0 ? (
            <EmptyState
              title="Sin leads enriquecidos"
              description="Ejecute el pipeline de enriquecimiento para ver perfiles premium."
            />
          ) : (
            <div className="overflow-auto rounded-lg border border-[#e2e8f0]">
              <table className="w-full min-w-[900px] text-sm">
                <thead className="bg-[#F5F7FA] text-left text-xs uppercase tracking-wide text-[#64748b]">
                  <tr>
                    <th className="px-4 py-3 font-medium">Nombre</th>
                    <th className="px-4 py-3 font-medium">Cargo</th>
                    <th className="px-4 py-3 font-medium">Empresa</th>
                    <th className="px-4 py-3 font-medium">Industria</th>
                    <th className="px-4 py-3 font-medium">Prioridad</th>
                    <th className="px-4 py-3 font-medium">Email</th>
                    <th className="px-4 py-3 font-medium">Estado</th>
                    <th className="px-4 py-3 font-medium"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e2e8f0]">
                  {rows.map((lead) => (
                    <tr key={lead.id} className="hover:bg-[#F5F7FA]/60">
                      <td className="px-4 py-3 font-medium text-[#003366]">
                        <div className="flex items-center gap-2">
                          {lead.nombre}
                          {lead.enriquecido && (
                            <Sparkles size={14} className="text-[#0066CC]" />
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-[#64748b]">{lead.cargo}</td>
                      <td className="px-4 py-3 text-[#64748b]">{lead.empresa}</td>
                      <td className="px-4 py-3 text-[#64748b]">{lead.industria}</td>
                      <td className="px-4 py-3">
                        <PriorityBadge priority={lead.prioridad} />
                      </td>
                      <td className="px-4 py-3">
                        <EmailStatusBadge status={lead.emailStatus} />
                      </td>
                      <td className="px-4 py-3">
                        {lead.enriquecido ? (
                          <Badge variant="success">Enriquecido</Badge>
                        ) : (
                          <Badge variant="outline">Pendiente</Badge>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <Button size="sm" variant="secondary" onClick={() => setSelected(lead)}>
                          Ver perfil
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      <Sheet open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <SheetContent className="w-full sm:max-w-xl overflow-y-auto">
          {selected && (
            <>
              <SheetHeader>
                <SheetTitle>{selected.nombre}</SheetTitle>
                <SheetDescription>
                  {selected.cargo} · {selected.empresa}
                </SheetDescription>
              </SheetHeader>

              <ScrollArea className="mt-2 h-[calc(100vh-8rem)] pr-3">
                <div className="space-y-6 pb-8">
                  <section className="rounded-xl border border-[#e2e8f0] bg-[#F5F7FA] p-4">
                    <h4 className="mb-3 text-xs font-semibold uppercase tracking-wide text-[#64748b]">
                      Perfil del contacto
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-[#003366]">
                        <PriorityBadge priority={selected.prioridad} />
                        <span className="text-[#64748b]">Prioridad comercial</span>
                      </div>
                      {selected.email && (
                        <p className="text-[#003366]">{selected.email}</p>
                      )}
                      {selected.telefono && (
                        <p className="flex items-center gap-2 text-[#64748b]">
                          <Phone size={14} /> {selected.telefono}
                        </p>
                      )}
                      {selected.ubicacion && (
                        <p className="flex items-center gap-2 text-[#64748b]">
                          <MapPin size={14} /> {selected.ubicacion}
                        </p>
                      )}
                      <p className="text-[#64748b]">Nivel: {selected.nivelJerarquico}</p>
                    </div>
                  </section>

                  <section>
                    <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-[#003366]">
                      <Building2 size={16} className="text-[#0066CC]" />
                      Información de empresa
                    </h4>
                    <div className="space-y-2 rounded-xl border border-[#e2e8f0] p-4 text-sm">
                      <p className="font-medium text-[#003366]">{selected.empresa}</p>
                      <p className="text-[#64748b]">{selected.companyDescription ?? "Sin descripción enriquecida."}</p>
                      <Separator />
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <p className="text-xs text-[#94a3b8]">Industria</p>
                          <p className="font-medium text-[#003366]">{selected.industria}</p>
                        </div>
                        <div>
                          <p className="text-xs text-[#94a3b8]">Tamaño</p>
                          <p className="font-medium text-[#003366]">{selected.empresaSize ?? "—"}</p>
                        </div>
                        <div>
                          <p className="text-xs text-[#94a3b8]">País</p>
                          <p className="font-medium text-[#003366]">{selected.pais}</p>
                        </div>
                        <div>
                          <p className="text-xs text-[#94a3b8]">Estado email</p>
                          <EmailStatusBadge status={selected.emailStatus} />
                        </div>
                      </div>
                    </div>
                  </section>

                  <section>
                    <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-[#003366]">
                      <Sparkles size={16} className="text-[#0066CC]" />
                      Insights comerciales
                    </h4>
                    {selected.insights?.length ? (
                      <ul className="space-y-2">
                        {selected.insights.map((ins) => (
                          <li
                            key={ins}
                            className="rounded-lg border border-[#EAF4FF] bg-[#EAF4FF]/50 px-3 py-2 text-sm text-[#003366]"
                          >
                            {ins}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-[#94a3b8]">Lead aún no enriquecido.</p>
                    )}
                  </section>

                  <section>
                    <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-[#003366]">
                      <Cpu size={16} className="text-[#0066CC]" />
                      Tecnologías detectadas
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selected.tecnologias?.length ? (
                        selected.tecnologias.map((t) => (
                          <Badge key={t} variant="secondary">{t}</Badge>
                        ))
                      ) : (
                        <p className="text-sm text-[#94a3b8]">Sin technographics disponibles.</p>
                      )}
                    </div>
                  </section>
                </div>
              </ScrollArea>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}

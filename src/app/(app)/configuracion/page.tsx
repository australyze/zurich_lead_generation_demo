"use client";

import { motion } from "framer-motion";
import { Check, Gauge, Sparkles, Wallet } from "lucide-react";
import { toast } from "sonner";
import { useAppStore } from "@/stores/app-store";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export default function ConfiguracionPage() {
  const providers = useAppStore((s) => s.aiProviders);
  const selected = useAppStore((s) => s.selectedAiProvider);
  const setProvider = useAppStore((s) => s.setSelectedAiProvider);

  function selectProvider(id: string, name: string) {
    setProvider(id);
    toast.success("Proveedor de IA actualizado", {
      description: `${name} será usado para generación de copy e insights (simulado).`,
    });
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-[#003366]">Configuración</h1>
        <p className="mt-1 text-sm text-[#64748b]">
          Preferencias generales de la plataforma — solo experiencia visual
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Proveedor de IA</CardTitle>
          <CardDescription>
            Seleccione el modelo para copy comercial, enrichment y secuencias. No se conectan APIs reales.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 lg:grid-cols-2">
            {providers.map((p, i) => {
              const active = selected === p.id;
              return (
                <motion.button
                  key={p.id}
                  type="button"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => selectProvider(p.id, p.name)}
                  className={cn(
                    "rounded-xl border p-5 text-left transition-all cursor-pointer",
                    active
                      ? "border-[#0066CC] bg-[#EAF4FF]/60 shadow-sm ring-2 ring-[#0066CC]/20"
                      : "border-[#e2e8f0] bg-white hover:border-[#0066CC]/40 hover:bg-[#F5F7FA]"
                  )}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-base font-semibold text-[#003366]">{p.name}</h3>
                        {active && (
                          <Badge variant="default" className="gap-1">
                            <Check size={12} /> Activo
                          </Badge>
                        )}
                      </div>
                      <p className="mt-2 text-sm text-[#64748b]">{p.description}</p>
                    </div>
                  </div>
                  <Separator className="my-4" />
                  <div className="grid grid-cols-3 gap-3 text-sm">
                    <div className="flex items-start gap-2">
                      <Wallet size={14} className="mt-0.5 text-[#0066CC]" />
                      <div>
                        <p className="text-[11px] uppercase tracking-wide text-[#94a3b8]">Costo</p>
                        <p className="font-medium text-[#003366]">{p.cost}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Gauge size={14} className="mt-0.5 text-[#0066CC]" />
                      <div>
                        <p className="text-[11px] uppercase tracking-wide text-[#94a3b8]">Velocidad</p>
                        <p className="font-medium text-[#003366]">{p.speed}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Sparkles size={14} className="mt-0.5 text-[#0066CC]" />
                      <div>
                        <p className="text-[11px] uppercase tracking-wide text-[#94a3b8]">Calidad</p>
                        <p className="font-medium text-[#003366]">{p.quality}</p>
                      </div>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>

          <div className="mt-6 flex items-center justify-between rounded-lg border border-[#e2e8f0] bg-[#F5F7FA] px-4 py-3">
            <p className="text-sm text-[#64748b]">
              Proveedor activo:{" "}
              <span className="font-semibold text-[#003366]">
                {providers.find((p) => p.id === selected)?.name}
              </span>
            </p>
            <Button variant="secondary" size="sm" onClick={() => toast.message("Preferencias guardadas")}>
              Guardar preferencias
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Workspace</CardTitle>
          <CardDescription>Información general de la demo</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-3 text-sm">
          <div>
            <p className="text-xs uppercase tracking-wide text-[#94a3b8]">Producto</p>
            <p className="mt-1 font-medium text-[#003366]">Zurich Lead Intelligence Platform</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-[#94a3b8]">Entorno</p>
            <p className="mt-1 font-medium text-[#003366]">Demo ejecutiva (mock)</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-[#94a3b8]">Persistencia</p>
            <p className="mt-1 font-medium text-[#003366]">localStorage + Zustand</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

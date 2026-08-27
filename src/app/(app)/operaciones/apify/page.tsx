"use client";

import { useState } from "react";
import { Play, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useOpsStore } from "@/stores/ops-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";

export default function ApifyOpsPage() {
  const startSimulation = useOpsStore((s) => s.startSimulation);
  const simulating = useOpsStore((s) => s.simulating);
  const addLog = useOpsStore((s) => s.addLog);
  const [running, setRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [form, setForm] = useState({
    industria: "Retail",
    ubicacion: "Chile",
    cargo: "Gerente Comercial",
    nivel: "Gerencia",
    keywords: "ventas B2B, retail",
    cantidad: 50,
    url: "https://www.linkedin.com/search/results/people/?keywords=Gerente%20Comercial",
    empresa: "Falabella",
  });

  function runActor(e: React.FormEvent) {
    e.preventDefault();
    setRunning(true);
    setProgress(10);
    addLog("INFO", "Apify", `Ejecutando actor — ${form.empresa} · ${form.industria}`);
    toast.message("Actor Apify iniciado");

    const steps = [30, 55, 80, 100];
    let i = 0;
    const t = setInterval(() => {
      setProgress(steps[i]);
      i += 1;
      if (i >= steps.length) {
        clearInterval(t);
        setRunning(false);
        addLog("SUCCESS", "Apify", `Actor finalizado — ${form.cantidad} leads solicitados (simulado)`);
        toast.success("Actor completado", { description: "Resultado mock listo. Puede continuar el pipeline." });
        if (!simulating) startSimulation();
      }
    }, 700);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-[#003366]">Apify</h1>
        <p className="mt-1 text-sm text-[#64748b]">
          Configuración del actor LinkedIn — prospección B2B simulada
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Ejecutar Actor</CardTitle>
            <CardDescription>Formulario inspirado en actores Apify reales</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={runActor} className="space-y-3">
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label>Industria</Label>
                  <Select value={form.industria} onValueChange={(v) => setForm({ ...form, industria: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {["Retail", "Banca", "Minería", "Tecnología", "Salud"].map((i) => (
                        <SelectItem key={i} value={i}>{i}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label>Ubicación</Label>
                  <Input value={form.ubicacion} onChange={(e) => setForm({ ...form, ubicacion: e.target.value })} />
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label>Cargo</Label>
                  <Input value={form.cargo} onChange={(e) => setForm({ ...form, cargo: e.target.value })} />
                </div>
                <div className="space-y-1.5">
                  <Label>Nivel jerárquico</Label>
                  <Select value={form.nivel} onValueChange={(v) => setForm({ ...form, nivel: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {["C-Level", "Dirección", "Gerencia", "Jefatura"].map((n) => (
                        <SelectItem key={n} value={n}>{n}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-1.5">
                <Label>Keywords</Label>
                <Input value={form.keywords} onChange={(e) => setForm({ ...form, keywords: e.target.value })} />
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label>Cantidad leads</Label>
                  <Input type="number" value={form.cantidad} onChange={(e) => setForm({ ...form, cantidad: Number(e.target.value) })} />
                </div>
                <div className="space-y-1.5">
                  <Label>Empresa objetivo</Label>
                  <Input value={form.empresa} onChange={(e) => setForm({ ...form, empresa: e.target.value })} />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label>LinkedIn Search URL</Label>
                <Input value={form.url} onChange={(e) => setForm({ ...form, url: e.target.value })} />
              </div>
              <Button type="submit" className="w-full" disabled={running}>
                {running ? <Loader2 className="animate-spin" size={16} /> : <Play size={16} />}
                Ejecutar Actor
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Resultado simulado</CardTitle>
            <CardDescription>Salida del actor y handoff al siguiente servicio</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {(running || progress > 0) && (
              <div>
                <div className="mb-2 flex justify-between text-xs text-[#64748b]">
                  <span>Progreso del actor</span>
                  <span>{progress}%</span>
                </div>
                <Progress value={progress} />
              </div>
            )}
            <div className="rounded-lg border border-dashed border-[#d0d7e2] bg-[#F5F7FA] p-4 text-sm text-[#64748b]">
              <p className="font-medium text-[#003366]">Dataset de salida (mock)</p>
              <ul className="mt-2 list-disc pl-5 space-y-1">
                <li>nombre, cargo, empresa, linkedin_personal, linkedin_empresa</li>
                <li>Siguiente etapa: Identificación URL Empresa (Perplexity)</li>
              </ul>
            </div>
            {progress === 100 && (
              <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-800">
                Actor completado. Pipeline orquestado en curso desde Mission Control.
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

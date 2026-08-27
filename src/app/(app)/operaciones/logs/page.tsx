"use client";

import { useMemo, useState } from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { useOpsStore } from "@/stores/ops-store";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LogSeverityBadge } from "@/components/ops/status-badges";
import type { LogSeverity } from "@/lib/ops-types";

export default function LogsPage() {
  const logs = useOpsStore((s) => s.logs);
  const [severity, setSeverity] = useState<LogSeverity | "ALL">("ALL");
  const [provider, setProvider] = useState("todos");

  const providers = useMemo(
    () => ["todos", ...Array.from(new Set(logs.map((l) => l.provider)))],
    [logs]
  );

  const filtered = logs.filter((l) => {
    const okS = severity === "ALL" || l.severity === severity;
    const okP = provider === "todos" || l.provider === provider;
    return okS && okP;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-[#003366]">Logs del sistema</h1>
        <p className="mt-1 text-sm text-[#64748b]">
          Consola enterprise de eventos del orquestador
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        <Select value={severity} onValueChange={(v) => setSeverity(v as LogSeverity | "ALL")}>
          <SelectTrigger className="w-40"><SelectValue placeholder="Severidad" /></SelectTrigger>
          <SelectContent>
            {["ALL", "INFO", "WARNING", "SUCCESS", "ERROR"].map((s) => (
              <SelectItem key={s} value={s}>{s === "ALL" ? "Todas" : s}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={provider} onValueChange={setProvider}>
          <SelectTrigger className="w-48"><SelectValue placeholder="Proveedor" /></SelectTrigger>
          <SelectContent>
            {providers.map((p) => (
              <SelectItem key={p} value={p}>{p === "todos" ? "Todos los proveedores" : p}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Eventos</CardTitle>
          <CardDescription>{filtered.length} registros</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-hidden rounded-lg border border-[#0f172a] bg-[#0f172a]">
            <div className="max-h-[560px] overflow-auto font-mono text-xs">
              {filtered.map((log) => (
                <div
                  key={log.id}
                  className="flex flex-wrap items-start gap-3 border-b border-white/5 px-4 py-2.5 text-[#e2e8f0]"
                >
                  <span className="text-[#64748b] tabular-nums">
                    {format(new Date(log.timestamp), "HH:mm:ss", { locale: es })}
                  </span>
                  <LogSeverityBadge severity={log.severity} />
                  <span className="text-[#4da3ff]">[{log.provider}]</span>
                  <span className="flex-1">{log.message}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

"use client";

import { ArrowDown } from "lucide-react";
import { useOpsStore } from "@/stores/ops-store";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function ValidacionPage() {
  const rows = useOpsStore((s) => s.anymailRows);
  const validos = rows.filter((r) => r.confianza >= 80 && r.email);
  const riesgosos = rows.filter((r) => r.email && r.confianza > 0 && r.confianza < 80);
  const invalidos = rows.filter((r) => r.status === "error" || (!r.email && r.status === "completada"));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-[#003366]">Validación de emails</h1>
        <p className="mt-1 text-sm text-[#64748b]">
          Separación clara de válidos, riesgosos e inválidos — con derivación a NeverBounce
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Bucket title="Emails válidos" count={validos.length} tone="success" items={validos.map((r) => r.email!)} />
        <div className="space-y-3">
          <Bucket title="Emails riesgosos" count={riesgosos.length} tone="warning" items={riesgosos.map((r) => r.email!)} />
          <div className="flex flex-col items-center rounded-xl border border-amber-200 bg-amber-50 p-4 text-center">
            <ArrowDown className="text-amber-600" size={18} />
            <p className="mt-2 text-sm font-medium text-amber-800">Derivación automática</p>
            <Badge variant="warning" className="mt-2">NeverBounce</Badge>
            <p className="mt-2 text-xs text-amber-700">
              Los emails con confianza &lt; 80% se envían a validación enterprise.
            </p>
          </div>
        </div>
        <Bucket title="Emails inválidos" count={invalidos.length || 1} tone="danger" items={invalidos.length ? invalidos.map((r) => r.lead) : ["Sin email / dominio inválido"]} />
      </div>
    </div>
  );
}

function Bucket({
  title,
  count,
  tone,
  items,
}: {
  title: string;
  count: number;
  tone: "success" | "warning" | "danger";
  items: string[];
}) {
  const styles = {
    success: "border-emerald-200 bg-emerald-50/50",
    warning: "border-amber-200 bg-amber-50/40",
    danger: "border-red-200 bg-red-50/40",
  };
  return (
    <Card className={styles[tone]}>
      <CardHeader>
        <CardTitle className="text-base">{title}</CardTitle>
        <CardDescription>{count} registros</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        {items.map((item) => (
          <div key={item} className="rounded-md border border-white/80 bg-white px-3 py-2 text-sm text-[#003366]">
            {item}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

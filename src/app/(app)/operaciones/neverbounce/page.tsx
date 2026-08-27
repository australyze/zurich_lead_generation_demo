"use client";

import { useOpsStore } from "@/stores/ops-store";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const RESULT_VARIANT: Record<string, "success" | "warning" | "danger" | "info" | "outline"> = {
  Valid: "success",
  "Catch-All": "info",
  Risky: "warning",
  Disposable: "danger",
  Invalid: "danger",
};

export default function NeverBouncePage() {
  const rows = useOpsStore((s) => s.neverbounceRows);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-[#003366]">NeverBounce</h1>
        <p className="mt-1 text-sm text-[#64748b]">
          Validación enterprise de emails riesgosos o catch-all
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Resultados de verificación</CardTitle>
          <CardDescription>Valid · Catch-All · Risky · Disposable · Invalid</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-auto rounded-lg border border-[#e2e8f0]">
            <table className="w-full min-w-[800px] text-sm">
              <thead className="bg-[#F5F7FA] text-left text-xs uppercase text-[#64748b]">
                <tr>
                  <th className="px-4 py-3 font-medium">Email</th>
                  <th className="px-4 py-3 font-medium">Resultado</th>
                  <th className="px-4 py-3 font-medium">Reason</th>
                  <th className="px-4 py-3 font-medium">Score</th>
                  <th className="px-4 py-3 font-medium">Estado final</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e2e8f0]">
                {rows.map((r) => (
                  <tr key={r.id} className="hover:bg-[#F5F7FA]/60">
                    <td className="px-4 py-3 font-medium text-[#003366]">{r.email}</td>
                    <td className="px-4 py-3">
                      <Badge variant={RESULT_VARIANT[r.resultado]}>{r.resultado}</Badge>
                    </td>
                    <td className="px-4 py-3 text-[#64748b]">{r.reason}</td>
                    <td className="px-4 py-3 tabular-nums">{r.score}</td>
                    <td className="px-4 py-3 text-[#003366]">{r.estadoFinal}</td>
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

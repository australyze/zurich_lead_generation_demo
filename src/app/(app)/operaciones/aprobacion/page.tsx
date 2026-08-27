"use client";

import { format } from "date-fns";
import { es } from "date-fns/locale";
import { toast } from "sonner";
import { Check, Save } from "lucide-react";
import { useOpsStore } from "@/stores/ops-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AprobacionPage() {
  const approvals = useOpsStore((s) => s.approvals);
  const selectedId = useOpsStore((s) => s.selectedApprovalId);
  const setSelected = useOpsStore((s) => s.setSelectedApprovalId);
  const approve = useOpsStore((s) => s.approveCampaign);
  const updateEmail = useOpsStore((s) => s.updateApprovalEmail);

  const selected = approvals.find((a) => a.id === selectedId) ?? null;
  const pendientes = approvals.filter((a) => a.estado === "pendiente");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-[#003366]">Aprobación humana</h1>
        <p className="mt-1 text-sm text-[#64748b]">
          Ninguna campaña se envía automáticamente — bandeja de revisión obligatoria
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-5">
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle>Bandeja de aprobación</CardTitle>
            <CardDescription>{pendientes.length} pendientes de revisión</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-[#e2e8f0]">
              {approvals.map((a) => (
                <button
                  key={a.id}
                  type="button"
                  onClick={() => setSelected(a.id)}
                  className={`flex w-full items-center justify-between px-5 py-3.5 text-left cursor-pointer ${
                    selectedId === a.id ? "bg-[#EAF4FF]" : "hover:bg-[#F5F7FA]"
                  }`}
                >
                  <div>
                    <p className="text-sm font-medium text-[#003366]">{a.lead}</p>
                    <p className="text-xs text-[#64748b]">{a.empresa} · {a.usuario}</p>
                    <p className="text-[11px] text-[#94a3b8]">
                      {format(new Date(a.fecha), "dd MMM HH:mm", { locale: es })}
                    </p>
                  </div>
                  <Badge variant={a.estado === "aprobada" ? "success" : a.estado === "pendiente" ? "warning" : "outline"}>
                    {a.estado}
                  </Badge>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="xl:col-span-3">
          {!selected ? (
            <CardContent className="py-16 text-center text-sm text-[#64748b]">
              Seleccione una campaña y pulse Revisar para editar y aprobar.
            </CardContent>
          ) : (
            <>
              <CardHeader className="flex flex-row items-start justify-between gap-3">
                <div>
                  <CardTitle>Editor de campaña</CardTitle>
                  <CardDescription>
                    {selected.lead} · {selected.empresa}
                  </CardDescription>
                </div>
                <Button
                  variant="success"
                  disabled={selected.estado === "aprobada"}
                  onClick={() => {
                    approve(selected.id);
                    toast.success("Campaña aprobada", {
                      description: "Encolada para envío a Instantly. No hubo envío automático previo.",
                    });
                  }}
                >
                  <Check size={14} />
                  {selected.estado === "aprobada" ? "Aprobada" : "Aprobar Campaña"}
                </Button>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="1">
                  <TabsList>
                    {selected.emails.map((e) => (
                      <TabsTrigger key={e.order} value={String(e.order)}>
                        Correo {e.order}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  {selected.emails.map((email) => (
                    <TabsContent key={email.order} value={String(email.order)} className="space-y-3">
                      <div className="space-y-1.5">
                        <Label>Asunto</Label>
                        <Input
                          value={email.subject}
                          onChange={(e) =>
                            updateEmail(selected.id, email.order, { subject: e.target.value })
                          }
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label>Contenido</Label>
                        <Textarea
                          className="min-h-[180px]"
                          value={email.body}
                          onChange={(e) =>
                            updateEmail(selected.id, email.order, { body: e.target.value })
                          }
                        />
                      </div>
                      <div className="rounded-lg border border-[#e2e8f0] bg-[#F5F7FA] p-3">
                        <p className="text-xs font-medium uppercase tracking-wide text-[#94a3b8]">Preview</p>
                        <p className="mt-1 text-sm font-semibold text-[#003366]">{email.subject}</p>
                        <pre className="mt-2 whitespace-pre-wrap text-sm text-[#64748b]">{email.body}</pre>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => toast.success("Borrador guardado")}
                      >
                        <Save size={14} />
                        Guardar
                      </Button>
                    </TabsContent>
                  ))}
                </Tabs>
              </CardContent>
            </>
          )}
        </Card>
      </div>
    </div>
  );
}

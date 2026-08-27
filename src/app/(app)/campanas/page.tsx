"use client";

import { useMemo, useState } from "react";
import { Check, Save, Variable } from "lucide-react";
import { toast } from "sonner";
import { useAppStore } from "@/stores/app-store";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CampaignEmailStatusBadge } from "@/components/shared/status-badges";
import { EmptyState } from "@/components/shared/empty-state";
import type { Campaign } from "@/lib/types";

const VARIABLES = ["{{nombre}}", "{{empresa}}", "{{cargo}}", "{{industria}}", "{{remitente}}"];

export default function CampanasPage() {
  const campaigns = useAppStore((s) => s.campaigns);
  const updateCampaignEmail = useAppStore((s) => s.updateCampaignEmail);
  const approveCampaign = useAppStore((s) => s.approveCampaign);
  const [selectedId, setSelectedId] = useState<string | null>(campaigns[0]?.id ?? null);

  const selected = useMemo(
    () => campaigns.find((c) => c.id === selectedId) ?? null,
    [campaigns, selectedId]
  );

  function handleSave(campaign: Campaign, emailId: string, subject: string, body: string) {
    updateCampaignEmail(campaign.id, emailId, { subject, body, status: "guardado" });
    toast.success("Correo guardado", { description: "Cambios persistidos en el estado local." });
  }

  function handleApprove(campaignId: string) {
    approveCampaign(campaignId);
    toast.success("Campaña aprobada", {
      description: "Secuencia lista para activación en Instantly.",
    });
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-[#003366]">Campañas</h1>
        <p className="mt-1 text-sm text-[#64748b]">
          Secuencias de 4 correos con variables dinámicas — edite, guarde y apruebe
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-5">
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle>Leads listos para campañas</CardTitle>
            <CardDescription>{campaigns.length} secuencias generadas</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            {campaigns.length === 0 ? (
              <div className="p-4">
                <EmptyState title="Sin campañas" description="No hay leads listos para secuencias." />
              </div>
            ) : (
              <div className="max-h-[70vh] overflow-y-auto divide-y divide-[#e2e8f0]">
                {campaigns.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setSelectedId(c.id)}
                    className={`flex w-full items-center justify-between px-5 py-3.5 text-left transition-colors cursor-pointer ${
                      selectedId === c.id ? "bg-[#EAF4FF]" : "hover:bg-[#F5F7FA]"
                    }`}
                  >
                    <div>
                      <p className="text-sm font-medium text-[#003366]">{c.leadName}</p>
                      <p className="text-xs text-[#64748b]">{c.company}</p>
                    </div>
                    {c.approved ? (
                      <Badge variant="success">Aprobada</Badge>
                    ) : (
                      <Badge variant="outline">Borrador</Badge>
                    )}
                  </button>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="xl:col-span-3">
          {!selected ? (
            <CardContent className="py-16">
              <EmptyState
                title="Seleccione un lead"
                description="Elija una campaña de la lista para editar la secuencia de correos."
              />
            </CardContent>
          ) : (
            <>
              <CardHeader className="flex flex-row items-start justify-between gap-3">
                <div>
                  <CardTitle>{selected.leadName}</CardTitle>
                  <CardDescription>
                    Secuencia de 4 correos · {selected.company}
                  </CardDescription>
                </div>
                <Button
                  variant="success"
                  size="sm"
                  disabled={selected.approved}
                  onClick={() => handleApprove(selected.id)}
                >
                  <Check size={14} />
                  {selected.approved ? "Aprobada" : "Aprobar campaña"}
                </Button>
              </CardHeader>
              <CardContent>
                <div className="mb-4 flex flex-wrap gap-2">
                  <span className="flex items-center gap-1 text-xs text-[#64748b]">
                    <Variable size={12} /> Variables:
                  </span>
                  {VARIABLES.map((v) => (
                    <Badge key={v} variant="secondary" className="font-mono text-[10px]">
                      {v}
                    </Badge>
                  ))}
                </div>

                <Tabs defaultValue={selected.emails[0]?.id}>
                  <TabsList className="w-full justify-start overflow-x-auto">
                    {selected.emails.map((e) => (
                      <TabsTrigger key={e.id} value={e.id}>
                        Correo {e.order}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  {selected.emails.map((email) => (
                    <EmailEditor
                      key={`${selected.id}-${email.id}-${email.status}`}
                      campaign={selected}
                      email={email}
                      onSave={handleSave}
                    />
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

function EmailEditor({
  campaign,
  email,
  onSave,
}: {
  campaign: Campaign;
  email: Campaign["emails"][number];
  onSave: (c: Campaign, id: string, subject: string, body: string) => void;
}) {
  const [subject, setSubject] = useState(email.subject);
  const [body, setBody] = useState(email.body);

  return (
    <TabsContent value={email.id} className="space-y-4">
      <div className="flex items-center justify-between">
        <CampaignEmailStatusBadge status={email.status} />
        <Button size="sm" onClick={() => onSave(campaign, email.id, subject, body)}>
          <Save size={14} />
          Guardar
        </Button>
      </div>
      <div className="space-y-2">
        <Label>Asunto</Label>
        <Input value={subject} onChange={(e) => setSubject(e.target.value)} />
      </div>
      <div className="space-y-2">
        <Label>Cuerpo</Label>
        <Textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="min-h-[220px] font-mono text-[13px] leading-relaxed"
        />
      </div>
    </TabsContent>
  );
}

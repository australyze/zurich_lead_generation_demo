"use client";

import { toast } from "sonner";
import { AI_MODELS } from "@/lib/enterprise-data";
import { getModelLabel, useEnterpriseStore } from "@/stores/enterprise-store";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function AiModelSelectors() {
  const enrichmentModelId = useEnterpriseStore((s) => s.enrichmentModelId);
  const campaignModelId = useEnterpriseStore((s) => s.campaignModelId);
  const setEnrichment = useEnterpriseStore((s) => s.setEnrichmentModel);
  const setCampaign = useEnterpriseStore((s) => s.setCampaignModel);
  const presentationMode = useEnterpriseStore((s) => s.presentationMode);

  if (presentationMode) return null;

  return (
    <div className="hidden xl:flex items-center gap-2 rounded-lg border border-[#e2e8f0] bg-[#F5F7FA] px-2 py-1">
      <div className="flex items-center gap-1.5">
        <span className="text-[10px] uppercase tracking-wide text-[#94a3b8]">Enrich</span>
        <Select
          value={enrichmentModelId}
          onValueChange={(v) => {
            setEnrichment(v);
            toast.message("Modelo de enriquecimiento", { description: getModelLabel(v) });
          }}
        >
          <SelectTrigger className="h-7 w-[140px] border-0 bg-white text-xs shadow-none">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {AI_MODELS.map((m) => (
              <SelectItem key={m.id} value={m.id}>{m.modelo}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="h-4 w-px bg-[#d0d7e2]" />
      <div className="flex items-center gap-1.5">
        <span className="text-[10px] uppercase tracking-wide text-[#94a3b8]">Campañas</span>
        <Select
          value={campaignModelId}
          onValueChange={(v) => {
            setCampaign(v);
            toast.message("Modelo de campañas", { description: getModelLabel(v) });
          }}
        >
          <SelectTrigger className="h-7 w-[120px] border-0 bg-white text-xs shadow-none">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {AI_MODELS.map((m) => (
              <SelectItem key={m.id} value={m.id}>{m.modelo}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

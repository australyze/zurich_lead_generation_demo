"use client";

import {
  Sparkles,
  Mail,
  Megaphone,
  Zap,
  ThumbsUp,
  Network,
  Search,
} from "lucide-react";
import type { TimelineEvent, TimelineEventType } from "@/lib/analytics-types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const ICONS: Record<TimelineEventType, typeof Mail> = {
  enriquecimiento: Sparkles,
  email: Mail,
  campana: Megaphone,
  envio: Zap,
  respuesta: ThumbsUp,
  crm: Network,
  prospection: Search,
};

export function ActivityTimeline({ events }: { events: TimelineEvent[] }) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Actividad reciente</CardTitle>
        <CardDescription>Timeline operacional en tiempo real (simulado)</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative space-y-0">
          <div className="absolute left-[19px] top-2 bottom-2 w-px bg-[#e2e8f0]" />
          {events.map((ev) => {
            const Icon = ICONS[ev.type];
            return (
              <div key={ev.id} className="relative flex gap-3 pb-4 last:pb-0">
                <div className="z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#e2e8f0] bg-[#EAF4FF] text-[#0066CC]">
                  <Icon size={16} />
                </div>
                <div className="min-w-0 flex-1 pt-1">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-sm font-medium text-[#003366]">{ev.title}</p>
                      <p className="text-xs text-[#64748b]">
                        {ev.lead !== "—" ? `${ev.lead} · ` : ""}
                        {ev.empresa}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-[11px] tabular-nums text-[#94a3b8]">{ev.time}</p>
                      <Badge variant="secondary" className="mt-1">{ev.estado}</Badge>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

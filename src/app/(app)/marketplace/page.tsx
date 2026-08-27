"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { useAppStore } from "@/stores/app-store";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MarketplaceStatusBadge } from "@/components/shared/status-badges";
import type { MarketplaceItem } from "@/lib/types";

const CATEGORIES: Array<MarketplaceItem["category"] | "Todas"> = [
  "Todas",
  "CRM",
  "Enriquecimiento",
  "Email",
  "Automatización",
  "Datos",
  "IA",
];

export default function MarketplacePage() {
  const items = useAppStore((s) => s.marketplaceItems);
  const requested = useAppStore((s) => s.requestedIntegrations);
  const requestItem = useAppStore((s) => s.requestMarketplaceItem);
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]>("Todas");

  const filtered = useMemo(
    () => (category === "Todas" ? items : items.filter((i) => i.category === category)),
    [items, category]
  );

  function handleAction(item: MarketplaceItem) {
    if (item.status === "disponible") {
      toast.success(`${item.name} activada`, {
        description: "Integración marcada como disponible en el workspace (mock).",
      });
      return;
    }
    requestItem(item.id);
    toast.message("Solicitud registrada", {
      description: `Le avisaremos cuando ${item.name} esté lista.`,
    });
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-[#003366]">Marketplace</h1>
        <p className="mt-1 text-sm text-[#64748b]">
          Ecosistema de integraciones futuras para el stack GTM de Zurich
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`rounded-md border px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer ${
              category === cat
                ? "border-[#0066CC] bg-[#0066CC] text-white"
                : "border-[#e2e8f0] bg-white text-[#64748b] hover:bg-[#F5F7FA]"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {filtered.map((item, i) => {
          const isRequested = requested.includes(item.id);
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.04 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <div className="flex items-start gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#e2e8f0] bg-gradient-to-br from-[#EAF4FF] to-white text-xs font-bold text-[#0066CC]">
                      {item.name.slice(0, 2).toUpperCase()}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <CardTitle className="text-base">{item.name}</CardTitle>
                        <MarketplaceStatusBadge status={item.status} />
                      </div>
                      <p className="mt-1 text-[11px] font-medium uppercase tracking-wide text-[#94a3b8]">
                        {item.category}
                      </p>
                    </div>
                  </div>
                  <CardDescription className="pt-2">{item.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    className="w-full"
                    variant={item.status === "disponible" ? "default" : "outline"}
                    disabled={isRequested && item.status !== "disponible"}
                    onClick={() => handleAction(item)}
                  >
                    {item.status === "disponible"
                      ? "Activar"
                      : isRequested
                        ? "Solicitado"
                        : item.status === "solicitar"
                          ? "Solicitar"
                          : "Notificarme"}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

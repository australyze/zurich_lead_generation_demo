"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { useAppStore } from "@/stores/app-store";
import { CRM_LOGO_PATHS } from "@/lib/crm-logos";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CrmStatusBadge } from "@/components/shared/status-badges";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function CrmPage() {
  const integrations = useAppStore((s) => s.crmIntegrations);
  const requested = useAppStore((s) => s.requestedIntegrations);
  const requestCrm = useAppStore((s) => s.requestCrmIntegration);

  function handleRequest(id: string, name: string) {
    requestCrm(id);
    toast.success("Integración solicitada", {
      description: `Su solicitud para ${name} fue registrada. El equipo de producto la evaluará.`,
    });
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-[#003366]">CRM</h1>
        <p className="mt-1 text-sm text-[#64748b]">
          Integraciones con los principales CRMs enterprise — sin conexión real en esta demo
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {integrations.map((crm, i) => {
          const isRequested = requested.includes(crm.id);
          return (
            <motion.div
              key={crm.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      {CRM_LOGO_PATHS[crm.id] ? (
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#e2e8f0] bg-white p-1.5">
                          <Image
                            src={CRM_LOGO_PATHS[crm.id]}
                            alt={crm.name}
                            width={40}
                            height={40}
                            className="h-full w-full object-contain"
                          />
                        </div>
                      ) : (
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#EAF4FF] text-sm font-bold text-[#0066CC]">
                          CR
                        </div>
                      )}
                      <div>
                        <CardTitle className="text-base">{crm.name}</CardTitle>
                        <div className="mt-1">
                          <CrmStatusBadge status={crm.status} />
                        </div>
                      </div>
                    </div>
                  </div>
                  <CardDescription className="pt-2">{crm.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant={crm.status === "conectado" ? "secondary" : "outline"}
                        className="w-full"
                        disabled={crm.status === "conectado" || isRequested}
                      >
                        {crm.status === "conectado"
                          ? "Conectado"
                          : isRequested
                            ? "Solicitud enviada"
                            : "Solicitar Integración"}
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <div className="flex items-center gap-3">
                          {CRM_LOGO_PATHS[crm.id] && (
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#e2e8f0] bg-white p-1">
                              <Image
                                src={CRM_LOGO_PATHS[crm.id]}
                                alt={crm.name}
                                width={32}
                                height={32}
                                className="h-full w-full object-contain"
                              />
                            </div>
                          )}
                          <DialogTitle>Solicitar {crm.name}</DialogTitle>
                        </div>
                        <DialogDescription>
                          Esta es una demo visual. No se realizará una conexión real con {crm.name}.
                          Su solicitud quedará registrada en el estado local de la aplicación.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="flex justify-end gap-2 pt-2">
                        <Button
                          onClick={() => handleRequest(crm.id, crm.name)}
                          disabled={isRequested || crm.status === "conectado"}
                        >
                          Confirmar solicitud
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

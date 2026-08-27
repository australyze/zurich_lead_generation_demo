"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  AI_MODELS,
  INTEGRATION_REQUESTS,
  NOTIFICATIONS,
} from "@/lib/enterprise-data";
import type { IntegrationRequest, NotificationItem, RequestPriority } from "@/lib/enterprise-types";

interface EnterpriseState {
  enrichmentModelId: string;
  campaignModelId: string;
  presentationMode: boolean;
  tourActive: boolean;
  tourStepIndex: number;
  notifications: NotificationItem[];
  integrationRequests: IntegrationRequest[];
  searchOpen: boolean;
  notificationsOpen: boolean;

  setEnrichmentModel: (id: string) => void;
  setCampaignModel: (id: string) => void;
  setPresentationMode: (v: boolean) => void;
  startTour: () => void;
  nextTourStep: () => void;
  stopTour: () => void;
  setSearchOpen: (v: boolean) => void;
  setNotificationsOpen: (v: boolean) => void;
  markNotificationsRead: () => void;
  addIntegrationRequest: (payload: {
    solicitud: string;
    justificacion: string;
    impacto: string;
    prioridad: RequestPriority;
  }) => void;
}

export const useEnterpriseStore = create<EnterpriseState>()(
  persist(
    (set, get) => ({
      enrichmentModelId: "perplexity-sonar",
      campaignModelId: "gpt-5",
      presentationMode: false,
      tourActive: false,
      tourStepIndex: 0,
      notifications: NOTIFICATIONS,
      integrationRequests: INTEGRATION_REQUESTS,
      searchOpen: false,
      notificationsOpen: false,

      setEnrichmentModel: (id) => set({ enrichmentModelId: id }),
      setCampaignModel: (id) => set({ campaignModelId: id }),
      setPresentationMode: (v) => set({ presentationMode: v }),

      startTour: () => set({ tourActive: true, tourStepIndex: 0, presentationMode: true }),
      nextTourStep: () => {
        const next = get().tourStepIndex + 1;
        if (next >= 7) {
          set({ tourActive: false, tourStepIndex: 0, presentationMode: false });
          return;
        }
        set({ tourStepIndex: next });
      },
      stopTour: () => set({ tourActive: false, tourStepIndex: 0, presentationMode: false }),

      setSearchOpen: (v) => set({ searchOpen: v }),
      setNotificationsOpen: (v) => set({ notificationsOpen: v }),
      markNotificationsRead: () =>
        set((s) => ({
          notifications: s.notifications.map((n) => ({ ...n, read: true })),
        })),

      addIntegrationRequest: ({ solicitud, prioridad }) =>
        set((s) => ({
          integrationRequests: [
            {
              id: `REQ-${String(15 + s.integrationRequests.length).padStart(3, "0")}`,
              solicitud,
              fecha: new Date().toISOString(),
              solicitante: "Gerente Comercial",
              estado: "Nueva",
              prioridad,
            },
            ...s.integrationRequests,
          ],
          notifications: [
            {
              id: `n-${Date.now()}`,
              title: "Solicitud de integración creada",
              description: `${solicitud} registrada para evaluación.`,
              time: "Ahora",
              read: false,
              href: "/integraciones",
            },
            ...s.notifications,
          ],
        })),
    }),
    {
      name: "zurich-enterprise-storage",
      partialize: (s) => ({
        enrichmentModelId: s.enrichmentModelId,
        campaignModelId: s.campaignModelId,
        presentationMode: s.presentationMode,
        integrationRequests: s.integrationRequests,
      }),
    }
  )
);

export function getModelLabel(id: string) {
  return AI_MODELS.find((m) => m.id === id)?.modelo ?? id;
}
